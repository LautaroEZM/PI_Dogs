import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Card from '../Card/Card.jsx';
import style from './Cards.module.css';
import { getDogs, searchDogs, setCurrentPage, toggleForm, orderToggle } from '../../store/actions';
import SearchBar from '../SearchBar/SearchBar.jsx';
import AddDog from "../addDog/AddDog";

function Cards(props) {
  console.log(props);
  function onPageChange(pageNumber) {
    props.setCurrentPage(pageNumber);
  }

  function onSearch(name, temperament) {
    props.searchDogs(name, temperament);
  }

  function onOrderToggle() {
    props.orderToggle();
  }

  function onToggleForm() {
    props.toggleForm();
  }

  useEffect(() => {
    props.getDogs();
  }, []);

  return (
    <div>
      <div className={style.container}>
        <SearchBar onOrderToggle={onOrderToggle} onSearch={onSearch} onToggleForm={onToggleForm} />
      </div>
      {!props.visibleForm ? (
        <div>
          <div className={style.pagination}>
            {Array.from({ length: Math.ceil(props.dogs.length / props.itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => onPageChange(index + 1)}
                className={props.currentPage === index + 1 ? style.active : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className={style.cardContainer}>
            {props.displayedDogs.map((dog, index) => {
              return <Card key={index} dog={dog} />;
            })}
          </div>
        </div>
      ):<AddDog/>}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDogs: () => {
      dispatch(getDogs());
    },
    searchDogs: (name, temperament) => {
      dispatch(searchDogs(name, temperament));
    },
    setCurrentPage: (pageNumber) => {
      dispatch(setCurrentPage(pageNumber));
    },
    toggleForm: () => {
      dispatch(toggleForm());
    },
    orderToggle: () => {
      dispatch(orderToggle());
    },
  };
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
