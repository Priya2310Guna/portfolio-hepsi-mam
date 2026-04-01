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

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
        <nav className="nav-links">
          <a href="#about">ABOUT</a>
          <a href="#partners">PARTNERS</a>
          <a href="#testimonials">TESTIMONIALS</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <a href="#contact" className="book-btn">Book Appointment</a>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <div className="hero-left">
          <p className="hero-hello">Hello! I’m <span className="name">Hepsibah Catherine</span></p>
          <h1 className="hero-title">Multipreneur<br />& Consultatnt</h1>
          <p className="hero-quote">
            “Building for <span className="highlight">people</span> and planet with purpose.”
          </p>
        </div>

        <div className="hero-right">
          <div className="hero-blue-arc"></div>
          <div className="main-portrait">
            <img src="/hero.png" alt="Hepsibah Catherine"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=776';
              }}
            />
          </div>

          {/* Social Bar */}
          <div className="vertical-social-bar">
            <div className="social-pill">
              <svg width="22" height="22" fill="#E4405F" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </div>
            <div className="social-pill">
              <svg width="22" height="22" fill="#0072C6" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 4.612l3.824 3.091l3.824-3.091 5.694 7.038h-19.035l5.693-7.038zm10.201-1.044l4.623-3.746v9.458l-4.623-5.712z" /></svg>
            </div>
            <div className="social-pill">
              <svg width="22" height="22" fill="#25D366" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.407 3.481s3.48 5.226 3.48 8.408c-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.3 1.667zm5.422-3.772.348.207c1.469.873 3.15 1.335 4.873 1.336 5.176 0 9.39-4.214 9.392-9.391 0-2.507-.975-4.865-2.744-6.634s-4.126-2.744-6.632-2.744c-5.176 0-9.39 4.215-9.392 9.392 0 1.819.522 3.593 1.508 5.137l.228.356-.993 3.63 3.712-.977z" /></svg>
            </div>
            <div className="social-pill">
              <svg width="22" height="22" fill="#0077B5" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </div>
          </div>
        </div>
      </main>

      {/* Stats Bar */}
      <section className="stats-bar-navy">
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
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-target"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
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
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-lamp"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 1 7 7c0 2.32-1.28 4.35-3.19 5.39a1 1 0 0 0-.81 1.61v.5a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.5a1 1 0 0 0-.81-1.61A7 7 0 0 1 12 2z"></path></svg>
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
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-diamond"><path d="M6 19h12"></path><path d="M2 9L12 22L22 9L12 2Z"></path><path d="M12 2V22"></path><path d="M2 9H22"></path></svg>
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
          <a href="https://manvian.com/" target="_blank" rel="noreferrer" className="center-card">
            <div className="card-logo-circle">
              <img src="/logos/Manvian.png" alt="Manvian" />
            </div>
            <div className="card-text">
              <h4>Manvian</h4>
              <div className="open-link">
                <span>Open Website</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M10 7h7v7"></path></svg>
              </div>
            </div>
          </a>

          {/* Partner Logos along orbits */}
          <div className="partner-logo-pill logo-ellipse-31">
            <div className="logo-pill-inner">
              <div className="pill-circle"><img src="/logos/Topackz.png" alt="Topackz" /></div>
              <div className="pill-text">
                <span>Topackz</span>
                <div className="open-link">
                  <span>Open Website</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M10 7h7v7"></path></svg>
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
                  <span>Open Website</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M10 7h7v7"></path></svg>
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
                  <span>Open Website</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M10 7h7v7"></path></svg>
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
                  <span>Open Website</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M10 7h7v7"></path></svg>
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
                  <span>Open Website</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M10 7h7v7"></path></svg>
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
                  <span>Open Website</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M10 7h7v7"></path></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="partner-logo-pill logo-ellipse-34">
            <div className="logo-pill-inner">
              <div className="pill-circle"><img src="/logos/Mabs.png" alt="Mabs" /></div>
              <div className="pill-text">
                <span>MABS</span>
                <div className="open-link">
                  <span>Open Website</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M10 7h7v7"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="section-title">Our Prestigious Firms</h2>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <h2>Hear From Our People</h2>
        <p className="testimonials-subtitle">
          Trusted by clients across industries Delivering results that truly matter
        </p>

        <div className="testimonial-carousel-container">
          <div className="nav-arrow left" onClick={prevSlide}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"></path></svg>
          </div>

          <div className="testimonial-card-main-wrapper">
            {testimonials.map((t, index) => (
              <div className={getCardClass(index)} key={t.id}>
                <p>"{t.quote}"</p>
                <div className="testimonial-user">
                  <div className="user-avatar">
                    <img src={t.image} alt={t.name} />
                  </div>
                  <div className="user-info">
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="nav-arrow right" onClick={nextSlide}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
          </div>
        </div>
      </section>

      {/* Quote/Vision Section */}
      <section className="quote-cta-section">
        <div className="quote-bg-rings">
          <div className="quote-bg-ring q-ring-top-1"></div>
          <div className="quote-bg-ring q-ring-top-2"></div>
          <div className="quote-bg-ring q-ring-top-3"></div>
          <div className="quote-bg-ring q-ring-bottom-1"></div>
          <div className="quote-bg-ring q-ring-bottom-2"></div>
          <div className="quote-bg-ring q-ring-bottom-3"></div>
          <div className="quote-bg-ring q-ring-left-1"></div>
          <div className="quote-bg-ring q-ring-left-2"></div>
          <div className="quote-bg-ring q-ring-left-3"></div>
        </div>

        <div className="quote-content-container">
          <div className="quote-portrait">
            <img src="/logos/mam.png" alt="Hepsibah Catherine Quote"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=776'; }} />
          </div>
          <div className="quote-text-block">
            <h2 className="main-quote">
              “Great companies are not built by <strong>ideas</strong> alone, but by people who believe in turning those ideas into <strong>reality</strong>.”
            </h2>
            <div className="quote-author">
              <span className="quote-author-name">-Hepsibah Catherine</span>
              <span className="quote-author-title">Founder & CEO</span>
            </div>
          </div>
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
              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group half"><input type="text" placeholder="Your Name*" required /></div>
                  <div className="form-group half"><input type="email" placeholder="Your Email*" required /></div>
                </div>
                <div className="form-row">
                  <div className="form-group half"><input type="text" placeholder="Your Phone*" required /></div>
                  <div className="form-group half"><input type="text" placeholder="Location*" required /></div>
                </div>
                <div className="form-group full"><input type="text" placeholder="Company/Organization*" required /></div>
                <div className="form-group full"><textarea placeholder="Purpose for connecting*" rows="4" required></textarea></div>
                <button type="submit" className="submit-btn pill-btn">Get In Touch</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact Hybrid Section */}
      <section className="footer-section" id="footer">
        <div className="footer-globe-bg">
          <img src="/logos/globe.png" alt="World Map Background" />
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
            <a href="#" className="footer-social-circle"><svg width="24" height="24" fill="#E4405F" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg></a>
            <a href="#" className="footer-social-circle"><svg width="24" height="24" fill="#0072C6" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 4.612l3.824 3.091l3.824-3.091 5.694 7.038h-19.035l5.693-7.038zm10.201-1.044l4.623-3.746v9.458l-4.623-5.712z" /></svg></a>
            <a href="#" className="footer-social-circle"><svg width="24" height="24" fill="#25D366" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.407 3.481s3.48 5.226 3.48 8.408c-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.3 1.667zm5.422-3.772.348.207c1.469.873 3.15 1.335 4.873 1.336 5.176 0 9.39-4.214 9.392-9.391 0-2.507-.975-4.865-2.744-6.634s-4.126-2.744-6.632-2.744c-5.176 0-9.39 4.215-9.392 9.392 0 1.819.522 3.593 1.508 5.137l.228.356-.993 3.63 3.712-.977z" /></svg></a>
            <a href="#" className="footer-social-circle"><svg width="24" height="24" fill="#0077B5" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
