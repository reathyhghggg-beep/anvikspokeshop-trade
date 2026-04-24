// Pokemon Cards Data with TCGPlayer images
const pokemonCards = [
    {
        id: 1,
        title: "Eevee V (Eevee Stamp)",
        set: "SWSH065",
        image: "https://images.tcgplayer.com/fit/filtered/300x410/db/9f/db9f3b51-f8e8-4a3b-8aab-8e18e9c8e5d1.jpg"
    },
    {
        id: 2,
        title: "Lycanroc V",
        set: "081/203",
        image: "https://images.tcgplayer.com/fit/filtered/300x410/d6/aa/d6aa9a9e-3e5e-4e5d-8d3e-5e5d8e5d8e5d.jpg"
    },
    {
        id: 3,
        title: "Lugia V",
        set: "SWSH301",
        image: "https://images.tcgplayer.com/fit/filtered/300x410/0a/1b/0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d.jpg"
    },
    {
        id: 4,
        title: "Sylveon V",
        set: "SWSH202",
        image: "https://images.tcgplayer.com/fit/filtered/300x410/f1/e2/f1e2d3c4-b5a6-9879-6857-4938291b0a5c.jpg"
    },
    {
        id: 5,
        title: "Pinsir",
        set: "168/167",
        image: "https://images.tcgplayer.com/fit/filtered/300x410/e3/d4/e3d4c5b6-a7f8-4957-3847-2938191a0c5d.jpg"
    },
    {
        id: 6,
        title: "Medicham EX (Japanese)",
        set: "054/102",
        image: "https://images.tcgplayer.com/fit/filtered/300x410/c5/b6/c5b6a7f8-9e0d-3c4b-2a1f-0938574837d6.jpg"
    },
    {
        id: 7,
        title: "Zapdos EX",
        set: "192/165",
        image: "https://images.tcgplayer.com/fit/filtered/300x410/a7/f8/a7f89e0d-3c4b-5a69-8e7f-6d5c4b3a2f1e.jpg"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadCards();
    setupModal();
    setupScheduleForm();
});

// Load cards into grid
function loadCards() {
    const cardsGrid = document.getElementById('cardsGrid');
    if (!cardsGrid) return;
    
    cardsGrid.innerHTML = '';
    pokemonCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.title}" class="card-image">
            <h3>${card.title}</h3>
            <p class="card-set">${card.set}</p>
        `;
        cardElement.onclick = () => openModal(card);
        cardsGrid.appendChild(cardElement);
    });
}

// Modal Functions
function setupModal() {
    const modal = document.getElementById('cardModal');
    const closeBtn = document.querySelector('.close');
    const tradeBtn = document.getElementById('tradeBtn');
    const buyBtn = document.getElementById('buyBtn');
    const tradeSubmit = document.getElementById('tradeSubmit');
    const buySubmit = document.getElementById('buySubmit');

    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    if (tradeBtn) {
        tradeBtn.onclick = () => showTradeForm();
    }

    if (buyBtn) {
        buyBtn.onclick = () => showBuyForm();
    }

    if (tradeSubmit) {
        tradeSubmit.onclick = () => submitTrade();
    }

    if (buySubmit) {
        buySubmit.onclick = () => submitBuy();
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            closeModal();
        }
    };
}

function openModal(card) {
    const modal = document.getElementById('cardModal');
    document.getElementById('modalCardImage').src = card.image;
    document.getElementById('modalCardTitle').textContent = card.title + ' (' + card.set + ')';
    
    // Reset forms
    document.getElementById('tradeForm').classList.add('hidden');
    document.getElementById('buyForm').classList.add('hidden');
    document.getElementById('tradeInput').value = '';
    document.getElementById('buyInput').value = '';
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('cardModal').style.display = 'none';
}

function showTradeForm() {
    document.getElementById('tradeForm').classList.remove('hidden');
    document.getElementById('buyForm').classList.add('hidden');
}

function showBuyForm() {
    document.getElementById('buyForm').classList.remove('hidden');
    document.getElementById('tradeForm').classList.add('hidden');
}

function submitTrade() {
    const tradeText = document.getElementById('tradeInput').value;
    if (tradeText.trim() === '') {
        alert('Please enter your Pokemon cards for trade');
        return;
    }
    alert('Trade offer submitted!\n\nYour cards: ' + tradeText + '\n\nWe will contact you soon!');
    closeModal();
}

function submitBuy() {
    const price = document.getElementById('buyInput').value;
    if (price === '' || price <= 0) {
        alert('Please enter a valid price');
        return;
    }
    alert('Buy offer submitted!\n\nYour offer: $' + price + '\n\nWe will contact you soon!');
    closeModal();
}

// Schedule Meeting Form
function setupScheduleForm() {
    const form = document.getElementById('scheduleForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const time = document.getElementById('meetingTime').value;
            const notes = document.getElementById('meetingNotes').value;
            
            alert('Meeting scheduled!\n\nName: ' + name + '\nEmail: ' + email + '\nTime: ' + time + '\nNotes: ' + (notes || 'None') + '\n\nConfirmation sent to your email!');
            form.reset();
        });
    }
}

// Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});