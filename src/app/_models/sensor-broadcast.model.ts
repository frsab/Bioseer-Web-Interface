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
  imageData: { // Images in broadcast
    images: [[]] // Image array of arrays
    timeStamp: string;
    cameraData: string;
  };
  meta: {
    algae: number;
    rocks: number
    soil: number;
    nonaquaticplant: number;
    benthicSpecies: number;
    humanPollution: number;
    fish: number;
  };
}
