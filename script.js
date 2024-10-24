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
    const width = mapContainer.offsetWidth;  // Dynamic width of map container
    const height = mapContainer.offsetHeight;  // Dynamic height of map container

    // Define the geographic boundaries of Wales
    const minLatitude = 51.4;
    const maxLatitude = 53.5;
    const minLongitude = -5.4;
    const maxLongitude = -2.6;

    // Calculate normalized positions between 0 and 1
    const xNormalized = (longitude - minLongitude) / (maxLongitude - minLongitude);
    const yNormalized = (maxLatitude - latitude) / (maxLatitude - minLatitude);  // Invert y for screen coordinates

    // Convert normalized positions to pixel values based on map container size
    const x = xNormalized * width;
    const y = yNormalized * height - 20;

    return { x, y };
}

