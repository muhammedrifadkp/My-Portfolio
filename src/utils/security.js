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
    // Limit length
    .substring(0, 2000);
};

// Security: Email validation (more flexible)
export const validateEmail = (email) => {
  if (!email || email.length === 0) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Security: Phone validation (optional or flexible)
export const validatePhone = (phone) => {
  if (!phone || phone.trim().length === 0) return true; // Optional field
  const phoneRegex = /^[\+]?[0-9\s\-\(\)\.]{5,25}$/;
  return phoneRegex.test(phone.trim());
};

// Security: Name validation (flexible)
export const validateName = (name) => {
  if (!name || name.trim().length === 0) return false;
  return name.trim().length >= 2 && name.trim().length <= 100;
};

// Security: Message validation (flexible)
export const validateMessage = (message) => {
  if (!message || message.trim().length === 0) return false;
  return message.trim().length >= 2 && message.length <= 2500;
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
