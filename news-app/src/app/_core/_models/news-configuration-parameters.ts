import { CategoryEnum } from './category-enum.enum';
import { LanguageEnum } from './language-enum.enum';
import { CountryEnum } from './country-enum.enum';

export interface NewsConfigurationParameters {
  category: CategoryEnum;
  language: LanguageEnum;
  country: CountryEnum;
}
