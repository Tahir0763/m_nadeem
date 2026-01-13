
// Portfolio Modal Logic
const modal = document.getElementById('portfolio-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('.portfolio-overlay h3').innerText;
        const desc = item.querySelector('.portfolio-overlay p').innerText;
        let imgSrc = item.querySelector('img') ? item.querySelector('img').src : null;

        // Specific logic for Keyword Research to show the detailed image
        if (title === "Keyword Research") {
            imgSrc = "assets/keyword-research-detail.png";
        } else if (!imgSrc) {
            // Fallback for items with icons
            return; // or show a default image
        }

        modal.style.display = "flex";
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        modalImg.src = imgSrc;
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
});
