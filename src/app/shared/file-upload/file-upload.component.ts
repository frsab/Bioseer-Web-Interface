import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Uppy from '@uppy/core';
import * as Dashboard from '@uppy/dashboard';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ImageService} from '../../_services/image.service';

/**
 * For file uploading to the Azure cloud
 */
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {

  processing: boolean; // If the algorithm is pr0o9cessing data
  processed = false; // If the file is finished processing
  data = []; // Holds imge data

  constructor(
    private http: HttpClient,
    private imageService: ImageService
  ) {}

  /**
   * Creates Uppy uploading and listens for upload event
   */
  ngOnInit(): void {
    // Uppy File uploading configuration
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

    // Listen for upload event
    uppy.on('upload', result => {
      const canvasObjects = Array(uppy.getFiles().length); // Creates array for canvas objects with length of images
      const dataObjects = Array(uppy.getFiles().length); // Creates array for data with length of images
      // For each image uploaded
      for (const i in uppy.getFiles()) {
        const that = this; // Reference for this since in nested class
        const image = new Image(); // Creates a new image object
        image.crossOrigin = 'Anonymous'; // Cross origin anony,ous (prevens error)
        image.src = uppy.getFiles()[i].preview; // Gets data and sets it to source of the image
        // Once the image object is loaded
        image.onload = () => {
          // TODO Refactor into a service
          canvasObjects[i] = document.createElement('canvas'); // Creates new <canvas>
          dataObjects[i] = document.createElement('p'); // Creates new <p>
          this.processing = true; // Sets image processing status to true to display loading animation
          // Analyzes image
          this.imageService.analyzeImage(image).subscribe((res) => {
            dataObjects[i].innerHTML = JSON.stringify(res[2]); // Sets html of the <p> to a stringified return object
            that.processed = true; // Sets processed to true
            that.imageService.convertArrayToImage(res[0], canvasObjects[i]); // Creates a new canvas ibject with processed image
            canvasObjects[i].classList.add('col-lg-3');
            canvasObjects[i].classList.add('col-md-12');
            dataObjects[i].classList.add('col-lg-3');
            dataObjects[i].classList.add('col-md-12');
            // Adds elements to DOm
            document.getElementById('for-appending').appendChild(canvasObjects[i]);
            document.getElementById('for-appending').appendChild(dataObjects[i]);
            that.processing = false;
          });
        };
      }
      uppy.reset(); // Reset the uppy dashboard component
    });
  }
}
