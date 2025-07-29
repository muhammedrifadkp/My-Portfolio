import React, { useState, Suspense, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './Navbar.css';
import logoModel from '../assets/3d/RIFAD_logo_texture_3D.glb';

// Enhanced 3D Logo Component with Auto-Reset
const Logo3D = ({ controlsRef, onStateChange }) => {
  const { scene } = useGLTF(logoModel);
  const logoRef = useRef();
  const [isUserControlling, setIsUserControlling] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  // Default camera position and target
  const defaultCameraPosition = [0, 0, 5];
  const defaultTarget = [0, 0, 0];
  const resetDuration = 1500; // 1.5 seconds for smooth reset animation
  const autoResetDelay = 5000; // 5 seconds after last interaction

  // Clone the scene and configure for top-level rendering
  const processedScene = React.useMemo(() => {
    const cloned = scene.clone();

    // Traverse all meshes in the 3D model and set rendering properties
    cloned.traverse((child) => {
      if (child.isMesh) {
        // Ensure the mesh is always rendered on top
        child.renderOrder = 9999;
        child.frustumCulled = false;

        // Set material properties for better visibility and top rendering
        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach(mat => {
            mat.depthTest = true;
            mat.depthWrite = true;
            mat.transparent = false;
            mat.alphaTest = 0;
            mat.side = 2; // DoubleSide to ensure visibility from all angles
            mat.needsUpdate = true;
          });
        }
      }
    });

    return cloned;
  }, [scene]);

  // Track user interaction with controls
  useEffect(() => {
    if (controlsRef.current) {
      const controls = controlsRef.current;

      const handleStart = () => {
        setIsUserControlling(true);
        setIsResetting(false);
        onStateChange?.({ isUserControlling: true, isResetting: false });
      };

      const handleEnd = () => {
        setIsUserControlling(false);
        setLastInteractionTime(Date.now());
        onStateChange?.({ isUserControlling: false, isResetting: false });
      };

      const handleChange = () => {
        if (!isResetting) {
          setLastInteractionTime(Date.now());
        }
      };

      controls.addEventListener('start', handleStart);
      controls.addEventListener('end', handleEnd);
      controls.addEventListener('change', handleChange);

      return () => {
        controls.removeEventListener('start', handleStart);
        controls.removeEventListener('end', handleEnd);
        controls.removeEventListener('change', handleChange);
      };
    }
  }, [controlsRef, isResetting]);

  // Ensure 3D model is always rendered on top after mounting
  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.traverse((child) => {
        if (child.isMesh) {
          child.renderOrder = 9999;
          child.frustumCulled = false;

          if (child.material) {
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            materials.forEach(mat => {
              mat.depthTest = true;
              mat.depthWrite = true;
              mat.transparent = false;
              mat.alphaTest = 0;
              mat.side = 2; // DoubleSide for visibility from all angles
              mat.needsUpdate = true;
            });
          }
        }
      });
    }
  }, [scene]);

  // Auto-reset logic and animations
  useFrame((state) => {
    if (logoRef.current && controlsRef.current) {
      const time = state.clock.getElapsedTime();
      const currentTime = Date.now();

      // Check if we should start auto-reset
      if (!isUserControlling && !isResetting && lastInteractionTime > 0) {
        const timeSinceLastInteraction = currentTime - lastInteractionTime;
        if (timeSinceLastInteraction >= autoResetDelay) {
          setIsResetting(true);
          onStateChange?.({ isUserControlling: false, isResetting: true });
        }
      }

      // Handle reset animation
      if (isResetting && controlsRef.current) {
        const controls = controlsRef.current;
        const camera = state.camera;

        // Smoothly animate camera back to default position
        const resetProgress = Math.min((currentTime - (lastInteractionTime + autoResetDelay)) / resetDuration, 1);
        const easeProgress = 1 - Math.pow(1 - resetProgress, 4); // Ease-out quartic for smoother animation

        // Interpolate camera position
        camera.position.lerp({
          x: defaultCameraPosition[0],
          y: defaultCameraPosition[1],
          z: defaultCameraPosition[2]
        }, easeProgress * 0.1);

        // Interpolate controls target
        controls.target.lerp({
          x: defaultTarget[0],
          y: defaultTarget[1],
          z: defaultTarget[2]
        }, easeProgress * 0.1);

        controls.update();

        // Complete reset
        if (resetProgress >= 1) {
          setIsResetting(false);
          setLastInteractionTime(0);
          onStateChange?.({ isUserControlling: false, isResetting: false });
        }
      }

      // Default swing animation when not being controlled
      if (!isUserControlling && !isResetting) {
        // Create a swinging motion on Y-axis
        logoRef.current.rotation.y = Math.sin(time * 1.5) * 0.3; // Swing left and right
        // Optional: Add slight Z-axis swing for more natural movement
        logoRef.current.rotation.z = Math.sin(time * 1.2) * 0.1; // Subtle tilt swing
      }
    }
  });



  return (
    <primitive
      ref={logoRef}
      object={processedScene}
      scale={[3, 3, 3]}
      position={[0, 0, 0]}
    />
  );
};

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const controlsRef = useRef();
  const [logoState, setLogoState] = useState({ isUserControlling: false, isResetting: false });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = () => {
    closeMenu();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={handleNavClick}>
          <div className={`logo-3d-container ${logoState.isUserControlling ? 'user-controlling' : ''} ${logoState.isResetting ? 'resetting' : ''}`}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.6} />
              <directionalLight position={[2, 2, 2]} intensity={1} />
              <Suspense fallback={null}>
                <OrbitControls
                  ref={controlsRef}
                  enableZoom={true}
                  enablePan={false}
                  enableRotate={true}
                  enableDamping={true}
                  dampingFactor={0.05}
                />
                <Logo3D controlsRef={controlsRef} onStateChange={setLogoState} />
              </Suspense>
            </Canvas>
          </div>
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/projects"
              className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/features"
              className={`nav-link ${location.pathname === '/features' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Features
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/ai"
              className={`nav-link ${location.pathname === '/ai' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Rifad AI
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact"
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Contact
            </Link>
          </li>
        </ul>

        <button className={`toggle-btn ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="hamburger-line-one"></span>
          <span className="hamburger-line-two"></span>
        </button>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-data">
          <ul>
            <li>
              <Link
                to="/"
                className={location.pathname === '/' ? 'active' : ''}
                onClick={handleNavClick}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={location.pathname === '/about' ? 'active' : ''}
                onClick={handleNavClick}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={location.pathname === '/projects' ? 'active' : ''}
                onClick={handleNavClick}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className={location.pathname === '/features' ? 'active' : ''}
                onClick={handleNavClick}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/ai"
                className={location.pathname === '/ai' ? 'active' : ''}
                onClick={handleNavClick}
              >
                Rifad AI
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={location.pathname === '/contact' ? 'active' : ''}
                onClick={handleNavClick}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
