import { GameControl } from "./GameControl";

export class Panel{
    score=0;
    level=1;
    levelStep=3;
    maxLevel=8;
    scoreElement:HTMLElement;
    levelElement:HTMLElement;
    control:GameControl;
    constructor(control:GameControl){
        this.control=control
        this.scoreElement=document.getElementById("score")!
        this.levelElement=document.getElementById("level")!
        this.scoreElement.innerHTML= ++this.score+'';
        this.levelElement.innerHTML=this.level+'';
    }
    ScoreIncrease(){
        this.scoreElement.innerHTML= ++this.score+'';
        this.levelChange();
    }
    levelChange(){
        let newLevel=Math.round(Math.min(this.score/this.levelStep,this.maxLevel));
        if(this.level!=newLevel){
            this.level=newLevel
            this.control.levelChange();
        }
        this.levelElement.innerHTML=this.level+'';
    }
}