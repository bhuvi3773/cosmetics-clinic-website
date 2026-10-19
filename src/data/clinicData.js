/**
 * Centralized Clinic Configuration & Content
 * 
 * NOTE TO CLIENT / DEVELOPER:
 * All business details, contact information, services, and pricing in this file
 * are DEMO PLACEHOLDERS. Do not deploy to production with unverified contact details.
 * 
 * Replace placeholders below with verified clinic information.
 */

export const clinicConfig = {
  // Brand Identity (Sample placeholder)
  brand: {
    name: "Aura Skin & Aesthetics",
    shortName: "Aura",
    tagline: "Customizable Aesthetic Clinic Website Template",
    monogram: "A",
    subtitle: "Clinic Website Template [Demo]",
    isDemo: true,
  },

  // Contact Points (Placeholders — WhatsApp number kept empty until confirmed)
  contact: {
    // Real international format phone number for WhatsApp: e.g. "447123456789" (digits only, no + or spaces)
    // Kept empty until confirmed by clinic owner
    whatsAppNumber: "", 
    whatsAppDisplay: "[WhatsApp Number — Not Yet Configured]",
    
    phone: "",
    phoneDisplay: "[Phone Number — Not Yet Configured]",
    
    email: "consultations@example-clinic.com",
    emailDisplay: "[Email Address — Demo Placeholder]",
    
    address: "Suite 400, 120 Sanctuary Way, Central Health District",
    addressDisplay: "[Suite 400, 120 Sanctuary Way — Demo Address]",
    
    openingHours: "Mon – Fri: 9:00 AM – 6:00 PM | Sat: 10:00 AM – 3:00 PM | Sun: Closed",
    openingHoursDisplay: "[Mon–Fri: 9am–6pm | Sat: 10am–3pm — Placeholder]",
    
    defaultEnquiryMessage: "Hello, I would like to enquire about your clinic services and consultation availability.",
  },

  // Primary Navigation
  navigation: [
    { id: "home", label: "Home", href: "#home" },
    { id: "treatments", label: "Treatments", href: "#treatments" },
    { id: "packages", label: "Packages", href: "#packages" },
    { id: "about", label: "About Clinic", href: "#about" },
    { id: "practitioner", label: "Practitioner", href: "#practitioner" },
    { id: "gallery", label: "Gallery", href: "#gallery" },
    { id: "faqs", label: "FAQs", href: "#faqs" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],

  // Hero Section
  hero: {
    badge: "Aesthetic Clinic Template • Customizable Demo",
    title: {
      light: "Personalized Aesthetic Care &",
      accent: "Thoughtful Skin Focus",
    },
    description:
      "A client-ready front-end website template for aesthetics clinics and skincare practices. All treatments, practitioner credentials, and consultation details below are sample placeholders ready to be customized with verified clinic information.",
    primaryCta: {
      text: "Consult on WhatsApp",
      href: "#contact",
    },
    secondaryCta: {
      text: "Explore Treatments",
      href: "#treatments",
    },
    image: {
      src: "/images/clinic-treatment-suite.jpg",
      alt: "Modern minimalist aesthetic treatment suite interior for website template demonstration",
    },
    floatingBadge: {
      title: "Clinic Feature [Sample]",
      text: "Replace with your clinic's verified consultation format",
    },
    trustPillars: [
      {
        id: "pillar-consultation",
        title: "Consultation Focus [Sample]",
        subtitle: "Replace with your confirmed intake approach",
      },
      {
        id: "pillar-suites",
        title: "Treatment Setting [Sample]",
        subtitle: "Replace with your verified clinic premises details",
      },
      {
        id: "pillar-custom",
        title: "Tailored Protocols [Sample]",
        subtitle: "Replace with your confirmed service offerings",
      },
    ],
  },

  // Treatments & Services (Sample Menu)
  treatments: {
    sectionTag: "Clinical Treatments [Sample Menu]",
    title: "Targeted Facial & Dermal Care",
    subtitle: "All treatments listed below are sample demo placeholders. Replace with your clinic's confirmed clinical menu and consultation policies.",
    categories: ["All", "Facial Care", "Skin Resurfacing", "Barrier & Hydration"],
    items: [
      {
        id: "treatment-dermal-peel",
        title: "Bespoke Dermal Peel [Sample]",
        category: "Skin Resurfacing",
        description: "A tailored chemical exfoliation protocol designed to address surface congestion, uneven texture, and dull skin tone.",
        duration: "45 Mins • In-Clinic",
        suitableFor: "Uneven texture & dullness",
        samplePrice: "From £120 [Demo Price]",
        badge: "Popular [Sample]",
        enquiryMessage: "Hello, I would like to enquire about a consultation for the Bespoke Dermal Peel [Sample].",
      },
      {
        id: "treatment-hydration-infusion",
        title: "Hydration Infusion Therapy [Sample]",
        category: "Barrier & Hydration",
        description: "Deep dermal hydration utilizing targeted humectants and restorative serums to replenish the natural moisture barrier.",
        duration: "60 Mins • In-Clinic",
        suitableFor: "Dehydrated & compromised skin",
        samplePrice: "From £140 [Demo Price]",
        badge: "Essential [Sample]",
        enquiryMessage: "Hello, I would like to enquire about a consultation for the Hydration Infusion Therapy [Sample].",
      },
      {
        id: "treatment-collagen-facial",
        title: "Targeted Collagen Facial [Sample]",
        category: "Facial Care",
        description: "A restorative in-clinic facial focusing on micro-circulation, gentle lymphatic stimulation, and peptide infusion.",
        duration: "60 Mins • In-Clinic",
        suitableFor: "Early fine lines & skin fatigue",
        samplePrice: "From £160 [Demo Price]",
        badge: "Signature [Sample]",
        enquiryMessage: "Hello, I would like to enquire about a consultation for the Targeted Collagen Facial [Sample].",
      },
      {
        id: "treatment-clarifying-protocol",
        title: "Clarifying Skin Protocol [Sample]",
        category: "Skin Resurfacing",
        description: "Calibrated pore-clearing and calming protocol suitable for blemish-prone skin seeking gentle barrier preservation.",
        duration: "50 Mins • In-Clinic",
        suitableFor: "Blemish-prone & congested skin",
        samplePrice: "From £130 [Demo Price]",
        badge: "Targeted [Sample]",
        enquiryMessage: "Hello, I would like to enquire about a consultation for the Clarifying Skin Protocol [Sample].",
      },
      {
        id: "treatment-barrier-recovery",
        title: "Restorative Barrier Therapy [Sample]",
        category: "Barrier & Hydration",
        description: "Soothing care designed for sensitized skin, utilizing lipid-rich emollients and gentle calming compresses.",
        duration: "45 Mins • In-Clinic",
        suitableFor: "Sensitive & reactive skin types",
        samplePrice: "From £115 [Demo Price]",
        badge: "Gentle [Sample]",
        enquiryMessage: "Hello, I would like to enquire about a consultation for the Restorative Barrier Therapy [Sample].",
      },
      {
        id: "treatment-custom-consultation",
        title: "Comprehensive Skin Assessment [Sample]",
        category: "Facial Care",
        description: "In-depth one-on-one skin analysis, baseline imaging review, and custom home-care protocol guidance.",
        duration: "30 Mins • In-Clinic",
        suitableFor: "First-time clinic visitors",
        samplePrice: "From £60 [Demo Price]",
        badge: "Consultation [Sample]",
        enquiryMessage: "Hello, I would like to enquire about booking a Comprehensive Skin Assessment [Sample].",
      },
    ],
  },

  // Curated Packages & Offers
  packages: {
    sectionTag: "Curated Protocols [Sample Packages]",
    title: "Structured Treatment Series",
    subtitle: "Recommended multi-session plans designed for structured skin rejuvenation. Prices and inclusions are demonstration placeholders.",
    items: [
      {
        id: "pkg-renewal",
        name: "The Renewal Series [Sample]",
        subtitle: "3-Month Progressive Treatment Plan",
        samplePrice: "£340 [Demo Price]",
        originalPriceNote: "Sample package valuation",
        inclusions: [
          "3x Tailored In-Clinic Skin Sessions",
          "1x Baseline Dermal Evaluation & Review",
          "Post-Treatment Barrier Soothing Protocol",
          "Dedicated Aftercare Guidance via WhatsApp",
        ],
        highlight: "Most Popular [Sample]",
        enquiryMessage: "Hello, I would like to enquire about The Renewal Series [Sample Package].",
      },
      {
        id: "pkg-glow",
        name: "Seasonal Glow Duo [Sample]",
        subtitle: "Targeted 2-Visit Radiance Boost",
        samplePrice: "£210 [Demo Price]",
        originalPriceNote: "Sample package valuation",
        inclusions: [
          "1x Clarifying Resurfacing Facial",
          "1x Deep Hydration Infusion Session",
          "Customized Home Skincare Plan",
        ],
        highlight: "Seasonal [Sample]",
        enquiryMessage: "Hello, I would like to enquire about the Seasonal Glow Duo [Sample Package].",
      },
      {
        id: "pkg-barrier",
        name: "Complete Barrier Care [Sample]",
        subtitle: "Restorative Regimen for Sensitive Skin",
        samplePrice: "£280 [Demo Price]",
        originalPriceNote: "Sample package valuation",
        inclusions: [
          "2x Intensive Barrier Repair Sessions",
          "1x Follow-up Skin Tolerance Check",
          "Specialized Calming Compress Protocol",
        ],
        highlight: "Gentle Care [Sample]",
        enquiryMessage: "Hello, I would like to enquire about the Complete Barrier Care [Sample Package].",
      },
    ],
  },

  // About Clinic & Values
  about: {
    sectionTag: "About The Clinic [Sample]",
    title: "A Calm, Consultation-First Aesthetic Environment",
    lead: "A private aesthetic practice focused on thoughtful skin health, individual consultations, and quiet, unhurried care.",
    story1: "Founded on the principle that aesthetic care should enhance natural facial harmony, our studio provides a tranquil sanctuary where clients receive honest, personalized assessments without pressure or exaggerated promises.",
    story2: "This template is fully modular: all text, clinic values, and facility descriptions can be updated to reflect your verified clinic history, hygiene accreditations, and local premises details.",
    values: [
      {
        id: "val-consultation",
        title: "Consultation-First",
        description: "Every treatment is preceded by a personalized discussion of your skin goals and medical suitability.",
      },
      {
        id: "val-hygiene",
        title: "Clinical Hygiene Standards",
        description: "Private treatment suites sanitized strictly between appointments for safety and peace of mind.",
      },
      {
        id: "val-natural",
        title: "Subtle & Natural Focus",
        description: "Our philosophy prioritizes skin integrity, longevity, and natural-looking rejuvenation.",
      },
      {
        id: "val-aftercare",
        title: "Supportive Aftercare",
        description: "Detailed, practical post-treatment instructions and direct check-in communication provided.",
      },
    ],
  },

  // Practitioner Profile (Sample Placeholder)
  practitioner: {
    sectionTag: "Practitioner Profile [Sample Placeholder]",
    title: "Meet Your Lead Practitioner [Placeholder]",
    name: "[Practitioner Full Name — Placeholder]",
    role: "Lead Aesthetic Practitioner & Clinic Director [Sample]",
    bio: "With professional training in aesthetic medicine and dermal health, our lead practitioner is dedicated to delivering personalized, ethical care. We believe in unhurried consultations that help you make informed decisions about your skin health. (Note: Replace this sample text with verified practitioner background, qualifications, and certified clinical experience).",
    credentialsNotice: "Notice: Real practitioner credentials, regulatory registrations (e.g. GMC / NMC / GDC), and certified training must be confirmed by the clinic owner before live deployment.",
    credentials: [
      "[GMC / NMC / GDC Registration Placeholder]",
      "[Postgraduate Aesthetic Medicine Qualification Placeholder]",
      "[Fully Insured Aesthetic Practitioner Placeholder]",
      "[Certified In-Clinic Complications Management Placeholder]",
    ],
  },

  // How It Works / What to Expect (3 Steps)
  howItWorks: {
    sectionTag: "What To Expect [Sample]",
    title: "Your 3-Step Consultation Journey",
    subtitle: "A transparent, structured approach ensuring you feel informed and comfortable at every stage.",
    steps: [
      {
        number: "01",
        title: "Initial WhatsApp Enquiry",
        description: "Reach out with your questions or treatment interests. We will discuss scheduling options and answer preliminary questions.",
      },
      {
        number: "02",
        title: "In-Person Consultation",
        description: "Visit the clinic for a private, comprehensive skin evaluation where we assess suitability and co-create your treatment plan.",
      },
      {
        number: "03",
        title: "In-Clinic Treatment & Aftercare",
        description: "Receive your treatment in our quiet, hygienic suite, accompanied by thorough post-care advice and follow-up support.",
      },
    ],
  },

  // Clinic Premises Gallery
  gallery: {
    sectionTag: "Clinic Ambiance & Premises",
    title: "Tour Our Clinic Environment",
    subtitle: "Explore our serene reception lounge, private treatment suites, and tranquil consultation spaces. Strictly clinic premises photography — no fabricated patient results.",
    items: [
      {
        id: "gal-reception",
        title: "Reception & Welcome Lounge",
        category: "Arrival Lounge",
        image: "/images/clinic-reception-lounge.jpg",
        alt: "Modern minimalist clinic reception lounge with travertine desk and soft armchairs",
      },
      {
        id: "gal-suite",
        title: "Private Aesthetic Treatment Suite",
        category: "Treatment Suite",
        image: "/images/clinic-treatment-suite.jpg",
        alt: "Serene clinical facial treatment room with modern treatment lounge and natural daylight",
      },
      {
        id: "gal-consultation",
        title: "One-on-One Consultation Desk",
        category: "Consultation Room",
        image: "/images/clinic-consultation-desk.jpg",
        alt: "Tranquil consultation room with travertine desk overlooking private garden courtyard",
      },
    ],
  },

  // Patient Feedback (Sample Reviews Clearly Labeled)
  reviews: {
    sectionTag: "Patient Feedback [Sample Demonstration]",
    title: "Sample Patient Experiences",
    subtitle: "DEMO CONTENT: The reviews below are fictional samples for template demonstration only. Replace with verified, authorized feedback from genuine clinic patients.",
    items: [
      {
        id: "rev-1",
        author: "Sarah M. [Sample Review]",
        treatment: "Custom Facial Assessment [Sample]",
        rating: 5,
        quote: "The consultation was calm, unhurried, and very informative. The clinic environment is exceptionally peaceful, and I appreciated the realistic advice.",
      },
      {
        id: "rev-2",
        author: "Elena R. [Sample Review]",
        treatment: "Bespoke Dermal Peel [Sample]",
        rating: 5,
        quote: "A genuinely professional clinic experience. Thorough hygiene protocols and honest recommendations with zero sales pressure.",
      },
      {
        id: "rev-3",
        author: "James T. [Sample Review]",
        treatment: "Hydration Infusion Protocol [Sample]",
        rating: 5,
        quote: "Private treatment suite was spotless and relaxing. Follow-up aftercare guidance provided via WhatsApp was very supportive.",
      },
    ],
  },

  // FAQs Accordion
  faqs: {
    sectionTag: "Frequently Asked Questions",
    title: "Clear Answers for Your Visit",
    subtitle: "Common questions regarding appointment bookings, consultation expectations, and clinic policies.",
    items: [
      {
        id: "faq-booking",
        question: "How do I schedule an initial consultation?",
        answer: "You can enquire directly via WhatsApp or telephone using the links on this page. We will discuss your treatment interests, answer initial questions, and schedule a convenient appointment time at our clinic.",
      },
      {
        id: "faq-first-visit",
        question: "What should I expect during my first visit?",
        answer: "Your initial visit is a dedicated consultation. We review your skin history, discuss your specific goals, explain recommended treatment options, and ensure you have all questions answered before any procedure is scheduled.",
      },
      {
        id: "faq-suitability",
        question: "Are treatments suitable for all skin types?",
        answer: "Clinical suitability is always assessed individually during your in-person consultation. Certain treatments may not be recommended for specific skin conditions or medical histories. Your practitioner will advise on safe, tailored options.",
      },
      {
        id: "faq-location",
        question: "Where is the clinic located and is there parking?",
        answer: "We are located at [Suite 400, 120 Sanctuary Way — Demo Address]. Dedicated visitor parking is available on-site with step-free access to our reception.",
      },
      {
        id: "faq-cancellation",
        question: "What is your rescheduling and cancellation policy?",
        answer: "We kindly request at least 48 hours notice for any appointment rescheduling or cancellations so that we can offer the appointment slot to other patients.",
      },
      {
        id: "faq-guarantees",
        question: "Do you guarantee specific cosmetic outcomes?",
        answer: "In compliance with ethical medical guidelines, we do not guarantee specific or identical results. Individual response to aesthetic procedures varies based on skin type, lifestyle, and adherence to aftercare guidance.",
      },
    ],
  },

  // Quick Enquiry Form
  contactForm: {
    sectionTag: "Direct Clinic Contact",
    title: "Connect with Our Clinic",
    subtitle: "Send a direct consultation enquiry via WhatsApp. All consultations take place in-person at our clinic.",
    notice: "Zero Server Storage: Submitting this form prepares a prefilled WhatsApp message directly in your WhatsApp app. No personal information is saved on this website.",
  },

  // Medical Safeguards & Disclaimers
  disclaimer: "Medical Safeguard Notice: This is a front-end website template for an aesthetic clinic. All clinical services require an in-person assessment by a qualified, registered healthcare practitioner. We do not offer remote diagnoses, online prescriptions, or guaranteed cosmetic outcomes. All appointments are in-clinic only.",
};

/**
 * Builds a standardized WhatsApp link.
 * If no phone number is configured, returns demo link and triggers placeholder notification.
 * 
 * @param {string} [customMessage] - Optional custom message to prefill in WhatsApp
 * @returns {{ url: string | null, isConfigured: boolean, rawNumber: string, displayMessage: string, helperNote: string | null }}
 */
export function getWhatsAppAction(customMessage) {
  const rawNumber = clinicConfig.contact.whatsAppNumber.replace(/\D/g, "");
  const message = customMessage || clinicConfig.contact.defaultEnquiryMessage;
  const encodedMsg = encodeURIComponent(message);

  if (!rawNumber || rawNumber.length < 5) {
    return {
      url: `https://wa.me/?text=${encodedMsg}`,
      isConfigured: false,
      rawNumber: "",
      displayMessage: message,
      helperNote: "Clinic WhatsApp number has not yet been configured in clinicData.js.",
    };
  }

  return {
    url: `https://wa.me/${rawNumber}?text=${encodedMsg}`,
    isConfigured: true,
    rawNumber,
    displayMessage: message,
    helperNote: null,
  };
}
