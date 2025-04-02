export const brandColors = {
    greenDark: '#0A3622',
    greenMedium: '#155D36',
    greenLight: '#1C7C4A',
    charcoal: '#1A1A1A',
    offWhite: '#F5F5F5',
    soft: '#F5F7F9',
    softer: '#F9FAFB',
}

export const getColor = (name: keyof typeof brandColors): string => {
    return brandColors[name] || '#000000';
}

export const getGradient = (
    from: keyof typeof brandColors,
    to: keyof typeof brandColors,
    direction: string = 'to right'
): string => {
    return `linear-gradient(${direction}, ${brandColors[from]}, ${brandColors[to]})`;
}

export const withOpacity = (color: string, opacity: number): string => {
    // Convert opacity to hex
    const alpha = Math.round(opacity * 255).toString(16).padStart(2, '0');
    return `${color}${alpha}`;
}
