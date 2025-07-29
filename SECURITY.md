# 🔐 Security Configuration Guide

This document outlines the security measures implemented in Rifad's Portfolio and how to maintain them.

## 🚀 Quick Setup

### 1. Environment Variables Setup
```bash
# Copy the example file
cp .env.example .env

# Or use the interactive setup script
npm run setup-env
```

### 2. Configure Your API Keys
Edit the `.env` file with your actual credentials:

```env
# Gemini AI API Key (from Google AI Studio)
VITE_GEMINI_API_KEY=AIzaSyC-your-actual-api-key-here

# EmailJS Credentials (from EmailJS Dashboard)
VITE_EMAILJS_SERVICE_ID=service_your_id_here
VITE_EMAILJS_TEMPLATE_ID=template_your_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 3. Verify Security
```bash
# Run security verification
npm run verify-security
```

## 🛡️ Security Features Implemented

### ✅ Environment Variables
- All API keys moved to environment variables
- No hardcoded secrets in source code
- Separate configuration for development and production

### ✅ Git Security
- `.env` file excluded from version control
- `.env.example` provided as template
- Sensitive data never committed

### ✅ API Key Protection
- **Gemini API Key**: Secured with environment variables
- **EmailJS Credentials**: Protected from exposure
- **Contact Information**: Configurable via environment

### ✅ Build Security
- Environment variables properly handled in Vite
- Production builds exclude development secrets
- Source maps disabled in production

## 🔑 Required Environment Variables

### Essential (Required for functionality)
```env
VITE_GEMINI_API_KEY=          # Google Gemini AI API key
VITE_EMAILJS_SERVICE_ID=      # EmailJS service identifier
VITE_EMAILJS_TEMPLATE_ID=     # EmailJS email template
VITE_EMAILJS_PUBLIC_KEY=      # EmailJS public key
```

### Contact Information
```env
VITE_CONTACT_EMAIL=           # Your contact email
VITE_CONTACT_PHONE=           # Your phone number
VITE_CONTACT_LOCATION=        # Your location
```

### Social Media (Optional)
```env
VITE_GITHUB_URL=              # Your GitHub profile
VITE_LINKEDIN_URL=            # Your LinkedIn profile
VITE_TWITTER_URL=             # Your Twitter profile
```

## 🚨 Security Checklist

### Before Deployment
- [ ] All API keys in environment variables
- [ ] `.env` file not committed to git
- [ ] Security verification passes
- [ ] Production environment variables configured
- [ ] No hardcoded secrets in code

### Regular Maintenance
- [ ] Rotate API keys periodically
- [ ] Monitor API usage and quotas
- [ ] Review access logs
- [ ] Update dependencies regularly

## 🔧 Troubleshooting

### Environment Variables Not Working
1. **Check file name**: Must be exactly `.env` (not `.env.txt`)
2. **Restart server**: Run `npm run dev` after changes
3. **Check syntax**: No spaces around `=` sign
4. **Verify location**: `.env` must be in project root

### API Keys Not Loading
```javascript
// Debug environment variables
console.log('Environment check:', {
  gemini: import.meta.env.VITE_GEMINI_API_KEY ? 'Found' : 'Missing',
  emailjs: import.meta.env.VITE_EMAILJS_SERVICE_ID ? 'Found' : 'Missing'
});
```

### Common Issues
- **CORS errors**: Check allowed origins in environment
- **API limits**: Monitor usage in respective dashboards
- **Build failures**: Ensure all required variables are set

## 🌍 Deployment Security

### Vercel Deployment
1. Add environment variables in Vercel dashboard
2. Set production values (different from development)
3. Enable environment variable encryption
4. Configure domain restrictions if needed

### Environment Variable Names
- Use `VITE_` prefix for client-side variables
- Keep server-side secrets without `VITE_` prefix
- Use consistent naming conventions

## 📞 Support

If you encounter security issues:
1. Run `npm run verify-security` for diagnostics
2. Check the console for error messages
3. Verify all environment variables are set
4. Restart the development server

## 🔄 Updates

This security configuration is regularly updated. Check for:
- New environment variables
- Updated security practices
- API changes requiring new credentials

---

**Remember**: Never commit your `.env` file or share API keys publicly!
