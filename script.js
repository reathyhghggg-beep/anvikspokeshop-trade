const pokemonCards = [
    {id:1,title:"Eevee V (Eevee Stamp)",set:"SWSH065",image:"https://placehold.co/300x410?text=Eevee+V"},
    {id:2,title:"Lycanroc V",set:"081/203",image:"https://placehold.co/300x410?text=Lycanroc+V"},
    {id:3,title:"Lugia V",set:"SWSH301",image:"https://placehold.co/300x410?text=Lugia+V"},
    {id:4,title:"Sylveon V",set:"SWSH202",image:"https://placehold.co/300x410?text=Sylveon+V"},
    {id:5,title:"Pinsir",set:"168/167",image:"https://placehold.co/300x410?text=Pinsir"},
    {id:6,title:"Medicham EX",set:"054/102",image:"https://placehold.co/300x410?text=Medicham+EX"},
    {id:7,title:"Zapdos EX",set:"192/165",image:"https://placehold.co/300x410?text=Zapdos+EX"}
];

let filteredCards = [...pokemonCards];

document.addEventListener("DOMContentLoaded", () => {
    loadCards();
    setupModal();
    setupSearch();
    setupAdmin();
});

/* CARDS */
function loadCards(list = filteredCards) {
    const grid = document.getElementById("cardsGrid");
    grid.innerHTML = "";

    list.forEach(card => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <img src="${card.image}">
            <h3>${card.title}</h3>
            <p>${card.set}</p>
        `;

        div.onclick = () => openModal(card);
        grid.appendChild(div);
    });
}

/* SEARCH */
function setupSearch() {
    document.getElementById("searchBar").addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase();

        filteredCards = pokemonCards.filter(card =>
            card.title.toLowerCase().includes(value)
        );

        loadCards(filteredCards);
    });
}

/* MODAL */
function setupModal() {
    document.querySelector(".close").onclick = closeModal;

    document.getElementById("tradeBtn").onclick = () => {
        tradeForm.classList.remove("hidden");
        buyForm.classList.add("hidden");
    };

    document.getElementById("buyBtn").onclick = () => {
        buyForm.classList.remove("hidden");
        tradeForm.classList.add("hidden");
    };

    document.getElementById("tradeSubmit").onclick = submitTrade;
    document.getElementById("buySubmit").onclick = submitBuy;
}

function openModal(card) {
    document.getElementById("cardModal").style.display = "block";
    modalCardImage.src = card.image;
    modalCardTitle.innerText = card.title;
}

function closeModal() {
    document.getElementById("cardModal").style.display = "none";
}

/* TRADE */
function submitTrade() {
    const value = tradeInput.value;

    let data = JSON.parse(localStorage.getItem("trades") || "[]");
    data.push(value);

    localStorage.setItem("trades", JSON.stringify(data));

    alert("Trade submitted!");
}

/* BUY */
function submitBuy() {
    const value = buyInput.value;

    let data = JSON.parse(localStorage.getItem("buys") || "[]");
    data.push(value);

    localStorage.setItem("buys", JSON.stringify(data));

    alert("Offer submitted!");
}

/* ADMIN */
function setupAdmin() {
    adminLoginBtn.onclick = () => {
        if (adminPassword.value === "974955isverycool21") {
            adminPanel.classList.remove("hidden");

            const trades = JSON.parse(localStorage.getItem("trades") || "[]");
            const buys = JSON.parse(localStorage.getItem("buys") || "[]");

            requestsList.innerHTML = "";

            trades.forEach(t =>
                requestsList.innerHTML += `<div class="card">TRADE: ${t}</div>`
            );

            buys.forEach(b =>
                requestsList.innerHTML += `<div class="card">BUY: ${b}</div>`
            );
        } else {
            alert("Wrong password");
        }
    };
}
