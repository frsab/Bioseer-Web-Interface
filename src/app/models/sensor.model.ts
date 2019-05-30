export class SensorModel {
  sensorId: string;
  ownerId: string;
  startTime: string;
  endTime: string;
  location: [number]; // 4 point array to draw out bounding box
  zoneID: string;
  zoneName: string;
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
