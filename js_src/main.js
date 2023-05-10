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
  const pmatrixes = [];
  let perms = [];
  const solutions = [];
  
  let positions = [];
  let spath = [];

  // n is number of pentaminoes we can use
  // will be used later to better determine each shape :D
  const n = Math.round(countCanvas(canvas)["empty"] /5 );

  console.log(`Canvas shapes that can be used : ${n}`);

  const shapeCombos = powerset(shapeIds).filter(e=>e.length==n) ; //no Braces V_V

  // const chart = totalChart(shapeIds,canvas); // chart should be determined by shaped to be tried/each time
  // console.log(`The shape combos ${shapeCombos.toString()}`);
  // console.log(shapeCombos);

  //TODO : fix a shape with the same symmetries as the canvas to reduce computations
  // and only find unique up to symmetry solutions

  //TODO : Use shapeCombos for smaller grids to and check all possible combos

  //generates the exact cover equivalent matrix
  //NEW LOOP EXPERIMENTAL
  shapeCombos.forEach(sp=>{
    const pmatrix = [];
    const chart = totalChart(sp,canvas); 
    sp.forEach(s=>{
      perms = generatePermutations(shape(s));
      perms.forEach(perm=>{
        spath = toShapePath(perm.arr);
        positions = findAllPositions(perm,canvas);
        positions.forEach(pos=>{
          pmatrix.push(equivRow(s,spath,chart,pos));
        })
      })
    })
    const solution = solveMatrix(pmatrix);
    console.log(solution);
    if(solution.length>0){
      solution.forEach(s=>{
        solutions.push(unchartedSol(s,canvas,chart))
        })
      }
    // pmatrixes.push(pmatrix,chart);
  })

  //OLD LOOP WORKING
  //   const s = shapeIds[sP];
  //   perms = generatePermutations(shape(s));
  //   for(permP in perms ){
  //     const perm = perms[permP]
  //     spath = toShapePath(perm.arr);
  //     positions = findAllPositions(perm,canvas);
  //     for(posP in positions)      {
  //       const pos = positions[posP] ;
  //       pmatrix.push(equivRow(s,spath,chart,pos));
  //     }
  //   }
  // }

  // console.log(pmatrix);
  
  //unchart solutions

  

  // pmatrixes.forEach(matrix_combo=>{
  //   solutions.push([solveMatrix(matrix_combo[0]),matrix_combo[1]]);
  // })
  // drawCnvs(unchartedSol(solutions[0],canvas,shapeIds,chart));

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
    // document.getElementById("aaaaaaa").innerHTML = `Total solutions found (includes symmetric sols) : ${nums}`;
    document.getElementById("aaaaaaa").innerHTML = `Total solutions found (includes symmetric sols) : ${nums} <br>  Unique solutions : ${nums/sym}`;
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

