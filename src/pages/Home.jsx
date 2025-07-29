// Home.jsx
import React, { useState, useEffect, Suspense, useRef } from "react";
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload, useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { createScreenTexture } from '../components/ScreenContent';
import './Home.css';

// Create a loader component using Three.js compatible elements
const Loader = () => {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

// The 3D model component
const Computer = ({ scale = 0.75, position = [0, -1.5, -1.5], initialRotation = [0.0, 0.0, 0.0] }) => {
  // Path to the 3D model
  const computer = useGLTF('/desktop_pc/scene.gltf');
  // Reference to the computer model for animation
  const computerRef = useRef();
  // Track if user is interacting with the model
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  // Store the last user-set rotation
  const lastUserRotation = useRef({ y: 0 });
  // Reference to the screen mesh
  const screenRef = useRef();
  // Reference to the screen texture and update function
  const screenTextureRef = useRef(null);

  // Create the screen texture once
  useEffect(() => {
    // Create the screen texture and get the update function
    const { texture, updateTexture } = createScreenTexture();
    screenTextureRef.current = { texture, updateTexture };
  }, []);

  // Animation speed (lower is slower, higher is faster)
  const animationSpeed = 0.5;

  // Add event listeners to detect user interaction
  useEffect(() => {
    const handlePointerDown = () => setIsUserInteracting(true);
    const handlePointerUp = () => {
      // After a short delay, resume animation
      setTimeout(() => {
        if (computerRef.current) {
          // Store the current rotation when user stops interacting
          lastUserRotation.current.y = computerRef.current.rotation.y;
        }
        setIsUserInteracting(false);
      }, 2000);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  // Use frame to animate the computer model and screen
  useFrame(({ clock }) => {
    // Animate the computer rotation
    if (computerRef.current && !isUserInteracting) {
      try {
        // Get elapsed time from the clock
        const elapsedTime = clock.getElapsedTime();

        // Use a simpler animation approach to avoid potential issues
        // This creates a continuous swing between the three positions

        // Calculate a value that oscillates between 0 and 1
        const t = (Math.sin(elapsedTime * animationSpeed) + 1) / 2;

        // Map this to our rotation range from -0.9 to 0.5
        // This gives us a smooth swing from left to right
        const rotationY = -0.9 + t * 1.4; // Maps 0-1 to -0.9-0.5

        // Apply the rotation
        computerRef.current.rotation.y = rotationY;
      } catch (error) {
        // Safely handle any errors that might occur during animation
        console.error("Animation error:", error);
      }
    }

    // Animate the screen content
    if (screenRef.current && screenRef.current.material && screenTextureRef.current) {
      try {
        const elapsedTime = clock.getElapsedTime();

        // Update the screen texture
        screenTextureRef.current.updateTexture(elapsedTime * 1000);

        // Create a subtle pulsing effect for the screen brightness
        const pulseIntensity = 0.8 + Math.sin(elapsedTime * 2) * 0.2;
        screenRef.current.material.emissiveIntensity = pulseIntensity;
      } catch (error) {
        console.error("Screen animation error:", error);
      }
    }
  });

  // Add RGB effects to the PC case and apply screen texture
  useEffect(() => {
    if (computer && computer.scene) {
      computer.scene.traverse((child) => {
        if (child.isMesh) {
          // Make the model receive shadows
          child.receiveShadow = true;
          child.castShadow = true;

          // Check if this is a screen part
          if (child.name.toLowerCase().includes('screen')) {
            // Store reference to the screen mesh
            screenRef.current = child;

            // Clone the material to avoid modifying the shared material
            child.material = child.material.clone();

            // Apply the screen texture if available
            if (screenTextureRef.current && screenTextureRef.current.texture) {
              child.material.map = screenTextureRef.current.texture;
              child.material.emissiveMap = screenTextureRef.current.texture;
            }

            // Set up material properties for the screen
            child.material.emissive = new THREE.Color(0xffffff);
            child.material.emissiveIntensity = 1;

            // Make sure the texture is visible
            child.material.transparent = true;
            child.material.opacity = 1;
            child.material.needsUpdate = true;
          }
          // Enhance materials for RGB effects on other specific parts
          else if (child.material &&
            (child.name.includes('fan') ||
              child.name.includes('light') ||
              child.name.includes('LED'))) {

            // Clone the material to avoid modifying the shared material
            child.material = child.material.clone();

            // Increase emissive properties for RGB parts
            child.material.emissive = new THREE.Color(0x00ffff);
            child.material.emissiveIntensity = 2;
          }
        }
      });
    }
  }, [computer]);

  // Add RGB effects to the PC case and apply screen texture
  useEffect(() => {
    if (computer.scene) {
      // Process the computer model
      computer.scene.traverse((child) => {
        if (child.isMesh) {
          // Find the screen mesh to apply our texture
          if (child.name.includes('screen') || child.name.includes('Screen') || child.name.includes('monitor')) {
            screenRef.current = child;
            
            // Apply screen material with our texture
            if (screenTextureRef.current) {
              child.material = new THREE.MeshBasicMaterial({
                map: screenTextureRef.current.texture,
                emissive: new THREE.Color(0xffffff),
                emissiveMap: screenTextureRef.current.texture,
                emissiveIntensity: 0.8
              });
            }
          }
          
          // Change keyboard color
          else if (child.name.includes('keyboard') || child.name.includes('Keyboard')) {
            child.material = child.material.clone();
            child.material.color = new THREE.Color(0x20b5ff); // Cyberpunk blue color
            child.material.emissive = new THREE.Color(0x20b5ff);
            child.material.emissiveIntensity = 0.5;
          }
          
          // Change mouse color
          else if (child.name.includes('mouse') || child.name.includes('Mouse')) {
            child.material = child.material.clone();
            child.material.color = new THREE.Color(0x20b5ff); // Matching blue color
            child.material.emissive = new THREE.Color(0x20b5ff);
            child.material.emissiveIntensity = 0.5;
          }
          
          // Add Rifad branding to the case
          else if (child.name.includes('case') || child.name.includes('Case') || 
                  child.name.includes('tower') || child.name.includes('Tower')) {
            // Create a canvas for the brand texture with increased size
            const brandCanvas = document.createElement('canvas');
            brandCanvas.width = 1024; // Doubled size for higher resolution
            brandCanvas.height = 256;
            const brandCtx = brandCanvas.getContext('2d');
            
            // Clear canvas with transparent background
            brandCtx.clearRect(0, 0, brandCanvas.width, brandCanvas.height);
            
            // Add a glowing background to make the text stand out
            const gradient = brandCtx.createRadialGradient(
              brandCanvas.width/2, brandCanvas.height/2, 10,
              brandCanvas.width/2, brandCanvas.height/2, 150
            );
            gradient.addColorStop(0, 'rgba(255, 153, 0, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 153, 0, 0)');
            brandCtx.fillStyle = gradient;
            brandCtx.fillRect(0, 0, brandCanvas.width, brandCanvas.height);
            
            // Draw Rifad logo/text with glow effect
            brandCtx.shadowColor = '#ff9900';
            brandCtx.shadowBlur = 30;
            brandCtx.fillStyle = '#ffffff';
            brandCtx.font = 'bold 120px Arial, sans-serif'; // Larger font
            brandCtx.textAlign = 'center';
            brandCtx.textBaseline = 'middle';
            brandCtx.fillText('RIFAD', brandCanvas.width/2, brandCanvas.height/2);
            
            // Create texture from canvas
            const brandTexture = new THREE.CanvasTexture(brandCanvas);
            
            // Make the texture repeat to increase chances of visibility
            brandTexture.wrapS = THREE.RepeatWrapping;
            brandTexture.wrapT = THREE.RepeatWrapping;
            brandTexture.repeat.set(1, 1);
            
            // Clone the material to avoid affecting other meshes
            const originalMaterial = child.material.clone();
            
            // Create a new material with stronger emission
            child.material = new THREE.MeshStandardMaterial({
              map: originalMaterial.map,
              color: originalMaterial.color,
              metalness: originalMaterial.metalness,
              roughness: originalMaterial.roughness,
              normalMap: originalMaterial.normalMap,
              emissive: new THREE.Color(0xff9900),
              emissiveMap: brandTexture,
              emissiveIntensity: 2.0, // Increased intensity
              transparent: true,
              opacity: 1.0
            });
            
            // Add a second mesh as a decal on top of the case for better visibility
            try {
              // Create a simple plane geometry for the decal
              const decalGeometry = new THREE.PlaneGeometry(2, 0.5);
              const decalMaterial = new THREE.MeshBasicMaterial({
                map: brandTexture,
                transparent: true,
                opacity: 1,
                side: THREE.DoubleSide,
                depthTest: true
              });
              
              // Create the decal mesh
              const decal = new THREE.Mesh(decalGeometry, decalMaterial);
              
              // Position the decal on the front of the case
              // These values may need adjustment based on your model
              decal.position.set(0, 0, 1); // Position it slightly in front
              decal.rotation.set(0, 0, 0);
              
              // Add the decal as a child of the case
              child.add(decal);
            } catch (error) {
              console.error("Error adding decal:", error);
            }
          }

          // Look for any other branding elements on the model
          else if (child.name.includes('logo') || child.name.includes('Logo') || 
                  child.name.includes('brand') || child.name.includes('Brand') ||
                  child.name.includes('text') || child.name.includes('Text')) {
            
            // Create a canvas for the brand texture
            const logoCanvas = document.createElement('canvas');
            logoCanvas.width = 300;
            logoCanvas.height = 256;
            const logoCtx = logoCanvas.getContext('2d');
            
            // Clear canvas with transparent background
            logoCtx.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
            
            // Draw Rifad logo/text
            logoCtx.fillStyle = '#ffffff';
            logoCtx.font = 'bold 100px Arial, sans-serif';
            logoCtx.textAlign = 'center';
            logoCtx.textBaseline = 'middle';
            logoCtx.fillText('RIFAD', logoCanvas.width/2, logoCanvas.height/1.5);
            
            // Create texture from canvas
            const logoTexture = new THREE.CanvasTexture(logoCanvas);
            
            // Apply to the material
            child.material = child.material.clone();
            child.material.map = logoTexture;
            child.material.emissive = new THREE.Color(0xff9900);
            child.material.emissiveMap = logoTexture;
            child.material.emissiveIntensity = 0.8;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [computer]);

  return (
    <group>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[0, 50, 10]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1.5} position={[10, 10, 10]} color="#ff3e88" />
      <pointLight intensity={1.5} position={[-10, 10, 10]} color="#0099ff" />
      <primitive
        ref={computerRef}
        object={computer.scene}
        scale={scale}
        position={position}
        rotation={initialRotation}
        receiveShadow
        castShadow
      />
    </group>
  );
};

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const textArray = [
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Python Developer",
    "Next.js Developer",
    "Vite Developer"
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const text = textArray[currentTextIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayText === text) {
      // Pause at the end of typing
      setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayText === '') {
      // Move to the next text after deleting
      setIsDeleting(false);
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    } else {
      // Typing or deleting animation
      const timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? text.substring(0, displayText.length - 1)
            : text.substring(0, displayText.length + 1)
        );
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [displayText, currentTextIndex, isDeleting, textArray]);

  return (
    <section className="home-container">
      <div className={`home-content ${isLoaded ? 'loaded' : ''}`}>
        <div className="hero-section">
          <div className="text-content">
            <h1 className="greeting">Hello, I'm <span className="name">Muhammed Rifad KP</span></h1>
            <h2 className="role">
              <span className="static-text">I'm a </span>
              <span className="dynamic-text">{displayText}</span>
              <span className="cursor">|</span>
            </h2>
            <p className="bio">
              Passionate about creating elegant solutions to complex problems.
              I specialize in building full-stack applications with modern technologies
              that deliver exceptional user experiences.
            </p>

            <div className="cta-buttons">
              <Link
                to="/projects"
                className="primary-btn"
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              >
                View My Work
              </Link>
              <Link
                to="/contact"
                className="secondary-btn"
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              >
                Get In Touch
              </Link>
              <a href="/Muhammed-Rifad-KP-Resume-.pdf" target="_blank" rel="noopener noreferrer" className="outline-btn">
                <i className="fas fa-download"></i> Resume
              </a>
            </div>

            <div className="social-links">
              <a href="https://github.com/muhammedrifadkp" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/muhammed-rifad-64a7172b9" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="mailto:muhammedrifadkp3@gmail.com" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>



          <div className="model-container">
            <Canvas
              frameloop="always"
              shadows
              dpr={[1, 2]}
              camera={{ position: [15, 2, 5], fov: 30 }}
              gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
              style={{ background: '#0a0a14' }}
              onCreated={({ gl }) => {
                gl.setClearColor('#0a0a14', 1);
              }}
            >
              <color attach="background" args={['#0a0a14']} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[1, 1, 1]} intensity={1.5} />
              <spotLight
                position={[5, 10, 7]}
                angle={0.3}
                penumbra={1}
                intensity={2}
                castShadow
                color="#ff3e88"
              />
              <spotLight
                position={[-5, 10, 7]}
                angle={0.3}
                penumbra={1}
                intensity={2}
                castShadow
                color="#0099ff"
              />

              <Suspense fallback={<Loader />}>
                <Computer
                  scale={0.45}
                  position={[0, -1.0, -1.0]}
                  initialRotation={[0.0, 0.0, 0.0]}
                />
                <OrbitControls
                  enableZoom={true}
                  enablePan={true}
                  enableRotate={true}
                  zoomSpeed={0.6}
                  panSpeed={0.5}
                  rotateSpeed={0.4}
                  minDistance={2}
                  maxDistance={10}
                  dampingFactor={0.1}
                  enableDamping={true}
                  target={[0, -0.5, 0]}
                />
              </Suspense>

              <Preload all />
            </Canvas>
          </div>


        </div>
        <div className="tech-stack">
          <h3 className="section-title">My Tech Stack</h3>
          <div className="tech-icons">
            <div className="tech-icon" title="React">
              <i className="fab fa-react"></i>
              <span>React</span>
            </div>
            <div className="tech-icon" title="Next.js">
              <i className="fab fa-react"></i>
              <span>Next.js</span>
            </div>
            <div className="tech-icon" title="Node.js">
              <i className="fab fa-node-js"></i>
              <span>Node.js</span>
            </div>
            <div className="tech-icon" title="Python">
              <i className="fab fa-python"></i>
              <span>Python</span>
            </div>
            <div className="tech-icon" title="JavaScript">
              <i className="fab fa-js"></i>
              <span>JavaScript</span>
            </div>
            <div className="tech-icon" title="HTML/CSS">
              <i className="fab fa-html5"></i>
              <span>HTML/CSS</span>
            </div>
            <div className="tech-icon" title="Bootstrap">
              <i className="fab fa-bootstrap"></i>
              <span>Bootstrap</span>
            </div>
            <div className="tech-icon" title="Tailwind CSS">
              <i className="fab fa-css3-alt"></i>
              <span>Tailwind CSS</span>
            </div>
            <div className="tech-icon" title="MongoDB">
              <i className="fas fa-database"></i>
              <span>MongoDB</span>
            </div>
            <div className="tech-icon" title="Vite">
              <i className="fas fa-bolt"></i>
              <span>Vite</span>
            </div>
          </div>
        </div>

        <div className="portfolio-stats">
          <h3 className="section-title">Portfolio Highlights</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">12+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5+</div>
              <div className="stat-label">Technologies Mastered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3+</div>
              <div className="stat-label">Live Applications</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>

        <div className="featured-projects">
          <h3 className="section-title">Featured Projects</h3>
          <div className="project-cards">
            <div className="project-card" onClick={() => window.open('https://cdc-attendance-com.vercel.app', '_blank')}>
              <div className="project-image">
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop&crop=center" alt="CDC Attendance" />
              </div>
              <div className="project-info">
                <h4>CDC Attendance Management System</h4>
                <p>Comprehensive digital attendance management system for educational institutes with enterprise security, lab management, and advanced analytics.</p>
                <div className="project-tags">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                  <span>JWT</span>
                </div>
              </div>
            </div>

            <div className="project-card" onClick={() => window.open('https://www.zuditt.com/', '_blank')}>
              <div className="project-image">
                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop&crop=center" alt="Zuditt AI" />
              </div>
              <div className="project-info">
                <h4>Zuditt AI Innovation LLP</h4>
                <p>AI-driven business solutions platform offering web development, digital marketing, BPO services, and innovative technology solutions.</p>
                <div className="project-tags">
                  <span>Next.js</span>
                  <span>TypeScript</span>
                  <span>AI Integration</span>
                  <span>WhatsApp API</span>
                </div>
              </div>
            </div>

            <div className="project-card" onClick={() => window.open('https://my-ecommerce-black.vercel.app/', '_blank')}>
              <div className="project-image">
                <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop&crop=center" alt="FreshMarket E-commerce" />
              </div>
              <div className="project-info">
                <h4>FreshMarket E-commerce Platform</h4>
                <p>Modern e-commerce platform with product categories, shopping cart, user accounts, admin panel, and WhatsApp checkout integration.</p>
                <div className="project-tags">
                  <span>Next.js</span>
                  <span>Express</span>
                  <span>MongoDB</span>
                  <span>WhatsApp API</span>
                </div>
              </div>
            </div>
          </div>
          <div className="view-all-projects">
            <Link
              to="/projects"
              className="view-all-btn"
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
            >
              View All Projects
            </Link>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="scroll-text">Scroll Down</div>
      </div>
    </section>
  );
};

export default Home;




