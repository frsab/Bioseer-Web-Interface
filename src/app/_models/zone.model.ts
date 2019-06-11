export class ZoneModel {
  zoneId: string;
  zoneName: string;
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
}
