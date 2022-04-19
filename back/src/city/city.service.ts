import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { getConnection, ILike, Like, Repository } from 'typeorm';
import { City } from './city.entity';
import { IApiCity } from './interfaces/IApiCity';
import { ICity } from './interfaces/ICity';

@Injectable()
export class CityService {
  constructor(private configService: ConfigService, @InjectRepository(City) private cityRepository: Repository<City>) { }

  /**
   * Return the 10 firsts cities from the database.
   * This method is used for the tests.
   * @returns {ICity[]} list of cities
   */
  async getFirstsCities(): Promise<ICity[]> {
    return this.cityRepository.find({ order: { name: 'ASC' }, take: 10 });
  }

  /**
   * Retrive the full city list online from the gouv api and insert it into the database
   * @returns {Promise<boolean>} true if the cities were successfully inserted
   */
  async syncCities(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Verify if JSON_DATASET_URL is defined in the config file
      if (!this.configService.get('JSON_DATASET_URL')) {
        throw new Error('JSON_DATASET_URL is not defined in the config file');
      }

      // Retrieve the full city list online from the gouv api
      axios.get(this.configService.get('JSON_DATASET_URL')).then(response => {
        // Retrieve cities from api response
        const cities = response.data as IApiCity[];

        // Convert IApiCities to ICity
        const cityEntities: ICity[] = cities.map(city => ({ cityCode: city.codeCommune, name: city.nomCommune, postalCode: city.codePostal } as ICity));

        // Prepare a promises array to strore the insert queries promises
        const transactions = new Array<Promise<any>>();

        // Insert or update cities into the database
        cityEntities.forEach(city => {
          transactions.push(
            this.cityRepository.createQueryBuilder()
              .insert()
              .into(City)
              .values(city)
              .orUpdate({ conflict_target: ['cityCode'], overwrite: ['postalCode', 'name'] })
              .execute()
          )
        });

        // wait for all the promises to be resolved
        Promise.all(transactions).then(() => {
          resolve(true);
        }).catch(reject)
      })
        .catch(reject);

    });
  }

  /**
   * Retrieve cities from the database with the specified search parameters
   * @param {string} searchTerm the search term to filter the cities
   * @returns {Promise<ICity[]>} list of matching cities
   */
  async search(searchTerm: string): Promise<ICity[]> {
    return this.cityRepository.find({
      where: [
        { name: ILike(`%${searchTerm}%`) },
        { postalCode: ILike(`%${searchTerm}%`) },
      ],
      order: { name: 'ASC' },
      take: 100,
    });
  }
}
