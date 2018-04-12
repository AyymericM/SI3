const keys = {
    mac: {
        press: {
            JUMP1: 122,
            FIRE1: 101,
            BALL1: 97,
            JUMP2: 111,
            FIRE2: 105,
            BALL2: 112
        },
        down: {
            LEFT1: 81,
            RIGHT1: 68,
            LEFT2: 75,
            RIGHT2: 77,
        },
        up: {
            LEFT1: 81,
            RIGHT1: 68,
            LEFT2: 75,
            RIGHT2: 77,
            JUMP1: 90,
            BALL1: 65,
            FIRE1: 69,
            JUMP2: 79,
            FIRE2: 73
        }
    },
    win: {
        press: {
            JUMP1: 122,
            FIRE1: 101,
            BALL1: 97,
            JUMP2: 111,
            FIRE2: 105,
            BALL2: 112
        },
        down: {
            LEFT1: 81,
            RIGHT1: 68,
            LEFT2: 75,
            RIGHT2: 77,
        },
        up: {
            LEFT1: 81,
            RIGHT1: 68,
            LEFT2: 75,
            RIGHT2: 77,
            JUMP1: 90,
            BALL1: 65,
            FIRE1: 69,
            JUMP2: 79,
            FIRE2: 73
        }
    }
}


function os() {
    if (navigator.userAgent.toString().includes('Macintosh')) {
        return 'mac'
    } else {
        return 'win'
    }
}

export { keys, os }
