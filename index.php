<?php
session_start();
require_once 'includes/config.php';
require_once 'includes/functions.php';

// Get site settings
$settings = getSiteSettings();
$currentTheme = $settings['current_theme'] ?? 'blue-dark';
$viewCount = updateViewCount();

// Get data for the page
$products = getProducts();
$banners = getBanners();
$videos = getVideos();
$reviews = getApprovedReviews();
$pdfs = getPDFs();
$gallery = getGalleryImages();

// Enhanced theme configurations with 15 themes
$themes = [
    'blue-dark' => [
        'name' => 'Professional Blue',
        'primary' => '#1e40af',
        'secondary' => '#0891b2',
        'accent' => '#f97316',
        'background' => 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0891b2 100%)',
        'cardBg' => 'rgba(255, 255, 255, 0.1)',
        'text' => '#ffffff',
        'textSecondary' => '#e2e8f0',
        'font' => 'Inter, sans-serif',
        'animation' => 'floating'
    ],
    'gradient' => [
        'name' => 'Vibrant Gradient',
        'primary' => '#8b5cf6',
        'secondary' => '#06b6d4',
        'accent' => '#f59e0b',
        'background' => 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'cardBg' => 'rgba(255, 255, 255, 0.15)',
        'text' => '#ffffff',
        'textSecondary' => '#f1f5f9',
        'font' => 'Poppins, sans-serif',
        'animation' => 'pulse'
    ],
    'teal-orange' => [
        'name' => 'Modern Teal',
        'primary' => '#0d9488',
        'secondary' => '#0891b2',
        'accent' => '#f97316',
        'background' => 'linear-gradient(135deg, #0f766e 0%, #0891b2 50%, #f59e0b 100%)',
        'cardBg' => 'rgba(255, 255, 255, 0.12)',
        'text' => '#ffffff',
        'textSecondary' => '#e2e8f0',
        'font' => 'Roboto, sans-serif',
        'animation' => 'bounce'
    ],
    'light' => [
        'name' => 'Clean Light',
        'primary' => '#2563eb',
        'secondary' => '#0891b2',
        'accent' => '#f97316',
        'background' => 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        'cardBg' => '#ffffff',
        'text' => '#1e293b',
        'textSecondary' => '#64748b',
        'font' => 'Open Sans, sans-serif',
        'animation' => 'fade'
    ],
    'dark-purple' => [
        'name' => 'Dark Purple',
        'primary' => '#7c3aed',
        'secondary' => '#a855f7',
        'accent' => '#fbbf24',
        'background' => 'linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #a855f7 100%)',
        'cardBg' => 'rgba(255, 255, 255, 0.1)',
        'text' => '#ffffff',
        'textSecondary' => '#e2e8f0',
        'font' => 'Montserrat, sans-serif',
        'animation' => 'glow'
    ],
    'emerald-gold' => [
        'name' => 'Emerald Gold',
        'primary' => '#059669',
        'secondary' => '#10b981',
        'accent' => '#f59e0b',
        'background' => 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #f59e0b 100%)',
        'cardBg' => 'rgba(255, 255, 255, 0.12)',
        'text' => '#ffffff',
        'textSecondary' => '#d1fae5',
        'font' => 'Nunito, sans-serif',
        'animation' => 'slide'
    ],
    'rose-pink' => [
        'name' => 'Rose Pink',
        'primary' => '#e11d48',
        'secondary' => '#f43f5e',
        'accent' => '#8b5cf6',
        'background' => 'linear-gradient(135deg, #be185d 0%, #e11d48 50%, #f43f5e 100%)',
        'cardBg' => 'rgba(255, 255, 255, 0.15)',
        'text' => '#ffffff',
        'textSecondary' => '#fce7f3',
        'font' => 'Playfair Display, serif',
        'animation' => 'rotate'
    ],
    'ocean-blue' => [
        'name' => 'Ocean Blue',
        'primary' => '#0284c7',
        'secondary' => '#0ea5e9',
        'accent' => '#06b6d4',
        'background' => 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 50%, #0ea5e9 100%)',
        'cardBg' => 'rgba(255, 255, 255, 0.1)',
        'text' => '#ffffff',
        'textSecondary' => '#e0f2fe',
        'font' => 'Lato, sans-serif',
        'animation' => 'wave'
    ],
    'sunset-orange' => [
        'name' => 'Sunset Orange',
        'primary' => '#ea580c',
        'secondary' => '#f97316',
        'accent' => '#fbbf24',
        'background' => 'linear-gradient(135deg, #c2410c 0%, #ea580c 50%, #f97316 100%)',
        'cardBg' => 'rgba(255, 255, 255, 0.12)',
        'text' => '#ffffff',
        'textSecondary' => '#fed7aa',
        'font' => 'Source Sans Pro, sans-serif',
        'animation' => 'flicker'
    ],
    'forest-green' => [
        'name' => 'Forest Green',
        'primary' => '#166534',
        'secondary' => '#16a34a',
        'accent' => '#84cc16',
        'background' => 'linear-gradient(135deg, #14532d 0%, #166534 50%, #16a34a 100%)',
        'cardBg' => 'rgba(255, 255, 255, 0.1)',
        'text' => '#ffffff',
        'textSecondary' => '#dcfce7',
        'font' => 'Raleway, sans-serif',
        'animation' => 'grow'
    ],
    'royal-purple' => [
        'name' => 'Royal Purple',
        'primary' => '#6b21a8',
        'secondary' => '#9333ea',
        'accent' => '#f59e0b',
        'background' => 'linear-gradient(135deg, #581c87 0%, #6b21a8 50%, #9333ea 100%)',
        'cardBg' => 'rgba(255, 255, 255, 0.12)',
        'text' => '#ffffff',
        'textSecondary' => '#ede9fe',
        'font' => 'Crimson Text, serif',
        'animation' => 'sparkle'
    ],
    'midnight-blue' => [
        'name' => 'Midnight Blue',
        'primary' => '#1e3a8a',
        'secondary' => '#3730a3',
        'accent' => '#06b6d4',
        'background' => 'linear-gradient(135deg, #1e1b4b 0%, #1e3a8a 50%, #3730a3 100%)',
        'cardBg' => 'rgba(255, 255, 255, 0.08)',
        'text' => '#ffffff',
        'textSecondary' => '#e0e7ff',
        'font' => 'Merriweather, serif',
        'animation' => 'twinkle'
    ],
    'coral-reef' => [
        'name' => 'Coral Reef',
        'primary' => '#dc2626',
        'secondary' => '#f97316',
        'accent' => '#fbbf24',
        'background' => 'linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #f97316 100%)',
        'cardBg' => 'rgba(255, 255, 255, 0.15)',
        'text' => '#ffffff',
        'textSecondary' => '#fef2f2',
        'font' => 'Dancing Script, cursive',
        'animation' => 'sway'
    ],
    'golden-hour' => [
        'name' => 'Golden Hour',
        'primary' => '#d97706',
        'secondary' => '#f59e0b',
        'accent' => '#eab308',
        'background' => 'linear-gradient(135deg, #92400e 0%, #d97706 50%, #f59e0b 100%)',
        'cardBg' => 'rgba(255, 255, 255, 0.12)',
        'text' => '#ffffff',
        'textSecondary' => '#fef3c7',
        'font' => 'Quicksand, sans-serif',
        'animation' => 'shimmer'
    ],
    'arctic-frost' => [
        'name' => 'Arctic Frost',
        'primary' => '#0f766e',
        'secondary' => '#14b8a6',
        'accent' => '#06b6d4',
        'background' => 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #14b8a6 100%)',
        'cardBg' => 'rgba(255, 255, 255, 0.1)',
        'text' => '#ffffff',
        'textSecondary' => '#ccfbf1',
        'font' => 'Oswald, sans-serif',
        'animation' => 'frost'
    ]
];

