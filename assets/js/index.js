

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

// function to enable draggability
const enableDraggability = (elementsList) => {

    elementsList.forEach( val => {
        
        element.draggable(val);
    });
}

// function to enable settings
const enableSettings = (sectionsList) => {

    // the settings section
    const settings = document.getElementById('settings');

    // settings inner sections
    const settingsHome = document.getElementById('settings-home');
    const homeSettings = document.getElementById('home-settings');
    const settingList = [homeSettings];

    // removing hidden class from settings section
    settings.classList.remove('hidden');

    // function to handle left arrow click
    handleLeftArrow = () => {

        // removing all settings elements
        settingList.forEach(val => val.classList.add('hidden'));
        // making all theme elements visible
        sectionsList.forEach(val => val.classList.remove('hidden'));

        settingsHome.classList.remove('hidden');
    }

    // function to handle home settings 
    const handleHomeSettings = () => {

        // the home section
        const homeSection = document.getElementById('home');

        // iterating through all the sections and hiding them except for the home section
        sectionsList.forEach(val => {

            if (val == homeSection) {} else {

                val.classList.add(hidden);
            }
        });

        // hiding the settings home page
        settingsHome.classList.add('hidden');

        // showing home settings
        homeSettings.classList.remove('hidden');
    }

    // calling handleLeftArrow when left arrow is clicked
    document.getElementById('left-arrow').addEventListener('click', event => {

        handleLeftArrow();
    });

    // calling handleHomeSettings() when home section settings is invoked
    document.getElementById('home-section-settings').addEventListener('click', event => {

        handleHomeSettings();
    });
}

// function to close settings section
const closeSettings = () => {

    // the settings section
    const settings = document.getElementById('settings');

    // adding the hidden class to it
    settings.classList.add('hidden');

    // showing the settings home
    document.getElementById('settings-home').classList.remove('hidden');

    // hiding all other sections
    document.getElementById('home-settings').classList.add('hidden');
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

// creating list of elements
const elementsList = createArrayListElements();

// making elements draggable
enableDraggability(elementsList);

// enabling settings action 
document.getElementById('personal-settings').addEventListener('click', (event) => {

    enableSettings(elementsList);
});

// enabling the settings close button
document.getElementById('settings-close').addEventListener('click', event => {

    closeSettings();
});