import React, { useState } from 'react';
import { connect } from 'react-redux';
import style from './AddDog.module.css';
import { saveDog, toggleForm, setCurrentPage } from '../../store/actions';

function AddDog(props) {
  const [formData, setFormData] = useState({
    name: '',
    height: '',
    weight: '',
    image: '',
    lifeSpan: '',
    temperament: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.saveDog(formData);
    props.setCurrentPage(1);
    props.toggleForm();
  };

  return (
    <div className={style.container}>
      <h2 className={style.textName}>Add Dog</h2>
      <div className={style.leftContainer}>
        <form onSubmit={handleSubmit}>
          <div className={style.textStatus}>
            <label >Name:</label>
            <input className={style.searchCamp} type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className={style.textStatus}>
            <label>Height:</label>
            <input className={style.searchCamp} type="text" name="height" value={formData.height} onChange={handleChange} required />
          </div>
          <div className={style.textStatus}>
            <label>Weight:</label>
            <input className={style.searchCamp} type="text" name="weight" value={formData.weight} onChange={handleChange} required />
          </div>
          <div className={style.textStatus}>
            <label>Image:</label>
            <input className={style.searchCamp} type="text" name="image" value={formData.image} onChange={handleChange} required />
          </div>
          <div className={style.textStatus}>
            <label>Life Span:</label>
            <input className={style.searchCamp} type="text" name="lifeSpan" value={formData.lifeSpan} onChange={handleChange} required />
          </div>
          <div className={style.textStatus}>
            <label>Temperament:</label>
            <input className={style.searchCamp} type="text" name="temperament" value={formData.temperament} onChange={handleChange} required />
          </div>
          <div className={style.rightContainer}><button className={style.btnSearch} type="submit">Submit</button></div>
        </form>
        
      </div>

    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    saveDog: (data) => {
      dispatch(saveDog(data));
    },
    toggleForm: () => {
      dispatch(toggleForm());
    },
    setCurrentPage: (pageNumber) => {
      dispatch(setCurrentPage(pageNumber));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    dogs: state.dogs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDog);
