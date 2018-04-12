const players = document.querySelectorAll('.player')

for (let i = 0; i < players.length; i++) {
    players[i].addEventListener('click', function(e) {
        e.preventDefault()
        setStorage({skin: this.dataset.champ}, this.getAttribute('href'))
    })
}

function setStorage(data, skinLoc) {
    if (!localStorage.getItem('gameData')) {
        const newLoc = window.location.origin + '/epic-fight/menu/index.html'
        window.location = newLoc
        return false;
    } else {
        const localData = JSON.parse(localStorage.getItem('gameData'))
        const newData = Object.assign(localData, data)
        localStorage.setItem('gameData', JSON.stringify(newData))
        const newLoc = window.location.origin + '/epic-fight/menu/' + skinLoc
        window.location = newLoc
        return false;
    }
}