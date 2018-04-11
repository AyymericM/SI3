const keys = {
    mac: {
        press: {
            JUMP1: 122,
            FIRE1: 103,
            JUMP2: 58,
            FIRE2: 61,
        },
        down: {
            LEFT1: 81,
            RIGHT1: 68,
            LEFT2: 37,
            RIGHT2: 39,
        },
        up: {
            LEFT1: 81,
            RIGHT1: 68,
            LEFT2: 37,
            RIGHT2: 39,
            JUMP1: 90,
            FIRE1: 71,
            JUMP2: 186,
            FIRE2: 187
        }
    },
    win: {
        press: {
            JUMP1: 122,
            FIRE1: 103,
            JUMP2: 58,
            FIRE2: 33,
        },
        down: {
            LEFT1: 81,
            RIGHT1: 68,
            LEFT2: 37,
            RIGHT2: 39,
        },
        up: {
            LEFT1: 81,
            RIGHT1: 68,
            LEFT2: 37,
            RIGHT2: 39,
            JUMP1: 90,
            FIRE1: 71,
            JUMP2: 191,
            FIRE2: 223
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