const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});


// --- FILTERING ---
const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const category = btn.dataset.category;

    cards.forEach(card => {
      const match = category === "all" || card.dataset.category === category;
      card.style.display = match ? "block" : "none";
    });
  });
});

// --- MODAL ---
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");

cards.forEach(card => {
  card.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = card.querySelector("img").src;
    modalTitle.textContent = card.querySelector("h3").textContent;
    modalDesc.textContent = card.querySelector("p").textContent;
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});


/* -----------------------------------------
   SHOW LIMITED CARDS BASED ON SCREEN SIZE
   ----------------------------------------- */

// GET ALL CARDS
const projectCards = document.querySelectorAll(".project-card");

// GET BUTTON
const exploreBtn = document.getElementById("exploreBtn");

// HOW MANY CARDS TO SHOW FIRST?
let initialCards = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue("--initial-cards")
);

// FUNCTION → SHOW FIRST X CARDS
function showInitialCards() {
  projectCards.forEach((card, index) => {
    if (index < initialCards) {
      card.classList.add("show");
    } else {
      card.classList.remove("show");
    }
  });
}

showInitialCards();


// ===== BUTTON LOGIC =====
exploreBtn.addEventListener("click", () => {
  const expanded = exploreBtn.textContent === "Show Less";

  if (expanded) {
    // SHOW ONLY FIRST X CARDS AGAIN
    showInitialCards();
    exploreBtn.textContent = "Explore More";
  } else {
    // SHOW ALL CARDS
    projectCards.forEach(card => card.classList.add("show"));
    exploreBtn.textContent = "Show Less";
  }
});


// ===== RESIZE SUPPORT (RECALCULATES INITIAL CARDS) =====
window.addEventListener("resize", () => {
  initialCards = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--initial-cards")
  );

  if (exploreBtn.textContent !== "Show Less") {
    showInitialCards();
  }
});



