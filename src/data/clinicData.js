/**
 * Centralized Clinic Configuration & Content
 * 
 * NOTE TO CLIENT / DEVELOPER:
 * All business details, contact information, services, and pricing in this file
 * are DEMO PLACEHOLDERS. Do not deploy to production with invented contact details.
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
    isDemo: true, // Flag indicating demo/template placeholder mode
  },

  // Contact Points (Placeholders — WhatsApp number kept empty until confirmed)
  contact: {
    // Real international format phone number for WhatsApp: e.g. "447123456789" (digits only, no + or spaces)
    // Kept empty until confirmed by clinic owner
    whatsAppNumber: "", 
    whatsAppDisplay: "[WhatsApp Number — Not Yet Configured]",
    
    // Regular telephone for tel: links
    phone: "",
    phoneDisplay: "[Phone Number — Not Yet Configured]",
    
    email: "contact@example-clinic.com",
    emailDisplay: "[Email Address — Demo Placeholder]",
    
    address: "Clinic Address Line, City, Postal Code",
    addressDisplay: "[Clinic Address — Demo Placeholder]",
    
    openingHours: "Opening hours to be confirmed by clinic owner",
    openingHoursDisplay: "[Opening Hours — Demo Placeholder]",
    
    defaultEnquiryMessage: "Hello, I would like to enquire about your clinic services and consultation availability.",
  },

  // Primary Navigation
  navigation: [
    { id: "home", label: "Home", href: "#home" },
    { id: "treatments", label: "Treatments", href: "#treatments" },
    { id: "about", label: "About Clinic", href: "#about" },
    { id: "gallery", label: "Gallery", href: "#gallery" },
    { id: "faqs", label: "FAQs", href: "#faqs" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],

  // Hero Section (Neutral, customizable template copy — no unverified clinical claims)
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

  // Future batches placeholders
  treatmentsBatchNotice: "Treatments and protocol cards will be configured in Batch 2 with clear demo indicators.",
  disclaimer: "Medical Safeguard Notice: This is a website demonstration template. All clinical treatments require an in-person assessment by a qualified, registered professional. We do not offer online medical diagnoses, guaranteed outcomes, or remote prescriptions. Services are delivered in-clinic only.",
};

/**
 * Builds a standardized WhatsApp link.
 * If no phone number is configured, returns null and triggers placeholder notification.
 * 
 * @param {string} [customMessage] - Optional custom message to prefill in WhatsApp
 * @returns {{ url: string | null, isConfigured: boolean, displayMessage: string }}
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
