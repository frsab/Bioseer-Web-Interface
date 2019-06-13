import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BingMapsService {

  /**
   * Creates a new circle pushpin
   * @param location Microsoft Maps Location Object
   * @param radius Radius in pixels of pushpin
   * @param fillColor Fillcolor in RBGA
   * @param strokeColor Stroke Color in black
   * @param strokeWidth Width of stroke
   * @param sensorName Name of sensor for title
   * @param sensorId ID of sensor for subtitle
   */
  // @ts-ignore
  createCirclePushpin(location: Microsoft.Maps.Location, radius, fillColor, strokeColor, strokeWidth, sensorName, sensorId) {
    strokeWidth = strokeWidth || 0;

    // Create an SVG string of a circle with the specified radius and color, iunjects sensor ID into circle
    // language=HTML
    const svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="', (radius * 2),
      '" height="', (radius * 2), '"><circle cx="', radius, '" cy="', radius, '" r="',
      (radius - strokeWidth), '" stroke="', strokeColor, '" stroke-width="', strokeWidth, '" fill="', fillColor, '"/>' +
      '<text x="18" y="43" font-family="sans-serif" font-size="20" fill="black" font-weight="900">' + sensorName + '</text>' +
      '</svg>'];

    // Create a pushpin from the SVG and anchor it to the center of the circle.
    // @ts-ignore
    return new Microsoft.Maps.Pushpin(location, {
      title: sensorName,
      subTitle: sensorId,
      icon: svg.join(''),
      // @ts-ignore
      anchor: new Microsoft.Maps.Point(radius, radius),
      // htmlContent: '<h1>Test</h1>'
    });
  }

  // @ts-ignore
  createRectangle(location: Array<Microsoft.Maps.Location>, fillColor, strokeColor, strokeWidth, map) {
    // @ts-ignore
    const polygon = new Microsoft.Maps.Polygon(location, {
      fillColor: fillColor,
      strokeColor: strokeColor,
      strokeThickness: strokeWidth
    });
    map.entities.push(polygon)
  }

  createArrayOfLocations(location: Array<number>) {
    let groupsOfCoordinates: Array<Array<number>> = [];
    // @ts-ignore
    let groupsOfLocations: Array<any> = [];
    for (let i = 0; i < location.length; i+=2) {
      groupsOfCoordinates.push(location.slice(i, i+2));
    }
    for (let i = 0; i < groupsOfCoordinates.length; i++) {
      // @ts-ignore
      groupsOfLocations.push(new Microsoft.Maps.Location(groupsOfCoordinates[i][0], groupsOfCoordinates[i][1]))
    }
    return groupsOfLocations;
  }

  /**
   * Update Pin Position Based on Sensor ID
   * @param coordX New x Coordinate
   * @param coordY new y coordinate
   * @param pushpinID SensorID
   * @param sensorName Name of the sensor
   */
  handlePushPin(coordX: number, coordY: number, pushpinID: string, sensorName: string, map) {
    for (let i = map.entities.getLength() - 1; i >= 0; i--) {
      const pushpin = map.entities.get(i);
      // @ts-ignore
      if (pushpin instanceof Microsoft.Maps.Pushpin && pushpin.getSubTitle() === String(pushpinID)) {
        // @ts-ignore
        pushpin.setLocation(new Microsoft.Maps.Location(coordX, coordY));
        return;
      }
    }

    // @ts-ignore
    const location = new Microsoft.Maps.Location(coordX, coordY, map);
    const pin = this.createCirclePushpin(location, 35, 'rgb(252, 252, 252)', 'rgb(96, 96, 96)', 8, sensorName, pushpinID);
    map.entities.push(pin);
  }
}
