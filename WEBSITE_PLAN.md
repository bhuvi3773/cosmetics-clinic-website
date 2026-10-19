# WEBSITE_PLAN.md

## Reusable Premium Business Website Template

**Status:** Planning only --- no implementation approved yet\
**Business category:** Not confirmed; cosmetics is only an initial
possibility\
**Purpose:** Build a polished, responsive front-end template that can
later be adapted for different small businesses and included in the main
website.

## 1. Project vision

Create a visually excellent, client-ready business website with a strong
hero, varied page sections, service/product showcases, business and
owner information, and direct WhatsApp enquiries. The template must be
reusable: content, images, colours, services, prices, contact details,
and business identity should be easy to replace.

## 2. Technical direction

-   React 19
-   Vite 6
-   JavaScript
-   Vanilla CSS
-   Minimal dependencies
-   Responsive desktop, tablet, and mobile layouts
-   Frontend-only demonstration content and pricing
-   No database, authentication, payment gateway, delivery system, or
    backend unless separately approved later
-   Preserve existing Markdown project files and follow the existing
    project workflow

## 3. Planned website sections

1.  **Navigation:** Logo/business name, Home, About, Services/Products,
    Gallery, Pricing, Contact, and a prominent WhatsApp action.
2.  **Hero:** Strong headline, short business introduction, primary and
    secondary calls to action, and high-quality imagery.
3.  **Trust strip:** Short business highlights, only using verified
    claims in a real deployment.
4.  **About the business:** Story, values, experience, and owner
    introduction.
5.  **Services or products:** Visually rich cards with images,
    descriptions, optional prices, and enquiry actions.
6.  **Featured items:** Popular products, signature services,
    bestsellers, or packages.
7.  **Offers and pricing:** Price lists, packages, promotions, and
    custom-quote enquiry.
8.  **Gallery/portfolio:** Responsive image grid or masonry layout for
    products, completed work, or premises.
9.  **Why choose us:** Relevant benefits such as quality, reliability,
    experience, or customer service.
10. **How it works:** Three-step customer journey, adapted to the
    business.
11. **Testimonials:** Genuine reviews only in production; demo reviews
    must be clearly labelled as sample content.
12. **Owner and contact details:** Owner name and role, business phone,
    WhatsApp, address, opening hours, and optional map.
13. **FAQ:** Expandable answers to common questions.
14. **Final call to action:** Clear invitation to contact the business.
15. **Footer:** Business identity, navigation, contact information,
    social links, and copyright.

Sections should be configurable. For example, a cosmetics shop may
emphasize product categories and new arrivals, while a printing shop may
emphasize print services, samples, and quotation requests.

## 4. WhatsApp and enquiry experience

-   Use a configurable WhatsApp phone number in international format,
    with country code and no `+`, spaces, or punctuation in the URL
    value.
-   Create a reusable WhatsApp link builder that opens
    `https://wa.me/<number>` with an optional URL-encoded prefilled
    message.
-   Add relevant enquiry actions to the hero, service/product cards,
    pricing, and contact section.
-   Provide phone and email links when those details are supplied.
-   Clearly mark demo contact details as placeholders until real owner
    details are confirmed.
-   Do not invent the owner's name, number, address, opening hours, or
    social profiles.
-   WhatsApp opens an external conversation; the template does not send
    messages automatically.

## 5. Visual design principles

-   Strong editorial hero with bold typography and a clear visual focal
    point.
-   High-quality, replaceable imagery relevant to the selected business.
-   Varied layouts: alternating image/text sections, asymmetric grids,
    featured cards, full-width banners, and carefully composed
    galleries.
-   Consistent spacing, readable type hierarchy, and accessible
    contrast.
-   A configurable colour and typography system rather than a hard-coded
    cosmetics palette.
-   Subtle hover states and transitions; avoid distracting motion and
    respect reduced-motion preferences.
-   No 3D visuals or unrelated portrait imagery.
-   Avoid repetitive generic cards and excessive decorative effects.

## 6. Content and configuration

Keep business-specific content separate from presentation components.
Use a local configuration/data layer for:

-   Business name and tagline
-   Logo and brand colours
-   Navigation labels
-   Hero headline, description, imagery, and calls to action
-   Services/products, categories, descriptions, images, and optional
    prices
-   Featured items, offers, and gallery images
-   Owner name and role
-   Phone, WhatsApp, email, address, hours, and social links
-   FAQs and approved testimonials

Use clear placeholder values for unknown details. Make it
straightforward to adapt the same template to a different business
category without rewriting the layout.

## 7. Responsive and accessibility requirements

-   Mobile-first layout with no horizontal overflow.
-   Accessible navigation and keyboard operation.
-   Semantic HTML and meaningful image alternative text.
-   Visible focus states and sufficient text contrast.
-   Properly labelled links and interactive controls.
-   Reduced-motion support.
-   Images sized and cropped consistently; optimize assets where
    practical.
-   Test the hero, section order, enquiry buttons, gallery, FAQ, footer,
    and mobile menu at multiple viewport widths.

## 8. Functional scope

**In scope:** Responsive navigation, section anchors, local demo data,
product/service cards, optional frontend category filters, gallery
presentation, FAQ accordion, WhatsApp links with prefilled enquiry
messages, phone/email links, and simple UI interactions.

**Out of scope unless separately approved:** Database, CMS,
login/signup, online payments, cart/checkout, inventory, delivery/order
tracking, booking engine, server-side forms, and deployment.

## 9. Main website integration

-   Keep components modular and reusable.
-   Avoid unnecessary dependencies and global CSS leakage.
-   Use clear component names and a predictable project structure.
-   Keep business content/configuration separate from layout and
    styling.
-   Confirm the main website's integration requirements before choosing
    whether this template is embedded, linked, or adapted into a shared
    template catalogue.
-   Do not deploy, publish, or alter a production site without explicit
    authorization.

## 10. Proposed implementation phases

### Phase 1 --- Confirm the business

Confirm the category, target customers, primary goal, owner details
available, and whether enquiries should go through WhatsApp, phone, or
both.

### Phase 2 --- Approve the design direction

Agree on the visual style, colour palette, typography, imagery,
navigation, and section order.

### Phase 3 --- Build the shared foundation

Create the responsive layout, design tokens, reusable sections, and
local configuration structure.

### Phase 4 --- Add interactions

Implement mobile navigation, section scrolling, relevant filters if
needed, FAQ interactions, gallery behaviour, and WhatsApp enquiry links.

### Phase 5 --- Quality checks

Test responsive layouts, navigation, keyboard access, links, placeholder
content, console/build output, and the main customer journey.

### Phase 6 --- Prepare for reuse

Document how to replace the business name, branding, services/products,
prices, images, owner details, and WhatsApp number. Integrate with the
main website only after its requirements are confirmed.

## 11. Decisions still pending

-   Actual business category (cosmetics is not confirmed)
-   Business name, logo, owner name/role, phone and WhatsApp number
-   Physical address, hours, email, and social links
-   Primary conversion goal: WhatsApp enquiry, phone call, shop visit,
    or another action
-   Whether prices should be displayed or customers should request
    quotes
-   Final visual direction and imagery
-   Main website integration method

## 12. Acceptance criteria

The template is ready for review when it has a visually distinctive
hero, all agreed sections, consistent design, working WhatsApp/phone
links using configured values, clearly marked placeholders, responsive
layouts, accessible interactions, replaceable local content, and no
unapproved backend or deployment work.
