
let score = 0;
let highScore = 0;
const scoreDisplay = document.getElementById('scoreValue');
const highScoreDisplay = document.getElementById('highScoreValue'); 

class Game {
    constructor(villages) {
        this.villages = villages; // The list of villages from your JSON data
        this.currentVillageIndex = null; // To keep track of the current village
        this.villageElements = []; // This will store references to the village <span> elements
    }

    start() {
        this.villageElements = Array.from(document.querySelectorAll('#mapContainer span'));
        this.pickRandomVillage();
    }

    pickRandomVillage() {
        if (this.villages.length > 0) {
            const index = Math.floor(Math.random() * this.villages.length);
            this.currentVillageIndex = index;
            const village = this.villages[index];
            let userConsole = document.getElementById('placeNameDisplay');
            userConsole.textContent = `${village.villageLabel}, ${village.regionLabel}`;

            // this.highlightVillage(village.spanId);
        } else {
            console.error("No villages are available to pick.");
        }
    }

    highlightVillage(spanId) {
        this.villageElements.forEach(span => {
            if (span.id === spanId) {
                span.classList.add('highlighted');
            } else {
                span.classList.remove('highlighted');
            }
        });
    }

    checkCircleCoverage(circle) {
        const circleRect = circle.getBoundingClientRect();
        const circleCenterX = circleRect.left + circleRect.width / 2;
        const circleCenterY = circleRect.top + circleRect.height / 2;

        const currentVillage = this.villages[this.currentVillageIndex];
        const villageElement = document.getElementById(currentVillage.spanId);

        if (!villageElement) {
            console.error('No village element found for the current village.');
            return;
        }

        const villageRect = villageElement.getBoundingClientRect();
        const villageCenterX = villageRect.left + villageRect.width / 2;
        const villageCenterY = villageRect.top + villageRect.height / 2;

        const distance = Math.sqrt(
            Math.pow(circleCenterX - villageCenterX, 2) +
            Math.pow(circleCenterY - villageCenterY, 2)
        );
        const radius = circleRect.width / 2;

        if (distance <= radius) {
            this.updateScore(true);
        } else {
            this.updateScore(false);
        }
    }

    updateScore(isCorrect) {
        if (isCorrect) {
            score++;
            alert('Cywir!');
        } else {
            score = 0;
            alert('Anghywir! Sgôr: ' + score);
        }
        scoreDisplay.textContent = score;
        this.displayCorrectAnswer();
        this.checkHighScore();
        this.pickRandomVillage();
    }

    displayCorrectAnswer() {
        let villageElement = document.getElementById(this.villages[this.currentVillageIndex].spanId);
        villageElement.classList.add('highlighted');
        setTimeout(() => {
            villageElement.classList.remove('highlighted');
        }, 3000);
    }

    checkHighScore() {
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = highScore;
        }
    }
}
