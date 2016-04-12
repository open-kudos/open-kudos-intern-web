function ltButton () {
    document.getElementById('ltButton').className = 'btn btn-sm hidden';
    document.getElementById('enButton').className = 'btn btn-sm';
}
function enButton () {
    document.getElementById('enButton').className = 'btn btn-sm hidden';
    document.getElementById('ltButton').className = 'btn btn-sm';
}
function getCookie(name)
{
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

function validationLogin(){
    var email = document.getElementById('email');
    var pass = document.getElementById('password');
    if (email.value == '') {
        email.className = 'notValid';
    } else {
        email.className = 'valid';
    }

    if (pass.value == '') {
        pass.className = 'notValid';
    } else {
        pass.className = 'valid';
    }
}

function validationRegistration() {
    var name = document.getElementById('name');
    var surname = document.getElementById('surname');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');
    var nameError = document.getElementById('nameError');
    var surnameError = document.getElementById('surnameError');
    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');
    var confirmPasswordError = document.getElementById('confirmPasswordError');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (name.value == '') {
        nameError.innerHTML = 'Enter name';
        name.className = 'notValid';
    } else {
        nameError.innerHTML = '';
        name.className = 'valid';
    }
    if (surname.value == '') {
        surnameError.innerHTML = 'Enter surname';
        surname.className = 'notValid';
    } else {
        surnameError.innerHTML = '';
        surname.className = 'valid';
    }
    if (confirmPassword.value == '') {
        confirmPasswordError.innerHTML = 'Confirm password';
        confirmPassword.className = 'notValid';
    } else {
        confirmPasswordError.innerHTML = '';
        confirmPassword.className = 'valid';
    }
    if (email.value == '') {
        emailError.innerHTML = 'Enter email';
        email.className = 'notValid';
    } else if (!filter.test(email.value)) {
        emailError.innerHTML = 'Wrong email format';
        email.className = 'notValid';
    } else {
        emailError.innerHTML = '';
        email.className = 'valid';
    }
    if (password.value == '') {
        passwordError.innerHTML = 'Enter password';
        password.className = 'notValid';
    } else {
        passwordError.innerHTML = '';
        password.className = 'valid';
    }
}
