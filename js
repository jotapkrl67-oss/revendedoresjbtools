// Inicialização do site
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Site de Termos de Uso carregado com sucesso!');
    
    // Inicializar funcionalidades
    initializeAcceptButton();
    initializeScrollAnimations();
    initializeCardInteractions();
    initializeResellerModal();
});

// Função para aceitar os termos
function initializeAcceptButton() {
    const acceptBtn = document.getElementById('acceptBtn');
    
    acceptBtn.addEventListener('click', () => {
        // Atualizar visual do botão
        acceptBtn.textContent = '✓ Termos Aceitos';
        acceptBtn.classList.add('accepted');
        acceptBtn.disabled = true;
        
        // Mostrar a seção de revendedor com animação
        const resellerCta = document.getElementById('resellerCta');
        resellerCta.style.display = 'block';
        
        // Forçar reflow para ativar a animação
        void resellerCta.offsetWidth;
        
        // Mostrar notificação
        showNotification('Termos aceitos com sucesso! 🎉', 'success');
        
        // Scroll suave para a seção de revendedor
        setTimeout(() => {
            resellerCta.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    });
}

// Função para inicializar modal de revendedor
function initializeResellerModal() {
    const becomeResellerBtn = document.getElementById('becomeResellerBtn');
    const pixModal = document.getElementById('pixModal');
    const closePixModal = document.getElementById('closePixModal');
    const copyPixBtn = document.getElementById('copyPixBtn');
    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    
    // Abrir modal
    if (becomeResellerBtn) {
        becomeResellerBtn.addEventListener('click', () => {
            pixModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Fechar modal
    closePixModal.addEventListener('click', () => {
        pixModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Fechar modal ao clicar fora
    pixModal.addEventListener('click', (e) => {
        if (e.target === pixModal) {
            pixModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Copiar chave PIX
    copyPixBtn.addEventListener('click', () => {
        const pixKey = document.getElementById('pixKey');
        pixKey.select();
        document.execCommand('copy');
        
        // Feedback visual
        copyPixBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
        copyPixBtn.classList.add('copied');
        
        showNotification('Chave PIX copiada para a área de transferência!', 'success');
        
        // Resetar botão após 2 segundos
        setTimeout(() => {
            copyPixBtn.innerHTML = '<i class="fas fa-copy"></i> Copiar';
            copyPixBtn.classList.remove('copied');
        }, 2000);
    });
    
    // Confirmar pagamento
    confirmPaymentBtn.addEventListener('click', () => {
        showNotification('Obrigado! Aguardando confirmação do seu pagamento.', 'success');
        setTimeout(() => {
            pixModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }, 1500);
    });
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Adicionar estilos dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 2000;
            animation: slideInRight 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .notification-success {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
        }
        
        .notification-info {
            background: linear-gradient(135deg, #0052cc 0%, #1e88e5 100%);
            color: white;
        }
        
        .notification-error {
            background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
            color: white;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Função para animações de scroll
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.term-card').forEach(card => {
        observer.observe(card);
    });
}

// Função para interações com cards
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.term-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // Adicionar efeito de ripple ao clicar
        card.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.className = 'ripple';
            
            // Adicionar estilos de ripple se não existirem
            if (!document.querySelector('style[data-ripple]')) {
                const rippleStyle = document.createElement('style');
                rippleStyle.setAttribute('data-ripple', 'true');
                rippleStyle.textContent = `
                    .term-card {
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .ripple {
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(0, 82, 204, 0.3);
                        transform: scale(0);
                        animation: rippleAnimation 0.6s ease-out;
                        pointer-events: none;
                    }
                    
                    @keyframes rippleAnimation {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(rippleStyle);
            }
            
            card.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Função para rastrear scroll
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallax = document.querySelector('.background-gradient');
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Função para detectar preferência de tema do sistema
function initializeTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDark) {
        console.log('🌙 Modo escuro detectado');
    } else {
        console.log('☀️ Modo claro detectado');
    }
}

initializeTheme();

// Função para compartilhar termos (exemplo de funcionalidade extra)
function shareTerms() {
    const text = 'Confira os Termos de Uso do Painel de Revendedores JB Tools!';
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'Termos de Uso - JB Tools',
            text: text,
            url: url
        }).catch(err => console.log('Erro ao compartilhar:', err));
    } else {
        console.log('Web Share API não suportada');
    }
}

// Função para imprimir os termos
function printTerms() {
    window.print();
}

// Exportar funções para uso global
window.shareTerms = shareTerms;
window.printTerms = printTerms;

