document.addEventListener('DOMContentLoaded', () => {
    // Create placeholder images for posts that don't have images yet
    const placeholders = document.querySelectorAll('img[src*="placeholder"]');
    
    const colors = [
        '#2a9d8f', // Primary color
        '#e76f51', // Orange
        '#e9c46a', // Yellow
        '#264653', // Dark blue
    ];

    placeholders.forEach((img, index) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = 800;
        canvas.height = 400;
        
        // Fill background
        ctx.fillStyle = colors[index % colors.length];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add text
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 48px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Get the alt text or use a default
        const text = img.alt || 'Blog Post Image';
        
        // Add a subtle pattern
        for(let i = 0; i < canvas.width; i += 30) {
            for(let j = 0; j < canvas.height; j += 30) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.fillRect(i, j, 15, 15);
            }
        }
        
        // Draw text with shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.fillStyle = 'white';
        ctx.fillText(text, canvas.width/2, canvas.height/2);
        
        // Replace the image source with the canvas data
        img.src = canvas.toDataURL();
    });
});
