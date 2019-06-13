import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Uppy from '@uppy/core';
import * as FileInput from '@uppy/file-input';
import * as XHRUpload from '@uppy/xhr-upload';
import * as ProgressBar from '@uppy/progress-bar';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  ngOnInit(): void {

    // @ts-ignore
    const uppy = new Uppy({ debug: true, autoProceed: true });
    uppy.use(FileInput, { target: '.UppyForm', replaceTargetContent: true });
    uppy.use(XHRUpload, {
      endpoint: 'http://localhost:1337///api2.transloadit.com',
      formData: true,
      fieldName: 'files[]'
    });
    uppy.use(ProgressBar, {
      target: 'body',
      fixed: true,
      hideAfterFinish: false
    });

    console.log('Uppy with Formtag and XHRUpload is loaded')
  }


}
