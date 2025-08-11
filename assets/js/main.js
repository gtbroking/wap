// Global Variables
let cart = [];
let inquiry = [];
let currentBannerIndex = 0;
let bannerInterval;
let currentRating = 0;
let deferredPrompt;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeBanners();
    loadCart();
    loadInquiry();
    updateCartDisplay();
    updateInquiryDisplay();
    
    // Show discount popup after 3 seconds
    setTimeout(showDiscountPopup, 3000);
    
    // Show PWA install prompt
    initializePWA();
});

// PWA Functions
function initializePWA() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        setTimeout(showPWAPrompt, 5000);
    });
}

function showPWAPrompt() {
    const pwaPrompt = document.getElementById('pwaInstallPrompt');
    if (pwaPrompt) {
        pwaPrompt.style.display = 'block';
    }
}

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
            closePWAPrompt();
        });
    }
}

function closePWAPrompt() {
    const pwaPrompt = document.getElementById('pwaInstallPrompt');
    if (pwaPrompt) {
        pwaPrompt.style.display = 'none';
    }
}

// Discount Popup Functions
function showDiscountPopup() {
    const popup = document.getElementById('discountPopup');
    if (popup && !localStorage.getItem('discountPopupClosed')) {
        popup.style.display = 'block';
    }
}

function closeDiscountPopup() {
    const popup = document.getElementById('discountPopup');
    if (popup) {
        popup.style.display = 'none';
        localStorage.setItem('discountPopupClosed', 'true');
    }
}

// Banner Auto-scroll Functions
function initializeBanners() {
    const topBanner = document.getElementById('topBanner');
    const bottomBanner = document.getElementById('bottomBanner');
    
    if (topBanner) {
        startBannerAutoScroll(topBanner);
    }
    
    if (bottomBanner) {
        startBannerAutoScroll(bottomBanner);
    }
}

function startBannerAutoScroll(bannerContainer) {
    const slider = bannerContainer.querySelector('.banner-slider');
    const slides = bannerContainer.querySelectorAll('.banner-slide');
    
    if (slides.length <= 1) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 2000);
}

// WhatsApp Functions
function openWhatsApp(number, message = '') {
    const defaultMessage = message || 'Hello! I found your visiting card and would like to connect.';
    const url = `https://wa.me/${number}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
}

function shareOnWhatsApp() {
    const countryCode = document.getElementById('countryCode').value.replace('+', '');
    const message = `Check out this amazing visiting card: ${window.location.href}`;
    const url = `https://wa.me/${countryCode}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function inquireProduct(productName) {
    const settings = getSiteSettings();
    const message = `Hi! I'm interested in ${productName}. Please provide more details.`;
    openWhatsApp(settings.whatsapp_number || '919765834383', message);
}

// VCF Download Function
function downloadVCF() {
    fetch('api/generate-vcf.php')
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'contact.vcf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error downloading VCF:', error);
            showMessage('Error downloading contact file', 'error');
        });
}

// Share Function
function shareCard() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: 'Check out this digital visiting card',
            url: window.location.href,
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showMessage('Link copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Error copying to clipboard:', err);
            showMessage('Unable to copy link', 'error');
        });
    }
}

// PDF Functions
function savePDF() {
    window.print();
}

function downloadPDF(url) {
    window.open(url, '_blank');
}

// Theme Functions
function changeTheme(themeId) {
    fetch('api/change-theme.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: themeId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        } else {
            showMessage('Error changing theme', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Error changing theme', 'error');
    });
}

// Cart Functions
function addToCart(productId) {
    fetch('api/get-product.php?id=' + productId)
        .then(response => response.json())
        .then(product => {
            if (product.error) {
                showMessage('Product not found', 'error');
                return;
            }
            
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.discount_price || product.price,
                    image_url: product.image_url,
                    quantity: 1
                });
            }
            
            saveCart();
            updateCartDisplay();
            showMessage('Product added to cart!', 'success');
        })
        .catch(error => {
            console.error('Error adding to cart:', error);
            showMessage('Error adding product to cart', 'error');
        });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    updateCartModal();
}

