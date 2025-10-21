// Configurações
const CONFIG = {
  PIX_KEY: '616c37e1-5b48-4213-bf9a-9ec880a525af',
  PAYMENT_AMOUNT: 'R$ 180,00',
  CONTACT_NAME: 'Samuel Camargo Junior',
  WHATSAPP_LINK: 'https://api.whatsapp.com/send/?phone=554196844896&text&type=phone_number&app_absent=0'
};

// Estado da aplicação
const state = {
  showTermsModal: false,
  showPaymentModal: false,
  copied: false
};

// Elementos do DOM
const elements = {
  termsModal: null,
  paymentModal: null,
  becomeResellerBtn: null,
  acceptTermsBtn: null,
  rejectTermsBtn: null,
  closeTermsBtn: null,
  copyPixKeyBtn: null,
  whatsappBtn: null,
  closePaymentBtn: null,
  copyFeedback: null
};

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  initializeElements();
  attachEventListeners();
});

// Inicializar referências aos elementos
function initializeElements() {
  elements.termsModal = document.getElementById('termsModal');
  elements.paymentModal = document.getElementById('paymentModal');
  elements.becomeResellerBtn = document.getElementById('becomeResellerBtn');
  elements.acceptTermsBtn = document.getElementById('acceptTermsBtn');
  elements.rejectTermsBtn = document.getElementById('rejectTermsBtn');
  elements.closeTermsBtn = document.getElementById('closeTermsBtn');
  elements.copyPixKeyBtn = document.getElementById('copyPixKeyBtn');
  elements.whatsappBtn = document.getElementById('whatsappBtn');
  elements.closePaymentBtn = document.getElementById('closePaymentBtn');
  elements.copyFeedback = document.getElementById('copyFeedback');
}

// Anexar event listeners
function attachEventListeners() {
  // Botão "Quero me tornar revendedor"
  elements.becomeResellerBtn.addEventListener('click', openTermsModal);

  // Modal de Termos
  elements.acceptTermsBtn.addEventListener('click', acceptTerms);
  elements.rejectTermsBtn.addEventListener('click', closeTermsModal);
  elements.closeTermsBtn.addEventListener('click', closeTermsModal);

  // Modal de Pagamento
  elements.copyPixKeyBtn.addEventListener('click', copyPixKey);
  elements.whatsappBtn.addEventListener('click', openWhatsApp);
  elements.closePaymentBtn.addEventListener('click', closePaymentModal);

  // Fechar modal ao clicar no overlay
  elements.termsModal.addEventListener('click', (e) => {
    if (e.target === elements.termsModal) {
      closeTermsModal();
    }
  });

  elements.paymentModal.addEventListener('click', (e) => {
    if (e.target === elements.paymentModal) {
      closePaymentModal();
    }
  });
}

// Abrir modal de termos
function openTermsModal() {
  state.showTermsModal = true;
  elements.termsModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Fechar modal de termos
function closeTermsModal() {
  state.showTermsModal = false;
  elements.termsModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Aceitar termos e abrir modal de pagamento
function acceptTerms() {
  closeTermsModal();
  openPaymentModal();
}

// Abrir modal de pagamento
function openPaymentModal() {
  state.showPaymentModal = true;
  elements.paymentModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Fechar modal de pagamento
function closePaymentModal() {
  state.showPaymentModal = false;
  elements.paymentModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Copiar chave PIX
function copyPixKey() {
  navigator.clipboard.writeText(CONFIG.PIX_KEY).then(() => {
    // Mostrar feedback
    state.copied = true;
    elements.copyFeedback.classList.remove('hidden');
    
    // Trocar ícone do botão
    const icon = elements.copyPixKeyBtn.querySelector('svg');
    const copyIcon = document.getElementById('copyIcon');
    const checkIcon = document.getElementById('checkIcon');
    
    if (copyIcon && checkIcon) {
      copyIcon.classList.add('hidden');
      checkIcon.classList.remove('hidden');
    }

    // Resetar após 2 segundos
    setTimeout(() => {
      state.copied = false;
      elements.copyFeedback.classList.add('hidden');
      
      if (copyIcon && checkIcon) {
        copyIcon.classList.remove('hidden');
        checkIcon.classList.add('hidden');
      }
    }, 2000);
  }).catch(() => {
    alert('Erro ao copiar a chave PIX');
  });
}

// Abrir WhatsApp
function openWhatsApp() {
  window.open(CONFIG.WHATSAPP_LINK, '_blank');
}

// SVG Icons
function getSvgIcon(name) {
  const icons = {
    copy: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    x: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    alertTriangle: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
  };
  return icons[name] || '';
}

