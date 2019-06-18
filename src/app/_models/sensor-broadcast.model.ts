export class SensorBroadcastModel {
  sensorId: string;
  sensorName: string;
  ownerId: string;
  currentLocation?: {
    lat: number,
    long: number
  }; // Latitutde and Longitude
  zoneID: string;
  status: string;
  imageData: [
    { // Images in broadcast
      images: string; // Image array of arrays
      meta: {
        algae: number;
        rocks: number
        soil: number;
        nonaquaticplant: number;
        benthicSpecies: number;
        humanPollution: number;
        fish: number;
      };
      timeStamp: string;
      cameraData: string;
  }];

}