$theme = $themes[$currentTheme];
$currentDomain = getCurrentDomain();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($settings['site_title'] ?? 'DEMO CARD'); ?></title>
    <meta name="description" content="<?php echo htmlspecialchars($settings['meta_description'] ?? 'Professional digital visiting card and business services'); ?>">
    <meta name="keywords" content="<?php echo htmlspecialchars($settings['meta_keywords'] ?? 'visiting card, business card, digital card'); ?>">
    
    <!-- Enhanced SEO Meta Tags -->
    <meta name="robots" content="index, follow">
    <meta name="author" content="<?php echo htmlspecialchars($settings['company_name'] ?? 'DEMO CARD'); ?>">
    <meta name="language" content="English">
    <meta name="revisit-after" content="7 days">
    <meta name="distribution" content="global">
    <meta name="rating" content="general">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="<?php echo htmlspecialchars($settings['site_title'] ?? 'DEMO CARD'); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($settings['meta_description'] ?? 'Professional digital visiting card'); ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo getCurrentUrl(); ?>">
    <meta property="og:image" content="<?php echo $settings['logo_url'] ?: '/assets/images/og-image.jpg'; ?>">
    <meta property="og:site_name" content="<?php echo htmlspecialchars($settings['company_name'] ?? 'DEMO CARD'); ?>">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo htmlspecialchars($settings['site_title'] ?? 'DEMO CARD'); ?>">
    <meta name="twitter:description" content="<?php echo htmlspecialchars($settings['meta_description'] ?? 'Professional digital visiting card'); ?>">
    <meta name="twitter:image" content="<?php echo $settings['logo_url'] ?: '/assets/images/og-image.jpg'; ?>">
    
    <!-- PWA Meta Tags -->
    <meta name="theme-color" content="<?php echo $theme['primary']; ?>">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="<?php echo htmlspecialchars($settings['site_title'] ?? 'DEMO CARD'); ?>">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">
    <link rel="apple-touch-icon" href="assets/images/apple-touch-icon.png">
    <link rel="manifest" href="manifest.json">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Open+Sans:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Nunito:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&family=Source+Sans+Pro:wght@300;400;600;700&family=Raleway:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600&family=Merriweather:wght@300;400;700&family=Dancing+Script:wght@400;500;600;700&family=Quicksand:wght@300;400;500;600;700&family=Oswald:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/responsive.css">
    <link rel="stylesheet" href="assets/css/animations.css">
    
    <!-- Font Awesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <style>
        :root {
            --primary-color: <?php echo $theme['primary']; ?>;
            --secondary-color: <?php echo $theme['secondary']; ?>;
            --accent-color: <?php echo $theme['accent']; ?>;
            --card-bg: <?php echo $theme['cardBg']; ?>;
            --text-color: <?php echo $theme['text']; ?>;
            --text-secondary: <?php echo $theme['textSecondary']; ?>;
            --theme-font: <?php echo $theme['font']; ?>;
        }
        
        body {
            background: <?php echo $theme['background']; ?>;
            color: <?php echo $theme['text']; ?>;
            font-family: var(--theme-font);
        }
        
        .theme-animation {
            animation: <?php echo $theme['animation']; ?> 3s ease-in-out infinite;
        }
        
        /* Custom theme background if set */
        <?php if (!empty($settings['custom_background'])): ?>
        body {
            background: <?php echo $settings['custom_background']; ?> !important;
        }
        <?php endif; ?>
    </style>
