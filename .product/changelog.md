## 1.0.2 - December 29, 2024

### New Features
- Universal deployment support for plugins, mu-plugins, child themes, and parent themes
- Dynamic version management system with centralized PHP constant
- Automatic cache busting for all JavaScript modules
- Cross-platform path handling for Windows and Unix systems

### Improvements
- Enhanced asset loading with environment detection
- Cleaner URL construction without double slashes
- Better error handling for module imports
- Simplified configuration management

### Bug Fixes
- Fixed malformed URLs when plugin is placed in child themes
- Resolved path issues on Windows environments
- Corrected string-to-number conversion for positioning offsets

## 1.0.1 - December 28, 2024

### New Features
- Refactored to modular ES6 JavaScript architecture
- Added mobile touch support with touchend event handling
- Implemented smart viewport boundary detection
- Added debug mode with comprehensive console logging

### Improvements
- Replaced legacy mouseup events with modern selectionchange API
- Simplified positioning logic to always show at top-right of selection
- Removed visual debug overlay in favor of console logging
- Reduced container padding for cleaner appearance

### Bug Fixes
- Fixed icon positioning appearing at bottom of page
- Resolved debug mode detection issues
- Corrected positioning calculations for multi-line selections

## 1.0.0 - December 20, 2024

### Initial Release
- Basic text selection detection on WordPress posts
- Perplexity AI integration for selected text analysis
- Floating button UI with hover tooltip
- Configurable minimum text length
- WordPress plugin architecture
- Local icon asset support
- Responsive positioning system