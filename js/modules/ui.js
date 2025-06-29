/**
 * Perplexity Learn More - UI Module
 * 
 * Handles all DOM element creation and management
 */

/**
 * UI class responsible for creating and managing DOM elements
 */
export class PerplexityUI {
    constructor(config = {}) {
        this.config = config;
        this.container = null;
        this.button = null;
        this.optionsContainer = null;
        this.options = config.getOptions();
        this.isCreated = false;
        this.persistContainer = false; // Flag to prevent container from disappearing
    }
    
    /**
     * Create all necessary DOM elements
     */
    createElements() {
        if (this.isCreated) return;
        
        // Create container
        this.container = document.createElement('div');
        this.container.id = 'perplexity-analyzer-container';
        
        // Debug info is now handled via console logs only
        
        // Create button
        this.button = document.createElement('div');
        this.button.id = 'perplexity-analyzer-button';
        
        // Add custom tooltip element if specified
        if (this.config.iconTooltip) {
            // Create custom tooltip element instead of using title attribute
            const tooltip = document.createElement('div');
            tooltip.className = 'perplexity-tooltip';
            tooltip.textContent = this.config.iconTooltip;
            this.button.appendChild(tooltip);
            
            if (this.config.debug) {
                console.log('Setting custom tooltip:', this.config.iconTooltip);
            }
        }
        
        // Create logo image
        if (this.config.logoUrl) {
            const img = document.createElement('img');
            img.src = this.config.logoUrl;
            img.alt = 'Perplexity AI';
            
            // Use the configurable dimensions
            img.width = this.config.iconWidth;
            img.height = this.config.iconHeight;
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.style.borderRadius = `${this.config.iconBorderRadius}px`;
            
            // Apply dimensions to the button as well
            this.button.style.width = `${this.config.iconWidth}px`;
            this.button.style.height = `${this.config.iconHeight}px`;
            
            this.button.appendChild(img);
        }
        
        // Create the options container
        this.optionsContainer = document.createElement('div');
        this.optionsContainer.id = 'perplexity-options-container';
        
        // Add the elements to the container in the correct order
        // For left-side menu, options container comes first, then the button
        this.container.appendChild(this.optionsContainer);
        this.container.appendChild(this.button);
        
        // Add the container to the document body
        document.body.appendChild(this.container);
        
        this.isCreated = true;
    }
    
    /**
     * Create option buttons based on configuration
     * @param {Function} handleOptionClick - Callback for option button clicks
     */
    createOptionButtons(handleOptionClick) {
        if (!this.optionsContainer) return;
        
        // Clear existing options
        this.optionsContainer.innerHTML = '';
        
        // Process all options in their original order
        this.options.forEach((option) => {
            const optionButton = document.createElement('div');
            optionButton.className = `perplexity-option-button ${option.colorClass || ''}`;
            
            // For main Perplexity options (those with prefix), use Perplexity icon
            if (option.prefix) {
                // Create image element for Perplexity icon
                if (this.config.logoUrl) {
                    const img = document.createElement('img');
                    img.src = this.config.logoUrl;
                    img.alt = 'Perplexity AI';
                    img.width = 18;
                    img.height = 18;
                    img.style.verticalAlign = 'middle';
                    img.style.marginRight = option.text ? '5px' : '0';
                    img.style.display = 'inline-block';
                    optionButton.appendChild(img);
                }
            } 
            // Use dashicons for utility options (copy, print)
            else if (option.icon) {
                const icon = document.createElement('span');
                icon.className = `dashicons ${option.icon}`;
                optionButton.appendChild(icon);
            }
            
            // Add text only if provided
            if (option.text) {
                const textNode = document.createTextNode(option.text);
                optionButton.appendChild(textNode);
            }
            
            // Apply custom colors directly from the options
            if (option.backgroundColor) {
                optionButton.style.backgroundColor = option.backgroundColor;
            }
            
            if (option.accentColor) {
                optionButton.style.borderLeftColor = option.accentColor;
            }
            
            // Apply font color if specified
            if (option.fontColor) {
                optionButton.style.color = option.fontColor;
                
                // Also apply to any dashicons inside the button
                const icons = optionButton.querySelectorAll('.dashicons');
                if (icons.length > 0) {
                    icons.forEach(icon => {
                        icon.style.color = option.fontColor;
                    });
                }
            }
            
            // Store data attributes based on option type
            if (option.prefix) {
                optionButton.dataset.prefix = option.prefix;
            } else if (option.action) {
                optionButton.dataset.action = option.action;
            }
            
            // Apply custom font size if available
            optionButton.style.fontSize = `${this.config.fontSize}px`;
            
            // Apply custom border radius if available
            optionButton.style.borderRadius = `${this.config.menuBorderRadius}px`;
            
            // Add click handler
            optionButton.addEventListener('click', handleOptionClick);
            
            // Add tooltip if available
            if (option.tooltip) {
                optionButton.title = option.tooltip;
            }
            
            // Add to options container
            this.optionsContainer.appendChild(optionButton);
        });
    }
    
    /**
     * Show the container with animation
     * @param {Object} selectionInfo - Information about the selected text
     */
    showContainer(selectionInfo) {
        if (!this.container) return;
        
        this.container.style.opacity = '1';
        this.container.style.pointerEvents = 'auto';
    }
    
    /**
     * Hide the container with animation
     */
    hideContainer() {
        if (!this.container) return;
        
        // Only hide if not set to persist
        if (!this.persistContainer) {
            this.container.style.opacity = '0';
            this.container.style.pointerEvents = 'none';
        }
    }
    
    /**
     * Toggle the persist container state
     * @returns {boolean} The new persist state
     */
    togglePersist() {
        this.persistContainer = !this.persistContainer;
        
        // If we're persisting, make sure the container is visible
        if (this.persistContainer && this.container) {
            this.container.style.opacity = '1';
            this.container.style.pointerEvents = 'auto';
        }
        
        return this.persistContainer;
    }
    
    /**
     * Show the options menu
     */
    showOptions() {
        if (!this.optionsContainer) return;
        
        this.optionsContainer.style.opacity = '1';
        this.optionsContainer.style.transform = 'translateX(0)';
    }
    
    /**
     * Hide the options menu
     */
    hideOptions() {
        if (!this.optionsContainer) return;
        
        this.optionsContainer.style.opacity = '0';
        this.optionsContainer.style.transform = 'translateX(-20px)';
    }
    
    /**
     * Get container element
     * @returns {HTMLElement} The container element
     */
    getContainer() {
        return this.container;
    }
    
    /**
     * Get button element
     * @returns {HTMLElement} The button element
     */
    getButton() {
        return this.button;
    }
    
    /**
     * Get options container element
     * @returns {HTMLElement} The options container element
     */
    getOptionsContainer() {
        return this.optionsContainer;
    }
}
