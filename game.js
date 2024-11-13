// game.js
let score = 0;
let highScore = 0;
const scoreDisplay = document.getElementById('scoreValue');
const highScoreDisplay = document.getElementById('highScoreValue'); 


class Game {
    constructor(villages) {
        this.allVillages = villages;
        this.villages = this.getFiveRandomVillages();
        this.currentVillageIndex = null;
        this.villageElements = [];
        this.guessesRemaining = 5;
        this.totalScore = 0;
    }

    getFiveRandomVillages() {
        const shuffled = this.allVillages.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 5);
    }

    start() {
        this.villageElements = Array.from(document.querySelectorAll('#mapContainer span'));
        this.pickRandomVillage();
    }

    pickRandomVillage() {
        if (this.guessesRemaining > 0) {
            const index = Math.floor(Math.random() * this.villages.length);
            this.currentVillageIndex = index;
            const village = this.villages[index];
            document.getElementById('placeNameDisplay').textContent = `${village.villageLabel}, ${village.regionLabel}`;
        } else {
            this.displayFinalScore();
        }
    }

    checkCircleCoverage(circle) {
        const circleRect = circle.getBoundingClientRect();
        const circleCenterX = circleRect.left + circleRect.width / 2;
        const circleCenterY = circleRect.top + circleRect.height / 2;

        const currentVillage = this.villages[this.currentVillageIndex];
        const villageElement = document.getElementById(currentVillage.spanId);
        if (!villageElement) return;

        const villageRect = villageElement.getBoundingClientRect();
        const villageCenterX = villageRect.left + villageRect.width / 2;
        const villageCenterY = villageRect.top + villageRect.height / 2;

        const distance = Math.sqrt(
            Math.pow(circleCenterX - villageCenterX, 2) +
            Math.pow(circleCenterY - villageCenterY, 2)
        );

        this.updateScore(distance);
    }

    updateScore(distance) {
        let points;
        if (distance < 20) {
            points = 10;
        } else if (distance < 50) {
            points = 7;
        } else if (distance < 100) {
            points = 5;
        } else if (distance < 200) {
            points = 2;
        } else {
            points = 0;
        }

        this.totalScore += points;
        scoreDisplay.textContent = this.totalScore;

        this.displayCorrectAnswer();
        this.guessesRemaining--;
        this.pickRandomVillage();
    }

    displayCorrectAnswer() {
        const villageElement = document.getElementById(this.villages[this.currentVillageIndex].spanId);
        villageElement.classList.add('highlighted');
        setTimeout(() => {
            villageElement.classList.remove('highlighted');
        }, 3000);
    }

    displayFinalScore() {
        const maxScore = 5 * 10;
        const percentageScore = Math.round((this.totalScore / maxScore) * 100);
        alert(`Game Over! Your score is: ${percentageScore}%`);
        this.resetGame();
    }

    resetGame() {
        this.totalScore = 0;
        this.guessesRemaining = 5;
        this.villages = this.getFiveRandomVillages();
        scoreDisplay.textContent = 0;
        this.start();
    }
}
