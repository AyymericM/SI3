import {Game, Sound} from './index.js'

const root = document.getElementById('root')
const sound = new Sound()

export default class MagicBall extends Game{
    constructor(){
        super(Game)
    }

    init(){
        this.spawnBall()
        setInterval(()=>{ // Check if player on ball
          this.checkPlayer()
        },10)
    }

    /* spawn ball randomly after some time**/
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


    /** Check if player on ball **/
    checkPlayer(){
      let els = {
          ball: document.querySelector('.magicBall'),
          player1: document.querySelector('#p1'),
          player2: document.querySelector('#p2')
      }
      if (els.ball != null) { // check if ball appeared yet
          //check for P1
          if (els.ball.offsetLeft > els.player1.offsetLeft && els.ball.offsetLeft < (els.player1.offsetLeft + els.player1.offsetHeight) && els.ball.offsetTop > els.player1.offsetTop && els.ball.offsetTop < (els.player1.offsetTop + els.player1.offsetHeight)) {
              clearInterval(this.ball.moving)

              els.ball.style.transition = `all 0.5s ease-in-out`

              this.positionBall(root.offsetWidth/8,root.offsetHeight/4) //move ball on the side of P1
              this.ball.ownedByP1 = true
              this.ball.ownedByP2 = false
          }
          //check for P2
          if (els.player2 != null) {
              if (els.ball.offsetLeft > els.player2.offsetLeft && els.ball.offsetLeft < (els.player2.offsetLeft + els.player2.offsetHeight) && els.ball.offsetTop > els.player2.offsetTop && els.ball.offsetTop < (els.player2.offsetTop + els.player2.offsetHeight)) {
                  clearInterval(this.ball.moving)
                  if (!els.ball.style.transition) {
                    els.ball.style.transition = `all 0.5s ease-in-out`
                  }
                  this.positionBall(root.offsetWidth-(root.offsetWidth/8),root.offsetHeight/4) // move ball on the side of P2
                  this.ball.ownedByP2 = true
                  this.ball.ownedByP1 = false
              }
          }

      }

    }

    positionBall(posX,posY){
      let ball = document.querySelector('.magicBall')
      ball.style.left = posX - ball.offsetWidth + 'px'
      ball.style.top = posY - ball.offsetHeight + 'px'
    }

    //get a random position
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
        if (this.ball.currentPosX === undefined && this.ball.currentPosY === undefined) { //when ball has not moved yet
            this.ball.currentPosX = this.ball.initPosX
            this.ball.currentPosY = this.ball.initPosY
        }
        this.ball.moving = setInterval(()=>{
          this.generateNextPos()
          let time = this.getDistance()/this.ball.speed
          ball.style.transition = `all ${time}s ease-in-out`
          this.positionBall(this.ball.nextPosX,this.ball.nextPosY)
          this.setCurrentPos(this.ball.nextPosX,this.ball.nextPosY)
        },2000)
    }
}
