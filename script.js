let words = document.querySelectorAll(".word");
words.forEach((word)=>{
    let letters = word.textContent.split("");
    word.textContent="";
    letters.forEach((letter)=>{
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span); 
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length -1;
words[currentWordIndex].style.opacity = "1";

let changeText = ()=>{
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0]: words[currentWordIndex + 1]; 

    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className = "letter out"; 
        },i * 80);
    });
    nextWord.style.opacity="1"; 
    Array.from(nextWord.children).forEach((letter,i)=>{
        letter.className = "letter behind"; 
        setTimeout(()=>{
            letter.className = "letter in"; 
        },340 + i * 80);
    })
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText,3000);

// ===== FILTRAGE DU PORTFOLIO AVEC ANIMATIONS AMÉLIORÉES =====
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filler-buttons .button');
    const portfolioItems = document.querySelectorAll('.port-box');
    const gallery = document.querySelector('.portfolio-gallery');
    
    // Vérifier si les images existent
    checkImages();
    
    // Ajouter une classe d'animation initiale
    portfolioItems.forEach(item => {
        item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Fonction de filtrage avec animations
    function filterPortfolio(filterValue) {
        let visibleCount = 0;
        
        // Animation de sortie pour les éléments cachés
        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                // Afficher tous les éléments avec animation
                if (item.style.display === 'none' || item.style.display === '') {
                    item.style.display = 'block';
                    item.style.animation = 'slideInUp 0.6s ease forwards';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                    visibleCount++;
                } else {
                    visibleCount++;
                }
            } else {
                if (item.classList.contains(filterValue)) {
                    // Afficher les éléments correspondants avec animation
                    if (item.style.display === 'none' || item.style.display === '') {
                        item.style.display = 'block';
                        item.style.animation = 'slideInUp 0.6s ease forwards';
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 50);
                    }
                    visibleCount++;
                } else {
                    // Cacher les autres avec animation de sortie
                    if (item.style.display !== 'none') {
                        item.style.animation = 'slideOutDown 0.5s ease forwards';
                        setTimeout(() => {
                            item.style.display = 'none';
                            item.style.animation = '';
                        }, 450);
                    }
                }
            }
        });
        
        // Animation du compteur
        showFilterCount(visibleCount);
        
        // Ajouter un effet de pulse sur la grille
        if (gallery) {
            gallery.style.animation = 'gridPulse 0.8s ease';
            setTimeout(() => {
                gallery.style.animation = '';
            }, 800);
        }
    }
    
    // Fonction pour vérifier les images
    function checkImages() {
        const images = document.querySelectorAll('.port-image img');
        images.forEach(img => {
            // Si l'image ne charge pas, afficher une image par défaut
            img.onerror = function() {
                this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2334495e"/><text x="50" y="50" font-size="14" text-anchor="middle" alignment-baseline="middle" fill="%23e67e22">Image non trouvée</text></svg>';
                console.log('Image non trouvée:', this.alt);
            };
        });
    }
    
    // Fonction pour afficher le nombre d'éléments trouvés
    function showFilterCount(count) {
        // Créer ou mettre à jour un compteur
        let counter = document.querySelector('.filter-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'filter-counter';
            const buttonsContainer = document.querySelector('.filler-buttons');
            if (buttonsContainer) {
                buttonsContainer.appendChild(counter);
            }
        }
        
        counter.style.animation = 'fadeInUp 0.4s ease';
        counter.textContent = count + ' projet' + (count > 1 ? 's' : '') + ' trouvé' + (count > 1 ? 's' : '');
        
        setTimeout(() => {
            counter.style.animation = '';
        }, 400);
    }
    
    // Ajout des événements aux boutons avec animations
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Animation du bouton cliqué
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => {
                btn.classList.remove('active-filter');
            });
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active-filter');
            
            // Récupérer la valeur du filtre
            const filterValue = this.getAttribute('data-filter');
            
            // Appliquer le filtre avec délai pour meilleure animation
            setTimeout(() => {
                filterPortfolio(filterValue);
            }, 100);
        });
    });
    
    // Initialisation : afficher tous les éléments avec animation
    setTimeout(() => {
        portfolioItems.forEach((item, index) => {
            item.style.display = 'block';
            item.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
        });
        showFilterCount(portfolioItems.length);
    }, 500);
});

