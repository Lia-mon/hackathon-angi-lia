//Basically implements the data structures described in Donald Knuth's Dancing Link's paper
//A transformation function that given an exact cover matrix creates the underlying linked structure
//and the search function that is used to solve the problem

class DataObject {
  constructor(chead,rowIndex) {
      this.up = this;
      this.down = this;
      this.left = this;
      this.right = this;
      this.head = chead;
      this.rowIndex = rowIndex;
      if(chead){
        chead.addDataObject(this);
      }
  }

  connectUp(other) {
      this.up = other;
      other.down = this;
  }

  connectDown(other) {
      this.down = other;
      other.up = this;
  }

  connectLeft(other) {
      this.left = other;
      other.right = this;
  }

  connectRight(other) {
      this.right = other;
      other.left = this;
  }

  appendLeft(other) {
      this.left.connectRight(other);
      this.connectLeft(other);
  }

  appendUp(other) {
      this.up.connectDown(other);
      this.connectUp(other);
  }

  coverVertical(){
    this.up.connectDown(this.down);
  }

  uncoverVertical(){
    this.up.down = this;
    this.down.up = this;
  }

  remove(){
    this.up.connectDown(this.down);
    this.left.connectRight(this.right);
  }

}

class ColumnObject extends DataObject{
  constructor(nameid){
    super(null,-1);
    this.size = 0;
    if(nameid){
      this.name = nameid;
    }
  }

  appendColumnHead(cObject){
    this.appendLeft(cObject);
  }

  addDataObject(dObject){
    this.appendUp(dObject);
    this.size ++ ;
  }

  coverDataObject(dObject){ 
    dObject.coverVertical();
    this.size --;
  }

  uncoverDataObject(dObject){
    dObject.uncoverVertical();
    this.size ++;
  }

  //left -> right
  //top  -> down 
  //covering the column
  cover(){
    this.left.connectRight(this.right);
    for(let i = this.down ; i!=this ; i=i.down){
      for(let j = i.right; j!=i; j = j.right){
        j.head.coverDataObject(j);
      }
    }  
  }

  //right -> left
  //down  -> top
  uncover(){
    this.left.right=this;
    this.right.left=this;
    for(let i = this.up ; i!=this ; i=i.up){
      for(let j = i.left; j!=i; j = j.left){
        j.head.uncoverDataObject(j);
      }
    }
  }
}

function createStructure(pmatrix){
  //Add some error checks here cause it breaks with an empty matrix
  const height = pmatrix.length;
  const width = pmatrix[0].length;
  //if(height*width === 0) return null;

  let x = 0;
  let y = 0;

  const root = new ColumnObject("root");

  //since the connections are circular we just make up our own heads for each row
  //we connect to each head to left as we search through the matrix
  //in the end we remove the rowHeads from our structure
  const rowHeads = [];
  for(y=0; y < height ; y ++){
    const dO = new DataObject();
    rowHeads.push(dO);
  }

  //go through the matrix for each column create a ColumnObject
  //We search top->down, left->right
  //if we find a 1 we create a DataObject and append it UP/above the current ColumnObject
  //and also appendLeft to the appropriate rowHead
  for(x=0; x < width ; x ++){
    const header = new ColumnObject();
    for(y=0 ; y < height ; y++){
      if(pmatrix[y][x]==1){
        const dO = new DataObject(header,y);
        rowHeads[y].appendLeft(dO);
      }
    }
    root.appendColumnHead(header);
  }

  for(y=0; y < height ; y ++){
    // console.log(rowHeads[y].right.up);
    rowHeads[y].remove();
    // console.log(`removed rHead :${y}`);
  }

  return root;
}

function search(k,root,sol,solutions){

  if(root.right == root){
    sol_copy = JSON.parse(JSON.stringify(sol));
    solutions.push(sol_copy);
    sol = [];
    return;
  }

  //Pick the column with the smallest size
  let min = root.right.size;
  let c = root.right;
  for(let h = c.right; h!=root ; h=h.right){
    if(h.size < min){
      c = h;
      min = h.size;
    }
  }

  c.cover();
  for(let r = c.down ; r!=c ; r=r.down){
    sol[k]=r.rowIndex;
    for(let j = r.right; j!=r ; j = j.right){
      j.head.cover();
    }
    search(k+1,root,sol,solutions);
    for(let j = r.left; j!=r ; j = j.left){
      j.head.uncover();
    }  
  }
  c.uncover();

  return;
}

//returns an array of all perfect cover submatrixes (subrows?)
function solveMatrix(pmatrix){
  const rawSols = [];
  const solutions = [];
  const root = createStructure(pmatrix);

  search(0,root,{},rawSols);

  rawSols.forEach(s =>{
    const sol =[];
    for(rS in s){
      sol.push(pmatrix[s[rS]])
    }
    solutions.push(sol);
  }
  )

  return solutions;
}

// example
// solveMatrix(
//   [
//     [0,1,0,1],
//     [1,0,0,1],
//     [0,0,1,0],
//     [1,0,0,0],
//     [0,1,0,0]
//   ]
//   )


// 
// solveMatrix(
//   [
//   [0,0,1,0,1,1,0],
//   [1,0,0,1,0,0,1],
//   [0,1,1,0,0,1,0],
//   [1,0,0,1,0,0,0],
//   [0,1,0,0,0,0,1],
//   [0,0,0,1,1,0,1]
//   ]
//   )