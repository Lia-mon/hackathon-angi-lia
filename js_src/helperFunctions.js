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
  // console.log(darray);
  wcanvas.width = darray[0].length;
  wcanvas.height = darray.length;
  wcanvas.data = darray;
  return grid;
}

function toggle(source) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] != source)
          checkboxes[i].checked = source.checked;
  }
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

function printArr(a){
  return a.map( x=>x.join("") ).join(" ");
}

function readArr(str){
  return str.split(" ").map( e=>e.split(""));
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
  console.log(`Execution time: ${end - start} ms`);

  return (`Execution time: ${end - start} ms`) ;
}

function drawShape(gshape,elemID = 'shapeDraw'){

  // reset the canvas
  const grid = document.getElementById(elemID);
  grid.innerHTML="";
  gridh = gshape.arr.length;
  gridw = gshape.arr[0].length;
 
  for(let y=0; y <gridh ; y++){
    let tr = grid.appendChild(document.createElement('tr'));
    for(let x=0; x <gridw; x++){
 
      let cell = tr.appendChild(document.createElement('td'));
      // console.log(gshape.arr[y][x]);
 
      if(gshape.arr[y][x]== 1){
       cell.style.backgroundColor = 'var(--' + gshape.name +')';
      }
      
      }
    }
 
 }

 function redrawShape(f){
  shownShape.arr = f(shownShape.arr);
  drawShape(shownShape)
}

function fillShapeTable(){

  shownShape = shape(document.getElementById("shapes").value);
  drawShape(shownShape);

}

// Basically there's 8 different permutations, we generate all 8 and then
// use set to reduce to unique ones
// Uses a set to check permutations cause I am lazy :)
// it was a lot more trouble than it was worth :D
function generatePermutations(shp){
  
  s = new Set();
  ogname = shp.name;

  ogarr = shp.arr;
  fliparr = flipX(ogarr);

  s.add(printArr(ogarr));
  s.add(printArr(fliparr));
  for(let i = 0; i< 3; i++)
  { 
    ogarr = rotateR(ogarr);
    fliparr = rotateR(fliparr);

    s.add(printArr(ogarr));
    s.add(printArr(fliparr));
  }
  let i = 0;
  let result = []
  s.forEach(element => {
    result.push(new Shape(`${ogname}${i}`,readArr(element)));
    i++;
  });

  //Most innefficient way to do this
  //Copies so many times and does so many things V_V
  const permuts = document.getElementById("permutations");
  let m = 2;
  let n = 2;
  if(result.length == 1)
  {
    m = 1;
    n = 1;
  }
  if(result.length < 3)
  {
    m = 2;
    n = 1;
  }
  if(result.length > 4)
  {
      m = 4;
      n = 2;
  }
  
  

  permuts.style["grid-template-columns"] = `repeat(${m}, 1fr)`
  permuts.style["grid-template-rows"] = `repeat(${n}, 1fr)`

  permuts.innerHTML = "";
  result.forEach(e => {
    const tbl = permuts.appendChild(document.createElement("table"))
    tbl.style = "border : 1px solid black"
    tbl.id = `perm${e.name}`;
    permuts.appendChild(tbl);

    const sap = {name : ogname, arr : e.arr};
    drawShape(sap,tbl.id)
  });

  return result;
}

