const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');

form.addEventListener('submit', e => {
    e.preventDefault();

    var val = validateInputs();
    if (val === true)
    throwAlert("Registered Successfully!");
    else 
    throwAlert("Error ! Please check your inputs")
});

function throwAlert(str) {
    alert(str);
}

function resetError(element){
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.remove('error');
}

function setError (element, message){
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validDigit(string) {
    for (let i = 0; i < string.length; i++) {
       var ascii = string.charCodeAt(i);
       if (ascii < 48 || ascii > 57) {
          return false;
       }
    }
    return true;
 }

const validateInputs = () => {
    var res = true;
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const passwordValue = password.value.trim();
    const confirmValue = confirm.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
        res = false;
    } 
    else if(usernameValue.length < 5) {
        setError(username, 'Username should have at least 5 characters');
        res = false;
    }  else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
        res = false;
    } else if (!emailValue.includes('@')) {
        setError(email, 'Email Id should have @ in it');
        res = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        res = false;
    } else {
        setSuccess(email);
    }

    

    if (phoneValue === '123456789'){
        setError(phone,'Phone Number cannot be 123456789');
        res = false;
    } else if (phoneValue.length !== 10) {
        setError(phone, 'Phone Number must be a 10-digit number');
        res = false;
    } else if (validDigit(phoneValue) === false) {
        setError(phone, 'Phone Number must contain only digits');
        res = false;
    } else {
        setSuccess(phone);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
        res = false;
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
        res = false;
    } else if (passwordValue === usernameValue) {
        setError(password, 'Password cannot be same as username')
        res = false;
    } else if (passwordValue === 'password') {
        setError(password, 'Password cannot be "password"')
        res = false;
    } else {
        setSuccess(password);
    }

    if(confirmValue === '') {
        setError(confirm, 'Please confirm your password');
        res = false;
    } else if (confirmValue !== passwordValue) {
        setError(confirm, "Passwords doesn't match");
        res = false;
    } else {
        setSuccess(confirm);
    }
    return res;

};
