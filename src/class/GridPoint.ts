export class GridPoint{
    private X:number;
    private Y:number;
    element:HTMLElement;
    constructor(element:HTMLElement){
        this.element=element
        this.X=1
        this.Y=1
    }
    get gridX(){
        return this.X
    }
    get gridY(){
        return this.Y
    }
    setgridLocation(x:number,y:number){
        this.X=x;
        this.Y=y;
        this.element.style.cssText=`grid-column: ${x}/${x+1};grid-row: ${y}/${y+1};`
    }
}