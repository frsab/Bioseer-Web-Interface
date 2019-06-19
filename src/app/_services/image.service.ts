
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

/**
 * Handles image uploading to Azure
 */
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  /**
   * Creates http reference
   * @param http HttpClient reference
   */
  constructor(private http: HttpClient) { }

  /**
   * Sends image to Azure for analysis
   * @param $image Image object
   * @returns Http post request to server
   */
  analyzeImage($image): Observable<any> {
    const image = nj.images.read($image); // Reads image as numjs image object, turns it into array
    const resizeImage = nj.images.resize(image, 256, 256); // Resizes image to a 256 x 256 image in case it isnt already
    const rgbImage = resizeImage.slice(null, null, [null, 3]); // Turns from RGBA to RGB image, canvas passes in RGBA
    const translatedArray = rgbImage.tolist(); // Converts numjs array back into a normal array
    const imageForSend = [translatedArray]; // Embeds image in an array since the format is a 4d array for sending
    // Sets http options for sending
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // Sets data thats being sent
    const data = {
      // Inputs: {
      data: imageForSend
      // }
    };
    // Sends post request
    return this.http.post(environment.imageUrl, data, httpOptions);
  }

  /**
   * Converts numjs array to object
   * @param responseArray Array for converting
   * @param domObject Dom Object image is set too
   */
  convertArrayToImage(responseArray, domObject) {
    const array = nj.array(responseArray[0]); // Converts to njarray
    /// Sets width and height to 256
    domObject.width = 256;
    domObject.height = 256;
    nj.images.save(array, domObject); // Saves array to domObject
  }
}

