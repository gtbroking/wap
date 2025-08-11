-- Additional tables for enhanced functionality
-- Run this SQL after the main database setup

-- Users table for customer registration
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL UNIQUE,
  `email` varchar(100) NOT NULL UNIQUE,
  `phone` varchar(20) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_username` (`username`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Product inquiries table
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) DEFAULT NULL,
  `user_phone` varchar(20) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `products` json DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` enum('pending','contacted','completed') DEFAULT 'pending',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_phone` (`user_phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Free website requests table
CREATE TABLE IF NOT EXISTS `free_website_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `business_details` text DEFAULT NULL,
  `status` enum('pending','contacted','completed') DEFAULT 'pending',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_mobile` (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin bypass tokens table
CREATE TABLE IF NOT EXISTS `admin_bypass_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) NOT NULL,
  `token` varchar(64) NOT NULL UNIQUE,
  `expires_at` timestamp NOT NULL,
  `used` tinyint(1) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`admin_id`) REFERENCES `admins`(`id`) ON DELETE CASCADE,
  INDEX `idx_token` (`token`),
  INDEX `idx_expires` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add user_id to orders table
ALTER TABLE `orders` ADD COLUMN `user_id` int(11) DEFAULT NULL AFTER `id`;
ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL;

-- Add gallery images to products
ALTER TABLE `products` ADD COLUMN `gallery_images` json DEFAULT NULL AFTER `image_url`;

-- Sample user data
INSERT INTO `users` (`name`, `username`, `email`, `phone`, `password_hash`, `status`) VALUES
('John Doe', 'johndoe', 'john@example.com', '9876543210', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'active'),
('Jane Smith', 'janesmith', 'jane@example.com', '9876543211', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'active');

-- Sample inquiries
INSERT INTO `inquiries` (`user_name`, `user_phone`, `user_email`, `products`, `message`, `status`) VALUES
('Test Customer', '9876543210', 'test@example.com', '[{"id": 1, "title": "Premium Business Card"}]', 'Interested in bulk order', 'pending'),
('Sample User', '9876543211', 'sample@example.com', '[{"id": 2, "title": "Digital Visiting Card"}]', 'Need customization details', 'contacted');

-- Sample free website requests
INSERT INTO `free_website_requests` (`name`, `mobile`, `email`, `business_details`, `status`) VALUES
('Business Owner', '9876543212', 'owner@business.com', 'Restaurant business looking for online presence', 'pending'),
('Startup Founder', '9876543213', 'founder@startup.com', 'Tech startup needing professional website', 'contacted');

-- Update site settings with new features
INSERT INTO `site_settings` (`setting_key`, `setting_value`, `setting_type`, `description`) VALUES
('discount_text', 'DISCOUNT UPTO 50% Live Use FREE code', 'text', 'Discount popup text'),
('show_discount_popup', '1', 'boolean', 'Show discount popup'),
('show_pwa_prompt', '1', 'boolean', 'Show PWA install prompt'),
('enable_user_registration', '1', 'boolean', 'Enable user registration'),
('custom_background', '', 'text', 'Custom background CSS'),
('social_facebook', 'https://facebook.com/democard', 'url', 'Facebook page URL'),
('social_youtube', 'https://youtube.com/democard', 'url', 'YouTube channel URL'),
('social_twitter', 'https://twitter.com/democard', 'url', 'Twitter profile URL'),
('social_instagram', 'https://instagram.com/democard', 'url', 'Instagram profile URL'),
('social_linkedin', 'https://linkedin.com/company/democard', 'url', 'LinkedIn page URL'),
('social_pinterest', 'https://pinterest.com/democard', 'url', 'Pinterest profile URL'),
('social_telegram', 'https://t.me/democard', 'url', 'Telegram channel URL'),
('social_zomato', 'https://zomato.com/democard', 'url', 'Zomato page URL')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);