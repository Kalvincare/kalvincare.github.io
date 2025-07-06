// KalvinCare SEO Enhancement Script
// This file contains SEO and performance optimizations

(function() {
    'use strict';

    // Performance monitoring
    function logPerformanceMetrics() {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
            
            console.log('Page Load Time:', loadTime + 'ms');
            console.log('DOM Content Loaded:', domContentLoaded + 'ms');
            
            // Send to analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'timing_complete', {
                    name: 'load',
                    value: Math.round(loadTime)
                });
            }
        }
    }

    // Enhanced link tracking for SEO
    function enhanceLinkTracking() {
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const text = this.textContent.trim();
                
                // Track internal link clicks
                if (href.startsWith('#') || href.includes('kalvincare.github.io')) {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'click', {
                            event_category: 'Internal Link',
                            event_label: text,
                            value: 1
                        });
                    }
                }
            });
        });
    }

    // Schema.org validation helper
    function validateStructuredData() {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        scripts.forEach(script => {
            try {
                JSON.parse(script.textContent);
                console.log('✅ Structured data is valid JSON');
            } catch (e) {
                console.error('❌ Invalid JSON in structured data:', e);
            }
        });
    }

    // Social media sharing enhancement
    function enhanceSocialSharing() {
        // Add click tracking for social media links
        const socialLinks = document.querySelectorAll('a[href*="facebook"], a[href*="instagram"], a[href*="twitter"]');
        socialLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        event_category: 'Social Media',
                        event_label: this.href,
                        value: 1
                    });
                }
            });
        });
    }

    // Form submission tracking
    function trackFormSubmissions() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function() {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        event_category: 'Lead Generation',
                        event_label: 'Contact Form',
                        value: 1
                    });
                }
            });
        });
    }

    // Lazy loading for images (SEO friendly)
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
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

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // SEO-friendly scroll tracking
    function setupScrollTracking() {
        let scrollDepth = 0;
        const scrollThresholds = [25, 50, 75, 90];
        
        window.addEventListener('scroll', function() {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            scrollThresholds.forEach(threshold => {
                if (scrollPercent >= threshold && scrollDepth < threshold) {
                    scrollDepth = threshold;
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll', {
                            event_category: 'Engagement',
                            event_label: threshold + '% scroll depth',
                            value: threshold
                        });
                    }
                }
            });
        });
    }

    // Initialize all SEO enhancements
    function initSEOEnhancements() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                logPerformanceMetrics();
                enhanceLinkTracking();
                validateStructuredData();
                enhanceSocialSharing();
                trackFormSubmissions();
                setupLazyLoading();
                setupScrollTracking();
            });
        } else {
            logPerformanceMetrics();
            enhanceLinkTracking();
            validateStructuredData();
            enhanceSocialSharing();
            trackFormSubmissions();
            setupLazyLoading();
            setupScrollTracking();
        }
    }

    // Start SEO enhancements
    initSEOEnhancements();

    // Export functions for external use
    window.KalvinCareSEO = {
        logPerformanceMetrics,
        enhanceLinkTracking,
        validateStructuredData,
        enhanceSocialSharing,
        trackFormSubmissions,
        setupLazyLoading,
        setupScrollTracking
    };

})(); 