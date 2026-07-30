/**
 * 🔐 Environment Variables Validator
 * 
 * This utility validates that all required environment variables are present
 * and provides helpful debugging information.
 */

// Required environment variables for the application
const REQUIRED_ENV_VARS = {
  // Gemini AI API (only VITE_ prefix works in Vite)
  gemini: [
    'VITE_GEMINI_API_KEY'
  ],

  // EmailJS Configuration
  emailjs: [
    'VITE_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_TEMPLATE_ID',
    'VITE_EMAILJS_PUBLIC_KEY'
  ]
};

// Optional environment variables (for backup/fallback)
const OPTIONAL_ENV_VARS = {
  emailjsBackup: [
    'VITE_EMAILJS_SERVICE_ID_BACKUP',
    'VITE_EMAILJS_TEMPLATE_ID_BACKUP',
    'VITE_EMAILJS_PUBLIC_KEY_BACKUP'
  ]
};

/**
 * Validates environment variables and returns status
 */
export const validateEnvironment = () => {
  const results = {
    isValid: true,
    missing: [],
    present: [],
    warnings: []
  };

  // Check required variables
  Object.entries(REQUIRED_ENV_VARS).forEach(([category, vars]) => {
    vars.forEach(varName => {
      const value = import.meta.env[varName];
      if (value && value.trim() !== '') {
        results.present.push(varName);
      } else {
        results.missing.push(varName);
        results.isValid = false;
      }
    });
  });

  // Check optional variables
  Object.entries(OPTIONAL_ENV_VARS).forEach(([category, vars]) => {
    const allPresent = vars.every(varName => {
      const value = import.meta.env[varName];
      return value && value.trim() !== '';
    });
    
    if (!allPresent) {
      results.warnings.push(`Optional ${category} variables not fully configured`);
    }
  });

  return results;
};

/**
 * Validates environment variables silently for security
 */
export const logEnvironmentStatus = () => {
  const validation = validateEnvironment();

  // Security: No environment details exposed in production
  // Silent validation for security purposes

  return validation;
};

/**
 * Gets a specific environment variable with fallback
 */
export const getEnvVar = (primaryKey, fallbackKey = null, defaultValue = null) => {
  const primary = import.meta.env[primaryKey];
  if (primary && primary.trim() !== '') {
    return primary;
  }
  
  if (fallbackKey) {
    const fallback = import.meta.env[fallbackKey];
    if (fallback && fallback.trim() !== '') {
      return fallback;
    }
  }
  
  return defaultValue;
};

/**
 * Gets EmailJS configuration from environment variables
 */
export const getEmailJSConfig = () => {
  return {
    serviceId: getEnvVar('VITE_EMAILJS_SERVICE_ID', 'VITE_APP_EMAILJS_SERVICE_ID', 'service_gfrbuaj'),
    templateId: getEnvVar('VITE_EMAILJS_TEMPLATE_ID', 'VITE_APP_EMAILJS_TEMPLATE_ID', 'template_ieuwrka'),
    publicKey: getEnvVar('VITE_EMAILJS_PUBLIC_KEY', 'VITE_APP_EMAILJS_PUBLIC_KEY', 'Drfo3y3Sfl30PhGXF')
  };
};

/**
 * Gets backup EmailJS configuration from environment variables
 */
export const getBackupEmailJSConfig = () => {
  return {
    serviceId: getEnvVar('VITE_EMAILJS_SERVICE_ID_BACKUP'),
    templateId: getEnvVar('VITE_EMAILJS_TEMPLATE_ID_BACKUP'),
    publicKey: getEnvVar('VITE_EMAILJS_PUBLIC_KEY_BACKUP')
  };
};

/**
 * Gets Gemini API configuration from environment variables
 */
export const getGeminiConfig = () => {
  return {
    apiKey: getEnvVar('VITE_GEMINI_API_KEY', 'REACT_APP_GEMINI_API_KEY')
  };
};

// Auto-validate on import in development
if (import.meta.env.DEV) {
  logEnvironmentStatus();
}
