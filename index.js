const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
   const reviewCollection = client.db('visa').collection('reviews');

app.post('/reviews', async(req, res)=>{
  const rewiews = req.body;
  const result = await reviewCollection.insertOne(rewiews);
  res.send(result);

})
app.get('/reviews', async(req, res)=>{
  const query = {};
  const cursor = reviewCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
});
// delete

app.delete('/reviews/:id', async(req, res)=>{
  const id = req.params.id;
  const query = { _id : new ObjectId(id)};
  const result = await reviewCollection.deleteOne(query);
  res.send(result);
})

   app.get('/services', async(req, res)=>{
    const query = {};
    const cursor =  serviceCollection.find(query);
    const result = await cursor.limit(3).toArray();
    res.send(result);
   })

//    all data show service card 
app.get('/service', async(req, res)=>{
    const query = {};
    const cursor = serviceCollection.find(query);
    const result = await cursor.toArray();
    res.send(result);
})

app.get('/services/:id', async(req, res)=>{
  const id = req.params.id;
  console.log(id)
  const query = {_id: new ObjectId(id)};
  const service = await serviceCollection.findOne(query);
  res.send(service);
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