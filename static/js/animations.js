// static/js/animations.js

document.addEventListener("DOMContentLoaded", function() {
    
    // --- ANIMATION 1: THE SCROLL METEOR ---
    // Create the meteor element
    const meteor = document.createElement('div');
    meteor.id = 'scroll-meteor';
    document.body.appendChild(meteor);

    // Style it dynamically (or you can do this in CSS)
    Object.assign(meteor.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #4aa3ff)', // Blue tail
        boxShadow: '0 0 10px #4aa3ff, 0 0 20px #4aa3ff', // Glow
        zIndex: '1000',
        pointerEvents: 'none',
        transition: 'width 0.1s linear',
        borderRadius: '0 2px 2px 0'
    });

    // Update position on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        meteor.style.width = scrollPercent + '%';
    });


    // --- ANIMATION 2: ANTI-GRAVITY HOVER ---
    // Finds all "cards" (publications, posts) and adds a lift effect
    // Note: Hugo Blox usually uses classes like .card-simple, .article-title, etc.
    // We will target generic containers to be safe.
    
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        /* Define the floating animation class */
        .hover-float {
            transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease;
        }
        .hover-float:hover {
            transform: translateY(-5px); /* Moves up 5px */
            box-shadow: 0 10px 20px rgba(0,0,0,0.3) !important; /* Casts shadow down */
        }
    `;
    document.head.appendChild(styleSheet);

    // Apply to common Hugo Blox elements
    const cards = document.querySelectorAll('.card-simple, .card-course, .pub-list-item, .article-container');
    cards.forEach(card => {
        card.classList.add('hover-float');
    });
});
