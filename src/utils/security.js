/**
 * 🛡️ Security Utilities for Portfolio Protection
 * 
 * This module provides comprehensive security measures to protect
 * the portfolio from various attacks and unauthorized access.
 */

// Security: Disable console in production
if (import.meta.env.PROD) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.info = () => {};
  console.debug = () => {};
  console.trace = () => {};
  console.group = () => {};
  console.groupEnd = () => {};
  console.table = () => {};
  console.time = () => {};
  console.timeEnd = () => {};
}

// Security: Disable right-click context menu
document.addEventListener('contextmenu', (e) => {
  if (import.meta.env.PROD) {
    e.preventDefault();
    return false;
  }
});

// Security: Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
document.addEventListener('keydown', (e) => {
  if (import.meta.env.PROD) {
    // Disable F12 (Developer Tools)
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }
    
    // Disable Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      return false;
    }
    
    // Disable Ctrl+Shift+C (Element Inspector)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      return false;
    }
    
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      return false;
    }
    
    // Disable Ctrl+S (Save Page)
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      return false;
    }
    
    // Disable Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
      e.preventDefault();
      return false;
    }
  }
});

// Security: Detect and prevent DevTools
let devtools = {
  open: false,
  orientation: null
};

const threshold = 160;

setInterval(() => {
  if (import.meta.env.PROD) {
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
      if (!devtools.open) {
        devtools.open = true;
        // Redirect or show warning
        document.body.innerHTML = `
          <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            z-index: 999999;
          ">
            <div style="text-align: center;">
              <h1>🛡️ Security Notice</h1>
              <p>Developer tools are not allowed on this website.</p>
              <p>Please close developer tools to continue.</p>
            </div>
          </div>
        `;
      }
    } else {
      devtools.open = false;
    }
  }
}, 500);

// Security: Input sanitization functions
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    // Remove script tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove javascript: protocols
    .replace(/javascript:/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=/gi, '')
    // Remove data: protocols
    .replace(/data:/gi, '')
    // Remove vbscript: protocols
    .replace(/vbscript:/gi, '')
    // Remove expression() CSS
    .replace(/expression\s*\(/gi, '')
    // Remove @import CSS
    .replace(/@import/gi, '')
    // Trim and limit length
    .trim()
    .substring(0, 1000);
};

// Security: Email validation (more flexible)
export const validateEmail = (email) => {
  if (!email || email.length === 0) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Security: Phone validation (more flexible)
export const validatePhone = (phone) => {
  if (!phone || phone.length === 0) return false;
  // Allow various phone formats
  const phoneRegex = /^[\+]?[0-9\s\-\(\)\.]{7,20}$/;
  return phoneRegex.test(phone);
};

// Security: Name validation (more flexible)
export const validateName = (name) => {
  if (!name || name.length === 0) return false;
  // Allow letters, spaces, hyphens, apostrophes, and dots
  const nameRegex = /^[a-zA-Z\s\-\.']{1,100}$/;
  return nameRegex.test(name) && name.trim().length >= 2;
};

// Security: Message validation (more flexible)
export const validateMessage = (message) => {
  if (!message || message.length === 0) return false;
  return message.trim().length >= 5 && message.length <= 2000;
};

// Security: Rate limiting for form submissions
const submissionTimes = [];
const MAX_SUBMISSIONS = 3;
const TIME_WINDOW = 60000; // 1 minute

export const checkRateLimit = () => {
  const now = Date.now();
  
  // Remove old submissions outside time window
  while (submissionTimes.length > 0 && now - submissionTimes[0] > TIME_WINDOW) {
    submissionTimes.shift();
  }
  
  // Check if rate limit exceeded
  if (submissionTimes.length >= MAX_SUBMISSIONS) {
    return false;
  }
  
  // Add current submission
  submissionTimes.push(now);
  return true;
};

// Security: Prevent form automation/bots (more lenient)
export const validateHuman = () => {
  // Simple bot detection - check if form was filled too quickly
  const formStartTime = window.formStartTime || Date.now();
  const timeTaken = Date.now() - formStartTime;

  // If form was filled in less than 1 second, likely a bot (more lenient)
  return timeTaken > 1000;
};

// Security: Initialize form start time
export const initFormSecurity = () => {
  window.formStartTime = Date.now();
};

// Security: Content Security Policy headers (for server-side implementation)
export const getCSPHeaders = () => {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://api.emailjs.com https://generativelanguage.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://api.emailjs.com https://generativelanguage.googleapis.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'"
    ].join('; ')
  };
};

// Security: Initialize all security measures
export const initSecurity = () => {
  // Security measures are automatically initialized when this module is imported
  console.log('🛡️ Security measures initialized');
};

export default {
  sanitizeInput,
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
  checkRateLimit,
  validateHuman,
  initFormSecurity,
  getCSPHeaders,
  initSecurity
};
