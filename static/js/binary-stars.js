// static/js/binary-stars.js

(function() {
    console.log("⭐⭐⭐ Binary Star System: Physics Upgrade v2.0 ⭐⭐⭐");

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Z-Index 1 places it ON TOP of the content.
    // Pointer-events: none ensures you can still click links behind the stars.
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1'; 
    canvas.style.pointerEvents = 'none'; 
    
    // Blend mode 'screen' looks great on Dark Mode (adds light).
    // On Light Mode (white bg), it naturally fades out (invisible), which is usually desired.
    canvas.style.mixBlendMode = 'screen'; 
    
    document.body.appendChild(canvas);

    // --- CONFIGURATION ---
    const orbitalScale = 200;  // Scale of the orbit
    const eccentricity = 0.4;  // 0 = circle, 0.9 = long oval
    const inclination = 70 * (Math.PI / 180); // Tilt in radians
    const starARadius = 15;    // Blue Giant
    const starBRadius = 8;     // Red Dwarf
    
    // State
    let width, height, centerX, centerY;
    let baseAngle = 0;         // Angle derived from scroll
    let autoRotationAddon = 0; // Angle added by auto-rotation
    let lastScrollTime = Date.now();
    let isAutoRotating = false;

    // --- RESIZE HANDLER ---
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        // Position: Top Left (20% from left, 20% from top)
        centerX = width * 0.2;
        centerY = height * 0.2;
    }
    window.addEventListener('resize', resize);
    resize();

    // --- ORBITAL PHYSICS CALCULATOR ---
    // Returns {x, y, z} for a body at angle theta
    // Uses the polar equation of an ellipse from the focus: r = a(1-e^2) / (1 + e*cos(theta))
    function getPosition(theta, isPrimary) {
        // For visual simplicity, we assume the Barycenter is at (0,0)
        // Primary moves in smaller ellipse, Secondary in larger (mass ratio)
        
        const massRatio = isPrimary ? 0.4 : 1.0; // Primary moves less
        const angle = theta + (isPrimary ? 0 : Math.PI); // Opposite sides
        
        // 1. Keplerian Radius (r)
        // Distance varies with angle due to eccentricity
        const r = (orbitalScale * massRatio) * (1 - eccentricity * eccentricity) / (1 + eccentricity * Math.cos(angle));

        // 2. 2D Plane Coordinates (Un-inclined)
        let x = r * Math.cos(angle);
        let y = r * Math.sin(angle);

        // 3. Apply Inclination (Tilt around X-axis)
        // Imagine rotating the plane. Y gets "squashed" by cos(inclination)
        y = y * Math.cos(inclination);

        return { x: centerX + x, y: centerY + y };
    }

    // --- DRAW LOOP ---
    function draw() {
        ctx.clearRect(0, 0, width, height);

        // 1. Time Management
        const now = Date.now();
        const timeSinceScroll = now - lastScrollTime;

        // 2. Calculate Angle
        if (timeSinceScroll > 5000) {
            // Auto-rotate mode
            autoRotationAddon += 0.005; // Speed of auto-rotation
            isAutoRotating = true;
        } 
        
        const currentTheta = baseAngle + autoRotationAddon;

        // 3. Calculate Positions
        const posA = getPosition(currentTheta, true);
        const posB = getPosition(currentTheta, false);

        // 4. Draw Star A (Blue Giant)
        drawStar(posA.x, posA.y, starARadius, '#4aa3ff', 'rgba(74, 163, 255, 0.4)');

        // 5. Draw Star B (Red Dwarf)
        drawStar(posB.x, posB.y, starBRadius, '#ff4d4d', 'rgba(255, 77, 77, 0.4)');
        
        requestAnimationFrame(draw);
    }

    function drawStar(x, y, r, color, glow) {
        ctx.beginPath();
        const g = ctx.createRadialGradient(x, y, r*0.2, x, y, r*3);
        g.addColorStop(0, color);
        g.addColorStop(0.2, glow);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.arc(x, y, r*4, 0, Math.PI*2); // Draw simplified circle for glow
        ctx.fill();
    }

    // --- SCROLL SYNC ---
    window.addEventListener('scroll', () => {
        lastScrollTime = Date.now();
        // Calculate scroll angle (1 rotation per 2000px)
        // We subtract the current 'auto' offset so the star doesn't jump when you touch the mouse
        const targetScrollAngle = (window.scrollY / 2000) * Math.PI * 2;
        
        if (isAutoRotating) {
            // Smooth handover: Define baseAngle so that (base + auto) equals the current position
            // But to keep it simple: just reset auto and snap to scroll is usually okay.
            // For smoother UI, we just update baseAngle.
            isAutoRotating = false;
        }
        
        baseAngle = targetScrollAngle;
    });

    draw();
})();