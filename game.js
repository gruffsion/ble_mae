// game.js
let score = 0;
let highScore = 0;
scoreDisplay = document.getElementById('scoreValue');

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
            // Update the displayed village name
            let userConsole = document.getElementById('placeNameDisplay');
            userConsole.textContent = `${village.villageLabel}, ${village.regionLabel}`;

            // Highlight the selected village for testing
            this.villageElements.forEach(span => {
                if (span.dataset.villageLabel === village.villageLabel) {
                    // span.classList.add('highlighted'); // Ensure you define .highlighted in your CSS
                } else {
                    // span.classList.remove('highlighted');
                }
            });
        } else {
            console.error("No villages are available to pick.");
        }
    }

   
    checkCircleCoverage(circle) {
    const circleRect = circle.getBoundingClientRect();
    const circleCenterX = circleRect.left + circleRect.width / 2;
    const circleCenterY = circleRect.top + circleRect.height / 2;

    const currentVillage = this.villages[this.currentVillageIndex];
    const villageElement = this.villageElements.find(span => span.dataset.villageLabel === currentVillage.villageLabel);
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
        alert('Cywir!');
            score++;
            scoreDisplay.textContent = score;
            console.log(score);
        this.displayCorrectAnswer();
        this.pickRandomVillage();
        this.checkHighScore();
    } else {
        alert('Anghywir! Sgôr: ' + score);
        this.displayCorrectAnswer();
        this.checkHighScore();
        score = 0;
        scoreDisplay.textContent = score;
        this.displayCorrectAnswer();
         this.pickRandomVillage();
        // Optionally reset the game or provide an option to restart
    }
}


    displayCorrectAnswer() {
        // Display the correct answer for a certain duration
        let villageElement = this.villageElements.find(span => span.dataset.villageLabel === this.villages[this.currentVillageIndex].villageLabel);
        villageElement.classList.add('highlighted');
        setTimeout(() => {
            villageElement.classList.remove('highlighted');
        }, 3000);
    }

    checkHighScore() {
        if (score > highScore) {
            highScore = score;
            document.getElementById('highScoreValue').textContent = highScore;
        }
    }

}
