const ambiant = new Audio('./sounds/ambiant.wav')
const gameOver = new Audio('./sounds/gameOver.mp3')
const jump = new Audio('./sounds/jump.mp3')
const powerUp = new Audio('./sounds/powerUp.mp3')
const shoot = new Audio('./sounds/shoot.mp3')

export default class Sound {
    constructor() {
        this.muted = false
    }

    muteSound() {
        this.muted = !this.muted
        this.stopAmbiant()
    }

    playAmbiant() {
        if (!this.muted) {
            ambiant.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            });
            ambiant.play()
        }
    }
    
    stopAmbiant() {
        if (!this.muted) {
            ambiant.removeEventListener('ended', () => {})
            ambiant.pause()
            ambiant.currentTime = 0
        }
    }
    
    gameOver() {
        if (!this.muted) {
            this.stopAmbiant()
            gameOver.play()
        }
    }
    
    jump() {
        if (!this.muted) {
            jump.currentTime = 0
            jump.play()
        }
    }
    
    powerUp() {
        if (!this.muted) {
            powerUp.currentTime = 0
            powerUp.play()
        }
    }
    
    shoot() {
        if (!this.muted) {
            shoot.currentTime = 0
            shoot.play()
        }
    }
}