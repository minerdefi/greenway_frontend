const fs = require('fs');
const path = require('path');

// Create custom map marker icon for logistics hubs
const createMapMarkerIcon = () => {
    // Create a more visible marker icon
    const markerIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 0C7.802 0 4 3.403 4 7.602C4 11.8 12 24 12 24C12 24 20 11.8 20 7.602C20 3.403 16.199 0 12 0ZM12 11C10.343 11 9 9.657 9 8C9 6.343 10.343 5 12 5C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11Z" fill="#0A3622"/>
  <circle cx="12" cy="8" r="4" fill="#1C7C4A"/>
</svg>`;

    // Ensure the public/images directory exists
    const imagesDir = path.join(__dirname, '..', 'public', 'images');
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
    }

    // Write the marker icon file
    fs.writeFileSync(path.join(imagesDir, 'marker-icon.svg'), markerIcon);
    console.log('Created map marker icon');

    // Create a simple PNG version as fallback
    const pngMarkerData = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0A3622" rx="16" ry="16" />
  <circle cx="16" cy="16" r="8" fill="#1C7C4A" />
</svg>`;
    fs.writeFileSync(path.join(imagesDir, 'marker-icon.png'), pngMarkerData);
    console.log('Created fallback PNG marker icon');
}

createMapMarkerIcon();
console.log('Map display fix completed');
