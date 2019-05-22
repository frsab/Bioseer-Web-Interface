import { Injectable, Inject } from '@angular/core';
// TODO Refactor to get rid of this Document import, it's deprecated
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from './window.service';

@Injectable({
  providedIn: 'root'
})
export class BingApiLoaderService {
  private promise;
  private url = 'https://www.bing.com/api/maps/mapcontrol?callback=__onBingLoaded&branch=release';

  constructor(@Inject(DOCUMENT) private documentRef: Document, @Inject(WINDOW) private windowRef: Window) {}

  public load() {
    // First time 'load' is called?
    if (!this.promise) {

      // Make promise to load
      this.promise = new Promise( resolve => {

        // Set callback for when bing maps is loaded.
        /* tslint:disable:no-string-literal */
        this.windowRef['__onBingLoaded'] = (ev) => {
          resolve('Bing Maps API loaded');
        };

        // const node = document.createElement('script');
        const node = this.documentRef.createElement('script');
        node.src = this.url;
        node.type = 'text/javascript';
        node.async = true;
        node.defer = true;
        // documentRef.getElementsByTagName('head')[0].appendChild(node);
        this.documentRef.getElementsByTagName('head')[0].appendChild(node);
      });
    }

    // Always return promise. When 'load' is called many times, the promise is already resolved.
    return this.promise;
  }
}
