let player1 = document.querySelector('.perso')
let player2 = document.querySelector('.perso2')
let platform = document.querySelector('.platform')
let posX1, posY1, posX2, posY2, dir = 1, dir2=2, i=0, bullets = new Array, keys = {}, moveLeft1, moveLeft2, moveRight1, moveRight2, jump, unjump, oldKey
let posYPlatform = platform.parentNode.offsetHeight - platform.offsetTop
let onPlatform1 = false, onPlatform2 = false, inAir = false

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
        keys[122]= true
        if (!inAir) {
          jump = setInterval(()=>{
            inAir = true
            posY1+=12
            posPlayer(player1)
          },10)
          setTimeout(()=>{
            clearInterval(jump)
            let maxY = posY1
            unjump = setInterval(()=>{
              posY1-=12
              if (posX1>(platform.offsetLeft-player1.offsetWidth) && posX1<(platform.offsetLeft+platform.offsetWidth)) {
                if (maxY > posYPlatform && posY1<posYPlatform) {
                  posY1=posYPlatform
                  onPlatform1 = true
                }
              }
              posPlayer(player1)
            },10)
            setTimeout(()=>{
              clearInterval(unjump)
              inAir = false
            },250)
          },250)
        }
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
    console.log(e.keyCode);
    if ((e.keyCode != 90) &&(e.keyCode!=71) && (keys[e.keyCode] || keys[oldKey] || keys[122])) {
      e.preventDefault()
    }
    else {
      if (e.keyCode==81) {
        keys[81]=true
        dir = 2
        player1.style.transform = 'scaleX(-1)'
        moveLeft1 = setInterval(()=>{
          posX1 -=5
          if (posX1 < 0) {
            posX1 = 0
          }
          if (posX1 < (platform.offsetLeft-player1.offsetWidth) && onPlatform1) {
            let descent = setInterval(()=>{
              posY1-=12
              if (posY1<0) {
                posY1=0
                onPlatform1 = false
              }
              posPlayer(player1)
              if (!onPlatform1) {
                clearInterval(descent)
              }
            },10)

          }
          posPlayer(player1)
      },10)
      }
      if (e.keyCode==37) {
        keys[37]=true
        dir2 = 2
        player2.style.transform = 'scaleX(-1)'
        moveLeft2 = setInterval(()=>{
          posX2 -=5
          console.log(posX2)
          if (posX2 < 0) {
            posX2 = 0
          }
          if (posX2 < (platform.offsetLeft-player2.offsetWidth) && onPlatform2) {
            let descent = setInterval(()=>{
              posY2-=12
              if (posY2<0) {
                posY2=0
                onPlatform2 = false
              }
              posPlayer2(player2)
              if (!onPlatform2) {
                clearInterval(descent)
              }
            },10)
          }
            posPlayer2(player2)
        },10)
      }
      if (e.keyCode==68) {
        keys[68]=true
        dir = 1
        player1.style.transform = 'scaleX(1)'
        moveRight1 = setInterval(()=>{
          posX1 +=5
          if (posX1 > (platform.offsetLeft+platform.offsetWidth) && onPlatform1) {
            let descent = setInterval(()=>{
              posY1-=12
              if (posY1<0) {
                posY1=0
                onPlatform1 = false
              }
              posPlayer(player1)
              if (!onPlatform1) {
                clearInterval(descent)
              }
            },10)
          }
          if (posX1>document.querySelector('.game').clientWidth-player1.offsetWidth) {
            posX1=document.querySelector('.game').clientWidth-player1.offsetWidth
          }
          posPlayer(player1)
      },10)
      }
      if (e.keyCode==39) {
        keys[39]=true
        dir2 = 1
        player2.style.transform = 'scaleX(1)'
        moveRight2 = setInterval(()=>{
          posX2 +=5
          if (posX2 > (platform.offsetLeft+platform.offsetWidth) && onPlatform2) {
            let descent = setInterval(()=>{
              posY2-=12
              if (posY2<0) {
                posY2=0
                onPlatform2 = false
              }
              posPlayer2(player2)
              if (!onPlatform2) {
                clearInterval(descent)
              }
            },10)
          }
          if (posX2>document.querySelector('.game').clientWidth-player2.offsetWidth) {
            posX2=document.querySelector('.game').clientWidth-player2.offsetWidth
          }
          posPlayer2(player2)
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
    clearInterval(moveLeft1)
  }
  if (keys[68]==false) {
    clearInterval(moveRight1)
  }
  if (keys[37]==false) {
    clearInterval(moveLeft2)
  }
  if (keys[39]==false) {
    clearInterval(moveRight2)
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
  posX2 = parseInt(player2.offsetLeft)
  posY1 = 0
  posY2 = parseInt(player2.parentNode.offsetHeight) - parseInt(player2.offsetTop) - parseInt(player2.offsetHeight)
}

function posPlayer(player){
  player.style.bottom = posY1 + 'px'
  player.style.left = posX1 + 'px'
}

function posPlayer2(player){
  player.style.bottom = posY2 + 'px'
  player.style.left = posX2 + 'px'
}
