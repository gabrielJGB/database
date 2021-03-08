var firebaseConfig = {
    apiKey: "AIzaSyDpUYKvKVg2fBtYq61EQkB8LdBH2FI20ds",
    authDomain: "tasks-87613.firebaseapp.com",
    projectId: "tasks-87613",
    storageBucket: "tasks-87613.appspot.com",
    messagingSenderId: "1072213866706",
    appId: "1:1072213866706:web:136fee3824c23e52b1550b"
};

firebase.initializeApp(firebaseConfig);

const logInButton = document.querySelector('.log-in');
logInButton.addEventListener('click',showLogInForm);

function showLogInForm(){
    const accessForm = document.querySelector('.access-form');
    const closeButton = document.querySelector('.close-button');
    
    accessForm.style.top = "12vh";
    closeButton.addEventListener('click',()=>{
        accessForm.style.top = "-100vh";
    });
}

const accessButton = document.querySelector('.access-button');
accessButton.addEventListener('click', accessUser);

function accessUser(e) {
    e.preventDefault();
    const emailInput = document.querySelector('#email-input').value;
    const passwordInput = document.querySelector('#password-input').value;

    firebase.auth().signInWithEmailAndPassword(emailInput, passwordInput)
        .then((user) => {
            console.log("logged");
            window.location.href = "./main.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });

}

function userState() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location.href = "./main.html";
        }
    });
}

userState();

