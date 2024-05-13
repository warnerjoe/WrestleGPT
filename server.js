
const express         = require('express');
const app             = express();
const mainRoutes      = require('./routes/main');
const axios           = require('axios');
const { MongoClient } = require('mongodb');
const PORT            = process.env.PORT || 3000;

require('dotenv').config();

// EXPRESS - Middleware to serve static files and parse JSON bodies
app.use(express.static('public'));
app.use(express.json());

// MONGODB - Test Connection
const client = new MongoClient(process.env.MONGO_URI);

// MONGODB  - This code loads the wrestlers collection and console.logs it
async function run() {
  try {
    await client.connect();
    // These variables determine which database and collection you are getting data from.
    const db = client.db("wrestlers");
    const coll = db.collection("wrestlers");

    // This calls the find function on the collection specified above
    const cursor = coll.find({ringName: "Chris Jericho"});

    // For each element, it performs a console.log
    await cursor.forEach(console.log);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', mainRoutes)


// CHATGPT - Route Handler
// Route to handle chat completion requests
app.post('/api/query', async (req, res) => {
    try {
        // Make an API call to the OpenAI chat completion endpoint
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo", // Make sure to use the correct model name
            messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: req.body.prompt }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Log the full response data
        console.log('OpenAI API Response:', JSON.stringify(response.data, null, 2));

        // Extract the message content and send back to the client
        const messageContent = response.data.choices[0].message.content;
        res.json({ message: messageContent });

    } catch (error) {
        // Log the error details
        console.error('Error with OpenAI API:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        // Send a 500 Internal Server Error response to the client
        res.status(500).json({ error: 'Failed to fetch response from OpenAI', details: error.message });
    }
});


// Start the server at PORT
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}, you better go catch it!!!!`);
});