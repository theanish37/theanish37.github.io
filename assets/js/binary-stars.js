// static/js/binary-stars.js
console.log("⭐⭐⭐ Binary Star System Online ⭐⭐⭐");

(function() {
    // 1. Setup the Canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Style it to sit in the background
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    // CHANGE 1: Bring it forward slightly
    // If -1 is hidden, we try 0 or 1. 
    // Since we use pointer-events: none, it won't block clicks.
    canvas.style.zIndex = '0'; 
    
    // CHANGE 2: Ensure clicks pass through to your links/buttons
    canvas.style.pointerEvents = 'none'; 
    
    // CHANGE 3: Transparency
    canvas.style.opacity = '0.8'; 
    
    document.body.appendChild(canvas);

    // 2. Astronomy Configuration
    let width, height, centerX, centerY;
    const orbitalRadius = 120; // Distance from center
    const starARadius = 25;    // Blue Giant size
    const starBRadius = 12;    // Red Dwarf size
    
    // 3. Resize Handler (Responsive)
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        centerX = width / 2;
        centerY = height / 2;
        draw(); // Redraw immediately on resize
    }
    
    window.addEventListener('resize', resize);
    resize(); // Init

    // 4. The Drawing Loop
    function draw() {
        // Clear screen
        ctx.clearRect(0, 0, width, height);
        
        // Calculate Angle based on Scroll
        // one full rotation every 2000px of scrolling
        const scrollY = window.scrollY;
        const angle = (scrollY / 2000) * Math.PI * 2; 

        // Calculate positions
        // Star A positions
        const xA = centerX + Math.cos(angle) * orbitalRadius;
        const yA = centerY + Math.sin(angle) * orbitalRadius;
        
        // Star B positions (Opposite side: angle + PI)
        const xB = centerX + Math.cos(angle + Math.PI) * orbitalRadius;
        const yB = centerY + Math.sin(angle + Math.PI) * orbitalRadius;

        // Draw Orbit Path (Optional: makes it look technical)
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbitalRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.stroke();

        // Draw Star A (Blue Giant)
        drawStar(xA, yA, starARadius, '#4aa3ff', '#001f3f');

        // Draw Star B (Red Dwarf)
        drawStar(xB, yB, starBRadius, '#ff4d4d', '#330000');
    }

    // Helper to draw a glowing star
    function drawStar(x, y, r, coreColor, glowColor) {
        ctx.beginPath();
        // Create radial gradient for "glow"
        const gradient = ctx.createRadialGradient(x, y, r * 0.2, x, y, r * 2);
        gradient.addColorStop(0, coreColor);     // Bright core
        gradient.addColorStop(0.5, glowColor);   // Glow
        gradient.addColorStop(1, 'rgba(0,0,0,0)'); // Transparent edge
        
        ctx.fillStyle = gradient;
        ctx.arc(x, y, r * 2, 0, Math.PI * 2);
        ctx.fill();
    }

    // 5. Sync with Scroll
    // We use requestAnimationFrame for smooth performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                draw();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial draw
    draw();
})();

