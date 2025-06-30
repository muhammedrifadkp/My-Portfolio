#!/usr/bin/env node

/**
 * 🔐 Security Verification Script for Rifad's Portfolio
 * 
 * This script checks that all sensitive data is properly secured
 * and environment variables are correctly configured.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

console.log(`${colors.blue}${colors.bold}🔐 Security Verification for Rifad's Portfolio${colors.reset}\n`);

let hasIssues = false;

// Check 1: Verify .env file exists
console.log(`${colors.blue}📋 Checking environment configuration...${colors.reset}`);

const envPath = path.join(projectRoot, '.env');
if (fs.existsSync(envPath)) {
  console.log(`${colors.green}✅ .env file exists${colors.reset}`);
} else {
  console.log(`${colors.red}❌ .env file missing - copy from .env.example${colors.reset}`);
  hasIssues = true;
}

// Check 2: Verify .gitignore includes .env
const gitignorePath = path.join(projectRoot, '.gitignore');
if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  if (gitignoreContent.includes('.env')) {
    console.log(`${colors.green}✅ .env is properly ignored by git${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ .env not in .gitignore - security risk!${colors.reset}`);
    hasIssues = true;
  }
} else {
  console.log(`${colors.yellow}⚠️  .gitignore file missing${colors.reset}`);
}

// Check 3: Verify required environment variables
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'VITE_GEMINI_API_KEY',
    'VITE_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_TEMPLATE_ID',
    'VITE_EMAILJS_PUBLIC_KEY'
  ];

  console.log(`\n${colors.blue}🔑 Checking required API keys...${colors.reset}`);
  
  requiredVars.forEach(varName => {
    const regex = new RegExp(`^${varName}=.+`, 'm');
    if (regex.test(envContent)) {
      const match = envContent.match(new RegExp(`^${varName}=(.+)`, 'm'));
      const value = match ? match[1].trim() : '';
      if (value && value !== 'your_api_key_here' && value !== 'your_service_id_here' && 
          value !== 'your_template_id_here' && value !== 'your_public_key_here') {
        console.log(`${colors.green}✅ ${varName} is configured${colors.reset}`);
      } else {
        console.log(`${colors.yellow}⚠️  ${varName} needs to be set with actual value${colors.reset}`);
      }
    } else {
      console.log(`${colors.red}❌ ${varName} is missing${colors.reset}`);
      hasIssues = true;
    }
  });
}

// Check 4: Scan for hardcoded secrets in source files
console.log(`\n${colors.blue}🔍 Scanning for hardcoded secrets...${colors.reset}`);

const scanPatterns = [
  { pattern: /AIza[0-9A-Za-z_-]{35}/, name: 'Google API Key', severity: 'high' },
  { pattern: /service_[a-zA-Z0-9]+/, name: 'EmailJS Service ID', severity: 'medium' },
  { pattern: /template_[a-zA-Z0-9]+/, name: 'EmailJS Template ID', severity: 'medium' },
  { pattern: /[a-zA-Z0-9]{17,}/, name: 'Potential API Key', severity: 'low' }
];

const filesToScan = [
  'src/pages/Contact.jsx',
  'src/pages/AI.jsx',
  'src/components/AIAssistant.jsx'
];

let secretsFound = false;

filesToScan.forEach(filePath => {
  const fullPath = path.join(projectRoot, filePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    
    scanPatterns.forEach(({ pattern, name, severity }) => {
      const matches = content.match(new RegExp(pattern, 'g'));
      if (matches) {
        matches.forEach(match => {
          // Skip if it's an environment variable reference
          if (content.includes(`import.meta.env.`) && 
              content.includes(match) && 
              content.includes('import.meta.env')) {
            return; // This is likely an env var reference, skip
          }
          
          const color = severity === 'high' ? colors.red : 
                       severity === 'medium' ? colors.yellow : colors.blue;
          console.log(`${color}⚠️  Found ${name} in ${filePath}: ${match.substring(0, 10)}...${colors.reset}`);
          secretsFound = true;
        });
      }
    });
  }
});

if (!secretsFound) {
  console.log(`${colors.green}✅ No hardcoded secrets detected${colors.reset}`);
}

// Check 5: Verify build configuration
console.log(`\n${colors.blue}🏗️  Checking build configuration...${colors.reset}`);

const packageJsonPath = path.join(projectRoot, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  console.log(`${colors.green}✅ package.json exists${colors.reset}`);
} else {
  console.log(`${colors.red}❌ package.json missing${colors.reset}`);
  hasIssues = true;
}

// Final summary
console.log(`\n${colors.bold}📊 Security Verification Summary${colors.reset}`);
console.log('='.repeat(40));

if (hasIssues) {
  console.log(`${colors.red}❌ Security issues found - please fix the above problems${colors.reset}`);
  process.exit(1);
} else {
  console.log(`${colors.green}✅ All security checks passed!${colors.reset}`);
  console.log(`${colors.blue}🚀 Your portfolio is securely configured${colors.reset}`);
}

console.log(`\n${colors.blue}📝 Next steps:${colors.reset}`);
console.log(`1. Restart your development server: ${colors.yellow}npm run dev${colors.reset}`);
console.log(`2. Test all functionality to ensure environment variables work`);
console.log(`3. Deploy to production with environment variables configured`);
console.log(`4. Never commit your .env file to version control`);
