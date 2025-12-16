// static/js/binary-stars.js

(function() {
    console.log("⭐⭐⭐ Binary Star System: Floating Layer v3.0 ⭐⭐⭐");

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // --- FORCE VISIBILITY ---
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    // Z-INDEX 99: Floats ON TOP of everything (text, headers, backgrounds)
    canvas.style.zIndex = '99'; 
    
    // POINTER EVENTS NONE: This is CRITICAL. 
    // It allows your mouse to click "through" the stars to select text or click links.
    canvas.style.pointerEvents = 'none'; 
    
    document.body.appendChild(canvas);

    // --- CONFIGURATION ---
    // Adjusted for Top-Left positioning
    const orbitalScale = 150;  
    const eccentricity = 0.4;  
    const inclination = 70 * (Math.PI / 180); 
    const starARadius = 12;    
    const starBRadius = 6;     
    
    // State
    let width, height, centerX, centerY;
    let baseAngle = 0;         
    let autoRotationAddon = 0; 
    let lastScrollTime = Date.now();
    let isAutoRotating = false;

    // --- RESIZE HANDLER ---
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        // --- POSITION: TOP LEFT ---
        // 250px from left, 250px from top. 
        // We use fixed pixels so it stays in the corner regardless of screen size.
        centerX = 250;
        centerY = 250;
        
        // If on mobile, center it instead so it's not off-screen
        if (width < 600) {
            centerX = width / 2;
            centerY = height / 3;
        }
    }
    window.addEventListener('resize', resize);
    resize();

    // --- PHYSICS ENGINE ---
    function getPosition(theta, isPrimary) {
        const massRatio = isPrimary ? 0.4 : 1.0; 
        const angle = theta + (isPrimary ? 0 : Math.PI); 
        
        // Keplerian Radius
        const r = (orbitalScale * massRatio) * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(angle));

        // 2D Plane
        let x = r * Math.cos(angle);
        let y = r * Math.sin(angle);

        // Inclination Tilt
        y = y * Math.cos(inclination);

        return { x: centerX + x, y: centerY + y };
    }

    // --- DRAW LOOP ---
    function draw() {
        ctx.clearRect(0, 0, width, height);

        // 1. Idle Timer Logic
        const now = Date.now();
        const timeSinceScroll = now - lastScrollTime;

        // If idle for > 5 seconds, rotate automatically
        if (timeSinceScroll > 5000) {
            autoRotationAddon += 0.002; // Slow drift
            isAutoRotating = true;
        } 
        
        const currentTheta = baseAngle + autoRotationAddon;

        const posA = getPosition(currentTheta, true);
        const posB = getPosition(currentTheta, false);

        // Draw Star A (Blue)
        drawStar(posA.x, posA.y, starARadius, '#4aa3ff', 'rgba(74, 163, 255, 0.6)');

        // Draw Star B (Red)
        drawStar(posB.x, posB.y, starBRadius, '#ff4d4d', 'rgba(255, 77, 77, 0.6)');
        
        requestAnimationFrame(draw);
    }

    function drawStar(x, y, r, color, glowColor) {
        ctx.beginPath();
        // Sharper gradient for better visibility against light backgrounds
        const g = ctx.createRadialGradient(x, y, r*0.2, x, y, r*2.5);
        g.addColorStop(0, color);
        g.addColorStop(0.4, glowColor);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.arc(x, y, r*3, 0, Math.PI*2);
        ctx.fill();
    }

    // --- SCROLL SYNC ---
    window.addEventListener('scroll', () => {
        lastScrollTime = Date.now();
        
        // Manual Scroll Overrides Auto Rotation
        if (isAutoRotating) {
            // Reset the auto-addon so we snap back to scroll control smoothly
            // (Or you can latch it, but resetting is simpler logic)
            isAutoRotating = false;
        }
        
        // 1 rotation per 3000px of scrolling
        baseAngle = (window.scrollY / 3000) * Math.PI * 2;
    });

    draw();
})();