import {QuickSort} from "./QuickSort";

export class Index{
    x:number;
    y:number;
    constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }
}

export function Pos(x:number,y:number):Index{
    return new Index(x,y);
}

export enum NodeType{
    Start,
    End,
    Open,
    Close
}

export class Node extends Index{
    g:number=0;
    h:number=0;
    type:NodeType=NodeType.Open;
    parent:Node;

    constructor(x:number,y:number){
        super(x,y);
    }
    
    f():number{
        return this.g+this.h;
    }

    equal(other:Node):boolean{
        cc.log(other);
        return this.x===other.x && this.y===other.y;
    }
}

const SearchRange:number[][]=[
        [0,1],
    [-1,0],[1,0],
        [0,-1]
];


export function Search(nodes:Node[][],one:Index,other:Index):Node[]{
    let arr_open:Node[]=[];
    let arr_close:Node[]=[];
    var arr_path:Node[]=[];
    let row=nodes.length;
    let col=nodes[0].length;

    for(let y=0;y<row;y++){
        for(let x=0;x<col;x++){
            if(nodes[y][x].type===NodeType.Close){
                arr_close.push(nodes[y][x]);
            }
        }
    }
    let start=nodes[one.y][one.x];
    let end=nodes[other.y][other.x];
    start.type=NodeType.Start;
    end.type=NodeType.End;
    start.g=0;
    start.h=_reckon(start,end);
    arr_open.push(start);

    while(arr_open.length>0){
        const sort=function(one:Node,other:Node):boolean{
            return one.f()<other.f();
        };
        QuickSort<Node>(arr_open,0,arr_open.length-1,sort);

        let node=arr_open[0];
        if(node.type===NodeType.End)break;

        for(let i=0;i<SearchRange.length;i++){
            let x=node.x+SearchRange[i][0];
            let y=node.y+SearchRange[i][1];
            if(x>=0 && y>=0 && x<col && y<row){
                let next=nodes[y][x];
                if(arr_close.indexOf(next)<0){
                    next.g=node.g+1;
                    next.h=_reckon(next,end);
                    next.parent=node;
                    if(arr_open.indexOf(next)<0){
                        arr_open.push(next);
                    }
                }
            }
        }
        arr_open.shift();
        arr_close.push(node);
    }
    while(end.parent!=null){
        arr_path.push(end);
        end=end.parent;
    }
    return arr_path.reverse();
}

function _reckon(start:Node,end:Node){
    return Math.abs(start.x-end.x)+Math.abs(start.y-end.y);
}