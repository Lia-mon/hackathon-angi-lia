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

function generatePermutations(s){
  list = [];
  ogname = s.name;

  s.name = `${ogname}0`

  flipped = s;
  flipped.name =  `${ogname}1`;
  flipped.arr = flipX(s.arr);

  list.push(s);
  list.push(flipped);

  // for(let i = 0 ; i < 3 ; i++){
  //   shape.name = `${ogname}${2*i+2}`;
  //   shape.arr = rotateR(shape.arr);
  //   flipped.name =  `${ogname}${2*i+3}`;
  //   flipped.arr = rotateR(shape.arr) ;
  //   s.push(shape);
  //   s.push(flipped);

  // }

  return list;
}