function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            healCounter: 0,
            winner: null,
            logArray: []
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) this.winner = "draw"; //draw
            else if (value <= 0) this.winner = "monster"; //player lost
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) this.winner = "draw"; //draw
            else if (value <= 0) this.winner = "player" //monster lost
        }
    },
    computed: {
        playerHealthBar() { 
            if (this.playerHealth < 0) return { width: "0%" };
            else return { width: this.playerHealth + "%" };
        },
        monsterHealthBar() { 
            if (this.monsterHealth < 0) return { width: "0%" };
            else return { width: this.monsterHealth + "%" };
        },
        isSpecialAttackAvailable() {
            return this.currentRound <= 3;
        },
        isHealAvailable() {
            return this.healCounter <= 2;
        }
    },
    methods: {
        attackMonster() {
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessage("Player", "attack and does ", attackValue, "damage!");
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue
            this.addLogMessage("Monster", "attack and does ", attackValue , "damage!");
            this.currentRound++;
            this.healCounter++;
        },
        specialAttackMonster() {
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage("Player", "a special attack and does ", attackValue, "damage!");
            this.currentRound = 0;
            this.attackPlayer();
        },
        healPlayer() {
            healValue = getRandomValue(14, 20);
            if (this.playerHealth + healValue > 100) this.playerHealth = 100;
            else this.playerHealth += healValue;
            this.addLogMessage("Player", "heal and gained ", healValue, "health points.");
            this.healCounter = 0;
            this.attackPlayer();
        },
        surrender() {
            this.playerHealth = 0;
        },
        restartGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.healCounter = 0;
            this.winner = null;
            this.logArray = [];
        },
        addLogMessage(who, what, value, effect) {
            this.logArray.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,
                actionEffect: effect
            });
        }
    }
});

app.mount("#game");