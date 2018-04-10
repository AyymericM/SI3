let player1 = document.querySelector('.perso')
let posX1, posY1, dir = 1, i=0, bullets = new Array, keys = {}, moveLeft, moveRight, jump, oldKey

init()

window.addEventListener(
  'keypress',
  function(e){
    console.log(e.keyCode)
    if (keys[e.keyCode]) {
      e.preventDefault()
    }
    else {
      if (e.keyCode == 122) {
        player1.classList.add('jumping')
        setTimeout(()=>{
          player1.classList.remove('jumping')
        },500)
      }
      if (e.keyCode==103) {
        keys[103]=true
        shoot(player1)
      }
    }
  },false
)

window.addEventListener(
  'keydown',
  function(e){
    if ((e.keyCode != 90) &&(e.keyCode!=71) && (keys[e.keyCode] || keys[oldKey] || keys[122])) {
      e.preventDefault()
    }
    else {
      if (e.keyCode==81) {
        keys[81]=true
        dir = 2
        player1.style.transform = 'scaleX(-1)'
        moveLeft = setInterval(()=>{
          posX1 -=5
          if (posX1 < 0) {
            posX1 = 0
          }
          posPlayer(player1)
      },10)
      }
      if (e.keyCode==68) {
        keys[68]=true
        dir = 1
        player1.style.transform = 'scaleX(1)'
        moveRight = setInterval(()=>{
          posX1 +=5
          if (posX1>document.querySelector('.game').clientWidth-player1.offsetWidth) {
            posX1=document.querySelector('.game').clientWidth-player1.offsetWidth
          }
          posPlayer(player1)
      },10)
      }

    }
    oldKey = e.keyCode
  }
)



window.addEventListener('keyup', (e) => {
  console.log(e.keyCode)
  keys[e.keyCode] = false
  if (keys[81]==false) {
    clearInterval(moveLeft)
  }
  if (keys[68]==false) {
    clearInterval(moveRight)
  }
  if (keys[90]==false) {
    keys[122]=false
  }
  if (keys[71]==false) {
    keys[103]=false
  }
}
)

function shoot(player){
  let newBullet = document.createElement('div')
  newBullet.classList.add('bullet')
  newBullet.setAttribute('id',`b${i}`)
  if (dir ==2) {
    newBullet.style.transform = 'scaleX(-1)'
  }
  document.querySelector('.game').appendChild(newBullet)
  let bullet = document.querySelector(`#b${i}`)
  bullets.push(bullet)
  let top = player.offsetHeight/6
  bullets[i].style.top = parseInt(player.offsetTop) + top  + 'px'
  bullets[i].style.left = parseInt(player.offsetLeft) + 'px'
  bulletMove(dir, bullets[i])
  i++
}

function bulletMove(dir, element){
  let posXBullet = parseInt(element.offsetLeft)
  if (dir == 1) {
    let timer = setInterval(
      function(){
        posXBullet += 10
        if (posXBullet > window.innerWidth - element.offsetWidth) {
          clearInterval(timer)
          document.querySelector('.game').removeChild(element)
        }
        else{
          element.style.left = posXBullet + 'px'
        }
      },10
    )
  }
  if (dir == 2) {
    let timer = setInterval(
      function(){
        posXBullet -= 10
        if (posXBullet < 0) {
          clearInterval(timer)
          document.querySelector('.game').removeChild(element)
        }
        else{
          element.style.left = posXBullet + 'px'
        }
      },10
    )
  }
}

function init(){
  posX1 = parseInt(player1.offsetLeft)
  posY1 = parseInt(player1.parentNode.offsetHeight) - parseInt(player1.offsetTop) - parseInt(player1.offsetHeight) - 3
}

function posPlayer(player){
  player.style.bottom = posY1 + 'px'
  player.style.left = posX1 + 'px'
}
