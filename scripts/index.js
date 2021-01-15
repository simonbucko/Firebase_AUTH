const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUi = (user) => {
    if (user) {
        if (user.admin) {
            adminItems.forEach(item => item.style.display = 'block');
        }
        //account info
        db.collection('users').doc(user.uid).get()
            .then(doc => {
                const html = `
                    <div> Logged in as ${user.email} </div>
                    <div> ${doc.data().bio} </div>
                    <div class="pink-text"> ${user.admin ? 'Admin' : ''} </div>
                `;
                accountDetails.innerHTML = html;
            })

        //toggle ui elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        //hide account info
        const html = `
            
        `;
        accountDetails.innerHTML = html;
        //toggle ui elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');

        adminItems.forEach(item => item.style.display = 'none');
    }

}

//setup guides
const setUpGuides = (data) => {

    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            const li = `
        <li>
            <div class="collapsible-header grey lighten-4">${guide.title}</div>
            <div class="collapsible-body white">${guide.content}</div>
        </li>
        `;
            html += li;
        });
        guideList.innerHTML = html;
    } else {
        guideList.innerHTML = `<h5 class="center-align">Log in to view guides</h5>`;
    }

}


document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});