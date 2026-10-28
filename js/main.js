/**
 * Nitin Kumar Jha - Portfolio Interaction Engine
 * Built for GitHub Pages (nitin-is-me.github.io)
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initTerminal();
  initProjectModal();
  initCopyEmail();
  initContactForm();
  initNavigation();
  initScrollSpy();
  initSkillBreakerGame();
  initLofiPlayer();
});

/* ==========================================================================
   1. Interactive Background Canvas (Constellation / Particle Web)
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const particleCount = Math.min(Math.floor((width * height) / 14000), 70);
  const particles = [];
  const maxDistance = 120;

  const mouse = { x: null, y: null, maxDist: 150 };

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.8 + 0.8;
      this.color = Math.random() > 0.4 ? 'rgba(99, 102, 241, ' : 'rgba(6, 182, 212, ';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse push/pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.maxDist) {
          const force = (mouse.maxDist - dist) / mouse.maxDist;
          this.x -= (dx / dist) * force * 1.2;
          this.y -= (dy / dist) * force * 1.2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.7)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Interactive Developer Terminal
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminalInput');
  const terminalHistory = document.getElementById('terminalHistory');
  const chipButtons = document.querySelectorAll('.term-chip');

  if (!terminalInput || !terminalHistory) return;

  const terminalData = {
    bio: `
<span class="text-indigo-400 font-semibold">> Nitin Kumar Jha</span>
Software Engineer & Full-Stack Developer with hands-on production experience in Java, Spring Boot, TypeScript, Next.js, PostgreSQL, and AWS.
Currently focused on designing resilient distributed backends, RESTful APIs, and secure multi-tenant architectures.
Location: New Delhi, India
Education: BCA (Indira Gandhi National Open University - IGNOU, Expected 2026)
Status: <span class="text-emerald-400 font-medium">Available for Software Engineering Roles</span>
    `,
    skills: `
<span class="text-cyan-400 font-semibold">> Technical Skillset</span>
<span class="text-indigo-300">• Languages:</span> Java, TypeScript, JavaScript, SQL, HTML5/CSS3
<span class="text-indigo-300">• Frameworks:</span> Spring Boot, Node.js, Express.js, React.js, Next.js, JPA/Hibernate
<span class="text-indigo-300">• Databases:</span> PostgreSQL, MySQL, MongoDB, Supabase
<span class="text-indigo-300">• Cloud & DevOps:</span> AWS (EC2, S3, RDS, Amplify), Docker, GitHub Actions, Vercel, Firebase, Linux
<span class="text-indigo-300">• Concepts:</span> Microservices, RESTful APIs, Spring Security, BCrypt, RBAC, VAPT Mitigation, Adjacency List Models
    `,
    projects: `
<span class="text-purple-400 font-semibold">> Featured Engineering Projects</span>
<span class="text-amber-300">[1] The Blog Zone</span> (Node.js, Express, PostgreSQL, Next.js, Supabase, Groq AI)
    AI-powered publishing engine with client/server AES-256 encryption, Adjacency List nested discussions, full-text search, and isolated admin dashboard.
<span class="text-amber-300">[2] TeamVault</span> (Java, Spring Boot, JPA/Hibernate, PostgreSQL, Next.js, Docker)
    Collaborative knowledge base with immutable article revisions, visual diff engine, RBAC permission matrix, and automated rollbacks.
<span class="text-amber-300">[3] String Sure</span> (TypeScript, Node.js, npm)
    High-performance published npm validation library with configurable string and email rule constraints.
    `,
    experience: `
<span class="text-emerald-400 font-semibold">> Production Work History</span>
<span class="text-white font-medium">1. Software Engineering Intern</span> @ <span class="text-indigo-300">Traincape Technology</span> (Feb 2026 – May 2026 | New Delhi)
   - Built backend microservices for SaaS CRM platform using Java & Spring Boot.
   - Engineered REST APIs with PostgreSQL, Spring Security & BCrypt.
   - Deployed Docker containers onto AWS EC2 with S3 & Amplify; built automated CI/CD PR pipelines.
<span class="text-white font-medium">2. Full Stack Intern</span> @ <span class="text-indigo-300">Webisdom</span> (Dec 2025 – Feb 2026 | Remote)
   - Built and maintained production web apps using MERN/PERN stacks with RBAC.
   - Addressed VAPT security findings with rate limiting and secure access controls.
    `,
    education: `
<span class="text-blue-400 font-semibold">> Education</span>
Bachelor of Computer Applications (BCA)
<span class="text-indigo-300">Indira Gandhi National Open University (IGNOU)</span>, New Delhi, India
Expected Graduation: 2026
Coursework: Data Structures & Algorithms, OOP, Database Management Systems, Computer Networks, Operating Systems.
    `,
    contact: `
<span class="text-emerald-400 font-semibold">> Connect with Nitin</span>
Email:    <a href="mailto:nitinjha2609@gmail.com" class="text-indigo-300 underline">nitinjha2609@gmail.com</a>
GitHub:   <a href="https://github.com/nitin-is-me" target="_blank" class="text-indigo-300 underline">github.com/nitin-is-me</a>
LinkedIn: <a href="https://www.linkedin.com/in/nitin-kumar-jha-96b90727b/" target="_blank" class="text-indigo-300 underline">linkedin.com/in/nitin-kumar-jha-96b90727b/</a>
    `,
    help: `
<span class="text-indigo-400 font-semibold">> Available Commands:</span>
  <span class="text-cyan-300">bio</span>          - Overview of background and focus
  <span class="text-cyan-300">skills</span>       - Technical proficiencies and toolstack
  <span class="text-cyan-300">projects</span>     - Showcase of key engineered systems
  <span class="text-cyan-300">experience</span>   - Internships & production achievements
  <span class="text-cyan-300">education</span>    - University and degree details
  <span class="text-cyan-300">contact</span>      - Direct social and email channels
  <span class="text-cyan-300">resume</span>       - View and download latest PDF resume
  <span class="text-amber-300">game</span>         - Play Nitin's Skill Breaker block arcade game! 🕹️
  <span class="text-cyan-300">clear</span>        - Clear terminal output
  <span class="text-cyan-300">help</span>         - Display this manual
    `
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Echo input line
    const echoLine = document.createElement('div');
    echoLine.className = 'flex items-center gap-2 mt-2 text-slate-300';
    echoLine.innerHTML = `<span class="text-emerald-400 font-mono">visitor@nitin:~$</span> <span class="text-white font-mono">${escapeHtml(rawCmd)}</span>`;
    terminalHistory.appendChild(echoLine);

    const responseLine = document.createElement('div');
    responseLine.className = 'text-slate-300 text-xs sm:text-sm pl-2 py-1 leading-relaxed border-l-2 border-indigo-500/40 my-1 font-mono';

    switch (cmd) {
      case 'help':
        responseLine.innerHTML = terminalData.help;
        break;
      case 'bio':
      case 'about':
        responseLine.innerHTML = terminalData.bio;
        break;
      case 'skills':
      case 'skill':
      case 'stack':
        responseLine.innerHTML = terminalData.skills;
        break;
      case 'projects':
      case 'project':
        responseLine.innerHTML = terminalData.projects;
        break;
      case 'experience':
      case 'exp':
      case 'work':
        responseLine.innerHTML = terminalData.experience;
        break;
      case 'education':
      case 'edu':
        responseLine.innerHTML = terminalData.education;
        break;
      case 'contact':
      case 'email':
        responseLine.innerHTML = terminalData.contact;
        break;
      case 'resume':
      case 'cv':
        responseLine.innerHTML = `Opening resume... <a href="./Nitin Kumar Jha.pdf" target="_blank" class="text-emerald-400 underline font-semibold">Click here to open PDF directly</a>`;
        window.open('./Nitin Kumar Jha.pdf', '_blank');
        break;
      case 'game':
      case 'play':
      case 'arcade':
      case 'skillbreaker':
        responseLine.innerHTML = `<span class="text-amber-300 font-semibold">🕹️ Launching Skill Breaker Arcade...</span> Break all of Nitin's skill blocks to win! Use mouse or [← / →] arrows.`;
        if (typeof openSkillBreakerGame === 'function') {
          openSkillBreakerGame();
        }
        break;
      case 'clear':
      case 'cls':
        terminalHistory.innerHTML = '';
        return;
      case 'sudo':
        responseLine.innerHTML = `<span class="text-rose-400 font-mono">Permission denied: You already possess guest read privileges!</span>`;
        break;
      default:
        responseLine.innerHTML = `<span class="text-rose-400">Command not recognized: "${escapeHtml(rawCmd)}". Type <span class="text-cyan-300">help</span> for commands list.</span>`;
        break;
    }

    terminalHistory.appendChild(responseLine);
    const container = document.getElementById('terminalContent');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    }
  });

  chipButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const command = btn.getAttribute('data-cmd');
      if (command) executeCommand(command);
    });
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g,
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}


/* ==========================================================================
   4. Project Architecture Deep-Dive Modal
   ========================================================================== */
