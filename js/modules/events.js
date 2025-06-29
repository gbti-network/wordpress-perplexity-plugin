/**
 * Perplexity Learn More - Events Module
 * 
 * Handles all event listeners and coordinates between modules
 */
import { config } from './config.js';

/**
 * Events class responsible for handling all event listeners
 */
export class PerplexityEvents {
    /**
     * @param {Object} ui - The UI module instance
     * @param {Object} positioning - The Positioning module instance
     * @param {Object} actions - The Actions module instance
     */
    constructor(ui, positioning, actions) {
        this.ui = ui;
        this.positioning = positioning;
        this.actions = actions;
    }
    
    /**
     * Initialize all event listeners
     */
    init() {
        console.log('Events.init() called - setting up event listeners');
        
        // Listen for text selection using modern selectionchange event
        document.addEventListener('selectionchange', this.handleTextSelection.bind(this));
        console.log('Added selectionchange event listener');
        
        // Add touch support for mobile devices
        document.addEventListener('touchend', this.handleTextSelection.bind(this));
        console.log('Added touchend event listener');
        
        // Hide container when clicking elsewhere
        document.addEventListener('mousedown', (e) => {
            const container = this.ui.getContainer();
            if (container && !container.contains(e.target)) {
                this.ui.hideContainer();
            }
        });
        
        // Add keyboard shortcut for toggling persist mode (Ctrl+Alt+P)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.altKey && (e.key === 'p' || e.key === 'P')) {
                const isPersisting = this.ui.togglePersist();
                console.log(`Toolbar persist mode ${isPersisting ? 'enabled' : 'disabled'}`);
                
                // If persisting is now enabled, make sure we have a container
                if (isPersisting && !this.ui.getContainer()) {
                    this.ui.createElements();
                    this.setupUIEventListeners();
                    this.ui.createOptionButtons(this.handleOptionClick.bind(this));
                    this.ui.showContainer();
                }
                
                // Add persist indicator
                if (this.ui.getContainer()) {
                    let persistIndicator = document.querySelector('#perplexity-persist-indicator');
                    if (!persistIndicator && isPersisting) {
                        persistIndicator = document.createElement('div');
                        persistIndicator.id = 'perplexity-persist-indicator';
                        persistIndicator.textContent = 'INSPECT MODE - Press Ctrl+Alt+P to disable';
                        persistIndicator.style.position = 'absolute';
                        persistIndicator.style.top = '-40px';
                        persistIndicator.style.left = '0';
                        persistIndicator.style.background = 'rgba(255,0,0,0.8)';
                        persistIndicator.style.color = '#fff';
                        persistIndicator.style.padding = '3px 8px';
                        persistIndicator.style.borderRadius = '4px';
                        persistIndicator.style.fontSize = '11px';
                        persistIndicator.style.fontWeight = 'bold';
                        persistIndicator.style.zIndex = '10001';
                        this.ui.getContainer().appendChild(persistIndicator);
                    } else if (persistIndicator && !isPersisting) {
                        persistIndicator.remove();
                    }
                }
            }
        });
    }
    
    /**
     * Handle text selection events
     */
    handleTextSelection() {

        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        
        // Debug selection
        if (config.debug) {

            console.log('Selection event:', {
                selectedText,
                textLength: selectedText.length,
                minTextLength: config.minTextLength,
                selection,
                rangeCount: selection.rangeCount
            });
        }
        
        // Only proceed if there's actual text selected and meets minimum length
        if (selectedText.length >= config.minTextLength) {
            // Store selected text in actions module
            this.actions.setSelectedText(selectedText);
            
            // Get selection info including character count and URL limit status
            const selectionInfo = this.actions.getSelectionInfo();
            
            // Create elements if they don't exist
            if (!this.ui.getContainer()) {
                this.ui.createElements();
                this.setupUIEventListeners();
                this.ui.createOptionButtons(this.handleOptionClick.bind(this));
            }
            
            // Position and show container
            const container = this.ui.getContainer();
            
            // Pass the selection object directly to the positioning module
            const positioned = this.positioning.positionContainer(container, selection);
            
            // Only show container if positioning was successful
            if (positioned !== false) {
                // Show container with selection info
                this.ui.showContainer(selectionInfo);
            }
        } else {
            this.ui.hideContainer();
        }
    }
    
    /**
     * Set up event listeners for UI elements
     */
    setupUIEventListeners() {
        const button = this.ui.getButton();
        const optionsContainer = this.ui.getOptionsContainer();
        
        if (!button || !optionsContainer) return;
        
        // Add click handler to main button
        button.addEventListener('click', () => {
            this.actions.openPerplexity(this.actions.getSelectedText());
            this.ui.hideContainer();
        });
        
        // Add hover behavior
        button.addEventListener('mouseenter', () => {
            this.ui.showOptions();
        });
        
        // Keep menu open when hovering over the options container
        optionsContainer.addEventListener('mouseenter', () => {
            this.ui.showOptions();
        });
        
        // Hide when leaving either the button or options container
        button.addEventListener('mouseleave', (e) => {
            // Only hide if not in persist mode and not moving directly to the options container
            if (!this.ui.persistContainer && (!e.relatedTarget || !optionsContainer.contains(e.relatedTarget))) {
                this.ui.hideOptions();
            }
        });
        
        optionsContainer.addEventListener('mouseleave', (e) => {
            // Only hide if not in persist mode and not moving directly to the button
            if (!this.ui.persistContainer && (!e.relatedTarget || e.relatedTarget !== button)) {
                this.ui.hideOptions();
            }
        });
    }
    
    /**
     * Handle option button clicks
     * @param {Event} event - The click event
     */
    handleOptionClick(event) {
        this.actions.handleOptionClick(event, () => {
            this.ui.hideContainer();
        });
    }
}
