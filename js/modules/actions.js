/**
 * Perplexity Learn More - Actions Module
 * 
 * Handles all user interactions and actions
 */

/**
 * Actions class responsible for handling user interactions
 */
export class PerplexityActions {
    constructor(config) {
        this.config = config;
        this.selectedText = '';
    }
    
    /**
     * Set the currently selected text
     * @param {string} text - The selected text
     */
    setSelectedText(text) {
        this.selectedText = text;
    }
    
    /**
     * Get the currently selected text
     * @returns {string} The selected text
     */
    getSelectedText() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            return range.toString();
        }
        return '';
    }
    
    /**
     * Get information about the selected text including character count and URL limit status
     * @returns {Object} Selection information
     */
    getSelectionInfo() {
        const text = this.getSelectedText();
        if (!text) return { charCount: 0, overLimit: false };
        
        // Get character count
        const charCount = text.length;
        
        // Check if over URL limit
        const overLimit = charCount > this.config.maxCharacterLimit;
        
        return {
            charCount,
            overLimit
        };
    }
    
    /**
     * Open Perplexity AI with the selected text
     * @param {string} text - The text to search with Perplexity
     */
    openPerplexity(text) {
        const encodedText = encodeURIComponent(text.trim());
        const perplexityUrl = `https://www.perplexity.ai/search?q=${encodedText}`;
        window.open(perplexityUrl, '_blank');
    }
    
    /**
     * Handle option button clicks
     * @param {Event} event - The click event
     * @param {Function} hideCallback - Callback to hide UI after action
     */
    handleOptionClick(event, hideCallback) {
        const target = event.currentTarget;
        
        if (target.dataset.prefix) {
            // Handle Perplexity query options
            const prefix = target.dataset.prefix;
            this.openPerplexity(prefix + this.selectedText);
        } else if (target.dataset.action) {
            // Handle utility actions
            const action = target.dataset.action;
            
            switch(action) {
                case 'copy':
                    this.copyToClipboard(target);
                    break;
                case 'print':
                    this.printSelection();
                    break;
            }
        }
        
        // Hide container after any action
        if (typeof hideCallback === 'function') {
            hideCallback();
        }
    }
    
    /**
     * Copy selected text to clipboard
     * @param {HTMLElement} buttonElement - The button element that triggered the action
     */
    copyToClipboard(buttonElement) {
        navigator.clipboard.writeText(this.selectedText).then(() => {
            if (this.config.debug) {
                console.log('Text copied to clipboard');
            }
            
            // Show visual feedback
            buttonElement.classList.add('copied');
            setTimeout(() => {
                buttonElement.classList.remove('copied');
            }, 1000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }
    
    /**
     * Create a print window with the selected text
     */
    printSelection() {
        const printWin = window.open('', '_blank', 'width=800,height=600');
        printWin.document.write(`
            <html>
            <head>
                <title>Print Selection</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
                    .content { max-width: 800px; margin: 0 auto; }
                    h1 { font-size: 18px; color: #333; }
                    .selection { padding: 15px; border: 1px solid #ddd; background: #f9f9f9; }
                </style>
            </head>
            <body>
                <div class="content">
                    <h1>Selected Text</h1>
                    <div class="selection">${this.selectedText}</div>
                </div>
                <script>window.onload = function() { window.print(); }</script>
            </body>
            </html>
        `);
        printWin.document.close();
    }
}
