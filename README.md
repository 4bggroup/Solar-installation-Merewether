# Roofline — Electric Coast

A separate, long-form one-page solar website concept for Newcastle, NSW.

This is Design 03, created from a new visual system. It does not overwrite the earlier Roofline editorial design. The layout, geometric typography, cobalt/orange palette, logo treatment and all six photographs are new. Every person shown is a newly generated illustrative character.

## Open the website

In the ZIP, extract the complete `Electric-Coast` folder, then open its `index.html` in a current browser. Keep `coast.css`, `coast.js`, `site-config.js` and `assets/` together. Do not open the HTML from inside the ZIP viewer.

The Git source uses `dist/` as the static website directory. The downloadable ZIP puts those website files directly inside `Electric-Coast/` for simpler Windows use. It also includes the six original PNG masters in `original-images/`; these are optional editing sources and are not loaded by the website.

No npm, build step, external fonts, CDN, framework or server is needed for the default local preview. Use JavaScript-enabled Chrome, Edge, Firefox or Safari. The website contains no analytics, browser storage or external image requests.

## Experience

- Large cobalt hero with a new Australian home and female electrician photograph.
- Three service tabs with matching photography, labels and enquiry starting points.
- Interactive morning / midday / evening energy explanation with a code-native SVG illustration.
- New homeowner and consultation photographs.
- Three interactive roof study details.
- Four-step installation process accordion.
- Household priority selector that carries choices into the enquiry summary.
- Newcastle neighbourhood section, eight FAQs and an enquiry form.
- Keyboard navigation, focus states, reduced motion support, responsive mobile navigation, a mobile enquiry button, dialogs and print styling.

## Enquiry form — default behaviour

The included form is a local preview. It validates required fields and consent, prepares a summary, and lets the visitor copy or download that summary. It does not send information, store a lead, book an appointment or promise a response. This is stated beside the form and inside the summary.

`site-config.js` contains empty `businessEmail` and `enquiryEndpoint` values. Leave them empty for preview use.

- Set a genuine business email to enable an email draft. Visitors still need to send that draft themselves.
- Set a genuine HTTPS enquiry endpoint to POST JSON after submission. A backend is not bundled. The service must implement validation, abuse prevention, appropriate CORS, privacy handling and delivery. Test the real service before launch. The front end treats an HTTP success response as acceptance by the configured service; it does not confirm a booking.
- If both are set, the endpoint takes priority.

The payload includes name, email, optional phone, suburb, interest, optional message, selected priorities, consent and the form source.

## Before a business launch

Roofline is a working concept brand. Replace it with the business's actual identity and add verified contact details, service coverage, company details and any genuine credentials or warranties. Obtain approved copy for claims and offers. No testimonials, ratings, customer outcomes or accreditation claims have been invented.

All photographs are AI-generated and disclosed as illustrations. They are not actual staff, customers or completed installations. Replace them with approved real-business photography if that representation is needed.

The energy diagram is a conceptual explanation, not a system design, performance prediction or electrical installation guide. No savings or payback calculation is included. Update the preview privacy notice and form FAQ to the business's actual data practices when connecting a live enquiry service.

The HTML contains `noindex,nofollow` for the concept preview. Remove it only when the real business content and launch arrangements are ready. Add the final domain's canonical URL and social metadata at that time.

## Edit

`index.html` — content and layout.

`coast.css` — responsive styling. Core colours are at the top in `:root`.

`coast.js` — interactions, validation, summaries and optional enquiry service integration.

`site-config.js` — business name, location and contact configuration.

`assets/images/` — six full-size WebP photographs and six smaller responsive variants.

`assets/fonts/` — local fonts and their original licence file.

`ASSET-NOTES.md` and `image-prompts.json` — image provenance, source sizes and generation briefs.

## Verification

Checked JavaScript syntax, local asset references, unique IDs and heading structure. Tested the main interactions, invalid and valid form flows, enquiry summary and mobile navigation in the browser. Checked responsive content widths at 320, 375, 390, 768 and 1024 pixel iframe sizes, plus the desktop preview. No horizontal overflow was observed. Browser testing uses the internal preview, not a Windows machine.

The downloadable archive is a standard ZIP with short ASCII file paths, no password and no ZIP64. CRC and extracted-byte checks are performed on the completed package. There is no installer or executable.
