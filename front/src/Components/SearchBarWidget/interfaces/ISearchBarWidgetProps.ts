/**
 * Props for the SearchBar component
 */
export interface ISearchBarWidgetProps {
  /**
   * Callback function that is called when the search is submited.
   * @param {string} searchTerm The value of the search field submited.
   */
  onSubmit: (searchTerm: string) => void;

  /**
   * Disables the search field if app curently loading datas.
   * @default: false
   */
  isLoading?: boolean;
}