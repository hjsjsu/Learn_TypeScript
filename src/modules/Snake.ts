export default class Snake {

  head: HTMLElement
  bodies: HTMLCollection
  element : HTMLElement

  constructor(top: number, left: number) {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div') as HTMLElement
    this.bodies = this.element.getElementsByTagName('div')
  }

  // 获取蛇的坐标
  get X() {
    return this.head.offsetLeft
  }

  get Y() {
    return this.head.offsetTop
  }

  set X(value:number) {
    if(this.X === value) return
    if(value < 0 || value > 290){
      throw new Error('蛇撞墙了！！')
    }

    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
      // console.log('水平方向发生了掉头！！')
      if(value > this.X){
        value = this.X - 10
      }else{
        value = this.X + 10
      }
    }

    this.moveBody()
    this.head.style.left = `${value}px`

    // 检查有没有撞到自己
    this.checkHeadBody()
  }

  set Y(value:number) {
    if(this.Y === value) return
    if(value < 0 || value > 290){
      throw new Error('蛇撞墙了！！')
    }

    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
      // console.log('水平方向发生了掉头！！')
      if(value > this.Y){
        value = this.Y - 10
      }else{
        value = this.Y + 10
      }
    }


    this.moveBody()
    this.head.style.top = `${value}px`

    // 检查有没有撞到自己
    this.checkHeadBody()
  }

  // 蛇增加身体的方法
  addBody() {
    this.element.insertAdjacentHTML("beforeend","<div></div>")
  }

  moveBody(){
    for(let i=this.bodies.length-1;i>0; i--){
      let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  checkHeadBody(){
    for(let i=1; i<this.bodies.length - 1; i++){
      let bd = this.bodies[i] as HTMLElement
      if(this.X === bd.offsetLeft && this.Y === bd.offsetTop ){
        throw new Error('蛇撞到自己了！！')
      }
    }
  }
}