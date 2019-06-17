import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Uppy from '@uppy/core';
import * as Dashboard from '@uppy/dashboard';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import * as math from 'mathjs';

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
    const reader = new FileReader();

    // @ts-ignore
    //   const uppy = new Uppy({ debug: true, autoProceed: true });
    //   uppy.use(FileInput, { target: '.UppyForm', replaceTargetContent: true });
    //   uppy.use(XHRUpload, {
    //     endpoint: 'http://localhost:1337/3966065b-6d05-4777-9a8a-1861f78521bc.westus.azurecontainer.io/score',
    //     formData: true,
    //     fieldName: 'data[]',
    //     metaFields: [],
    //     headers: {}
    //   });
    //   console.log(uppy.state.files);
    //   // uppy.on('upload-success', (file, response) => {
    //   //   console.log(response);
    //   // });
    //   uppy.use(ProgressBar, {
    //     target: 'body',
    //     fixed: true,
    //     hideAfterFinish: false
    //   });
    //
    // }

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

  imageArray;

  async test2() {
    let that = this;
    let $image;
    let bracketsImageArray;
    let testArray;
    // const canvas = document.getElementById('canvas');
    // const ctx = canvas.getContext('2d');

    const image = new Image(); // Using optional size for image
    image.crossOrigin = 'Anonymous';

    // image.onload = drawImageActualSize; // Draw when image has loaded

// Load an image of intrinsic size 300x227 in CSS pixels
    image.src = 'assets/test.jpg';

    image.onload = () => {
      $image = nj.images.read(image);

      // let newArray = imageArray.slice(null, null, 3)
      let slicedArray = $image.slice(null, null, [null, 3]);
      slicedArray.dtype = 'float64';
      // console.log(slicedArray.shape);
      let testimageArray = slicedArray.tolist();
      console.log([testimageArray]);
      var size = 150;
      let W = 265;
      let H = 265;
      const $original = document.getElementById('original');
      $original.width = W; $original.height = H;
      nj.images.save(slicedArray, $original);

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


      const data = {
        // Inputs: {
        data: [testimageArray]
        // }
      };


      // console.log(jsonData);

      that.http.post(options.uri, data, httpOptions).subscribe((res) => {
        console.log(res);
      });
    };

    testArray = nj.ones([1, 256, 256, 3], 'float64');
    console.log(testArray.shape);
    let testList = testArray.tolist();
    console.log(testList);


  }
}
