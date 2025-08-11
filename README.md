# Complete PHP Commercial Mini-Store / Visiting Card Microsite

A complete professional visiting card and e-commerce microsite solution built with HTML5, PHP, CSS, and MySQL. Features a comprehensive admin panel, 15 professional themes, user registration system, inquiry management, UPI payment integration, and all business functionality ready for deployment to Hostinger or any PHP hosting provider.

## 🌟 Features

### 🎨 Frontend Features
- **Professional Design**: 15 stunning theme variations with smooth animations and custom fonts
- **Digital Visiting Card**: Complete business card with contact details and QR code
- **E-commerce Shop**: Full product catalog with shopping cart and UPI payment integration
- **Inquiry System**: Product inquiry cart with WhatsApp integration
- **Auto-scrolling Banners**: Top and bottom promotional banners (auto-scroll every 2 seconds)
- **PWA Support**: Add to home screen functionality with offline support
- **Discount Popup**: Customizable discount popup with admin control
- **User Registration**: Customer registration and login system
- **Order History**: Users can track their orders and payment status
- **YouTube Gallery**: Responsive embedded video content
- **Rating System**: Customer reviews with admin approval workflow
- **Photo Gallery**: Up to 20 images with lightbox view
- **Mobile-First Design**: Fully responsive with bottom navigation
- **Social Integration**: WhatsApp sharing, social media links
- **Contact Features**: VCF download, PDF resources, share functionality
- **Multi-language Support**: Admin-managed translations
- **SEO Optimized**: Meta tags, structured data, clean URLs
- **Free Website Offer**: Lead generation form for business website requests

### 🛠️ Admin Panel Features
- **Comprehensive Dashboard**: Revenue tracking, order analytics, real-time stats
- **Product Management**: Full CRUD operations with image uploads
- **User Management**: Complete user profile management and password reset
- **Order Management**: View, update status, export orders (CSV/TXT)
- **Inquiry Management**: Handle product inquiries and customer communications
- **Content Management**: Banners, videos, PDFs, gallery images
- **Theme Management**: Switch between 15 professional themes with custom background options
- **Review Management**: Approve/reject customer feedback
- **Gallery Management**: Upload and manage up to 20 photos
- **Settings Management**: Site configuration, contact details, SEO settings
- **UPI Management**: Configure UPI ID and payment settings
- **Social Media**: Manage all social media links
- **Analytics**: Revenue charts, visitor tracking, performance metrics
- **Backup System**: Database backup and restore functionality
- **Bypass Login**: Secure bypass login link generation
- **Mobile Admin**: Responsive admin panel for mobile management
- **Free Website Requests**: Manage business website inquiries

## 🚀 Quick Start

### Requirements
- PHP 7.4+ (Hostinger compatible)
- MySQL 5.7+
- Web server (Apache/Nginx)
- Modern web browser for admin panel

### Installation Steps

#### Step 1: Upload Files
   ```bash
   # Upload all files to your hosting directory (public_html/)
   # Ensure PHP 7.4+ and MySQL are available
   ```

#### Step 2: Database Setup
   - Create a MySQL database
   - Import the main SQL file:
   ```sql
   -- Create database (replace with your database name)
   CREATE DATABASE microsite_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   
   -- Import the SQL file
   mysql -u username -p microsite_db < supabase/migrations/20250811064438_small_fountain.sql
   
   -- Import additional features
   mysql -u username -p microsite_db < database-update.sql
   ```

#### Step 3: Configuration
   - Copy `.env.example` to `.env`
   - Update database credentials:
   ```env
   DB_HOST=localhost
   DB_NAME=microsite_db
   DB_USER=your_username
   DB_PASS=your_password
   UPI_ID=your-upi-id@bank
   ADMIN_SECRET=your-secure-secret
   ```

#### Step 4: File Permissions
   ```bash
   chmod 755 admin/
   chmod 777 uploads/
   chmod 777 assets/
   ```

