
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
const handleFirstTimeLogin = (elementsList) => {

    // hiding other elements
    elementsList.forEach( val => { 

        val.classList.add('hidden');
    });

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

        // showing the other elements
        elementsList.forEach((val) => val.classList.remove('hidden'));

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
         document.getElementById('weather'),
         document.getElementById('dock'),
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
const closeSettings = (elementsList) => {

    // the settings section
    const settings = document.getElementById('settings');

    // adding the hidden class to it
    settings.classList.add('hidden');

    // showing the settings home
    document.getElementById('settings-home').classList.remove('hidden');

    // hiding all other sections
    document.getElementById('home-settings').classList.add('hidden');
    document.getElementById('clock-settings').classList.add('hidden');
    document.getElementById('weather-settings').classList.add('hidden');

    // showing all theme elements
    elementsList.forEach(val => val.classList.remove('hidden'));
}

// getting the time elements
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const day = document.getElementById('day');

// getting the stat elements
const cpuStat = document.getElementById('cpu-stat');
const ramStat = document.getElementById('ram-stat');

// getting the weather elements
const condition = document.getElementById('condition');
const temp = document.getElementById('temp');

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

    // setting ram usage
    var ram = Math.floor(100-os.ram())+"%";
    if (ramStat.innerText == ram) { } else {
        ramStat.innerText = ram;
    }

    // setting cpu usage
    os.cpu( usage => {

        const cpu = Math.floor(usage*100)+'%';
        
        if (cpuStat.innerText == cpu) { } else {

            cpuStat.innerText = cpu;
        }
    })

    setTimeout(startTime, 1000);
}

// class to manage weather 
class Weather {

    static city = disk.get('city');

    constructor () { }

    static async makeCall() {

        let response = await fetch(
        "http://api.weatherapi.com/v1/current.json?key=4cf4e91702e544c3bde103141232806&q=" +
            Weather.city
        );
        let data = await response.json();

        return data;
    }

    static setWeather() {

        Weather.makeCall().then( (data) => {

            const weatherData = data.current;
            temp.innerText = weatherData.temp_c;
            condition.innerText = weatherData.condition.text;
        })
    }

    makeWeather() {

        Weather.setWeather();

        setInterval(this.makeWeather, 1000*60*30);
    }
}

// function to load a default and intentionaly set value when available for a particular key
const getValue = (key = "", defValue = "") => {

    const value = disk.get(key);

    if (value === null) {

        return defValue;
    } else {

        return value;
    }
}

// enabling the home section
const enableHome = () => {

    // username related updations
    const username = document.getElementById('username');
    username.innerText = getValue("username", "John Doe");
    username.style.color = getValue("username-color", "black");

    // statistics related updations
    document.getElementById('stat-div').style.color = getValue("stat-color", "black");

    // personal icon related updations
    document.getElementById('personal-settings').style.color = getValue("personal-icon-color", "black")

    // home background related updations
    document.getElementById('home').style.backgroundColor = getValue("home-color", "#45475a");
}

// enabling clock section
const enableClock = () => {

    // color of hour
    document.getElementById('hours').style.color = getValue('hour-color', "black");

    // color of minutes
    document.getElementById('minutes').style.color = getValue('minutes-color', "black");

    // color of day
    document.getElementById('day').style.color = getValue('day-color', 'black');

    // color of clock backround
    document.getElementById('clock').style.backgroundColor = getValue('clock-color', "#45475a");
}

// enabling weather section
const enableWeather = () => {

    // color of condition
    condition.style.color = getValue('condition-color', 'black');

    // color of °C
    document.getElementById('c-temp').style.color = getValue('c-color', 'black');

    // color of temp
    temp.style.color = getValue('temp-color', 'black');

    // color of weather background
    document.getElementById('weather').style.backgroundColor = getValue('weather-color', '#45475a')
}


// ! It is adviced that all developers who create their own themes
// ! for the splash application create an entry into the disk using
// ! disk.store(); method to store first time run of their theme.
// ! This is done for two reasons:
// ! 1 => To know if it is the first time their theme is run to do the needful.
// ! 2 => To clear the existing disk storage of the previous theme so that everything works smoothly.
// ! Step 2 is IMPORTANT because some existing variables of the previous theme might cause issue in the new theme.


// creating list of elements
const elementsList = createArrayListElements();

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
    handleFirstTimeLogin(elementsList);
}

// enabling the color updations 
enableHome();
enableClock();
enableWeather();

// making elements draggable
enableDraggability(elementsList);

// enabling settings action 
document.getElementById('personal-settings').addEventListener('click', (event) => {

    enableSettings();
});

// enabling the settings close button
document.getElementById('settings-close').addEventListener('click', event => {

    closeSettings(elementsList);
});

// starting the time
startTime();

// starting the weather
const weather = new Weather();
weather.makeWeather();



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
        document.getElementById('clock-settings'),
        document.getElementById('weather-settings'),
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
        disk.store('username-color', colorPalleteInfo[val.classList.value]);
    });
}

// ? Start of home settings
//  calling handleHomeSettings() when home section settings is invoked
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
        disk.store('stat-color', colorPalleteInfo[val.classList.value]+"");
    });
}

