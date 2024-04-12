// script.js
let villages = [];
let game;  // Declare game globally to make it accessible throughout the script

document.addEventListener('DOMContentLoaded', () => {
    fetch('query.json')
        .then(response => response.json())
        .then(villagesData => {
            villages = villagesData;
            villages.forEach(village => {
                const coordinatesMatch = village.coordinates.match(/Point\(([^ ]+) ([^ ]+)\)/);
                if (coordinatesMatch) {
                    const longitude = parseFloat(coordinatesMatch[1]);
                    const latitude = parseFloat(coordinatesMatch[2]);
                    positionVillage(village.villageLabel, latitude, longitude, village);
                } else {
                    console.error('Could not extract coordinates for village:', village.villageLabel);
                }
            });

            // Initialize the game with the villages array after all spans are positioned
            game = new Game(villages);
            controls = new DraggableCircle('circleContainer');  // Initialize the draggable circle
            document.getElementById('startButton').addEventListener('click', () => game.start());
            game.start();
        })
        .catch(error => {
            console.error('Error loading the JSON:', error);
        });
});

function positionVillage(label, latitude, longitude, village) {
    const span = document.createElement('span');
    span.style.position = 'absolute';
    span.dataset.villageLabel = village.villageLabel; // Assign villageLabel as a data attribute for identification
    // Convert latitude and longitude to x and y positions
    const { x, y } = convertGeoCoordsToPixels(latitude, longitude);
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    document.getElementById('mapContainer').appendChild(span);
}

function convertGeoCoordsToPixels(latitude, longitude) {
    const x = (longitude + 5.5) * 122; // Example conversion, adjust as necessary
    const y = (53.5 - latitude) * 250; // Example conversion, adjust as necessary
    return { x, y };
}

