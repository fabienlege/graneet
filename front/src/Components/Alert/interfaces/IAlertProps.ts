/**
 * Props for the Alert component
 */
export interface IAlertProps {
  /**
   * The message to display in the alert component.
   */
  message: string;

  /**
   * The type (severity) of alert to display.
   */
  severity: 'success' | 'warning';
}