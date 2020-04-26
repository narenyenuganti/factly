const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
    projectId: 'seismic-kingdom-275320',
    keyFilename: './e37dfd7e6e3b.json',
});