function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart();
        updateCartDisplay();
        updateCartModal();
    }
}

// Inquiry Functions
function addToInquiry(productId) {
    fetch('api/get-product.php?id=' + productId)
        .then(response => response.json())
        .then(product => {
            if (product.error) {
                showMessage('Product not found', 'error');
                return;
            }
            
            const existingItem = inquiry.find(item => item.id === productId);
            
            if (!existingItem) {
                inquiry.push({
                    id: product.id,
                    title: product.title,
                    price: product.discount_price || product.price,
                    image_url: product.image_url
                });
                
                saveInquiry();
                updateInquiryDisplay();
                showMessage('Product added to inquiry!', 'success');
            } else {
                showMessage('Product already in inquiry', 'error');
            }
        })
        .catch(error => {
            console.error('Error adding to inquiry:', error);
            showMessage('Error adding product to inquiry', 'error');
        });
}

function removeFromInquiry(productId) {
    inquiry = inquiry.filter(item => item.id !== productId);
    saveInquiry();
    updateInquiryDisplay();
    updateInquiryModal();
}

function saveInquiry() {
    localStorage.setItem('inquiry', JSON.stringify(inquiry));
}

function loadInquiry() {
    const savedInquiry = localStorage.getItem('inquiry');
    if (savedInquiry) {
        inquiry = JSON.parse(savedInquiry);
    }
}

function updateInquiryDisplay() {
    const inquiryCount = document.getElementById('inquiryCount');
    const totalItems = inquiry.length;
    
    if (inquiryCount) {
        inquiryCount.textContent = totalItems;
        inquiryCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function toggleInquiry() {
    const inquiryModal = document.getElementById('inquiryModal');
    if (inquiryModal.classList.contains('active')) {
        inquiryModal.classList.remove('active');
    } else {
        inquiryModal.classList.add('active');
        updateInquiryModal();
    }
}

function updateInquiryModal() {
    const inquiryItems = document.getElementById('inquiryItems');
    
    if (inquiry.length === 0) {
        inquiryItems.innerHTML = '<p style="text-align: center; opacity: 0.6; padding: 40px 0;">No products in inquiry</p>';
        return;
    }
    
    inquiryItems.innerHTML = '';
    
    inquiry.forEach(item => {
        const inquiryItem = document.createElement('div');
        inquiryItem.className = 'inquiry-item';
        inquiryItem.innerHTML = `
            <img src="${item.image_url}" alt="${item.title}">
            <div class="inquiry-item-info">
                <div class="inquiry-item-title">${item.title}</div>
                <div class="inquiry-item-price">₹${item.price}</div>
            </div>
            <button class="remove-inquiry-btn" onclick="removeFromInquiry(${item.id})">
                <i class="fas fa-times"></i>
            </button>
        `;
        inquiryItems.appendChild(inquiryItem);
    });
}

function sendInquiry() {
    if (inquiry.length === 0) {
        showMessage('No products in inquiry', 'error');
        return;
    }
    
    const inquiryDetails = inquiry.map(item => item.title).join('\n');
    const message = `Product Inquiry:\n${inquiryDetails}\n\nPlease provide more details about these products.`;
    
    // Get WhatsApp number from settings
    const whatsappNumber = '919765834383'; // This should come from settings
    openWhatsApp(whatsappNumber, message);
    
    // Save inquiry to database
    const inquiryData = {
        products: inquiry,
        message: message,
        user_name: 'Guest User', // This could be collected from a form
        user_phone: '', // This could be collected from a form
        user_email: '' // This could be collected from a form
    };
    
    fetch('api/create-inquiry.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            inquiry = [];
            saveInquiry();
            updateInquiryDisplay();
            toggleInquiry();
            showMessage('Inquiry sent successfully!', 'success');
        }
    })
    .catch(error => {
        console.error('Error sending inquiry:', error);
    });
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal.classList.contains('active')) {
        cartModal.classList.remove('active');
    } else {
        cartModal.classList.add('active');
        updateCartModal();
    }
}

