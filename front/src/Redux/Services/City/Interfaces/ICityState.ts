import { ICity } from "./ICity";

/**
 * The city state object
 */
export interface ICityState {
  /**
   * Metropolis cities matching the search
   */
  metropolis: ICity[];

  /**
   * ouverseas cities matching the search
   */
  overseas: ICity[];
}