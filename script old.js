// Defining the square's dimensions
// Will later be calculated as a percentage of the total grid area etc
const square_length = 25;
const margin = 4;
const unit = margin+square_length;
// Draws our unit square on the canvas context with it's upper-left edge on the x,y coordinates
function drawSquare(ctx,x,y,c='white'){
  ctx.fillStyle='white';
  ctx.strokeRect(x,y,square_length,square_length);
}

const gridDraw = document.getElementById("gridDraw");

function drawGrid(){
  // get grid dimensions
  const gridw = document.getElementById("gridw").value
  const gridh = document.getElementById("gridh").value

  // reset the canvas
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  canvas.width = unit*(gridw)+1.5*unit;
  canvas.height = unit*(gridh)+1.5*unit;
  // ctx.fillStyle='white'
  // ctx.fillRect(0,0,unit,unit*gridh);
  // ctx.fillRect(0,0,unit*gridw,unit);

  // Draw the squares in the grid
  ctx.font = "15px serif";
  ctx.fillStyle='white';
  for(let x = 1; x <= gridw ; x++)
  {
    for(let y = 1; y <= gridh; y++)
    {
      ctx.fillRect(x*unit,y*unit,square_length,square_length)
    }

  }

  ctx.fillStyle='black';
  for(let x= 1; x<= gridw; x++)
  {
    ctx.fillText(x.toString(),x*unit,unit*0.8);
  }
  for(let y= 1; y<= gridh; y++)
  {
    ctx.fillText(y.toString(),unit*0.2,y*unit+unit*0.8);
  }
}

// gridDraw.addEventListener('click',drawGrid);


// if (canvas.getContext){
//   const ctx = canvas.getContext("2d");

//   ctx.fillStyle = 'white';
//   ctx.fillRect(0,0,margin,margin);

// }

// test script
// const ctx = document.getElementById("canvas").getContext("2d");
// drawSquare(ctx,0,0);