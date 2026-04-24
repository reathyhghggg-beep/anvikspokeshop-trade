// =============================
// POKEMON CARDS DATA (TCGPLAYER)
// =============================

const pokemonCards = [
    {
        id: 1,
        title: "Eevee V (Eevee Stamp)",
        set: "SWSH065",
        image: "https://product-images.tcgplayer.com/fit-in/656x656/246708.jpg",
        price: "$12.45 NM"
    },
    {
        id: 2,
        title: "Lycanroc V",
        set: "081/203",
        image: "https://product-images.tcgplayer.com/fit-in/656x656/223073.jpg",
        price: "$2.89 NM"
    },
    {
        id: 3,
        title: "Lugia V",
        set: "SWSH301",
        image: "https://product-images.tcgplayer.com/fit-in/656x656/284137.jpg",
        price: "$18.74 NM"
    },
    {
        id: 4,
        title: "Sylveon V",
        set: "TG14/TG30",
        image: "https://product-images.tcgplayer.com/fit-in/656x656/253281.jpg",
        price: "$21.11 NM"
    },
    {
        id: 5,
        title: "Pinsir",
        set: "168/167",
        image: "https://product-images.tcgplayer.com/fit-in/656x656/542863.jpg",
        price: "$6.32 NM"
    },
    {
        id: 6,
        title: "Medicham EX",
        set: "095/107",
        image: "https://product-images.tcgplayer.com/fit-in/656x656/88808.jpg",
        price: "$7.20 NM"
    },
    {
        id: 7,
        title: "Zapdos EX",
        set: "192/165",
        image: "https://product-images.tcgplayer.com/fit-in/656x656/497617.jpg",
        price: "$39.56 NM"
    }
];

// =============================
// INIT
// =============================

document.addEventListener("DOMContentLoaded", function () {
    loadCards();
    setupModal();
    setupScheduleForm();
    setupAdmin();
});

// =============================
// LOAD CARDS
// =============================

function loadCards() {
    const cardsGrid = document.getElementById("cardsGrid");
    if (!cardsGrid) return;

    cardsGrid.innerHTML = "";

    pokemonCards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";

        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.title}" class="card-image">

            <h3>${card.title}</h3>

            <p class="card-set">${card.set}</p>

            <p class="card-price">${card.price}</p>
        `;

        cardElement.onclick = () => openModal(card);

        cardsGrid.appendChild(cardElement);
    });
}

// =============================
// MODAL SYSTEM
// =============================

function setupModal() {
    const modal = document.getElementById("cardModal");

    document.querySelector(".close").onclick = closeModal;

    document.getElementById("tradeBtn").onclick = showTradeForm;
    document.getElementById("buyBtn").onclick = showBuyForm;

    document.getElementById("tradeSubmit").onclick = submitTrade;
    document.getElementById("buySubmit").onclick = submitBuy;

    window.onclick = function (event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}

function openModal(card) {
    document.getElementById("modalCardImage").src = card.image;
    document.getElementById("modalCardTitle").textContent =
        `${card.title} (${card.set})`;

    document.getElementById("tradeForm").classList.add("hidden");
    document.getElementById("buyForm").classList.add("hidden");

    document.getElementById("tradeInput").value = "";
    document.getElementById("buyInput").value = "";

    document.getElementById("cardModal").style.display = "block";
}

function closeModal() {
    document.getElementById("cardModal").style.display = "none";
}

function showTradeForm() {
    document.getElementById("tradeForm").classList.remove("hidden");
    document.getElementById("buyForm").classList.add("hidden");
}

function showBuyForm() {
    document.getElementById("buyForm").classList.remove("hidden");
    document.getElementById("tradeForm").classList.add("hidden");
}

// =============================
// TRADE REQUESTS
// =============================

function submitTrade() {
    const tradeText = document.getElementById("tradeInput").value;

    if (!tradeText.trim()) {
        alert("Please enter your trade cards");
        return;
    }

    const trades =
        JSON.parse(localStorage.getItem("tradeRequests")) || [];

    trades.push({
        message: tradeText,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("tradeRequests", JSON.stringify(trades));

    alert("Trade request submitted!");
    closeModal();
}

// =============================
// BUY REQUESTS
// =============================

function submitBuy() {
    const price = document.getElementById("buyInput").value;

    if (!price || price <= 0) {
        alert("Enter a valid price");
        return;
    }

    const buys =
        JSON.parse(localStorage.getItem("buyRequests")) || [];

    buys.push({
        amount: "$" + price,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("buyRequests", JSON.stringify(buys));

    alert("Buy offer submitted!");
    closeModal();
}

// =============================
// SCHEDULE FORM
// =============================

function setupScheduleForm() {
    const form = document.getElementById("scheduleForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        alert("Meeting Scheduled!");
        form.reset();
    });
}

// =============================
// ADMIN PANEL
// =============================

function setupAdmin() {
    const loginBtn = document.getElementById("adminLoginBtn");

    loginBtn.addEventListener("click", () => {
        const password =
            document.getElementById("adminPassword").value;

        if (password === "974955isverycool21") {
            document.getElementById("adminPanel")
                .classList.remove("hidden");

            loadRequests();

            alert("Access Granted");
        } else {
            alert("Incorrect Password");
        }
    });
}

// =============================
// LOAD REQUESTS (ADMIN VIEW)
// =============================

function loadRequests() {
    const requestsList =
        document.getElementById("requestsList");

    if (!requestsList) return;

    const trades =
        JSON.parse(localStorage.getItem("tradeRequests")) || [];

    const buys =
        JSON.parse(localStorage.getItem("buyRequests")) || [];

    requestsList.innerHTML = "";

    trades.forEach(trade => {
        const div = document.createElement("div");
        div.className = "request-card";

        div.innerHTML = `
            <h3>Trade Request</h3>
            <p>${trade.message}</p>
            <small>${trade.date}</small>
        `;

        requestsList.appendChild(div);
    });

    buys.forEach(buy => {
        const div = document.createElement("div");
        div.className = "request-card";

        div.innerHTML = `
            <h3>Buy Offer</h3>
            <p>${buy.amount}</p>
            <small>${buy.date}</small>
        `;

        requestsList.appendChild(div);
    });
}
