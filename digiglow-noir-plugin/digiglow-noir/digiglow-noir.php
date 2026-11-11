<?php
/**
 * Plugin Name: DigiGlow Noir
 * Description: The DigiGlow Media noir homepage as a blank full-page template, without a page builder.
 * Version: 1.0.0
 * Author: DigiGlow Media
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Text Domain: digiglow-noir
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'DGN_VER', '1.0.0' );
define( 'DGN_DIR', plugin_dir_path( __FILE__ ) );
define( 'DGN_URL', plugin_dir_url( __FILE__ ) );
define( 'DGN_TPL', 'digiglow-noir-full.php' );

add_filter( 'theme_page_templates', function ( $templates ) {
	$templates[ DGN_TPL ] = 'DigiGlow Noir (full page)';
	return $templates;
} );

function dgn_is_noir() {
	return is_singular( 'page' ) && get_page_template_slug( get_queried_object_id() ) === DGN_TPL;
}

add_filter( 'template_include', function ( $template ) {
	return dgn_is_noir() ? DGN_DIR . 'templates/noir-page.php' : $template;
}, 99 );

add_action( 'wp_enqueue_scripts', function () {
	if ( ! dgn_is_noir() ) {
		return;
	}

	$keep_styles = array( 'admin-bar', 'dashicons' );
	foreach ( (array) wp_styles()->queue as $handle ) {
		if ( ! in_array( $handle, $keep_styles, true ) ) {
			wp_dequeue_style( $handle );
		}
	}
	foreach ( (array) wp_scripts()->queue as $handle ) {
		if ( 0 === strpos( $handle, 'elementor' ) ) {
			wp_dequeue_script( $handle );
		}
	}
	wp_dequeue_style( 'global-styles' );
	wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style( 'classic-theme-styles' );

	wp_enqueue_style( 'dgn-noir', DGN_URL . 'assets/css/noir.css', array(), DGN_VER );

	$v    = DGN_URL . 'assets/vendor/';
	$libs = array(
		'dgn-three'        => 'three/build/three.min.js',
		'dgn-three-room'   => 'three/examples/js/environments/RoomEnvironment.js',
		'dgn-three-copy'   => 'three/examples/js/shaders/CopyShader.js',
		'dgn-three-lum'    => 'three/examples/js/shaders/LuminosityHighPassShader.js',
		'dgn-three-pass'   => 'three/examples/js/postprocessing/Pass.js',
		'dgn-three-comp'   => 'three/examples/js/postprocessing/EffectComposer.js',
		'dgn-three-render' => 'three/examples/js/postprocessing/RenderPass.js',
		'dgn-three-shader' => 'three/examples/js/postprocessing/ShaderPass.js',
		'dgn-three-bloom'  => 'three/examples/js/postprocessing/UnrealBloomPass.js',
		'dgn-gsap'         => 'gsap/gsap.min.js',
		'dgn-gsap-st'      => 'gsap/ScrollTrigger.min.js',
		'dgn-gsap-scramble' => 'gsap/ScrambleTextPlugin.min.js',
	);
	$prev = array();
	foreach ( $libs as $handle => $file ) {
		wp_register_script( $handle, $v . $file, $prev, DGN_VER, true );
		$prev = array( $handle );
	}

	wp_enqueue_script( 'dgn-noir', DGN_URL . 'assets/js/noir.js', $prev, DGN_VER, true );
	wp_add_inline_script( 'dgn-noir', 'window.DGN_BASE = ' . wp_json_encode( DGN_URL . 'assets/' ) . ';', 'before' );
}, 999 );

add_filter( 'script_loader_tag', function ( $tag, $handle ) {
	if ( 0 === strpos( $handle, 'dgn-' ) ) {
		$tag = str_replace( '<script ', '<script data-no-optimize="1" data-no-defer="1" data-cfasync="false" ', $tag );
	}
	return $tag;
}, 10, 2 );

add_filter( 'wp_inline_script_attributes', function ( $attributes ) {
	if ( isset( $attributes['id'] ) && 0 === strpos( $attributes['id'], 'dgn-' ) ) {
		$attributes['data-no-optimize'] = '1';
		$attributes['data-no-defer']    = '1';
		$attributes['data-cfasync']     = 'false';
	}
	return $attributes;
} );

add_action( 'wp_head', function () {
	if ( ! dgn_is_noir() ) {
		return;
	}
	$f = DGN_URL . 'assets/fonts/';
	foreach ( array( 'manrope-200-800-latin.woff2', 'manrope-200-800-greek.woff2' ) as $font ) {
		printf( '<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n", esc_url( $f . $font ) );
	}
	printf( '<link rel="preload" href="%s" as="image" fetchpriority="high">' . "\n", esc_url( DGN_URL . 'assets/media/hero/office-empty.webp' ) );
}, 1 );

add_action( 'template_redirect', function () {
	if ( ! dgn_is_noir() || headers_sent() ) {
		return;
	}
	header( 'X-Content-Type-Options: nosniff' );
	header( 'X-Frame-Options: SAMEORIGIN' );
	header( 'Referrer-Policy: strict-origin-when-cross-origin' );
	header( 'Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()' );
} );
