const express = require('express');
const cors = require('cors');

const app = express();
const { initializeDatabase } = require('./db/db.connect')
const WedoInfo = require('./models/wedoinfo.models')

require('./schedular')


const corsOpt = {
    origin: '*',
    credentials: true
}

app.use(express.json());
app.use(cors(corsOpt));

initializeDatabase();


app.get('/', async (req, res) => {
    res.send("Wedo Transformation Client Details. Server is live.")
})

app.get('/details', async (req, res) => {
    try {
        const clients = await WedoInfo.find();

        if(!clients){
            res.status(404).json({message: 'Data Not Found.'})
        }

        res.status(200).json(clients)
    } catch (error){
        res.status(500).json({error: 'Internal server error.', error})
    }
})


app.post('/details', async (req, res) => {
    try {
        const data = req.body;
        
        const newDetails = new WedoInfo(data);
        const saveDetails = await newDetails.save();

        if(saveDetails){
            res.status(200).json(saveDetails)
        }
    } catch (error) {
        res.status(500).json({error: 'Internal server error.', error})
    }
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})