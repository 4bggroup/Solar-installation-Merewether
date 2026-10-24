(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const config = window.ROOFLINE_CONFIG || {};
  const nav = $('#navigation');
  const menu = $('.menu-toggle');
  const mobileCTA = $('.mobile-cta');
  const priorities = new Set();
  const form = $('#enquiry-form');
  let summaryText = '';
  let previousFocus;

  $('#year').textContent = new Date().getFullYear();

  function closeMenu(returnFocus = false) {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
    if (returnFocus) menu.focus();
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  });
  $$('a', nav).forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });

  function wireTabs(tabs, activate, vertical = false) {
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(index));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else if (event.key === 'ArrowRight' || (vertical && event.key === 'ArrowDown')) next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft' || (vertical && event.key === 'ArrowUp')) next = (index - 1 + tabs.length) % tabs.length;
        if (next !== undefined) { event.preventDefault(); activate(next); tabs[next].focus(); }
      });
    });
  }
  const solutionTabs = $$('.solution-tab');
  const solutionVisuals = [
    { image: 'roof', alt: 'A terracotta roof with a neatly arranged solar panel array', index: '01 / CAPTURE', label: 'Make a little\nmore of your roof.' },
    { image: 'battery', alt: 'An unbranded white home battery and inverter at an Australian home', index: '02 / STORE', label: 'Keep a little\nday for later.' },
    { image: 'consultation', alt: 'A solar professional discussing a roof sketch with a homeowner', index: '03 / RECONSIDER', label: 'A fresh look.\nA clearer next step.' }
  ];
  function activateSolution(index) {
    solutionTabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      $('#' + tab.getAttribute('aria-controls')).hidden = i !== index;
    });
    const visual = solutionVisuals[index];
    $('#solution-image').src = `assets/images/${visual.image}.webp`;
    $('#solution-image').srcset = `assets/images/${visual.image}-small.webp 800w, assets/images/${visual.image}.webp 1536w`;
    $('#solution-image').alt = visual.alt;
    $('#solution-index').textContent = visual.index;
    $('#solution-visual-label').textContent = visual.label;
  }
  wireTabs(solutionTabs, activateSolution, true);
  $('#solution-visual-label').style.whiteSpace = 'pre-line';

  const dayTabs = $$('.day-tabs [role=tab]');
  const phases = [
    { phase: 'morning', name: 'THE MORNING SHIFT', time: '07:00', status: 'A NEW DAY BEGINS', kicker: 'FIRST LIGHT, FIRST COFFEE.', title: 'Ease into\nthe morning.', copy: 'As daylight increases, solar generation begins to rise. Your home may still draw on the grid or available battery energy while the day gets going.', tip: 'A useful question: when does your household use the most energy?' },
    { phase: 'midday', name: 'THE DAYLIGHT HOURS', time: '12:00', status: 'MAKE USE OF THE DAY', kicker: 'THE SUN IS DOING ITS THING.', title: 'Put daylight\nto work.', copy: 'Available solar can supply household loads. If generation exceeds use, surplus may charge a compatible battery or be exported, subject to the system and connection settings.', tip: 'A useful question: which flexible household tasks could move into daylight hours?' },
    { phase: 'evening', name: 'AFTER THE SUN GOES DOWN', time: '19:00', status: 'THE EVENING SHIFT', kicker: 'DINNER. DOWNTIME. LIGHTS ON.', title: 'Let the day\ngo a little further.', copy: 'After sunset, a suitably configured battery can supply stored energy until its operating limits are reached. The grid can supply the balance when available.', tip: 'A useful question: would stored energy fit the way your evenings run?' }
  ];
  function activatePhase(index) {
    const state = phases[index];
    dayTabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
    $('.day-stage').dataset.phase = state.phase;
    $('#day-name').textContent = state.name;
    $('#day-time').textContent = state.time;
    $('#energy-status').textContent = state.status;
    $('#day-kicker').textContent = state.kicker;
    $('#day-story-title').textContent = state.title;
    $('#day-story-copy').textContent = state.copy;
    $('#day-story-tip').textContent = state.tip;
    const panel = $('#day-story-content');
    panel.setAttribute('aria-labelledby', dayTabs[index].id);
    panel.textContent = `${state.name}: ${state.title.replace('\n', ' ')} ${state.copy} ${state.tip}`;
  }
  $('#day-story-title').style.whiteSpace = 'pre-line';
  wireTabs(dayTabs, activatePhase);

  const roofDetails = [
    { number: '01 / THE LIGHT', title: 'Sun. Shade.\nAnd the hours between.', copy: 'Orientation and surrounding shade help shape a layout. Trees, neighbouring roofs and changes through the day all deserve a closer look.' },
    { number: '02 / THE SURFACE', title: 'Space to work.\nA roof worth checking.', copy: 'Usable area, roof material, condition and access all influence the installation plan. A site review should establish what needs attention before the work begins.' },
    { number: '03 / THE CONNECTION', title: 'A complete system.\nNot just a roof plan.', copy: 'Switchboard conditions, cable routes and equipment locations are part of the picture. A considered scope makes the electrical work and any additional requirements clear.' }
  ];
  const hotspots = $$('.hotspot');
  hotspots.forEach((button, index) => button.addEventListener('click', () => {
    hotspots.forEach((item, i) => { item.classList.toggle('selected', i === index); item.setAttribute('aria-pressed', String(i === index)); });
    const detail = roofDetails[index];
    $('#roof-number').textContent = detail.number;
    $('#roof-note-title').textContent = detail.title;
    $('#roof-note-copy').textContent = detail.copy;
  }));
  $('#roof-note-title').style.whiteSpace = 'pre-line';

  const processSteps = $$('.process-steps details');
  processSteps.forEach(step => step.addEventListener('toggle', () => {
    if (step.open) processSteps.filter(other => other !== step).forEach(other => { other.open = false; });
  }));

  function updatePriorities() {
    $('#priority-count').textContent = priorities.size;
    $('#selected-priorities').hidden = priorities.size === 0;
    $('#priorities-summary').textContent = [...priorities].join(' · ');
  }
  $$('.priority').forEach(button => button.addEventListener('click', () => {
    const selected = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(selected));
    $('.priority-check', button).textContent = selected ? '✓' : '+';
    if (selected) priorities.add(button.dataset.priority); else priorities.delete(button.dataset.priority);
    updatePriorities();
  }));
  $$('.solution-enquiry').forEach(link => link.addEventListener('click', () => {
    $('#interest').value = link.dataset.interest;
  }));

  function openDialog(dialog) {
    previousFocus = document.activeElement;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }
  $$('dialog').forEach(dialog => {
    $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); previousFocus?.focus(); });
  });
  const info = {
    privacy: {
      title: 'Your information.',
      paragraphs: [
        'In this preview, form details stay in the page while it is open. They are not sent to a business, stored on a server or saved in browser storage. You can choose to copy or download the prepared summary.',
        'This static website does not include analytics or advertising trackers. Images, fonts and page files are included locally. Your hosting service may have its own account, security and server logging arrangements.',
        'If a business email is configured, you can open a draft in your own email app. You decide whether to send it. If an enquiry endpoint is configured, the form sends the information only after the visitor checks the consent box and submits.',
        'Before a public launch, replace this preview notice with the business’s actual privacy policy, contact information and data handling arrangements.'
      ]
    },
    'about-preview': {
      title: 'A brighter concept.',
      paragraphs: [
        'Electric Coast is a separate one-page website design for the Roofline concept brand, focused on Newcastle, NSW. It includes new photography, a new layout and interactive explanations of solar and storage.',
        'All photographs were generated with AI for this design. People are illustrative characters and do not depict real employees or customers. Houses and installations are visual examples, not a completed-project portfolio or technical installation advice.',
        'The website does not claim verified company credentials, ratings, customer results or guaranteed savings. The business should add its genuine identity, contact details and verified service information before launch.',
        'The enquiry form is a local preview until contact details or an enquiry service are configured. Preparing a summary does not send an enquiry or book an appointment.'
      ]
    }
  };
  $$('[data-dialog]').forEach(button => button.addEventListener('click', () => {
    const content = info[button.dataset.dialog];
    $('#info-title').textContent = content.title;
    $('#info-content').replaceChildren(...content.paragraphs.map(text => { const p = document.createElement('p'); p.textContent = text; return p; }));
    openDialog($('#info-dialog'));
  }));

  const endpoint = typeof config.enquiryEndpoint === 'string' && /^https:\/\//i.test(config.enquiryEndpoint) ? config.enquiryEndpoint : '';
  const email = typeof config.businessEmail === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.businessEmail) ? config.businessEmail : '';
  if (endpoint) {
    $('#form-mode').textContent = 'ENQUIRY FORM';
    $('#submit-label').textContent = 'Send my enquiry';
    $('#form-note').textContent = 'Submitting sends these details to the business enquiry service. It does not confirm a booking.';
    $('#consent-copy').textContent = 'I agree to send these details to the business so they can respond to this enquiry. I understand this does not confirm a booking.';
  } else if (email) {
    $('#form-mode').textContent = 'EMAIL ENQUIRY';
    $('#submit-label').textContent = 'Prepare my email';
    $('#form-note').textContent = 'Prepare your enquiry, then choose to open and send a draft in your email app.';
    $('#consent-copy').textContent = 'I understand this prepares an email draft. I decide whether to send it from my email app. No booking is confirmed.';
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const status = $('#form-status');
    status.textContent = '';
    ['name', 'email', 'suburb'].forEach(id => { $('#' + id).value = $('#' + id).value.trim(); });
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form));
    const payload = { name: values.name, email: values.email, phone: values.phone.trim(), suburb: values.suburb, interest: values.interest, message: values.message.trim(), priorities: [...priorities], consent: true, source: 'Roofline Electric Coast website' };
    summaryText = [
      `${config.businessName || 'Roofline'} — Website enquiry`,
      `Location: ${config.location || 'Newcastle, NSW'}`,
      '', `Name: ${payload.name}`, `Email: ${payload.email}`, `Phone: ${payload.phone || 'Not supplied'}`, `Suburb & postcode: ${payload.suburb}`, `Considering: ${payload.interest}`,
      '', 'Priorities:', ...(payload.priorities.length ? payload.priorities.map(item => `• ${item}`) : ['Not selected']),
      '', 'About the home / questions:', payload.message || 'Not supplied',
      '', endpoint ? 'Submitted to the configured business enquiry service. No booking is confirmed.' : email ? 'Prepared as an email draft. Send it in your email app to make the enquiry.' : 'PREVIEW ONLY: This summary has not been sent. No booking is confirmed.'
    ].join('\n');
    if (endpoint) {
      const submit = $('.form-submit');
      submit.disabled = true;
      $('#submit-label').textContent = 'Sending…';
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: controller.signal, credentials: 'omit' });
        if (!response.ok) throw new Error('The enquiry service did not accept the request.');
        $('#summary-intro').textContent = 'The configured enquiry service accepted your details. This does not confirm a booking.';
      } catch {
        status.textContent = 'Your enquiry could not be confirmed as sent. Please try again. Your details remain in the form.';
        return;
      } finally { clearTimeout(timeout); submit.disabled = false; $('#submit-label').textContent = 'Send my enquiry'; }
    } else {
      $('#summary-intro').textContent = email ? 'Your enquiry is prepared. Open an email draft, then send it from your email app. No booking is confirmed.' : 'Your enquiry is prepared. Nothing has been sent and no booking is confirmed.';
    }
    $('#summary-output').textContent = summaryText;
    $('#copy-status').textContent = '';
    $('#email-summary').hidden = !email || Boolean(endpoint);
    if (email) $('#email-summary').href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Website enquiry — ' + payload.name)}&body=${encodeURIComponent(summaryText)}`;
    openDialog($('#summary-dialog'));
  });
  $('#copy-summary').addEventListener('click', async () => {
    let success = false;
    try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(summaryText); success = true; } } catch { /* Manual selection fallback below. */ }
    if (!success) {
      const range = document.createRange(); range.selectNodeContents($('#summary-output'));
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      try { success = document.execCommand('copy'); } catch { /* Keep selection for manual copy. */ }
    }
    $('#copy-status').textContent = success ? 'Summary copied.' : 'The summary is selected. Use your device’s Copy command, or download the text file.';
  });
  $('#download-summary').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([summaryText], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'Roofline-Enquiry-Summary.txt'; document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $('#copy-status').textContent = 'Your text download was prepared.';
  });

  const navItems = $$('a', nav).map(link => ({ link, section: $(link.getAttribute('href')) }));
  let tick = false;
  function updateScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    $('.reading-progress').style.width = `${max > 0 ? Math.min(100, window.scrollY / max * 100) : 0}%`;
    let current;
    navItems.forEach(item => { if (item.section.getBoundingClientRect().top <= Math.min(240, window.innerHeight * .35)) current = item; });
    navItems.forEach(item => { const active = item === current; item.link.classList.toggle('is-current', active); if (active) item.link.setAttribute('aria-current', 'location'); else item.link.removeAttribute('aria-current'); });
    tick = false;
  }
  window.addEventListener('scroll', () => { if (!tick) { requestAnimationFrame(updateScroll); tick = true; } }, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  window.addEventListener('load', updateScroll);
  updateScroll();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { entries.forEach(entry => { mobileCTA.classList.toggle('is-hidden', entry.isIntersecting); }); }, { threshold: 0 }).observe($('#enquire'));
  }
})();
