# COSMETICS_CLINIC_IMPLEMENTATION_BRIEF.md

## Purpose
Build a visually excellent, responsive website template for a cosmetics/aesthetic clinic. `WEBSITE_PLAN.md` is the broad plan; this document adapts it to the confirmed clinic-related business category.

The clinic's actual name, exact services, owner/practitioner details, contact information, prices, qualifications, and location have not yet been supplied. Do not invent these facts. Use clearly labelled, easy-to-replace placeholders.

## 1. Start safely
1. Inspect the repository root, project structure, package scripts, existing pages/components, styles, assets, README files, agent instruction files, and Git status.
2. Read `WEBSITE_PLAN.md` and existing project-specific instruction files before implementation.
3. Identify existing work and preserve uncommitted changes.
4. Start fresh with the website design/implementation, but do not delete or overwrite existing files merely to “start over.” Preserve reusable code, configuration, documentation, and Git history.
5. Do not use destructive Git commands, hard resets, repository cleans, history rewrites, or discard user changes.
6. Do not deploy, publish, push to GitHub, create a remote, or alter a production website. Do not commit unless explicitly authorized.
7. Follow the project's actual stack and conventions. Do not replace the stack without a clear need and approval.

## 2. Website goal
Create a premium clinic website that explains services, introduces the business, builds trust, and makes it easy for visitors to enquire. It should feel like a polished real-client website, not a generic starter page.

## 3. Proposed page/section structure
Build a cohesive, navigable single-page experience unless the existing architecture or `WEBSITE_PLAN.md` indicates otherwise:
1. **Header/navigation:** clinic logo/name, Home, Treatments/Services, About, Gallery, FAQs, Contact, prominent WhatsApp CTA, and a working mobile menu.
2. **Hero:** memorable headline, concise introduction, high-quality relevant imagery, primary WhatsApp CTA, and secondary CTA to view treatments.
3. **Trust highlights:** only verified details. Until supplied, use neutral editable placeholders rather than invented experience, certifications, awards, patient counts, or success rates.
4. **Treatments/services:** reusable cards with service name, image, short description, and enquiry CTA. Mark sample services as demo content until the clinic confirms its real menu.
5. **About the clinic:** story, approach, and values; use editable placeholders for unknown details.
6. **Owner/practitioner section:** name, role, biography, and credentials only when supplied and verified.
7. **Featured packages/offers:** optional/configurable. Do not invent prices, discounts, guarantees, or availability.
8. **Gallery:** responsive image layout. Do not fabricate patient photos or before/after results. Use appropriately licensed demo imagery or placeholders until authorized clinic imagery is available.
9. **What to expect:** general explanation of how to enquire and learn about a treatment. Do not promise outcomes or imply a consultation has occurred.
10. **Testimonials/reviews:** only genuine, authorized reviews on a live site. Demo content must be clearly labelled as fictional sample content.
11. **FAQs:** expandable questions about enquiries, hours, location, and clinic-confirmed services. Direct treatment suitability questions to a qualified clinic professional; do not invent clinical advice.
12. **Contact/location:** clinic phone, WhatsApp, email, address, opening hours, and map only when details are supplied. Use explicit placeholders for missing details.
13. **Final CTA:** clear invitation to contact the clinic.
14. **Footer:** clinic identity, navigation, contact information, optional social links, and copyright.

Sections should be configurable. Do not add an online store, patient portal, medical records, payment gateway, booking backend, or database unless separately requested.

## 4. Visual direction
Aim for premium, contemporary aesthetics-clinic design:
- Strong editorial hero with deliberate image composition and clear typography.
- Elegant, calm palette (for example warm ivory, soft neutrals, and a restrained accent); keep design tokens configurable.
- High-quality imagery relevant to aesthetic skincare/clinic services, not generic retail cosmetics imagery.
- Varied layouts: alternating image/text sections, asymmetric feature grids, refined service cards, full-width visual sections, and a carefully composed gallery.
- Consistent spacing, readable typography, clear hierarchy, and accessible contrast.
- Subtle transitions and hover states; avoid excessive animation and repetitive identical cards.
- Respect `prefers-reduced-motion`.
- Responsive desktop, tablet, and mobile layouts.
- Avoid making the site look like a hospital portal or generic ecommerce storefront.

