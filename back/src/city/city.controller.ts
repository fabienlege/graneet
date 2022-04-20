import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
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

  /**
   * Search a city by its name or postal code
   * @param {string} q : the query string to search for, passed as GET parameter
   * @returns {ICity[]} List of cities
   */
  @Get('search')
  async search(@Query('q') q: string): Promise<ICity[]> {
    return this.cityService.search(q);
  }

}
