const selectDuel = document.getElementById('btn1v1')
const selectIa = document.getElementById('btn1via')

selectDuel.addEventListener('click', (e) => {
    e.preventDefault()
    setStorage({mode: 1})
})

selectIa.addEventListener('click', (e) => {
    e.preventDefault()
    setStorage({mode: 2})
})

function setStorage(data) {
    if (localStorage.getItem('gameData')) {
        localStorage.removeItem('gameData')
    }

    localStorage.setItem('gameData', JSON.stringify(data))

    window.location = window.location.toString().replace('/menu.html', '/') + 'player.html'
    return false;
}