const fs = require('fs');
const path = require('path');

// Create services directory if it doesn't exist
const servicesDir = path.join(__dirname, '..', 'public', 'images', 'services');
if (!fs.existsSync(servicesDir)) {
    fs.mkdirSync(servicesDir, { recursive: true });
}

// Specific brand colors
const brandColors = {
    darkGreen: '#0A3622',
    mediumGreen: '#155D36',
    lightGreen: '#1C7C4A'
};

// Service icons and details
const services = [
    { id: 'freight', title: 'Freight Services', color: brandColors.darkGreen },
    { id: 'cargo-shipping', title: 'Cargo Shipping', color: brandColors.mediumGreen },
    { id: 'packaging-storage', title: 'Packaging & Storage', color: brandColors.lightGreen },
    { id: 'warehousing', title: 'Warehousing', color: brandColors.darkGreen },
    { id: 'door-to-door', title: 'Door to Door Delivery', color: brandColors.mediumGreen },
    { id: 'transportation', title: 'Transportation', color: brandColors.lightGreen }
];

// Create better looking SVGs
services.forEach(service => {
    // Create a gradient effect by darkening the color slightly
    const darkerColor = darkenColor(service.color, 0.2);

    const svgContent = `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${service.color};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${darkerColor};stop-opacity:1" />
            </linearGradient>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="url(#grad)" />
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
            </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#grad)" />
        <rect width="800" height="600" fill="url(#grid)" />
        <rect x="100" y="100" width="600" height="400" rx="20" ry="20" fill="rgba(255,255,255,0.1)" />
        <text x="400" y="320" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="white" text-anchor="middle">${service.title}</text>
        <text x="400" y="370" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.7)" text-anchor="middle">Greenway Logistics</text>
    </svg>
    `;

    // Write SVG files for direct use
    fs.writeFileSync(path.join(servicesDir, `${service.id}.svg`), svgContent);

    // Also create JPG placeholders (in a real app you'd use actual photos)
    fs.writeFileSync(path.join(servicesDir, `${service.id}.jpg`), svgContent);

    console.log(`Created placeholder for ${service.title}`);
});

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

console.log('Generated all service images!');
