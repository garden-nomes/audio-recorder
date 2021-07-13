import express from 'express';
import cors from 'cors';
import fs from 'fs';
import AudioStorage from './audio-storage';

const app = express();
app.use(cors());
app.use(express.raw({ type: 'audio/ogg' }));

if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

const audioStorage = new AudioStorage('./data');

app.post('/', async (req, res) => {
    const filename = await audioStorage.save(req.body);
    console.log(`audio received, saved as "${filename}"`);
    res.status(200).send(filename);
});

app.listen(3000, () => {
    console.log(`listening on port 3000...`);
})
