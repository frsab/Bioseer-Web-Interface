/**
 * Handles image uploading
 */
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  analyzeImage($image): Observable<any> {
    const image = nj.images.read($image);
    const resizeImage = nj.images.resize(image, 256, 256);
    const rgbImage = resizeImage.slice(null, null, [null, 3]);
    const translatedArray = rgbImage.tolist();
    const imageForSend = [translatedArray];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const data = {
      // Inputs: {
      data: imageForSend
      // }
    };
    return this.http.post(environment.imageUrl, data, httpOptions);
  }

  convertArrayToImage(responseArray, domObject) {
    const array = nj.array(responseArray[0]);
    domObject.width = 256;
    domObject.height = 256;
    nj.images.save(array, domObject);
  }
}

