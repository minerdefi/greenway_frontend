const fs = require('fs');
const path = require('path');

// Create partners directory if it doesn't exist
const partnersDir = path.join(__dirname, '..', 'public', 'images', 'partners');
if (!fs.existsSync(partnersDir)) {
    fs.mkdirSync(partnersDir, { recursive: true });
}

// Partner companies with their brand colors
const partners = [
    { id: 'ecoship', name: 'EcoShip', color: '#2E8B57' }, // Sea Green
    { id: 'greentech', name: 'GreenTech', color: '#3CB371' }, // Medium Sea Green
    { id: 'sustaincargo', name: 'SustainCargo', color: '#6B8E23' }, // Olive Drab
    { id: 'ecotransport', name: 'EcoTransport', color: '#228B22' }, // Forest Green
    { id: 'cleanfreight', name: 'CleanFreight', color: '#008080' }, // Teal
    { id: 'zerocarbon', name: 'ZeroCarbon', color: '#20B2AA' }, // Light Sea Green
];

// Generate placeholder logos for partner companies
partners.forEach(partner => {
    // Create simple SVG logo placeholders
    const svgContent = `
    <svg width="300" height="150" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="150" fill="white" />
        <rect x="20" y="20" width="260" height="110" rx="10" ry="10" fill="${partner.color}15" />
        <text x="150" y="75" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${partner.color}" text-anchor="middle" dominant-baseline="middle">
            ${partner.name}
        </text>
    </svg>
    `;

    fs.writeFileSync(path.join(partnersDir, `${partner.id}.png`), svgContent);
    console.log(`Created placeholder logo for ${partner.name}`);
});

console.log('Generated all partner logos!');
