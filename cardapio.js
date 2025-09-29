// Gerenciamento do carrinho
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.length;

// Elementos do DOM
const cartCountElement = document.querySelector('.cart-count');
const cartNotification = document.getElementById('cart-notification');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartIcon = document.querySelector('.cart-icon');

// Atualizar contador do carrinho
function updateCartCount() {
    cartCountElement.textContent = cartCount;
}

// Função para mostrar notificação
function showNotification() {
    cartNotification.style.display = 'block';
    setTimeout(() => {
        cartNotification.style.display = 'none';
    }, 3000);
}

// Adicionar evento de clique para todos os botões "Adicionar ao Carrinho"
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const item = button.dataset.item;
        const price = parseFloat(button.dataset.price);
        
        cart.push({ item, price });
        cartCount++;
        
        // Salvar no localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartCount();
        showNotification();
    });
});

// Adicionar link para o carrinho
cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'carrinho.html';
});

// Inicializar contador
updateCartCount();

// Função para mostrar/ocultar opções de sabor do suco
window.mostrarSabores = function() {
    const opcoes = document.getElementById('sabor-opcoes');
    const botao = document.querySelector('.choose-flavor-btn');
    opcoes.style.display = 'block';
    botao.style.display = 'none';
}

// Função para adicionar suco ao carrinho com sabor
window.adicionarSuco = function(sabor) {
    const item = `Suco de ${sabor}`;
    const price = 7.00;
    cart.push({ item, price });
    cartCount++;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification();
    // Esconde as opções após escolher
    document.getElementById('sabor-opcoes').style.display = 'none';
    // Mostra novamente o botão de escolher sabor
    document.querySelector('.choose-flavor-btn').style.display = 'flex';
}

// Funções para gerenciar os bolos
window.mostrarSaboresBolo = function() {
    const opcoes = document.getElementById('sabor-bolo-opcoes');
    const botao = document.querySelector('#bolo-item .choose-flavor-btn');
    opcoes.style.display = 'block';
    botao.style.display = 'none';
}

window.adicionarBolo = function(sabor) {
    const item = `Bolo de ${sabor}`;
    const price = 8.00;
    cart.push({ item, price });
    cartCount++;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification();
    // Esconde as opções após escolher
    document.getElementById('sabor-bolo-opcoes').style.display = 'none';
    // Mostra novamente o botão de escolher sabor
    document.querySelector('#bolo-item .choose-flavor-btn').style.display = 'flex';
} 
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
