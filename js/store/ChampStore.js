const ChampStats = {
    tank: {
        mvSpeed: 100,
        mvJump: 1,
        pv: 300,
        atDmg: 50,
        atAccuracy: 0.6,
        atSpeed: 1.3,
        special: {
            mvSpeed: 130,
            atSpeed: 0.4
        }
    },
    flash: {
        mvSpeed: 300,
        mvJump: 1,
        pv: 50,
        atDmg: 15,
        atAccuracy: 0.7,
        atSpeed: 1.7,
        special: {
            mvJump: 2
        }
    },
    sniper: {
        mvSpeed: 150,
        mvJump: 1,
        pv: 150,
        atDmg: 40,
        atAccuracy: 1,
        atSpeed: 1.15,
        special: {
            atDmg: 80
        }
    },
    soldier: {
        mvSpeed: 150,
        mvJump: 1,
        pv: 200,
        atDmg: 25,
        atAccuracy: 0.8,
        atSpeed: 1.5,
        special: {
            atDmg: 35
        }
    },
}

export { ChampStats }