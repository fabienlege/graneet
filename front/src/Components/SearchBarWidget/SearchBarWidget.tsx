import { useState } from 'react';
import { ISearchBarWidgetProps } from './interfaces/ISearchBarWidgetProps';
import './SearchBarWidget.css';

/**
 * Display the search bar
 * @param {ISearchBarWidgetProps} props - The props of the component.
 * @returns {React.ReactElement} - The component.
 */
const SearchBarWidget: React.FC<ISearchBarWidgetProps> = ({ onSubmit, isLoading }) => {
  /**
   * initialize State for the search bar value and dispatch
   */
  const [value, setValue] = useState('');

  /**
   * Handle onChange event for the search bar
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  /**
   * handle onSubmit event for the search form
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value);
  };

  /**
   * If loading, display hide the search input
   */
  if (isLoading) {
    return (
      <div className="widget searchBarWidget">
        <label className="title searchLabel">Recherche en cours...</label>
      </div>
    );
  }

  /**
   * Rendering component
   */
  return <form className="widget searchBarWidget" onSubmit={handleSubmit}>
    <label className="title searchLabel" htmlFor="searchInput">Je recherche ...</label>
    <input type="search" id="searchInput" autoFocus className='searchInput title' value={value} onChange={handleChange} placeholder='... Une ville, un code postal' />
  </form>
}

export default SearchBarWidget;