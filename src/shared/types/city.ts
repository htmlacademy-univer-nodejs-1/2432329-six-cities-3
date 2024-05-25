import { CityName } from './city-name.enum';
import { Location } from './location.type';

export type City = {
  name: CityName;
  location: Location;
};
