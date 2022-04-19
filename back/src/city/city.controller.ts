import { Controller, Get, Inject } from '@nestjs/common';
import { CityService } from './city.service';
import { ICity } from './interfaces/ICity';

@Controller('city')
export class CityController {
  constructor(private cityService: CityService) { }

  /**
   * root endpoint who returns a list of 100 random cities
   * @returns {ICity} List of cities
   * 
   */
  @Get()
  async root(): Promise<ICity[]> {
    return this.cityService.getFirstsCities();
  }

}
