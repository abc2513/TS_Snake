import { Food } from "./Food";
import { Panel } from "./Panel";
import { Snake } from "./Snake";
enum Direction {
    UP, LEFT, DOWN, RIGHT
}
export class GameControl {
    snake = new Snake;
    panel = new Panel(this);
    food = new Food(this);
    direction = Direction.RIGHT;
    isLive = true;
    isRun=false;
    timer :any;
    constructor(){
        document.addEventListener("keydown",this.keydownHander.bind(this))
        document.addEventListener("click",this.ClickHander.bind(this))
    }
    //开始一局游戏
    initGame() {
        this.clearTimer()
        this.snake.element.innerHTML=`<div id="food"></div>`
        this.snake=new Snake
        this.food=new Food(this)
        this.direction=Direction.RIGHT
        this.panel=new Panel(this)
        this.isLive=true
        this.isRun=true
        document.getElementById('btn_start')!.innerText="STOP"
        this.createTimer()
    }
    //定时器处理函数
    drawFun=()=>{
        try{this.moveSnake();}
        catch(e){
            this.clearTimer()
            document.getElementById('btn_start')!.innerText="START"
            this.isLive=false
            this.isRun=false
            alert(e+"游戏结束")
        }
    }
    //游戏定时器
    createTimer=()=>{
        this.timer = setInterval(
            this.drawFun
        , 240-8*this.panel.level)
    }
    //移除游戏定时器
    clearTimer=()=>{
        clearInterval(this.timer)
    }
    //键盘按下事件的响应
    keydownHander(event: KeyboardEvent | { key: string|number } ) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
            case "w":
                if(this.direction!=Direction.DOWN) this.direction = Direction.UP;
                break;
            case "ArrowLeft":
            case "Left":
            case "a":
                if(this.direction!=Direction.RIGHT) this.direction = Direction.LEFT;
                break;
            case "ArrowDOWN":
            case "DOWN":
            case "s":
                if(this.direction!=Direction.UP) this.direction = Direction.DOWN;
                break;
            case "ArrowRight":
            case "Right":
            case "d":
                if(this.direction!=Direction.LEFT) this.direction = Direction.RIGHT;
                break;
        }
    }
    //点击事件的响应
    ClickHander(event : Event){
        // console.log((event.target as HTMLElement).id)
        switch((event.target as HTMLElement).id){
            case "btn_start":
                if(this.isLive){
                    this.isRun=!this.isRun
                    document.getElementById('btn_start')!.innerText=(this.isRun?'STOP':"RUN")
                    if(this.isRun){
                        this.createTimer()
                    }else{
                        this.clearTimer()
                    }
                }
                else{
                    this.initGame()
                }
                break
            case "btn_up":
                if(this.direction!=Direction.DOWN)this.direction=Direction.UP;
                break;
            case "btn_help":
                alert("点击START按钮开始/暂停游戏。点击按钮控制蛇的方向，或者使用键盘WASD/↑←↓→")
                break;
            case "btn_left":
                if(this.direction!=Direction.RIGHT)this.direction=Direction.LEFT;
                break;
            case "btn_down":
                if(this.direction!=Direction.UP)this.direction=Direction.DOWN;
                break;
            case "btn_right":
                if(this.direction!=Direction.LEFT)this.direction=Direction.RIGHT;
                break;
                
        }
    }
    //蛇的移动
    moveSnake() {
        switch (this.direction) {
            case Direction.UP:
                this.snake.move(0, -1, this.food ,this.panel)
                break
            case Direction.LEFT:
                this.snake.move(-1, 0, this.food ,this.panel)
                break
            case Direction.DOWN:
                this.snake.move(0, 1, this.food ,this.panel)
                break
            case Direction.RIGHT:
                this.snake.move(1, 0, this.food ,this.panel)
                break
            default:
                throw new Error('意料之外的方向')
        }
    }
    //等级改变，修改定时器速度
    levelChange(){
        this.clearTimer()
        this.createTimer()
    }
}