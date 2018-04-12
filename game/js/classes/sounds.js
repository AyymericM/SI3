const ambiant = new Audio('./sounds/ambiant.wav')
const gameOver = new Audio('./sounds/gameOver.mp3')
const jump = new Audio('./sounds/jump.mp3')
const powerUp = new Audio('./sounds/powerUp.mp3')
const shoot = new Audio('./sounds/shoot.mp3')

export default class Sound {
    // sound variables
    constructor() {
        this.options= {
            muted: false
        }
    }

    // mute music
    muteSound() {        
        this.options.muted = !this.options.muted
        if (this.options.muted === true) {
            this.stopAmbiant()
        } else {
            this.playAmbiant()
        }
    }

    // start ambiant music
    playAmbiant() {        
        if (!this.options.muted) {
            ambiant.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            });
            ambiant.play()
        }
    }
    
    // stop ambiant music
    stopAmbiant() {
        ambiant.removeEventListener('ended', () => {})
        ambiant.pause()
    }
    
    // gameover music and stop ambiant
    gameOver() {
        if (!this.options.muted) {
            this.stopAmbiant()
            gameOver.play()
        }
    }
    
    // jump sound
    jump() {
        if (!this.options.muted) {
            jump.currentTime = 0
            jump.play()
        }
    }
    
    // power up sound
    powerUp() {
        if (!this.options.muted) {
            powerUp.currentTime = 0
            powerUp.play()
        }
    }
    
    // shooting sound
    shoot() {
        if (!this.options.muted) {
            shoot.currentTime = 0
            shoot.play()
        }
    }
}