const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.db_user}:${process.env.password}@cluster0.0vnziom.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   const serviceCollection = client.db('visa').collection('services');

   app.get('/services', async(req, res)=>{
    const query = {};
    const cursor =  serviceCollection.find(query);
    const result = await cursor.toArray();
    res.send(result);
   })

  } finally {
    
  }
}
run().catch(console.dir);



app.get('/', (req, res)=>{
    res.send('data sending')
})

app.listen(port, ()=>{
    console.log(`${port} is running now!`)
})