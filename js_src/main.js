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
