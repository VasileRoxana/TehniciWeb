const list = document.getElementById('list');
const formName = document.getElementById('formName');
const formUrl = document.getElementById('formUrl');
const addButton = document.getElementById('addButton');
let updateButton = document.getElementById('updateButton');

// fetch the banc list
function getBanc() {
    fetch('http://localhost:3000/banc')
        .then(function (response) {
            // Trasform server response to get the banc
            response.json().then(function (banc) {
                appendBancToDOM(banc);
            });
        });
};

// post banc
function postBanc() {
    // creat post object
    const postObject = {
        name: formName.value,
        img: formUrl.value
    }
    // post banc
    fetch('http://localhost:3000/banc', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
        // Get the new banc list
        getBanc();
        // Reset Form
        resetForm();
    });
}

// delete banc
function deleteBanc(id) {
    // delete banc
    fetch(`http://localhost:3000/banc/${id}`, {
        method: 'DELETE',
    }).then(function () {
        // Get the new banc list
        getBanc();
    });
}

// update banc
function updateBanc(id) {
    // creat put object
    const putObject = {
        name: formName.value,
        img: formUrl.value
    }
    // update banc
    fetch(`http://localhost:3000/banc/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    }).then(function () {
        // Get the new banc list
        getBanc();

        // change button event from update to add
        addButton.disabled = false;

        // remove all event from update button
        clearUpdateButtonEvents();

        // Reset Form
        resetForm();
    });
}

// copy edited banc information to form and add event listener on update button
function editBanc(banc) {
    // copy banc information to form
    formName.value = banc.name;
    formUrl.value = banc.img;
    
    // disable add button
    addButton.disabled = true;

    // clear all events update button events
    clearUpdateButtonEvents();

    // enable and add event on update button
    updateButton.disabled = false;
    updateButton.addEventListener('click', function () {
        updateBanc(banc.id)
    });

}

// Create and append img and name DOM tags
function appendBancToDOM(banc) {
    // remove banc list if exist
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    // create and append tags
    for (let i = 0; i < banc.length; i++) {
        // create image obj
        let img = document.createElement('img');
        img.src = banc[i].img;
        // create name obj
        let name = document.createElement('span');
        name.innerText = banc[i].name;

        // create button and event for edit and delete
        let editButton = document.createElement('button')
        // add event on btn and pass banc id more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
        editButton.addEventListener('click', function () {
            editBanc(banc[i])
        });
        editButton.innerText = 'Edit';
        let deleteButton = document.createElement('button')
        // add event on btn and pass banc object more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
        deleteButton.addEventListener('click', function () {
            deleteBanc(banc[i].id)
        });
        deleteButton.innerText = 'Delete';
        // create a container for img and name
        let container = document.createElement('div');
        // append elements to container
        container.appendChild(img);
        container.appendChild(name);
        container.appendChild(editButton);
        container.appendChild(deleteButton);

        // append container to DOM (list div)
        list.appendChild(container);
    }
}

// reset form
function resetForm() {
    formName.value = '';
    formUrl.value = '';
}
//  remove Update Button to clear events more at https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
function clearUpdateButtonEvents() {
    let newUpdateButton = updateButton.cloneNode(true);
    updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
    updateButton = document.getElementById('updateButton');
}
// add event listener on add button
addButton.addEventListener('click', postBanc);

// get banc
getBanc();