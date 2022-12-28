import React from 'react';
import Busca from './components/Busca';
import Table from './components/Table';
import PlanetProvider from './context/PlanetProvider';

function App() {
  return (
    <div>
      <PlanetProvider>
        <Busca />
        <Table />
      </PlanetProvider>
    </div>
  );
}

export default App;
