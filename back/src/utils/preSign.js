import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});

const s3 = new AWS.S3();
const myBucket = process.env.BUCKET_NAME;
const signedUrlExpireSeconds = 60 * 5;

export default function createUrl(fileName) {
  const url = s3.getSignedUrl("putObject", {
    Bucket: myBucket,
    Key: fileName,
    Expires: signedUrlExpireSeconds,
    ContentType: "image/*",
  });
  return url;
}
