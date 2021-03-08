var firebaseConfig = {
    apiKey: "AIzaSyDpUYKvKVg2fBtYq61EQkB8LdBH2FI20ds",
    authDomain: "tasks-87613.firebaseapp.com",
    projectId: "tasks-87613",
    storageBucket: "tasks-87613.appspot.com",
    messagingSenderId: "1072213866706",
    appId: "1:1072213866706:web:136fee3824c23e52b1550b"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
document.querySelector('.log-out').addEventListener('click', logOut);
let editing = true;
let firstName = '';
let lastName = '';
let id = '';
let currentUser = '';

checkUserState();


function checkUserState() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const username = document.querySelector('.user');
            username.textContent = user.email;
            currentUser = user.email;
            getTableData();
        }
        else {
            window.location.href = "./index.html";
        }
    });
}

function getTableData() {

    db.collection(currentUser).onSnapshot((querySnapshot) => {
        const tableContent = document.querySelector('.table-content');
        tableContent.innerHTML = '';
        
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                tableContent.innerHTML += `
            <tr data-id=${doc.id}>
                <td class="first"><input class="input-data" type="text" value="${doc.data().first}" disabled></td>
                <td class="last"><input class="input-data" type="text" value="${doc.data().last}" disabled></td>
                <td> <button class="edit-button">Editar</button> </td>
                <td> <button class="delete-button">Borrar</button> </td>
            </tr>
        `
            });
        }else{
            tableContent.style.color = "white";
            tableContent.innerHTML = 'Sin datos';
        }

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach((button) => {
            button.addEventListener('click', deleteRow);
        });

        const editButtons = document.querySelectorAll('.edit-button');
        editButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                let inputFirst = e.target.parentElement.parentElement.children[0];
                let inputLast = e.target.parentElement.parentElement.children[1];

                if (editing) {
                    firstName = e.target.parentElement.parentElement.children[0].children[0];
                    lastName = e.target.parentElement.parentElement.children[1].children[0];
                    id = e.target.parentElement.parentElement.attributes[0].value;
                    firstName.focus();
                    e.target.textContent = "Guardar";
                    e.target.style['background-color'] = "rgb(0,150,136)";
                    inputFirst.style['background-color'] = "rgb(165,253,170)";
                    inputLast.style['background-color'] = "rgb(165,253,170)";
                    firstName.disabled = false;
                    lastName.disabled = false;
                    editing = false;
                    
                }
                else {
                    
                    inputFirst.style['background-color'] = "white";
                    inputLast.style['background-color'] = "white";
                    e.target.textContent = "Editar";
                    e.target.style['background-color'] = "rgb(27, 140, 253)";
                    editRow(firstName, lastName, id);
                    firstName.disabled = true;
                    lastName.disabled = true;
                    editing = true;
                }

            });
        });
    });
}

const addButton = document.querySelector('.add-button')
addButton.addEventListener('click', () => {
    const first = document.querySelector('#first-input');
    const last = document.querySelector('#last-input');
    saveRow(first, last);
});


function editRow(firstName, lastName, id) {

    var row = db.collection(currentUser).doc(id);
    return row.update({
        first: firstName.value,
        last: lastName.value
    })
        .then(() => {
            console.log("Edit ok")
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
}

function saveRow(firstName, lastName) {

    if (firstName.value === '' || lastName.value === '') {
        alert("Complete los campos");
        return;
    }
    else {
        db.collection(currentUser).add({
            first: firstName.value,
            last: lastName.value
        }).then((docRef) => {
            firstName.value = '';
            lastName.value = '';
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
}

function deleteRow() {
    if (confirm("Confirmar borrado")) {
        let id = this.parentElement.parentElement.attributes[0].value;
        db.collection(currentUser).doc(id).delete().then(() => {
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
    else {
        return;
    }
}


function logOut() {
    firebase.auth().signOut().then(() => {
        console.log("deslogeado");
        window.location.href = "./index.html";

    }).catch((error) => {
        console.log(error)
    })
}

