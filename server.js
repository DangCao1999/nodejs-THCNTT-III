const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();
let datetime = require("./processdatetime.js")

app.get('/firestore', async (req, res) => {
  let document = firestore.collection('Device');
  let doc = await document.get();
  console.log('Read the document');

  res.send(doc)
});


app.get('/', function (req, res) {
  let document = firestore.collection('Record');
  let jsonresult;
  let datetimearr  = datetime.getSevenDay();
  console.log(datetimearr);
  for(let i = 0; i < datetimearr.length; i++)
  {
    document.doc(datetimearr[i]).collection('Devices').doc('May 1').get().then((data)=>{
      console.log(data.data());
    })
  }
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});