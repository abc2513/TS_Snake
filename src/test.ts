import { Queue } from "./class/Queue"
import { Snake } from "./class/Snake"
export function testQueue(){
    let quene=new Queue<string>
    quene.print()
    quene.push('1')
    quene.push('2')
    quene.push('3')
    quene.print()
    console.log(quene.shift())
    quene.print()
}
export function testSnake(){
    let snake =new Snake
    console.log(snake)
}