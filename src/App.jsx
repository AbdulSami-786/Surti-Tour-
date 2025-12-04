import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import img from "./image.png"

/* -------------------------------
   FAKE IMAGE URLS
-------------------------------- */
const FAKE_IMAGES = {
  // Dubai images
  dubai: [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  ],
  // Turkey images
  turkey: [
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1591900947067-8b2b7627e5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  ],
  // Baku images
  baku: [
    "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1564951434112-528f3c4cda6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  ],
  // Maldives images
  maldives: [
    "https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1573843989-c9d9a2a1e8a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  ],
  // Thailand images
  thailand: [
    "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1552465011-b4e30bf7349d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  ],
  // Saudi Arabia images
  saudi: [
    "https://images.unsplash.com/photo-1522065893269-6fd20f6d7438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60"
  ],
  // Hero images
  hero: [
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  ],
  // Gallery images
  gallery: [
    "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  // Team images
  team: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1494790108755-2616b786d4d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  // About story image
  aboutStory: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
};

/* -------------------------------
   TRIPS DATA (Expanded)
-------------------------------- */
const trips = [
  {
    id: 1,
    title: "Dubai 5 Days Tour",
    price: "PKR 120,000",
    img: FAKE_IMAGES.dubai[0],
    images: FAKE_IMAGES.dubai,
    description: "Explore Dubai with luxury hotels, desert safari and city tour.",
    duration: "5 Days / 4 Nights",
    inclusions: ["Desert Safari", "Burj Khalifa Visit", "5-Star Hotel", "Daily Breakfast"],
    highlights: ["Palm Jumeirah", "Dubai Mall", "Gold Souk", "Dubai Fountain"]
  },
  {
    id: 2,
    title: "Turkey 7 Days Tour",
    price: "PKR 180,000",
    img: FAKE_IMAGES.turkey[0],
    images: FAKE_IMAGES.turkey,
    description: "Visit Istanbul, Cappadocia, Antalya and more.",
    duration: "7 Days / 6 Nights",
    inclusions: ["Hot Air Balloon Ride", "Bosphorus Cruise", "4-Star Hotels", "All Meals"],
    highlights: ["Hagia Sophia", "Blue Mosque", "Cappadocia Caves", "Pamukkale"]
  },
  {
    id: 3,
    title: "Baku 4 Days Tour",
    price: "PKR 95,000",
    img: FAKE_IMAGES.baku[0],
    images: FAKE_IMAGES.baku,
    description: "Modern architecture, culture and city exploring.",
    duration: "4 Days / 3 Nights",
    inclusions: ["City Tour", "Hotel Accommodation", "Airport Transfers", "Breakfast"],
    highlights: ["Flame Towers", "Old City", "Heydar Aliyev Center", "Carpet Museum"]
  },
  {
    id: 4,
    title: "Maldives 6 Days Luxury",
    price: "PKR 250,000",
    img: FAKE_IMAGES.maldives[0],
    images: FAKE_IMAGES.maldives,
    description: "Overwater bungalows, snorkeling, and romantic sunset cruises.",
    duration: "6 Days / 5 Nights",
    inclusions: ["Water Villa", "Spa Session", "Island Hopping", "All Inclusive"],
    highlights: ["Private Beach", "Coral Reefs", "Sunset Dinner", "Water Sports"]
  },
  {
    id: 5,
    title: "Thailand 8 Days Adventure",
    price: "PKR 150,000",
    img: FAKE_IMAGES.thailand[0],
    images: FAKE_IMAGES.thailand,
    description: "Bangkok, Phuket, Phi Phi Islands and cultural experiences.",
    duration: "8 Days / 7 Nights",
    inclusions: ["Elephant Sanctuary", "Island Tours", "3-4 Star Hotels", "Most Meals"],
    highlights: ["Wat Arun", "Phi Phi Islands", "Floating Market", "Thai Cooking Class"]
  },
  {
    id: 6,
    title: "Saudi Arabia 5 Days Umrah",
    price: "PKR 90,000",
    img: FAKE_IMAGES.saudi[0],
    images: FAKE_IMAGES.saudi,
    description: "Spiritual journey with complete Umrah package.",
    duration: "5 Days / 4 Nights",
    inclusions: ["Ziyarat Tours", "Hotel Near Haram", "Guided Assistance", "Transport"],
    highlights: ["Masjid al-Haram", "Mina", "Arafat", "Historical Sites"]
  }
];

/* -------------------------------
   REVIEWS DATA
-------------------------------- */
const reviews = [
  { id: 1, name: "Ali Ahmed", rating: 5, comment: "Best tour experience! Highly recommended.", date: "2024-03-15", tour: "Dubai Tour" },
  { id: 2, name: "Sara Khan", rating: 5, comment: "Great service, perfect transport & hotel!", date: "2024-03-10", tour: "Turkey Tour" },
  { id: 3, name: "Hamza Malik", rating: 4, comment: "Friendly staff and smooth booking experience.", date: "2024-03-05", tour: "Baku Tour" },
  { id: 4, name: "Fatima Raza", rating: 5, comment: "The Maldives package was magical! Everything was perfectly arranged.", date: "2024-02-28", tour: "Maldives Tour" },
  { id: 5, name: "Omar Farooq", rating: 4, comment: "Value for money. Thailand adventure was unforgettable!", date: "2024-02-20", tour: "Thailand Tour" },
  { id: 6, name: "Ayesha Siddiqui", rating: 5, comment: "Umrah experience was seamless with SURTI. Highly spiritual journey.", date: "2024-02-15", tour: "Saudi Arabia Umrah" }
];

/* -------------------------------
   SERVICES DATA
-------------------------------- */
const services = [
  { id: 1, icon: "✈️", title: "Flight Booking", description: "International & domestic flights at best prices" },
  { id: 2, icon: "🏨", title: "Hotel Reservation", description: "Luxury to budget hotels worldwide" },
  { id: 3, icon: "📋", title: "Visa Assistance", description: "Complete visa processing guidance" },
  { id: 4, icon: "🚗", title: "Transport", description: "Airport transfers & local transportation" },
  { id: 5, icon: "👨‍👩‍👧‍👦", title: "Group Tours", description: "Customized group packages" },
  { id: 6, icon: "🎯", title: "Custom Itineraries", description: "Personalized travel plans" }
];

/* -------------------------------
   ANIMATION VARIANTS
-------------------------------- */
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};

const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.6 } }
};

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.6 } }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity }
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
};

