// import * as myLib from "shapes.js"

class Shape {
  constructor(name, sh_arr) {
      this.name = name;
      this.sh_arr = sh_arr;
  }

}

function shape(name) {
  let arr = [];
  switch (name) {
      case "F":
          arr =
              [
                  [0,1,1],
                  [1,1,0],
                  [0,1,0]
              ];
          return new Shape(name, arr);
          break;

      case "I":
          arr =
              [
                  [1],
                  [1],
                  [1],
                  [1],
                  [1]

              ];
          return new Shape(name, arr);
          break;

      case "L":
          arr = [
              [1,0],
              [1,0],
              [1,0],
              [1,1]
          ];
          return new Shape(name, arr);
          break;

      case "N":
          arr = [
              [0,1],
              [0,1],
              [1,1],
              [1,0]
          ];
          return new Shape(name, arr);
          break;

      case "P":
          arr = [
              [1,1],
              [1,1],
              [1,0]

              ];
          return new Shape(name, arr);
          break;

      case "T":
          arr =
              [
                  [1,1,1],
                  [0,1,0],
                  [0,1,0]
              ];
          return new Shape(name, arr);
          break;

      case "U":
          arr = [
              [1,0,1],
              [1,1,1]
          ];
          return new Shape(name, arr);
          break;

      case "V":
          arr =
              [
                  [0,0,1],
                  [0,0,1],
                  [1,1,1]
              ];
          return new Shape(name, arr);
          break;

      case "W":
          arr =
              [
                  [1,0,0],
                  [1,1,0],
                  [0,1,1]
              ];
          return new Shape(name, arr);
          break;

      case "X":
          arr =
              [
                  [0,1,0],
                  [1,1,1],
                  [0,1,0]
              ];
          return new Shape(name, arr);
          break;

      case "Y":
          arr =
              [
                  [0,1],
                  [1,1],
                  [0,1],
                  [0,1]
              ];
          return new Shape(name, arr);
          break;

      case "Z":
          arr =
              [
                  [1,1,0],
                  [0,1,0],
                  [0,1,1]
              ];
          return new Shape(name, arr);
          break;

      default:
          console.error("That was an invalid letter!");
          arr = [[]];
          return new Shape("", arr);


  }

}

class Canvas{
  // x : width
  // y : height
  // h : hole list
constructor(x,y) {
      let arr=[];
      for (let i = 0; i < y ; i++) {
      arr.push([]);
          for( let j = 0; j < x ; j++) {
              arr[i].push('E');

          }
      }

      // for (let k = 0; k < hl ; k++) {
      //     // loops over the hole list
      //     // h_k0 = hole k, x value
      //     // h_k1 = hole k, y value
      //     // sets the array to 'H' where there is a hole
      //     arr[hl[k][0]][hl[k][1]]='H';
      // }

      this.width = x;
      this.height = y;
      this.data = arr;
  }
}

let wcanvas = new Canvas(1,1) ;
let darray = [];
let shownShape = shape('L');

function drawGrid(){
  darray =[]; 
  // get grid dimensions
  const gridw = document.getElementById("gridw").value
  const gridh = document.getElementById("gridh").value
  
  // reset the canvas
  const grid = document.getElementById('grid1');
  grid.innerHTML="";
  for(let y=0; y <=gridh ; y++){
    let tr = grid.appendChild(document.createElement('tr'));
    let row =[];

    for(let x=0; x <=gridw; x++){

      let cell = tr.appendChild(document.createElement('td'));

      // draws coordinates
      if (x*y==0){
        cell.innerHTML = x+y;
      }
      // makes the cells empty
      else{
        cell.className = 'empty';
        cell.addEventListener('click',()=>(addHole(cell,x,y)))
        row.push('E');
      }
    }

    darray.push(row);
  }
  //  let table = document.getElementById("grid1");
  //  console.log(grid);
  darray.shift()
  console.log(darray);
  wcanvas.width = darray[0].length;
  wcanvas.height = darray.length;
  wcanvas.data = darray;
  return grid;
}

function addHole(cell,x,y){
  cell.className='hole';
  darray[y-1][x-1] = 'H';
  wcanvas.data[y-1][x-1] = 'H';
  cell.removeEventListener('click',()=>(addHole(cell,x,y)));
  cell.addEventListener('click',()=>(emptyBox(cell,x,y)))
}

