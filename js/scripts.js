window.onload = function() {
    // Simula o carregamento da página com um atraso artificial
    setTimeout(function() {
        // Remove o overlay de carregamento
        document.getElementById('loading-overlay').style.display = 'none';

        // Inicia a animação de fade-in
        var content = document.getElementById('content');
        content.style.opacity = '1';
        content.style.visibility = 'visible';
        content.style.transition = 'opacity 1s ease-in-out';
        
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