// Ajouter les nouvelles animations CSS via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes slideOutDown {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
        }
    }
    
    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes gridPulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
            filter: brightness(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes buttonPop {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .filter-counter {
        text-align: center;
        margin-top: 15px;
        font-size: 0.9rem;
        color: var(--hover-color-3);
        font-weight: 500;
        padding: 8px 16px;
        background: var(--secon-bg-color);
        border-radius: 30px;
        display: inline-block;
        animation: fadeInUp 0.5s ease;
        border: 1px solid var(--hover-color-2);
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    
    .filler-buttons .button.active-filter {
        background: var(--hover-color-3);
        color: var(--bg-color);
        border-color: var(--hover-color-3);
        animation: buttonPop 0.5s ease;
        box-shadow: 0 5px 15px rgba(230,126,34,0.3);
    }
    
    .port-box {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: center;
        opacity: 1;
    }
    
    .port-box:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px rgba(230,126,34,0.3);
    }
    
    /* Style pour les images non trouvées */
    .port-image img[src*="svg"] {
        object-fit: contain;
        padding: 20px;
    }
`;

document.head.appendChild(style);

// active menu //
let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');

function activeMenu(){
    let len = section.length; 
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove("active"));
    if(menuLi[len]) {
        menuLi[len].classList.add("active");
    }
}

activeMenu();
window.addEventListener("scroll",activeMenu);

// sticky navbar //
const header = document.querySelector("header");
window.addEventListener("scroll",function(){
    header.classList.toggle("sticky", window.scrollY > 50)
});

// toggle icon navbar //
let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

if (menuIcon) {
    menuIcon.onclick = ()=>{
        menuIcon.classList.toggle("bx-x");
        navlist.classList.toggle("open");
    };
}

window.onscroll = ()=>{
    if (menuIcon) {
        menuIcon.classList.remove("bx-x");
        navlist.classList.remove("open");
    }
};

// animations au scroll améliorées //
const observer = new IntersectionObserver((entries)=>(
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show-items");
            
            // Animation spéciale pour les barres de progression
            if(entry.target.classList.contains('skills-table-container')) {
                setTimeout(() => {
                    const progressBars = document.querySelectorAll('.progress-bar-fill');
                    progressBars.forEach((bar, index) => {
                        setTimeout(() => {
                            const width = bar.style.width;
                            bar.style.width = '0%';
                            setTimeout(() => {
                                bar.style.width = width;
                            }, 100);
                        }, index * 100);
                    });
                }, 500);
            }
            
            // Animation pour les cartes de portfolio
            if(entry.target.classList.contains('portfolio-gallery')) {
                const items = entry.target.querySelectorAll('.port-box');
                items.forEach((item, index) => {
                    item.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
                });
            }
        }
    })
), { threshold: 0.1 });

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el)=>observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el)=>observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el)=>observer.observe(el));

// Observer spécial pour le portfolio
const portfolioGallery = document.querySelector('.portfolio-gallery');
if (portfolioGallery) {
    observer.observe(portfolioGallery);
}

// ===== MODE JOUR / NUIT =====
const themeIcon = document.getElementById('theme-icon-nav');
const root = document.documentElement;

// Vérifier le thème sauvegardé
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    root.classList.add('light-mode');
    if (themeIcon) {
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
    }
}

// Fonction pour basculer le thème avec animation
if (themeIcon) {
    themeIcon.addEventListener('click', function() {
        root.classList.toggle('light-mode');
        
        // Animation de transition
        document.body.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Changer l'icône
        if (root.classList.contains('light-mode')) {
            themeIcon.classList.remove('bx-moon');
            themeIcon.classList.add('bx-sun');
            localStorage.setItem('theme', 'light');
            
            // Animation de rotation
            themeIcon.style.transform = 'rotate(360deg)';
        } else {
            themeIcon.classList.remove('bx-sun');
            themeIcon.classList.add('bx-moon');
            localStorage.setItem('theme', 'dark');
            
            // Animation de rotation
            themeIcon.style.transform = 'rotate(-360deg)';
        }
        
        setTimeout(() => {
            themeIcon.style.transform = 'rotate(0deg)';
            document.body.style.transition = '';
        }, 800);
    });
}

// Animation au chargement de la page
window.addEventListener('load', function() {
    // Animation des barres de progression
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        }, index * 150);
    });
    
    // Animation du logo
    const logo = document.querySelector('.logo span');
    if (logo) {
        setInterval(() => {
            logo.style.transform = 'scale(1.2)';
            setTimeout(() => {
                logo.style.transform = 'scale(1)';
            }, 300);
        }, 3000);
    }
    
    // Animation d'entrée pour les cartes du portfolio
    const portfolioItems = document.querySelectorAll('.port-box');
    portfolioItems.forEach((item, index) => {
        item.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
    });
    
    // Vérifier à nouveau les images
    checkImages();
});

// Effet de survol amélioré sur les cartes de services
const serviceBoxes = document.querySelectorAll('.service-box');
serviceBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.animation = 'iconRotate 0.8s ease';
    });
    
    box.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.animation = 'iconRotate 4s infinite';
    });
});

// Animation douce pour le header
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 200 && scrollTop > lastScrollTop) {
        // Scroll down - cacher le header avec animation
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
        // Scroll up - montrer le header
        header.style.transform = 'translateY(0)';
    }
    
    if (scrollTop <= 200) {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Animation des info-box au survol
const infoItems = document.querySelectorAll('.info-item');
infoItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        icon.style.animation = 'iconRotate 0.8s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('i');
        icon.style.animation = 'iconRotate 4s infinite';
    });
});

// Effet de particules au clic (optionnel)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const btn = e.target.closest('.btn');
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.3)';
        ripple.style.transition = 'width 0.5s, height 0.5s';
        ripple.style.pointerEvents = 'none';
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.width = '300px';
            ripple.style.height = '300px';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 500);
    }
});

// Animation des pourcentages dans la section compétences
const percentageValues = document.querySelectorAll('.percentage-value');
percentageValues.forEach(value => {
    const text = value.textContent;
    const number = parseInt(text);
    
    // Animation au survol
    value.addEventListener('mouseenter', function() {
        let count = 0;
        const interval = setInterval(() => {
            if (count <= number) {
                this.textContent = count + '%';
                count++;
            } else {
                clearInterval(interval);
            }
        }, 20);
    });
    
    value.addEventListener('mouseleave', function() {
        this.textContent = number + '%';
    });
});

// Fonction pour vérifier les images
function checkImages() {
    const images = document.querySelectorAll('.port-image img');
    images.forEach(img => {
        img.onerror = function() {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2334495e"/><text x="50" y="50" font-size="14" text-anchor="middle" alignment-baseline="middle" fill="%23e67e22">Image non trouvée</text></svg>';
            console.log('Image non trouvée:', this.alt);
        };
    });
}