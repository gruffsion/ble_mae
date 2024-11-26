// game.js
let score = 0;
const scoreDisplay = document.getElementById('scoreValue');


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
            // loop through villages in sequence
            const village = this.villages[this.villages.length - this.guessesRemaining];
            this.currentVillageIndex = this.allVillages.indexOf(village);
    
            // Display the current village name
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
        this.villages = this.getFiveRandomVillages(); // Get 5 new unique villages
        this.currentVillageIndex = null; // Reset current index
        scoreDisplay.textContent = 0;
    
        // Remove old village DOM elements
        document.querySelectorAll('#mapContainer span').forEach(span => span.remove());
    
        // Position new villages on the map
        this.villages.forEach(village => {
            const coordinatesMatch = village.coordinates.match(/Point\(([^ ]+) ([^ ]+)\)/);
            if (coordinatesMatch) {
                const longitude = parseFloat(coordinatesMatch[1]);
                const latitude = parseFloat(coordinatesMatch[2]);
                village.spanId = `village-${longitude}-${latitude}`; // Regenerate unique ID
                positionVillage(village.villageLabel, latitude, longitude, village.spanId);
            }
        });
    
        this.start();
    }
    
    
}
