// All selectors
const main = document.querySelector('main');
const voiceSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const textBox = document.getElementById('text-box');
const descBtn = document.querySelector('.desc_btn');
const desc = document.querySelector('.desc');
const descClose = document.querySelector('.desc-close');
const inputBtn = document.querySelector('.input_btn');
const input = document.querySelector('input')
//end of All selectors

//The following is an array of data which contains data which is present locally in system
const data = [{
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

/*********
*******************
input button
****/
inputBtn.addEventListener('click', () => {
  if (input.value === '') { //checking if the input value is empty or not
    inputBtn.disabled = true; //If there is empty filed then button will be disabled
    input.placeholder = 'Please type something'; //changing placeholder
  }
})
input.addEventListener('input', () => {
  //on inserting the input value i am enabling the search button, for this I did use a 'input event'
  inputBtn.disabled = false;
});

/*********
*******************
//Handling 'How to use' button
****/
descBtn.addEventListener('click', () => {
  desc.classList.toggle('show'); //on click toggling show class to desc filed
});
descClose.addEventListener('click', () => {
  desc.classList.remove('show'); //clicking on close description button it will close the `how to use section`
});

/*********
*****
//init speech synth
//creating message object by initiating the SpeechSynthesisUtterance() method
****/
const message = new SpeechSynthesisUtterance(); //creating message object by initiating the SpeechSynthesisUtterance() method

//set text
const setTextMessage = (text) => {
  message.text = text; //assigning text to message.text which is coming from createBox() 
}

//speak text
const speakText = () => {
  speechSynthesis.speak(message); //passing message to speechSynthesis.speak()  
}


/****
//store voices
****/
let voices = []; //creating empty array
const getVoices = () => {
  voices = speechSynthesis.getVoices(); //storing all languages in voices array 
  voices.forEach(voice => { //looping over through all languages and each voice is an object have couple of properties
    const option = document.createElement('option'); //creating HTML element

    option.value = voice.name; //inserting voice.name in value attribute 
    option.innerText = `${voice.name} ${voice.lang}` //inserting name and lang in option

    voiceSelect.appendChild(option) //appending option in voiceSelect that we have created early
  })
}

//setVoice when changing the language
const setVoice = (e) => {
  //changing select options and with the help of javascript find() method we can find the exact option value
  //and then assigning it to message.voice which is part of web speech api 
  message.voice = voices.find(voice => voice.name === e.target.value);
}

/****
//create speech boxes
****/
const createBox = (item) => {
  const box = document.createElement('div'); //creating div
  const { //destructuring item object which is coming from data array one by one 
    image,
    text
  } = item;

  box.classList.add('box'); //adding class .box to each div

  //setting innerHTML
  box.innerHTML = `         
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
    `;

  box.addEventListener('click', () => {
    setTextMessage(text) //on clicking any one of div or box invoking setTextMessage() and passing an argument 'text to it
    speakText(); // //on clicking any one of div or box invoking speakText().

    //Add active effect for box shadow
    box.classList.add('active');
    setTimeout(() => {
      box.classList.remove('active')
    }, 800);
  })

  //@todo - speak event
  main.appendChild(box);
}


//looping over through data
data.forEach(createBox); //looping over through data and invoking createBox callback function.

//voice changed
speechSynthesis.addEventListener('voiceschanged', getVoices); //adding event listener on speechSynthesis it will call getVoices method

//invoking getVoices arrow function
getVoices(); //Invoking getVoices()

//on language change
voiceSelect.addEventListener('change', setVoice); //changing audio if voice is changed and invoking setVoice

//read text button
readBtn.addEventListener('click', () => {
  //invoking setTextMessage() by passing value of textarea
  setTextMessage(textarea.value);
  //invoking speakText function
  speakText();
});