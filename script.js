/**
 * GUIA NATURAL CONTRA A TOSSE — SCRIPT INTERATIVO PROFISSIONAL
 * Funcionalidades:
 * - Acordeão interativo de FAQ com acessibilidade ARIA
 * - Menu móvel responsivo com alternância de gaveta
 * - Efeito 3D parallax interactivo no mockup do Hero
 * - Barra fixa (Sticky CTA) no rodapé ao rolar a página
 * - Header dinâmico com elevação ao fazer scroll
 * - Modais com termos legais (Privacidade, Termos de Uso e Segurança)
 * - Validação e consistência de checkout oficial EscalePay
 */

document.addEventListener('DOMContentLoaded', () => {

  // URL Oficial e Preço Imutável
  const OFFICIAL_CHECKOUT_URL = "https://checkout.escalepay.com/2104259";
  const OFFICIAL_PRICE = "R$ 12,38";

  /* ==========================================================================
     1. MENU MOBILE GAVETA
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', String(!isExpanded));
      mobileNav.classList.toggle('is-open', !isExpanded);
      mobileNav.setAttribute('aria-hidden', String(isExpanded));
    });

    // Fechar ao clicar em qualquer link da gaveta
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* ==========================================================================
     2. HEADER DINÂMICO & ELEVAÇÃO AO ROLAR
     ========================================================================== */
  const headerMain = document.getElementById('headerMain');
  const floatingCtaBar = document.getElementById('floatingCtaBar');
  const heroSection = document.getElementById('hero');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // Efeito de elevação no header
    if (headerMain) {
      if (scrollY > 30) {
        headerMain.classList.add('is-scrolled');
      } else {
        headerMain.classList.remove('is-scrolled');
      }
    }

    // Exibir Barra Fixa (Sticky CTA) após ultrapassar a secção Hero
    if (floatingCtaBar && heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - 120;
      if (scrollY > heroBottom) {
        floatingCtaBar.classList.add('is-visible');
        floatingCtaBar.setAttribute('aria-hidden', 'false');
      } else {
        floatingCtaBar.classList.remove('is-visible');
        floatingCtaBar.setAttribute('aria-hidden', 'true');
      }
    }
  }, { passive: true });

  /* ==========================================================================
     3. ACORDEÃO INTERATIVO DE FAQ
     ========================================================================== */
  const faqAccordion = document.getElementById('faqAccordion');
  if (faqAccordion) {
    const faqCards = faqAccordion.querySelectorAll('.faq-card');

    faqCards.forEach(card => {
      const trigger = card.querySelector('.faq-trigger');
      const panel = card.querySelector('.faq-panel');

      if (!trigger || !panel) return;

      trigger.addEventListener('click', () => {
        const isOpen = card.classList.contains('is-open');

        // Fecha todos os outros cartões para manter foco e clareza
        faqCards.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.classList.remove('is-open');
            const otherTrigger = otherCard.querySelector('.faq-trigger');
            const otherPanel = otherCard.querySelector('.faq-panel');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.hidden = true;
          }
        });

        // Alterna o estado do cartão clicado
        if (isOpen) {
          card.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          panel.hidden = true;
        } else {
          card.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          panel.hidden = false;
        }
      });
    });
  }

  /* ==========================================================================
     4. EFEITO PARALLAX 3D NO HERO MOCKUP (DESKTOP)
     ========================================================================== */
  const mockupStage = document.getElementById('mockupStage');
  const deviceComposition = document.getElementById('deviceComposition');

  if (mockupStage && deviceComposition && window.matchMedia('(min-width: 992px)').matches) {
    mockupStage.addEventListener('mousemove', (e) => {
      const rect = mockupStage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateY = (x / rect.width) * 16;
      const rotateX = -(y / rect.height) * 16;

      deviceComposition.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });

    mockupStage.addEventListener('mouseleave', () => {
      deviceComposition.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  /* ==========================================================================
     5. MODAIS LEGAIS (POLÍTICA DE PRIVACIDADE, TERMOS E SEGURANÇA)
     ========================================================================== */
  const legalModalBackdrop = document.getElementById('legalModalBackdrop');
  const legalModalTitle = document.getElementById('legalModalTitle');
  const legalModalBody = document.getElementById('legalModalBody');
  const legalModalClose = document.getElementById('legalModalClose');
  const legalModalOkBtn = document.getElementById('legalModalOkBtn');

  const openPrivacyModal = document.getElementById('openPrivacyModal');
  const openTermsModal = document.getElementById('openTermsModal');
  const openSafetyModal = document.getElementById('openSafetyModal');

  const legalContentMap = {
    privacy: {
      title: 'Política de Privacidade',
      content: `
        <h4>1. Recolha e Tratamento de Dados</h4>
        <p>A proteção da sua privacidade é fundamental para nós. Ao adquirir o <strong>Guia Natural Contra a Tosse</strong>, os dados de faturação e pagamento são processados exclusivamente através da plataforma parceira oficial e segura <strong>EscalePay</strong> (https://checkout.escalepay.com/2104259).</p>
        
        <h4>2. Finalidade dos Dados</h4>
        <p>O seu endereço de e-mail é utilizado unicamente para o envio imediato do link de descarregamento do ebook em formato PDF e eventuais atualizações de conteúdo do guia.</p>
        
        <h4>3. Confidencialidade e Segurança</h4>
        <p>Não comercializamos, alugamos nem transferimos as suas informações pessoais para terceiros. O ambiente de transação conta com encriptação avançada de ponta a ponta (SSL/TLS).</p>
      `
    },
    terms: {
      title: 'Termos de Utilização',
      content: `
        <h4>1. Objeto do Produto</h4>
        <p>O <strong>Guia Natural Contra a Tosse</strong> é um livro digital (ebook em formato PDF) com fins estritamente informativos e educativos, compilando 42 receitas caseiras e preparações tradicionais.</p>
        
        <h4>2. Preço e Modalidade de Pagamento</h4>
        <p>O valor oficial do produto é de <strong>R$ 12,38</strong> em modalidade de <strong>pagamento único</strong>, conferindo acesso vitalício ao ficheiro digital descarregado, sem mensalidades ou custos ocultos.</p>
        
        <h4>3. Direitos de Propriedade Intelectual</h4>
        <p>O conteúdo, design e compilação do guia estão protegidos pela legislação de direitos de autor. O uso é estritamente pessoal e intransmissível, sendo proibida a reprodução, cópia ou revenda não autorizada.</p>
      `
    },
    safety: {
      title: 'Avisos Gerais de Segurança em Saúde',
      content: `
        <h4>1. Caráter Educativo e Não Diagnóstico</h4>
        <p>Este ebook tem finalidade educativa e não constitui aconselhamento médico individual. As receitas podem ajudar a aliviar alguns sintomas, mas não garantem resultados nem substituem avaliação ou tratamento médico.</p>
        
        <h4>2. Cuidados com Crianças e o Mel</h4>
        <p>O guia inclui preparações destinadas a crianças com mais de 1 ano. É <strong>terminantemente contraindicado</strong> o fornecimento de mel a bebés com menos de 12 meses de idade devido ao risco de botulismo infantil.</p>
        
        <h4>3. Sinais de Alerta Médico Urgente</h4>
        <p>Em caso de dificuldade respiratória, falta de ar severa, dor intensa no peito, febre alta persistente, lábios azulados ou sangue na expetoração, procure assistência médica hospitalar urgente de imediato.</p>
      `
    }
  };

  function openModal(type) {
    if (!legalModalBackdrop || !legalContentMap[type]) return;
    legalModalTitle.textContent = legalContentMap[type].title;
    legalModalBody.innerHTML = legalContentMap[type].content;
    legalModalBackdrop.classList.add('is-active');
    legalModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!legalModalBackdrop) return;
    legalModalBackdrop.classList.remove('is-active');
    legalModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openPrivacyModal) openPrivacyModal.addEventListener('click', () => openModal('privacy'));
  if (openTermsModal) openTermsModal.addEventListener('click', () => openModal('terms'));
  if (openSafetyModal) openSafetyModal.addEventListener('click', () => openModal('safety'));

  if (legalModalClose) legalModalClose.addEventListener('click', closeModal);
  if (legalModalOkBtn) legalModalOkBtn.addEventListener('click', closeModal);

  if (legalModalBackdrop) {
    legalModalBackdrop.addEventListener('click', (e) => {
      if (e.target === legalModalBackdrop) closeModal();
    });
  }

  // Tecla Escape fecha o modal aberto
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && legalModalBackdrop && legalModalBackdrop.classList.contains('is-active')) {
      closeModal();
    }
  });

  /* ==========================================================================
     6. VERIFICAÇÃO CONSISTENTE DOS BOTÕES DE CHECKOUT
     ========================================================================== */
  const allCheckoutLinks = document.querySelectorAll(`a[href*="checkout.escalepay.com"]`);
  allCheckoutLinks.forEach(link => {
    link.setAttribute('href', OFFICIAL_CHECKOUT_URL);
  });

});
