// QUESTION A4
// Basically brute force, go through each position
// check each cell that the shape is on
// if it finds a hole, moves on
function findAllPositions(s,canvas){
  const grid = canvas.data;
  const width = canvas.width;
  const height = canvas.height;

  const sx = s.arr[0].length;
  const sy = s.arr.length;
  const shape_a = s.arr;
  let flag = true;

  // let initx =0;
  // let inity =0;

  // let steps = [];
  let valids =[];

  // let holestepx = 0;
  // let holestepy = 0;

  //initial position invalid slots?
  let x = 0;
  let y = 0;

  for(x = 0; x < width - sx + 1 ; x++){
    flag = true;

    for(y = 0 ; y < height - sy + 1 ; y++){
      flag = true;

      for(let m = 0 ; m < sx ; m ++){

        for (let k = 0; k < sy ; k++){

          if(shape_a[k][m]==1){
              if(grid[y+k][x+m]!='E'){
                  flag = false;
              }
          }
          if(flag!=true){   
              break;
          }
        }

        if(flag!=true){
          break;
        } 
      }

      if(flag){ 
        valids.push([x,y]);
      };
      }
  }

  //check each position linearly
  //add valid positions to a list
  // for(let x = 0 ; x < width - sx ; x++ )
  // {}
  return valids;
}

// Answers A5
// Goes linearly through the canvas counts holes, empty squares
// The filled squares will be total canvas squares - holes - empty squares
function countCanvas(canvas)
{
  const grid = canvas.data;
  const width = canvas.width;
  const height = canvas.height;

  let holes = 0;
  let empty = 0;

  for(x = 0; x < width ; x++){
    for(y = 0 ; y < height; y++){
      if(grid[y][x]=='E'){
        empty++;
      }
      if(grid[y][x]=='H'){
        holes++;
      }
    }
  }
  return {'empty' : empty , 'filled':width*height-empty-holes }
}

// Answers A8
// Finds the perimeters of a shape
function perimeter(genShape)
{
  //lazy
}

// Answers A7
function mix(shp1,shp2,pos)
{
  

}
//answers a10
//Takes available shapes + a canvas 
// and returns all solutions in the form specified
function solve(shapeIds,canvas){
  //Initializing some memory
  const solutions = [];
  // n is number of pentaminoes we can use
  // will be used later to better determine each shape :D
  const empty_spots = countCanvas(canvas)["empty"];
  if(! [5,10,15,20,25,30,35,40,45,50,55,60].some(e=>e==empty_spots)){ //so lazy :D
    console.log("The pentaminoes cannot fit evenly into the empty spots!")
    return solutions;
  }
  const n = Math.round(empty_spots /5 );
  
  console.log(`Canvas shapes that can be used : ${n}`);

  const shapeCombos = powerset(shapeIds).filter(e=>e.length==n) ; //no Braces V_V

  //TODO : fix a shape with the same symmetries as the canvas to reduce computations
  // and only find unique up to symmetry solutions


  //generates the exact cover equivalent matrix for each combination
  //and then solves it and uncharts it back to our grid
  //also adds it to our solutions :)

  //4 Loop levels
  //Level 1 cycle through the shapes of shape combinations
  //Level 2 cycle through the shape permutations of each combination
  //Level 3 cycle through the possible positions a shape can be in the grid for each permutation
  //Level 4 translate each possible position to a row equivalent
  //Level 1 use the matrix formulated to solve the exact cover problem o_o
  for(const sp of shapeCombos){

    
    const pmatrix = [];
    const chart = totalChart(sp,canvas); 

    for(const s of sp){

      const perms = generatePermutations(shape(s)); 

      for(const perm of perms){

        const spath = toShapePath(perm.arr);  
        const positions = findAllPositions(perm,canvas);  

        for(const pos of positions){
          pmatrix.push(equivRow(s,spath,chart,pos));  
        }
      }
    }
    
    let solution = [];
    if(pmatrix.length>0)
      solution = solveMatrix(pmatrix); 

    if(solution.length>0){
      for(const s of solution){
        //We unchart each solution for our shape combination and add it
        solutions.push(unchartedSol(s,canvas,chart)) 
        }
      }
  }
  return solutions;
}

function gsolve(shapeIds,canvas){

  const solutions = solve(shapeIds,canvas); //Multi Solution try :D
  const nums = solutions.length;

  //Count symmetries
  let sym = 1;
  const sym_test = canvas.data.toString() ;
  if(sym_test== flipX(canvas.data).toString())
    sym*=2;
  if(sym_test == flipY(canvas.data).toString())
    sym*=2;
  if(sym_test == rotateR(canvas.data).toString())
    sym*=2;

  gSolutions = solutions;
  nSol = 0;


  if(nums > 0){
    drawCnvs(gSolutions[0]);
    document.getElementById("aaaaaaa").innerHTML = `Total solutions found (includes symmetric sols) : ${nums}`;
  }
  else{
    document.getElementById("aaaaaaa").innerHTML = `No solutions found T_T`;
  }
  document.getElementById("buttonSOON").innerHTML = `
      <input type="button" value="Previous Solution" onclick = "showPrevious()"></input>
      <input type="button" value="Next Solution" onclick = "showNext()"></input>`;
   document.getElementById("Status").innerHTML = `Solution number: 1 `;

}

