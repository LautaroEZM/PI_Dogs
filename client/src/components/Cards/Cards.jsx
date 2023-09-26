import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Card from '../Card/Card.jsx';
import style from './Cards.module.css';
import {
  getDogs,
  searchDogs,
  setCurrentPage,
  toggleForm,
  orderToggle,
} from '../../store/actions';
import SearchBar from '../SearchBar/SearchBar.jsx';
import AddDog from '../addDog/AddDog';

function Cards(props) {
  // Estado local para el número de página actual
  const [currentPageLocal, setCurrentPageLocal] = useState(1);

  useEffect(() => {
    props.getDogs();
  }, []);

  useEffect(() => {
    setCurrentPageLocal(1); // Reiniciar la página local cuando cambie la lista de perros
  }, [props.dogs]);

  function onPageChange(pageNumber) {
    setCurrentPageLocal(pageNumber);
    props.setCurrentPage(pageNumber);
  }

  function onSearch(name, temperament) {
    props.searchDogs(name, temperament);
    setCurrentPageLocal(1); // Reiniciar la página local después de la búsqueda
  }

  function onOrderToggle() {
    props.orderToggle();
  }

  function onToggleForm() {
    props.toggleForm();
  }

  const { currentPage, dogs, itemsPerPage, visibleForm, displayedDogs } = props;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <div>
      <div className={style.container}>
        <SearchBar onOrderToggle={onOrderToggle} onSearch={onSearch} onToggleForm={onToggleForm} />
      </div>
      {!visibleForm ? (
        <div>
          <div className={style.pagination}>
            {Array.from({ length: Math.ceil(props.dogs.length / props.itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => onPageChange(index + 1)}
                className={currentPage === index + 1 ? style.active : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className={style.cardContainer}>
            {displayedDogs.map((dog, index) => (
              <Card key={index} dog={dog} />
            ))}
          </div>
        </div>
      ) : (
        <AddDog />
      )}
    </div>
  );
}

const mapDispatchToProps = {
  getDogs,
  searchDogs,
  setCurrentPage,
  toggleForm,
  orderToggle,
};

const mapStateToProps = (state) => {
  const { dogs, currentPage, itemsPerPage, visibleForm } = state;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedDogs = dogs.slice(indexOfFirstItem, indexOfLastItem);

  return {
    visibleForm,
    dogs,
    currentPage,
    itemsPerPage,
    displayedDogs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