const rotateAnimation = {
  rotate: [0, 360],
  transition: { duration: 20, repeat: Infinity, ease: "linear" }
};

/* -------------------------------
   ANIMATED BACKGROUND COMPONENT
-------------------------------- */
function AnimatedBackground() {
  return (
    <div className="animated-bg">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-shape"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 40 + 10}px`,
            height: `${Math.random() * 40 + 10}px`,
            background: `rgba(74, 107, 255, ${Math.random() * 0.1 + 0.05})`
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------
   NAVBAR WITH ANIMATIONS
-------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/trips", label: "Trips" },
    { path: "/services", label: "Services" },
    { path: "/reviews", label: "Reviews" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.div 
        className="logo"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.img 
          src={img}
          alt="Logo" 
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          animate={rotateAnimation}
        />
        <span className="logo-text">SURTI Tours & Travels</span>
      </motion.div>

      <ul>
        {navLinks.map((link, index) => (
          <motion.li
            key={link.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={link.path}>{link.label}</Link>
          </motion.li>
        ))}
      </ul>

      <motion.div 
        className="nav-cta"
        animate={pulseAnimation}
      >
        <Link to="/contact" className="btn">Book Now</Link>
      </motion.div>
    </motion.nav>
  );
}

/* -------------------------------
   HOME PAGE WITH ANIMATIONS
-------------------------------- */
function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = FAKE_IMAGES.hero;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="home-page"
    >
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-slider"
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div 
            className="hero-image" 
            style={{ backgroundImage: `url(${heroImages[currentImage]})` }}
          />
        </motion.div>
        
        <motion.div 
          className="hero-content"
          variants={fadeInUp}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SURTI Tours & Travels
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="tagline"
          >
            Your trusted partner for worldwide travel packages
          </motion.p>
          
          <motion.div 
            className="hero-stats"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeInUp} className="stat">
              <h3>5000+</h3>
              <p>Happy Travelers</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="stat">
              <h3>50+</h3>
              <p>Destinations</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="stat">
              <h3>10+</h3>
              <p>Years Experience</p>
            </motion.div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/trips" className="btn btn-primary">
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Explore Trips →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h2>
        
        <motion.div 
          className="services-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="service-card"
              variants={scaleIn}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="service-icon"
                animate={floatAnimation}
              >
                {service.icon}
              </motion.div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Trips */}
      <section className="featured-section">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Packages
        </motion.h2>
        
        <motion.div 
          className="featured-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {trips.slice(0, 3).map((trip, index) => (
            <motion.div
              key={trip.id}
              className="featured-card"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.03,
                transition: { type: "spring", stiffness: 300 }
              }}
              custom={index}
            >
              <motion.div 
                className="card-badge"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Popular
              </motion.div>
              <img src={trip.img} alt={trip.title} />
              <h3>{trip.title}</h3>
              <p className="price">{trip.price}</p>
              <Link to={`/trip/${trip.id}`} className="btn btn-outline">
                View Details
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="cta-content"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <motion.h2
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Ready for Your Next Adventure?
          </motion.h2>
          <p>Contact us now for custom packages and special discounts!</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/contact" className="btn btn-light">
              Get Free Consultation
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}

