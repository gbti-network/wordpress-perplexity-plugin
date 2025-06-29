<?php
/**
 * Plugin Name: Perplexity Text Analyzer
 * Plugin URI: https://gbti.network/?utm_source=wordpress&utm_medium=plugin&utm_campaign=perplexity-text-analyzer
 * Description: Adds a floating "Analyze with Perplexity" button when text is selected on your WordPress site.
 * Version: 1.0.2
 * Author: GBTI Network
 * Author URI: https://gbti.network/?utm_source=wordpress&utm_medium=plugin-author&utm_campaign=perplexity-text-analyzer
 * Text Domain: perplexity-learn-more
 *
 * @package PerplexityTextAnalyzer
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die;
}

/**
 * Main plugin class for Perplexity Text Analyzer
 */
class PerplexityTextAnalyzer {
    
    // Plugin version constant
    const VERSION = '1.0.2';
    
    // Static positioning offset variables
    public static $position_offset_x = 8;
    public static $position_offset_y = 0;
    
    // Other static configuration variables
    public static $icon_width = 26;
    public static $icon_height = 26;
    public static $icon_border_radius = 4;
    public static $min_text_length = 3;
    public static $max_character_limit = 2000;
    public static $debug = true;
    public static $font_size = 12;
    public static $menu_border_radius = 5;
    public static $logo_url = '';
    
    /**
     * Initialize the plugin
     */
    public static function init() {
        add_action( 'wp_enqueue_scripts', array( __CLASS__, 'enqueue_scripts' ) );
        add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), array( __CLASS__, 'add_plugin_action_links' ) );
    }
    
    /**
     * Add custom action links to the plugin list
     */
    public static function add_plugin_action_links( $links ) {
        $custom_link = '<a href="https://gbti.network/?utm_source=wordpress&utm_medium=plugin-action&utm_campaign=perplexity-text-analyzer" target="_blank">🌍 ' . esc_html__( 'Visit the GBTI Network', 'perplexity-learn-more' ) . '</a>';
        
        // Append our link to the end instead of prepending
        $links[] = $custom_link;
        return $links;
    }
    
    /**
     * Get the base URL for plugin assets (works in plugins, mu-plugins, or child themes)
     */
    public static function get_plugin_url() {
        $plugin_file = __FILE__;
        $plugin_dir = wp_normalize_path( dirname( $plugin_file ) );
        
        // Normalize paths for comparison (handles Windows/Unix differences)
        $mu_plugin_dir = wp_normalize_path( WPMU_PLUGIN_DIR );
        $stylesheet_dir = wp_normalize_path( get_stylesheet_directory() );
        $template_dir = wp_normalize_path( get_template_directory() );
        
        // Check if we're in mu-plugins directory
        if ( strpos( $plugin_dir, $mu_plugin_dir ) !== false ) {
            return WPMU_PLUGIN_URL . '/' . basename( $plugin_dir );
        }
        
        // Check if we're in a child theme
        if ( strpos( $plugin_dir, $stylesheet_dir ) !== false ) {
            $relative_path = str_replace( $stylesheet_dir, '', $plugin_dir );
            $relative_path = ltrim( $relative_path, '/\\' ); // Remove leading slash or backslash
            $relative_path = str_replace( '\\', '/', $relative_path ); // Convert backslashes to forward slashes
            return rtrim( get_stylesheet_directory_uri(), '/' ) . '/' . $relative_path;
        }
        
        // Check if we're in parent theme
        if ( strpos( $plugin_dir, $template_dir ) !== false ) {
            $relative_path = str_replace( $template_dir, '', $plugin_dir );
            $relative_path = ltrim( $relative_path, '/\\' ); // Remove leading slash or backslash
            $relative_path = str_replace( '\\', '/', $relative_path ); // Convert backslashes to forward slashes
            return rtrim( get_template_directory_uri(), '/' ) . '/' . $relative_path;
        }
        
        // Default to plugin directory (standard plugins folder)
        return plugin_dir_url( $plugin_file );
    }
    
    /**
     * Enqueue scripts and styles for the plugin
     */
    public static function enqueue_scripts() {
        // Only enqueue on single posts
        if ( ! is_singular( 'post' ) ) {
            return;
        }
        
        $base_url = rtrim( self::get_plugin_url(), '/' );
        
        // Enqueue the CSS
        $css_url = $base_url . '/css/perplexity-learn-more.css';
        wp_enqueue_style( 'perplexity-learn-more', $css_url, array('dashicons'), self::VERSION );
        
        // Ensure dashicons are loaded
        wp_enqueue_style( 'dashicons' );
        
        // Enqueue the modular script
        $script_url = $base_url . '/js/perplexity-learn-more-modular.js';
        wp_enqueue_script( 'perplexity-learn-more', $script_url, array( 'jquery' ), self::VERSION, true );
        
        // Add type="module" attribute to the script tag
        add_filter('script_loader_tag', function($tag, $handle, $src) {
            if ('perplexity-learn-more' === $handle) {
                $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
            }
            return $tag;
        }, 10, 3);
        
        // Pass configuration to the script
        wp_localize_script( 'perplexity-learn-more', 'perplexityTextAnalyzer', array(
            'version' => self::VERSION,
            'logoUrl' => $base_url . '/img/perplexity-ai-icon.webp',
            'iconWidth' => self::$icon_width,
            'iconHeight' => self::$icon_height,
            'iconBorderRadius' => self::$icon_border_radius,
            'iconTooltip' => esc_html__('Check with Perplexity', 'perplexity-learn-more'),
            'minTextLength' => self::$min_text_length,
            'debug' => self::$debug,
            'maxCharacterLimit' => self::$max_character_limit,
            'positionOffsetX' => self::$position_offset_x,
            'positionOffsetY' => self::$position_offset_y,
            'options' => array(),
            'fontSize' => self::$font_size,
            'menuBorderRadius' => self::$menu_border_radius
        ));
    }
}

// Initialize the plugin
PerplexityTextAnalyzer::init();
