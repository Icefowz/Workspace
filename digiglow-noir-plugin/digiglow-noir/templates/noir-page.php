<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php if ( ! current_theme_supports( 'title-tag' ) ) : ?>
<title><?php echo esc_html( wp_get_document_title() ); ?></title>
<?php endif; ?>
<?php wp_head(); ?>
</head>
<body <?php body_class( 'dgn-page' ); ?>>
<?php
wp_body_open();
$dgn_markup = file_get_contents( DGN_DIR . 'templates/noir-markup.html' );
echo str_replace( '%%MEDIA%%', esc_url( DGN_URL . 'assets/media/' ), $dgn_markup ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- static markup shipped with the plugin
wp_footer();
?>
</body>
</html>
