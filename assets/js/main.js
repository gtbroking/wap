// Global Variables
let cart = [];
let currentBannerIndex = 0;
let bannerInterval;
let currentRating = 0;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeBanners();
    loadCart();
    updateCartDisplay();
});

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
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderDetails = cart.map(item => `${item.title} x${item.quantity}`).join('\n');
    const message = `Order Details:\n${orderDetails}\n\nTotal: ₹${total}\n\nI would like to proceed with UPI payment.`;
    
    // Get WhatsApp number from settings
    const whatsappNumber = '919765834383'; // This should come from settings
    openWhatsApp(whatsappNumber, message);
    
    // Optionally, save order to database
    saveOrder();
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

// Service Worker Registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
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
        
        if (lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
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