class Node<E>{
    data:E;
    lastNode:Node<E>|null;
    constructor(data:E){
        this.data=data
        this.lastNode=null;
    }
}
export class Queue<E>{
    rearNode:Node<E>|null;//队尾
    constructor(){
        this.rearNode=null;
    }
    push(newData:E){
        //入队，无分支
        let newNode=new Node(newData);
        newNode.lastNode=this.rearNode;
        this.rearNode=newNode;
    }
    shift():E|null{
        //出队：无节点返回null，有1节点时置空尾部并退出头一，有2+节点时置空头二并返回头一
        if(this.rearNode==null){
            return null;
        }
        let resultNode=this.rearNode;
        let nextNode=null;
        while(resultNode.lastNode!=null){
            nextNode=resultNode;
            resultNode=resultNode.lastNode;
        }
        if(nextNode!=null){
            nextNode.lastNode=null;
        }else{
            this.rearNode=null
        }
        return resultNode.data;
    }
    get front():E|null{
        //获取队头
        if(this.rearNode==null){
            return null;
        }
        let resultNode=this.rearNode;
        while(resultNode.lastNode!=null){
            resultNode=resultNode.lastNode;
        }
        return resultNode.data;
    }
    print(){
        let resultString="["
        if(this.rearNode!=null){
            let resultNode=this.rearNode;
            while(resultNode.lastNode!=null){
                resultString+=resultNode.data+','
                resultNode=resultNode.lastNode;
            }
            resultString+=resultNode.data
        }
        resultString+="]"
        console.log(resultString)

    }
    get lenght(){
        let result=0
        if(this.rearNode!=null){
            let tempNode:Node<E>|null=this.rearNode;
            while(tempNode!=null){
                result++
                tempNode=tempNode.lastNode
            }
        }
        return result
    }
}
