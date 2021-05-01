const express = require('express');
const dotenv = require('dotenv');

const app = new express();
dotenv.config();

const nluInstance = getNLUInstance();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    
    const url = req.query.url;
    const analyzeParams = {
  'url': url,
  'features': {
    'emotion': {
    }
  }
};
nluInstance.analyze(analyzeParams).then(analysisResults => {
    return res.send(JSON.stringify(analysisResults.result.emotion.document.emotion));
  })
  .catch(err => {
    console.log('error:', err);
  });
});


app.get("/url/sentiment", (req,res) => {
  const url = req.query.url;
    const analyzeParams = {
  'url': url,
  'features': {
    'sentiment': {
    }
  }
};
nluInstance.analyze(analyzeParams).then(analysisResults => {
    return res.send(JSON.stringify(analysisResults.result.sentiment.document.label));
  })
  .catch(err => {
    console.log('error:', err);
  });

});

app.get("/text/emotion", (req,res) => {
    const text = req.query.text;
    const analyzeParams = {
  'text': text,
  'features': {
    'emotion': {
    }
  }
};
nluInstance.analyze(analyzeParams).then(analysisResults => {
    return res.send(JSON.stringify(analysisResults.result.emotion.document.emotion));
  })
  .catch(err => {
    console.log('error:', err);
  });
});

app.get("/text/sentiment", (req,res) => {
    const text = req.query.text;
    const analyzeParams = {
  'text': text,
  'features': {
    'sentiment': {
    }
  }
};
nluInstance.analyze(analyzeParams).then(analysisResults => {
    return res.send(JSON.stringify(analysisResults.result.sentiment.document.label));
  })
  .catch(err => {
    console.log('error:', err);
  });
});

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const {IamAuthenticator} = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({

        version: '2020-08-01',
        authenticator: new IamAuthenticator({
        apikey: api_key,
    }),
    serviceUrl: api_url,
    });

    return naturalLanguageUnderstanding;
}

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

