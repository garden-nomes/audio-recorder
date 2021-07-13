import fs from 'fs';
import path from 'path';

export default class AudioStorage {
    constructor(private dir: string) {}

    async save(audioData: Buffer) {
        // note: it's possible (but unlikely for our purposes) for naming collisions to occur,
        // in which case the previous audio file will be overwritten
        const filename = path.join(this.dir, `${Date.now()}.ogg`);

        await new Promise<void>((resolve, reject) => {
            fs.writeFile(filename, audioData, (err) => {
                if (err) { return reject(err); }
                resolve();
            });
        });

        return filename;
    }
}
