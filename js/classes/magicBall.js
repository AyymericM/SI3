import Game from './game.js'

const root = document.getElementById('root')

export default class MagicBall extends Game{
    constructor(){
        super(Game)
    }

    init(){
        this.spawnBall()

    }

    spawnBall(){
        const ball = document.createElement('div')
        ball.classList.add('magicBall')
        ball.style.left = this.ball.initPosX - ball.offsetWidth + 'px'
        ball.style.top = this.ball.initPosY  - ball.offsetHeight + 'px'
        setTimeout(()=>{
            root.appendChild(ball)
            this.moveBall()
          },this.ball.spawnTime)
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
            this.ball.nextPosX = this.ball.currentPosX + (plusOrMinus*Math.floor(Math.random()*500))
        } while (this.ball.nextPosX < 0 || this.ball.nextPosX > (root.offsetWidth-ball.offsetWidth) );
        do {
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            this.ball.nextPosY = this.ball.currentPosY + plusOrMinus*Math.floor(Math.random()*500)
        } while (this.ball.nextPosY < 0 || this.ball.nextPosY > (root.offsetHeight-ball.offsetHeight));

    }

    setCurrentPos(nextPosX,nextPosY){
        this.ball.currentPosX = nextPosX
        this.ball.currentPosY = nextPosY
    }

    getDistance(){
        return Math.sqrt(Math.pow((this.ball.nextPosX - this.ball.currentPosX),2)+Math.pow((this.ball.nextPosY - this.ball.currentPosY),2))
    }

    moveBall(){
        let ball = document.querySelector('.magicBall')
        if (this.ball.currentPosX === undefined && this.ball.currentPosY === undefined) {
            this.ball.currentPosX = this.ball.initPosX
            this.ball.currentPosY = this.ball.initPosY
        }
        setInterval(()=>{
          this.generateNextPos()
          let time = this.getDistance()/this.ball.speed
          ball.style.transition = `all ${time}s ease-in-out`
          this.positionBall(this.ball.nextPosX,this.ball.nextPosY)
          this.setCurrentPos(this.ball.nextPosX,this.ball.nextPosY)
        },2000)
    }
}
