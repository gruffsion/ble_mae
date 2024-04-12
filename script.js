// script.js
let villages = [];
let game;  // Declare game globally to make it accessible throughout the script

document.addEventListener('DOMContentLoaded', () => {
    fetch('query.json')
        .then(response => response.json())
        .then(villagesData => {
            villages = villagesData.map(village => {
                const coordinatesMatch = village.coordinates.match(/Point\(([^ ]+) ([^ ]+)\)/);
                if (coordinatesMatch) {
                    const longitude = parseFloat(coordinatesMatch[1]);
                    const latitude = parseFloat(coordinatesMatch[2]);
                    // Set a unique spanId using coordinates
                    village.spanId = `village-${longitude}-${latitude}`;
                    positionVillage(village.villageLabel, latitude, longitude, village.spanId);
                } else {
                    console.error('Could not extract coordinates for village:', village.villageLabel);
                }
                return village;
            });

            // Initialize the game and other components
            game = new Game(villages);
            controls = new DraggableCircle('mapContainer');
            document.getElementById('startButton').addEventListener('click', () => game.start());
            game.start();
        })
        .catch(error => {
            console.error('Error loading the JSON:', error);
        });
});

function positionVillage(label, latitude, longitude, spanId) {
    const span = document.createElement('span');
    span.id = spanId; // Use coordinates-based ID for each span
    span.style.position = 'absolute';
    const { x, y } = convertGeoCoordsToPixels(latitude, longitude);
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    document.getElementById('mapContainer').appendChild(span);
}

function convertGeoCoordsToPixels(latitude, longitude) {
    const mapContainer = document.getElementById('mapContainer');
    const width = mapContainer.clientWidth;  // Get current width
    const height = mapContainer.clientHeight;  // Get current height

    // Normalize the coordinates based on the map's current dimensions
    const x = ((longitude + 5.3) / 2.7) * width;  // Assuming longitude ranges approximately from -5.5 to 5.5
    const y = ((53.5 - latitude) / 2.2) * height;  // Assuming latitude ranges approximately from 51.5 to 53.5

    return { x, y };
}
