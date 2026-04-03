import React from 'react';
import './index.css';
import footerGlobe from './assets/footer-globe.png';

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

  const [activeIndex, setActiveIndex] = React.useState(0);
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

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  // Helper to determine position classes for cards
  const getCardClass = (index) => {
    if (index === activeIndex) return 'testimonial-card active';
    if (index === (activeIndex - 1 + testimonials.length) % testimonials.length) return 'testimonial-card side left';
    if (index === (activeIndex + 1) % testimonials.length) return 'testimonial-card side right';
    return 'testimonial-card hidden';
  };

  return (
    <div className="app-container">
      {/* Background patterns for Hero section */}
      <div className="bg-pattern" />



      {/* Header */}
      <header>
        <div className="header-container">
          <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>ABOUT</a>
            <a href="#partners" onClick={() => setIsMenuOpen(false)}>FIRMS</a>
            <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>TESTIMONIALS</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>CONTACT</a>
            <a href="#contact" className="book-btn-mobile" onClick={() => setIsMenuOpen(false)}>Book Appointment</a>
          </nav>
          <div className="book-btn-wrapper">
            <a href="#contact" className="book-btn">Book Appointment</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <div className="hero-container">
          <div className="hero-left">
            <p className="hero-hello">Hello! I'm <span className="name">Hepsibah Catherine</span></p>
            <h1 className="hero-title">Multipreneur<br />& Consultant</h1>
            <p className="hero-quote">
              “Building for <span className="highlight">people</span> and planet with purpose.”
            </p>
          </div>

          <div className="hero-right">
            <div className="hero-blue-arc"></div>
            <div className="main-portrait">
              <img src="/logos/mam.png" alt="Hepsibah Catherine"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=776';
                }}
              />
            </div>
          </div>

          {/* Social Bar - moved outside hero-right so it can flow below portrait on mobile */}
          <div className="vertical-social-bar">
            {/* Instagram */}
            <a href="https://www.instagram.com/hepsibah_catherine?igsh=Y2R3YXF3bTh3MXJ2" target="_blank" rel="noreferrer" className="social-pill">
              <img src="/icons/instagram.png" alt="Instagram" />
            </a>
            {/* Email */}
            <a href="mailto:connect@manvian.com" className="social-pill">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </a>
            {/* WhatsApp */}
            <a href="https://wa.me/918778359643" target="_blank" rel="noreferrer" className="social-pill">
              <img src="/icons/whatsapp.png" alt="WhatsApp" />
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/hepsibah-catherine/" target="_blank" rel="noreferrer" className="social-pill">
              <span className="linkedin-in" style={{ fontSize: '24px' }}>in</span>
            </a>
          </div>
        </div>
      </main>

      {/* Stats Bar */}
      <section className="stats-bar-navy" style={{ bottom: "90px" }}>
        <div className="stat-box-navy">
          <span className="sn-num">500+</span>
          <span className="sn-text">Successful Projects</span>
        </div>
        <div className="stat-box-navy">
          <span className="sn-num">10+</span>
          <span className="sn-text">Country Presence</span>
        </div>
        <div className="stat-box-navy">
          <span className="sn-num">5+</span>
          <span className="sn-text">Years of Experience</span>
        </div>
        <div className="stat-box-navy">
          <span className="sn-num">30+</span>
          <span className="sn-text">Opportunities Created</span>
        </div>
      </section>

      {/* About Me Section */}
      <section className="about-section" id="about">
        <div className="about-intro">
          <h2>About Me</h2>
          <p>
            As a CEO, I believe leadership is about vision, innovation, and people. My journey has been driven by the passion to build meaningful solutions that create real impact. I focus on leading with clarity, empowering talented teams, and continuously exploring new opportunities for growth. Through strategic thinking and strong execution, I strive to guide my company toward excellence while creating lasting value for our clients and community.
          </p>
        </div>

        <div className="cards-container">
          {/* Mission Card */}
          <div className="info-card">
            <div className="card-icon-wrapper">
              <img src="/icons/mission.png" alt="Mission" />
            </div>
            <div className="card-content">
              <h3>Mission</h3>
              <div className="card-separator"></div>
              <p>To drive innovation and deliver meaningful growth for customers and stakeholders. We focus on creating impactful solutions that add long-term value.</p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="info-card">
            <div className="card-icon-wrapper">
              <img src="/icons/vision.png" alt="Vision" />
            </div>
            <div className="card-content">
              <h3>Vision</h3>
              <div className="card-separator"></div>
              <p>To build a future-ready organization that leads with purpose and inspires change. We aim to set new standards of excellence in everything we do.</p>

            </div>
          </div>

          {/* Values Card */}
          <div className="info-card">
            <div className="card-icon-wrapper">
              <img src="/icons/values.png" alt="Values" />
            </div>
            <div className="card-content">
              <h3>Values</h3>
              <div className="card-separator"></div>
              <p>We believe in integrity, innovation, and excellence in every action. Collaboration and a customer-first approach guide our decisions.</p>
            </div>
          </div>
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

        <h2 className="section-title">Our Prestigious<br />Firms</h2>
      </section>

      {/* Testimonials Section - Premium Stack Slider Design */}
      <section className="testimonials-section-v2" id="testimonials">
        <div className="testimonials-header">
          <h2 className="testimonials-title">Hear From Our People</h2>
          <p className="testimonials-subtitle">Trusted by clients across industries Delivering results that truly matter</p>
        </div>

        <div className="testimonial-container-v2">
          {/* Navigation Arrows */}
          <button className="nav-btn prev" onClick={prevSlide} aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          </button>

          <div className="testimonial-stack">
            {testimonials.map((t, index) => {
              // Calculate relative index for stacking effect
              let position = 'hidden';
              const diff = (index - activeIndex + testimonials.length) % testimonials.length;

              if (diff === 0) position = 'front';
              else if (diff === 1) position = 'back-1';
              else if (diff === 2) position = 'back-2';
              else if (diff === testimonials.length - 1) position = 'out';

              return (
                <div className={`testimonial-card-v2 ${position}`} key={t.id}>
                  <div className="card-inner">
                    <p className="quote-text">“{t.quote}”</p>
                    <div className="user-profile">
                      <div className="avatar">
                        <img src={t.image} alt={t.name} onError={(e) => { e.target.src = '/logos/mam.png'; }} />
                      </div>
                      <div className="user-info">
                        <h4>{t.name}</h4>
                        <p>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="nav-btn next" onClick={nextSlide} aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* Quote/Vision Section - Sliding enabled */}
      <section className="quote-cta-section">
        <div className="quote-bg-rings">
          <div className="quote-bg-ring q-ring-top-1"></div>
          <div className="quote-bg-ring q-ring-top-2"></div>
          <div className="quote-bg-ring q-ring-bottom-1"></div>
          <div className="quote-bg-ring q-ring-bottom-2"></div>
          <div className="quote-bg-ring q-ring-left-1"></div>
          <div className="quote-bg-ring q-ring-left-2"></div>
        </div>

        {quotes.map((q, index) => (
          <div className={`quote-slide-wrap ${index === quoteIndex ? 'active' : ''} ${q.layoutType}`} key={q.id}>
            <div className="quote-content-container">
              <div className="quote-portrait">
                <img src={q.image} alt={q.author}
                  onError={(e) => { e.target.src = '/logos/mam.png'; }} />
              </div>
              <div className="quote-text-block">
                <h2 className="main-quote" dangerouslySetInnerHTML={{ __html: `“${q.text}”` }}>
                </h2>
                <div className="quote-author">
                  <span className="quote-author-name">-{q.author}</span>
                  <span className="quote-author-title">{q.title}</span>
                </div>
              </div>
            </div>
          </div>




        ))}

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
          <div className="contact-left">
            <h2>Let’s Connect</h2>
            <p className="contact-subtitle">
              Interested in collaboration, partnerships, or business opportunities? Feel free to reach out and start the conversation.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-icon">
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#0D3F80" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div className="contact-text">
                  <h3>Location</h3>
                  <p>No.4, 1st floor, Alamathi main road,<br />New vellanur, Avadi ,chennai - 600062.</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#0D3F80" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline><circle cx="18" cy="18" r="4" fill="white" stroke="#0D3F80"></circle><path d="M18 16v2.5l2 1" stroke="#0D3F80"></path></svg>
                </div>
                <div className="contact-text">
                  <h3>Email Address</h3>
                  <p>connect@manvian.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#0D3F80" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div className="contact-text">
                  <h3>Phone</h3>
                  <p>+91 8778359643</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-right">
            <div className="form-box-container">
              {submitStatus === 'success' ? (
                <div className="success-message">
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. I'll get back to you soon.</p>
                  <button onClick={() => setSubmitStatus(null)} className="submit-btn pill-btn">Send Another Message</button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
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
                  <button type="submit" className="submit-btn pill-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Get In Touch'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact Hybrid Section */}
      <section className="footer-section" id="footer">
        <div className="footer-globe-bg">
          <video
            src="/logos/video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="background-video"
          />
        </div>
        <div className="footer-content">
          <p className="have-idea">Have an Idea ?</p>
          <h1>Let’s Make Something <br />Amazing Together.</h1>
          <div className="footer-input-bar">
            <input type="text" placeholder="Type Your Message Here.." />
            <button className="contact-btn">Contact Me</button>
          </div>
        </div>
        <div className="footer-bottom-bar">
          <p className="footer-copyright">© 2026 All rights reserved. | Designed & Developed By Manvian</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/hepsibah_catherine?igsh=Y2R3YXF3bTh3MXJ2" target="_blank" rel="noreferrer" className="footer-social-circle">
              <img src="/icons/instagram.png" alt="Instagram" />
            </a>
            <a href="mailto:connect@manvian.com" className="footer-social-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </a>
            <a href="https://wa.me/918778359643" target="_blank" rel="noreferrer" className="footer-social-circle">
              <img src="/icons/whatsapp.png" alt="WhatsApp" />
            </a>
            <a href="https://www.linkedin.com/in/hepsibah-catherine/" target="_blank" rel="noreferrer" className="footer-social-circle">
              <span className="linkedin-in" style={{ fontSize: '24px' }}>in</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
