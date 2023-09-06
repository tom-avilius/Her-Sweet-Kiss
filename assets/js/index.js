
const colorPalleteInfo = {

    rosewater: "rgb(245, 224, 220)",

    flamingo: "rgb(242, 205, 205)",

    pink: "rgb(245, 194, 231)",

    muave: "rgb(203, 166, 247)",

    red: "rgb(243, 139, 168)",

    maroon: "rgb(235, 160, 172)",

    peach: "rgb(250, 179, 135)",

    yellow: "rgb(249, 226, 175)", 

    green: "rgb(166, 227, 161)",

    teal: "rgb(148, 226, 213)", 

    sky: "rgb(137, 220, 235)",

    sapphire: "rgb(116, 199, 236)",

    blue: "rgb(116, 199, 236)",
     
    lavendar: "rgb(180, 190, 254)", 

    text: "rgb(205, 214, 244)",

    subtext1: "rgb(186, 194, 222)",

    subtext0: "rgb(166, 173, 200)",

    overlay2: "rgb(147, 153, 178)",

    overlay1: "rgb(127, 132, 156)",

    overlay0: "rgb(108, 112, 134)",

    surface2: "rgb(88, 91, 112)", 

    surface1: "rgb(69, 71, 90)",

    surface0: "rgb(49, 50, 68)",

    base: "rgb(30, 30, 46)", 

    mantle: "rgb(24, 24, 37)", 

    crust: "rgb(17, 17, 27)", 
}

const dayInWords = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};


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
         document.getElementById('clock'),
    ];

    return list;
}

// function to enable draggability
const enableDraggability = (elementsList) => {

    elementsList.forEach( val => {
        
        element.draggable(val, val.id);
    });
}

// function to enable settings
const enableSettings = () => {

    // the settings section
    const settings = document.getElementById('settings');

    // removing hidden class from settings section
    settings.classList.remove('hidden');
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

    enableSettings();
});

// enabling the settings close button
document.getElementById('settings-close').addEventListener('click', event => {

    closeSettings();
});

// getting the time elements
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const day = document.getElementById('day');

// function to manage time
function setTime(date) {

    // setting hours
    var hour = date.getHours();
    if (hour<10) {
        hour = '0'+hour+':';
    } else {

        hour = hour+':';
    }
    if (hours.innerText != hour) {

        hours.innerText = hour+'';
    }

    // setting minutes
    var min = date.getMinutes();
    if (min<10) {

        min = '0'+min+'';
    }
    if (minutes.innerText != min) {

        minutes.innerText = min+'';
    }

    // setting day
    const dayy = dayInWords[date.getDay()] + "";
    if (day.innerText != dayy) {

        day.innerText = dayy + "";
    }
}

// function to start time
function startTime() {

    const date  = new Date();

    setTime(date);

    setTimeout(startTime, 1000);
}


// ! Code below manages settings
// adding click event listener to the set username button to change the username
document.getElementById('set-username').addEventListener('click', event => {

    // set username input
    const usernameInput = document.getElementById('change-username');

    // changing the username
    document.getElementById('username').innerText = usernameInput.value;
    // storing the new username
    disk.store('username', usernameInput.value);
});

// calling handleLeftArrow when left arrow is clicked
document.getElementById('left-arrow').addEventListener('click', event => {

    const settingsHome = document.getElementById('settings-home');
    const settingList = [

        document.getElementById('home-settings'),
    ];
    // removing all settings elements
    settingList.forEach(val => val.classList.add('hidden'));
    // making all theme elements visible
    elementsList.forEach(val => val.classList.remove('hidden'));

    settingsHome.classList.remove('hidden');
});

// enabling the username color pallete
const usernamePallete = document.getElementById('username-color').children;
// adding event listeners to all colors
for (var i=0; i<26; i++) {

    const val = usernamePallete.item(i)
    
    val.addEventListener('click', (event) => {

        document.getElementById('username').style.color = colorPalleteInfo[val.classList.value];
    });
}

// calling handleHomeSettings() when home section settings is invoked
document.getElementById('home-section-settings').addEventListener('click', event => {

    // settings inner sections
    const settingsHome = document.getElementById('settings-home');
    const homeSettings = document.getElementById('home-settings');

    // the home section
    const homeSection = document.getElementById('home');

    // iterating through all the sections and hiding them except for the home section
    elementsList.forEach(val => {

        if (val == homeSection) {} else {

            val.classList.add('hidden');
        }
    });

    // hiding the settings home page
    settingsHome.classList.add('hidden');

    // showing home settings
    homeSettings.classList.remove('hidden');
});

// enabling the stat color pallete
const statPallete = document.getElementById('stat-color').children;
for (var i=0; i<26; i++) {

    // getting the child element
    const val = statPallete.item(i);

    // adding event listener to the child element
    val.addEventListener('click', event => {

        document.getElementById('stat-div').style.color = colorPalleteInfo[val.classList.value];
    });
}

// enabling the personal icon color pallete
const personalPallete = document.getElementById('personal-color').children;
for (var i=0; i<26; i++) {

    // getting the span element
    const val = personalPallete.item(i);

    val.addEventListener('click', event => {

        document.getElementById('personal-settings').style.color = colorPalleteInfo[val.classList.value];
    });
}

// enabling the home color pallete
const homePallete = document.getElementById('home-color').children;
for (var i=0; i<26; i++) {

    // getting the span element
    const val = homePallete.item(i);

    // adding event listener to the color
    val.addEventListener('click', event => {

        document.getElementById('home').style.backgroundColor = val.classList.value;
    });
}

// starting the time
startTime();