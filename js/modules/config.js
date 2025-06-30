/**
 * Perplexity Learn More - Configuration Module
 * 
 * Centralizes all configuration settings from PHP localized variables
 */

/**
 * Configuration object that extracts and normalizes settings from PHP localized variables
 */
export const config = {
    // Get settings from PHP localized variables or use defaults
    minTextLength: window.perplexityTextAnalyzer?.minTextLength !== undefined 
        ? Number(window.perplexityTextAnalyzer.minTextLength) 
        : 10,
    
    // Maximum character limit based on URL constraints
    maxCharacterLimit: window.perplexityTextAnalyzer?.maxCharacterLimit || 2000,
    
    // Logo and icon settings
    logoUrl: window.perplexityTextAnalyzer?.logoUrl || '',
    iconWidth: window.perplexityTextAnalyzer?.iconWidth || 24,
    iconHeight: window.perplexityTextAnalyzer?.iconHeight || 24,
    iconBorderRadius: window.perplexityTextAnalyzer?.iconBorderRadius || 0,
    iconTooltip: window.perplexityTextAnalyzer?.iconTooltip || 'Lookup with Perplexity',
    
    // Menu appearance settings
    fontSize: window.perplexityTextAnalyzer?.fontSize || 14,
    menuBorderRadius: window.perplexityTextAnalyzer?.menuBorderRadius || 4,
    
    // Debug mode
    debug: (() => {
        console.log('Debug value from PHP:', window.perplexityTextAnalyzer?.debug, typeof window.perplexityTextAnalyzer?.debug);
        return window.perplexityTextAnalyzer?.debug === true || window.perplexityTextAnalyzer?.debug === "1";
    })(),
    
    // Mobile device configuration
    enableOnMobile: window.perplexityTextAnalyzer?.enableOnMobile === true || window.perplexityTextAnalyzer?.enableOnMobile === "1",
    
    // Positioning offsets
    positionOffsetX: window.perplexityTextAnalyzer?.positionOffsetX || 8,
    positionOffsetY: window.perplexityTextAnalyzer?.positionOffsetY || -8,
    
    // Responsive X offsets
    responsiveXOffsets: window.perplexityTextAnalyzer?.responsiveXOffsets || {
        mobile: '0px',
        tablet: '0px',
        desktop: '0px',
        widescreen: '0px'
    },
    
    responsiveYOffsets: window.perplexityTextAnalyzer?.responsiveYOffsets || {
        mobile: '0px',
        tablet: '0px',
        desktop: '0px',
        widescreen: '0px'
    },
    
    // Get options from PHP localized variables and sort by position
    // Since we use flex-direction: row-reverse in CSS, we need to reverse the position ordering
    // to make the display match our intended positions (higher position = rightmost)
    getOptions: function() {
        return window.perplexityTextAnalyzer?.options
            ? [...window.perplexityTextAnalyzer.options].sort((a, b) => {
                // Sort by position if available, otherwise keep original order
                if (a.position !== undefined && b.position !== undefined) {
                    // Reverse the comparison to account for flex-direction: row-reverse
                    return b.position - a.position;
                }
                return 0;
            })
            : [];
    },
    
    // Helper method to get screen size
    getScreenSize: function() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 767) {
            return 'mobile';
        } else if (screenWidth <= 1023) {
            return 'tablet';
        } else if (screenWidth <= 1499) {
            return 'desktop';
        }
        return 'widescreen';
    },
    
    // Helper method to detect if device is mobile
    isMobileDevice: function() {
        // Check user agent for mobile devices
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Check for iOS devices
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return true;
        }
        
        // Check for Android devices
        if (/android/i.test(userAgent)) {
            return true;
        }
        
        // Check for other mobile devices
        if (/webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
            return true;
        }
        
        // Also check touch capability and screen size
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 767;
        
        return hasTouch && isSmallScreen;
    }
};
