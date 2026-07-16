import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './LandingPage.css';

const IMAGES = [
  'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503376712344-652d2b9840c5?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop'
];

/* ─── Service Data ─── */
const SERVICES = [
  { id: 'enquiry', label: 'Enquiry', desc: 'Ask our team anything — instant response.', image: IMAGES[0] },
  { id: 'ppf', label: 'PPF & Custom', desc: 'Real-time 3D paint protection & colour.', ctaAction: 'configurator', image: IMAGES[5] },
  { id: 'gis', label: 'GIS Display', desc: 'Geo-mapped inventory across the city.', image: IMAGES[1] },
  { id: 'talk', label: 'Talk to Staff', desc: 'Direct line to our team or CEO.', image: IMAGES[2] },
  { id: 'showroom', label: 'View Showroom', desc: 'Immersive virtual showroom tour.', image: IMAGES[3] },
  { id: 'inventory', label: 'Our Inventory', desc: 'Browse our full premium catalogue.', image: IMAGES[4] },
  { id: 'maintenance', label: 'Maintenance', desc: 'Schedule servicing & diagnostics.', image: IMAGES[0] },
  { id: 'data', label: 'Data & Records', desc: 'Manage your vehicle records securely.', image: IMAGES[1] },
  { id: 'scan', label: 'Our Platforms', desc: 'Scan to follow our channels.', image: IMAGES[2] },
  { id: 'booking', label: 'Book Appointment', desc: 'Reserve your slot instantly.', image: IMAGES[3] },
  { id: 'qr', label: 'Save Car via QR', desc: 'Save your favourite cars to your phone.', image: IMAGES[4] },
  { id: 'analytics', label: 'Analytics', desc: 'Track the most viewed models & trends.', image: IMAGES[5] },
  { id: 'rental', label: 'Rent a Car', desc: 'Rent from our fleet right here.', image: IMAGES[0] },
  { id: 'properties', label: 'Our Properties', desc: 'Explore Rolling Automobiles properties.', image: IMAGES[1] },
  { id: 'partners', label: 'Our Partners', desc: 'Meet the brands we collaborate with.', image: IMAGES[2] },
];

