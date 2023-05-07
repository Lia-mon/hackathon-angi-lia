// import * as Dlxlib from "./dlx/dlx.js"

class Shape {
  constructor(name, arr) {
      this.name = name;
      this.arr = arr;
  }

}
const s_list = ["F","I","L","N","P","T","U","V","W","X","Y","Z"]
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
          console.log("That was an invalid letter!");

          arr = [[]]             
          ;
          return new Shape("", arr);


  }

}

class Canvas{
    width = 0;
    height = 0;
    data = [];
  // x : width
  // y : height
  // h : hole list
    constructor(x,y)
    {
        let arr = [];
        for (let i = 0; i < y ; i++) {
            arr.push([]);
              for( let j = 0; j < x ; j++) {
                  arr[i].push('E');
              }
        }
        this.width = x;
        this.height = y;
        this.data = arr;
    }
  // for (let k = 0; k < hl ; k++) {
  //     // loops over the hole list
  //     // h_k0 = hole k, x value
  //     // h_k1 = hole k, y value
  //     // sets the array to 'H' where there is a hole
  //     arr[hl[k][0]][hl[k][1]]='H';
  // }
    
// String created as per the specification of part A6   
  toString()
  {
    this.data.map( x=>x.join("") ).join(" ");
  }
  
  addHoles(holeList)
  {
    holeList.forEach(e => {
        this.data[e[0],e[1]] = 'H';
    });
  }

}

//Data Objects used in the solving grid
class DataObject {

    constructor(listHeader, rowIndex) {
      this.listHeader = listHeader
      this.rowIndex = rowIndex
      this.up = this
      this.down = this
      this.left = this
      this.right = this
      if (listHeader) {
        listHeader.addDataObject(this)
      }
    }
  
    appendToRow(dataObject) {
      this.left.right = dataObject
      dataObject.right = this
      dataObject.left = this.left
      this.left = dataObject
    }
  
    appendToColumn(dataObject) {
      this.up.down = dataObject
      dataObject.down = this
      dataObject.up = this.up
      this.up = dataObject
    }
  
    unlinkFromColumn() {
      this.down.up = this.up
      this.up.down = this.down
    }
  
    relinkIntoColumn() {
      this.down.up = this
      this.up.down = this
    }
  
    loopUp(fn) { this.loop(fn, 'up') }
    loopDown(fn) { this.loop(fn, 'down') }
    loopLeft(fn) { this.loop(fn, 'left') }
    loopRight(fn) { this.loop(fn, 'right') }
  
    loop(fn, propName) {
      for (let next = this[propName]; next !== this; next = next[propName]) {
        fn(next)
      }
    }
  }

// Column Object extension.

class ColumnObject extends DataObject {

    constructor() {
      super(null, -1)
      this.previousColumnObject = this
      this.nextColumnObject = this
      this.numberOfRows = 0
    }
  
    appendColumnHeader(columnObject) {
      this.previousColumnObject.nextColumnObject = columnObject
      columnObject.nextColumnObject = this
      columnObject.previousColumnObject = this.previousColumnObject
      this.previousColumnObject = columnObject
    }
  
    unlinkColumnHeader() {
      this.nextColumnObject.previousColumnObject = this.previousColumnObject
      this.previousColumnObject.nextColumnObject = this.nextColumnObject
    }
  
    relinkColumnHeader() {
      this.nextColumnObject.previousColumnObject = this
      this.previousColumnObject.nextColumnObject = this
    }
  
    addDataObject(dataObject) {
      this.appendToColumn(dataObject)
      this.numberOfRows++
    }
  
    unlinkDataObject(dataObject) {
      dataObject.unlinkFromColumn()
      this.numberOfRows--
    }
  
    relinkDataObject(dataObject) {
      dataObject.relinkIntoColumn()
      this.numberOfRows++
    }
  
    loopNext(fn) {
      for (let next = this.nextColumnObject; next !== this; next = next.nextColumnObject) {
        fn(next)
      }
    }
  }



let wcanvas = new Canvas(4,4) ;
let darray = [];
let shownShape = shape('L');