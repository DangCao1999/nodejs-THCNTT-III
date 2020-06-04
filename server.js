const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();


app.get('/firestore',async (req, res)=>{
  let document = firestore.collection('Device');
  let doc = await document.get();
  console.log('Read the document');
  
  res.send(doc)
})

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});