</head>
<body>
    <!-- Discount Popup -->
    <div id="discountPopup" class="discount-popup">
        <div class="discount-content">
            <button class="close-popup" onclick="closeDiscountPopup()">
                <i class="fas fa-times"></i>
            </button>
            <div class="discount-text">
                <i class="fas fa-gift"></i>
                <span><?php echo htmlspecialchars($settings['discount_text'] ?? 'DISCOUNT UPTO 50% Live Use FREE code'); ?></span>
            </div>
        </div>
    </div>

    <!-- PWA Install Prompt -->
    <div id="pwaInstallPrompt" class="pwa-install-prompt">
        <div class="pwa-content">
            <button class="close-pwa" onclick="closePWAPrompt()">
                <i class="fas fa-times"></i>
            </button>
            <div class="pwa-text">
                <i class="fas fa-mobile-alt"></i>
                <span>Add this website to your home screen for quick access!</span>
                <button class="install-btn" onclick="installPWA()">Install</button>
            </div>
        </div>
    </div>

    <!-- Auto-scrolling Top Banner -->
    <div class="banner-container" id="topBanner">
        <div class="banner-slider">
            <?php foreach ($banners as $banner): ?>
                <div class="banner-slide">
                    <img src="<?php echo htmlspecialchars($banner['image_url']); ?>" 
                         alt="<?php echo htmlspecialchars($banner['title'] ?? 'Banner'); ?>"
                         onclick="<?php echo $banner['link_url'] ? "window.open('" . htmlspecialchars($banner['link_url']) . "', '_blank')" : ''; ?>">
                </div>
            <?php endforeach; ?>
        </div>
        <div class="view-counter">
            <i class="fas fa-eye"></i>
            <span><?php echo number_format($viewCount); ?></span>
        </div>
    </div>

    <!-- Main Container -->
    <div class="container">
        <!-- Header Section -->
        <header class="header-section">
            <!-- Logo -->
            <div class="logo-container">
                <div class="logo theme-animation">
                    <?php if (!empty($settings['logo_url'])): ?>
                        <img src="<?php echo htmlspecialchars($settings['logo_url']); ?>" alt="Logo">
                    <?php else: ?>
                        <div class="logo-placeholder">🏢</div>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Company Title & Director -->
            <div class="title-section">
                <h1 class="company-title"><?php echo htmlspecialchars($settings['company_name'] ?? 'DEMO CARD'); ?></h1>
                <h2 class="director-name"><?php echo htmlspecialchars($settings['director_name'] ?? 'Vishal Rathod'); ?></h2>
                <p class="director-title"><?php echo htmlspecialchars($settings['director_title'] ?? 'FOUNDER'); ?></p>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons">
                <button class="action-btn call-btn theme-animation" onclick="window.open('tel:+91<?php echo $settings['contact_phone1']; ?>')">
                    <i class="fas fa-phone"></i>
                    <span>Call</span>
                </button>
                <button class="action-btn whatsapp-btn theme-animation" onclick="openWhatsApp('<?php echo $settings['whatsapp_number']; ?>')">
                    <i class="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                </button>
                <button class="action-btn direction-btn theme-animation" onclick="window.open('https://maps.google.com/?q=<?php echo urlencode($settings['contact_address']); ?>')">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Direction</span>
                </button>
                <button class="action-btn mail-btn theme-animation" onclick="window.open('mailto:<?php echo $settings['contact_email']; ?>')">
                    <i class="fas fa-envelope"></i>
                    <span>Mail</span>
                </button>
                <button class="action-btn website-btn theme-animation" onclick="window.open('<?php echo $settings['website_url']; ?>')">
                    <i class="fas fa-globe"></i>
                    <span>Website</span>
                </button>
            </div>

            <!-- Free Website Offer Button -->
            <div class="free-website-offer">
                <button class="free-website-btn theme-animation" onclick="showFreeWebsiteForm()">
                    <i class="fas fa-gift"></i>
                    <span>GET YOUR BUSINESS WEBSITE FREE</span>
                </button>
            </div>

            <!-- User Registration/Login -->
            <div class="user-auth-section">
                <?php if (isset($_SESSION['user_id'])): ?>
                    <div class="user-welcome">
                        <span>Welcome, <?php echo htmlspecialchars($_SESSION['user_name']); ?>!</span>
                        <button class="auth-btn" onclick="showUserDashboard()">
                            <i class="fas fa-user"></i>
                            My Account
                        </button>
                        <button class="auth-btn" onclick="userLogout()">
                            <i class="fas fa-sign-out-alt"></i>
                            Logout
                        </button>
                    </div>
                <?php else: ?>
                    <div class="auth-buttons">
                        <button class="auth-btn" onclick="showLoginForm()">
                            <i class="fas fa-sign-in-alt"></i>
                            Login
                        </button>
                        <button class="auth-btn" onclick="showRegisterForm()">
                            <i class="fas fa-user-plus"></i>
                            Register
                        </button>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Contact Details -->
            <div class="contact-details">
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <span><?php echo htmlspecialchars($settings['contact_phone1']); ?></span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <span><?php echo htmlspecialchars($settings['contact_phone2']); ?></span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <span><?php echo htmlspecialchars($settings['contact_email']); ?></span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span><?php echo htmlspecialchars($settings['contact_address']); ?></span>
                </div>
            </div>

            <!-- Share Section -->
            <div class="share-section">
                <div class="whatsapp-share">
                    <input type="text" id="countryCode" placeholder="+91" value="+91">
                    <button class="whatsapp-share-btn" onclick="shareOnWhatsApp()">
                        <i class="fab fa-whatsapp"></i>
                        Share on WhatsApp
                    </button>
                </div>

                <div class="action-row">
                    <button class="action-btn-secondary" onclick="downloadVCF()">
                        <i class="fas fa-download"></i>
                        Save to Contacts
                    </button>
                    <button class="action-btn-secondary" onclick="shareCard()">
                        <i class="fas fa-share"></i>
                        Share
                    </button>
                    <button class="action-btn-secondary" onclick="savePDF()">
                        <i class="fas fa-file-pdf"></i>
                        Save PDF
                    </button>
                </div>
            </div>

            <!-- Social Media Icons -->
            <div class="social-media">
                <?php
                $socialMedia = [
                    'facebook' => ['icon' => 'fab fa-facebook-f', 'color' => '#1877f2'],
                    'youtube' => ['icon' => 'fab fa-youtube', 'color' => '#ff0000'],
                    'twitter' => ['icon' => 'fab fa-twitter', 'color' => '#1da1f2'],
                    'instagram' => ['icon' => 'fab fa-instagram', 'color' => '#e4405f'],
                    'linkedin' => ['icon' => 'fab fa-linkedin-in', 'color' => '#0077b5'],
                    'pinterest' => ['icon' => 'fab fa-pinterest', 'color' => '#bd081c'],
                    'telegram' => ['icon' => 'fab fa-telegram', 'color' => '#0088cc'],
                    'zomato' => ['icon' => 'fas fa-utensils', 'color' => '#e23744']
                ];
                
                foreach ($socialMedia as $platform => $data):
                    $url = $settings['social_' . $platform] ?? '#';
                    if ($url !== '#'):
                ?>
                    <a href="<?php echo htmlspecialchars($url); ?>" target="_blank" class="social-icon" style="background: <?php echo $data['color']; ?>">
                        <i class="<?php echo $data['icon']; ?>"></i>
                    </a>
                <?php 
                    endif;
                endforeach; 
                ?>
            </div>

            <!-- Theme Selector -->
            <div class="theme-selector">
                <h3>Change Theme</h3>
                <div class="theme-options">
                    <?php foreach ($themes as $themeId => $themeData): ?>
                        <button class="theme-btn <?php echo $currentTheme === $themeId ? 'active' : ''; ?>" 
                                onclick="changeTheme('<?php echo $themeId; ?>')"
                                style="background: <?php echo $themeData['background']; ?>; color: <?php echo $themeData['text']; ?>; font-family: <?php echo $themeData['font']; ?>">
                            <?php echo $themeData['name']; ?>
                        </button>
                    <?php endforeach; ?>
                </div>
            </div>
        </header>

        <!-- QR Code Section -->
        <section class="qr-section">
            <h3>Scan QR Code to go to Visiting Card</h3>
            <div class="qr-container">
                <div id="qrcode"></div>
            </div>
        </section>

        <!-- PDF Downloads -->
        <section class="pdf-section">
            <h3>Download Resources</h3>
            <div class="pdf-buttons">
                <?php foreach ($pdfs as $pdf): ?>
                    <button class="pdf-btn theme-animation" onclick="downloadPDF('<?php echo htmlspecialchars($pdf['file_url']); ?>')">
                        <i class="fas fa-download"></i>
                        <?php echo htmlspecialchars($pdf['title']); ?>
                    </button>
                <?php endforeach; ?>
            </div>
        </section>

        <!-- Products Section -->
        <section class="products-section">
            <h3>Our Products</h3>
            <div class="products-grid" id="productsGrid">
                <?php foreach ($products as $product): ?>
                    <div class="product-card theme-animation">
                        <div class="product-image-container">
                            <img src="<?php echo htmlspecialchars($product['image_url']); ?>" 
                                 alt="<?php echo htmlspecialchars($product['title']); ?>"
                                 class="product-image">
                            <?php if (count($product['gallery_images'] ?? []) > 0): ?>
                                <div class="product-gallery-indicator">
                                    <i class="fas fa-images"></i>
                                    <span><?php echo count($product['gallery_images']); ?></span>
                                </div>
                            <?php endif; ?>
                        </div>
                        <div class="product-info">
                            <h4 class="product-title"><?php echo htmlspecialchars($product['title']); ?></h4>
                            <p class="product-description"><?php echo htmlspecialchars($product['description']); ?></p>
                            <div class="product-price">
                                <?php if ($product['discount_price']): ?>
                                    <span class="original-price">₹<?php echo number_format($product['price']); ?></span>
                                    <span class="discount-price">₹<?php echo number_format($product['discount_price']); ?></span>
                                <?php else: ?>
                                    <span class="price">₹<?php echo number_format($product['price']); ?></span>
                                <?php endif; ?>
                                <button class="whatsapp-inquiry" onclick="inquireProduct('<?php echo htmlspecialchars($product['title']); ?>')">
                                    <i class="fab fa-whatsapp"></i>
                                </button>
                            </div>
                            <div class="product-actions">
                                <?php if (!$product['inquiry_only']): ?>
                                    <button class="add-to-cart-btn" onclick="addToCart(<?php echo $product['id']; ?>)">
                                        <i class="fas fa-shopping-cart"></i>
                                        ADD TO CART
                                    </button>
                                    <button class="inquiry-btn secondary" onclick="addToInquiry(<?php echo $product['id']; ?>)">
                                        <i class="fas fa-question-circle"></i>
                                        INQUIRE
                                    </button>
                                <?php else: ?>
                                    <button class="inquiry-btn" onclick="addToInquiry(<?php echo $product['id']; ?>)">
                                        <i class="fas fa-question-circle"></i>
                                        INQUIRE NOW
                                    </button>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </section>

        <!-- Gallery Section -->
        <section class="gallery-section">
            <h3>Photo Gallery</h3>
            <div class="gallery-grid">
                <?php foreach ($gallery as $image): ?>
                    <div class="gallery-item theme-animation" onclick="openLightbox('<?php echo htmlspecialchars($image['image_url']); ?>')">
                        <img src="<?php echo htmlspecialchars($image['thumbnail_url'] ?: $image['image_url']); ?>" 
                             alt="<?php echo htmlspecialchars($image['alt_text'] ?: $image['title']); ?>">
                    </div>
                <?php endforeach; ?>
            </div>
        </section>

        <!-- YouTube Videos -->
        <section class="videos-section">
            <h3>Video Gallery</h3>
            <div class="videos-grid">
                <?php foreach ($videos as $video): ?>
                    <div class="video-container theme-animation">
                        <iframe src="<?php echo htmlspecialchars($video['embed_code']); ?>" 
                                title="<?php echo htmlspecialchars($video['title']); ?>"
                                frameborder="0" 
                                allowfullscreen></iframe>
                    </div>
                <?php endforeach; ?>
            </div>
        </section>

        <!-- Reviews Section -->
        <section class="reviews-section">
            <h3>Customer Reviews</h3>
            <div class="reviews-grid">
                <?php foreach ($reviews as $review): ?>
                    <div class="review-card theme-animation">
                        <div class="review-header">
                            <div class="stars">
                                <?php for ($i = 1; $i <= 5; $i++): ?>
                                    <i class="fas fa-star <?php echo $i <= $review['rating'] ? 'active' : ''; ?>"></i>
                                <?php endfor; ?>
                            </div>
                            <span class="reviewer-name"><?php echo htmlspecialchars($review['name']); ?></span>
                        </div>
                        <p class="review-comment"><?php echo htmlspecialchars($review['comment']); ?></p>
                    </div>
                <?php endforeach; ?>
            </div>

            <!-- Add Review Form -->
            <div class="add-review-form">
                <h4>Add Your Review</h4>
                <form id="reviewForm" onsubmit="submitReview(event)">
                    <div class="rating-input">
                        <div class="stars-input" id="starsInput">
                            <?php for ($i = 1; $i <= 5; $i++): ?>
                                <i class="fas fa-star" data-rating="<?php echo $i; ?>" onclick="setRating(<?php echo $i; ?>)"></i>
                            <?php endfor; ?>
                        </div>
                    </div>
                    <input type="hidden" id="rating" name="rating" value="0">
                    <input type="text" name="name" placeholder="Your Name" required>
                    <input type="email" name="email" placeholder="Your Email" required>
                    <input type="tel" name="phone" placeholder="Your Phone">
                    <textarea name="comment" placeholder="Your Review" rows="4" required></textarea>
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </section>
    </div>

    <!-- Auto-scrolling Bottom Banner -->
    <div class="banner-container" id="bottomBanner">
        <div class="banner-slider">
            <?php foreach ($banners as $banner): ?>
                <div class="banner-slide">
                    <img src="<?php echo htmlspecialchars($banner['image_url']); ?>" 
                         alt="<?php echo htmlspecialchars($banner['title'] ?? 'Banner'); ?>"
                         onclick="<?php echo $banner['link_url'] ? "window.open('" . htmlspecialchars($banner['link_url']) . "', '_blank')" : ''; ?>">
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <a href="#" class="nav-item active">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </a>
        <a href="#" class="nav-item">
            <i class="fas fa-info-circle"></i>
            <span>About Us</span>
        </a>
        <a href="#" class="nav-item">
            <i class="fas fa-cogs"></i>
            <span>Services</span>
        </a>
        <a href="#" class="nav-item">
            <i class="fas fa-shopping-cart"></i>
            <span>Shop</span>
        </a>
        <a href="#" class="nav-item">
            <i class="fas fa-images"></i>
            <span>Gallery</span>
        </a>
        <a href="#" class="nav-item">
            <i class="fab fa-youtube"></i>
            <span>Videos</span>
        </a>
        <a href="#" class="nav-item">
            <i class="fas fa-credit-card"></i>
            <span>Payment</span>
        </a>
        <a href="#" class="nav-item">
            <i class="fas fa-star"></i>
            <span>Feedback</span>
        </a>
        <a href="#" class="nav-item">
            <i class="fas fa-phone"></i>
            <span>Contact</span>
        </a>
    </nav>

    <!-- Floating Cart Button -->
    <div class="floating-cart" id="floatingCart" onclick="toggleCart()">
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-count" id="cartCount">0</span>
    </div>

    <!-- Floating Inquiry Button -->
    <div class="floating-inquiry" id="floatingInquiry" onclick="toggleInquiry()">
        <i class="fas fa-question-circle"></i>
        <span class="inquiry-count" id="inquiryCount">0</span>
    </div>

    <!-- Cart Modal -->
    <div class="cart-modal" id="cartModal">
        <div class="cart-content">
            <div class="cart-header">
                <h3>Shopping Cart</h3>
                <button class="close-cart" onclick="toggleCart()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="cart-items" id="cartItems">
                <!-- Cart items will be populated by JavaScript -->
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total: ₹<span id="cartTotal">0</span></span>
                </div>
                <button class="checkout-btn" onclick="checkout()">PAY NOW via UPI</button>
            </div>
        </div>
    </div>

    <!-- Inquiry Modal -->
    <div class="inquiry-modal" id="inquiryModal">
        <div class="inquiry-content">
            <div class="inquiry-header">
                <h3>Product Inquiries</h3>
                <button class="close-inquiry" onclick="toggleInquiry()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="inquiry-items" id="inquiryItems">
                <!-- Inquiry items will be populated by JavaScript -->
            </div>
            <div class="inquiry-footer">
                <button class="send-inquiry-btn" onclick="sendInquiry()">Send Inquiry via WhatsApp</button>
            </div>
        </div>
    </div>

    <!-- UPI Payment Modal -->
    <div class="upi-modal" id="upiModal">
        <div class="upi-content">
            <div class="upi-header">
                <h3>UPI Payment</h3>
                <button class="close-upi" onclick="closeUPIModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="upi-body">
                <div class="upi-qr-container">
                    <div id="upiQRCode"></div>
                </div>
                <div class="upi-details">
                    <p><strong>UPI ID:</strong> <span id="upiId"><?php echo htmlspecialchars($settings['upi_id'] ?? 'demo@upi'); ?></span></p>
                    <p><strong>Amount:</strong> ₹<span id="upiAmount">0</span></p>
                    <p><strong>Merchant:</strong> <?php echo htmlspecialchars($settings['company_name'] ?? 'DEMO CARD'); ?></p>
                </div>
                <div class="upi-actions">
                    <button class="pay-now-btn" onclick="openUPIApp()">
                        <i class="fas fa-mobile-alt"></i>
                        Pay with UPI App
                    </button>
                    <button class="payment-done-btn" onclick="confirmPayment()">
                        <i class="fas fa-check"></i>
                        I have paid
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- User Auth Modals -->
    <div class="auth-modal" id="loginModal">
        <div class="auth-content">
            <div class="auth-header">
                <h3>Login</h3>
                <button class="close-auth" onclick="closeAuthModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="loginForm" onsubmit="userLogin(event)">
                <input type="text" name="username" placeholder="Username or Email" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="#" onclick="showRegisterForm()">Register here</a></p>
        </div>
    </div>

    <div class="auth-modal" id="registerModal">
        <div class="auth-content">
            <div class="auth-header">
                <h3>Register</h3>
                <button class="close-auth" onclick="closeAuthModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="registerForm" onsubmit="userRegister(event)">
                <input type="text" name="name" placeholder="Full Name" required>
                <input type="text" name="username" placeholder="Username" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="tel" name="phone" placeholder="Mobile Number" required>
                <input type="password" name="password" placeholder="Password" required>
                <input type="password" name="confirm_password" placeholder="Confirm Password" required>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="#" onclick="showLoginForm()">Login here</a></p>
        </div>
    </div>

    <!-- Free Website Form Modal -->
    <div class="free-website-modal" id="freeWebsiteModal">
        <div class="free-website-content">
            <div class="free-website-header">
                <h3>Get Your Business Website FREE</h3>
                <button class="close-free-website" onclick="closeFreeWebsiteForm()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="freeWebsiteForm" onsubmit="submitFreeWebsiteRequest(event)">
                <input type="text" name="name" placeholder="Your Name" required>
                <input type="tel" name="mobile" placeholder="Mobile Number" required>
                <input type="email" name="email" placeholder="Email Address">
                <textarea name="business_details" placeholder="Tell us about your business" rows="4"></textarea>
                <button type="submit">Submit Request</button>
            </form>
        </div>
    </div>

    <!-- User Dashboard Modal -->
    <div class="user-dashboard-modal" id="userDashboardModal">
        <div class="user-dashboard-content">
            <div class="user-dashboard-header">
                <h3>My Account</h3>
                <button class="close-user-dashboard" onclick="closeUserDashboard()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="user-dashboard-body">
                <div class="dashboard-tabs">
                    <button class="tab-btn active" onclick="showTab('profile')">Profile</button>
                    <button class="tab-btn" onclick="showTab('orders')">Orders</button>
                    <button class="tab-btn" onclick="showTab('inquiries')">Inquiries</button>
                </div>
                <div class="dashboard-content">
                    <div id="profileTab" class="tab-content active">
                        <!-- Profile content will be loaded here -->
                    </div>
                    <div id="ordersTab" class="tab-content">
                        <!-- Orders content will be loaded here -->
                    </div>
                    <div id="inquiriesTab" class="tab-content">
                        <!-- Inquiries content will be loaded here -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Lightbox for Gallery -->
    <div class="lightbox" id="lightbox" onclick="closeLightbox()">
        <img src="" alt="" id="lightboxImage">
        <button class="lightbox-close" onclick="closeLightbox()">
            <i class="fas fa-times"></i>
        </button>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2025 <?php echo htmlspecialchars($settings['company_name'] ?? 'DEMO CARD'); ?>. All rights reserved.</p>
        <p class="made-by">Made with ❤️ for digital business</p>
    </footer>

    <!-- JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.3/qrcode.min.js"></script>
    <script src="assets/js/main.js"></script>
    <script>
        // Initialize QR Code with current domain
        const qr = QRCode(document.getElementById("qrcode"), {
            text: "<?php echo $currentDomain; ?>",
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff"
        });

        // Initialize banner auto-scroll
        initializeBanners();
        
        // Initialize cart and inquiry from localStorage
        loadCart();
        loadInquiry();
        
        // Show discount popup after 3 seconds
        setTimeout(showDiscountPopup, 3000);
        
        // Show PWA install prompt after 5 seconds
        setTimeout(showPWAPrompt, 5000);
    </script>

    <!-- Google Analytics -->
    <?php if (!empty($settings['google_analytics'])): ?>
    <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo $settings['google_analytics']; ?>"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '<?php echo $settings['google_analytics']; ?>');
    </script>
    <?php endif; ?>

    <!-- Facebook Pixel -->
    <?php if (!empty($settings['facebook_pixel'])): ?>
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '<?php echo $settings['facebook_pixel']; ?>');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=<?php echo $settings['facebook_pixel']; ?>&ev=PageView&noscript=1"
    /></noscript>
    <?php endif; ?>
</body>
</html>