#### Step 5: Access Your Site
   - **Main Website**: `https://yourdomain.com/`
   - **Admin Panel**: `https://yourdomain.com/admin/`
   - **Default Admin Login**: `admin` / `admin123`
   - **Sample User Login**: `johndoe` / `password` or `janesmith` / `password`
   - **Bypass Login**: Generate from admin panel

## 📁 Project Structure

```
php-microsite/
├── index.php                     # Main website
├── assets/
│   ├── css/
│   │   ├── style.css            # Main styles
│   │   ├── responsive.css       # Mobile responsive
│   │   ├── animations.css       # Theme animations
│   │   └── admin.css            # Admin panel styles
│   └── js/
│       └── main.js              # Frontend JavaScript
├── includes/
│   ├── config.php               # Database configuration
│   └── functions.php            # Core functions
├── admin/
│   ├── index.php                # Admin login
│   ├── dashboard.php            # Admin dashboard
│   ├── products.php             # Product management
│   ├── orders.php               # Order management
│   ├── users.php                # User management
│   ├── inquiries.php            # Inquiry management
│   ├── reviews.php              # Review management
│   ├── gallery.php              # Gallery management
│   ├── settings.php             # Site settings
│   ├── bypass-login.php         # Bypass login handler
│   ├── generate-bypass.php      # Bypass link generator
│   └── includes/
│       ├── header.php           # Admin header
│       └── sidebar.php          # Admin sidebar
├── api/
│   ├── get-product.php          # Product API
│   ├── submit-review.php        # Review submission
│   ├── create-order.php         # Order creation
│   ├── create-inquiry.php       # Inquiry creation
│   ├── user-auth.php            # User authentication
│   ├── free-website-request.php # Free website requests
│   ├── generate-vcf.php         # VCF contact file
│   └── change-theme.php         # Theme switching
├── supabase/migrations/
│   └── 20250811064438_small_fountain.sql  # Complete database
├── database-update.sql          # Additional features database
├── uploads/                     # File uploads directory
├── manifest.json                # PWA manifest
├── .env.example                 # Environment configuration
└── README.md
```

## 🎨 Enhanced Theme System (15 Themes)

The microsite includes 15 carefully designed professional themes:

1. **Professional Blue**: Corporate blue with gradient background - perfect for business
2. **Vibrant Gradient**: Colorful gradient theme - eye-catching and modern
3. **Modern Teal**: Teal and orange combination - fresh and professional
4. **Clean Light**: Light theme with subtle gradients - minimal and elegant
5. **Dark Purple**: Elegant purple theme with golden accents
6. **Emerald Gold**: Luxury emerald and gold combination
7. **Rose Pink**: Romantic rose pink with purple accents
8. **Ocean Blue**: Deep ocean blue with wave animations
9. **Sunset Orange**: Warm sunset colors with flicker effects
10. **Forest Green**: Natural forest green with growth animations
11. **Royal Purple**: Majestic purple with sparkle effects
12. **Midnight Blue**: Deep midnight blue with twinkling stars
13. **Coral Reef**: Vibrant coral with sway animations
14. **Golden Hour**: Warm golden tones with shimmer effects
15. **Arctic Frost**: Cool arctic colors with frost effects

**Features**:
- Instant theme switching from admin panel
- Custom fonts for each theme (15 different font families)
- Unique animations for each theme
- Consistent design across all themes
- Mobile-optimized color schemes
- Automatic contrast adjustment
- Custom background support (RGB colors or image upload)
- Theme-specific animations and effects

## 💳 Payment Integration

### UPI Payment Setup
1. Configure your UPI ID in admin settings
2. QR codes are auto-generated for payments
3. UPI app integration for direct payments
4. Manual payment confirmation system
4. Order tracking with payment status
5. Real-time UPI QR code generation

