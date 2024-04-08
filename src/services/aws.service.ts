import AWS from 'aws-sdk';
import {awsConfig} from '../config/aws.config';
import { getFileTypeByName } from '../helpers/chat.helper';

const folders = {
  ONBOARDING_FOLDER: 'onboarding',
  CHAT_FOLDER: 'chat_media',
  PROJECT_FOLDER: 'projects',
};

const s3bucket = new AWS.S3(awsConfig);

interface File {
  originalname: string;
  buffer: Buffer;
}

interface UploadResult {
  url: string;
  fileType: string;
  fileName: string;
}

const uploadFile = (file: File, folder: string = folders.CHAT_FOLDER): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    try {
      const params = {
        Key: file.originalname,
        Body: file.buffer,
        Bucket: `paypaas/${folder}`,
        ACL: 'public-read-write',
      };
      s3bucket.upload(params, (error: Error | null, data: AWS.S3.ManagedUpload.SendData) => {
        if (error) {
          console.log('one', error);
          reject(error);
        }
        resolve({
          url: data.Location,
          fileType: getFileTypeByName(file.originalname),
          fileName: file.originalname,
        });
      });
    } catch (e) {
      console.log('two', e);
      reject(e);
    }
  });
};

export {
  uploadFile,
  folders as bucketFolders,
};
