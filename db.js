const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
    projectId: 'Factly',
    keyFilename: '/Downloads/e37dfd7e6e3b.json',
});