function MagneticButton({ children, onClick, className }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      onClick={onClick}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        animate={{ x: x * 0.3, y: y * 0.3 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
        className="block w-full h-full flex items-center justify-center"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

function ServiceItem({ item, index, onNavigate, scrollContainerRef }) {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    container: scrollContainerRef,
    offset: ["start end", "center center", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const ySkew = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const brightness = useTransform(scrollYProgress, [0, 0.5, 1], ["brightness(0.2)", "brightness(1)", "brightness(0.2)"]);

  const isClickable = !!item.ctaAction;

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={itemRef}
      style={{
        scale,
        opacity,
        filter: brightness,
        rotateX: ySkew
      }}
      onClick={() => isClickable && onNavigate(item.ctaAction)}
      className={`w-full max-w-6xl mx-auto flex flex-col group ${isClickable ? 'cursor-pointer' : ''}`}
    >
      <div className={`flex flex-col md:flex-row gap-8 md:gap-12 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
        <div className={`flex-1 w-full border-white/10 py-4 ${isEven ? 'border-l-2 pl-6 md:pl-8 text-left' : 'md:border-r-2 border-l-2 md:border-l-0 pl-6 md:pl-0 md:pr-8 text-left md:text-right'}`}>
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-5 backdrop-blur-md border border-white/10 bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] ${isEven ? '' : 'md:ml-auto'}`}>
            <span className="text-lg font-bold tracking-widest text-white/70 font-[Syne]">
              {index + 1}
            </span>
          </div>
          <h3 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight font-[Syne] uppercase">
            {item.label}
          </h3>
          <p className={`text-base md:text-xl text-white/50 max-w-xl leading-relaxed ${isEven ? '' : 'md:ml-auto'}`}>
            {item.desc}
          </p>
          {isClickable && (
            <div className={`mt-6 flex items-center gap-2 text-white/70 group-hover:text-white transition-colors duration-300 ${isEven ? 'justify-start' : 'justify-start md:justify-end'}`}>
              <span className="uppercase tracking-widest text-sm font-bold">Explore</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform duration-300 ${isEven ? 'group-hover:translate-x-2' : 'group-hover:translate-x-2 md:group-hover:-translate-x-2'}`}>
                {isEven ? (
                  <>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </>
                ) : (
                  <>
                    <line x1="5" y1="12" x2="19" y2="12" className="md:hidden"></line>
                    <polyline points="12 5 19 12 12 19" className="md:hidden"></polyline>
                    <line x1="19" y1="12" x2="5" y2="12" className="hidden md:block"></line>
                    <polyline points="12 19 5 12 12 5" className="hidden md:block"></polyline>
                  </>
                )}
              </svg>
            </div>
          )}
        </div>

        {/* Image Container */}
        <div className="flex-1 w-full relative aspect-video overflow-hidden rounded-xl">
          <img src={item.image} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
        </div>
      </div>

      {/* Visual Line Accent */}
      <motion.div
        className={`h-[1px] bg-gradient-to-r ${isEven ? 'from-transparent via-white/20 to-transparent' : 'from-transparent via-white/20 to-transparent'} w-full mt-12`}
        style={{ scaleX: scrollYProgress, originX: isEven ? 0 : 1 }}
      />
    </motion.div>
  );
}

function ServicesSection({ onNavigate, scrollContainerRef }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainerRef,
    offset: ["start end", "end start"]
  });

  const xParallax = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);
  const smoothX = useSpring(xParallax, { stiffness: 50, damping: 20 });

  return (
    <section ref={sectionRef} className="text-white px-6 md:px-12 relative z-20" style={{ overflowX: 'hidden' }}>

      <div className="max-w-7xl mx-auto relative z-10 pt-32 mb-24 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter text-center font-[Syne]"
        >
          TOP TIER <br /> <span className="text-gray-700">SERVICES</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="text-sm md:text-base text-white/50 font-sans tracking-widest uppercase text-center flex items-center justify-center gap-2">
            <span>Scroll to explore</span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </div>
          <div className="flex items-center gap-2 text-[0.6rem] md:text-xs text-white/30 uppercase tracking-[0.35em] font-[Syne]">

            <span>Tap any tile to select a service</span>

          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pb-40">
        <div className="flex flex-col gap-32">
          {SERVICES.map((svc, i) => (
            <ServiceItem key={svc.id} item={svc} index={i} onNavigate={onNavigate} scrollContainerRef={scrollContainerRef} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveClock() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now;
  });

  useEffect(() => {
    const tick = () => setTime(new Date());
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const hours = time.getHours();
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = String(hours % 12 || 12).padStart(2, '0');

  return (
    <div className="lp-clock" aria-label="Current time" aria-live="polite">
      <div className="lp-clock-time">
        <span className="lp-clock-hm">{h12}:{minutes}</span>
        <span className="lp-clock-sep">:</span>
        <span className="lp-clock-sec">{seconds}</span>
        <span className="lp-clock-ampm">{ampm}</span>
      </div>
      <div className="lp-clock-meta">
        <span className="lp-clock-line" />
        <span className="lp-clock-label">Local Time</span>
      </div>
    </div>
  );
}

export default function LandingPage({ onNavigate }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleNavigate = (action) => {
    setServicesOpen(false);
    setTimeout(() => {
      onNavigate(action);
    }, 100);
  };

  return (
    <div className="w-full bg-[#050505] overflow-x-hidden text-white font-sans h-screen">
      {/* ── Hero View ──────────────────────────────────────── */}
      <div className={`relative h-screen w-full overflow-hidden flex-col items-center justify-center flex`}>
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0" aria-hidden="true">
          <video
            className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-50' : 'opacity-0'}`}
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoLoaded(true)}
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
          >
            <source src="/bg.mp4" type="video/mp4" />
          </video>
          {/* Layered overlays */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.8) 100%)' }} />
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, black 2px, black 4px)' }} />
        </div>

        {/* Main Content */}
        <div className={`relative z-10 flex flex-col items-center justify-center text-center px-4 transition-opacity duration-500 ${servicesOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 32, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mb-5"
          >
            <div className="relative">
              <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden ring-1 ring-white/15 shadow-[0_0_48px_rgba(255,255,255,0.12)]">
                <img
                  src="/logo.jpeg"
                  alt="Rolling Automobiles"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(1.08) contrast(1.05)' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mb-5 origin-center"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
            className="text-[0.6rem] md:text-xs text-white/50 uppercase tracking-[0.45em] mb-12 font-[Syne] font-semibold"
          >
            Africa's No 1 Automotive Dealership
          </motion.p>

          <div className="relative flex items-center justify-center">
            {/* Blinking pulse ring */}
            <motion.span
              className="absolute inset-0 rounded-full border border-white/30 pointer-events-none"
              animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border border-white/15 pointer-events-none"
              animate={{ scale: [1, 1.36, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />
            <MagneticButton
              className="w-44 h-44 md:w-52 md:h-52 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white flex items-center justify-center font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-500 shadow-2xl shadow-white/5"
              onClick={() => setServicesOpen(true)}
            >
              <span className="flex flex-col items-center gap-1">
                <span className="text-base md:text-lg font-bold uppercase tracking-widest leading-none">Services</span>
                <span className="text-[0.5rem] md:text-[0.6rem] text-white/50 uppercase tracking-[0.3em] leading-none">Tap to explore</span>
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* Bottom HUD bar */}
        <div className="lp-bottom-hud">
          {/* Self Service Center */}
          <div className="lp-ssc">
            <span className="lp-ssc-dot" />
            <div className="lp-ssc-inner">
              <span className="lp-ssc-eyebrow">Abuja Cars</span>
              <span className="lp-ssc-text">Self Service Center</span>
            </div>
          </div>

          {/* 12-Hour Clock */}
          <LiveClock />
        </div>
      </div>

      {/* ── Services Section ───────────────────────────── */}
      {servicesOpen && (
        <div
          className="fixed inset-0 z-50 w-full h-full overflow-y-auto bg-black/40 backdrop-blur-md"
          ref={scrollContainerRef}
        >
          {/* Close button for Services */}
          <button
            className="fixed top-8 right-8 z-[100] text-white/50 hover:text-white transition-colors bg-black/20 p-4 rounded-full backdrop-blur-md"
            onClick={() => setServicesOpen(false)}
            aria-label="Close Services"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <ServicesSection onNavigate={handleNavigate} scrollContainerRef={scrollContainerRef} />
        </div>
      )}
    </div>
  );
}
