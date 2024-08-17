window.onload = function() {
    const h1Element = document.querySelector('.profile h1');
    const text = " > Andrei Costa";
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
        }
    }
    element.innerHTML = ""; // Limpa o texto antes de começar a digitação
    type();
}
