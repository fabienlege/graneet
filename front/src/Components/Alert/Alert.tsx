import './Alert.css'
import { IAlertProps } from './interfaces/IAlertProps';

/**
 * Display a styled alert with background depending on alert severity
 * @param {IAlertProps} props - The props of the component.
 * @returns {React.ReactElement} - The component.
 */
const Alert: React.FC<IAlertProps> = ({ message, severity }) => (
  <div className={`alert alert-${severity}`}>
    {message}
  </div>
)

export default Alert;