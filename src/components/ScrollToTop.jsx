import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * 
 * This component uses React Router's useLocation hook to detect
 * when the route changes and automatically scrolls the page to the top.
 * 
 * It should be placed inside the Router component in App.jsx.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the page with smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]); // Re-run this effect when the pathname changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;
