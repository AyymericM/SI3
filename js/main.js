import { Player, Game, MagicBall, Sound, Ui } from './classes/index.js';
import { keys, os } from './store/GameStore.js'
// Player movement and shooting

const player1 = new Player()
const player2 = new Player()
const game = new Game()
const magicBall = new MagicBall()
const sound = new Sound()
const ui = new Ui()

document.getElementById('btnMute').addEventListener('click', function() {
  sound.muteSound()
  if (sound.options.muted) {
    this.innerText = "Activer le son"
  } else {
    this.innerText = "Couper le son"
  }
})

player1.init({
  id: 1,
  hero: 'tank'
})
player2.init({
  id: 2,
  hero: 'flash'
})
game.init()
magicBall.init()
ui.init()

const player1DOM = document.querySelector('#p1')
const player2DOM = document.querySelector('#p2')
const platform = document.querySelector('.platform')

/**** COMMANDES

Joueur 1 : Q-D, saut avec Z, attaque avec G
Joueur 2 : Gauche-Droite, saut avec ":", attaque avec "!"


**********/



window.addEventListener('keypress',(e)=>{press(e)})
function press(e){
  if (e.keyCode === keys[os()].press.JUMP1  /* z */ && !player1.state.inAir) {
    player1.state.isJumping = true
  }
  if (e.keyCode === keys[os()].press.FIRE1  /* g */) {
    player1.state.isShooting = true
  }
  if (e.keyCode === keys[os()].press.JUMP2 /* : */ && !player2.state.inAir) {
    player2.state.isJumping = true
  }
  if (e.keyCode === keys[os()].press.FIRE2 /* ! */) {
    player2.state.isShooting = true
  }
  if (e.keyCode === keys[os()].press.BALL1 /* h */&& magicBall.ball.ownedByP1) {
    player1.state.usingBall = true
  }
  if (e.keyCode === keys[os()].press.BALL2 /* ; */&& magicBall.ball.ownedByP2) {
    player2.state.usingBall = true
  }
}

window.addEventListener('keydown',(e)=>{hold(e)})
function hold(e){
  if (e.keyCode === keys[os()].down.RIGHT1 /* d */){
    player1.state.isMovingRight = true
  }
  if (e.keyCode === keys[os()].down.LEFT1 /* q */){
    player1.state.isMovingLeft = true
  }
  if (e.keyCode === keys[os()].down.RIGHT2 /* fleche gauche */){
    player2.state.isMovingRight = true
  }
  if (e.keyCode === keys[os()].down.LEFT2 /* fleche droite */){
    player2.state.isMovingLeft = true
  }
}

window.addEventListener('keyup',(e)=>{release(e)})
function release(e){
  if (e.keyCode === keys[os()].up.RIGHT1 /* d */){
    player1.state.isMovingRight = false
  }
  if (e.keyCode === keys[os()].up.LEFT1 /* q */){
    player1.state.isMovingLeft = false
  }
  if (e.keyCode === keys[os()].up.RIGHT2 /* fleche droite */){
    player2.state.isMovingRight = false
  }
  if (e.keyCode === keys[os()].up.LEFT2 /* fleche gauche */){
    player2.state.isMovingLeft = false
  }
  if (e.keyCode === keys[os()].up.JUMP1 /* z */) {
    player1.state.isJumping = false
  }
  if (e.keyCode === keys[os()].up.FIRE1  /* g */) {
    player1.state.isShooting = false
  }
  if (e.keyCode === keys[os()].up.JUMP2  /* : */) {
    player2.state.isJumping = false
  }
  if (e.keyCode === keys[os()].up.FIRE2  /* ! */) {
    player2.state.isShooting = false
  }
  if (e.keyCode === keys[os()].up.BALL1 /* h */) {
    player1.state.usingBall = false
  }
  if (e.keyCode === keys[os()].up.BALL2 /* ; */) {
    player2.state.usingBall = false
  }
}
function gameLoop(){
  if (player1.state.isMovingRight){
    player1.moveRight()
  }
  if (player1.state.isMovingLeft){
    player1.moveLeft()
  }
  if (!player1.state.isMovingLeft && !player1.state.isMovingRight) {
    player1.static()
  }
  if (player2.state.isMovingRight){
    player2.moveRight()
  }
  if (player2.state.isMovingLeft){
    player2.moveLeft()
  }
  if (!player2.state.isMovingLeft && !player2.state.isMovingRight) {
    player2.static()
  }
  if (player1.state.isJumping) {
    player1.jump()
  }
  if (player1.state.isShooting) {
    player1.shoot(player1DOM)
  }
  if (player2.state.isJumping) {
    player2.jump()
  }
  if (player2.state.isShooting  ) {
    player2.shoot(player2DOM)
  }
  if (player1.state.usingBall) {
    player1.useMagicBall()

  }
  if (player2.state.usingBall) {
    player2.useMagicBall()
  }

  player1.setPlayerPos()
  player2.setPlayerPos(player2DOM)
  window.requestAnimationFrame(gameLoop)
}
window.requestAnimationFrame(gameLoop)