const projectArchitectures = {
  blogzone: {
    title: 'The Blog Zone',
    subtitle: 'AI-Assisted Private & Community Publishing Architecture',
    badge: 'Full Stack & AI',
    image: 'assets/images/the_blog_zone.jpg',
    tags: ['Node.js', 'Express.js', 'PostgreSQL', 'Next.js', 'Supabase', 'Groq AI', 'AES-256', 'Adjacency List'],
    liveUrl: '#',
    githubUrl: 'https://github.com/nitin-is-me',
    summary: 'A full-stack, AI-integrated web publishing platform designed for high-throughput public writing and end-to-end encrypted private journalling.',
    highlights: [
      {
        title: 'Zero-Knowledge Server-Side AES Encryption',
        desc: 'Implemented AES-256 encryption routines for private user entries where user-specific keys govern decryption, ensuring private records remain opaque even in database dumps.'
      },
      {
        title: 'Adjacency List Model for Infinite Discussion Trees',
        desc: 'Engineered an Adjacency List pattern in PostgreSQL with recursive CTE queries to support arbitrarily nested comment threads with minimal I/O latency.'
      },
      {
        title: 'High-Performance Full-Text Search Migration',
        desc: 'Migrated data layer from MongoDB to PostgreSQL, leveraging tsvector and GIN indices for sub-millisecond lexical search over articles and authors.'
      },
      {
        title: 'Dual-Layer Isolated Admin Dashboard',
        desc: 'Created an isolated JWT authentication perimeter for platform moderators with account banning, automated review flags, and rate-limited actions.'
      }
    ]
  },
  teamvault: {
    title: 'TeamVault',
    subtitle: 'Collaborative Enterprise Knowledge Management & Versioning System',
    badge: 'Java / Spring Boot',
    image: 'assets/images/team_vault.jpg',
    tags: ['Java', 'Spring Boot 3', 'JPA/Hibernate', 'PostgreSQL', 'Next.js', 'TypeScript', 'Docker', 'Spring Security'],
    liveUrl: '#',
    githubUrl: 'https://github.com/nitin-is-me',
    summary: 'An enterprise documentation repository engineered for engineering teams, featuring git-like immutable checkpoint revisions, visual diff comparisons, and strict RBAC controls.',
    highlights: [
      {
        title: 'Immutable Version Checkpoints & Visual Line Diffs',
        desc: 'Modeled immutable snapshot checkpoints for article revisions using JPA/Hibernate, paired with an algorithmic Myers diff engine that renders colored visual line-by-line additions and deletions.'
      },
      {
        title: 'Granular Role-Based Access Control (RBAC)',
        desc: 'Configured Spring Security filters with project-scoped permission matrices (Admin, Editor, Reviewer, Viewer) and token-based member invitation links.'
      },
      {
        title: 'Safe Checkpoint Rollbacks',
        desc: 'Built atomic transaction rollbacks allowing administrators to safely revert docs to any historic state without breaking dependent references.'
      },
      {
        title: 'Production Docker Containerization',
        desc: 'Multi-stage Docker builds orchestrating Spring Boot and PostgreSQL, configured for automated deployment via GitHub Actions, Render, and Vercel.'
      }
    ]
  },
  stringsure: {
    title: 'String Sure',
    subtitle: 'Lightweight Open-Source TypeScript String & Email Validation Engine',
    badge: 'Open Source / npm',
    image: 'assets/images/string_sure.jpg',
    tags: ['TypeScript', 'Node.js', 'npm package', 'CI/CD', 'Open Source', 'Zero-Dependency'],
    liveUrl: '#',
    githubUrl: 'https://github.com/nitin-is-me',
    summary: 'A published open-source npm library providing zero-dependency, ultra-fast string parsing, email validation, and customizable schema rules for TypeScript/JavaScript runtimes.',
    highlights: [
      {
        title: 'Zero-Dependency & Minimal Footprint',
        desc: 'Engineered from scratch without external bloat to achieve minimal bundle size (<3KB gzipped) and instant cold-start execution in serverless or edge environments.'
      },
      {
        title: 'Configurable Constraint Rules Engine',
        desc: 'Supports chained assertions including character sets, length bounds, custom regex sanitization, and RFC-compliant email structure verification.'
      },
      {
        title: 'Strict TypeScript Type Inference',
        desc: 'Supplies complete typings with inferred return types, reducing runtime type bugs across consuming client applications.'
      },
      {
        title: 'Automated npm Release Pipeline',
        desc: 'Configured automated testing and semantic version publishing through GitHub Actions CI.'
      }
    ]
  }
};

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('closeModalBtn');
  const modalTriggers = document.querySelectorAll('.open-project-modal');

  if (!modal) return;

  function openModal(projectId) {
    const data = projectArchitectures[projectId];
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalSubtitle').textContent = data.subtitle;
    document.getElementById('modalBadge').textContent = data.badge;
    document.getElementById('modalSummary').textContent = data.summary;
    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalImage').alt = data.title;

    // Tech tags
    const tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = '';
    data.tags.forEach((tag) => {
      const span = document.createElement('span');
      span.className = 'text-xs px-2.5 py-1 rounded-md bg-indigo-950/80 text-indigo-300 border border-indigo-700/40 font-mono';
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });

    // Highlights
    const highlightsContainer = document.getElementById('modalHighlights');
    highlightsContainer.innerHTML = '';
    data.highlights.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80';
      div.innerHTML = `
        <div class="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          ${item.title}
        </div>
        <p class="text-xs sm:text-sm text-slate-400 mt-1 pl-3.5 leading-relaxed">${item.desc}</p>
      `;
      highlightsContainer.appendChild(div);
    });

    // Project links
    document.getElementById('modalGithubLink').href = data.githubUrl;
    document.getElementById('modalLiveLink').href = data.liveUrl;

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    setTimeout(() => {
      modal.classList.add('modal-open');
    }, 10);
  }

  function closeModal() {
    modal.classList.remove('modal-open');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }, 200);
  }

  // Click on project cards directly to inspect architecture
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // Don't open modal if user specifically clicked a link or button inside the card
      if (e.target.closest('a') || e.target.closest('button')) {
        return;
      }
      const projectId = card.getAttribute('data-project');
      if (projectId) openModal(projectId);
    });
  });

  // Fallback for any element with open-project-modal class
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. Copy Email with Toast Feedback
   ========================================================================== */
