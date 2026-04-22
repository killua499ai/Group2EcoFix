document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // 1. Interactive Calculator Logic
    const transportSelect = document.getElementById('calc-transport');
    const calcResult = document.getElementById('calc-result');

    if (transportSelect) {
        transportSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            // Animation for counter
            let start = 0;
            const end = parseFloat(val);
            const duration = 500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentVal = (progress * (end - start) + start).toFixed(1);
                calcResult.innerHTML = `${currentVal}<span class="text-lg ml-2">Tons</span>`;
                if (progress < 1) requestAnimationFrame(updateCounter);
            }
            requestAnimationFrame(updateCounter);
        });
    }

    // 2. Navigation Highlighting & Nav Background
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const nav = document.getElementById('main-nav');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            if (pageYOffset >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        if (window.scrollY > 100) {
            nav.classList.add('py-2');
        } else {
            nav.classList.remove('py-2');
        }
    });

    // 3. Observer for Fade-up Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // 4. Enhanced Quiz (Based on PDF Data)
    const quizData = [
        { q: "Since what year have humans been the main driver of climate change?", opts: ["1600s", "1750s", "1800s", "1950s"], answer: 2 },
        { q: "The Philippines is particularly vulnerable as a...?", opts: ["Island Oasis", "Developing country", "Industrial hub", "Tundra region"], answer: 1 },
        { q: "What percentage of deforestation is mining responsible for?", opts: ["3%", "7%", "15%", "22%"], answer: 1 },
        { q: "Which gas is trapped in coal seams and released during mining?", opts: ["Oxygen", "Carbon", "Methane", "Argon"], answer: 2 }
    ];

    let quizAnswered = new Array(quizData.length).fill(null);
    const quizContainer = document.getElementById('quiz-container');

    function buildQuiz() {
        if (!quizContainer) return;
        quizData.forEach((q, qi) => {
            const div = document.createElement('div');
            div.className = 'bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm fade-up';
            div.innerHTML = `
                <div class="flex gap-4 mb-6">
                    <span class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm italic">${qi+1}</span>
                    <p class="font-bold text-slate-800 text-lg">${q.q}</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" id="q${qi}-opts"></div>
            `;
            quizContainer.appendChild(div);

            q.opts.forEach((o, oi) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-opt text-left px-6 py-4 rounded-2xl font-semibold text-slate-500 border-2 border-slate-50';
                btn.textContent = o;
                btn.onclick = () => {
                    if (quizAnswered[qi] !== null) return;
                    quizAnswered[qi] = oi;
                    const btns = div.querySelectorAll('button');
                    btns.forEach((b, i) => {
                        if (i === q.answer) b.classList.add('correct');
                        else if (i === oi) b.classList.add('wrong');
                    });
                    if (quizAnswered.every(a => a !== null)) showResults();
                };
                div.querySelector(`#q${qi}-opts`).appendChild(btn);
            });
            observer.observe(div);
        });
    }

    function showResults() {
        const score = quizAnswered.filter((a, i) => a === quizData[i].answer).length;
        document.getElementById('quiz-score').textContent = `${score} / ${quizData.length}`;
        document.getElementById('quiz-result').classList.remove('hidden');
        document.getElementById('quiz-result').scrollIntoView({ behavior: 'smooth' });
    }

    buildQuiz();
});












// 5. POPUP MODAL LOGIC
const modal = document.getElementById('infoModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalImg = document.getElementById('modalImg');
const closeModal = document.getElementById('closeModal');

document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('click', () => {
        modalTitle.textContent = card.dataset.title;
        modalDesc.textContent = card.dataset.desc;
        modalImg.src = card.dataset.img;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
});

// close when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
});