### Payment Flow
1. Customer adds products to cart
2. Clicks "PAY NOW via UPI"
3. UPI modal opens with QR code and payment details
4. Customer can scan QR or open UPI app directly
5. Customer confirms payment
6. Order saved with user registration prompt
7. Admin receives order notification
8. Admin confirms payment and updates status

## 🛠️ Admin Panel Guide

### Login Access
- **Standard Login**: `/admin/` with username/password
- **Default Credentials**: `admin` / `admin123` (change immediately)
- **Bypass Login**: Generate secure bypass links from admin panel

### Key Admin Functions

#### Dashboard
- Daily/monthly revenue charts
- Order statistics
- Pending payment notifications
- Quick action buttons
- Interactive revenue charts

#### User Management
- View all registered users
- Edit user profiles and contact information
- Reset user passwords
- Activate/deactivate user accounts
- View user order history

#### Product Management
- Add/edit products with images
- Product gallery management (multiple images)
- Set pricing and discounts
- Manage stock levels
- Inquiry-only products
- Product categorization

#### Order Management
- View all orders with filters
- Update payment status
- Export orders to CSV/TXT
- Customer communication
- Order timeline tracking

#### Inquiry Management
- View product inquiries
- Update inquiry status (pending/contacted/completed)
- Customer contact information
- Inquiry response tracking

#### Content Management
- Upload banners (auto-rotating)
- Banner position management (top/bottom/both)
- Manage YouTube videos
- Handle PDF downloads (5 slots)
- Photo gallery (20 images max)
- Social media link management

#### Settings
- Complete site configuration
- UPI payment details
- SEO meta tags
- Theme selection (15 themes)
- Custom background options
- Discount popup management
- PWA settings
- Multi-language content
- Free website offer settings

#### Security Features
- Bypass login link generation
- Session management
- Password reset functionality
- Admin activity logging

## 🗄️ Enhanced Database Schema

The database includes 16 comprehensive tables:

### 🔧 Core Tables
- **`admins`** - Admin user accounts with role management
- **`users`** - Customer accounts with registration system
- **`products`** - Complete product catalog with pricing
- **`orders`** - Customer orders with status tracking
- **`order_items`** - Detailed order line items
- **`inquiries`** - Product inquiries with status management
- **`reviews`** - Customer reviews with approval system
- **`videos`** - YouTube video management
- **`banners`** - Auto-scrolling promotional banners
- **`pdfs`** - 5 downloadable PDF resources
- **`site_settings`** - Complete site configuration
- **`translations`** - Multi-language support
- **`gallery`** - Photo gallery (up to 20 images)
- **`visits`** - Visitor tracking and analytics
- **`transactions`** - UPI payment records
- **`free_website_requests`** - Business website inquiries
- **`admin_bypass_tokens`** - Secure bypass login tokens

### 📊 Sample Data Included
- **Admin Account**: `admin` / `admin123`
- **Sample Users**: `johndoe` / `password`, `janesmith` / `password`
- 5 sample products with images
- 4 customer reviews
- 2 product inquiries
- 2 free website requests
- 3 YouTube videos
- 3 promotional banners
- 5 PDF download buttons
- 4 gallery images
- Complete site settings
- Multi-language translations (English/Hindi)
- Social media configurations
- 15 theme configurations

## 📱 Mobile Features

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized images
- Fast loading
- PWA support
- Add to home screen

### Mobile Admin Panel
- Fully responsive admin interface
- Touch-optimized controls
- Responsive tables
- Mobile file uploads
- Swipe gestures support

## 🔒 Security Features

### Data Protection
- Secure password hashing (PHP password_hash)
- SQL injection prevention
- File upload validation
- XSS prevention
- Input sanitization
- Rate limiting for reviews
- CSRF protection
- Session security

### Admin Security
- Session management
- Secure authentication
- Bypass login tokens (1-hour expiry)
- Role-based access
- Login attempt monitoring
- Activity logging

## 🌐 SEO & Performance

