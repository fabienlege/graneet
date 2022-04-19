import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityController } from './city.controller';
import { City } from './city.entity';
import { CityService } from './city.service';

describe('CityController', () => {
  let controller: CityController;

  /**
   * Mock TypeOrm functions
   */
  const find = jest.fn().mockReturnValue([
    { cityCode: '123', name: 'Paris', postalCode: '75000' },
    { cityCode: '321', name: 'Bayonne', postalCode: '64100' }
  ]);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService, {
        provide: getRepositoryToken(City),
        useFactory: () => ({
          find
        })
      }],
      imports: [ConfigModule],
      controllers: [CityController]
    }).compile();

    controller = module.get<CityController>(CityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return cities', async () => {
    /**
     * Retrieve 10 first cities from database
     * expect only 2 cities here due to mock function at the beginning of this file
     */
    const cities = await controller.root();

    expect(cities.length).toBe(2);
    expect(cities[0].name).toBe('Paris');
    expect(cities[1].name).toBe('Bayonne');

  })
});
