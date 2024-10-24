


#game-container {
    width: 650px;     /* Fixed width */
    position: relative;
    margin: 0 auto;   /* Center the container horizontally */
    overflow: hidden; /* Hide any overflow to prevent expanding */
    border: 1px solid #000;  /* Optional: border to see the container boundaries */
    box-sizing: border-box; /* Include padding and border in the element's total width and height */
    border-bottom: none; /* Hide the bottom line of the border */
    }

.head {
    display: flex;
    align-items: center;
    font-weight: bold;
    padding: 20px;
    justify-content: center; /* Change to center */
    white-space: nowrap; /* Ensure the text doesn't wrap onto a new line */
    overflow: hidden;    /* Hide any text that overflows beyond the element */
    text-overflow: ellipsis; /* Show an ellipsis if the text is too long */
    font-size: calc(1.5vw + 1vh); /* Dynamically adjust font size based on viewport */  
}

.score-container {
    display: flex; /* Use flexbox to align children in a row */
    align-items: center; /* Align items vertically in the center */
    justify-content: space-evenly; /* Align items to the start of the container */
    background-color: #f0f0f0; 
    padding: 20px;
}

.score-label {
    font-weight: bold; /* Make the label bold */
    margin-right: 10px; /* Add space between the label and the score */
}

#mapContainer {
    position: relative;
    height: 700px;
    width: 650px;
    border: 1px solid #000;
    border-right: none;
    border-left: none;
    border-top: none;
}

#wales-outline{
    height: 700px;
    width: 650px;
}

#mapContainer object {
    top: 0;
    left: 0;
    z-index: 0; /* Ensures the SVG is behind the village markers */
}


#mapContainer span {
    display: block;
    position: relative;
    width: 5px;
    height: 5px;
    /* background-color: red; */
    border-radius: 50%;
}


.highlighted {
    box-shadow: 0 0 20px 20px rgb(255, 0, 0);
    background-color: red;
    width: 150px;
    height: 150px;
    z-index: 2;
    position: relative;
}

.circle {
    border-radius: 50%;
    width: 60px; height: 60px;
    background-color: blue;
    position: relative;
    cursor: grab;
    opacity: 0.8;
    z-index: 1;
}
