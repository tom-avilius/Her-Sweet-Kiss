

// * Below are classes and function that are called above.

// function to handle first time login
const handleFirstTimeLogin = () => {

    // login initializer section element.
    const loginInitializerSection = document.getElementById('login-initializer');
    // username and location input
    const usernameInput = document.getElementById('login-username-input');
    const locationInput = document.getElementById('login-location-input');
    // continue button
    const continueButton = document.getElementById('login-continue-btn');

    // adding click event listener to the continue btn 
    continueButton.addEventListener('click', (event) => {

        // storing the city and username
        disk.store("username", usernameInput.value);
        disk.store("city", locationInput.value);

        // hiding the initializer section
        loginInitializerSection.classList.add('hidden');

        // setting first time login as true.
        disk.store('herSweetKissLogin', true);
    });
}

// function to create list of elements as array 
const createArrayListElements = () => {

    // array list
    const list = [

        // sections
         document.getElementById('home'),
    ];

    return list;
}



// ! It is adviced that all developers who create their own themes
// ! for the splash application create an entry into the disk using
// ! disk.store(); method to store first time run of their theme.
// ! This is done for two reasons:
// ! 1 => To know if it is the first time their theme is run to do the needful.
// ! 2 => To clear the existing disk storage of the previous theme so that everything works smoothly.
// ! Step 2 is IMPORTANT because some existing variables of the previous theme might cause issue in the new theme.

// Setting up the first time use:

// Checking if herSweetKissLogin exists or not
// disk.get would return null if the variable to searched does not exist
if (disk.get('herSweetKissLogin') == null) {

    // login initializer section element.
    const loginInitializerSection = document.getElementById('login-initializer');

    // showing the initializer section
    loginInitializerSection.classList.remove('hidden');

    console.log('First Login Invoked..');
    disk.clear();

    // calling function to handle first time login:
    handleFirstTimeLogin();
}

const elementsList = createArrayListElements();