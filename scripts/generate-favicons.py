import os
import subprocess
from PIL import Image

def generate_favicons():
    public_dir = os.path.abspath("public")
    svg_path = os.path.join(public_dir, "favicon.svg")
    temp_html = os.path.join(public_dir, "_temp_icon.html")
    
    # Create HTML file to render SVG at 512x512
    html_content = """<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; background: transparent; }
  body { width: 512px; height: 512px; overflow: hidden; }
  img { width: 512px; height: 512px; display: block; }
</style>
</head>
<body>
  <img src="favicon.svg" />
</body>
</html>
"""
    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    temp_screenshot = os.path.join(public_dir, "_temp_512.png")
    edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    
    cmd = [
        edge_path,
        "--headless",
        "--disable-gpu",
        "--hide-scrollbars",
        "--window-size=512,512",
        f"--screenshot={temp_screenshot}",
        f"file:///{temp_html}"
    ]
    
    print("Running Edge headless to capture high-res SVG rendering...")
    subprocess.run(cmd, check=True)
    
    if not os.path.exists(temp_screenshot):
        raise FileNotFoundError("Failed to generate screenshot from Edge")
        
    base_img = Image.open(temp_screenshot).convert("RGBA")
    
    # Define targets
    targets = {
        "favicon-48x48.png": (48, 48),
        "favicon-96x96.png": (96, 96),
        "apple-touch-icon.png": (180, 180),
        "android-chrome-192x192.png": (192, 192),
        "android-chrome-512x512.png": (512, 512),
    }
    
    for filename, size in targets.items():
        resized = base_img.resize(size, Image.Resampling.LANCZOS)
        out_path = os.path.join(public_dir, filename)
        resized.save(out_path, format="PNG")
        print(f"Generated {filename} ({size[0]}x{size[1]})")
        
    # Generate favicon.ico (multi-size: 16, 32, 48)
    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_images = [base_img.resize(sz, Image.Resampling.LANCZOS) for sz in ico_sizes]
    ico_path = os.path.join(public_dir, "favicon.ico")
    ico_images[0].save(ico_path, format="ICO", sizes=ico_sizes)
    print(f"Generated favicon.ico with sizes: {ico_sizes}")
    
    # Cleanup temp files
    os.remove(temp_html)
    os.remove(temp_screenshot)
    print("Cleaned up temporary files successfully!")

if __name__ == "__main__":
    generate_favicons()
