window.onload = function() {
    const h1Element = document.querySelector('.profile h1');
    const text = "> Andrei Costa";
    // Simula o carregamento da página com um atraso artificial
    setTimeout(function() {
        // Remove o overlay de carregamento
        document.getElementById('loading-overlay').style.display = 'none';

        // Inicia a animação de fade-in
        var content = document.getElementById('content');
        content.style.opacity = '1';
        content.style.visibility = 'visible';
        content.style.transition = 'opacity 1s ease-in-out';
        typeWriter(h1Element, text, 100);
        startTypingAnimations();
        
    }, 2000); // Atraso de 2 segundos
};

function sendEmail() {
    const email = 'blendsteal@gmail.com'; // Substitua pelo seu endereço de e-mail
    const subject = 'Hire Me Request';
    const body = 'Hello, I would like to hire you.';

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
}

function downloadResume() {
    window.location.href = '/files/curriculo.pdf';
}

function typeWriter(element, text, delay = 100) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, delay);
        } else {
            // Adiciona uma classe que ativará o cursor piscando
            element.classList.add('blinking-cursor');
        }
    }
    element.innerHTML = ""; // Limpa o texto antes de começar a digitação
    type();
}

function startTypingAnimations() {
    const animations = [
        { selector: '#about h2', text: '> About', delay: 100 },
        { selector: '#projects h2', text: 'Featured Projects', delay: 100 },
        { selector: '#resume h2', text: 'Resume', delay: 100 },
        { selector: '#contact h2', text: 'Contact', delay: 100 },
    ];

    animations.forEach((anim, index) => {
        const element = document.querySelector(anim.selector);
        if (element) {
            setTimeout(() => {
                typeWriter(element, anim.text, anim.delay);
            }, 1000 * index); // Atraso para iniciar cada animação em sequência
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1); // Obtém o ID da seção
            const targetElement = document.getElementById(targetId);
            const startPosition = window.pageYOffset; // Posição atual da rolagem
            const targetPosition = targetElement.offsetTop; // Posição do alvo
            const distance = targetPosition - startPosition; // Distância total a rolar
            const duration = 1750; // Duração da rolagem em milissegundos
            let startTime = null;

            function scrollAnimation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1); // Calcula o progresso da rolagem
                const ease = easeInOutQuad(progress); // Função de easing para suavizar a rolagem
                window.scrollTo(0, startPosition + (distance * ease));
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(scrollAnimation);
                }
            }

            function easeInOutQuad(t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            }

            requestAnimationFrame(scrollAnimation);
        });
    });
});
