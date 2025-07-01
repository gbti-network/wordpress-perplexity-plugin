# Perplexity WordPress Plugin

A WordPress plugin that adds a floating "Analyze with Perplexity" button when text is selected on your WordPress site. This plugin enhances the reading experience by providing instant AI-powered analysis of selected content.

## Features

- **Smart Text Selection**: Automatically detects when text is selected on your WordPress posts
- **Perplexity AI Integration**: Opens selected text in Perplexity AI for instant analysis
- **Modern Architecture**: Built with ES6 modules and modern JavaScript
- **Universal Deployment**: Works in standard plugins folder, must-use plugins, child themes, or parent themes
- **Configurable Positioning**: Customizable icon placement with smart viewport boundary detection
- **Mobile Support**: Touch-friendly interface with responsive positioning
- **Debug Mode**: Console logging for development and troubleshooting

## Installation

### Standard Plugin Installation
1. Download the plugin files
2. Upload to `/wp-content/plugins/perplexity-learn-more/`
3. Activate through the WordPress admin panel

### Alternative Installations
The plugin automatically detects its environment and works in:
- **Must-Use Plugins**: `/wp-content/mu-plugins/perplexity-learn-more/`
- **Child Theme**: `/wp-content/themes/your-child-theme/perplexity-learn-more/`
- **Parent Theme**: `/wp-content/themes/your-theme/perplexity-learn-more/`

## Configuration

### PHP Configuration Variables
Edit the static variables in the `PerplexityTextAnalyzer` class:

```php
class PerplexityTextAnalyzer {
    // Plugin version
    const VERSION = '1.0.2';
    
    // Positioning (pixels)
    public static $position_offset_x = 8;  // Right offset from selection
    public static $position_offset_y = 0;  // Vertical offset (negative = up, positive = down)
    
    // Icon appearance
    public static $icon_width = 26;
    public static $icon_height = 26;
    public static $icon_border_radius = 4;
    
    // Behavior
    public static $min_text_length = 3;    // Minimum characters to trigger
    public static $debug = true;           // Enable/disable console logging
}
```

## Architecture

### Modern JavaScript Structure
- **Modular Design**: Separate modules for UI, events, actions, positioning, and configuration
- **ES6 Modules**: Clean imports with dynamic version-based cache busting
- **Event-Driven**: Uses modern `selectionchange` API instead of legacy mouse events
- **Promise-Based**: Asynchronous module loading with error handling

### File Structure
```
perplexity-learn-more/
├── css/
│   └── perplexity-learn-more.css
├── js/
│   ├── modules/
│   │   ├── actions.js      # Perplexity API integration
│   │   ├── config.js       # Configuration management
│   │   ├── events.js       # Event handling
│   │   ├── index.js        # Module coordinator
│   │   ├── positioning.js  # Smart positioning logic
│   │   └── ui.js          # DOM manipulation
│   └── perplexity-learn-more-modular.js
├── img/
│   └── perplexity-ai-icon.webp
├── perplexity-learn-more.php
└── README.md
```

## Development

### Debug Mode
Enable debug mode to see detailed console logging:
```php
public static $debug = true;
```

Debug output includes:
- Module loading status
- Text selection events
- Positioning calculations
- Configuration values

### Version Management
The plugin uses a centralized version system:
1. Update `const VERSION` in the PHP class
2. All assets (CSS, JS, modules) automatically use the new version
3. Ensures proper cache busting across all environments

### Browser Compatibility
- Modern browsers supporting ES6 modules
- Mobile Safari and Chrome for touch events
- Fallback handling for older browsers

## Technical Features

### Universal Asset Loading
Automatically detects environment and constructs correct URLs:
- Handles Windows/Unix path differences
- Works with WordPress multisite
- Supports custom directory structures

### Smart Positioning
- Positions icon at top-right of selected text
- Handles multi-line selections
- Viewport boundary detection prevents off-screen placement
- Responsive positioning for different screen sizes

### Performance Optimized
- Lazy module loading
- Event delegation
- Minimal DOM manipulation
- Efficient positioning calculations

## Browser Support

- Chrome 63+
- Firefox 60+
- Safari 11+
- Edge 79+

## More Information

For detailed documentation, tutorials, and support, visit the [official product page](https://gbti.network/products/wordpress-perplexity-plugin/).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different WordPress environments
5. Submit a pull request

## License

This plugin is licensed under the GPL v2 or later.

# GBTI Network 

The **GBTI Network** is a professional co-op network where members have opportunities to share profits, publish products, and contribute articles—all powered by community and GitHub sponsorships.

Sponsor our work by becoming a [GBTI Network Member](https://gbti.network/membership) (_powered by GitHub Sponsorship_).


## Membership Benefits

Becoming a [GBTI Member](https://github.com/sponsors/gbti-network) unlocks premium tools and perks:
- **Access to Growing List of Premium WordPress Plugins**
- **Private GitHub Repositories** with advanced tools and resources.
- **Membership Directory Listings** (optional)
- **Engaging Communities** on Private Discord, Reddit, Private Minecraft Server and more.
  

## Stay Connected

Follow us on your favorite platforms for updates, news, and community discussions:
- **[Twitter/X](https://twitter.com/gbti_network)**
- **[GitHub](https://github.com/gbti-network)**
- **[YouTube](https://www.youtube.com/channel/UCh4FjB6r4oWQW-QFiwqv-UA)**
- **[Dev.to](https://dev.to/gbti)**
- **[Daily.dev](https://dly.to/zfCriM6JfRF)**
- **[Hashnode](https://gbti.hashnode.dev/)**
- **[Discord Community](https://gbti.network)**
- **[Reddit Community](https://www.reddit.com/r/GBTI_network)**