## 5. WhatsApp and contact actions
Create one configurable source of truth for clinic contact details.
- Configure WhatsApp number in international format for the URL, including country code and without `+`, spaces, or punctuation.
- Build WhatsApp links using `https://wa.me/<number>` and an optional URL-encoded prefilled message.
- Add enquiry actions in the hero, treatment cards, package section (if present), and contact section.
- The customer must send the message themselves; opening WhatsApp does not send it automatically.
- Add `tel:` and `mailto:` links only when real details are configured.
- Never invent phone numbers, email, address, owner name, opening hours, or social profiles.
- When details are missing, use obvious placeholders and make the configuration location easy to find.

## 6. Medical and trust-content safeguards
- Do not invent clinical services, treatment indications, contraindications, practitioner credentials, registrations, or accreditations.
- Do not promise guaranteed results, claim a treatment is risk-free, or make unsupported efficacy claims.
- Do not invent before/after images, patient stories, testimonials, ratings, or success statistics.
- Do not provide personalized medical advice in website copy.
- Keep sample services and content explicitly identified as demo content until confirmed.
- Use licensed imagery or authorized assets; never use patient imagery without permission.

## 7. Reusable implementation
- Follow the existing repository's stack and conventions. If it is the planned React/Vite/JavaScript/vanilla-CSS project, retain that stack and avoid unnecessary dependencies.
- Separate clinic-specific content from layout and presentation components.
- Use a central configuration/data file for clinic name, tagline, logo, colours, hero content, treatments, packages, gallery, owner details, contact details, FAQs, and social links.
- Build reusable components for navigation, CTA buttons, treatment cards, gallery, FAQ, contact details, and footer.
- Use semantic HTML, accessible names, keyboard support, visible focus states, and useful image alt text.
- Ensure no horizontal overflow on mobile.
- Avoid hardcoding the clinic's identity throughout multiple components.
- Preserve project instructions and useful documentation. Do not remove environment files or unrelated project files.

## 8. Interactions
- Responsive navigation and working mobile menu.
- Anchor navigation/smooth scrolling where appropriate.
- WhatsApp links with contextual prefilled messages.
- Phone/email links when configured.
- Accessible FAQ accordion.
- Gallery layout and optional lightweight category filters if useful.
- Subtle hover and focus states.
- No inert buttons: every visible CTA must work or be clearly marked as a disabled placeholder.

## 9. Testing and verification
1. Run existing lint, type-check, and build scripts where available.
2. Fix issues introduced by the changes.
3. Test desktop, tablet, and mobile layouts; navigation; menu; FAQs; CTA links; WhatsApp URL formatting; and placeholder states.
4. Check browser console and terminal for errors.
5. If browser automation is already configured, use it without adding large dependencies unnecessarily.
6. Report files changed, features completed, commands/tests run, results, and remaining blockers. Never claim a test passed unless it was actually run.

## 10. Completion criteria
- Distinctive, premium clinic-focused visual design.
- All agreed sections are present and consistent.
- Responsive layouts work on mobile, tablet, and desktop.
- Navigation and configured enquiry links work.
- Unknown business details are clear placeholders and easy to update.
- No unsupported medical claims, fake credentials, fake reviews, or fabricated patient results are presented as genuine.
- The app builds successfully, or any pre-existing blocker is documented accurately.
- Existing work and Git history remain intact.
- Nothing is deployed, published, pushed, or changed in production.

## 11. Final agent response
Summarize what was implemented, files changed/added, where to edit clinic details and WhatsApp number, tests actually run and outcomes, information still needed from the owner, and remaining issues.

Start by inspecting and reporting the repository state, then implement in focused, verifiable steps. Do not stop at a plan or mockup if the repository is ready for implementation.
