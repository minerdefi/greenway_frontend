const { execSync } = require('child_process');
const path = require('path');

console.log('Setting up project assets...');

// Generate placeholder images
try {
    console.log('Generating service images...');
    execSync('node scripts/generate-placeholders.js', { stdio: 'inherit' });

    console.log('Generating blog images...');
    execSync('node scripts/generate-blog-placeholders.js', { stdio: 'inherit' });

    console.log('Generating partner logos...');
    execSync('node scripts/generate-partner-logos.js', { stdio: 'inherit' });

    console.log('Generating author avatars...');
    execSync('node scripts/generate-avatars.js', { stdio: 'inherit' });

    console.log('Generating testimonial avatars...');
    execSync('node scripts/generate-testimonial-avatars.js', { stdio: 'inherit' });

    console.log('Generating certification badges...');
    execSync('node scripts/generate-certifications.js', { stdio: 'inherit' });

    console.log('Setting up map components...');
    execSync('node scripts/fix-map-display.js', { stdio: 'inherit' });
} catch (error) {
    console.error('Error generating assets:', error);
}

console.log('Project setup complete!');
