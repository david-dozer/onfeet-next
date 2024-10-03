const colorWheel = document.getElementById('colorWheel');
const ctx = colorWheel.getContext('2d');
const colorPreview = document.getElementById('colorPreview');
const pantsCanvas = document.getElementById('pantsCanvas');
const pantsCtx = pantsCanvas.getContext('2d');

// Load the pants image
const pantsImage = new Image();
pantsImage.src = 'public/pants/cargo_pants.png'; // Update the path as needed

pantsImage.onload = () => {
    // Draw the pants image on the pantsCanvas once it's loaded
    pantsCtx.drawImage(pantsImage, 0, 0, pantsCanvas.width, pantsCanvas.height);
};

function drawColorWheel() {
    const radius = colorWheel.width / 2;
    for (let angle = 0; angle < 360; angle++) {
        const startAngle = angle * (Math.PI / 180);
        const endAngle = (angle + 1) * (Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, startAngle, endAngle);
        ctx.closePath();

        const color = `hsl(${angle}, 100%, 50%)`;
        ctx.fillStyle = color;
        ctx.fill();
    }
}

colorWheel.addEventListener('click', (event) => {
    const rect = colorWheel.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const radius = colorWheel.width / 2;
    const centerX = radius;
    const centerY = radius;

    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= radius) {
        const hue = Math.atan2(dy, dx) * (180 / Math.PI) + 180;
        const color = `hsl(${hue}, 100%, 50%)`;
        colorPreview.style.backgroundColor = color;

        // Clear the canvas and redraw the pants image
        pantsCtx.clearRect(0, 0, pantsCanvas.width, pantsCanvas.height);
        pantsCtx.drawImage(pantsImage, 0, 0, pantsCanvas.width, pantsCanvas.height);

        // Apply the selected color to the pants with opacity to retain texture
        pantsCtx.globalCompositeOperation = 'source-atop';
        pantsCtx.globalAlpha = 0.5; // Set opacity for blending
        pantsCtx.fillStyle = color;
        pantsCtx.fillRect(0, 0, pantsCanvas.width, pantsCanvas.height);
        
        // Reset the global composite operation and opacity for future drawings
        pantsCtx.globalCompositeOperation = 'source-over';
        pantsCtx.globalAlpha = 1;
    }
});

drawColorWheel();
