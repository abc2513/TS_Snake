import { GameControl } from "./GameControl";
import { GridPoint } from "./GridPoint";

export class Food extends GridPoint{
    control :GameControl;
    constructor(control :GameControl){
        if(document.getElementById('food')==null)throw new Error("找不到food元素")
        super(document.getElementById('food')!);
        this.control=control
        this.change()
    }
    change(){
        let x=Math.floor(Math.random()*28)+2;
        let y=Math.floor(Math.random()*28)+2;
        let isErr=true
        //新位置不能是蛇身
        while(isErr){
            isErr=false
            let tempNode = this.control.snake.body.rearNode?.lastNode;
            x=Math.floor(Math.random()*28)+2;
            y=Math.floor(Math.random()*28)+2;
            while (tempNode != null){
                if(tempNode.data.gridX==x&&tempNode.data.gridY==y){
                    isErr=true
                    break
                }
                tempNode=tempNode.lastNode
            }
        }


        this.setgridLocation(x,y);
    }
}