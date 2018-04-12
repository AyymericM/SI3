// ALL CHAMPION STATS

const ChampStats = {
    "tank": {
        name: "tank",
        mvSpeed: 0.70,
        mvJump: 1,
        pv: 250,
        atDmg: 40,
        atAccuracy: 0.6,
        atSpeed: 0.65,
        special: {
            mvSpeed: 1.30,
            atSpeed: 0.4
        }
    },
    "flash": {
        name: "flash",
        mvSpeed: 1.60,
        mvJump: 1,
        pv: 60,
        atDmg: 10,
        atAccuracy: 0.7,
        atSpeed: 0.3,
        special: {
            mvJump: 2
        }
    },
    "sniper": {
        name: "sniper",
        mvSpeed: 1.30,
        mvJump: 1,
        pv: 150,
        atDmg: 30,
        atAccuracy: 1,
        atSpeed: 0.85,
        special: {
            atDmg: 80
        }
    },
    "soldier": {
        name: "soldier",
        mvSpeed: 1.0,
        mvJump: 1,
        pv: 200,
        atDmg: 20,
        atAccuracy: 0.8,
        atSpeed: 0.5,
        special: {
            atDmg: 35
        }
    },
}

export { ChampStats }
