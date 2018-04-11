const ambiant = new Audio('./sounds/ambiant.wav')
const gameOver = new Audio('./sounds/gameOver.mp3')
const jump = new Audio('./sounds/jump.mp3')
const powerUp = new Audio('./sounds/powerUp.mp3')
const shoot = new Audio('./sounds/shoot.mp3')

export default class Sound {
    constructor() {
        this.options= {
            muted: false
        }
    }

    muteSound() {        
        this.options.muted = !this.options.muted
        if (this.options.muted === true) {
            this.stopAmbiant()
        } else {
            this.playAmbiant()
        }
    }

    playAmbiant() {        
        if (!this.options.muted) {
            ambiant.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            });
            ambiant.play()
        }
    }
    
    stopAmbiant() {
        ambiant.removeEventListener('ended', () => {})
        ambiant.pause()
    }
    
    gameOver() {
        if (!this.options.muted) {
            this.stopAmbiant()
            gameOver.play()
        }
    }
    
    jump() {
        if (!this.options.muted) {
            jump.currentTime = 0
            jump.play()
        }
    }
    
    powerUp() {
        if (!this.options.muted) {
            powerUp.currentTime = 0
            powerUp.play()
        }
    }
    
    shoot() {
        if (!this.options.muted) {
            shoot.currentTime = 0
            shoot.play()
        }
    }
}