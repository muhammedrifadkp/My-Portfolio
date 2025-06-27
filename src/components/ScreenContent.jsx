import { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Function to create a screen texture
const createScreenTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;  // Increased canvas size
  canvas.height = 960;
  const ctx = canvas.getContext('2d');

  const texture = new THREE.CanvasTexture(canvas);

  // Preload fonts to ensure they're available
  const preloadFonts = () => {
    return new Promise((resolve) => {
      // Add a temporary element to force font loading
      const tempElement = document.createElement('div');
      tempElement.style.fontFamily = '"Exo 2", sans-serif';
      tempElement.style.position = 'absolute';
      tempElement.style.visibility = 'hidden';
      tempElement.textContent = 'Font Loader';
      document.body.appendChild(tempElement);
      
      // Use font loading API if available
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          document.body.removeChild(tempElement);
          resolve();
        });
      } else {
        // Fallback - wait a moment and assume fonts loaded
        setTimeout(() => {
          document.body.removeChild(tempElement);
          resolve();
        }, 500);
      }
    });
  };

  const updateTexture = (time = 0) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cyberpunk gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add animated grid lines
    ctx.strokeStyle = `rgba(32, 181, 255, ${0.2 + Math.sin(time/500)*0.1})`;
    ctx.lineWidth = 1;
    for(let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for(let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Header with glowing effect
    ctx.save();
    ctx.shadowColor = '#20b5ff';
    // ctx.shadowBlur = 5;
    ctx.fillStyle = '#ffffff';
    ctx.font = '100px Arial, sans-serif'; // Use system font
    ctx.textAlign = 'center';
    ctx.fillText('MUHAMMED RIFAD KP', canvas.width/2, 120);

    // Animated subtitle
    const subtitleHue = (time/30) % 360;
    ctx.font = 'italic 42px "Audiowide", cursive, sans-serif';
    ctx.fillStyle = `hsl(${subtitleHue}, 100%, 60%)`;
    ctx.fillText('FULL STACK DEVELOPER', canvas.width/2, 180);
    ctx.restore();

    // Glowing divider
    ctx.strokeStyle = `hsla(${subtitleHue}, 100%, 50%, 0.8)`;
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2 - 200, 210);
    ctx.lineTo(canvas.width/2 + 200, 210);
    ctx.stroke();

    // Main content container
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(100, 240, canvas.width - 200, 600, 20);
    ctx.clip();
    
    // HUD-style background
    ctx.fillStyle = 'rgba(0, 0, 30, 0.9)';
    ctx.fillRect(100, 240, canvas.width - 200, 600);

    // Skills section
    const skills = ['React', 'Node.js', 'Python', 'Next.js', 'Vite'];
    ctx.font = '28px "Rajdhani", sans-serif';
    skills.forEach((skill, i) => {
      const y = 300 + i * 80;
      
      // Animated skill bars
      ctx.fillStyle = 'rgba(32, 181, 255, 0.2)';
      ctx.fillRect(150, y - 20, 400, 30);
      
      const progress = 0.6 + Math.sin(time/200 + i) * 0.2;
      const gradient = ctx.createLinearGradient(0, 0, 400, 0);
      gradient.addColorStop(0, `hsl(${200 + i*40}, 80%, 50%)`);
      gradient.addColorStop(1, `hsl(${240 + i*40}, 80%, 50%)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(150, y - 20, 400 * progress, 30);

      // Skill text
      ctx.fillStyle = '#fff';
      ctx.fillText(skill.toUpperCase(), 580, y);
    });

    // Projects section
    const projects = ['EcomNova', 'EtheReal', 'TravelX'];
    ctx.font = '24px "Orbitron", sans-serif';
    projects.forEach((project, i) => {
      const y = 300 + i * 80;
      const hue = (time/50 + i*120) % 360;
      
      // Project cards
      ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.1)`;
      ctx.fillRect(800, 300 + i * 120, 300, 80);
      
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.lineWidth = 2;
      ctx.strokeRect(800, 300 + i * 120, 300, 80);

      ctx.fillStyle = `hsl(${hue}, 100%, 70%)`;
      ctx.textAlign = 'center';
      ctx.fillText(project, 950, 350 + i * 120);
    });

    ctx.restore();

    // Animated particles
    for(let i = 0; i < 50; i++) {
      ctx.fillStyle = `hsla(${(time/10 + i*10) % 360}, 100%, 50%, 0.3)`;
      ctx.beginPath();
      ctx.arc(
        (time/10 + i*100) % canvas.width,
        (i*50 + time/5) % canvas.height,
        2 + Math.sin(time/100 + i)*2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Footer with animated border
    ctx.strokeStyle = `hsl(${(time/20) % 360}, 100%, 50%)`;
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 15]);
    ctx.lineDashOffset = -time/20;
    ctx.strokeRect(50, canvas.height - 100, canvas.width - 100, 60);

    // Contact info with scanline effect
    ctx.fillStyle = '#20b5ff';
    ctx.font = '24px "Audiowide", cursive';
    ctx.fillText('CONTACT: muhammedrifadkp3@gmail.com', canvas.width/2, canvas.height - 60);
    
    // Animated scanning dot
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(
      (time/10) % canvas.width,
      canvas.height - 100 + (Math.sin(time/200)*30),
      4,
      0,
      Math.PI * 2
    );
    ctx.fill();

    texture.needsUpdate = true;
  };

  // Preload fonts then initialize
  preloadFonts().then(() => {
    updateTexture(0);
  });
  
  return { texture, updateTexture };
};

export { createScreenTexture };



