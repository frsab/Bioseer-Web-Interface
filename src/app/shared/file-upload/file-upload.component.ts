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

  processing: boolean; // If the algorithm is pr0o9cessing data
  processed = false;
  data = [];

  constructor(
    private http: HttpClient,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    const uppy = Uppy({
      debug: true,
      autoProceed: false,
      restrictions: {
        minNumberOfFiles: 1,
        maxNumberOfFiles: 0,
        maxFileSize: 1000000,
        allowedFileTypes: ['.jpg']
      },
      allowMultipleUploads: false,
    })
      .use(Dashboard, {
        inline: true,
        width: '100%',
        target: '#drag-drop-area',
        replaceTargetContent: true,
        showProgressDetails: true,
        note: 'Images Only',
        browserBackButtonClose: true,
        showLinkToFileUploadResult: false,
        proudlyDisplayPoweredByUppy: false
      });

    uppy.on('upload', result => {
      console.log(uppy.getFiles());
      let canvasObjects = Array(uppy.getFiles().length);
      let dataObjects = Array(uppy.getFiles().length);
      console.log(uppy.getFiles());
      for (const i in uppy.getFiles()) {
        const that = this;
        const image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = uppy.getFiles()[i].preview;
        image.onload = () => {
          // TODO I know I can do this a better way at some point in the future
          canvasObjects[i] = document.createElement('canvas');
          dataObjects[i] = document.createElement('p');
          this.processing = true;
          this.imageService.analyzeImage(image).subscribe((res) => {
            dataObjects[i].innerHTML = JSON.stringify(res[2]);
            that.processed = true;
            that.imageService.convertArrayToImage(res[0], canvasObjects[i]);
            canvasObjects[i].classList.add('col-lg-3');
            canvasObjects[i].classList.add('col-md-12');
            dataObjects[i].classList.add('col-lg-3');
            dataObjects[i].classList.add('col-md-12');
            document.getElementById('for-appending').appendChild(canvasObjects[i]);
            document.getElementById('for-appending').appendChild(dataObjects[i]);
            that.processing = false;
          });
        };
      }
      uppy.reset();


    });

  }
}
