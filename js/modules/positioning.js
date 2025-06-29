/**
 * Perplexity Learn More - Positioning Module
 * 
 * Handles positioning of UI elements relative to text selection
 */
import { config } from './config.js';

/**
 * Positioning class responsible for positioning UI elements
 */
export class PerplexityPositioning {
    // Static default X offset
    static DEFAULT_OFFSET_X = 8;
    /**
     * Position the container at the top-right of the selected text
     * @param {HTMLElement} container - The container element to position
     * @param {Selection} selection - The text selection object
     */
    positionContainer(container, selection) {
        if (!container) return false;
        
        // Validate selection object and safely get range
        if (!selection || typeof selection.getRangeAt !== 'function') {
            console.warn('Invalid selection object provided to positionContainer');
            return false;
        }
        
        // Check if selection has a range at index 0
        if (selection.rangeCount < 1) {
            console.warn('No selection range available');
            return false;
        }
        
        // Get the selection range and its bounding rectangle
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Handle multi-line selections - find the first line (top-most)
        const rects = range.getClientRects();
        let firstLineRect = rect;
        
        // If there are multiple line rectangles, find the first one (topmost)
        if (rects.length > 1) {
            let minTop = Infinity;
            for (let i = 0; i < rects.length; i++) {
                if (rects[i].top < minTop && rects[i].width > 0) {
                    minTop = rects[i].top;
                    firstLineRect = rects[i];
                }
            }
        }
        
        // Position at top-right of the first line of selection
        // Use configurable offsets from PHP (convert strings to numbers)
        const offsetX = parseInt(config.positionOffsetX) || PerplexityPositioning.DEFAULT_OFFSET_X; // pixels to the right
        const offsetY = parseInt(config.positionOffsetY) || -8; // pixels above/below
        
        // Debug config values
        if (config.debug) {
            console.log('Config debug:', {
                configPositionOffsetX: config.positionOffsetX,
                configPositionOffsetY: config.positionOffsetY,
                finalOffsetX: offsetX,
                finalOffsetY: offsetY,
                windowPerplexityTextAnalyzer: window.perplexityTextAnalyzer
            });
        }
        
        // Calculate position relative to viewport
        const left = firstLineRect.right + window.scrollX + offsetX;
        const top = firstLineRect.top + window.scrollY + offsetY;
        
        // Apply positioning
        container.style.position = 'absolute';
        container.style.left = `${left}px`;
        container.style.top = `${top}px`;
        container.style.zIndex = '10000';
        
        // Log positioning info if debug is enabled
        if (config.debug) {
            console.log('Positioning container at top-right:', {
                selection: rect,
                firstLine: firstLineRect,
                calculatedPosition: { left, top },
                appliedPosition: {
                    left: container.style.left,
                    top: container.style.top
                },
                offsetX,
                offsetY,
                scrollX: window.scrollX,
                scrollY: window.scrollY,
                selectionBounds: {
                    right: firstLineRect.right,
                    top: firstLineRect.top,
                    bottom: firstLineRect.bottom
                }
            });
        }
        
        // Ensure the container doesn't go off-screen (temporarily disabled for debugging)
        // this.adjustForViewportBounds(container, left, top);
        
        return true;
    }
    
    /**
     * Adjust container position to keep it within viewport bounds
     * @param {HTMLElement} container - The container element
     * @param {number} left - Calculated left position
     * @param {number} top - Calculated top position
     */
    adjustForViewportBounds(container, left, top) {
        const containerRect = container.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let adjustedLeft = left;
        let adjustedTop = top;
        
        // Keep within right edge of viewport
        if (left + containerRect.width > viewportWidth + window.scrollX) {
            adjustedLeft = viewportWidth + window.scrollX - containerRect.width - 8;
        }
        
        // Keep within left edge of viewport
        if (adjustedLeft < window.scrollX) {
            adjustedLeft = window.scrollX + 8;
        }
        
        // Keep within top edge of viewport
        if (top < window.scrollY) {
            adjustedTop = window.scrollY + 8;
        }
        
        // Keep within bottom edge of viewport
        if (top + containerRect.height > viewportHeight + window.scrollY) {
            adjustedTop = viewportHeight + window.scrollY - containerRect.height - 8;
        }
        
        // Apply adjusted positions if they changed
        if (adjustedLeft !== left) {
            container.style.left = `${adjustedLeft}px`;
        }
        if (adjustedTop !== top) {
            container.style.top = `${adjustedTop}px`;
        }
    }
    
    /**
     * Use external positioning module if available
     * @param {HTMLElement} container - The container element to position
     * @param {Selection} selection - The text selection object
     * @returns {boolean} - Whether external positioning was used
     */
    useExternalPositioning(container, selection) {
        if (window.perplexityPositioningModule && 
            typeof window.perplexityPositioningModule.positionContainer === 'function') {
            
            window.perplexityPositioningModule.positionContainer(container, selection);
            return true;
        }
        
        return false;
    }
}
