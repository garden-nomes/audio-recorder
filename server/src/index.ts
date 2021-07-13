import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import AudioStorage from './audio-storage';

// read configuration from environment or .env file
dotenv.config();
const dataPath = path.resolve(process.env.DATA_PATH || 'recordings');
const port = process.env.PORT || 3000;
const isCorsEnabled = process.env.ENABLE_CORS === 'true';

// create app
const app = express();

// read request body as raw data
app.use(express.raw({ type: 'audio/ogg' }));

// enable CORS automatically outside production
if (isCorsEnabled || process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

// create data storage path if it doesn't exist
if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(dataPath);
}

const audioStorage = new AudioStorage(dataPath);

app.post('/', async (req, res) => {
    // save audio data to file
    const filename = await audioStorage.save(req.body);

    // log only the base name
    const basename = path.basename(filename);
    console.log(`audio received, saved to "${basename}"`);

    // return both base name and full path
    res.status(200).send({ basename, filename });
});

// start server
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});
