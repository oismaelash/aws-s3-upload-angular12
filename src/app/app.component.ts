import { Component } from '@angular/core';
import AWSS3UploadAshClient from 'aws-s3-upload-ash';
import { UploadResponse } from 'aws-s3-upload-ash/dist/types';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fileSelected: any = null;
  config = {
    bucketName: 'aws-s3-upload-ash',
    dirName: 'media', /* optional - when use: e.g BUCKET_ROOT/dirName/fileName.extesion */
    region: 'us-east-1',
    accessKeyId: environment.AWS_ACCESS_KEY,
    secretAccessKey: environment.AWS_SECRET_KEY,
    s3Url: 'https://aws-s3-upload-ash.s3.amazonaws.com/'
  }
  S3CustomClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(this.config);

  onChangeFile(event: any) {
    console.log(event.target.files[0])
    this.fileSelected = event.target.files[0]
  }

  async handleSendFile() {
    console.log(environment)
    console.log("handleSendFile")
    await this.S3CustomClient
      .uploadFile(this.fileSelected, this.fileSelected.type, undefined, this.fileSelected.name, "private")
      .then((data: UploadResponse) => console.log(data))
      .catch((err: any) => console.error(err))
  }
}
