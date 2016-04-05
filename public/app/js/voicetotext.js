var client;
var request;

//var keys = {"api_key": process.env.VOICE_TO_TEXT_KEY};

function useMic() {
    return true;
}

function getMode() {
    return Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionMode.shortPhrase;
    
}

function getOxfordKey() {
    var key = apikey;
    return key;
}

function getLanguage() {
    var radios = document.getElementsByName('language');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            console.log(radios[i].value);
            return radios[i].value
        }
    }
}

function clearText() {
    document.getElementById("output").value = "";
}

function setText(text) {
    document.getElementById("output").value += text;
}

var startCount = 0;
function start() {
    var mode = getMode();
    startCount++; 
    console.log(startCount);
    clearText();
    
    if (startCount < 6) {
        
        if (useMic()) {
            client = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionServiceFactory.createMicrophoneClient(
                mode,
                getLanguage(),
                getOxfordKey(),
                getOxfordKey()
            );
            
            client.startMicAndRecognition();
            setTimeout(function () {
                client.endMicAndRecognition();
            }, 5000);
        } else {
            client = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionServiceFactory.createDataClient(
                mode,
                getLanguage(),
                getOxfordKey(),
                getOxfordKey()
            );
            
            request = new XMLHttpRequest();
            request.open(
                'GET',
                (mode == Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionMode.shortPhrase) ? "whatstheweatherlike.wav" : "batman.wav",
                true);
            request.responseType = 'arraybuffer';
            request.onload = function () {
                if (request.status !== 200) {
                    setText("unable to receive audio file");
                } else {
                    client.sendAudio(request.response, request.response.length);
                }
            };

            request.send();
        }

        client.onPartialResponseReceived = function (response) {
            console.log('1-------------------');
            console.log(response);
            console.log('1-------------------');
            setText(JSON.stringify(response[0].display));
            
        }

        client.onFinalResponseReceived = function (response) {
            console.log('2-------------------');
            console.log(response);
            console.log(response[0].display);
            console.log(JSON.stringify(response));
            console.log(JSON.stringify(response[0].display));
            console.log('2-------------------');
            var testarr = JSON.stringify(response);
            console.log(testarr[4]);
            console.log(testarr['transcript']);
            console.log('2-------------------');
            setText(JSON.stringify(response[0].display));
            
        }

        client.onIntentReceived = function (response) {
            console.log('3-------------------');
            console.log(response);
            console.log('3-------------------');
            setText(JSON.stringify(response[0].display));
            
        };
    } else if (startCount => 6) {
        startCount = 0;
        location.reload();
    }
}