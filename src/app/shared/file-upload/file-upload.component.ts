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
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
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
}
