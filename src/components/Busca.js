import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Busca() {
  const {
    numericFilters,
    value,
    handleSetOperator,
    handleSetValue,
    handleDeleteFilter,
    handleNumberFilter,
    handleTitleFilter,
    handleSetColuna,
    handleDeleteAll,
    options,

  } = useContext(PlanetContext);

  return (
    <div >
      <form >
        <div className='input-group mb-3'>
        <label
          htmlFor="column-filter"
          className='form-label'
        >
        <input
          type="text"
          className="form-control"
          placeholder="search"
          onChange={ handleTitleFilter }
        />          
            <select
              className='btn btn-outline-secondary'
            name="column-filter"
            data-testid="column-filter"
            onChange={ handleSetColuna }
          >
            {
              options.map((item) => (
                <option key={ item } value={ item }>
                  {item}
                </option>
              ))
            }
          </select>
          </label>
        </div>
        <label htmlFor="operator">
          Operador
          <select
            className='btn btn-outline-secondary'
            name="operator"
            data-testid="comparison-filter"
            onChange={ handleSetOperator }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="numero">
          <input
            className="form-control "
            name="numero"
            type="number"
            data-testid="value-filter"
            value={ value }
            onChange={ handleSetValue }

        />
        </label>

        <button
          className="btn btn-outline-secondary"
          type="button"
          name="button-filter"
          onClick={handleNumberFilter}
        >
          Filtrar

          </button>

      </form>

      <div>
        {numericFilters.map((filter, index) => (
          <p
            data-testid="filter"
            key={ `${filter.filtroColuna}-${index}` }
            className='btn btn-outline-secondary'
          >
            {`${filter.filtroColuna}`}
            {' '}
            {`${filter.operator}`}
            {' '}
            {`${filter.value}`}
            <button
              data-testid="DeleteIcon"
              type="button"
              onClick={ () => handleDeleteFilter(index) }
            >
              Apagar

            </button>
          </p>
        ))}
      </div>

      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={ () => handleDeleteAll() }
      >
        Remover todas filtragens

      </button>
    </div>
  );
}
export default Busca;