// enabling the personal icon color pallete
const personalPallete = document.getElementById('personal-color').children;
for (var i=0; i<26; i++) {

    // getting the span element
    const val = personalPallete.item(i);

    val.addEventListener('click', event => {

        document.getElementById('personal-settings').style.color = colorPalleteInfo[val.classList.value];
        disk.store('personal-icon-color', colorPalleteInfo[val.classList.value]);
    });
}

// enabling the home color pallete
const homePallete = document.getElementById('home-color').children;
for (var i=0; i<26; i++) {

    // getting the span element
    const val = homePallete.item(i);

    // adding event listener to the color
    val.addEventListener('click', event => {

        document.getElementById('home').style.backgroundColor = colorPalleteInfo[val.classList.value];
        disk.store('home-color', colorPalleteInfo[val.classList.value]);
    });
}

// ? managing clock section settings
document.getElementById('clock-section-settings').addEventListener('click', event => {

    // the settings elements
    const settingsHome = document.getElementById('settings-home');
    const clockSettings = document.getElementById('clock-settings');
    
    const clockSection = document.getElementById('clock');

    // hiding all sections except clock
    elementsList.forEach( val => {

        if (val == clockSection) { } else {

            val.classList.add('hidden');
        }
    })

    // hiding home-settings and showing clock-settings
    settingsHome.classList.add('hidden');
    clockSettings.classList.remove('hidden');
});

// enabling the hours color pallete
const hourPallete = document.getElementById('hours-color').children;
for (var i=0; i<26; i++) {

    // getting the span element
    const val = hourPallete.item(i);

    val.addEventListener('click', event => {

        // changing the color
        document.getElementById('hours').style.color = colorPalleteInfo[val.classList.value];
        disk.store('hour-color', colorPalleteInfo[val.classList.value]);
    });
}

// enabling the minutes color pallete 
const minutesPallete = document.getElementById('minutes-color').children;
for (var i=0; i<26; i++) {

    // getting the span element
    const val = minutesPallete.item(i);

    // changing the color
    val.addEventListener('click', event => {

        document.getElementById('minutes').style.color = colorPalleteInfo[val.classList.value];
        disk.store('minutes-color', colorPalleteInfo[val.classList.value]);
    });
}

// enabling the day color pallete
const dayPallete = document.getElementById('day-color').children;
for (var i=0; i<26; i++) {

    // getting the child element
    const val = dayPallete.item(i);

    // changing the color
    val.addEventListener('click', event => {

        document.getElementById('day').style.color = colorPalleteInfo[val.classList.value];
        disk.store('day-color', colorPalleteInfo[val.classList.value]);
    });
}

// enabling the clock pallete
const clockPallete = document.getElementById('clock-color').children;
for (var i=0; i<26; i++) {

    // getting the span element
    const val = clockPallete.item(i);

    // changing the color
    val.addEventListener('click', event => {

        document.getElementById('clock').style.backgroundColor = colorPalleteInfo[val.classList.value];
        disk.store('clock-color', colorPalleteInfo[val.classList.value]);
    });
}

// ? Managing weather settings
document.getElementById('weather-section-settings').addEventListener('click', (event) => {

    // the settings elements
    const settingsHome = document.getElementById('settings-home');
    const weatherSettings = document.getElementById('weather-settings');
    
    const weatherSection = document.getElementById('weather');

    // hiding all sections except clock
    elementsList.forEach( val => {

        if (val == weatherSection) { } else {

            val.classList.add('hidden');
        }
    })

    // hiding home-settings and showing clock-settings
    settingsHome.classList.add('hidden');
    weatherSettings.classList.remove('hidden');
});

// enabling the temperature pallete
const tempPallete = document.getElementById('temp-color').children;
for (var i=0; i<26; i++) {

    // getting the span element
    const val = tempPallete.item(i);

    val.addEventListener('click', event => {

        // changing the color
        document.getElementById('temp').style.color = colorPalleteInfo[val.classList.value];
        disk.store('temp-color', colorPalleteInfo[val.classList.value]);
    }); 
}

// enabling the °C color pallete
const cPallete = document.getElementById('c-color').children;
for (var i=0; i<26; i++) {

    // getting the span element
    const val = cPallete.item(i);

    val.addEventListener('click', event => {

        // changing the color
        document.getElementById('c-temp').style.color = colorPalleteInfo[val.classList.value];
        disk.store('c-color', colorPalleteInfo[val.classList.value]);
    }); 
}

// enabling weather condition color pallete
const conditionPallete = document.getElementById('condition-color').children;
for (var i=0; i<26; i++) {

    // getting the span element
    const val = conditionPallete.item(i);

    val.addEventListener('click', event => {

        // changing the color
        document.getElementById('condition').style.color = colorPalleteInfo[val.classList.value];
        disk.store('condition-color', colorPalleteInfo[val.classList.value]);
    }); 
}

// enabling the weather background pallete
const weatherPallete = document.getElementById('weather-color').children;
for (var i=0; i<26; i++) {

    // getting the span element
    const val = weatherPallete.item(i);

    // changing the color
    val.addEventListener('click', event => {

        document.getElementById('weather').style.backgroundColor = colorPalleteInfo[val.classList.value];
        disk.store('weather-color', colorPalleteInfo[val.classList.value]);
    });
}
