/**
 * The city object delivered by the data.gouv API
 */
export interface IApiCity {
  /**
   * Postal code
   * @example 75000
   */
  codePostal: string;

  /**
   * French city code
   * @example 10002
   */
  codeCommune: string;

  /**
   * City name
   * @example Paris
   */
  nomCommune: string;

  /**
   * label, not used in the application
   */
  libelleAcheminement: string;
}