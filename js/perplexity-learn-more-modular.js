/**
 * Perplexity Learn More
 * 
 * Adds a floating button when text is selected that opens Perplexity AI with the selected text.
 * Shows options that open to the left as text links.
 * 
 * This is the main entry file that loads the modular components.
 */

// Get version from PHP
const version = window.perplexityTextAnalyzer?.version || '1.0.0';
console.log(`MODULAR JS LOADING - Version ${version}`);

// Import the modules with version for cache busting
import(`./modules/index.js?ver=${version}`);
