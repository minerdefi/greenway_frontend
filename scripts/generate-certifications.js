const fs = require('fs');
const path = require('path');

// Create certifications directory
const certificationsDir = path.join(__dirname, '..', 'public', 'images', 'certifications');
if (!fs.existsSync(certificationsDir)) {
    fs.mkdirSync(certificationsDir, { recursive: true });
}

// Define certification badges with proper logistics industry standards
const certifications = [
    {
        id: 'iso-14001',
        name: 'ISO 14001',
        color: '#006C67', // Teal-ish green for environmental standards
        acronym: 'ISO'
    },
    {
        id: 'leed',
        name: 'LEED',
        color: '#699E3C', // Green for sustainability
        acronym: 'LEED'
    },
    {
        id: 'smartway',
        name: 'SmartWay',
        color: '#0076CE', // EPA blue
        acronym: 'EPA'
    },
    {
        id: 'iata',
        name: 'IATA',
        color: '#004B87', // IATA blue
        acronym: 'IATA'
    },
    {
        id: 'gri',
        name: 'GRI',
        color: '#A01C41', // GRI red
        acronym: 'GRI'
    },
    {
        id: 'iso-9001',
        name: 'ISO 9001',
        color: '#1A4784', // Blue for quality management
        acronym: 'ISO'
    }
];

// Generate SVG certification badges
certifications.forEach(cert => {
    const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad-${cert.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${cert.color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${cert.color};stop-opacity:0.8" />
        </linearGradient>
    </defs>
    <!-- Badge background -->
    <circle cx="100" cy="100" r="90" fill="white" stroke="${cert.color}" stroke-width="5"/>
    
    <!-- Inner circle with gradient -->
    <circle cx="100" cy="100" r="80" fill="url(#grad-${cert.id})" fill-opacity="0.1"/>
    
    <!-- Certification acronym -->
    <text x="100" y="85" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="${cert.color}" text-anchor="middle">${cert.acronym}</text>
    
    <!-- Certification name -->
    <text x="100" y="120" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${cert.color}" text-anchor="middle">${cert.name}</text>
    
    <!-- Certified text -->
    <text x="100" y="150" font-family="Arial, sans-serif" font-size="14" fill="${cert.color}" text-anchor="middle">CERTIFIED</text>
</svg>`;

    // Write SVG file
    fs.writeFileSync(path.join(certificationsDir, `${cert.id}.svg`), svgContent);
    console.log(`Created certification badge for ${cert.name}`);
});

console.log('All certification badges generated!');
