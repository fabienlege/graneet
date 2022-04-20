import React from 'react';
import './App.css';
import { ResultWidget, SearchBarWidget } from './Components';
import { useLazySearchCityQuery } from './Redux/Services/City/CityApi';

const App: React.FC = () => {
  /**
   * Initialize the search query
   */
  const [trigger, cityState] = useLazySearchCityQuery();

  /**
   * handle search submission
   */
  const onSubmit = (newValue: string) => {
    trigger(newValue)
  }

  /**
   * Rendering Application
   */
  return (
    <div className="app">
      <SearchBarWidget onSubmit={onSubmit} isLoading={cityState.isLoading} />
      <ResultWidget title="Villes de métropole" cities={cityState.data?.metropolis || []} />
      <ResultWidget title="Villes d'outre-mer" cities={cityState.data?.overseas || []} />
    </div>
  );
}

export default App;
