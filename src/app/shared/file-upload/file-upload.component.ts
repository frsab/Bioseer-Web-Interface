import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Uppy from '@uppy/core';
import * as Dashboard from '@uppy/dashboard';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ImageService} from '../../_services/image.service';
// import * as math from 'mathjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    const uppy = Uppy({
      debug: true,
      autoProceed: false,
      restrictions: {
        maxFileSize: 1000000,
        allowedFileTypes: ['.jpg']
      },
      allowMultipleUploads: false,
    })
      .use(Dashboard, {
        inline: true,
        target: '#drag-drop-area',
        replaceTargetContent: true,
        showProgressDetails: true,
        note: 'Images Only',
        height: 470,
        browserBackButtonClose: true,
        allowMultipleUploads: false,
        showLinkToFileUploadResult: false
      });

    uppy.on('upload', result => {
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      console.log(uppy.getFiles());
      image.src = uppy.getFiles()[0].preview;
      image.onload = () => {
        const $original = document.getElementById('original');
        this.imageService.analyzeImage(image).subscribe((res) => {
          console.log(res);
          this.imageService.convertArrayToImage(res[0], $original);
          uppy.reset();
        });
      };
    });

  }


  async test2() {
    let response;
    // const canvas = document.getElementById('canvas');
    // const ctx = canvas.getContext('2d');

    const image = new Image(); // Using optional size for image
    image.crossOrigin = 'Anonymous';

    // image.onload = drawImageActualSize; // Draw when image has loaded

// Load an image of intrinsic size 300x227 in CSS pixels
    image.src = 'assets/test.jpg';

    image.onload = () => {
      const $original = document.getElementById('original');
      this.imageService.analyzeImage(image).subscribe((res) => {
        response = res;
        this.imageService.convertArrayToImage(response[0], $original);
      });
      // $image = nj.images.read(image);
      //
      // // let newArray = imageArray.slice(null, null, 3)
      // let slicedArray = $image.slice(null, null, [null, 3]);
      // slicedArray.dtype = 'float64';
      // // console.log(slicedArray.shape);
      // let testimageArray = slicedArray.tolist();
      // console.log([testimageArray]);
      //
      // const uri = 'http://localhost:1337/3966065b-6d05-4777-9a8a-1861f78521bc.westus.azurecontainer.io/score';
      //
      // const options = {
      //   uri,
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // Authorization: 'Bearer ' + apiKey,
      //   },
      // };
      //
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json'
      //   })
      // };
      //
      //
      // const data = {
      //   // Inputs: {
      //   data: [testimageArray]
      //   // }
      // };
      //
      //
      // // console.log(jsonData);
      //
      // that.http.post(options.uri, data, httpOptions).subscribe((res) => {
      //   console.log(res);
      // });
    };


  }
}
