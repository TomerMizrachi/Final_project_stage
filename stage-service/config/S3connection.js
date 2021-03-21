import AWS from 'aws-sdk'
import config from '../config/env.js'

const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = config

var s3 = new AWS.S3();

s3.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-1'
})
// let s3bucket = new AWS.S3({
//     accessKeyId: env.AWS_ACCESS_KEY,
//     secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
//     Bucket: S3_BUCKET,
//     endpoint: 's3-us-east-1.amazonaws.com',
//     signatureVersion: 'v4',
//     region: 'us-east-1'
// });
// const createFilesUrl = async (file) => {
//     try {
//         const result = await createfileUrl(file);
//         return result;
//     } catch (err) {
//         return -1;
//     }
// }
// const createfileUrl = async (file) =>{
//     const fileName = file["fileName"];
//     const fileType = file["fileType"];
//     const s3Params = {
//       Bucket: 'stage-videos',
//       Key: fileName,
//       Expires: 60,
//       ContentType: fileType,
//       ACL: 'public-read'
//     };
//     try{
//         const data = await s3bucket.getSignedUrl('putObject', s3Params);
//         const returnData = {
//             signedRequest: data,
//             url: `https://stage-videos.s3.amazonaws.com/${fileName}`
//         }
//         return returnData.url;
//     }catch(err){
//         return -1
//     }
// }

export default s3