### SEO Features
- Complete meta tags management
- Open Graph tags
- Twitter Card tags
- Clean URLs
- Mobile optimization
- Fast loading times
- Sitemap ready
- Structured data

### Performance
- Optimized images
- Efficient CSS/JS
- Database indexing
- Lazy loading support
- PWA optimization
- Caching strategies

## 🚀 Deployment to Hostinger

### Step-by-Step Deployment

#### 1. **Prepare Hostinger Account**
   - Sign up at [Hostinger](https://hostinger.com)
   - Choose hosting plan with PHP 7.4+ and MySQL
   - Access your hosting control panel

#### 2. **Upload Files**
   ```bash
   # Using Hostinger File Manager or FTP
   # Upload all project files to public_html/
   # Maintain the directory structure
   ```

#### 3. **Database Setup**
   - Go to Hostinger Control Panel → Databases
   - Create new MySQL database
   - Create database user with full privileges
   - Note down: database name, username, password, host

#### 4. **Import Database**
   - Access phpMyAdmin from Hostinger panel
   - Select your database
   - Import `supabase/migrations/20250811064438_small_fountain.sql`
   - Import `database-update.sql` for additional features
   - Verify all tables are created with sample data

#### 5. **Configure Environment**
   - Rename `.env.example` to `.env`
   - Update database credentials:
   ```env
   DB_HOST=localhost
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASS=your_database_password
   UPI_ID=your-upi-id@bank
   SITE_URL=https://yourdomain.com
   ```

#### 6. **Set File Permissions**
   ```bash
   # Using Hostinger File Manager
   uploads/ → 755 or 777
   assets/ → 755
   admin/ → 755
   api/ → 755
   ```

#### 7. **Test Everything**
   - Visit `https://yourdomain.com/` (main site)
   - Visit `https://yourdomain.com/admin/` (admin panel)
   - Login with: `admin` / `admin123`
   - Test all features: products, cart, inquiries, reviews, themes, user registration
   - Change admin password immediately
   - Generate bypass login link
   - Test UPI payment flow
   - Test PWA installation

### Domain Setup
```
https://yourdomain.com/              # Main website
https://yourdomain.com/admin/        # Admin panel
https://yourdomain.com/api/          # API endpoints
https://yourdomain.com/admin/bypass-login.php?token=xxx  # Bypass login
```

## 🛠️ Customization Guide

### 🎨 Adding New Themes
1. Edit `index.php` themes array (currently 15 themes)
2. Add CSS variables in `assets/css/style.css`
3. Add animations in `assets/css/animations.css`
3. Update theme selector in admin panel
4. Test across all devices
5. Add custom fonts if needed

### 🔧 Adding New Features
1. **Frontend**: Modify `index.php` and CSS files
2. **Backend**: Add new admin pages in `/admin/`
3. **Database**: Update schema and functions
4. **API**: Add new endpoints in `/api/`
5. **PWA**: Update manifest.json if needed

### 🌍 Language Support
1. Add translations in admin panel
2. Update `translations` table in database
3. Modify frontend to use translation keys
4. Test with different languages

### 📱 Mobile Customization
1. Edit `assets/css/responsive.css`
2. Test on various screen sizes
3. Optimize touch interactions
4. Ensure admin panel mobile compatibility
5. Test PWA functionality

## 📞 Support & Troubleshooting

### Common Issues

#### 🔌 Database Connection Issues
```php
// Error: "Database connection failed"
// Solution:
1. Verify database credentials in .env
2. Check if database exists
3. Ensure MySQL service is running
4. Test connection with phpMyAdmin
5. Import both SQL files (main + update)
```

#### 📁 File Upload Issues
```bash
# Error: "Failed to upload file"
# Solution:
1. Set correct permissions: chmod 755 uploads/
2. Check PHP settings:
upload_max_filesize = 10M
post_max_size = 10M
max_execution_time = 300
```

#### 💳 Payment Issues
```bash
# Error: UPI payment not working
# Solution:
1. Verify UPI ID format (user@bank)
2. Test UPI links manually
3. Check WhatsApp integration
4. Ensure QR code generation works
5. Test on mobile devices
```

#### 🎨 Theme Issues
```bash
# Error: Theme not changing
# Solution:
1. Clear browser cache
2. Check database site_settings table
3. Verify CSS file permissions
4. Test in incognito mode
5. Check all 15 themes
```

#### 👥 User Registration Issues
```bash
# Error: User registration not working
# Solution:
1. Check database-update.sql is imported
2. Verify users table exists
3. Check API endpoints are accessible
4. Test with different browsers
```

### Getting Help
1. **Check Error Logs**: Hostinger Control Panel → Error Logs
2. **PHP Version**: Ensure PHP 7.4+ is active
3. **Database Issues**: Use phpMyAdmin to verify data
4. **File Permissions**: Use File Manager to check permissions
5. **PWA Issues**: Check manifest.json and HTTPS
5. **Contact Support**: Include error messages and steps to reproduce

## 📋 Testing Checklist

### Before Going Live
- [ ] **Themes**: Test all 15 themes on mobile and desktop
- [ ] **Products**: Add/edit/delete products successfully
- [ ] **Shopping Cart**: Add to cart, update quantities, checkout
- [ ] **Inquiry Cart**: Add to inquiry, send via WhatsApp
- [ ] **UPI Payment**: Test UPI links and QR code generation
- [ ] **User Registration**: Test signup and login process
- [ ] **User Dashboard**: Test order history and profile management
- [ ] **Admin Panel**: All admin functions working
- [ ] **User Management**: Admin can edit user profiles
- [ ] **Inquiry Management**: Admin can handle inquiries
- [ ] **Reviews**: Submit and approve review workflow
- [ ] **Gallery**: Upload and display images correctly
- [ ] **Videos**: YouTube videos embedding properly
- [ ] **Banners**: Auto-scrolling banners working
- [ ] **Discount Popup**: Popup appears and can be closed
- [ ] **PWA**: Add to home screen functionality
- [ ] **Free Website Form**: Lead generation form working
- [ ] **Contact**: VCF download, WhatsApp sharing
- [ ] **Social Media**: All social links working
- [ ] **SEO**: Meta tags, Open Graph tags
- [ ] **Mobile**: Responsive design on all devices
- [ ] **Performance**: Fast loading times
- [ ] **Security**: Change default admin password
- [ ] **Bypass Login**: Generate and test bypass links

### 🧪 Sample Test Data Included
- **Admin Login**: `admin` / `admin123`
- **Sample Users**: `johndoe` / `password`, `janesmith` / `password`
- **Products**: 5 sample products with images
- **Reviews**: 4 approved customer reviews
- **Inquiries**: 2 sample product inquiries
- **Free Website Requests**: 2 sample requests
- **Videos**: 3 YouTube video embeds
- **Banners**: 3 promotional banners
- **Gallery**: 4 sample gallery images
- **PDFs**: 5 downloadable PDF buttons
- **Social Media**: Sample social media links
- **UPI ID**: `demo@upi` (change to your actual UPI ID)
- **15 Themes**: All themes configured and ready

## 🎯 Production Optimization

### Performance Tips
1. **Enable GZIP**: Add to .htaccess for compression
2. **Optimize Images**: Compress images before upload
3. **Database**: Regular cleanup of old data
4. **Caching**: Enable browser caching
5. **CDN**: Use CDN for static assets if needed
6. **PWA**: Enable service worker for offline support

### Security Hardening
1. **SSL Certificate**: Install SSL (free with Hostinger)
2. **Strong Passwords**: Change default admin password
3. **Bypass Links**: Use bypass login sparingly
3. **Regular Backups**: Use admin backup feature
4. **File Permissions**: Set correct permissions
5. **Updates**: Keep PHP and MySQL updated
6. **Monitor**: Check access logs regularly
7. **User Data**: Protect customer information

## 📈 Analytics & Tracking

### Built-in Analytics
- **Visit Counter**: Real-time visitor tracking
- **Revenue Charts**: Daily/monthly revenue graphs
- **Order Analytics**: Order status and trends
- **User Analytics**: Registration and login tracking
- **Inquiry Analytics**: Product inquiry trends
- **Customer Reviews**: Rating analytics
- **Product Performance**: Best-selling products
- **Theme Usage**: Popular theme analytics

### External Integration
- **Google Analytics**: Add tracking ID in settings
- **Facebook Pixel**: Add pixel ID for ads
- **WhatsApp Business**: Integrate business API
- **Email Marketing**: Connect with email services
- **PWA Analytics**: Track app installations

---

## 🏆 What You Get

### ✅ Complete Business Solution
- **Professional Website**: 15 stunning themes, mobile-optimized
- **E-commerce Platform**: Full shopping cart with UPI payments
- **Inquiry System**: Product inquiry management with WhatsApp
- **User System**: Customer registration and order tracking
- **Admin Panel**: Complete content management system
- **PWA Support**: Add to home screen, offline functionality
- **SEO Optimized**: Ready for Google search ranking
- **Mobile Ready**: Perfect on all devices
- **Social Integration**: WhatsApp, social media sharing
- **Analytics Dashboard**: Track visitors, orders, revenue
- **Multi-language**: Support for global audience
- **Gallery System**: Showcase your work (20 images)
- **Review System**: Build customer trust
- **PDF Downloads**: Share brochures, catalogs
- **Auto Banners**: Promotional slideshow
- **YouTube Integration**: Video marketing
- **Lead Generation**: Free website offer form
- **Security Features**: Bypass login, secure authentication

### 🚀 Ready for Hostinger
- **One-Click Deploy**: Upload and run
- **Database Included**: Complete with sample data
- **Documentation**: Step-by-step setup guide
- **Support Ready**: Troubleshooting guide included
- **Production Ready**: Secure, optimized, tested
- **PWA Ready**: Installable web app

### 💰 Business Benefits
- **Increase Sales**: Professional online presence
- **Lead Generation**: Capture business website inquiries
- **Customer Management**: User registration and tracking
- **Save Time**: Admin panel manages everything
- **Mobile Customers**: Reach mobile users effectively
- **SEO Traffic**: Get found on Google
- **Customer Trust**: Reviews and professional design
- **Easy Updates**: Change content without coding
- **Cost Effective**: No monthly fees, own your site
- **Scalable**: Grows with your business

---

## 🎉 Get Started Today!

1. **Download** all the files
2. **Upload** to your Hostinger account
3. **Import** both database files
4. **Configure** your settings
5. **Launch** your professional website!
6. **Generate** bypass login for easy access
7. **Test** all 15 themes and features
8. **Customize** for your business needs

**Your complete digital business solution is ready in minutes!**

### 🔐 Login Credentials
- **Admin**: `admin` / `admin123`
- **Sample Users**: `johndoe` / `password`, `janesmith` / `password`
- **Bypass Login**: Generate from admin panel

### 🎨 Theme Options
Choose from 15 professional themes with unique animations and fonts:
1. Professional Blue, 2. Vibrant Gradient, 3. Modern Teal, 4. Clean Light
5. Dark Purple, 6. Emerald Gold, 7. Rose Pink, 8. Ocean Blue
9. Sunset Orange, 10. Forest Green, 11. Royal Purple, 12. Midnight Blue
13. Coral Reef, 14. Golden Hour, 15. Arctic Frost

---

**Made with ❤️ for Digital Business Success**

*Transform your business with this professional, feature-complete microsite solution with 15 themes, user management, PWA support, and comprehensive admin panel!*