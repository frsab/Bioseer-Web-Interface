import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Uppy from '@uppy/core';
import * as Dashboard from '@uppy/dashboard';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as math from 'mathjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // const reader = new FileReader();
    //
    // // @ts-ignore
    // //   const uppy = new Uppy({ debug: true, autoProceed: true });
    // //   uppy.use(FileInput, { target: '.UppyForm', replaceTargetContent: true });
    // //   uppy.use(XHRUpload, {
    // //     endpoint: 'http://localhost:1337/3966065b-6d05-4777-9a8a-1861f78521bc.westus.azurecontainer.io/score',
    // //     formData: true,
    // //     fieldName: 'data[]',
    // //     metaFields: [],
    // //     headers: {}
    // //   });
    // //   console.log(uppy.state.files);
    // //   // uppy.on('upload-success', (file, response) => {
    // //   //   console.log(response);
    // //   // });
    // //   uppy.use(ProgressBar, {
    // //     target: 'body',
    // //     fixed: true,
    // //     hideAfterFinish: false
    // //   });
    // //
    // // }
    //
    // const uppy = Uppy({
    //   debug: true,
    //   autoProceed: false,
    //   restrictions: {
    //     maxFileSize: 1000000,
    //     // maxNumberOfFiles: 3,
    //     // minNumberOfFiles: 2,
    //     allowedFileTypes: ['image/*']
    //   }
    // })
    //   .use(Dashboard, {
    //     inline: true,
    //     target: '#drag-drop-area',
    //     replaceTargetContent: true,
    //     showProgressDetails: true,
    //     note: 'Images Only',
    //     height: 470,
    //     metaFields: [
    //       {id: 'name', name: 'Name', placeholder: 'file name'},
    //       {id: 'caption', name: 'Caption', placeholder: 'describe what the image is about'}
    //     ],
    //     browserBackButtonClose: true
    //   });
    //
    // uppy.on('complete', result => {
    //   console.log('successful files:', result.successful);
    //   console.log('failed files:', result.failed);
    // });
    //
    // uppy.on('file-added', (file) => {
    //   let image = new Image();
    //   console.log(file.data);
    //   image = img.src;
    //   const c = document.getElementById('myCanvas');
    //   const ctx = c.getContext('2d');
    //   ctx.drawImage(image, 0, 0);
    //   const imgData = ctx.getImageData(0, 0, ctx.width, ctx.height).data;
    //   console.log(imgData);
    //   // reader.readAsText(file.data);
    //   // reader.onloadend = () => {
    //   //   const base64data = reader.result;
    //   //   console.log(base64data);
    //   // };
    //   // const apiKey = '<your-api-key>';
    //   const data = imgData;
    //
    //
    //   this.http.post(options.uri, JSON.stringify(data), options.headers).subscribe((res) => {
    //     console.log(res);
    //   });
    //
    //
    //   // req(options, (err, res, body) => {
    //   //   if (!err && res.statusCode === 200) {
    //   //     console.log(body);
    //   //   } else {
    //   //     console.log('The request failed with status code: ' + res.statusCode);
    //   //   }
    //   // });
    // });
  }

  async test2() {
    let that = this;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const image = new Image(60, 45); // Using optional size for image
    image.crossOrigin = 'Anonymous';

    image.onload = drawImageActualSize; // Draw when image has loaded

// Load an image of intrinsic size 300x227 in CSS pixels
    image.src = 'http://localhost:1337/mw1.google.com/ges/dd/images/NASA_OCEANDATA_sample.png';

    function drawImageActualSize() {
      // Use the intrinsic size of image in CSS pixels for the canvas element
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;

      // Will draw the image as 300x227, ignoring the custom size of 60x45
      // given in the constructor
      ctx.drawImage(this, 0, 0);

      // To use the custom size we'll have to specify the scale parameters
      // using the element's width and height properties - lets draw one
      // on top in the corner:
      ctx.drawImage(this, 0, 0, this.width, this.height);
      const imageData = ctx.getImageData(0, 0, 256, 256);
      const a = math.ones([256, 256, 3]);
      // console.log(a.shape);
      console.log(imageData);
      let p = 0;
      console.log(imageData.data)
      for (let r = 0; r < imageData.height; r++) {
        for (let c = 0; c < imageData.width; c++) {
          for (let x =0; x < 3; x++) {
            a[r, c, x] = imageData.data[p++];
          }
          p++;
        }
      }
      console.log(a);
      // for (let i = 0; i += 2; i < 256) {
      //   data.push(imageData.data[i], imageData.data[i + 1]);
      // }

      const uri = 'http://localhost:1337/3966065b-6d05-4777-9a8a-1861f78521bc.westus.azurecontainer.io/score';

      const options = {
        uri,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: 'Bearer ' + apiKey,
        },
      };

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      const jsonData = { a };


      // console.log(jsonData);

      that.http.post(options.uri, JSON.stringify(jsonData), httpOptions).subscribe((res) => {
        console.log(res);
      });
    }


  }
}
