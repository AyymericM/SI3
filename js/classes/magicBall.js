const root = document.getElementById('root')

export default class MagicBall {
    constructor(){
        this.state = {
          initPosX: Math.floor(Math.random()*root.offsetWidth),
          initPosY: Math.floor(Math.random()*root.offsetHeight),
          currentPosX: undefined,
          currentPosY: undefined,
          nextPosX: 0,
          nextPosY: 0,
          speed: 200,
          spawnTime: 5000 + Math.floor(Math.random()*5000)
        }
    }

    init(){
        this.spawnBall()

    }

    spawnBall(){
        const ball = document.createElement('div')
        ball.classList.add('magicBall')
        ball.style.left = this.state.initPosX - ball.offsetWidth + 'px'
        ball.style.top = this.state.initPosY  - ball.offsetHeight + 'px'
        setTimeout(()=>{
            root.appendChild(ball)
            this.moveBall()
          },this.state.spawnTime)
    }

    positionBall(posX,posY){
      let ball = document.querySelector('.magicBall')
      ball.style.left = posX - ball.offsetWidth + 'px'
      ball.style.top = posY - ball.offsetHeight + 'px'
    }


    generateNextPos(){
        let ball = document.querySelector('.magicBall')
        do {
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            this.state.nextPosX = this.state.currentPosX + (plusOrMinus*Math.floor(Math.random()*500))
        } while (this.state.nextPosX < 0 || this.state.nextPosX > (root.offsetWidth-ball.offsetWidth) );
        do {
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            this.state.nextPosY = this.state.currentPosY + plusOrMinus*Math.floor(Math.random()*500)
        } while (this.state.nextPosY < 0 || this.state.nextPosY > (root.offsetHeight-ball.offsetHeight));

    }

    setCurrentPos(nextPosX,nextPosY){
        this.state.currentPosX = nextPosX
        this.state.currentPosY = nextPosY
    }

    getDistance(){
        return Math.sqrt(Math.pow((this.state.nextPosX - this.state.currentPosX),2)+Math.pow((this.state.nextPosY - this.state.currentPosY),2))
    }

    moveBall(){
        let ball = document.querySelector('.magicBall')
        if (this.state.currentPosX === undefined && this.state.currentPosY === undefined) {
            this.state.currentPosX = this.state.initPosX
            this.state.currentPosY = this.state.initPosY
        }
        setInterval(()=>{
          this.generateNextPos()
          let time = this.getDistance()/this.state.speed
          ball.style.transition = `all ${time}s ease-in-out`
          this.positionBall(this.state.nextPosX,this.state.nextPosY)
          this.setCurrentPos(this.state.nextPosX,this.state.nextPosY)
        },2000)
    }
}
