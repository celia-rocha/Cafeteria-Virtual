// Recuperar itens do carrinho do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.length;

// Elementos do DOM
const cartContent = document.getElementById('cart-content');
const cartCountElement = document.querySelector('.cart-count');
const pixSection = document.getElementById('pix-section');
const paymentStatus = document.getElementById('payment-status');

// Atualizar contador do carrinho
function updateCartCount() {
    cartCountElement.textContent = cartCount;
}

// Calcular total do carrinho
function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
}

// Renderizar itens do carrinho
function renderCart() {
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Seu carrinho está vazio</h2>
                <p>Adicione alguns itens deliciosos do nosso cardápio!</p>
                <a href="cardapio.html" class="finalize-button" style="display: inline-block; margin-top: 1rem; text-decoration: none;">
                    Ver Cardápio
                </a>
            </div>
        `;
        pixSection.style.display = 'none';
        return;
    }

    const total = calculateTotal();
    cartContent.innerHTML = `
        <div class="cart-container">
            <div class="cart-items">
                ${cart.map(item => `
                    <div class="cart-item">
                        <div>
                            <h3>${item.item}</h3>
                        </div>
                        <div>
                            <span>R$ ${item.price.toFixed(2)}</span>
                            <button onclick="removeItem('${item.item}')" style="margin-left: 1rem; color: #8B7355; background: none; border: none; cursor: pointer;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-total">
                Total: R$ ${total}
            </div>
            <button onclick="proceedToPayment()" class="finalize-button">
                Finalizar Minha Compra
            </button>
        </div>
    `;
}

// Remover item do carrinho
function removeItem(itemName) {
    cart = cart.filter(item => item.item !== itemName);
    cartCount = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

// Proceder para pagamento
function proceedToPayment() {
    pixSection.style.display = 'block';
    // Scroll suave até a seção de pagamento
    pixSection.scrollIntoView({ behavior: 'smooth' });
}

// Copiar chave PIX
function copyPixKey() {
    const pixKey = '96984126844';
    navigator.clipboard.writeText(pixKey).then(() => {
        showPaymentStatus('Chave PIX copiada com sucesso!', 'success');
    }).catch(() => {
        showPaymentStatus('Erro ao copiar chave PIX', 'error');
    });
}

// Mostrar status do pagamento
function showPaymentStatus(message, type) {
    paymentStatus.textContent = message;
    paymentStatus.className = `payment-status ${type}`;
    paymentStatus.style.display = 'block';
    
    setTimeout(() => {
        paymentStatus.style.display = 'none';
    }, 3000);
}

// Inicializar página
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
}); 