/* -------------------------------
   SERVICES PAGE
-------------------------------- */
function Services() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="services-page"
    >
      <h1>Our Services</h1>
      
      <motion.div 
        className="services-detail"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="service-detail-card"
            variants={index % 2 === 0 ? slideInLeft : slideInRight}
          >
            <div className="service-icon-large">{service.icon}</div>
            <div>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <ul>
                <li>24/7 Support</li>
                <li>Best Price Guarantee</li>
                <li>Flexible Booking</li>
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------
   TRIPS PAGE WITH ANIMATIONS
-------------------------------- */
function Trips() {
  const [filter, setFilter] = useState("all");
  
  const filteredTrips = filter === "all" 
    ? trips 
    : trips.filter(trip => trip.price.includes(filter));

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="trips-page"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Travel Packages
      </motion.h1>

      <motion.div 
        className="filter-buttons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {["all", "PKR 95,000", "PKR 120,000", "PKR 150,000", "PKR 180,000", "PKR 250,000"].map((price) => (
          <motion.button
            key={price}
            className={`filter-btn ${filter === price ? "active" : ""}`}
            onClick={() => setFilter(price)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={filter === price ? {
              scale: [1, 1.1, 1],
              transition: { duration: 2, repeat: Infinity }
            } : {}}
          >
            {price === "all" ? "All Packages" : `Under ${price}`}
          </motion.button>
        ))}
      </motion.div>

      <motion.div 
        className="trip-grid"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {filteredTrips.map((trip, index) => (
          <motion.div
            key={trip.id}
            className="trip-card"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.03,
              y: -10,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="card-image"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={trip.img} alt={trip.title} />
              <motion.div 
                className="card-overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <span>Click for details</span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="card-content"
              variants={fadeInUp}
            >
              <h3>{trip.title}</h3>
              <p className="duration">{trip.duration}</p>
              <p className="description">{trip.description}</p>
              
              <motion.div 
                className="highlights"
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: "auto" }}
              >
                {trip.highlights.map((highlight, i) => (
                  <motion.span 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    ✓ {highlight}
                  </motion.span>
                ))}
              </motion.div>
              
              <div className="card-footer">
                <motion.span 
                  className="price"
                  animate={{ 
                    color: ["#4a6bff", "#ff6b6b", "#4a6bff"],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {trip.price}
                </motion.span>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={`/trip/${trip.id}`} className="btn">
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Book Now →
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------
   TRIP DETAIL PAGE WITH ANIMATIONS
-------------------------------- */
function TripDetail() {
  const { id } = useParams();
  const tour = trips.find((t) => t.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const galleryImages = tour.images || FAKE_IMAGES.gallery;

  const whatsappMessage = `Hello, I want to book: ${tour.title} - ${tour.price}`;
  const whatsappLink = `https://wa.me/923001234567?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="trip-detail-page"
    >
      {/* Hero Section */}
      <motion.div 
        className="detail-hero"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img src={tour.img} alt={tour.title} />
        <motion.div 
          className="hero-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {tour.title}
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {tour.duration}
          </motion.p>
        </motion.div>
      </motion.div>

      <div className="detail-content">
        {/* Main Info */}
        <motion.div 
          className="detail-main"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeInUp} className="detail-card">
            <h2>Package Details</h2>
            <p>{tour.description}</p>
            
            <motion.div 
              className="price-display"
              animate={{ 
                scale: [1, 1.02, 1],
                boxShadow: ["0 0 0 rgba(74,107,255,0.4)", "0 0 20px rgba(74,107,255,0.6)", "0 0 0 rgba(74,107,255,0.4)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>Starting from</span>
              <h3>{tour.price}</h3>
            </motion.div>
          </motion.div>

          {/* Inclusions */}
          <motion.div variants={fadeInUp} className="detail-card">
            <h2>What's Included</h2>
            <div className="inclusions">
              {tour.inclusions.map((item, index) => (
                <motion.div
                  key={index}
                  className="inclusion-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 0.5 }}
                  >
                    ✓
                  </motion.span>
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div variants={fadeInUp} className="detail-card">
            <h2>Tour Highlights</h2>
            <div className="highlights-grid">
              {tour.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="highlight-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: [0, -5, 5, 0]
                  }}
                >
                  <div className="highlight-number">{index + 1}</div>
                  <p>{highlight}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Gallery */}
        <motion.div 
          className="detail-gallery"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2>Gallery</h2>
          <div className="gallery">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`Gallery ${index + 1}`} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Booking CTA */}
        <motion.div 
          className="booking-cta"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div 
            className="cta-content"
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <h2>Ready to Book?</h2>
            <p>Limited spots available for this tour!</p>
            
            <div className="cta-buttons">
              <motion.a
                href={whatsappLink}
                target="_blank"
                className="btn btn-whatsapp"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: ["0 5px 15px rgba(37, 211, 102, 0.3)", "0 5px 25px rgba(37, 211, 102, 0.5)", "0 5px 15px rgba(37, 211, 102, 0.3)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📱 Book on WhatsApp
              </motion.a>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact" className="btn btn-outline">
                  📞 Call for Details
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* -------------------------------
   REVIEWS PAGE WITH ANIMATIONS
-------------------------------- */
function Reviews() {
  const [filter, setFilter] = useState("all");

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="reviews-page"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Customer Reviews
      </motion.h1>

      {/* Rating Summary */}
      <motion.div 
        className="rating-summary"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="overall-rating"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <h2>4.8</h2>
          <div className="stars">★★★★★</div>
          <p>Based on 500+ reviews</p>
        </motion.div>
        
        <div className="rating-bars">
          {[5, 4, 3, 2, 1].map((stars) => (
            <motion.div 
              key={stars}
              className="rating-bar"
              initial={{ width: 0 }}
              animate={{ width: `${stars * 20}%` }}
              transition={{ delay: 0.3 + stars * 0.1 }}
            >
              <span>{stars} ★</span>
              <div className="bar">
                <motion.div 
                  className="fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + stars * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Reviews Grid */}
      <motion.div 
        className="reviews-grid"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="review-card"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.03,
              y: -5,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <div className="review-header">
              <motion.div 
                className="avatar"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              >
                {review.name.charAt(0)}
              </motion.div>
              <div>
                <h3>{review.name}</h3>
                <p className="tour">{review.tour}</p>
              </div>
            </div>
            
            <div className="stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
            
            <motion.p 
              className="review-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              "{review.comment}"
            </motion.p>
            
            <div className="review-footer">
              <span>{review.date}</span>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="verified">✓ Verified</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Add Review Form */}
      <motion.div 
        className="add-review"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Share Your Experience</h2>
        <form>
          <input type="text" placeholder="Your Name" />
          <select>
            <option>Select Tour</option>
            {trips.map(trip => (
              <option key={trip.id}>{trip.title}</option>
            ))}
          </select>
          <textarea placeholder="Your review..." rows="4"></textarea>
          <motion.button
            type="submit"
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              background: ["#4a6bff", "#ff6b6b", "#4a6bff"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Submit Review
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------
   ABOUT PAGE WITH ANIMATIONS
-------------------------------- */
function About() {
  const milestones = [
    { year: "2014", event: "Company Founded" },
    { year: "2016", event: "1000+ Customers Served" },
    { year: "2018", event: "Expanded to 20+ Countries" },
    { year: "2020", event: "Award for Best Tour Operator" },
    { year: "2023", event: "5000+ Happy Travelers" }
  ];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="about-page"
    >
      {/* Hero Section */}
      <motion.section 
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          About SURTI Tours & Travels
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Creating unforgettable travel experiences since 2014
        </motion.p>
      </motion.section>

      {/* Story Section */}
      <motion.section 
        className="story-section"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div variants={slideInLeft} className="story-content">
          <h2>Our Story</h2>
          <p>
            SURTI Tours & Travels was founded with a simple vision: to make international travel 
            accessible, affordable, and extraordinary for everyone. What started as a small travel 
            agency has grown into one of Pakistan's most trusted tour operators.
          </p>
          <p>
            With over 10 years of experience, we've helped more than 5000 travelers explore 
            50+ countries, creating memories that last a lifetime.
          </p>
        </motion.div>
        
        <motion.div variants={slideInRight} className="story-image">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <img src={FAKE_IMAGES.aboutStory} alt="Our Story" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section 
        className="mission-section"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div 
          className="mission-card"
          variants={fadeInUp}
          whileHover={{ y: -10 }}
        >
          <motion.div 
            className="icon"
            animate={floatAnimation}
          >
            🎯
          </motion.div>
          <h3>Our Mission</h3>
          <p>
            To provide exceptional travel experiences through personalized service, 
            competitive pricing, and unwavering commitment to customer satisfaction.
          </p>
        </motion.div>
        
        <motion.div 
          className="mission-card"
          variants={fadeInUp}
          whileHover={{ y: -10 }}
        >
          <motion.div 
            className="icon"
            animate={floatAnimation}
          >
            👁️
          </motion.div>
          <h3>Our Vision</h3>
          <p>
            To become the most trusted travel partner for Pakistani travelers worldwide, 
            known for reliability, innovation, and excellence in service.
          </p>
        </motion.div>
        
        <motion.div 
          className="mission-card"
          variants={fadeInUp}
          whileHover={{ y: -10 }}
        >
          <motion.div 
            className="icon"
            animate={floatAnimation}
          >
            💎
          </motion.div>
          <h3>Our Values</h3>
          <p>
            Integrity, Transparency, Customer First, Innovation, and Passion for Travel 
            are the core values that guide everything we do.
          </p>
        </motion.div>
      </motion.section>

      {/* Timeline */}
      <motion.section className="timeline-section">
        <h2>Our Journey</h2>
        <div className="timeline">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div 
                className="timeline-dot"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />
              <div className="timeline-content">
                <h3>{milestone.year}</h3>
                <p>{milestone.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {[
            { name: "Sami", role: "Founder & CEO", img: FAKE_IMAGES.team[0] },
            { name: "Ali", role: "Travel Consultant", img: FAKE_IMAGES.team[1] },
            { name: "Sara", role: "Customer Service", img: FAKE_IMAGES.team[2] },
            { name: "Ahmed", role: "Tour Guide", img: FAKE_IMAGES.team[3] }
          ].map((member, index) => (
            <motion.div
              key={index}
              className="team-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="team-img"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img src={member.img} alt={member.name} />
              </motion.div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

/* -------------------------------
   CONTACT PAGE WITH ANIMATIONS
-------------------------------- */
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    tour: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", message: "", tour: "" });
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="contact-page"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contact Us
      </motion.h1>

      <div className="contact-container">
        {/* Contact Info */}
        <motion.div 
          className="contact-info"
          variants={slideInLeft}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            className="info-card"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="info-icon"
              animate={pulseAnimation}
            >
              📧
            </motion.div>
            <h3>Email</h3>
            <p>info@surtitours.com</p>
            <p>support@surtitours.com</p>
          </motion.div>

          <motion.div 
            className="info-card"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="info-icon"
              animate={pulseAnimation}
            >
              📱
            </motion.div>
            <h3>Phone</h3>
            <p>+92 300 1234567</p>
            <p>+92 321 7654321</p>
          </motion.div>

          <motion.div 
            className="info-card"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="info-icon"
              animate={pulseAnimation}
            >
              🏢
            </motion.div>
            <h3>Address</h3>
            <p>123 Travel Street, Karachi</p>
            <p>Pakistan</p>
          </motion.div>

          <motion.div 
            className="info-card"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="info-icon"
              animate={pulseAnimation}
            >
              ⏰
            </motion.div>
            <h3>Hours</h3>
            <p>Mon - Fri: 9AM - 7PM</p>
            <p>Sat - Sun: 10AM - 5PM</p>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          className="contact-form"
          variants={slideInRight}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            className="form-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2>Get in Touch</h2>
            <p>We'll respond within 24 hours</p>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <select
                value={formData.tour}
                onChange={(e) => setFormData({...formData, tour: e.target.value})}
              >
                <option value="">Select Tour Interest</option>
                {trips.map(trip => (
                  <option key={trip.id} value={trip.title}>{trip.title}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <textarea
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="btn btn-submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                scale: [1, 1.02, 1],
                transition: { duration: 2, repeat: Infinity }
              }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* WhatsApp CTA */}
      <motion.div 
        className="whatsapp-cta"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="whatsapp-content"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <motion.h2
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Need Immediate Assistance?
          </motion.h2>
          <p>Chat with us directly on WhatsApp</p>
          
          <motion.a
            href="https://wa.me/923001234567"
            target="_blank"
            className="btn btn-whatsapp-large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: ["0 5px 15px rgba(37, 211, 102, 0.3)", "0 5px 25px rgba(37, 211, 102, 0.5)", "0 5px 15px rgba(37, 211, 102, 0.3)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💬
            </motion.span>
            Chat on WhatsApp
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------
   FOOTER WITH ANIMATIONS
-------------------------------- */
function Footer() {
  const socialLinks = [
    { icon: "📘", label: "Facebook", link: "#" },
    { icon: "📷", label: "Instagram", link: "#" },
    { icon: "🐦", label: "Twitter", link: "#" },
    { icon: "💼", label: "LinkedIn", link: "#" }
  ];

  const quickLinks = [
    { label: "Home", link: "/" },
    { label: "Trips", link: "/trips" },
    { label: "Services", link: "/services" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" }
  ];

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="footer-content">
        {/* Company Info */}
        <motion.div 
          className="footer-section"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div 
            className="footer-logo"
            whileHover={{ scale: 1.1 }}
          >
            <img src={img} alt="Logo" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
            <h3>SURTI Tours & Travels</h3>
          </motion.div>
          <p>
            Creating unforgettable travel experiences with trust, 
            reliability, and exceptional service since 2014.
          </p>
          
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                className="social-icon"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          className="footer-section"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h3>Quick Links</h3>
          <ul>
            {quickLinks.map((link, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <Link to={link.link}>{link.label}</Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          className="footer-section"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3>Contact Info</h3>
          <motion.div 
            className="contact-item"
            whileHover={{ x: 10 }}
          >
            <span>📍</span>
            <p>123 Travel Street, Karachi, Pakistan</p>
          </motion.div>
          <motion.div 
            className="contact-item"
            whileHover={{ x: 10 }}
          >
            <span>📞</span>
            <p>+92 300 1234567</p>
          </motion.div>
          <motion.div 
            className="contact-item"
            whileHover={{ x: 10 }}
          >
            <span>📧</span>
            <p>info@surtitours.com</p>
          </motion.div>
        </motion.div>

        {/* Newsletter */}
        <motion.div 
          className="footer-section"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3>Newsletter</h3>
          <p>Subscribe for travel deals & updates</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <motion.button
              className="btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                background: ["#4a6bff", "#ff6b6b", "#4a6bff"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div 
        className="copyright"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p>© 2025 SURTI Tours & Travels. All Rights Reserved.</p>
        <motion.p
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Designed with ❤️ by Sami
        </motion.p>
      </motion.div>
    </motion.footer>
  );
}

/* -------------------------------
   PAGE TRANSITION WRAPPER
-------------------------------- */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/trip/:id" element={<TripDetail />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </AnimatePresence>
  );
}

/* -------------------------------
   MAIN APP
-------------------------------- */
export default function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
}