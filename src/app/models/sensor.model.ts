export class SensorModel {
  sensorId: string;
  sensorName: string;
  ownerId: string;
  startTime: string;
  endTime: string;
  location: [
    {
      lat: number,
      long: number
    },
    {
      lat: number,
      long: number
    },
    {
      lat: number,
      long: number
    },
    {
      lat: number,
      long: number
    }
  ]; // 4 point array to draw out bounding box
  currentLocation: {
    lat: number,
    long: number
  }; // Latitutde and Longitude
  zoneID: string;
  zoneName: string;
  status: string;
  dataRaw: [
    {
    images: [[]]; // Image array of arrays
    timestamps: string; // ISO
    location: [number]; // 4 point array to draw out bounding box
    }
  ];
  dataSegmented: [
    {
      image: [[]]; // Image array of arrays
      timestamp: string; // ISO
      location: [number]; // 4 point array to draw out bounding box
      meta: {
        // Info about various fields
      }
    }
  ];
  dataSpecies: {
    speciesNumber: number;
    speciesImages: [[]];
    unknownSpeciesNumber: number;
    unknownSpeciesImages: [[]];
  };
}
