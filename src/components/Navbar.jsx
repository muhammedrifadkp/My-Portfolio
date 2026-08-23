import React, { useState, Suspense, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './Navbar.css';
import logoModel from '../assets/3d/RIFAD_logo_texture_3D.glb';

useGLTF.preload(logoModel);
// WebGL Error Boundary to catch 3D context crashes gracefully
class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("WebGL Error caught in Navbar:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="logo-fallback-2d">
          <span className="logo-text">RIFAD</span>
        </div>
      );
    }
    return this.props.children;
  }
}

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
  const isSyllabusPage = location.pathname.startsWith('/syllabus');
  const isBatchDetailPage = location.pathname.startsWith('/syllabus/') && location.pathname !== '/syllabus';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide navbar on individual batch pages (/syllabus/:id) - Placed after all hooks!
  if (isBatchDetailPage) {
    return null;
  }

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
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isSyllabusPage ? 'syllabus-navbar' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <div className={`logo-3d-container ${logoState.isUserControlling ? 'user-controlling' : ''} ${logoState.isResetting ? 'resetting' : ''}`}>
            <WebGLErrorBoundary>
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
            </WebGLErrorBoundary>
          </div>
        </div>

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
              to="/syllabus"
              className={`nav-link ${location.pathname.startsWith('/syllabus') ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Syllabus
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
          <li className="nav-item">
            <Link
              to="/survey"
              className={`nav-btn-link ${location.pathname === '/survey' ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              Survey Form
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-btn-icon">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
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
                to="/syllabus"
                className={location.pathname.startsWith('/syllabus') ? 'active' : ''}
                onClick={handleNavClick}
              >
                Syllabus
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
            <li>
              <Link
                to="/survey"
                className={`mobile-btn-link ${location.pathname === '/survey' ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                Survey Form
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
