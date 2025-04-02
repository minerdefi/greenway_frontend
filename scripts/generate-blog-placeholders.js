const fs = require('fs');
const path = require('path');

// Create blog directory if it doesn't exist
const blogDir = path.join(__dirname, '..', 'public', 'images', 'blog');
if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
}

// Blog post placeholders
const blogPosts = [
    { id: 'sustainable-logistics', title: 'Sustainable Logistics', color: '#0A3622' },
    { id: 'supply-chain', title: 'Supply Chain Innovation', color: '#155D36' },
    { id: 'carbon-neutral', title: 'Carbon Neutral Shipping', color: '#1C7C4A' },
    { id: 'placeholder', title: 'Greenway Blog', color: '#0A3622' }
];

// Create SVG placeholders for blog posts
blogPosts.forEach(post => {
    const svgContent = `
    <svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="blogGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${post.color};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${post.color};stop-opacity:0.7" />
            </linearGradient>
            <pattern id="blogPattern" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="40" height="40" fill="url(#blogGrad)" />
                <rect x="20" y="20" width="20" height="20" fill="rgba(255,255,255,0.1)" />
            </pattern>
        </defs>
        <rect width="800" height="450" fill="url(#blogGrad)" />
        <rect width="800" height="450" fill="url(#blogPattern)" opacity="0.3" />
        <rect x="100" y="100" width="600" height="250" rx="15" ry="15" fill="rgba(255,255,255,0.1)" />
        <text x="400" y="210" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">${post.title}</text>
        <text x="400" y="260" font-family="Arial, sans-serif" font-size="20" fill="rgba(255,255,255,0.8)" text-anchor="middle">Greenway Logistics</text>
    </svg>
    `;

    fs.writeFileSync(path.join(blogDir, `${post.id}.jpg`), svgContent);
    console.log(`Created blog placeholder for ${post.title}`);
});

console.log('Generated all blog images!');
