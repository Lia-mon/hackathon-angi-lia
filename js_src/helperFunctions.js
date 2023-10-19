function drawGrid(){
  darray = []; 
  // get grid dimensions
  const gridw = document.getElementById("gridw").value
  const gridh = document.getElementById("gridh").value
  
  // reset the canvas
  const grid = document.getElementById('grid1');
  grid.innerHTML = "";
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
  printGrid();
  return grid;
}
//basically draws a given canvas on our grid
//works in much the same way as drawGrid()
//but doesn't create clickable holes.
function drawCnvs(cnvs){
  darray = [];
  darray.push(...cnvs.data); 
  // get grid dimensions
  document.getElementById("gridw").value = cnvs.width
  document.getElementById("gridh").value = cnvs.height
  
  // reset the grid
  const grid = document.getElementById('grid1');
  grid.innerHTML="";

  for(let y=0; y < cnvs.height +1 ; y++){
    let tr = grid.appendChild(document.createElement('tr'));

    for(let x=0; x < cnvs.width + 1; x++){

      let cell = tr.appendChild(document.createElement('td'));

      // draws coordinates
      if (x*y==0){
        cell.innerHTML = x+y;
      }
      // makes the cells empty
      else{
        if(darray[y-1][x-1] == 'E'){
          cell.className = 'empty';
        }
        else{
          cell.style.backgroundColor = 'var(--' + darray[y-1][x-1] +')';
        }
      }
    }
  }
  //  let table = document.getElementById("grid1");
  //  console.log(grid);
  // console.log(darray);
  wcanvas.width = darray[0].length;
  wcanvas.height = darray.length;
  wcanvas.data = darray;
  printGrid();
  return grid;
}

function drawGridFromS(){
  const gString = document.getElementById("gString").value;

  drawCnvs(
    toCnvs(
      readStr(gString)
      )
    );
}

function addHole(cell,x,y){
  cell.className='hole';
  darray[y-1][x-1] = 'H';
  wcanvas.data[y-1][x-1] = 'H';
  cell.removeEventListener('click',()=>(addHole(cell,x,y)));
  cell.addEventListener('click',()=>(emptyBox(cell,x,y)))
  printGrid();
}

function emptyBox(cell,x,y){
  cell.className = 'empty';
  darray[y-1][x-1] = 'E';
  wcanvas.data[y-1][x-1] = 'E';
  cell.removeEventListener('click',()=>(emptyBox(cell,x,y)))
  cell.addEventListener('click',()=>(addHole(cell,x,y)))
  printGrid();
}

function printGrid(){
  const gridS = document.getElementById("gridString");

  gridS.innerHTML = darray.map( x=>x.join("") ).join(" ");
}

function printArr(a){
  return a.map( x=>x.join("") ).join(" ");
}

function readStr(str){
  return str.split(" ").map( e=>e.split(""));
}

function toCnvs(tdarr){
  width = tdarr[0].length;
  height = tdarr.length;

  cnvs = new Canvas(width,height);
  cnvs.data = tdarr;

  return cnvs;
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
  const tims = document.getElementById("timetaken");
  tims.innerHTML= `${Math.round(end - start)} ms`;
  // return (`Execution time: ${end - start} ms`) ;
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

// There's at most 8 different permutations, we generate all 8 and then
// use a set to reduce to fitler to unique ones
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
    result.push(new Shape(`${ogname}${i}`,readStr(element)));
    i++;
  });

  //Most innefficient way to do this
  //Copies so many times and does so many things V_V
  return result;
}


// Basically takes an array of the permutations as computed
// by the generatePermutations() function
// and draws it in a specific html element
function drawPermutations(result){
  const permuts = document.getElementById("permutations");

  permuts.innerHTML = "";
  result.forEach(e => {
    const tbl = permuts.appendChild(document.createElement("table"))
    tbl.id = `perm${e.name}`;
    permuts.appendChild(tbl);

    const sap = {name : ogname, arr : e.arr};
    drawShape(sap,tbl.id)
  });
}

//Charts the 2D-grid to 1D data
//Basically enumerates each empty box
function gridChart(cnvs,start=0){
  let x = 0;
  let y = 0;
  let chart = {};
  let empty = start;

  for(x=0 ; x < cnvs.width ; x++){
    for(y=0; y<cnvs.height; y++){
      if(cnvs.data[y][x]=="E")
      {
        chart[[x,y]]=empty;
        empty ++;
      }
    }
  }

  return chart;
}

//Creates a chart that assigns each 2D-grid WITH color/filled to 1D data
//Does not simply enumerate introduces an extra bit to indicate shape id
function totalChart(shapeIds,cnvs){
  let shapeChart = {};
  let i = 0;

  for(sI in shapeIds){
    shapeChart[shapeIds[sI]] = i;
    i++;
  }
  
  finalChart = {...shapeChart,...gridChart(cnvs,start=i)}

  return finalChart;
}

