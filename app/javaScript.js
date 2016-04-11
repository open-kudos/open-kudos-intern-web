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

    if (name.value == '') {
        name.className = 'notValid';
    } else {
        name.className = 'valid';
    }
    if (surname.value == '') {
        surname.className = 'notValid';
    } else {
        surname.className = 'valid';
    }
    if (confirmPassword.value == '') {
        confirmPassword.className = 'notValid';
    } else {
        confirmPassword.className = 'valid';
    }
    if (email.value == '') {
        email.className = 'notValid';
    } else {
        email.className = 'valid';
    }
    if (password.value == '') {
        password.className = 'notValid';
    } else {
        password.className = 'valid';
    }
}
