const fs = require('fs');
const path = require('path');

// Create avatars directory
const avatarsDir = path.join(__dirname, '..', 'public', 'images', 'avatars');
if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir, { recursive: true });
}

// Author data
const authors = [
    { id: 'emma-green', name: 'Emma Green', color: '#1C7C4A' },
    { id: 'michael-chen', name: 'Michael Chen', color: '#155D36' },
    { id: 'sarah-johnson', name: 'Sarah Johnson', color: '#0A3622' },
];

// Generate avatar placeholders
authors.forEach(author => {
    // Get initials
    const initials = author.name
        .split(' ')
        .map(name => name[0])
        .join('');

    // Create SVG avatar with initials - making sure it has proper XML headers
    const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="${author.color}" />
    <text x="100" y="115" font-family="Arial, sans-serif" font-size="80" 
        font-weight="bold" fill="white" text-anchor="middle">${initials}</text>
</svg>`;

    // For development purposes, we're saving SVG content as both SVG and JPG files
    // In production, you would use a proper image conversion library
    fs.writeFileSync(path.join(avatarsDir, `${author.id}.svg`), svgContent);
    fs.writeFileSync(path.join(avatarsDir, `${author.id}.jpg`), svgContent);

    console.log(`Generated avatar for ${author.name}`);
});

console.log('All avatars generated!');
