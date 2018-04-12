const maps = document.querySelectorAll('.map')

for (let i = 0; i < maps.length; i++) {
    maps[i].addEventListener('click', function(e) {
        e.preventDefault()
        setStorage({map: this.dataset.map})
    })
}

function setStorage(data) {
    if (!localStorage.getItem('gameData')) {
        const newLoc = window.location.origin + '/epic-fight/menu/index.html'
        window.location = newLoc
        return false;
    } else {
        const localData = JSON.parse(localStorage.getItem('gameData'))
        const newData = Object.assign(localData, data)
        localStorage.setItem('gameData', JSON.stringify(newData))
        const newLoc = window.location.origin + '/epic-fight/game/index.html'
        window.location = newLoc
        return false;
    }
}