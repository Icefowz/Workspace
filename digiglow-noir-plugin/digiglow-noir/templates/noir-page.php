<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* Sections of the homepage, in order. Each file is in templates/sections/. Shared parts are in templates/site/. */
$dgn_sections = array(
	'01-hero.php',
	'02-drill-projects.php',
	'03-projects-and-services.php',
	'04-d-landing-team.php',
	'05-how-we-work-qa.php',
	'06-overlays.php',
);
$dgn_media = DGN_URL . 'assets/media/';
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
<?php wp_body_open(); ?>
<?php include DGN_DIR . 'templates/site/header.php'; ?>
<div class="dgn" data-dg-nav-theme="dark">
<?php
foreach ( $dgn_sections as $dgn_section ) {
	include DGN_DIR . 'templates/sections/' . $dgn_section;
}
?>
</div>
<?php include DGN_DIR . 'templates/site/clients.php'; ?>
<?php include DGN_DIR . 'templates/site/footer.php'; ?>
<?php wp_footer(); ?>
</body>
</html>
