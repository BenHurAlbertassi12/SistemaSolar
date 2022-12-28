import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]); // linha 23
  const [filteredData, setFilterData] = useState([]); // linha 28, 56
  const [titleFilter, setTitleFilter] = useState(''); // linha 39, 59 e 62
  const [numericFilters, setNumericFilter] = useState([]); // linha 41, 59, 79, 84, 86, 94 e 79, 93
  const [operator, setOperator] = useState('maior que');
  const [value, setValue] = useState(0);
  // const [filterType, setFilterType] = useState('population');

  const [newFilterColum] = useState([
    'population',
    'orbital_period',
    'diameter',
    'surface_water',
    'rotation_period',
  ]);// linha 81
  const [filtroColuna, setFilterColum] = useState(newFilterColum[0]);
  const [options, setOptions] = useState([]);
  console.log(options);

  useEffect(() => {
    const fetchPlanet = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json(); // teste para ver se a coluna funfa antes: const data = ...
      // console.log(results);
      setData(results);
      setFilterData(results);
    };
    fetchPlanet();
  }, []);

  const handleTitleFilter = useCallback(({ target }) => {
    setTitleFilter(target.value.toLowerCase());
  }, []);

  useEffect(() => {
    const filterNome = data.filter(
      (planet) => planet.name.toLowerCase().includes(titleFilter),
    );

    const resultArray = numericFilters
      .reduce((accumulator, filter) => accumulator.filter((planet) => {
        switch (filter.operator) {
        case 'maior que':
          return planet[filter.filtroColuna] > Number(filter.value);
        case 'menor que':
          return planet[filter.filtroColuna] < Number(filter.value);
        case 'igual a':
          return planet[filter.filtroColuna] === (filter.value);
        default:
          return true;
        }
      }), filterNome);

    setFilterData(resultArray);
  }, [titleFilter, numericFilters, data]);

  const handleNumberFilter = useCallback(() => {
    const newNumberFilter = {
      filtroColuna, operator, value,
    };
    setNumericFilter([...numericFilters, newNumberFilter]);
  }, [numericFilters, operator, value, filtroColuna]);

  useEffect(() => {
    setOptions(newFilterColum.filter(
      (element) => !numericFilters.find((item) => item.filtroColuna === element),
    ));
  }, [numericFilters, newFilterColum]);

  useEffect(() => {
    setFilterColum(options[0]);
  }, [options]);

  const handleDeleteFilter = useCallback((index) => {
    setNumericFilter(
      numericFilters.filter((item, itemIndex) => itemIndex !== index),
    );
  }, [numericFilters]);

  const handleSetColuna = useCallback(({ target }) => {
    setFilterColum(target.value);
  }, []);

  const handleSetOperator = useCallback(({ target }) => {
    setOperator(target.value);
  }, []);

  const handleSetValue = useCallback(({ target }) => {
    setValue(target.value);
  }, []);

  const handleDeleteAll = useCallback(() => {
    setNumericFilter([]);
    setData(data);
  }, [data]);

  // const seiLa = useCallback(({ target }) => {
  //   setFilterColum(target.value);
  // }, []);

  const contextValue = useMemo(() => ({
    data,
    filteredData,
    titleFilter,
    numericFilters,
    options,
    operator,
    value,
    filtroColuna,
    newFilterColum,
    handleSetColuna,
    // seiLa,
    handleDeleteAll,
    setData,
    setFilterData,
    setTitleFilter,
    setNumericFilter,
    setOptions,
    setOperator,
    setValue,
    handleDeleteFilter,
    handleNumberFilter,
    handleTitleFilter,
    setFilterColum,
    handleSetOperator,
    handleSetValue,
    // setFilterType,
    // handleColum,

  }), [
    data,
    filteredData,
    titleFilter,
    numericFilters,
    options,
    operator,
    value,
    filtroColuna,
    newFilterColum,
    // seiLa
    handleSetColuna,
    handleDeleteAll,
    handleSetOperator,
    handleSetValue,
    setData,
    setFilterData,
    setTitleFilter,
    setNumericFilter,
    setOptions,
    setOperator,
    setValue,
    handleDeleteFilter,
    handleNumberFilter,
    handleTitleFilter,
    setFilterColum,
    // setFilterType,
    // handleColum,
    // handleTitleFilter,
  ]);
  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
  return (
    <PlanetContext.Provider
      value={ contextValue }
    >
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
