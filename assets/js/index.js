
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

    console.log('First Login Invoked..');

    // calling function to handle first time login:
    handleFirstTimeLogin();

    // setting first time login as true.
    disk.store('herSweetKissLogin', true);
}




// * Below are classes and function that are called above.

// function to handle first time login
const handleFirstTimeLogin = () => {

    // login initializer section element.
    const loginInitializerSection = document.getElementById('login-inititializer');
    // login initializer div 
    const loginInitializerDiv = document.getElementById('login-initializer-input');
    // username and location input
    const usernameInput = document.getElementById('login-username-input');
    const locationInput = document.getElementById('login-location-input');
    // continue button
    const continueButton = document.getElementById('login-continue-btn');
}