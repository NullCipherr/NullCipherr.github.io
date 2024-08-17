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