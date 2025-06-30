/**
 * 🔐 Environment Variables Validator
 * 
 * This utility validates that all required environment variables are present
 * and provides helpful debugging information.
 */

// Required environment variables for the application
const REQUIRED_ENV_VARS = {
  // Gemini AI API
  gemini: [
    'VITE_GEMINI_API_KEY',
    'REACT_APP_GEMINI_API_KEY'
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
 * Logs environment validation results to console
 */
export const logEnvironmentStatus = () => {
  const validation = validateEnvironment();
  
  console.group('🔐 Environment Variables Status');
  
  if (validation.isValid) {
    console.log('✅ All required environment variables are configured');
  } else {
    console.error('❌ Missing required environment variables:', validation.missing);
  }
  
  if (validation.present.length > 0) {
    console.log('✅ Present variables:', validation.present);
  }
  
  if (validation.warnings.length > 0) {
    console.warn('⚠️ Warnings:', validation.warnings);
  }
  
  console.groupEnd();
  
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
    serviceId: getEnvVar('VITE_EMAILJS_SERVICE_ID', 'VITE_APP_EMAILJS_SERVICE_ID'),
    templateId: getEnvVar('VITE_EMAILJS_TEMPLATE_ID', 'VITE_APP_EMAILJS_TEMPLATE_ID'),
    publicKey: getEnvVar('VITE_EMAILJS_PUBLIC_KEY', 'VITE_APP_EMAILJS_PUBLIC_KEY')
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
