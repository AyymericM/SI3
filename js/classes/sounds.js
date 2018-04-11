const ambiant = new Audio('./sounds/ambiant.wav')
const gameOver = new Audio('./sounds/gameOver.mp3')
const jump = new Audio('./sounds/jump.mp3')
const powerUp = new Audio('./sounds/powerUp.mp3')
const shoot = new Audio('./sounds/shoot.mp3')

export default class Sound {
    playAmbiant() {
        ambiant.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        });
        ambiant.play()
    }
    
    stopAmbiant() {
        ambiant.removeEventListener('ended', () => {})
        ambiant.pause()
        ambiant.currentTime = 0
    }
    
    gameOver() {
        this.stopAmbiant()
        gameOver.play()
    }
    
    jump() {
        jump.currentTime = 0
        jump.play()
    }
    
    powerUp() {
        powerUp.currentTime = 0
        powerUp.play()
    }
    
    shoot() {
        shoot.currentTime = 0
        shoot.play()
    }
}