function initCopyEmail() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  const emailAddress = 'nitinjha2609@gmail.com';

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(emailAddress);
        showToast('✓ Email copied to clipboard: ' + emailAddress);
      } catch (err) {
        // Fallback
        const tempInput = document.createElement('input');
        tempInput.value = emailAddress;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('✓ Email copied to clipboard: ' + emailAddress);
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="text-emerald-400 font-bold">●</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   6. Contact Form - EmailJS Direct Delivery Integration
   ========================================================================== */

/**
 * EMAILJS CONFIGURATION
 * Provide your 3 keys here to route emails straight to your inbox:
 * 1. serviceId: Created under 'Email Services' on emailjs.com (e.g., 'service_xxxxxxx')
 * 2. templateId: Created under 'Email Templates' (e.g., 'template_xxxxxxx')
 * 3. publicKey: Found under Account > API Keys (e.g., 'xxxxxxxxxxxxxxxx')
 */
const EMAILJS_CONFIG = {
  serviceId: 'service_itgf60l',
  templateId: 'template_phzfft4',
  publicKey: 'twbHZy6nuMiKjJ78P',
};

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Initialize EmailJS if public key is provided
  if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    try {
      emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    } catch (err) {
      console.warn('EmailJS initialization note:', err);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Please fill out all required fields.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg> Delivering Message...
    `;

    const isEmailJSReady = typeof emailjs !== 'undefined' &&
      EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.serviceId !== 'YOUR_SERVICE_ID' &&
      EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.templateId !== 'YOUR_TEMPLATE_ID' &&
      EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY';

    if (isEmailJSReady) {
      const templateParams = {
        name: name,
        from_name: name,
        email: email,
        from_email: email,
        reply_to: email,
        subject: subject || `Portfolio Contact from ${name}`,
        title: subject || `Portfolio Contact from ${name}`,
        message: message,
        to_name: 'Nitin Kumar Jha'
      };

      emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
        .then(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          form.reset();
          showToast('✓ Message sent successfully! I will get back to you soon.');
        })
        .catch((error) => {
          console.error('EmailJS error:', error);
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          showToast('⚠️ Direct sending issue. Opening your email app instead...');

          // Fallback to mailto
          const mailtoLink = `mailto:nitinjha2609@gmail.com?subject=${encodeURIComponent(
            subject || `Message from ${name}`
          )}&body=${encodeURIComponent(
            `Hi Nitin,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
          )}`;
          window.location.href = mailtoLink;
        });
    } else {
      // Friendly message while EmailJS keys are pending
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();

        showToast('🚀 EmailJS configured! Launching email client to send to nitinjha2609@gmail.com.');

        const mailtoLink = `mailto:nitinjha2609@gmail.com?subject=${encodeURIComponent(
          subject || `Message from ${name}`
        )}&body=${encodeURIComponent(
          `Hi Nitin,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;
        window.location.href = mailtoLink;
      }, 700);
    }
  });
}

