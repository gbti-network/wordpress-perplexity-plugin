/**
 * Perplexity Learn More - Main Module
 * 
 * Entry point for the Perplexity Learn More plugin
 */
// Get version from PHP for dynamic imports
const version = window.perplexityTextAnalyzer?.version || '1.0.0';

// Use dynamic imports with version
const modulePromises = Promise.all([
    import(`./ui.js?ver=${version}`),
    import(`./events.js?ver=${version}`),
    import(`./actions.js?ver=${version}`), 
    import(`./positioning.js?ver=${version}`),
    import(`./config.js?ver=${version}`)
]);

modulePromises.then(([
    { PerplexityUI },
    { PerplexityEvents },
    { PerplexityActions },
    { PerplexityPositioning },
    { config }
]) => {

console.log('Perplexity module loading...');

(function($) {
    'use strict';
    
    /**
     * Initialize the functionality
     */
    function init() {
        console.log('Perplexity initializing...', { config, $, jQuery });
        
        try {
            const ui = new PerplexityUI(config);
            const positioning = new PerplexityPositioning();
            const actions = new PerplexityActions();
            const events = new PerplexityEvents(ui, positioning, actions);
            
            console.log('Perplexity classes created, initializing events...');
            
            // Initialize the event handlers
            events.init();
            
            console.log('Perplexity initialization complete');
        } catch (error) {
            console.error('Perplexity initialization error:', error);
        }
    }
    
    // Initialize when the DOM is ready
    $(document).ready(init);
    
})(jQuery);

}).catch(error => {
    console.error('Failed to load Perplexity modules:', error);
});
