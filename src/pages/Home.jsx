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

  // Add RGB effects, custom screen texture, and seamless RIFAD branding to PC case
  useEffect(() => {
    if (!computer || !computer.scene) return;

    // Create a high-res glowing RIFAD brand texture for PC case
    const brandCanvas = document.createElement('canvas');
    brandCanvas.width = 1024;
    brandCanvas.height = 256;
    const brandCtx = brandCanvas.getContext('2d');

    brandCtx.clearRect(0, 0, brandCanvas.width, brandCanvas.height);
    
    // Draw subtle neon glow line behind text
    const grad = brandCtx.createLinearGradient(0, 0, brandCanvas.width, 0);
    grad.addColorStop(0, '#00f0ff');
    grad.addColorStop(0.5, '#7000ff');
    grad.addColorStop(1, '#ff007a');

    brandCtx.shadowColor = '#00f0ff';
    brandCtx.shadowBlur = 20;
    brandCtx.fillStyle = '#ffffff';
    brandCtx.font = '900 110px "Arial Black", sans-serif';
    brandCtx.textAlign = 'center';
    brandCtx.textBaseline = 'middle';
    brandCtx.fillText('RIFAD', brandCanvas.width / 2, brandCanvas.height / 2);

    const brandTexture = new THREE.CanvasTexture(brandCanvas);
    brandTexture.wrapS = THREE.ClampToEdgeWrapping;
    brandTexture.wrapT = THREE.ClampToEdgeWrapping;

    computer.scene.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
        child.castShadow = true;

        const nameLower = child.name.toLowerCase();

        // 1. Screen Monitor
        if (nameLower.includes('screen') || nameLower.includes('monitor')) {
          screenRef.current = child;
          if (screenTextureRef.current && screenTextureRef.current.texture) {
            child.material = new THREE.MeshBasicMaterial({
              map: screenTextureRef.current.texture,
              toneMapped: false
            });
          }
        }

        // 2. Keyboard
        else if (nameLower.includes('keyboard')) {
          child.material = child.material.clone();
          child.material.color = new THREE.Color(0x00f0ff);
          child.material.emissive = new THREE.Color(0x00f0ff);
          child.material.emissiveIntensity = 0.4;
        }

        // 3. Mouse
        else if (nameLower.includes('mouse')) {
          child.material = child.material.clone();
          child.material.color = new THREE.Color(0xff007a);
          child.material.emissive = new THREE.Color(0xff007a);
          child.material.emissiveIntensity = 0.4;
        }

        // 4. Fans, Cooler & LEDs
        else if (nameLower.includes('fan') || nameLower.includes('light') || nameLower.includes('led') || nameLower.includes('cooler')) {
          child.material = child.material.clone();
          child.material.emissive = new THREE.Color(0x00f0ff);
          child.material.emissiveIntensity = 1.8;
        }

        // 5. PC Case & Tower - Apply glowing RIFAD brand directly on material (no mid-air floating meshes)
        else if (nameLower.includes('case') || nameLower.includes('tower') || nameLower.includes('logo') || nameLower.includes('brand')) {
          child.material = child.material.clone();
          child.material.emissive = new THREE.Color(0x00f0ff);
          child.material.emissiveMap = brandTexture;
          child.material.emissiveIntensity = 0.8;
        }
      }
    });
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
    "Full Stack MERN Developer",
    "Next.js & React Architect",
    "Node.js & Express Specialist",
    "UI/UX Web Engineer",
    "Full-Stack Instructor"
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
      {/* Background ambient decorative glowing orbs */}
      <div className="bg-glow-orb orb-1"></div>
      <div className="bg-glow-orb orb-2"></div>
      <div className="bg-grid-pattern"></div>

      <div className={`home-content ${isLoaded ? 'loaded' : ''}`}>
        <div className="hero-section">
          <div className="text-content">
            <h1 className="greeting">
              Hello, I'm <br />
              <span className="name">Muhammed Rifad KP</span>
            </h1>

            <h2 className="role">
              <span className="static-text">I build </span>
              <span className="dynamic-text">{displayText}</span>
              <span className="cursor">|</span>
            </h2>

            <p className="bio">
              I am <strong>Muhammed Rifad KP</strong>, a Full Stack Developer & 3D Web Specialist based in Kerala, India specializing in <strong>MERN stack & Next.js</strong>. 
              Delivered <strong>10+ live production web applications</strong> across e-commerce, 
              real estate, and healthcare with 2+ years of full-stack engineering mentorship experience.
            </p>

            <div className="hero-stats-chips">
              <div className="stat-chip">
                <span className="stat-val">10+</span>
                <span className="stat-lbl">Deployed Projects</span>
              </div>
              <div className="stat-chip">
                <span className="stat-val">2+ Yrs</span>
                <span className="stat-lbl">Training & Mentorship</span>
              </div>
              <div className="stat-chip">
                <span className="stat-val">100%</span>
                <span className="stat-lbl">Production Delivery</span>
              </div>
            </div>

            <div className="cta-buttons">
              <Link
                to="/projects"
                className="primary-btn"
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              >
                <span>View My Work</span> <i className="fas fa-arrow-right"></i>
              </Link>
              <Link
                to="/contact"
                className="secondary-btn"
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              >
                Get In Touch
              </Link>
              <a 
                href="/Muhammed_Rifad_KP_Resume.docx" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="outline-btn"
                download
              >
                <i className="fas fa-file-download"></i> Download CV
              </a>
            </div>

            <div className="social-links">
              <a href="https://github.com/muhammedrifadkp" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/muhammed-rifad-64a7172b9" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://www.instagram.com/mohd_rifad_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://wa.me/917356852496" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="mailto:muhammedrifadkp3@gmail.com" aria-label="Email" title="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>

          <div className="modern-3d-wrapper">
            <div className="glow-backdrop"></div>

            <div className="model-container">
              <Canvas
                frameloop="always"
                shadows
                dpr={[1, 2]}
                camera={{ position: [14, 1.8, 4.8], fov: 34 }}
                gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
                onCreated={({ gl }) => {
                  gl.setClearColor(0x000000, 0);
                }}
              >
                <ambientLight intensity={0.75} />
                <directionalLight position={[2, 4, 3]} intensity={1.8} color="#ffffff" />
                <spotLight
                  position={[8, 12, 8]}
                  angle={0.35}
                  penumbra={1}
                  intensity={2.5}
                  castShadow
                  color="#00f0ff"
                />
                <spotLight
                  position={[-8, 12, 8]}
                  angle={0.35}
                  penumbra={1}
                  intensity={2.5}
                  castShadow
                  color="#ff007a"
                />

                <Suspense fallback={<Loader />}>
                  <Computer
                    scale={0.39}
                    position={[0, -0.9, -0.5]}
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
                    target={[0, -0.4, 0]}
                  />
                </Suspense>

                <Preload all />
              </Canvas>
            </div>
          </div>
        </div>

        <div className="tech-stack">
          <div className="tech-stack-header">
            <span className="section-badge">⚡ Core Competencies</span>
            <h3 className="section-title">My Technical Stack</h3>
            <p className="section-subtitle">
              Technologies & frameworks I leverage to architect high-performance, production-ready web applications.
            </p>
          </div>

          <div className="tech-grid">
            <div className="tech-card" style={{ '--brand-color': '#61DAFB' }}>
              <div className="tech-card-glow"></div>
              <span className="tech-category">Frontend</span>
              <div className="tech-icon-wrapper">
                <i className="fab fa-react"></i>
              </div>
              <h4 className="tech-name">React.js</h4>
              <span className="tech-tag">React 18 & Hooks</span>
            </div>

            <div className="tech-card" style={{ '--brand-color': '#00f0ff' }}>
              <div className="tech-card-glow"></div>
              <span className="tech-category">Full Stack</span>
              <div className="tech-icon-wrapper">
                <i className="fas fa-cubes"></i>
              </div>
              <h4 className="tech-name">Next.js</h4>
              <span className="tech-tag">App Router & SSR</span>
            </div>

            <div className="tech-card" style={{ '--brand-color': '#68A063' }}>
              <div className="tech-card-glow"></div>
              <span className="tech-category">Backend</span>
              <div className="tech-icon-wrapper">
                <i className="fab fa-node-js"></i>
              </div>
              <h4 className="tech-name">Node.js</h4>
              <span className="tech-tag">Runtime & Async</span>
            </div>

            <div className="tech-card" style={{ '--brand-color': '#00E676' }}>
              <div className="tech-card-glow"></div>
              <span className="tech-category">Backend</span>
              <div className="tech-icon-wrapper">
                <i className="fas fa-server"></i>
              </div>
              <h4 className="tech-name">Express.js</h4>
              <span className="tech-tag">RESTful APIs</span>
            </div>

            <div className="tech-card" style={{ '--brand-color': '#47A248' }}>
              <div className="tech-card-glow"></div>
              <span className="tech-category">Database</span>
              <div className="tech-icon-wrapper">
                <i className="fas fa-database"></i>
              </div>
              <h4 className="tech-name">MongoDB</h4>
              <span className="tech-tag">NoSQL & Mongoose</span>
            </div>

            <div className="tech-card" style={{ '--brand-color': '#F7DF1E' }}>
              <div className="tech-card-glow"></div>
              <span className="tech-category">Language</span>
              <div className="tech-icon-wrapper">
                <i className="fab fa-js"></i>
              </div>
              <h4 className="tech-name">JavaScript</h4>
              <span className="tech-tag">ES6+ & Async JS</span>
            </div>

            <div className="tech-card" style={{ '--brand-color': '#38BDF8' }}>
              <div className="tech-card-glow"></div>
              <span className="tech-category">Styling</span>
              <div className="tech-icon-wrapper">
                <i className="fab fa-css3-alt"></i>
              </div>
              <h4 className="tech-name">Tailwind CSS</h4>
              <span className="tech-tag">Utility-First UI</span>
            </div>

            <div className="tech-card" style={{ '--brand-color': '#E2E8F0' }}>
              <div className="tech-card-glow"></div>
              <span className="tech-category">Deployment</span>
              <div className="tech-icon-wrapper">
                <i className="fas fa-cloud-upload-alt"></i>
              </div>
              <h4 className="tech-name">Vercel</h4>
              <span className="tech-tag">CI/CD & Hosting</span>
            </div>

            <div className="tech-card" style={{ '--brand-color': '#A855F7' }}>
              <div className="tech-card-glow"></div>
              <span className="tech-category">Architecture</span>
              <div className="tech-icon-wrapper">
                <i className="fas fa-network-wired"></i>
              </div>
              <h4 className="tech-name">REST APIs</h4>
              <span className="tech-tag">Secure Endpoints</span>
            </div>

            <div className="tech-card" style={{ '--brand-color': '#F05032' }}>
              <div className="tech-card-glow"></div>
              <span className="tech-category">Tools</span>
              <div className="tech-icon-wrapper">
                <i className="fab fa-github"></i>
              </div>
              <h4 className="tech-name">Git & GitHub</h4>
              <span className="tech-tag">Version Control</span>
            </div>
          </div>
        </div>

        <div className="portfolio-stats">
          <div className="stats-header">
            <span className="section-badge">📈 Proven Track Record</span>
            <h3 className="section-title">Professional Impact</h3>
            <p className="section-subtitle">
              Quantifiable engineering achievements across production web applications and technical instruction.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card" style={{ '--accent-color': '#00F0FF' }}>
              <div className="stat-card-glow"></div>
              <div className="stat-icon"><i className="fas fa-rocket"></i></div>
              <div className="stat-number">10+</div>
              <div className="stat-label">Production Apps Deployed</div>
              <p className="stat-desc">Full-featured MERN & Next.js platforms shipped to live production domains.</p>
            </div>

            <div className="stat-card" style={{ '--accent-color': '#7000FF' }}>
              <div className="stat-card-glow"></div>
              <div className="stat-icon"><i className="fas fa-chalkboard-teacher"></i></div>
              <div className="stat-number">2+ Yrs</div>
              <div className="stat-label">Full Stack Instructor</div>
              <p className="stat-desc">2+ years mentoring developers in HTML, CSS, JS, React & Node at CADD Centre.</p>
            </div>

            <div className="stat-card" style={{ '--accent-color': '#FF007A' }}>
              <div className="stat-card-glow"></div>
              <div className="stat-icon"><i className="fas fa-globe-americas"></i></div>
              <div className="stat-number">2</div>
              <div className="stat-label">Global Markets</div>
              <p className="stat-desc">Delivered platforms for clients across the UAE (Dubai/Abu Dhabi) & India.</p>
            </div>

            <div className="stat-card" style={{ '--accent-color': '#00E676' }}>
              <div className="stat-card-glow"></div>
              <div className="stat-icon"><i className="fas fa-award"></i></div>
              <div className="stat-number">100%</div>
              <div className="stat-label">Client Satisfaction</div>
              <p className="stat-desc">High performance, responsive UI, dynamic search filtering, and on-time delivery.</p>
            </div>
          </div>
        </div>

        <div className="featured-projects">
          <div className="projects-header">
            <span className="section-badge">💻 Production Portfolio</span>
            <h3 className="section-title">Featured Production Work</h3>
            <p className="section-subtitle">
              Live web applications & enterprise platforms engineered and deployed for clients across UAE & India.
            </p>
          </div>

          <div className="project-cards">
            <div className="project-card" onClick={() => window.open('https://ztoiq.com/', '_blank')}>
              <div className="project-image">
                <img src="/screenshots/ztoiq.png" alt="Ztoiq E-Commerce" />
                <div className="project-overlay">
                  <span>Visit Live App <i className="fas fa-external-link-alt"></i></span>
                </div>
              </div>
              <div className="project-info">
                <span className="project-category">Full Stack & E-Commerce</span>
                <h4>Ztoiq — Modern E-Commerce Platform</h4>
                <p>Full-featured e-commerce web application featuring dynamic product catalog browsing, shopping cart workflows, and secure online checkout.</p>
                <div className="project-tags">
                  <span>Next.js</span>
                  <span>React</span>
                  <span>E-Commerce</span>
                  <span>Tailwind CSS</span>
                </div>
              </div>
            </div>

            <div className="project-card" onClick={() => window.open('https://agstarautomobiles.vercel.app', '_blank')}>
              <div className="project-image">
                <img src="/screenshots/agstarautomobiles.png" alt="AG Star Automobiles" />
                <div className="project-overlay">
                  <span>Visit Live App <i className="fas fa-external-link-alt"></i></span>
                </div>
              </div>
              <div className="project-info">
                <span className="project-category">E-Commerce Platform</span>
                <h4>AG Star Automobiles</h4>
                <p>Full-featured motorcycle accessories platform with dynamic "Bike Finder" compatibility search, custom filtering, and shopping cart integration.</p>
                <div className="project-tags">
                  <span>Next.js</span>
                  <span>React</span>
                  <span>Vercel</span>
                  <span>E-Commerce</span>
                </div>
              </div>
            </div>

            <div className="project-card" onClick={() => window.open('https://zhmrealestatellc.ae', '_blank')}>
              <div className="project-image">
                <img src="/screenshots/zhmrealestatellc.png" alt="ZHM Real Estate LLC" />
                <div className="project-overlay">
                  <span>Visit Live App <i className="fas fa-external-link-alt"></i></span>
                </div>
              </div>
              <div className="project-info">
                <span className="project-category">Real Estate Portal</span>
                <h4>ZHM Real Estate LLC — Dubai & Abu Dhabi</h4>
                <p>Multi-region luxury real estate showcase for Dubai & Abu Dhabi markets with dynamic property search, lead capture, and SEO optimization.</p>
                <div className="project-tags">
                  <span>Next.js</span>
                  <span>React</span>
                  <span>Lead Gen</span>
                  <span>SEO</span>
                </div>
              </div>
            </div>

            <div className="project-card" onClick={() => window.open('https://cdc-attendance-com.vercel.app', '_blank')}>
              <div className="project-image">
                <img src="/screenshots/cdc-attendance.png" alt="CDC Attendance System" />
                <div className="project-overlay">
                  <span>Visit Live App <i className="fas fa-external-link-alt"></i></span>
                </div>
              </div>
              <div className="project-info">
                <span className="project-category">Enterprise Web App</span>
                <h4>CDC Attendance System</h4>
                <p>Enterprise digital attendance system for educational institutes featuring secure role-based auth, REST APIs, and structured MongoDB database.</p>
                <div className="project-tags">
                  <span>MERN Stack</span>
                  <span>MongoDB</span>
                  <span>Express</span>
                  <span>JWT Auth</span>
                </div>
              </div>
            </div>

            <div className="project-card" onClick={() => window.open('https://businesssetup.ad-firms.com', '_blank')}>
              <div className="project-image">
                <img src="/screenshots/adfirms.png" alt="Ad Firms UAE" />
                <div className="project-overlay">
                  <span>Visit Live App <i className="fas fa-external-link-alt"></i></span>
                </div>
              </div>
              <div className="project-info">
                <span className="project-category">Consultancy Lead-Gen</span>
                <h4>Ad Firms — UAE Business Setup</h4>
                <p>High-converting Dubai consultancy platform with dynamic pricing packages (Mainland, Freezone), WhatsApp business chat, and lead capture funnels.</p>
                <div className="project-tags">
                  <span>Next.js</span>
                  <span>WhatsApp API</span>
                  <span>Lead Gen</span>
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
              <span>Explore All Projects</span> <i className="fas fa-arrow-right"></i>
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