/* ==========================================================================
   7. Navigation & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Back to top button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.remove('opacity-100');
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   8. Scroll Spy (Active section link highlight)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('text-indigo-400', 'font-semibold');
      link.classList.add('text-slate-400');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-indigo-400', 'font-semibold');
        link.classList.remove('text-slate-400');
      }
    });
  });
}

/* ==========================================================================
   9. SKILL BREAKER - RETRO ARCADE BLOCK GAME
   ========================================================================== */

let openSkillBreakerGame = () => { };

function initSkillBreakerGame() {
  const modal = document.getElementById('arcadeModal');
  const canvas = document.getElementById('arcadeCanvas');
  const closeBtn = document.getElementById('closeArcadeBtn');
  const restartBtn = document.getElementById('restartGameBtn');
  const exitBtn = document.getElementById('exitGameBtn');
  const scoreDisplay = document.getElementById('gameScore');
  const livesDisplay = document.getElementById('gameLives');
  const blocksDisplay = document.getElementById('gameBlocksLeft');

  if (!modal || !canvas) return;
  const ctx = canvas.getContext('2d');

  // Audio synthesizer for retro 8-bit sound effects
  let audioCtx = null;
  function playSound(freq, type = 'square', duration = 0.09) {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) { }
  }

  const SKILLS_POOL = [
    'Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS EC2', 'Next.js',
    'TypeScript', 'Node.js', 'Spring Sec', 'JPA/ORM', 'MongoDB', 'CI/CD Actions',
    'Firebase', 'Linux', 'REST APIs', 'Supabase', 'VAPT Fixes', 'BCrypt'
  ];

  const COLOR_PALETTES = [
    { bg: 'rgba(6, 182, 212, 0.25)', border: '#06b6d4', text: '#67e8f9' },    // Cyan
    { bg: 'rgba(99, 102, 241, 0.28)', border: '#6366f1', text: '#a5b4fc' },   // Indigo
    { bg: 'rgba(168, 85, 247, 0.28)', border: '#a855f7', text: '#d8b4fe' },   // Purple
    { bg: 'rgba(16, 185, 129, 0.25)', border: '#10b981', text: '#6ee7b7' },   // Emerald
    { bg: 'rgba(244, 63, 94, 0.25)', border: '#f43f5e', text: '#fda4af' },    // Rose
    { bg: 'rgba(245, 158, 11, 0.25)', border: '#f59e0b', text: '#fde68a' }     // Amber
  ];

  // Game state
  let animationId = null;
  let score = 0;
  let lives = 3;
  let gameState = 'START'; // 'START', 'PLAYING', 'GAME_OVER', 'VICTORY'
  let particles = [];

  // Paddle
  const paddle = {
    w: 115,
    h: 12,
    x: 0,
    y: 388,
    speed: 8,
    dx: 0
  };

  // Ball
  const ball = {
    x: 0,
    y: 0,
    r: 6.5,
    dx: 3.5,
    dy: -3.5,
    speed: 4.2
  };

  // Bricks grid
  const brickRows = 3;
  const brickCols = 6;
  const brickWidth = 100;
  const brickHeight = 26;
  const brickPadding = 10;
  const brickOffsetTop = 40;
  const brickOffsetLeft = 25;
  let bricks = [];

  function initBricks() {
    bricks = [];
    const shuffledSkills = [...SKILLS_POOL].sort(() => Math.random() - 0.5);
    let index = 0;

    for (let c = 0; c < brickCols; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRows; r++) {
        const skillName = shuffledSkills[index % shuffledSkills.length];
        const palette = COLOR_PALETTES[(r * brickCols + c) % COLOR_PALETTES.length];
        bricks[c][r] = {
          x: c * (brickWidth + brickPadding) + brickOffsetLeft,
          y: r * (brickHeight + brickPadding) + brickOffsetTop,
          w: brickWidth,
          h: brickHeight,
          status: 1,
          skill: skillName,
          palette: palette
        };
        index++;
      }
    }
  }

  function resetBallAndPaddle() {
    paddle.x = (canvas.width - paddle.w) / 2;
    ball.x = canvas.width / 2;
    ball.y = paddle.y - ball.r - 2;
    const dir = Math.random() > 0.5 ? 1 : -1;
    ball.dx = (3 + Math.random() * 0.8) * dir;
    ball.dy = -3.8;
  }

  function resetGame() {
    score = 0;
    lives = 3;
    particles = [];
    gameState = 'START';
    updateHUD();
    initBricks();
    resetBallAndPaddle();
  }

  function updateHUD() {
    if (scoreDisplay) scoreDisplay.textContent = score;
    if (livesDisplay) {
      livesDisplay.textContent = lives === 3 ? '❤️❤️❤️' : lives === 2 ? '❤️❤️' : lives === 1 ? '❤️' : '💀';
    }
    if (blocksDisplay) {
      let count = 0;
      for (let c = 0; c < brickCols; c++) {
        for (let r = 0; r < brickRows; r++) {
          if (bricks[c] && bricks[c][r] && bricks[c][r].status === 1) count++;
        }
      }
      blocksDisplay.textContent = `Skills Remaining: ${count}`;
    }
  }

  function createParticles(x, y, color) {
    for (let i = 0; i < 14; i++) {
      particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        r: Math.random() * 2.5 + 1,
        color: color,
        alpha: 1,
        life: 0.035 + Math.random() * 0.02
      });
    }
  }

  // Keyboard controls
  const keys = { left: false, right: false };
  window.addEventListener('keydown', (e) => {
    if (modal.classList.contains('hidden')) return;

    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      keys.left = true;
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      keys.right = true;
    } else if (e.code === 'Space') {
      e.preventDefault();
      if (gameState === 'START') {
        gameState = 'PLAYING';
      } else if (gameState === 'GAME_OVER' || gameState === 'VICTORY') {
        resetGame();
        gameState = 'PLAYING';
      }
    } else if (e.key === 'r' || e.key === 'R') {
      resetGame();
      gameState = 'PLAYING';
    } else if (e.key === 'Escape') {
      closeArcade();
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
  });

  // Mouse & Touch controls
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const relativeX = (e.clientX - rect.left) * scaleX;
    paddle.x = Math.max(0, Math.min(canvas.width - paddle.w, relativeX - paddle.w / 2));

    if (gameState === 'START') {
      ball.x = paddle.x + paddle.w / 2;
    }
  });

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const relativeX = (e.touches[0].clientX - rect.left) * scaleX;
      paddle.x = Math.max(0, Math.min(canvas.width - paddle.w, relativeX - paddle.w / 2));

      if (gameState === 'START') {
        ball.x = paddle.x + paddle.w / 2;
      }
    }
  }, { passive: false });

  canvas.addEventListener('click', () => {
    if (gameState === 'START') {
      gameState = 'PLAYING';
    } else if (gameState === 'GAME_OVER' || gameState === 'VICTORY') {
      resetGame();
      gameState = 'PLAYING';
    }
  });

  // Collision detection
  function detectCollisions() {
    let allCleared = true;

    for (let c = 0; c < brickCols; c++) {
      for (let r = 0; r < brickRows; r++) {
        const b = bricks[c][r];
        if (b.status === 1) {
          allCleared = false;
          if (
            ball.x + ball.r > b.x &&
            ball.x - ball.r < b.x + b.w &&
            ball.y + ball.r > b.y &&
            ball.y - ball.r < b.y + b.h
          ) {
            ball.dy = -ball.dy;
            b.status = 0;
            score += 100;
            createParticles(b.x + b.w / 2, b.y + b.h / 2, b.palette.border);
            playSound(540 + Math.random() * 80, 'sine', 0.06);
            updateHUD();

            // Slight speedup every 4 blocks
            if (score % 400 === 0 && Math.abs(ball.dx) < 6) {
              ball.dx *= 1.08;
              ball.dy *= 1.08;
            }
          }
        }
      }
    }

    if (allCleared && gameState === 'PLAYING') {
      gameState = 'VICTORY';
      playSound(784, 'triangle', 0.15);
      setTimeout(() => playSound(1046, 'triangle', 0.25), 160);
    }
  }

  // Draw functions
  function drawPaddle() {
    ctx.save();
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.roundRect(paddle.x, paddle.y, paddle.w, paddle.h, 6);
    ctx.fill();

    // Inner highlight
    ctx.fillStyle = '#a5f3fc';
    ctx.beginPath();
    ctx.roundRect(paddle.x + 3, paddle.y + 2, paddle.w - 6, 3, 2);
    ctx.fill();
    ctx.restore();
  }

  function drawBall() {
    ctx.save();
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.restore();
  }

  function drawBricks() {
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let c = 0; c < brickCols; c++) {
      for (let r = 0; r < brickRows; r++) {
        const b = bricks[c][r];
        if (b.status === 1) {
          ctx.save();
          ctx.fillStyle = b.palette.bg;
          ctx.strokeStyle = b.palette.border;
          ctx.lineWidth = 1.2;
          ctx.shadowColor = b.palette.border;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.roundRect(b.x, b.y, b.w, b.h, 5);
          ctx.fill();
          ctx.stroke();

          // Text label
          ctx.shadowBlur = 0;
          ctx.fillStyle = b.palette.text;
          ctx.fillText(b.skill, b.x + b.w / 2, b.y + b.h / 2);
          ctx.restore();
        }
      }
    }
  }

  function drawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.life;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function drawOverlays() {
    if (gameState === 'START') {
      ctx.save();
      ctx.fillStyle = 'rgba(7, 10, 19, 0.75)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = 'bold 20px "Outfit", sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.fillText('BREAK NITIN\'S SKILL ARSENAL', canvas.width / 2, canvas.height / 2 - 20);

      ctx.font = '13px "JetBrains Mono", monospace';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText('CLICK SCREEN or PRESS SPACE TO LAUNCH BALL', canvas.width / 2, canvas.height / 2 + 15);

      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Move paddle using Mouse or [← / →] Arrow Keys', canvas.width / 2, canvas.height / 2 + 40);
      ctx.restore();
    } else if (gameState === 'GAME_OVER') {
      ctx.save();
      ctx.fillStyle = 'rgba(5, 7, 12, 0.88)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = 'bold 28px "Outfit", sans-serif';
      ctx.fillStyle = '#f43f5e';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 25);

      ctx.font = '14px "JetBrains Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);

      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('CLICK or PRESS [R] TO REPLAY • [ESC] TO EXIT', canvas.width / 2, canvas.height / 2 + 45);
      ctx.restore();
    } else if (gameState === 'VICTORY') {
      ctx.save();
      ctx.fillStyle = 'rgba(5, 7, 12, 0.88)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = 'bold 28px "Outfit", sans-serif';
      ctx.fillStyle = '#10b981';
      ctx.textAlign = 'center';
      ctx.fillText('🎉 ALL SKILLS MASTERED!', canvas.width / 2, canvas.height / 2 - 25);

      ctx.font = '14px "JetBrains Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`Mastery Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);

      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('PRESS [R] TO REPLAY • [ESC] TO EXIT', canvas.width / 2, canvas.height / 2 + 45);
      ctx.restore();
    }
  }

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle background grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 35) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    drawBricks();
    drawPaddle();
    drawBall();
    drawParticles();
    drawOverlays();

    if (gameState === 'PLAYING') {
      // Paddle keyboard movement
      if (keys.left && paddle.x > 0) paddle.x -= paddle.speed;
      if (keys.right && paddle.x < canvas.width - paddle.w) paddle.x += paddle.speed;

      // Ball movement
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall bounce
      if (ball.x + ball.r > canvas.width) {
        ball.x = canvas.width - ball.r;
        ball.dx = -ball.dx;
        playSound(320, 'sine', 0.04);
      } else if (ball.x - ball.r < 0) {
        ball.x = ball.r;
        ball.dx = -ball.dx;
        playSound(320, 'sine', 0.04);
      }

      if (ball.y - ball.r < 0) {
        ball.y = ball.r;
        ball.dy = -ball.dy;
        playSound(320, 'sine', 0.04);
      }

      // Paddle hit
      if (
        ball.y + ball.r >= paddle.y &&
        ball.y - ball.r <= paddle.y + paddle.h &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.w
      ) {
        // Angle deflection based on hit position
        const hitPoint = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
        ball.dx = hitPoint * 4.5;
        ball.dy = -Math.abs(ball.dy);
        ball.y = paddle.y - ball.r - 1;
        playSound(260, 'triangle', 0.05);
      }

      // Ball dropped below bottom
      if (ball.y + ball.r > canvas.height) {
        lives--;
        playSound(140, 'sawtooth', 0.2);
        updateHUD();

        if (lives <= 0) {
          gameState = 'GAME_OVER';
        } else {
          gameState = 'START';
          resetBallAndPaddle();
        }
      }

      detectCollisions();
    }

    animationId = requestAnimationFrame(gameLoop);
  }

  function openArcade() {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    resetGame();
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(gameLoop);
  }

  function closeArcade() {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    if (animationId) cancelAnimationFrame(animationId);
  }

  openSkillBreakerGame = openArcade;

  if (closeBtn) closeBtn.addEventListener('click', closeArcade);
  if (exitBtn) exitBtn.addEventListener('click', closeArcade);
  if (restartBtn) restartBtn.addEventListener('click', () => { resetGame(); gameState = 'PLAYING'; });
}

