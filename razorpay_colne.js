  // ===== HERO SLIDER =====
  let currentSlide = 0;
  const totalSlides = 4;
  let autoSlideTimer;

  function goSlide(index) {
    document.querySelectorAll('.hero-slide').forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.hero-dot').forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.hero-tab').forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
    currentSlide = index;
    resetAutoSlide();
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => {
      goSlide((currentSlide + 1) % totalSlides);
    }, 5000);
  }
  resetAutoSlide();

  // ===== NAVBAR SCROLL =====
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
  });

  // ===== TAB SWITCHER =====
  function switchTab(idx) {
    document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
    document.querySelectorAll('.tab-content').forEach((c, i) => c.classList.toggle('active', i === idx));
  }

  // ===== MODAL =====
  function openModal(type) {
    document.getElementById('modalOverlay').classList.add('open');
    document.getElementById('successMsg').style.display = 'none';
    document.querySelectorAll('.modal-form').forEach(f => f.classList.remove('active'));
    document.querySelectorAll('.modal-tab').forEach((t, i) => t.classList.toggle('active', (i === 0) === (type === 'signup')));
    document.getElementById('modal-' + type).classList.add('active');
  }
  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
  }
  function closeModalOutside(e) {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  }
  function switchModalTab(type) {
    document.getElementById('successMsg').style.display = 'none';
    document.querySelectorAll('.modal-tab').forEach((t, i) => t.classList.toggle('active', (i === 0) === (type === 'signup')));
    document.querySelectorAll('.modal-form').forEach(f => f.classList.remove('active'));
    document.getElementById('modal-' + type).classList.add('active');
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ===== FORM HANDLERS =====
  function handleSignup() {
    const email = document.getElementById('signupEmail').value;
    if (!email || !email.includes('@')) { showToast('⚠️ Please enter a valid email address'); return; }
    document.querySelectorAll('.modal-form').forEach(f => f.style.display = 'none');
    document.getElementById('successMsg').style.display = 'block';
    showToast('🎉 Account created successfully!');
  }
  function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    if (!email) { showToast('⚠️ Please enter your email'); return; }
    showToast('🔐 Redirecting to dashboard...');
    setTimeout(() => closeModal(), 1500);
  }

  // ===== TOAST =====
  let toastTimer;
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
  }

  // ===== SCROLL TO SECTION =====
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ===== MOBILE NAV =====
  function toggleMobileNav() {
    const nav = document.getElementById('mobileNav');
    nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
  }

  // ===== PAYMENT DEMO =====
  function selectDemoMethod(el) {
    document.querySelectorAll('.demo-method-btn').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
  }
  function simulatePayment() {
    showToast('✅ Payment of ₹2,499 successful! (Demo Mode)');
  }

  // ===== NEWSLETTER =====
  function subscribeNewsletter() {
    const email = document.getElementById('nlEmail').value;
    if (!email || !email.includes('@')) { showToast('⚠️ Enter a valid email address'); return; }
    showToast('✉️ Subscribed! Welcome to the Razorpay community.');
    document.getElementById('nlEmail').value = '';
  }

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
      const target = parseFloat(el.getAttribute('data-target'));
      const suffix = el.querySelector('span').textContent;
      const isDecimal = target % 1 !== 0;
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.innerHTML = (isDecimal ? current.toFixed(1) : Math.floor(current)) + '<span>' + suffix + '</span>';
        if (current >= target) clearInterval(timer);
      }, 25);
    });
  }

  // Trigger counter when stats section visible
  const statsObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObs.disconnect();
    }
  }, { threshold: 0.3 });
  statsObs.observe(document.querySelector('.stats-section'));