function emptyBox(cell,x,y){
  cell.className = 'empty';
  darray[y-1][x-1] = 'E';
  wcanvas.data[y-1][x-1] = 'E';
  cell.removeEventListener('click',()=>(emptyBox(cell,x,y)))
  cell.addEventListener('click',()=>(addHole(cell,x,y)))
}

function printGrid(){
  const gridS = document.getElementById("gridString");

  gridS.innerHTML = darray.map( x=>x.join("") ).join(" ");
}

function printCanvas(canvas)
{
  return canvas.data.map( x=>x.join("") ).join(" ");
}

// map((e)=>"[" + e.toString() + "]" ).join(",")
// For solution size
function updateSize(){
  const new_size = document.getElementById("c_size").value;
  const r = document.querySelector(':root');

  r.style.setProperty("--cell-size",new_size.toString() +"px");
  r.style.setProperty("--cell-margin",Math.round(0.16*new_size).toString() +"px");
  r.style.setProperty("--cell-font",Math.round(0.45*new_size).toString() +"px");
}

function toggle(source) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] != source)
          checkboxes[i].checked = source.checked;
  }
}

// rorate clockwise 90 degrees 
function rotateR(twodarray){

  const yl = twodarray.length;
  const xl = twodarray[0].length;
  let result = [];

  for(let x = 0 ; x < xl ; x++){
    result.push([]);
    for(let y=0 ; y < yl ; y++){
      result[x].push( twodarray[yl-y-1] [x]);
    }
  }

  return result;
}

// rotate anticlockwise 90 degrees
function rotateL(twodarray){

  const yl = twodarray.length;
  const xl = twodarray[0].length;
  let result = [];

  for(let x = 0 ; x < xl ; x++){
    result.push([]);
    for(let y=0 ; y < yl ; y++){
      result[x].push( twodarray[y] [xl-x-1]);
    }
  }

  return result;
}

// mirror vertically
function flipX(twodarray){
  const yl = twodarray.length;
  //TODO: has to be a matrix maybe have a checker function at some point
  const xl = twodarray[0].length;
  let result = [];

  for(let y = 0 ; y < yl ; y++){
    result.push([]);
    for(let x=0 ; x < twodarray[y].length ; x++){
      result[y].push( twodarray[y] [xl-x-1]);
    }
  }

  return result;

}
// mirror horizontally
function flipY(twodarray){
  const yl = twodarray.length;
  const xl = twodarray[0].length;
  let result = [];

  for(let y = 0 ; y < yl ; y++){
    result.push(twodarray[yl-y-1]);
  }

  return result;

}

async function timeFunction(f){
  const start = performance.now();

  await f();

  const end = performance.now();

  return (`Execution time: ${end - start} ms`) ;
}

function drawShape(gshape){

 // reset the canvas
 const grid = document.getElementById('shapeDraw');
 grid.innerHTML="";
 gridh = gshape.sh_arr.length;
 gridw = gshape.sh_arr[0].length;

 for(let y=0; y <gridh ; y++){
   let tr = grid.appendChild(document.createElement('tr'));
   for(let x=0; x <gridw; x++){

     let cell = tr.appendChild(document.createElement('td'));
     console.log(gshape.sh_arr[y][x]);

     if(gshape.sh_arr[y][x]== 1){
      cell.style.backgroundColor = 'var(--' + gshape.name +')';
     }
     
     }
   }

}

function redrawShape(f)
{
  shownShape.sh_arr = f(shownShape.sh_arr);
  drawShape(shownShape)
}
// drawShape(shownShape);

function fillShapeTable(){

  shownShape = shape(document.getElementById("shapes").value);
  drawShape(shownShape);
}
// QUESTION A4
// Basically brute force, go through each position
// check each cell that the shape is on
// if it finds a hole, moves on
function findAllPositions(s,canvas){
  const grid = canvas.data;
  const width = canvas.width;
  const height = canvas.height;

  const sx = s.sh_arr[0].length;
  const sy = s.sh_arr.length;
  const shape_a = s.sh_arr;
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