import { ChampStats } from '../store/ChampStore.js'

const menu = document.getElementById('menu')
const ui = document.getElementById('ui')

export default class Ui {

    init() {
        menu.style.visibility = 'visible'
        ui.style.visibility = 'visible'
        this.displayInfos()
    }

    displayInfos() {
        const p1 = document.getElementById('p1')
        const p2 = document.getElementById('p2')
        const p1name = document.getElementById('p1name')
        const p2name = document.getElementById('p2name')
        const p1pv = document.getElementById('p1pv')
        const p2pv = document.getElementById('p2pv')
        setInterval(() => {
            if (p1 && p2) {
                p1pv.style.width = ((p1.dataset.pv / ChampStats[p1.dataset.champ].pv) * 100) + '%'
                p2pv.style.width = ((p2.dataset.pv / ChampStats[p2.dataset.champ].pv) * 100) + '%'
                
                p1name.innerText = p1.dataset.champ
                p2name.innerText = p2.dataset.champ
            }
        }, 100)
    }

    displayGameOver() {
        const goverDOM = document.getElementById('gameOver')
        goverDOM.style.visibility = 'visible'
    }
}