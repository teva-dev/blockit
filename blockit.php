<?php
/**
 * Plugin Name: Blockit
 * Description: A plugin containing blocks and some adds for gutenberg editor.
 * Version:     1.0.0
 * Author:      Teva
 * Text Domain: blockit
 * Domain Path: /languages
 * 
 * @package ghostkit
 */

//  Exit if accessed directly.
defined('ABSPATH') || exit;

/**
 * GhostKit Class
 */
class Blockit {

	/**
	 * Class instance
	 *
	 * @var $_instance
	 */
	private static $_instance = null;

	/**
	 * Path to the plugin directory
	 *
	 * @var $plugin_path
	 */
	public $plugin_path;

	/**
	 * URL to the plugin directory
	 *
	 * @var $plugin_url
	 */
	public $plugin_url;

	/**
	 * Plugin name
	 *
	 * @var $plugin_name
	 */
	public $plugin_name;

	/**
	 * Plugin version
	 *
	 * @var $plugin_version
	 */
	public $plugin_version;

	/**
	 * Plugin slug
	 *
	 * @var $plugin_slug
	 */
	public $plugin_slug;

	/**
	 * Plugin name sanitized
	 *
	 * @var $plugin_name_sanitized
	 */
	public $plugin_name_sanitized;

	/**
	 * Main Instance
	 * Ensures only one instance of this class exists in memory at any one time.
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
				self::$_instance = new self();
				self::$_instance->init_options();
				self::$_instance->init_hooks();
		}
		return self::$_instance;
	}

	/**
	 * Init options
	 */
	public function init_options() {

		$this->plugin_path = plugin_dir_path( __FILE__ );
		$this->plugin_url = plugin_dir_url( __FILE__ );

		// load textdomain.
		load_plugin_textdomain( 'blockit', false, basename( dirname( __FILE__ ) ) . '/languages' );
		
	}

	/**
	 * Init hooks
	 */
	public function init_hooks() {

		// Include blocks (if gutenberg editor available).
		if ( function_exists( 'register_block_type' ) ) {

			//
			add_action( 'init', array( $this, 'register_scripts' ) );

			// add blockit blocks category.
			add_filter( 'block_categories', array( $this, 'block_categories' ), 9 );

			// Enqueue editor assets (earlier to let 3rd-party plugins add custom styles support).
			add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ), 9 );

			// Enqueue frontend assets
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_block_assets' ) );

		}

	}

	/**
	 * Register some scripts.
	 */
	public function register_scripts() {
	
		// helper script.
		wp_register_script(
			'blockit-helper',
			plugins_url( 'assets/js/helper.min.js', __FILE__ ),
			array( 'jquery' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/helper.min.js' )
		);

		wp_localize_script( 'blockit-helper', 'blockitVariables', [

			// TODO: Move this to plugin options.
			'media_sizes' => [
				'sm' => 576,
				'md' => 768,
				'lg' => 992,
				// 'xl' => 1200,
			],

		] );

	}

	/**
	 * Add Blockit blocks category
	 *
	 * @param array $categories Available categories.
	 * @return array
	 */
	public function block_categories( $categories ) {
		return array_merge(
			array(
					array(
							'slug'  => 'blockit',
							'title' => __( 'Blockit', 'blockit' ),
					),
			),
			$categories
		);
	}

	/**
	 * Enqueue editor assets
	 */
	public function enqueue_block_editor_assets() {

		$css_deps = array();
		$js_deps = array( 'jquery', 'blockit-helper', 'wp-editor', 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-edit-post', 'wp-compose', 'wp-components' );

		// Enqueue the bundled block JS file
		wp_enqueue_script(
				'blockit-editor',
				plugins_url( 'assets/js/editor.blocks.min.js', __FILE__ ),
				$js_deps,
				filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/editor.blocks.min.js' )
		);

		// Enqueue editor only styles
		wp_enqueue_style(
			'blockit-editor',
			plugins_url( 'assets/css/blocks.editor.min.css', __FILE__ ),
			$css_deps,
			filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/blocks.editor.min.css' )
		);
	}

	/**
	 * Enqueue frontend assets
	 */
	public function enqueue_block_assets() {

		$css_deps = array();
		$js_deps = array( 'jquery' );

		wp_enqueue_script(
			'blockit',
			plugins_url( 'assets/js/script.min.js', __FILE__ ),
			$js_deps,
			filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/script.min.js' )
		);		

		wp_enqueue_style(
			'blockit',
			plugins_url( 'assets/css/blocks.style.min.css', __FILE__ ),
			$css_deps,
			filemtime( plugin_dir_path( __FILE__ ) . '/assets/css/blocks.style.min.css' )
		);
		
	}

}

/**
 * Load single instance
 *
 * @return object Blockit
 */
function blockit() {
	return Blockit::instance();
}
add_action( 'plugins_loaded', 'blockit' );