//Shape path
//Basically the coordinates for where the shape exists relative to a ref point
//the ref point is (0,0)
function toShapePath(shape_data)
{
  const w = shape_data[0].length;
  const h = shape_data.length;

  let path = [];

  let x = 0;
  let y = 0;

  for (x = 0 ; x < w ; x++){
    for (y=0 ; y < h ; y++){
      if(shape_data[y][x]==1)      
        path.push([x,y]);  
    }
  }

  return path;
}

//Gets the complete chart of a grid with possible shapes to be used
//and uses it to assign value to a position of the given shape
// 
// example: equivRow('P',toShapePath(shape('P').arr),totalChart(s_list,wcanvas),[0,0])
function equivRow(shape_id,shape_path,chartE,pos){
  const cols = Object.keys(chartE).length;
  let k = 0;
  let row = [];
  let p = [0,0];
  //initialize
  for(k=0; k < cols ; k++){
    row.push(0);
  }

  row[chartE[shape_id]] = 1;

  shape_path.forEach(path => {
    p[0] = pos[0]+path[0];
    p[1] = pos[1]+path[1];
    row[chartE[p]] = 1;
  });

  return row;
}

//Restores a solution from matrix-row form to a Canvas object
function unchartedSol(solution,canvas,chart){

  const width = canvas.width;
  const height = canvas.height;
  const solcnvs= new Canvas(width,height);
  const arr = [];

  for(let y = 0 ; y < height ; y++){
    const newr = [];
    for(let x = 0 ; x < width; x++){
      newr.push('H');
    }
    arr.push(newr);
  }
  const keys = Object.keys(chart);

  solution.forEach(r=>{
    // console.log(r);
    let i =0;
    let letter = `E`;
    for(i = 0 ; i < r.length - countCanvas(canvas).empty ; i++){
      if(r[i] == 1){
        letter = keys[i];
      }
    }
    for( ; i < r.length ; i++){
      if(r[i]==1){
        const xy = keys[i].split(",");
        arr[xy[1]][xy[0]] = letter;
      }
    }
  }
  )
  // console.log(solcnvs)
  solcnvs.data = arr;

  return solcnvs;
}

function getShapes()
{
  let shapes_used = [];

  s_list.forEach(e => {
    if(document.getElementById(`check${e}`).checked)
    {
      shapes_used.push(e);
    }
  });

  return shapes_used;
}

function powerset(array) {
  const subsets = [[]];
  
  for (const el of array) {
      const last = subsets.length-1;
      for (let i = 0; i <= last; i++) {
          subsets.push( [...subsets[i], el] );
      }
  }
  
  return subsets;
}

function showNext(){
  nSol++;
  if( nSol == gSolutions.length){
    document.getElementById("Status").innerHTML = `You've reached the end! Amazing`;
    nSol --;
  }  
  if (nSol < gSolutions.length){
    document.getElementById("Status").innerHTML = `Solution number: ${nSol+1} `;
    drawCnvs(gSolutions[nSol]);
  }
  return;
}

function showPrevious(){
  nSol--;
  if( nSol == -1){
    document.getElementById("Status").innerHTML = `You've reached the start already! Solution : 1 `;
    nSol ++;
  }  
  if (nSol < gSolutions.length && nSol > -1){
    document.getElementById("Status").innerHTML = `Solution number: ${nSol+1}`;
    drawCnvs(gSolutions[nSol]);
  }

  return;
}

function downloadConfig(){
  const jason = {solutions : gSolutions, currentSolution : nSol};
  const data = new Blob(
    [JSON.stringify(jason,null,2)], {
    type: 'application/json'
});

  const url = window.URL.createObjectURL(data);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'configuration.json';
  link.click();

  window.URL.revokeObjectURL(url);
}

function loadConfig(){
  document.getElementById('myfile').addEventListener("change", ()=>{
    const file = document.getElementById('myfile').files[0];
    const reader = new FileReader();
    // file.addEventListener("change", handleSelected);
    reader.readAsText(file, 'UTF-8');
    reader.onload = (evt)=> {
      const data = JSON.parse(evt.target.result);
      gSolutions = data["solutions"];
      nSol = data["currentSolution"];

      drawCnvs(gSolutions[nSol]);
      document.getElementById("aaaaaaa").innerHTML = `Total solutions found (includes symmetric sols) : ${gSolutions.length}`;
      // document.getElementById("aaaaaaa").innerHTML = `Total solutions found (includes symmetric sols) : ${nums} <br>  Unique solutions : ${nums/sym}`;
      document.getElementById("buttonSOON").innerHTML = `
        <input type="button" value="Previous Solution" onclick = "showPrevious()"></input>
        <input type="button" value="Next Solution" onclick = "showNext()"></input>`;

      document.getElementById("Status").innerHTML = `Solution number: 1 `;
    
  }});

}