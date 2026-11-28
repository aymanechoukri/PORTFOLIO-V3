export function validationForm(name, email, message) {
    const nameRegex = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const messageRegex = /^(?=.*\S)[\s\S]{10,1000}$/;

    let isValid = true;

    if (!nameRegex.test(name.trim())) {
        isValid = false;
    }

    if (!emailRegex.test(email.trim())) {
        isValid = false;
    }

    if (!messageRegex.test(message.trim())) {
        isValid = false;
    }

    return isValid;
}