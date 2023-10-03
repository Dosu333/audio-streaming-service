const {Storage} = require('@google-cloud/storage');
require('dotenv/config');

const storage = new Storage();
const bucketName = process.env.GCP_BUCKETNAME
// storage.createBucket(bucketName)

const bucket = storage.bucket(bucketName)

// const s3Bucket = async () => {
//     await storage.createBucket(bucketName);
//     console.log(`Bucket ${bucketName} created.`);
// }

// s3Bucket().catch(console.error)

module.exports = bucket