import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './Detail.module.css';
import { getDogByBreedId } from '../../store/actions';
import { useNavigate } from 'react-router-dom';

function Detail(props) {
  const { dog } = props;
  const { id } = useParams();
  const navigate = useNavigate(); // Obtener la función de navegación

  useEffect(() => {
    props.getDogByBreedId(id);
  }, [id]);

  const handleHomeClick = () => {
    // Redirigir a la ruta "/"
    navigate('/');
  };

  return (
      dog && (
          <div className={style.container}>
            <div className={style.textName}>{dog.name}</div>
            <div className={style.inContainer}>
              <div className={style.leftContainer}>
                <div className={style.textStatus}>{`Altura: ${dog.height}`}</div>
                <div className={style.textStatus}>{`Peso: ${dog.weight}`}</div>
                <div className={style.textStatus}>{`Vida: ${dog.lifeSpan}`}</div>
                <div className={style.textStatus}>{`Temperamento: ${dog.temperament}`}</div>
              </div>
              <div className={style.rightContainer}>
                <div className={style.imgContainer}>
                  <img className={style.profileImg} src={dog.image} alt="" />
                </div>
              </div>
            </div>
            <button className={style.btnSearch} onClick={handleHomeClick}>home</button>
          </div>
      )
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDogByBreedId: (id) => {
      dispatch(getDogByBreedId(id));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    dog: state.dog,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);