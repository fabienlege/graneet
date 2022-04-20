import { ICity } from "../../../Redux/Services/City/Interfaces/ICity";

/**
 * Properties of the ResultWidget component
 */
export interface IResultWidgetProps {
  /**
   * The title to display at the top of the widget
   */
  title: string;

  /**
   * The cities to display, matching the search term.
   * If no results are found, an empty array must be set.
   */
  cities: ICity[];
}