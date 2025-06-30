import { useState, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Loader from "../components/Loader";
import emailjs from "emailjs-com";
import PlaneOnly from "../models/PlaneOnly";
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [isTakingOff, setIsTakingOff] = useState(false);
  const [onlyRotateFan, setOnlyRotateFan] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const inputRefs = {
    name: useRef(),
    email: useRef(),
    phone: useRef(),
    message: useRef(),
  };

  const handleInputFocus = (ref) => {
    setIsTyping(true);
    setIsInputClicked(true);
    ref.current.classList.add("input-focused");
    ref.current.classList.remove("input-blur");
  };

  const handleInputBlur = (ref) => {
    // Only stop the fan if no other inputs are focused
    const anyInputFocused = Object.values(inputRefs).some(
      inputRef => document.activeElement === inputRef.current
    );

    if (!anyInputFocused) {
      setIsTyping(false);
    }

    ref.current.classList.add("input-blur");
    ref.current.classList.remove("input-focused");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Check if all required fields are filled
    const isFormComplete = Object.values(formData).every((value) => value.trim() !== "");

    if (isFormComplete) {
      // Get EmailJS credentials from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ||
                       import.meta.env.VITE_APP_EMAILJS_SERVICE_ID ||
                       "service_gfrbuaj"; // fallback
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
                        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID ||
                        "template_ieuwrka"; // fallback
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ||
                       import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY ||
                       "Drfo3y3Sfl30PhGXF"; // fallback

      console.log('EmailJS Configuration:', {
        serviceId: serviceId ? 'Configured' : 'Missing',
        templateId: templateId ? 'Configured' : 'Missing',
        publicKey: publicKey ? 'Configured' : 'Missing'
      });

      emailjs
        .send(
          serviceId,
          templateId,
          formData,
          publicKey
        )
        .then((response) => {
          console.log("Email sent successfully:", response);
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          handleTakeOff(); // Trigger takeoff after successful email send
          setIsTyping(false);
          setSubmitStatus('success');
          setTimeout(() => {
            setSubmitStatus(null);
          }, 5000);
        })
        .catch((error) => {
          console.log("Error sending email:", error);
          setSubmitStatus('error');
          setTimeout(() => {
            setSubmitStatus(null);
          }, 5000);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      setSubmitStatus('error');
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  const handleTakeOff = () => {
    console.log("Form submitted, starting plane animation");

    // First set isTyping to true to ensure the fan rotates during flight
    setIsTyping(true);

    // For successful submission, we want the plane to take off (not just fan rotation)
    setOnlyRotateFan(false);

    // Start the takeoff animation
    setIsTakingOff(true);

    // Calculate the total animation duration based on the updated timing in PlaneOnly.jsx
    // takeOffDuration (3s) + turnDuration (6s) + returnDuration (4s) = 13s
    // Add a small buffer to ensure animation completes
    const totalAnimationDuration = 14000; // 14 seconds in milliseconds

    // After the full animation cycle, reset all states
    setTimeout(() => {
      console.log("Animation cycle complete, resetting states");

      // Reset the takeoff state
      setIsTakingOff(false);

      // Keep the fan rotating for a moment after landing
      setTimeout(() => {
        console.log("Final cleanup, resetting all states");

        // Reset all other states to initial values
        setIsTyping(false);
        setIsInputClicked(false);
        setOnlyRotateFan(false);
      }, 1000);
    }, totalAnimationDuration);
  };

  return (
    <div className="contact-page-wrapper">
      {/* Header Section */}
      <div className="contact-header">
        <h1 className="contact-title">Get In Touch</h1>
        <div className="title-underline"></div>
        <p className="contact-description">
          Have a project in mind or want to discuss a potential collaboration?
          Feel free to reach out using the form below or through my contact details.
        </p>
      </div>

      {/* Contact Information Section */}
      <div className="contact-info-section">
        <div className="contact-info-item">
          <div className="info-icon">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <div className="info-details">
            <h3>Location</h3>
            <p>{import.meta.env.VITE_CONTACT_LOCATION || "Calicut, Kerala, India"}</p>
          </div>
        </div>

        <div className="contact-info-item">
          <div className="info-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <div className="info-details">
            <h3>Email</h3>
            <p>{import.meta.env.VITE_CONTACT_EMAIL || "muhammedrifadkp3@gmail.com"}</p>
          </div>
        </div>

        <div className="contact-info-item">
          <div className="info-icon">
            <i className="fas fa-phone-alt"></i>
          </div>
          <div className="info-details">
            <h3>Phone</h3>
            <p>{import.meta.env.VITE_CONTACT_PHONE || "+91 7356852496"}</p>
          </div>
        </div>

        <div className="contact-info-item">
          <div className="info-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="info-details">
            <h3>Working Hours</h3>
            <p>Mon - Fri: 9AM - 6PM</p>
          </div>
        </div>
      </div>

      {/* Main Contact Container - Preserving Original Structure */}
      <section className="contact-container">
        <div className="form-container">
          <h2>Send Me a Message</h2>

          {submitStatus === 'success' && (
            <div className="submit-message success">
              <i className="fas fa-check-circle"></i>
              <p>Your message has been sent successfully!</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="submit-message error">
              <i className="fas fa-exclamation-circle"></i>
              <p>Please fill out all required fields.</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                ref={inputRefs.name}
                onFocus={() => handleInputFocus(inputRefs.name)}
                onBlur={() => handleInputBlur(inputRefs.name)}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
              />
              <label htmlFor="name"><i className="fas fa-user"></i> Name</label>
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                ref={inputRefs.email}
                onFocus={() => handleInputFocus(inputRefs.email)}
                onBlur={() => handleInputBlur(inputRefs.email)}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
              />
              <label htmlFor="email"><i className="fas fa-envelope"></i> Email</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                ref={inputRefs.phone}
                onFocus={() => handleInputFocus(inputRefs.phone)}
                onBlur={() => handleInputBlur(inputRefs.phone)}
                onChange={handleInputChange}
                placeholder="Your Phone Number"
                required
              />
              <label htmlFor="phone"><i className="fas fa-phone"></i> Phone</label>
            </div>

            <div className="form-group">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                ref={inputRefs.message}
                onFocus={() => handleInputFocus(inputRefs.message)}
                onBlur={() => handleInputBlur(inputRefs.message)}
                onChange={handleInputChange}
                placeholder="Your Message"
                required
              />
              <label htmlFor="message"><i className="fas fa-comment-alt"></i> Message</label>
            </div>
            <button
              type="submit"
              className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
              onClick={() => handleInputFocus(inputRefs.message)}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  <span className="button-text">Sending...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  <span className="button-text">Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="canvas-container">
          <Canvas
            className="w-full h-screen"
            camera={{ position: [0, 0, 10] }}
            style={{
              background: 'linear-gradient(135deg, #FF4C4C, #20b5ff98)'
            }}
            gl={{ antialias: true }}
          >
            <fog attach="fog" args={['#FF4C4C', 15, 30]} />
            <Suspense fallback={<Loader />}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[1, 1, 1]} intensity={2} />
              <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={1.5} castShadow />
              <PlaneOnly
                isRotating={isTyping}
                isSwinging={isInputClicked}
                isTakingOff={isTakingOff}
                onlyRotateFan={onlyRotateFan}
                color="#FFFFFF" // White color to contrast with the gradient background
                scale={[7, 7, 7]}
                position={[0, -1, 0]} // Adjusted position for "margin-top"
                rotation={[.3, -.8, -.1]} // Rotate 10 degrees along the x-axis
              />
              <OrbitControls enableZoom={false} />
            </Suspense>
          </Canvas>
        </div>
      </section>

      {/* Social Media Section */}
      <div className="social-connect-section">
        <h3>Connect With Me</h3>
        <div className="social-icons">
          <a href="https://github.com/muhammedrifadkp" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/muhammed-rifad-64a7172b9" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://dribbble.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-dribbble"></i>
          </a>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-grid">
          <div className="faq-item">
            <h4><i className="fas fa-question-circle"></i> What services do you offer?</h4>
            <p>I offer a range of services including web development, mobile app development, UI/UX design, and consulting services for digital products.</p>
          </div>
          <div className="faq-item">
            <h4><i className="fas fa-question-circle"></i> What is your typical project timeline?</h4>
            <p>Project timelines vary based on complexity, but most websites take 2-4 weeks, while larger applications may take 1-3 months.</p>
          </div>
          <div className="faq-item">
            <h4><i className="fas fa-question-circle"></i> Do you offer maintenance services?</h4>
            <p>Yes, I provide ongoing maintenance and support services to ensure your website or application continues to run smoothly after launch.</p>
          </div>
          <div className="faq-item">
            <h4><i className="fas fa-question-circle"></i> How do we get started on a project?</h4>
            <p>Simply reach out through the contact form above, and I'll schedule a consultation to discuss your project requirements and goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;