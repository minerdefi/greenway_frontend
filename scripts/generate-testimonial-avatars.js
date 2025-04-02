const fs = require('fs');
const path = require('path');

// Create testimonials directory
const testimonialsDir = path.join(__dirname, '..', 'public', 'images', 'testimonials');
if (!fs.existsSync(testimonialsDir)) {
    fs.mkdirSync(testimonialsDir, { recursive: true });
}

// Testimonial people data
const testimonialPeople = [
    { id: 'avatar-1', name: 'Sarah Reynolds', color: '#1C7C4A' },
    { id: 'avatar-2', name: 'Michael Wong', color: '#155D36' },
    { id: 'avatar-3', name: 'Elena Martinez', color: '#0A3622' },
];

// Generate testimonial avatars with more professional design
testimonialPeople.forEach(person => {
    // Get initials
    const initials = person.name
        .split(' ')
        .map(name => name[0])
        .join('');

    // Create SVG avatar with initials and improved styling
    const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad-${person.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${person.color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${darkenColor(person.color, 0.2)};stop-opacity:1" />
        </linearGradient>
    </defs>
    <rect width="200" height="200" fill="url(#grad-${person.id})" />
    <text x="100" y="115" font-family="Arial, sans-serif" font-size="80" 
        font-weight="bold" fill="white" text-anchor="middle" opacity="0.9">${initials}</text>
</svg>`;

    // Write files
    fs.writeFileSync(path.join(testimonialsDir, `${person.id}.svg`), svgContent);
    fs.writeFileSync(path.join(testimonialsDir, `${person.id}.jpg`), svgContent);

    console.log(`Generated testimonial avatar for ${person.name}`);
});

// Helper function to darken colors
function darkenColor(color, factor) {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Darken RGB values
    const darkenedR = Math.floor(r * (1 - factor));
    const darkenedG = Math.floor(g * (1 - factor));
    const darkenedB = Math.floor(b * (1 - factor));

    // Convert back to hex
    return `#${darkenedR.toString(16).padStart(2, '0')}${darkenedG.toString(16).padStart(2, '0')}${darkenedB.toString(16).padStart(2, '0')}`;
}

console.log('All testimonial avatars generated!');
