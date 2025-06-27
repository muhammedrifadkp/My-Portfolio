// This script generates a screen texture for the computer model
// Run this in a browser console to generate the texture

function generateScreenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#0a0a14');
  gradient.addColorStop(1, '#16213e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Header
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Muhammed Rifad KP', canvas.width / 2, 100);

  // Subtitle
  ctx.fillStyle = '#20b5ff';
  ctx.font = '32px Arial';
  ctx.fillText('Full Stack Developer', canvas.width / 2, 150);

  // Divider
  ctx.strokeStyle = '#FF4C4C';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 150, 180);
  ctx.lineTo(canvas.width / 2 + 150, 180);
  ctx.stroke();

  // Skills section
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Skills', canvas.width / 2, 250);

  // Skills list
  const skills = ['React', 'Node.js', 'Python', 'Next.js', 'Vite'];
  ctx.font = '24px Arial';
  ctx.fillStyle = '#cccccc';
  
  skills.forEach((skill, index) => {
    const x = canvas.width / 2;
    const y = 300 + index * 40;
    ctx.fillText(skill, x, y);
  });

  // Projects section
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px Arial';
  ctx.fillText('Projects', canvas.width / 2, 500);

  // Project items
  const projects = ['EcomNova', 'EtheReal', 'TravelX'];
  ctx.font = '24px Arial';
  ctx.fillStyle = '#cccccc';
  
  projects.forEach((project, index) => {
    const x = canvas.width / 2;
    const y = 550 + index * 40;
    ctx.fillText(project, x, y);
  });

  // Footer
  ctx.fillStyle = '#20b5ff';
  ctx.font = '20px Arial';
  ctx.fillText('muhammedrifadkp3@gmail.com', canvas.width / 2, 700);

  // Return the data URL
  return canvas.toDataURL('image/png');
}

// Generate and download the texture
function downloadTexture() {
  const dataURL = generateScreenTexture();
  const link = document.createElement('a');
  link.download = 'screen-texture.png';
  link.href = dataURL;
  link.click();
}

// Call this function in the browser console to download the texture
// downloadTexture();
