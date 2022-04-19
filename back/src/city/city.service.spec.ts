import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../config/db.config';
import { Repository } from 'typeorm';
import { City } from './city.entity';
import { CityService } from './city.service';
import typeorm = require('typeorm')

describe('CityService', () => {
  let service: CityService;

  //TypeORM Mocks 
  const insert = jest.fn().mockReturnThis()
  const into = jest.fn().mockReturnThis()
  const values = jest.fn().mockReturnThis()
  const orUpdate = jest.fn().mockReturnThis()
  const execute = jest.fn().mockReturnThis()
  const createQueryBuilder = jest.fn().mockReturnValue({
    insert,
    into,
    values,
    orUpdate,
    execute,
  } as unknown as typeorm.QueryBuilder<City>);

  const find = jest.fn().mockReturnValue([
    { cityCode: '123', name: 'Paris', postalCode: '75000' },
    { cityCode: '321', name: 'Bayonne', postalCode: '64100' }
  ])

  /**
   * Initialise module
   */
  beforeAll(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService, {
        provide: getRepositoryToken(City),
        useFactory: () => ({
          createQueryBuilder,
          find
        })
      }],
      imports: [ConfigModule]
    }).compile();

    service = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();

  })

  it("should be insert cities from gouv api", async () => {
    // Import must return true if import succeed
    expect(await service.syncCities()).toBe(true);

    /**
     * Check if queryBuilder was called correctly
     * The number of times the function was called is equal to the number of cities in the gouv api response
     */
    expect(insert).toHaveBeenCalledTimes(35700);
    expect(into).toHaveBeenCalledTimes(35700);
    expect(values).toHaveBeenCalledTimes(35700);
    expect(orUpdate).toHaveBeenCalledTimes(35700);
    expect(execute).toHaveBeenCalledTimes(35700);

  })

  it("Should retrive some cities", async () => {
    /**
     * Get must return a list of 10 firsts cities.
     * Here there are only 2 cities due to the mocked find function at the top of this file.
     */
    const cities = await service.getFirstsCities();
    expect(find).toBeCalledTimes(1);
    expect(cities).toHaveLength(2);
    expect(cities[0].name).toBe('Paris');
    expect(cities[0].postalCode).toBe('75000');
    expect(cities[0].cityCode).toBe('123');

    expect(cities[1].name).toBe('Bayonne');
    expect(cities[1].postalCode).toBe('64100');
    expect(cities[1].cityCode).toBe('321');

  });

  it("should return matching result for given search term", async () => {
    /**
     * Search for Paris
     * Here, we retrieve 2 cities, one for Paris and one for Bayonne due to the mocked find function at the top of this file
     */
    const matchingCities = await service.search("paris");

    expect(matchingCities).toHaveLength(2);
    expect(matchingCities[0].name).toBe('Paris');
    expect(matchingCities[0].postalCode).toBe('75000');
    expect(matchingCities[0].cityCode).toBe('123');

    expect(matchingCities[1].name).toBe('Bayonne');
    expect(matchingCities[1].postalCode).toBe('64100');
    expect(matchingCities[1].cityCode).toBe('321');

  })
});
