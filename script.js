// Pokemon Cards Data (FIXED IMAGE DISPLAY)
const pokemonCards = [
    {
        id: 1,
        title: "Eevee V (Eevee Stamp)",
        set: "SWSH065",
        image: "https://placehold.co/300x410/png?text=Eevee+V"
    },
    {
        id: 2,
        title: "Lycanroc V",
        set: "081/203",
        image: "https://placehold.co/300x410/png?text=Lycanroc+V"
    },
    {
        id: 3,
        title: "Lugia V",
        set: "SWSH301",
        image: "https://placehold.co/300x410/png?text=Lugia+V"
    },
    {
        id: 4,
        title: "Sylveon V",
        set: "SWSH202",
        image: "https://placehold.co/300x410/png?text=Sylveon+V"
    },
    {
        id: 5,
        title: "Pinsir",
        set: "168/167",
        image: "https://placehold.co/300x410/png?text=Pinsir"
    },
    {
        id: 6,
        title: "Medicham EX (Japanese)",
        set: "054/102",
        image: "https://placehold.co/300x410/png?text=Medicham+EX"
    },
    {
        id: 7,
        title: "Zapdos EX",
        set: "192/165",
        image: "https://placehold.co/300x410/png?text=Zapdos+EX"
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    increaseTextSize(); // 👈 NEW
    loadCards();
    setupModal();
    setupScheduleForm();
});

// 🔥 MAKE TEXT BIGGER
function increaseTextSize() {
    const style = document.createElement('style');
    style.innerHTML = `
        body {
            font-size: 18px;
        }
        h1 {
            font-size: 3rem;
        }
        h2 {
            font-size: 2.2rem;
        }
        h3 {
            font-size: 1.6rem;
        }
        p, a, button, input {
            font-size: 1.1rem;
        }
        .card-set {
            font-size: 1rem;
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
}

// Load cards into grid
function loadCards() {
    const cardsGrid = document.getElementById('cardsGrid');
    if (!cardsGrid) return;

    cardsGrid.innerHTML = '';

    pokemonCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';

        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.title}" class="card-image"
                onerror="this.src='https://placehold.co/300x410?text=Card+Image'">
            <h3>${card.title}</h3>
            <p class="card-set">${card.set}</p>
        `;

        cardElement.onclick = () => openModal(card);
        cardsGrid.appendChild(cardElement);
    });
}

// Modal Functions (unchanged but safer)
function setupModal() {
    const modal = document.getElementById('cardModal');
    const closeBtn = document.querySelector('.close');
    const tradeBtn = document.getElementById('tradeBtn');
    const buyBtn = document.getElementById('buyBtn');
    const tradeSubmit = document.getElementById('tradeSubmit');
    const buySubmit = document.getElementById('buySubmit');

    closeBtn && (closeBtn.onclick = closeModal);
    tradeBtn && (tradeBtn.onclick = showTradeForm);
    buyBtn && (buyBtn.onclick = showBuyForm);
    tradeSubmit && (tradeSubmit.onclick = submitTrade);
    buySubmit && (buySubmit.onclick = submitBuy);

    window.onclick = (event) => {
        if (event.target == modal) closeModal();
    };
}

function openModal(card) {
    const modal = document.getElementById('cardModal');

    document.getElementById('modalCardImage').src = card.image;
    document.getElementById('modalCardTitle').textContent =
        `${card.title} (${card.set})`;

    document.getElementById('tradeForm')?.classList.add('hidden');
    document.getElementById('buyForm')?.classList.add('hidden');

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
    if (!tradeText.trim()) {
        alert('Please enter your Pokemon cards for trade');
        return;
    }
    alert(`Trade submitted!\n\nYour cards: ${tradeText}`);
    closeModal();
}

function submitBuy() {
    const price = document.getElementById('buyInput').value;
    if (!price || price <= 0) {
        alert('Enter a valid price');
        return;
    }
    alert(`Buy offer: $${price}`);
    closeModal();
}

// Schedule form
function setupScheduleForm() {
    const form = document.getElementById('scheduleForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        alert('Meeting scheduled!');
        form.reset();
    });
}
