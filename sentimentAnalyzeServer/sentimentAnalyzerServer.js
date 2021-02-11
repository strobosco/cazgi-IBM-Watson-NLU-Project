const express = require('express');
const dotenv = require("dotenv");
dotenv.config();

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
    const { IamAuthenticator } = require("ibm-watson/auth");

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: "2020-08-01",
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}


app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let NLU = getNLUInstance();
    let url = req.query.url;
    const params = {
        'url': url,
        'features': {
            "emotion": {
                'default': false,
                'emotion': true
            }
        }          
    };

    NLU.analyze(params).then(analysisResults => {

        let joy = analysisResults.result.emotion.document.emotion.joy;
        let sadness = analysisResults.result.emotion.document.emotion.sadness;
        let fear = analysisResults.result.emotion.document.emotion.fear;
  
        return res.send("Text sentiment is: joy: " + joy + " sadness: " + sadness + " fear: " + fear);
    }).catch(err => {
        console.log("error" + err);
    });
});

app.get("/url/sentiment", (req,res) => {
    let NLU = getNLUInstance();
    let url = req.query.url;
    const params = {
        'url': url,
        'features': {
            "emotion": {
                'default': false,
                'sentiment': true
            }
        }          
    };

    NLU.analyze(params).then(analysisResults => {
        return res.send("This is the sentiment for: " + url);
    }).catch(err => {
        console.log("error" + err);
    });
});

app.get("/text/emotion", (req,res) => {
    let NLU = getNLUInstance();
    let text = req.query.text;
    const params = {
        'text': text,
        'features': {
            "emotion": {
                'default': false,
                'emotion': true
            }
        }          
    };

    NLU.analyze(params).then(analysisResults => {

        let joy = analysisResults.result.emotion.document.emotion.joy;
        let sadness = analysisResults.result.emotion.document.emotion.sadness;
        let fear = analysisResults.result.emotion.document.emotion.fear;
  
        return res.send("Text sentiment is: joy: " + joy + " sadness: " + sadness + " fear: " + fear);
    }).catch(err => {
        console.log("error" + err);
    });
});

app.get("/text/sentiment", (req,res) => {
    let NLU = getNLUInstance();
    let text = req.query.text;
    const params = {
        'text': text,
        'features': {
            "emotion": {
                'default': false,
                'sentiment': true
            }
        }          
    };

    NLU.analyze(params).then(analysisResults => {

        let joy = analysisResults.result.emotion.document.emotion.joy;
        let sadness = analysisResults.result.emotion.document.emotion.sadness;
        let fear = analysisResults.result.emotion.document.emotion.fear;
  
        return res.send("This is the sentiment for: " + text);
    }).catch(err => {
        console.log("error" + err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