function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; opacity: 0.6; padding: 40px 0;">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image_url}" alt="${item.title}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">₹${item.price}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(0);
}

function checkout() {
    if (cart.length === 0) {
        showMessage('Your cart is empty', 'error');
        return;
    }
    
    // Show UPI payment modal
    showUPIModal();
}

function showUPIModal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const upiModal = document.getElementById('upiModal');
    const upiAmount = document.getElementById('upiAmount');
    const upiQRCode = document.getElementById('upiQRCode');
    
    upiAmount.textContent = total;
    
    // Generate UPI QR Code
    const upiId = document.getElementById('upiId').textContent;
    const upiString = `upi://pay?pa=${upiId}&pn=DEMO CARD&am=${total}&cu=INR`;
    
    // Clear previous QR code
    upiQRCode.innerHTML = '';
    
    // Generate new QR code
    QRCode(upiQRCode, {
        text: upiString,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff"
    });
    
    upiModal.classList.add('active');
}

function closeUPIModal() {
    const upiModal = document.getElementById('upiModal');
    upiModal.classList.remove('active');
}

function openUPIApp() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const upiId = document.getElementById('upiId').textContent;
    const upiString = `upi://pay?pa=${upiId}&pn=DEMO CARD&am=${total}&cu=INR`;
    
    window.open(upiString, '_blank');
}

function confirmPayment() {
    // Save order to database
    saveOrder();
    closeUPIModal();
    
    // Show registration form if user not logged in
    if (!isUserLoggedIn()) {
        showRegisterForm();
    } else {
        showMessage('Payment confirmed! Order saved successfully.', 'success');
    }
}

function saveOrder() {
    const orderData = {
        items: cart,
        total_amount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        user_name: 'Guest User', // This could be collected from a form
        user_phone: '', // This could be collected from a form
        user_email: '' // This could be collected from a form
    };
    
    fetch('api/create-order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Clear cart after successful order
            cart = [];
            saveCart();
            updateCartDisplay();
            toggleCart();
            showMessage('Order placed successfully!', 'success');
        }
    })
    .catch(error => {
        console.error('Error saving order:', error);
    });
}

// User Authentication Functions
function showLoginForm() {
    const loginModal = document.getElementById('loginModal');
    loginModal.classList.add('active');
}

function showRegisterForm() {
    const registerModal = document.getElementById('registerModal');
    registerModal.classList.add('active');
}

function closeAuthModal() {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (loginModal) loginModal.classList.remove('active');
    if (registerModal) registerModal.classList.remove('active');
}

function userLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const loginData = {
        action: 'login',
        username: formData.get('username'),
        password: formData.get('password')
    };
    
    fetch('api/user-auth.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage('Login successful!', 'success');
            closeAuthModal();
            location.reload();
        } else {
            showMessage(data.error || 'Login failed', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Login failed', 'error');
    });
}

function userRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const registerData = {
        action: 'register',
        name: formData.get('name'),
        username: formData.get('username'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password')
    };
    
    fetch('api/user-auth.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage('Registration successful! Please login.', 'success');
            closeAuthModal();
            showLoginForm();
        } else {
            showMessage(data.error || 'Registration failed', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Registration failed', 'error');
    });
}

function userLogout() {
    fetch('api/user-auth.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'logout' })
    })
    .then(() => {
        location.reload();
    });
}

function isUserLoggedIn() {
    // Check if user session exists (this would need to be implemented based on your session handling)
    return false; // Placeholder
}

function showUserDashboard() {
    const dashboardModal = document.getElementById('userDashboardModal');
    dashboardModal.classList.add('active');
    loadUserProfile();
}

