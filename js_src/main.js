drawShape(shownShape);
drawGrid();

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
          //introduce 2 smaller inner loop check
          // console.log(`checking pos [${x},${y}]`)
          for(let m = 0 ; m < sx ; m ++){
              for (let k = 0; k < sy ; k++)
              {
                  if(shape_a[k][m]==1){
                      if(grid[y+k][x+m]!='E'){
                          flag = false;
                          // console.log(`found hole at [${x+m}, ${y+k}]`)
                      }
                  }
                  if(flag!=true)
                  {   
                      break;
                  }
              }
              if(flag!=true)
              {
               break;
              } 
          }

          // if(shape_a[k][m]==1){
          //     if(grid[k][m]!='E'){
          //         flag = false;
          //     }
      
          // if(!flag){
          //     y+=
          //     break;
          // }
          if(flag){ 
            valids.push([x,y]);
          };
      }
      // if(flag){ 
      //   valids.push([x,y]);
      // };
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
  // fill shape with squares
  // if filled square touches a single square remove 3
  // if it touches two squares add 0
  // if it touches three squares add 2
  // touching 4 should not be possible
}

// Answers A7
function mix(shp1,shp2,pos)
{
  

}
//answers a10
//Takes available shapes + a canvas 
// and returns all solutions in the form specified
function solve(shapeIds,canvas)
{
  //Initializing some memory
  const solutions = [];
  // n is number of pentaminoes we can use
  // will be used later to better determine each shape :D
  const empty_spots = countCanvas(canvas)["empty"];
  if(! [5,10,15,20,25,30,35,40,45,50,55,60].some(e=>e==empty_spots)){
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
  //NEW LOOP EXPERIMENTAL
  shapeCombos.forEach(sp=>{ //First level selects allowed combos
    const pmatrix = []; //Initializes an exact cover matri
    const chart = totalChart(sp,canvas); //Generates a chart for each combo
    sp.forEach(s=>{ //Selects a shape
      const perms = generatePermutations(shape(s)); //Generates the shape's permutations
      perms.forEach(perm=>{
        //For each permutation we translate its matrix into relative path coords
        const spath = toShapePath(perm.arr);  
        //and also calculate all possible positions it can be placed on a canvas
        const positions = findAllPositions(perm,canvas);  
        positions.forEach(pos=>{
          //Each position + shape combo after charted translates to a row for the exact cover matrix
          pmatrix.push(equivRow(s,spath,chart,pos));  
        })
      })
    })
    let solution = [];
    if(pmatrix.length>0)
      solution = solveMatrix(pmatrix);  //We solve the matrix

    if(solution.length>0){
      solution.forEach(s=>{
        //We unchart each solution for our shape combination and add it
        solutions.push(unchartedSol(s,canvas,chart)) 
        })
      }
  })
  return solutions;
}

function gsolve(shapeIds,canvas){

  // const solutions = solve(shapeIds,canvas); 
  const solutions = solve(shapeIds,canvas); //Multi Solution try :D
  const nums = solutions.length;

  // const chart = totalChart(shapeIds,canvas);

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
    // document.getElementById("aaaaaaa").innerHTML = `Total solutions found (includes symmetric sols) : ${nums} <br>  Unique solutions : ${nums/sym}`;
  }
  else{
    document.getElementById("aaaaaaa").innerHTML = `No solutions found T_T`;
  }
  // const tab = document.getElementById("thonking");
  // let cell = tab.appendChild(document.createElement('tr'));
  document.getElementById("buttonSOON").innerHTML = `
    <td>
      <input type="button" value="Previous Solution" onclick = "showPrevious()"></input>
      <input type="button" value="Next Solution" onclick = "showNext()"></input>
      </td>`;
   document.getElementById("Status").innerHTML = `<td>Solution No : 1 </td> `;
  // document.getElementById("buttonSOON").innerHTML += `<input type="button" value="Previous Solution" onclick = "showPrevious()"></input></td>`;

}

