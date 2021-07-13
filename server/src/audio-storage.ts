import fs from 'fs';
import path from 'path';
import { hri } from 'human-readable-ids';

export default class AudioStorage {
    constructor(private dir: string) {}

    async save(audioData: Buffer) {
        const filename = path.join(this.dir, `${hri.random()}.ogg`);

        await new Promise<void>((resolve, reject) => {
            fs.writeFile(filename, audioData, (err) => {
                if (err) { return reject(err); }
                resolve();
            });
        });

        return filename;
    }
}