function closeUserDashboard() {
    const dashboardModal = document.getElementById('userDashboardModal');
    dashboardModal.classList.remove('active');
}

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
    
    // Load tab content
    switch(tabName) {
        case 'profile':
            loadUserProfile();
            break;
        case 'orders':
            loadUserOrders();
            break;
        case 'inquiries':
            loadUserInquiries();
            break;
    }
}

function loadUserProfile() {
    // Load user profile data
    const profileTab = document.getElementById('profileTab');
    profileTab.innerHTML = '<p>Loading profile...</p>';
    
    // This would fetch user profile data from API
}

function loadUserOrders() {
    // Load user orders
    const ordersTab = document.getElementById('ordersTab');
    ordersTab.innerHTML = '<p>Loading orders...</p>';
    
    // This would fetch user orders from API
}

function loadUserInquiries() {
    // Load user inquiries
    const inquiriesTab = document.getElementById('inquiriesTab');
    inquiriesTab.innerHTML = '<p>Loading inquiries...</p>';
    
    // This would fetch user inquiries from API
}

// Free Website Request Functions
function showFreeWebsiteForm() {
    const modal = document.getElementById('freeWebsiteModal');
    modal.classList.add('active');
}

function closeFreeWebsiteForm() {
    const modal = document.getElementById('freeWebsiteModal');
    modal.classList.remove('active');
}

function submitFreeWebsiteRequest(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const requestData = {
        name: formData.get('name'),
        mobile: formData.get('mobile'),
        email: formData.get('email'),
        business_details: formData.get('business_details')
    };
    
    fetch('api/free-website-request.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage('Request submitted successfully! We will contact you soon.', 'success');
            closeFreeWebsiteForm();
            event.target.reset();
        } else {
            showMessage(data.error || 'Failed to submit request', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Failed to submit request', 'error');
    });
}

// Review Functions
function setRating(rating) {
    currentRating = rating;
    document.getElementById('rating').value = rating;
    
    const stars = document.querySelectorAll('.stars-input i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function submitReview(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const reviewData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        rating: formData.get('rating'),
        comment: formData.get('comment')
    };
    
    if (reviewData.rating == 0) {
        showMessage('Please select a rating', 'error');
        return;
    }
    
    fetch('api/submit-review.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage('Review submitted successfully! It will be visible after approval.', 'success');
            event.target.reset();
            setRating(0);
        } else {
            showMessage(data.message || 'Error submitting review', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('Error submitting review', 'error');
    });
}

// Gallery Functions
function openLightbox(imageUrl) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    lightboxImage.src = imageUrl;
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

// Utility Functions
function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at top of container
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function getSiteSettings() {
    // This would typically fetch from an API or be embedded in the page
    return {
        whatsapp_number: '919765834383',
        contact_phone1: '9765834383',
        contact_email: 'info@galaxytribes.in',
        company_name: 'DEMO CARD',
        director_name: 'Vishal Rathod'
    };
}

// Smooth Scrolling for Navigation
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Lazy Loading for Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
}

// Handle Online/Offline Status
window.addEventListener('online', () => {
    showMessage('Connection restored', 'success');
});

window.addEventListener('offline', () => {
    showMessage('You are offline. Some features may not work.', 'error');
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const cartModal = document.getElementById('cartModal');
        const lightbox = document.getElementById('lightbox');
        
        if (cartModal && cartModal.classList.contains('active')) {
            toggleCart();
        }
        
        if (document.getElementById('inquiryModal') && document.getElementById('inquiryModal').classList.contains('active')) {
            toggleInquiry();
        }
        
        if (lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
        
        // Close other modals
        closeAuthModal();
        closeFreeWebsiteForm();
        closeUserDashboard();
        closeUPIModal();
    }
});

// Touch Gestures for Mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - could trigger next action
            console.log('Swiped left');
        } else {
            // Swipe right - could trigger previous action
            console.log('Swiped right');
        }
    }
}

// Performance Monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

measurePerformance();

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Could send error reports to server
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send error reports to server
});