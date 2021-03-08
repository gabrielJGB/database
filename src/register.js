var firebaseConfig = {
    apiKey: "AIzaSyDpUYKvKVg2fBtYq61EQkB8LdBH2FI20ds",
    authDomain: "tasks-87613.firebaseapp.com",
    projectId: "tasks-87613",
    storageBucket: "tasks-87613.appspot.com",
    messagingSenderId: "1072213866706",
    appId: "1:1072213866706:web:136fee3824c23e52b1550b"
};

firebase.initializeApp(firebaseConfig);

const registerButton = document.querySelector('.register-button');
registerButton.addEventListener('click', registerUser);

function registerUser() {

    const emailInput = document.querySelector('#email-input');
    const passwordInput = document.querySelector('#password-input');

    firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then((user) => {

            const container = document.querySelector('.container');
            container.innerHTML = `
                <div class="registered-message">Usuario registrado</div>
                <button class="main-button register-button">Ir a la página principal</button>`;
            document.querySelector('.main-button').addEventListener('click', () => {
                window.location.href = "./main.html";
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            console.log(errorCode);
            if (errorCode === 'auth/invalid-email') {
                emailInput.style.border = "solid 2px red";
            }
            else {
                emailInput.style.border = '';
            }
            if (errorCode === 'auth/weak-password') {
                passwordInput.style.border = "solid 2px red";
            }
            else {
                passwordInput.style.border = '';
            }
        });
}


