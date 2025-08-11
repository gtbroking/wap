-- Commercial Microsite Database Schema
-- Compatible with MySQL 5.7+ and Hostinger
-- Character Set: UTF8MB4 for multilingual support

-- Create database (uncomment if creating new database)
-- CREATE DATABASE microsite_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE microsite_db;

-- =====================================================
-- Admin Users Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL UNIQUE,
  `email` varchar(100) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','super_admin') DEFAULT 'admin',
  `last_login` timestamp NULL DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_username` (`username`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Products Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `qty_stock` int(11) DEFAULT 0,
  `image_url` varchar(500) DEFAULT NULL,
  `inquiry_only` tinyint(1) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Orders Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_number` varchar(50) NOT NULL UNIQUE,
  `user_name` varchar(100) DEFAULT NULL,
  `user_phone` varchar(20) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount_amount` decimal(10,2) DEFAULT 0.00,
  `final_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` enum('pending','confirmed','paid','shipped','delivered','cancelled') DEFAULT 'pending',
  `payment_method` varchar(50) DEFAULT 'upi',
  `upi_reference` varchar(100) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idx_order_number` (`order_number`),
  INDEX `idx_status` (`status`),
  INDEX `idx_phone` (`user_phone`),
  INDEX `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Order Items Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_title` varchar(200) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unit_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
  INDEX `idx_order_id` (`order_id`),
  INDEX `idx_product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Customer Reviews Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `rating` tinyint(1) NOT NULL CHECK (`rating` BETWEEN 1 AND 5),
  `comment` text DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `approved_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_rating` (`rating`),
  INDEX `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- YouTube Videos Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `videos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `youtube_url` varchar(500) NOT NULL,
  `embed_code` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Promotional Banners Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `image_url` varchar(500) NOT NULL,
  `link_url` varchar(500) DEFAULT NULL,
  `position` enum('top','bottom','both') DEFAULT 'top',
  `status` enum('active','inactive') DEFAULT 'active',
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_position` (`position`),
  INDEX `idx_status` (`status`),
  INDEX `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PDF Downloads Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `pdfs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `file_url` varchar(500) NOT NULL,
  `file_size` bigint(20) DEFAULT NULL,
  `download_count` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Photo Gallery Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `image_url` varchar(500) NOT NULL,
  `thumbnail_url` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `alt_text` varchar(200) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `sort_order` int(11) DEFAULT 0,
  `upload_date` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Site Settings Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) NOT NULL UNIQUE,
  `setting_value` longtext DEFAULT NULL,
  `setting_type` enum('text','number','boolean','json','url','email') DEFAULT 'text',
  `description` text DEFAULT NULL,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idx_setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Multi-language Translations Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `translations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(10) NOT NULL DEFAULT 'en',
  `translation_key` varchar(200) NOT NULL,
  `translation_value` text NOT NULL,
  `category` varchar(50) DEFAULT 'general',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idx_locale_key` (`locale`, `translation_key`),
  INDEX `idx_locale` (`locale`),
  INDEX `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Site Visits Tracking Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `visits` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `page` varchar(200) DEFAULT 'home',
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `referer` varchar(500) DEFAULT NULL,
  `visit_timestamp` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_page` (`page`),
  INDEX `idx_timestamp` (`visit_timestamp`),
  INDEX `idx_ip` (`ip_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- UPI Transactions Table
-- =====================================================
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_id` varchar(100) NOT NULL UNIQUE,
  `order_id` int(11) DEFAULT NULL,
  `upi_id` varchar(100) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` enum('pending','success','failed','cancelled') DEFAULT 'pending',
  `payment_method` varchar(50) DEFAULT 'upi',
  `reference_number` varchar(100) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idx_transaction_id` (`transaction_id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE SET NULL,
  INDEX `idx_status` (`status`),
  INDEX `idx_amount` (`amount`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- INSERT SAMPLE DATA
-- =====================================================

-- Sample Admin User (password: admin123)
INSERT INTO `admins` (`username`, `email`, `password_hash`, `role`, `status`) VALUES
('admin', 'admin@demo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin', 'active');

-- Sample Products
INSERT INTO `products` (`title`, `description`, `price`, `discount_price`, `qty_stock`, `image_url`, `status`, `sort_order`) VALUES
('Premium Business Card', 'High-quality business cards with premium finish and professional design', 500.00, 399.00, 100, 'https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&cs=tinysrgb&w=400', 'active', 1),
('Digital Visiting Card', 'Modern digital visiting card solution with QR code and social media integration', 299.00, NULL, 50, 'https://images.pexels.com/photos/6289025/pexels-photo-6289025.jpeg?auto=compress&cs=tinysrgb&w=400', 'active', 2),
('Corporate Branding Package', 'Complete corporate branding solution including logo, business cards, and letterhead', 2999.00, 1999.00, 25, 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400', 'active', 3),
('Logo Design Service', 'Professional logo design service with unlimited revisions', 1500.00, NULL, 10, 'https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?auto=compress&cs=tinysrgb&w=400', 'active', 4),
('Website Development', 'Complete website development service with responsive design', 15000.00, 12000.00, 5, 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400', 'active', 5);

-- Sample Reviews
INSERT INTO `reviews` (`name`, `email`, `phone`, `rating`, `comment`, `status`, `approved_at`) VALUES
('Rajesh Kumar', 'rajesh@example.com', '9876543210', 5, 'Excellent service and professional quality work. Highly recommended for business card printing!', 'approved', NOW()),
('Priya Singh', 'priya@example.com', '9876543211', 4, 'Great experience with their team. Very responsive and helpful. The digital visiting card is amazing.', 'approved', NOW()),
('Amit Sharma', 'amit@example.com', '9876543212', 5, 'Outstanding corporate branding package. Helped establish our business identity perfectly.', 'approved', NOW()),
('Sneha Patel', 'sneha@example.com', '9876543213', 4, 'Professional logo design service with quick delivery. Very satisfied with the results.', 'approved', NOW());

-- Sample YouTube Videos
INSERT INTO `videos` (`title`, `youtube_url`, `embed_code`, `description`, `status`, `sort_order`) VALUES
('Our Services Overview', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Overview of all our business services and solutions', 'active', 1),
('Client Testimonials', 'https://www.youtube.com/watch?v=jNQXAC9IVRw', 'https://www.youtube.com/embed/jNQXAC9IVRw', 'What our clients say about our services', 'active', 2),
('Behind the Scenes', 'https://www.youtube.com/watch?v=9bZkp7q19f0', 'https://www.youtube.com/embed/9bZkp7q19f0', 'Behind the scenes look at our design process', 'active', 3);

-- Sample Banners
INSERT INTO `banners` (`title`, `image_url`, `link_url`, `position`, `status`, `sort_order`) VALUES
('Professional Services', 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800', '#services', 'top', 'active', 1),
('Quality Design', 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800', '#portfolio', 'top', 'active', 2),
('Customer Satisfaction', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800', '#testimonials', 'top', 'active', 3);

-- Sample PDFs
INSERT INTO `pdfs` (`title`, `description`, `file_url`, `file_size`, `status`, `sort_order`) VALUES
('Company Brochure', 'Complete company brochure with all services and pricing', '/uploads/pdfs/brochure.pdf', 2048000, 'active', 1),
('Product Catalog', 'Detailed product catalog with specifications', '/uploads/pdfs/catalog.pdf', 3072000, 'active', 2),
('Price List 2025', 'Updated price list for all services', '/uploads/pdfs/pricelist.pdf', 1024000, 'active', 3),
('Company Profile', 'Professional company profile and portfolio', '/uploads/pdfs/profile.pdf', 4096000, 'active', 4),
('Portfolio Showcase', 'Showcase of our best work and projects', '/uploads/pdfs/portfolio.pdf', 5120000, 'active', 5);

-- Sample Gallery Images
INSERT INTO `gallery` (`title`, `image_url`, `thumbnail_url`, `description`, `alt_text`, `status`, `sort_order`) VALUES
('Business Card Design 1', 'https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&cs=tinysrgb&w=200', 'Premium business card design sample', 'Premium business card design', 'active', 1),
('Logo Design Sample', 'https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?auto=compress&cs=tinysrgb&w=200', 'Professional logo design example', 'Professional logo design', 'active', 2),
('Corporate Branding', 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=200', 'Corporate branding package example', 'Corporate branding package', 'active', 3),
('Digital Card Design', 'https://images.pexels.com/photos/6289025/pexels-photo-6289025.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://images.pexels.com/photos/6289025/pexels-photo-6289025.jpeg?auto=compress&cs=tinysrgb&w=200', 'Modern digital visiting card design', 'Digital visiting card design', 'active', 4);

-- Site Settings
INSERT INTO `site_settings` (`setting_key`, `setting_value`, `setting_type`, `description`) VALUES
('site_title', 'DEMO CARD', 'text', 'Main site title displayed in header'),
('company_name', 'DEMO CARD', 'text', 'Company name for business'),
('director_name', 'Vishal Rathod', 'text', 'Director or founder name'),
('director_title', 'FOUNDER', 'text', 'Director title or designation'),
('contact_phone1', '9765834383', 'text', 'Primary contact phone number'),
('contact_phone2', '9765834383', 'text', 'Secondary contact phone number'),
('contact_email', 'info@galaxytribes.in', 'email', 'Primary contact email address'),
('contact_address', 'Nashik', 'text', 'Business address or city'),
('whatsapp_number', '919765834383', 'text', 'WhatsApp number with country code'),
('website_url', 'https://galaxytribes.in', 'url', 'Company website URL'),
('upi_id', 'demo@upi', 'text', 'UPI ID for payments'),
('current_theme', 'blue-dark', 'text', 'Currently active theme'),
('logo_url', '', 'url', 'Company logo URL'),
('view_count', '1521', 'number', 'Total site view count'),
('meta_description', 'Professional digital visiting card and business services', 'text', 'SEO meta description'),
('meta_keywords', 'visiting card, business card, digital card, professional services', 'text', 'SEO meta keywords'),
('google_analytics', '', 'text', 'Google Analytics tracking ID'),
('facebook_pixel', '', 'text', 'Facebook Pixel ID'),
('enable_reviews', '1', 'boolean', 'Enable customer reviews system'),
('auto_approve_reviews', '0', 'boolean', 'Automatically approve reviews'),
('max_gallery_images', '20', 'number', 'Maximum gallery images allowed'),
('maintenance_mode', '0', 'boolean', 'Enable maintenance mode');

-- Sample Translations (English and Hindi)
INSERT INTO `translations` (`locale`, `translation_key`, `translation_value`, `category`) VALUES
('en', 'site.title', 'DEMO CARD', 'general'),
('en', 'contact.call', 'Call', 'contact'),
('en', 'contact.whatsapp', 'WhatsApp', 'contact'),
('en', 'contact.direction', 'Direction', 'contact'),
('en', 'contact.mail', 'Mail', 'contact'),
('en', 'contact.website', 'Website', 'contact'),
('en', 'action.share_whatsapp', 'Share on WhatsApp', 'actions'),
('en', 'action.save_contacts', 'Save to Contacts', 'actions'),
('en', 'action.share', 'Share', 'actions'),
('en', 'action.save_pdf', 'Save PDF', 'actions'),
('en', 'shop.add_to_cart', 'ADD TO CART', 'shop'),
('en', 'shop.pay_now', 'PAY NOW via UPI', 'shop'),
('en', 'reviews.add_review', 'Add Your Review', 'reviews'),
('en', 'reviews.submit_review', 'Submit Review', 'reviews'),
('hi', 'site.title', 'डेमो कार्ड', 'general'),
('hi', 'contact.call', 'कॉल करें', 'contact'),
('hi', 'contact.whatsapp', 'व्हाट्सऐप', 'contact'),
('hi', 'contact.direction', 'दिशा', 'contact'),
('hi', 'contact.mail', 'मेल', 'contact'),
('hi', 'contact.website', 'वेबसाइट', 'contact'),
('hi', 'action.share_whatsapp', 'व्हाट्सऐप पर साझा करें', 'actions'),
('hi', 'action.save_contacts', 'संपर्क में सेव करें', 'actions'),
('hi', 'action.share', 'साझा करें', 'actions'),
('hi', 'action.save_pdf', 'पीडीएफ सेव करें', 'actions'),
('hi', 'shop.add_to_cart', 'कार्ट में जोड़ें', 'shop'),
('hi', 'shop.pay_now', 'UPI से अभी भुगतान करें', 'shop'),
('hi', 'reviews.add_review', 'अपनी समीक्षा जोड़ें', 'reviews'),
('hi', 'reviews.submit_review', 'समीक्षा सबमिट करें', 'reviews');

-- Sample Visit Tracking
INSERT INTO `visits` (`page`, `ip_address`, `visit_timestamp`) VALUES
('home', '192.168.1.1', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('home', '192.168.1.2', DATE_SUB(NOW(), INTERVAL 2 DAY)),
('home', '192.168.1.3', DATE_SUB(NOW(), INTERVAL 3 DAY)),
('shop', '192.168.1.1', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('gallery', '192.168.1.2', DATE_SUB(NOW(), INTERVAL 1 DAY));

-- Sample Orders (for demonstration)
INSERT INTO `orders` (`order_number`, `user_name`, `user_phone`, `user_email`, `total_amount`, `final_amount`, `status`, `upi_reference`) VALUES
('ORD001', 'Test Customer', '9876543210', 'test@example.com', 399.00, 399.00, 'paid', 'UPI123456789'),
('ORD002', 'Sample User', '9876543211', 'sample@example.com', 1999.00, 1999.00, 'pending', NULL);

-- Sample Order Items
INSERT INTO `order_items` (`order_id`, `product_id`, `product_title`, `quantity`, `unit_price`, `total_price`) VALUES
(1, 1, 'Premium Business Card', 1, 399.00, 399.00),
(2, 3, 'Corporate Branding Package', 1, 1999.00, 1999.00);

-- Sample Transactions
INSERT INTO `transactions` (`transaction_id`, `order_id`, `upi_id`, `amount`, `status`, `reference_number`) VALUES
('TXN001', 1, 'demo@upi', 399.00, 'success', 'UPI123456789'),
('TXN002', 2, 'demo@upi', 1999.00, 'pending', NULL);

-- =====================================================
-- CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Additional performance indexes
CREATE INDEX idx_products_price ON products(price, discount_price);
CREATE INDEX idx_orders_amount ON orders(final_amount, created_at);
CREATE INDEX idx_reviews_rating ON reviews(rating, status);
CREATE INDEX idx_visits_page_date ON visits(page, visit_timestamp);
CREATE INDEX idx_transactions_amount_status ON transactions(amount, status);

-- =====================================================
-- FINAL SETUP NOTES
-- =====================================================

/*
SETUP INSTRUCTIONS:

1. Create database: microsite_db
2. Import this SQL file
3. Update .env file with database credentials
4. Set file permissions for uploads directory
5. Test admin login: admin / admin123
6. Configure UPI ID in site settings
7. Update site settings with your business information

SECURITY NOTES:
- Change default admin password immediately
- Update UPI ID with your actual payment ID  
- Set proper file permissions (uploads: 777, others: 755)
- Enable SSL certificate for production
- Regular database backups recommended

CUSTOMIZATION:
- Update site_settings table for business info
- Add your products in products table
- Upload your banners and gallery images
- Configure YouTube videos in videos table
- Set up translations for multiple languages

HOSTING COMPATIBILITY:
- MySQL 5.7+ (Hostinger compatible)
- PHP 7.4+ recommended  
- UTF8MB4 character set for multilingual support
- Supports up to 20 gallery images
- File upload limit: 5MB per PDF

For support: Check README.md file
*/