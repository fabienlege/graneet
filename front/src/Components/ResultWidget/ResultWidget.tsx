import React from "react";
import Alert from "../Alert/Alert";
import { IResultWidgetProps } from "./interfaces/IResultWidgetProps";
import './ResultWidget.css';

/**
 * Result Widget is designed to display a list of cities passed as props.
 * @param {IResultWidgetProps} props - The props of the component. 
 * @returns {React.ReactElement} - The component.
 */
const ResultWidget: React.FC<IResultWidgetProps> = ({ title, cities }) => {
  /**
   * Rendering component
   */
  return (
    <div className="widget resultWidget">
      <label className="title">{title}</label>
      <Alert
        severity={cities.length > 0 ? "success" : "warning"}
        message={
          cities.length > 0 ?
            `${cities.length} ville${cities.length > 1 && 's'} correspondant au texte saisi`
            : "Aucune ville correspondant au texte saisi"
        }
      />
      <ul className="cityList">
        {cities.map((city, index) => (
          <li key={index} className="cityItem">
            <div className="cityName">{city.name}</div>
            <div className="cityPostalCode">{city.postalCode}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultWidget;