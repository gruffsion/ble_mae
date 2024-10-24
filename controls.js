class DraggableCircle {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.initCircle();
    }

    initCircle() {
        this.circle = document.createElement('div');
        this.circle.className = 'circle';
        this.circle.style.position = 'absolute';
        this.circle.style.left = '5%'; // Start slightly off-center to allow drag space
        this.circle.style.top = '30%'; // Start lower in the container
        this.circle.setAttribute('data-points', 10); // Arbitrary points value for example
        this.container.appendChild(this.circle);
        this.makeDraggable(this.circle);
    }

    makeDraggable(circle) {
        let originalX, originalY, mouseX, mouseY;
        let isDragging = false;
    
        const startDrag = (event) => {
            // Normalize starting point based on touch or mouse event
            const clientX = event.touches ? event.touches[0].clientX : event.clientX;
            const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    
            mouseX = clientX;
            mouseY = clientY;
            originalX = circle.offsetLeft;
            originalY = circle.offsetTop;
            circle.style.cursor = 'grabbing';
            isDragging = true;
    
            event.preventDefault(); // Prevent default behavior such as text selection
        };
    
        const doDrag = (event) => {
            if (!isDragging) return; // Only drag if we are actively dragging
    
            // Normalize movement point based on touch or mouse event
            const clientX = event.touches ? event.touches[0].clientX : event.clientX;
            const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    
            let deltaX = clientX - mouseX;
            let deltaY = clientY - mouseY;
            let newX = originalX + deltaX;
            let newY = originalY + deltaY;
    
            // Constrain the movement within the boundaries of the container
            newX = Math.max(0, Math.min(this.container.clientWidth - circle.clientWidth, newX));
            newY = Math.max(0, Math.min(this.container.clientHeight - circle.clientHeight, newY));
    
            circle.style.left = `${newX}px`;
            circle.style.top = `${newY}px`;
        };
    
        const endDrag = () => {
            isDragging = false;
            circle.style.cursor = 'grab';
            
            if (game) {
                game.checkCircleCoverage(circle);
            }
        };
    
        // Setup event listeners for mouse
        circle.addEventListener('mousedown', startDrag);
        circle.addEventListener('mouseup', endDrag);
        document.addEventListener('mousemove', doDrag);
    
        // Setup event listeners for touch
        circle.addEventListener('touchstart', startDrag);
        circle.addEventListener('touchend', endDrag);
        document.addEventListener('touchmove', doDrag);
    }
    
}
