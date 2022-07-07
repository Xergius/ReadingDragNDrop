
var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];
var voicech = "Google español de Estados Unidos (es-US)"
var voicemex = "Microsoft Dalia Online (Natural) - Spanish (Mexico) (es-MX)"

function populateVoiceList() {

  voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    //voiceSelect.appendChild(option);                                        // UNCOMMENT TO SHOW ALL OPTIONS FOR VOICES
    //document.getElementById('sel').setAttribute('style', 'display:none'); // HIDE VOICE SELECTOR
    // console.log(option.value);
    if (option.value==voicech){
      voiceSelect.appendChild(option);
      console.log(option.value);
    }
    else {
      if (option.value==voicemex){
        voiceSelect.appendChild(option);
        console.log(option.value);
        
      }
    }
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

    for(i = 0; i < voices.length ; i++) {
      // console.log(i)
      // console.log(selectedOption);
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}


inputForm.onsubmit = function(event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
}

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}

voiceSelect.onchange = function(){
  speak();
}
document.getElementById('sel').value = 'Google español de Estados Unidos (es-US)';


// WORDS SCRIPT
// get the element of id paragraph
// get the element you wish to move it to
let drag1 = document.getElementById('drag1');
let div1 = document.getElementById('div1');
let drag2 = document.getElementById('drag2');
let div2 = document.getElementById('div2');
let drag3 = document.getElementById('drag3');
let div3 = document.getElementById('div3');
let drag4 = document.getElementById('drag4');
let div4 = document.getElementById('div4');

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  // document.forms[0].submit()
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));

  // CHECK FOR SYLLABES IN BOTTOM DIVS
  document.getElementById('speech-text').value=document.getElementById(data).textContent;
  if (["div5", "div6", "div7"].includes(ev.target.id)){
    speak();
  }
  console.log(document.getElementById(data).textContent)

  // CHECK ALL BOXES FILLED
  let not_content_in_div = true;
  for (i in only_syllabes_frase){
    if ((document.querySelector('#div'+ (parseFloat(i)+5)).innerHTML) === ""){
      not_content_in_div = false;
      
    }
  }
  console.log(not_content_in_div);
  
  if ((not_content_in_div))  {
    
    // CONCATENATE ANSWER AND RIGHT ANSWER IN ONE STRING VARIABLE
    concated_syllabes = "";
    concated_frase = "";
    for (j in only_syllabes_frase){
      console.log(document.querySelector('#div5').lastElementChild.textContent);
      concated_syllabes = concated_syllabes + document.querySelector('#div'+ (parseFloat(j)+5)).lastElementChild.textContent;
      concated_frase = concated_frase + only_syllabes_frase[j]      
    }
    
    // CHECK CORRECT ANSWER
    if (concated_syllabes === concated_frase){
        points = points + 1;
        console.log('BIEN');     
        // render_all()
        setTimeout('document.getElementById("right-ans").play()', 2700);
        console.log(sentence);
        document.getElementById('speech-text').value=sentence;
        setTimeout('speak()', 1500);
        setTimeout('render_all()', 3500);
    // WRONG ANSWER
    } else {
        setTimeout('document.getElementById("wrong-ans").play()', 1000);
        if (div1.textContent.trim() === '') {
          setTimeout('div1.appendChild(drag1)', 400);
            
        };
        if ( div2.textContent.trim() === '') {
          setTimeout('div2.appendChild(drag2)', 400);
        };
        if (div3.textContent.trim() === '') {
          setTimeout('div3.appendChild(drag3)', 400);
        };
        if ( div4.textContent.trim() === '') {
          setTimeout('div4.appendChild(drag4)', 400);
        };
        console.log(event);
    }

  }
}

//    FULL SCREEN
var elem = document.documentElement;
function openFullscreen() {
if (elem.requestFullscreen) {
    elem.requestFullscreen();
} else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
} else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
};
document.getElementById('sel').setAttribute('style', 'display:none');
};

function closeFullscreen() {
if (document.exitFullscreen) {
    document.exitFullscreen();
} else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
} else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
};
document.getElementById('sel').setAttribute('style', 'display:block');
};
