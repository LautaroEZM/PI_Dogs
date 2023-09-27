import { useState } from 'react';
import style from './SearchBar.module.css';

export default function SearchBar(props) {
  const [id, setId] = useState('');
  const [temperament, setTemperament] = useState('');
  const [source, setSource] = useState('');

  function handleChange(event) {
    setId(event.target.value);
  }

  function handleFilterTemperament(event) {
    setTemperament(event.target.value);
  }

  function handleFilterSource(event) {
    setSource(event.target.value);
  }

  function handleOrderToggle() {
    props.onOrderToggle();
  }

  function handleToggleForm() {
    props.onToggleForm(true);
  }

  return (
    <div className={style.headerDiv}>
      <button className={style.btnSearch} onClick={handleToggleForm}>
        Add Dog
      </button>
      <input
        className={style.searchCamp}
        placeholder={'Filtrar por nombre...'}
        type="search"
        value={id}
        onChange={handleChange}
      />
      <input
        className={style.searchCamp2}
        placeholder={'Filtrar por temperamento...'}
        name="temperament"
        value={temperament}
        onChange={handleFilterTemperament}
      />
      <select className={style.selectCamp} onChange={handleFilterSource}>
        <option value={''}>Todos</option>
        <option value={'internal'}>Local</option>
        <option value={'external'}>API</option>
      </select>
      <button className={style.btnSearch} onClick={() => props.onSearch(id, temperament, source)}>
        Search
      </button>
      <button className={style.btnSearch} onClick={handleOrderToggle}>
        Ordenar
      </button>
    </div>
  );
}
