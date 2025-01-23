import https from 'https';
import fs from 'fs';

const url = 'https://raw.githubusercontent.com/SchemaStore/schemastore/refs/heads/master/src/api/json/catalog.json';
const outputFile = 'src/catalog.json';

https.get(url, (response) => {
    fs.mkdirSync("src", {recursive: true});

    const writeStream = fs.createWriteStream(outputFile);
    response.pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('File downloaded successfully');
    });
}).on('error', (err) => {
    console.error('Error downloading file:', err);
});