/* ==========================================================================
   10. LO-FI CODING MUSIC PLAYER WIDGET
   ========================================================================== */
function initLofiPlayer() {
  const toggleBtn = document.getElementById('lofiToggleBtn');
  const expandedCard = document.getElementById('lofiExpandedCard');
  const closeCardBtn = document.getElementById('lofiCloseCardBtn');
  const playPauseBtn = document.getElementById('lofiPlayPauseBtn');
  const playIcon = document.getElementById('lofiPlayIcon');
  const prevBtn = document.getElementById('lofiPrevBtn');
  const nextBtn = document.getElementById('lofiNextBtn');
  const trackTitle = document.getElementById('lofiTrackTitle');
  const trackArtist = document.getElementById('lofiTrackArtist');
  const volumeSlider = document.getElementById('lofiVolumeSlider');
  const uploadInput = document.getElementById('lofiUploadInput');
  const audio = document.getElementById('portfolioAudio');
  const discIcon = document.getElementById('lofiDiscIcon');
  const equalizer = document.getElementById('lofiEqualizer');
  const statusText = document.getElementById('lofiStatusText');

  if (!audio) return;

  const playlist = [
    {
      title: 'Blossoms on the pavement',
      artist: 'openlofi • Github',
      src: 'assets/audio/blossoms-on-the-pavement.mp3'
    },
    {
      title: 'Brushstrokes and rain',
      artist: 'openlofi • Github',
      src: 'assets/audio/brushstrokes-and-rain.mp3'
    },
    {
      title: 'Sidewalk slow',
      artist: 'openlofi • Github',
      src: 'assets/audio/sidewalk-slow.mp3'
    },
    {
      title: 'Terminal rain',
      artist: 'openlofi • Github',
      src: 'assets/audio/terminal-rain.mp3'
    },
    {
      title: 'Winter turnable',
      artist: 'openlofi • Github',
      src: 'assets/audio/winter-turnable.mp3'
    }
  ];

  let currentTrackIdx = 0;
  let isPlaying = false;

  function loadTrack(idx) {
    if (idx < 0) idx = playlist.length - 1;
    if (idx >= playlist.length) idx = 0;
    currentTrackIdx = idx;

    const track = playlist[currentTrackIdx];
    audio.src = track.src;
    if (trackTitle) trackTitle.textContent = track.title;
    if (trackArtist) trackArtist.textContent = track.artist;
    if (statusText) statusText.textContent = track.title;
  }

  function playTrack() {
    audio.play().then(() => {
      isPlaying = true;
      if (playIcon) {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
      }
      if (discIcon) discIcon.classList.add('animate-spin');
      if (equalizer) equalizer.classList.remove('hidden');
      if (equalizer) equalizer.classList.add('flex');
    }).catch((err) => {
      console.warn('Audio play notice:', err);
    });
  }

  function pauseTrack() {
    audio.pause();
    isPlaying = false;
    if (playIcon) {
      playIcon.classList.remove('fa-pause');
      playIcon.classList.add('fa-play');
    }
    if (discIcon) discIcon.classList.remove('animate-spin');
    if (equalizer) {
      equalizer.classList.add('hidden');
      equalizer.classList.remove('flex');
    }
  }

  function togglePlay() {
    if (isPlaying) {
      pauseTrack();
    } else {
      if (!audio.src) loadTrack(currentTrackIdx);
      playTrack();
    }
  }

  // Toggle card visibility (does NOT auto-play; user controls playback via Play/Pause)
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (expandedCard) expandedCard.classList.toggle('hidden');
    });
  }

  if (closeCardBtn) {
    closeCardBtn.addEventListener('click', () => {
      if (expandedCard) expandedCard.classList.add('hidden');
    });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      loadTrack(currentTrackIdx + 1);
      playTrack();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      loadTrack(currentTrackIdx - 1);
      playTrack();
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      audio.volume = parseFloat(e.target.value);
    });
  }

  // Track finished -> auto next
  audio.addEventListener('ended', () => {
    loadTrack(currentTrackIdx + 1);
    playTrack();
  });

  // Custom MP3 file upload
  if (uploadInput) {
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        const customTrack = {
          title: file.name.replace(/\.[^/.]+$/, ''),
          artist: 'Local Custom Track',
          src: objectUrl
        };
        playlist.unshift(customTrack);
        loadTrack(0);
        playTrack();
        if (typeof showToast === 'function') {
          showToast(`🎵 Loaded custom track: ${customTrack.title}`);
        }
      }
    });
  }

  // Initial setup
  audio.volume = 0.7;
  loadTrack(0);
}
