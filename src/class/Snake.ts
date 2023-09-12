import { Food } from "./Food";
import { GridPoint } from "./GridPoint";
import { Panel } from "./Panel";
import { Queue } from "./Queue";

export class Snake {
    element:HTMLElement;
    body: Queue<GridPoint>;
    constructor() {
        if(document.getElementById("game_stage")!=null){
            this.element=document.getElementById("game_stage")!
        }
        else{
            throw new Error("找不到id为'game_stage'的div元素")
        }
        this.body = new Queue<GridPoint>
        let newDiv=document.createElement('div')
        newDiv.className='snake'
        this.body.push(new GridPoint(this.element.appendChild(newDiv)))
        // 开始的时候蛇的dom节点内只有0个div节点（在HTML内需要注意）
    }
    move(directionX: number, directionY: number, food:Food ,panel:Panel) {
        // 蛇移动的逻辑：判断前方物体：墙：游戏结束;身体：游戏结束;食物：new一个节点和一个ele，入队;其他： 队尾节点设置为新位置，出队再入队
        let targetX: number = (this.body.rearNode!).data.gridX + directionX
        let targetY: number = (this.body.rearNode!).data.gridY + directionY
        // 处理撞墙情况
        if (targetX <= 0 || targetX > 30 || targetY <= 0 || targetY > 30) {
            throw new Error("撞到墙啦！")
        }
        // 处理撞到自己的情况
        let tempNode = this.body.rearNode?.lastNode;
        while (tempNode != null) {
            if(tempNode.data.gridX==targetX&&tempNode.data.gridY==targetY){
                throw new Error("撞到自己啦！")
            }
            tempNode=tempNode.lastNode
        }
        // 处理吃到食物的情况,new一个ele，入队
        if(food.gridX==targetX&&food.gridY==targetY){
            console.log("吃到食物")
            let newDiv=document.createElement('div')
            newDiv.className='snake'
            this.element.appendChild(newDiv)
            let newNode=new GridPoint(newDiv)
            newNode.setgridLocation(targetX,targetY)
            this.body.push(newNode)
            panel.ScoreIncrease();
            food.change()
            return
        }else{
            //前面是空气，队尾节点设置为新位置，出队再入队
            let movingNode=this.body.shift()
            if(movingNode==null)throw new Error("蛇是空的")
            movingNode.setgridLocation(targetX,targetY)
            this.body.push(movingNode)
        }
    }
}