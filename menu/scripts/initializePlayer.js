const players = document.querySelectorAll('.player')

// get player selection buttons
for (let i = 0; i < players.length; i++) {
    players[i].addEventListener('click', function(e) {
        e.preventDefault()
        setStorage({skin: this.dataset.champ}, this.getAttribute('href'))
    })
}

// set player on storage
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