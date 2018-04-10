const root = document.getElementById('root')

export default class Game {
    init() {
        this.createPlatform()
    }

    createPlatform() {
        const platform = document.createElement('div')
        const platformBody = document.createElement('div')
        const hitbox = document.createElement('div')
        platform.classList.add('platform')
        platformBody.classList.add('platformBody')
        hitbox.classList.add('platformHitBox')
        root.appendChild(platform)
        root.appendChild(hitbox)
        root.appendChild(platformBody)
    }
}
