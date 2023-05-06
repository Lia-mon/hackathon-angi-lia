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
                    [1,1,1],
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


function findAllPositions(s,canvas){
    let grid = canvas.data;
    let width = canvas.width;
    let height = canvas.height;

    let sx = s.sh_arr[0].length;
    let sy = s.sh_arr.length;
    let shape_a = s.sh_arr;
    let flag = true;

    // let initx =0;
    // let inity =0;

    // let steps = [];
    let valids =[];

    // let holestepx = 0;
    // let holestepy = 0;

    //initial position invalid slots?
    for(let x = 0; x < width - sx ; x++){
        flag = true;
        for(let y = 0 ; y < height - sy ; y++){
            flag = true;
            //introduce smaller loop check
            for(let m = 0 ; m < sx ; m ++){
                for (let k = 0; k < sy ; k++)
                {
                    if(shape_a[k][m]==1){
                        if(grid[y+k][x+m]!='E'){
                            flag = false;
                        }
                    }
                    if(!flag)
                    {   
                        break;
                    }
                }
                if(!flag)
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
        }
        if(flag){ 
            valids.push([x,y]);
        };

        
    }

    //check each position linearly
    //add valid positions to a list
    // for(let x = 0 ; x < width - sx ; x++ )
    // {}
    return valids;
}

function genSteps(s){
    let sx = s.sh_arr[0].length;
    let sy = s.sh_arr.length;

    let steps = [];



}

