import { ChampStats } from '../store/ChampStore.js'

const menu = document.getElementById('menu')
const ui = document.getElementById('ui')

export default class Ui {
    // ui initialization
    init() {
        menu.style.visibility = 'visible'
        ui.style.visibility = 'visible'
        this.displayInfos()
    }

    // game UI displays
    displayInfos() {
        const p1 = document.getElementById('p1')
        const p2 = document.getElementById('p2')
        const pia = document.getElementById('pIA')
        const p1name = document.getElementById('p1name')
        const p2name = document.getElementById('p2name')
        const p1pv = document.getElementById('p1pv')
        const p2pv = document.getElementById('p2pv')
        const p1face = document.querySelector('#p1face')
        const p2face = document.querySelector('#p2face')
        const p1pvleft = document.querySelector('#p1pvleft')
        const p2pvleft = document.querySelector('#p2pvleft')
        const playerover = document.querySelector('.p-over')

        // game UI setting up
        p1face.style.background = `url(./img/ui/${p1.dataset.champ}_head.png)`
        p1face.style.backgroundSize = 'contain'
        p1face.style.backgroundRepeat = 'no-repeat'

        // game UI constant refresh
        if (p2 != null) {
          p2face.style.background = `url(./img/ui/${p2.dataset.champ}_head.png)`
          p2face.style.backgroundSize = 'contain'
          p2face.style.backgroundRepeat = 'no-repeat'
          p2name.style.background = 'url(./img/ui/player2.png)'
          p2name.style.backgroundRepeat = 'no-repeat'

          setInterval(() => {
              if (p1 && p2) {
                  p1pvleft.innerHTML = p1.dataset.pv
                  p2pvleft.innerHTML = p2.dataset.pv
                  p1pv.style.width = ((p1.dataset.pv / ChampStats[p1.dataset.champ].pv) * 100) + '%'
                  p2pv.style.width = ((p2.dataset.pv / ChampStats[p2.dataset.champ].pv) * 100) + '%'


              }
          }, 100)
        }
        else if (pia != null) {

          p2face.style.background = `url(./img/ui/${pia.dataset.champ}_head.png)`
          p2face.style.backgroundSize = 'contain'
          p2face.style.backgroundRepeat = 'no-repeat'
          p2name.style.background = 'url(./img/ui/ia.png)'
          p2name.style.backgroundRepeat = 'no-repeat'
          setInterval(() => {
              if (p1 && pia) {
                  p1pvleft.innerHTML = p1.dataset.pv
                  p2pvleft.innerHTML = pia.dataset.pv
                  p1pv.style.width = ((p1.dataset.pv / ChampStats[p1.dataset.champ].pv) * 100) + '%'
                  p2pv.style.width = ((pia.dataset.pv / ChampStats[pia.dataset.champ].pv) * 100) + '%'


              }
          }, 100)
        }
          p2name.style.backgroundPosition = 'right';

    }

    // display game over screen
    displayGameOver() {
        const goverDOM = document.getElementById('gameOver')
        goverDOM.style.visibility = 'visible'
    }
}
