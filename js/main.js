// Constants
const CONFIG = {
    resizeDebounceDelay: 200,
    maxWidthPercentage: 0.75,
    maxHeightPercentage: 0.75
};

// DOM Elements
const elements = {
    image: document.getElementById('torterraImage'),
    colorSwitch: document.querySelector('.color-switch-button')
};

// Color Palettes
const colorPalettes = [
    {
        name: 'torterra',
        dotColor: getCssVariable('--torterra-dot-color'),
        color1: getCssVariable('--torterra-color-1'),
        color2: getCssVariable('--torterra-color-2')
    },
    {
        name: 'blue',
        dotColor: getCssVariable('--blue-dot-color'),
        color1: getCssVariable('--blue-color-1'),
        color2: getCssVariable('--blue-color-2')
    },
    {
        name: 'splatoon',
        dotColor: getCssVariable('--splatoon-dot-color'),
        color1: getCssVariable('--splatoon-color-1'),
        color2: getCssVariable('--splatoon-color-2')
    }
];

let currentPaletteIndex = 0;

// Utility Functions
function getCssVariable(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Core Functions
function updateButtonColor() {
    const nextPaletteIndex = (currentPaletteIndex + 1) % colorPalettes.length;
    const nextPalette = colorPalettes[nextPaletteIndex];
    elements.colorSwitch.style.background = `linear-gradient(to bottom, ${nextPalette.color1}, ${nextPalette.color2})`;
}

function handleColorSwitch() {
    const root = document.documentElement;
    currentPaletteIndex = (currentPaletteIndex + 1) % colorPalettes.length;
    const nextPalette = colorPalettes[currentPaletteIndex];

    root.style.setProperty('--active-dot-color', nextPalette.dotColor);
    root.style.setProperty('--active-color-1', nextPalette.color1);
    root.style.setProperty('--active-color-2', nextPalette.color2);

    updateButtonColor();
}

function resizeImage() {
    const maxWidth = window.innerWidth * CONFIG.maxWidthPercentage;
    const maxHeight = window.innerHeight * CONFIG.maxHeightPercentage;
    elements.image.style.maxWidth = `${maxWidth}px`;
    elements.image.style.maxHeight = `${maxHeight}px`;
}

// Event Listeners
function initializeEventListeners() {
    elements.image.addEventListener('click', (event) => {
        event.target.classList.toggle('clicked');
    });

    window.addEventListener('resize', debounce(resizeImage, CONFIG.resizeDebounceDelay));
    elements.colorSwitch.addEventListener('click', handleColorSwitch);
}

// Initialization
function initialize() {
    resizeImage();
    updateButtonColor();
    initializeEventListeners();
}

// Start the application
initialize();