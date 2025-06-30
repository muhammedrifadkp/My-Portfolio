#!/usr/bin/env node

/**
 * 🚀 Environment Setup Script for Rifad's Portfolio
 * 
 * This script helps set up the environment variables interactively
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

console.log(`${colors.blue}${colors.bold}🚀 Environment Setup for Rifad's Portfolio${colors.reset}\n`);

async function setupEnvironment() {
  const envPath = path.join(projectRoot, '.env');
  const envExamplePath = path.join(projectRoot, '.env.example');

  // Check if .env already exists
  if (fs.existsSync(envPath)) {
    console.log(`${colors.yellow}⚠️  .env file already exists${colors.reset}`);
    const overwrite = await question('Do you want to overwrite it? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log(`${colors.blue}Setup cancelled. Your existing .env file is preserved.${colors.reset}`);
      rl.close();
      return;
    }
  }

  console.log(`${colors.cyan}Let's set up your environment variables...${colors.reset}\n`);

  // Copy from .env.example if it exists
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log(`${colors.green}✅ Created .env from .env.example${colors.reset}\n`);
  }

  // Collect API keys
  console.log(`${colors.bold}🤖 Gemini AI Configuration${colors.reset}`);
  console.log(`Get your free API key from: ${colors.cyan}https://makersuite.google.com/app/apikey${colors.reset}`);
  const geminiKey = await question('Enter your Gemini API key (starts with AIza): ');

  console.log(`\n${colors.bold}📧 EmailJS Configuration${colors.reset}`);
  console.log(`Get your credentials from: ${colors.cyan}https://www.emailjs.com/${colors.reset}`);
  const emailServiceId = await question('Enter your EmailJS Service ID: ');
  const emailTemplateId = await question('Enter your EmailJS Template ID: ');
  const emailPublicKey = await question('Enter your EmailJS Public Key: ');

  console.log(`\n${colors.bold}📱 Contact Information${colors.reset}`);
  const contactEmail = await question('Enter your contact email: ');
  const contactPhone = await question('Enter your phone number: ');
  const contactLocation = await question('Enter your location: ');

  console.log(`\n${colors.bold}🔗 Social Media Links${colors.reset}`);
  const githubUrl = await question('Enter your GitHub URL: ');
  const linkedinUrl = await question('Enter your LinkedIn URL: ');

  // Update .env file
  let envContent = fs.readFileSync(envPath, 'utf8');

  const replacements = [
    ['your_gemini_api_key_here', geminiKey],
    ['your_service_id_here', emailServiceId],
    ['your_template_id_here', emailTemplateId],
    ['your_public_key_here', emailPublicKey],
    ['your-email@example.com', contactEmail],
    ['your-phone-number', contactPhone],
    ['Your Location', contactLocation],
    ['https://github.com/yourusername', githubUrl],
    ['https://linkedin.com/in/yourusername', linkedinUrl]
  ];

  replacements.forEach(([placeholder, value]) => {
    if (value.trim()) {
      envContent = envContent.replace(new RegExp(placeholder, 'g'), value);
    }
  });

  fs.writeFileSync(envPath, envContent);

  console.log(`\n${colors.green}${colors.bold}✅ Environment setup complete!${colors.reset}`);
  console.log(`\n${colors.blue}📝 Next steps:${colors.reset}`);
  console.log(`1. Restart your development server: ${colors.yellow}npm run dev${colors.reset}`);
  console.log(`2. Test your contact form and AI assistant`);
  console.log(`3. Run security verification: ${colors.yellow}node scripts/verify-security.js${colors.reset}`);

  rl.close();
}

setupEnvironment().catch(console.error);
