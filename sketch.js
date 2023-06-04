
let logo;
let humanText;
let sendBtn;
let navigateBtn;
let botText;
let myVoice;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#000080');


  imageMode(CENTER); //adjust image mode
  //Using a call back function to load first image
  loadImage('EUE-Logo.png', logo => {
    image(logo, width / 2, height / 2 - 100, 500, 150);
  });
  
  //input field
  inp = createInput('');
  inp.position(50, height - 300);
  inp.attribute('placeholder', "Please enter your bla bla"); //placeholder is like a hint to users what they should enter (placeholder is the attribute we want to add)
  inp.size(windowWidth - 250);
  inp.input(HumanInputEvent); //function onclick

  //navigation button
  navigateBtn = createButton("Use Sound");
  navigateBtn.position(width - 150, 300);
  navigateBtn.size(100);
  navigateBtn.mousePressed(navigate);

  //draw an empty textbox
  rectX = width / 2;
  rectY = height - 125;
  rectMode(CENTER);
  rect(rectX, rectY, windowWidth - 50, 200, 20);

  function HumanInputEvent()
  {
    console.log("this is the user input: "+this.value());
  }

  //send button
  sendBtn = createButton("send");
  sendBtn.position(width - 150, height - 300);
  sendBtn.size(100);
  sendBtn.mousePressed(submitInput);


  function submitInput()
  {
    setTimeout( ()=> {
      console.log("input.value: "+ inp.value());
      console.log("Mouse is Pressed");
      humanText = inp.value();
    }, 1000); //wait 1 seconds before response

    console.log(botText);

  }

  function navigate()
  {
    //hides input and send button
    inp.hide(); 
    sendBtn.hide();
  }

  myVoice = new p5.Speech();

  speechRec = new p5.SpeechRec('en-us', gotSpeech);

  speechRec.start(true, false);

  function gotSpeech()
  {
    if (speechRec.resultValue == true) {
      console.log(speechRec.resultString);
      myVoice.speak(speechRec.resultString);
      humanText = speechRec.resultString;
    }
  }

}

function draw() {
  //background(220);

  //draw an empty textbox in draw function so that the bot text doesn't overlap
  fill(255);
  rectX = width / 2;
  rectY = height - 125;
  rectMode(CENTER);
  rect(rectX, rectY, windowWidth - 50, 200, 20);

  //Human text
  textSize(20);
  textAlign(LEFT);
  fill("black");
  //fontStyle("Arial");
  if (humanText == undefined)
  {
    humanText = "";
  }
  text("> Human text: " + humanText, (width/15), height - 200);
  
  //if statements for chatbot response
  if (humanText.includes("hello")) 
  {
    botText = "Hello there!"
  }
  else if(humanText.includes("Good morning"))
  {
    botText = "Good morning user!"
  }
  else if(humanText == "")
  {
    botText = "";
  }
  else if(humanText != "")
  {
    botText = "I can't understand";
  }

  //draw bot text inside box
  let padding = 20;
  textSize(20);
  textAlign(RIGHT);
  strokeWeight(1);
  stroke(20);
  text(botText + " : Bot response <", rectX - padding, rectY + (3*padding), windowWidth - 75, 190);

  //gotSpeech();
}

