var client;
var request;

function useMic() {
    return document.getElementById("useMic").checked;
}

function getMode() {
    switch (document.getElementById("mode").value) {
        case "longDictation":
            return Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionMode.longDictation;
        default:
            return Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionMode.shortPhrase;
    }
}

function getOxfordKey() {
    return document.getElementById("oxfordkey").value;
}

function getLanguage() {
    return "en-us";
}

function clearText() {
    document.getElementById("output").value = "";
}

function setText(text) {
    document.getElementById("output").value += text;
}

function getLuisConfig() {
    var appid = document.getElementById("luis_appid").value;
    var subid = document.getElementById("luis_subid").value;

    if (appid.length > 0 && subid.length > 0) {
        return { appid: appid, subid: subid };
    }

    return null;
}

function start() {
    var mode = getMode();
    var luisCfg = getLuisConfig();

    clearText();

    if (useMic()) {
        if (luisCfg) {
            client = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionServiceFactory.createMicrophoneClientWithIntent(
                getLanguage(),
                getOxfordKey(),
                getOxfordKey(),
                luisCfg.appid,
                luisCfg.subid);
        } else {
            client = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionServiceFactory.createMicrophoneClient(
                mode,
                getLanguage(),
                getOxfordKey(),
                getOxfordKey());
        }
        client.startMicAndRecognition();
        setTimeout(function () {
            client.endMicAndRecognition();
        }, 5000);
    } else {
        if (luisCfg) {
            client = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionServiceFactory.createDataClientWithIntent(
                getLanguage(),
                getOxfordKey(),
                getOxfordKey(),
                luisCfg.appid,
                luisCfg.subid);
        } else {
            client = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionServiceFactory.createDataClient(
                mode,
                getLanguage(),
                getOxfordKey(),
                getOxfordKey());
        }
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
}