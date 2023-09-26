import { useState } from 'react';
import style from './SearchBar.module.css';

export default function SearchBar(props) {
  const [id, setId] = useState([]);
  const [temperament, setTemperament] = useState('');

  function handleChange(event) {
    setId(event.target.value);
  }

  function handleFilterTemperament(event) {
    setTemperament(event.target.value);
  }
  function handleSubmit(event) {
    props.onSearch(id, temperament);
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
      <button className={style.btnSearch} onClick={handleSubmit}>
        Search
      </button>
      <button className={style.btnSearch} onClick={handleOrderToggle}>
        Ordenar
      </button>
    </div>
  );
}
