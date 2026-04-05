import React, { useState, useEffect } from 'react';
import './index.css';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!hasStarted) return;
    let startTime = null;
    let animationFrame;


    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const easeOutQuad = (t) => t * (2 - t);

      setCount(Math.floor(easeOutQuad(percentage) * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

function App() {
  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      quote: "Working with this team has been a game-changer for our business. Their attention to detail and commitment to delivering quality exceeded our expectations. They truly understand what it takes to succeed.",
      name: "Richard Mathews",
      role: "Syntrix",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 2,
      quote: "The strategic insights provided by Hepsibah and her team were instrumental in our growth phase. Innovative, reliable, and highly professional at every step of the journey.",
      name: "Sarah Jenkins",
      role: "Optiverse",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 3,
      quote: "Manvian has been our primary partner for technology solutions for over 3 years. Their ability to turn ideas into reality is what sets them apart in this industry.",
      name: "David Chen",
      role: "TecHub",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 4,
      quote: "Exceptional service and outstanding results. The final product exceeded all our KPIs. This is the partner you want if you are looking for excellence.",
      name: "Elena Rossi",
      role: "ArtMount",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
    }
  ];

  const [quoteIndex, setQuoteIndex] = React.useState(0);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Form State
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    company: '',
    purpose: ''
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = React.useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setIsScrolling(false), 300);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for phone to allow only digits and leading +
    if (name === 'phone') {
      const cleaned = value.replace(/(?!^\+)[^\d]/g, '');
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone Validation logic
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else {
      const digitsOnly = formData.phone.replace(/\+/g, '');
      if (formData.phone.startsWith('+91')) {
        const numberPart = formData.phone.substring(3);
        if (numberPart.length !== 10) {
          newErrors.phone = 'India number must be 10 digits';
        }
      } else if (digitsOnly.length < 10) {
        newErrors.phone = 'Minimum 10 digits required';
      }
    }

    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', location: '', company: '', purpose: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      }, 1500);
    }
  };

  // Quotes Data for the CTA section (4 items to match dots)
  const quotes = [
    {
      id: 1,
      text: "Great companies are not built by <strong>ideas</strong> alone, but by people who believe in turning those ideas into <strong>reality</strong>.",
      author: "Hepsibah Catherine",
      title: "Founder & CEO",
      image: "/logos/mam.png",
      layoutType: "photo-left"
    },
    {
      id: 2,
      text: "People think confidence comes from success. But honestly It's the other way around. Success comes from daring to be <strong>confident</strong> first.",
      author: "Hepsibah Catherine",
      title: "Founder & CEO",
      image: "/logos/quote 1.png",
      layoutType: "photo-right"
    },
    {
      id: 3,
      text: "Innovation is the difference between a leader and a follower. We lead with <strong>purpose</strong>.",
      author: "Hepsibah Catherine",
      title: "Founder & CEO",
      image: "/logos/quote 2.png",
      layoutType: "photo-left"
    },
    {
      id: 4,
      text: "Our mission is to create <strong>opportunities</strong> that empower communities and sustain the planet.",
      author: "Hepsibah Catherine",
      title: "Founder & CEO",
      image: "/logos/quote 3.png",
      layoutType: "photo-right"
    }
  ];

  // Auto-play for quotes
  React.useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.95,
      rotate: direction > 0 ? 5 : -5
    }),
    center: {
      zIndex: 10,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 150 : -150,
      opacity: 0,
      scale: 0.95,
      rotate: direction < 0 ? 5 : -5
    })
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const globeScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);

  return (
    <div className="app-container">
      <div className="custom-cursor-container">
        {/* Main Morphing Diamond/Circle */}
        <motion.div
          className="cursor-trail"
          animate={{
            x: mousePos.x - (isScrolling ? 30 : 10),
            y: mousePos.y - (isScrolling ? 30 : 10),
            rotate: isScrolling ? 0 : 45,
            borderRadius: isScrolling ? "50%" : "4px",
            width: isScrolling ? 60 : 20,
            height: isScrolling ? 60 : 20,
            scale: isScrolling ? 1.2 : 1,
            backgroundColor: isScrolling ? 'rgba(13, 63, 128, 0.9)' : 'rgba(13, 63, 128, 0.1)',
            borderColor: isScrolling ? '#78AFFD' : '#0D3F80',
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 150 }}
        >
          <motion.span
            className="cursor-inner-text"
            animate={isScrolling || isSubmitting ? { rotate: [0, 360], scale: [1, 1.2, 1] } : { rotate: 0, scale: 0 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            {isSubmitting ? '🚀' : (isScrolling ? '🖱️' : '')}
          </motion.span>
        </motion.div>

        {/* Trailing Dots for motion feel */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="cursor-dot-trail"
            animate={{
              x: mousePos.x - 2,
              y: mousePos.y - 2,
            }}
            transition={{ type: 'spring', damping: 15 + i * 5, stiffness: 100 - i * 10, mass: 0.5 + i * 0.2 }}
          />
        ))}

        <motion.div
          className="cursor-point"
          animate={{ x: mousePos.x - 2, y: mousePos.y - 2 }}
          transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.2 }}
        />
      </div>
      {/* Premium Scroll Progress Bar */}
      <div className="scroll-progress-container">
        <motion.div
          className="scroll-progress-bar"
          style={{ scaleX }}
        />
      </div>

      {/* Background patterns for Hero section */}
      <div className="bg-pattern" />



      {/* Header */}
      <header className={scrolled ? 'sticky-header' : ''}>
        <div className="header-container">
          <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
            {['ABOUT', 'FIRMS', 'TESTIMONIALS', 'CONTACT'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="book-btn-mobile"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              BOOK APPOINTMENT
            </motion.a>
          </nav>
          <div className="book-btn-wrapper">
            <motion.a
              href="#contact"
              className="book-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              BOOK APPOINTMENT
            </motion.a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <div className="hero-container" style={{ perspective: '1000px' }}>
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            style={{ y: heroY, opacity: heroOpacity }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="hero-hello">Hello! I'm <span className="name">Hepsibah Catherine</span></p>
            <h1 className="hero-title">Multipreneur<br />& Consultant</h1>
            <p className="hero-quote">
              “Building for <span className="highlight">people</span> and planet with purpose.”
            </p>
          </motion.div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            style={{ scale: globeScale }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          >
            <div className="hero-blue-arc"></div>
            <motion.div
              className="main-portrait"
              animate={{
                y: [0, -15, 0],
                rotateZ: [0, 1, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img src="/logos/mam.png" alt="Hepsibah Catherine"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=776';
                }}
              />
            </motion.div>
          </motion.div>
          {/* Social Bar - moved outside hero-right so it can flow below portrait on mobile */}
          <motion.div
            className="vertical-social-bar"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.5 }
              }
            }}
          >
            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com/hepsibah_catherine?igsh=Y2R3YXF3bTh3MXJ2"
              target="_blank"
              rel="noreferrer"
              className="social-pill"
              variants={{
                hidden: { x: 50, opacity: 0, rotateY: 45 },
                visible: { x: 0, opacity: 1, rotateY: 0 }
              }}
              whileHover={{
                scale: 1.15,
                rotateY: 10,
                boxShadow: "0 0 25px rgba(13, 63, 128, 0.4), 0 0 50px rgba(13, 63, 128, 0.2)",
                backgroundColor: "#F0F7FF"
              }}
            >
              <img src="/icons/instagram.png" alt="Instagram" />
            </motion.a>
            {/* Email */}
            <motion.a
              href="mailto:connect@manvian.com"
              className="social-pill"
              variants={{
                hidden: { x: 50, opacity: 0, rotateY: 45 },
                visible: { x: 0, opacity: 1, rotateY: 0 }
              }}
              whileHover={{
                scale: 1.15,
                rotateY: 10,
                boxShadow: "0 0 25px rgba(13, 63, 128, 0.4), 0 0 50px rgba(13, 63, 128, 0.2)",
                backgroundColor: "#F0F7FF"
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </motion.a>
            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/918778359643"
              target="_blank"
              rel="noreferrer"
              className="social-pill"
              variants={{
                hidden: { x: 50, opacity: 0, rotateY: 45 },
                visible: { x: 0, opacity: 1, rotateY: 0 }
              }}
              whileHover={{
                scale: 1.15,
                rotateY: 10,
                boxShadow: "0 0 25px rgba(13, 63, 128, 0.4), 0 0 50px rgba(13, 63, 128, 0.2)",
                backgroundColor: "#F0F7FF"
              }}
            >
              <img src="/icons/whatsapp.png" alt="WhatsApp" />
            </motion.a>
            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/hepsibah_catherine/"
              target="_blank"
              rel="noreferrer"
              className="social-pill"
              variants={{
                hidden: { x: 50, opacity: 0, rotateY: 45 },
                visible: { x: 0, opacity: 1, rotateY: 0 }
              }}
              whileHover={{
                scale: 1.15,
                rotateY: 10,
                boxShadow: "0 0 25px rgba(13, 63, 128, 0.4), 0 0 50px rgba(13, 63, 128, 0.2)",
                backgroundColor: "#F0F7FF"
              }}
            >
              <span className="linkedin-in" style={{ fontSize: '24px' }}>in</span>
            </motion.a>
          </motion.div>
        </div>
      </main>

      {/* Stats Bar */}
      <section className="stats-bar-navy">
        <motion.div
          className="stat-box-navy"
          initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="sn-num">
            <CountUp end={500} suffix="+" />
          </span>
          <span className="sn-text">Successful Projects</span>
        </motion.div>
        <motion.div
          className="stat-box-navy"
          initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="sn-num">
            <CountUp end={10} suffix="+" />
          </span>
          <span className="sn-text">Country Presence</span>
        </motion.div>
        <motion.div
          className="stat-box-navy"
          initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="sn-num">
            <CountUp end={5} suffix="+" />
          </span>
          <span className="sn-text">Years of Experience</span>
        </motion.div>
        <motion.div
          className="stat-box-navy"
          initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <span className="sn-num">
            <CountUp end={30} suffix="+" />
          </span>
          <span className="sn-text">Opportunities Created</span>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section className="about-section" id="about">
        <motion.div
          className="about-intro"
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2>About Me</h2>
          <p>
            As a CEO, I believe leadership is about vision, innovation, and people. My journey has been driven by the passion to build meaningful solutions that create real impact. I focus on leading with clarity, empowering talented teams, and continuously exploring new opportunities for growth. Through strategic thinking and strong execution, I strive to guide my company toward excellence while creating lasting value for our clients and community.
          </p>
        </motion.div>
        <div className="cards-container">
          {/* Mission Card */}
          <motion.div
            className="info-card"
            initial={{ opacity: 0, y: "var(--card-y, 100)", rotateY: "var(--card-rotate, -15)", scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.03, rotateY: 5, translateZ: 20 }}
          >
            <div className="card-icon-wrapper">
              <img src="/icons/mission.png" alt="Mission" />
            </div>
            <div className="card-content">
              <h3>Mission</h3>
              <div className="card-separator"></div>
              <p>To drive innovation and deliver meaningful growth for customers and stakeholders. We focus on creating impactful solutions that add long-term value.</p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            className="info-card"
            initial={{ opacity: 0, y: "var(--card-y, 100)", rotateY: "var(--card-rotate, -15)", scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.03, rotateY: 5, translateZ: 20 }}
          >
            <div className="card-icon-wrapper">
              <img src="/icons/vision.png" alt="Vision" />
            </div>
            <div className="card-content">
              <h3>Vision</h3>
              <div className="card-separator"></div>
              <p>To build a future-ready organization that leads with purpose and inspires change. We aim to set new standards of excellence in everything we do.</p>
            </div>
          </motion.div>

          {/* Values Card */}
          <motion.div
            className="info-card"
            initial={{ opacity: 0, y: "var(--card-y, 100)", rotateY: "var(--card-rotate, -15)", scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.03, rotateY: 5, translateZ: 20 }}
          >
            <div className="card-icon-wrapper">
              <img src="/icons/values.png" alt="Values" />
            </div>
            <div className="card-content">
              <h3>Values</h3>
              <div className="card-separator"></div>
              <p>We believe in integrity, innovation, and excellence in every action. Collaboration and a customer-first approach guide our decisions.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prestigious Firms Section */}
      <section className="firms-section" id="partners">
        <div className="rings-container">
          {/* Orbital Rings */}
          <div className="orbit-ring ring-1" />
          <div className="orbit-ring ring-2" />
          <div className="orbit-ring ring-3" />
          <div className="orbit-ring ring-4" />

          {/* Background Stars */}
          <div className="star star-s1"></div>
          <div className="star star-s2"></div>
          <div className="star star-s3"></div>
          <div className="star star-s4"></div>
          <div className="star star-s5"></div>
          <div className="star star-s6"></div>
          <div className="star star-s7"></div>
          <div className="star star-s8"></div>
          <div className="star star-s9"></div>
          <div className="star star-s10"></div>
          <div className="star star-s11"></div>
          <div className="star star-s12"></div>
          <div className="star star-s13"></div>
          <div className="star star-s14"></div>
          <div className="star star-s15"></div>

          {/* Animated Dots */}
          <div className="orbital-dot dot-1"></div>
          <div className="orbital-dot dot-1-alt"></div>
          <div className="orbital-dot dot-2"></div>
          <div className="orbital-dot dot-2-alt"></div>
          <div className="orbital-dot dot-3"></div>
          <div className="orbital-dot dot-3-alt"></div>
          <div className="orbital-dot dot-4"></div>
          <div className="orbital-dot dot-4-alt"></div>

          {/* Glowing Center Logo (Main) */}
          <div className="partner-logo-pill logo-ellipse-30">
            <a href="https://manvian.com/" target="_blank" rel="noreferrer" className="center-card">
              <div className="logo-pill-inner">
                <div className="pill-circle"><img src="/logos/Manvian.png" alt="Manvian" /></div>
                <div className="pill-text">
                  <span>Manvian</span>
                  <div className="open-link">
                    <span>Open Website →</span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Partner Logos along orbits */}
          <div className="partner-logo-pill logo-ellipse-31">
            <div className="logo-pill-inner">
              <div className="pill-circle"><img src="/logos/Topackz.png" alt="Topackz" /></div>
              <div className="pill-text">
                <span>Topackz</span>
                <div className="open-link">
                  <span>Open Website →</span>
                </div>
              </div>
            </div>
          </div>
          <div className="partner-logo-pill logo-ellipse-32">
            <div className="logo-pill-inner">
              <div className="pill-circle"><img src="/logos/image 2.png" alt="Partner" /></div>
              <div className="pill-text">
                <span>Partner</span>
                <div className="open-link">
                  <span>Open Website →</span>
                </div>
              </div>
            </div>
          </div>
          <div className="partner-logo-pill logo-ellipse-29">
            <div className="logo-pill-inner">
              <div className="pill-circle"><img src="/logos/optiverse.png" alt="Optiverse" /></div>
              <div className="pill-text">
                <span>Optiverse</span>
                <div className="open-link">
                  <span>Open Website →</span>
                </div>
              </div>
            </div>
          </div>
          <div className="partner-logo-pill logo-ellipse-33">
            <div className="logo-pill-inner">
              <div className="pill-circle"><img src="/logos/MSpace.png" alt="M Space" /></div>
              <div className="pill-text">
                <span>M Space</span>
                <div className="open-link">
                  <span>Open Website →</span>
                </div>
              </div>
            </div>
          </div>
          <div className="partner-logo-pill logo-ellipse-26">
            <div className="logo-pill-inner">
              <div className="pill-circle"><img src="/logos/image 3.png" alt="Partner" /></div>
              <div className="pill-text">
                <span>Partner</span>
                <div className="open-link">
                  <span>Open Website →</span>
                </div>
              </div>
            </div>
          </div>
          <div className="partner-logo-pill logo-ellipse-27">
            <div className="logo-pill-inner">
              <div className="pill-circle"><img src="/logos/Artmount.png" alt="Artmount" /></div>
              <div className="pill-text">
                <span>Artmount</span>
                <div className="open-link">
                  <span>Open Website →</span>
                </div>
              </div>
            </div>
          </div>
          <div className="partner-logo-pill logo-ellipse-34">
            <div className="logo-pill-inner">
              <div className="pill-circle"><img src="/logos/Mabs.png" alt="Mabs" /></div>
              <div className="pill-text">
                <span>MABS</span>
                <span>Open Website →</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="section-title">
          <div style={{ display: 'inline-block' }}>
            {"Our Prestigious".split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                style={{ display: 'inline-block' }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
          <br />
          <div style={{ display: 'inline-block' }}>
            {"Firms".split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.4, delay: (index + 15) * 0.04 }}
                style={{ display: 'inline-block' }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </h2>
      </section>

      <section className="testimonials-section-v2" id="testimonials">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 30, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
        >
          <h2 className="testimonials-title">Hear From Our People</h2>
          <p className="testimonials-subtitle">Trusted by clients across industries Delivering results that truly matter</p>
        </motion.div>

        <motion.div
          className="testimonial-container-v2"
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Navigation Arrows */}
          <button className="nav-btn prev" onClick={prevSlide} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="testimonial-stack">
            <AnimatePresence initial={false} custom={direction}>
              {/* Main Active Card */}
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate={{
                  ...variants.center,
                  y: [0, -8, 0]
                }}
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  y: {
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }
                }}
                className="testimonial-card-v2 active"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(13, 63, 128, 0.15)",
                  translateY: -5
                }}
              >
                <div className="card-inner">
                  <p className="quote-text">“{testimonials[activeIndex].quote}”</p>
                  <div className="user-profile">
                    <div className="avatar">
                      <img src={testimonials[activeIndex].image} alt={testimonials[activeIndex].name} />
                    </div>
                    <div className="user-info">
                      <h4>{testimonials[activeIndex].name}</h4>
                      <p>{testimonials[activeIndex].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stacked Card 1 (Behind) */}
              <motion.div
                key={`bg-1-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.9, y: -30 }}
                animate={{ opacity: 0.6, scale: 0.96, y: -15 }}
                exit={{ opacity: 0, scale: 0.9, y: 0 }}
                transition={{ duration: 0.5 }}
                className="testimonial-card-v2 background-card-1"
                style={{ zIndex: 5, pointerEvents: 'none', filter: 'blur(3px)' }}
              />

              {/* Stacked Card 2 (Further Back) */}
              <motion.div
                key={`bg-2-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.85, y: -50 }}
                animate={{ opacity: 0.3, scale: 0.92, y: -30 }}
                exit={{ opacity: 0, scale: 0.85, y: -15 }}
                transition={{ duration: 0.6 }}
                className="testimonial-card-v2 background-card-2"
                style={{ zIndex: 1, pointerEvents: 'none', filter: 'blur(6px)' }}
              />
            </AnimatePresence>
          </div>

          <button className="nav-btn next" onClick={nextSlide} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </motion.div>
      </section>

      {/* Quote/Vision Section - Sliding enabled */}
      <section className="quote-cta-section">
        <motion.div
          className="quote-bg-rings"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="quote-bg-ring q-ring-top-1"></div>
          <div className="quote-bg-ring q-ring-top-2"></div>
          <div className="quote-bg-ring q-ring-bottom-1"></div>
          <div className="quote-bg-ring q-ring-bottom-2"></div>
          <div className="quote-bg-ring q-ring-left-1"></div>
          <div className="quote-bg-ring q-ring-left-2"></div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className={`quote-slide-wrap active ${quotes[quoteIndex].layoutType}`}
          >
            <div className="quote-content-container">
              <motion.div
                className="quote-portrait"
                initial={{ y: 60, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -60, opacity: 0, scale: 0.9 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={quotes[quoteIndex].image}
                  alt={quotes[quoteIndex].author}
                  onError={(e) => { e.target.src = '/logos/mam.png'; }}
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
                />
              </motion.div>
              <div className="quote-text-block">
                <motion.h2
                  className="main-quote"
                  dangerouslySetInnerHTML={{ __html: `“${quotes[quoteIndex].text}”` }}
                  initial={{ y: 40, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -20, opacity: 0, filter: 'blur(5px)' }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <motion.div
                  className="quote-author"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <span className="quote-author-name">-{quotes[quoteIndex].author}</span>
                  <span className="quote-author-title">{quotes[quoteIndex].title}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots (Bottom Right) */}
        <div className="quote-pagination">
          {quotes.map((_, index) => (
            <div
              key={index}
              className={`pagination-dot ${index === quoteIndex ? 'active' : ''}`}
              onClick={() => setQuoteIndex(index)}
            ></div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="contact-container">
          <motion.div
            className="contact-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              Let’s Connect
            </motion.h2>
            <motion.p
              className="contact-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Interested in collaboration, partnerships, or business opportunities? Feel free to reach out and start the conversation.
            </motion.p>

            <motion.div
              className="contact-info-list"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.4 }
                }
              }}
            >
              <motion.div
                className="contact-info-item"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <div className="contact-icon">
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#0D3F80" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div className="contact-text">
                  <h3>Location</h3>
                  <p>No.4, 1st floor, Alamathi main road,<br />New vellanur, Avadi ,chennai - 600062.</p>
                </div>
              </motion.div>

              <motion.div
                className="contact-info-item"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <div className="contact-icon">
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#0D3F80" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline><circle cx="18" cy="18" r="4" fill="white" stroke="#0D3F80"></circle><path d="M18 16v2.5l2 1" stroke="#0D3F80"></path></svg>
                </div>
                <div className="contact-text">
                  <h3>Email Address</h3>
                  <p>connect@manvian.com</p>
                </div>
              </motion.div>

              <motion.div
                className="contact-info-item"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <div className="contact-icon">
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#0D3F80" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div className="contact-text">
                  <h3>Phone</h3>
                  <p>+91 8778359643</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="contact-right"
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: '1000px' }}
          >
            <div className="form-box-container" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="success"
                    className="success-message"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -10, 0] // Gentle ambient float
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.5 },
                      scale: { duration: 0.5 },
                      y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                    }}
                  >
                    {/* Decorative Confetti Pieces */}
                    {[...Array(25)].map((_, i) => {
                      const randomX = Math.random() * 800 - 400;
                      const randomY = Math.random() * 600 - 300;
                      const randomColor = ['#0D3F80', '#A0522D', '#78AFFD', '#FFD700', '#FFFFFF'][Math.floor(Math.random() * 5)];

                      return (
                        <motion.div
                          key={i}
                          className="confetti-piece"
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                          animate={{
                            x: randomX,
                            y: randomY,
                            opacity: 0,
                            scale: 0.5,
                            rotate: Math.random() * 1080
                          }}
                          transition={{
                            duration: 1.8 + Math.random(),
                            delay: 0.2,
                            ease: "easeOut"
                          }}
                          style={{ backgroundColor: randomColor }}
                        />
                      );
                    })}

                    <motion.div
                      className="success-icon"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring', damping: 12, stiffness: 200 }}
                    >
                      <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline className="checkmark-path" points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </motion.div>
                    <motion.h3
                      className="shimmer-text"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Thank You!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Your message has been sent successfully. I'll get back to you soon.
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 }}
                      onClick={() => setSubmitStatus(null)}
                      className="submit-btn pill-btn"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="form-row">
                      <div className="form-group half">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name*"
                          className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                      </div>
                      <div className="form-group half">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your Email*"
                          className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group half">
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your Phone*"
                          className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                      </div>
                      <div className="form-group half">
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="Location*"
                          className={errors.location ? 'error' : ''}
                        />
                        {errors.location && <span className="error-text">{errors.location}</span>}
                      </div>
                    </div>
                    <div className="form-group full">
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company/Organization*"
                        className={errors.company ? 'error' : ''}
                      />
                      {errors.company && <span className="error-text">{errors.company}</span>}
                    </div>
                    <div className="form-group full">
                      <textarea
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        placeholder="Purpose for connecting*"
                        rows="4"
                        className={errors.purpose ? 'error' : ''}
                      ></textarea>
                      {errors.purpose && <span className="error-text">{errors.purpose}</span>}
                    </div>
                    <button type="submit" className="submit-btn pill-btn" disabled={isSubmitting} style={{ cursor: isSubmitting ? 'url(data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewport=%220 0 16 16%22><text x=%220%22 y=%2214%22>🚀</text></svg>) 16 16, auto' : 'pointer' }}>
                      {isSubmitting ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            style={{ display: 'inline-block' }}
                          >
                            ⏳
                          </motion.span>
                          Sending...
                        </span>
                      ) : 'Get In Touch'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer / Contact Hybrid Section */}
      <section className="footer-section" id="footer">
        <div className="footer-globe-bg">
          <motion.video
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5 }}
            src="/logos/video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="background-video"
          />
        </div>
        <div className="footer-content">
          <motion.p
            className="have-idea"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            Have an Idea ?
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Let’s Make Something <br />Amazing Together.
          </motion.h1>
          <motion.div
            className="footer-input-bar"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <input type="text" placeholder="Type Your Message Here.." />
            <motion.button
              className="contact-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </div>
        <div className="footer-bottom-bar">
          <motion.p
            className="footer-copyright"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            © 2026 All rights reserved. | Designed & Developed By Manvian
          </motion.p>
          <motion.div
            className="footer-socials"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.8 }
              }
            }}
          >
            <motion.a
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              href="https://www.instagram.com/hepsibah_catherine?igsh=Y2R3YXF3bTh3MXJ2" target="_blank" rel="noreferrer" className="footer-social-circle"
            >
              <img src="/icons/instagram.png" alt="Instagram" />
            </motion.a>
            <motion.a
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              href="mailto:connect@manvian.com" className="footer-social-circle"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </motion.a>
            <motion.a
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              href="https://wa.me/918778359643" target="_blank" rel="noreferrer" className="footer-social-circle"
            >
              <img src="/icons/whatsapp.png" alt="WhatsApp" />
            </motion.a>
            <motion.a
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              href="https://www.linkedin.com/in/hepsibah-catherine/" target="_blank" rel="noreferrer" className="footer-social-circle"
            >
              <span className="linkedin-in" style={{ fontSize: '24px' }}>in</span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default App;
