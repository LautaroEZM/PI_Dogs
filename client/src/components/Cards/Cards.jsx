import React, { useEffect } from 'react';
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
  useEffect(() => {
    props.getDogs();
  }, []);

  function onPageChange(pageNumber) {
    props.setCurrentPage(pageNumber);
  }

  function onSearch(name, temperament, source) {
    props.searchDogs(name, temperament, source);
    // Reiniciar la página local después de la búsqueda
    props.setCurrentPage(1);
  }

  function onOrderToggle() {
    props.orderToggle();
  }

  function onToggleForm() {
    props.toggleForm();
  }

  const { currentPage, visibleForm, displayedDogs } = props;

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
