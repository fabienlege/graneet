/**
 * The city object stored in database and returned to the client
 */
export interface ICity {
  /**
   * Internal database id
   * Could be null if the city is not stored in the database
   */
  id: string;

  /**
   * City name
   */
  name: string;

  /**
   * City postal code
   * @example 75000
   */
  postalCode: string;

  /**
   * French city code
   * @exeample 10002
   */
  cityCode: string;
}
