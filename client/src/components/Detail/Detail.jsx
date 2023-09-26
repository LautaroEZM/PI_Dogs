import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import style from './Detail.module.css';
import { getDogs } from '../../store/actions';
import { useNavigate } from 'react-router-dom';

function Detail(props) {
  const [dog, setDog] = useState(false);
  const { id } = useParams();
  const query = useQuery();
  const source = query.get('source');
  const navigate = useNavigate(); // Obtener la función de navegación

  useEffect(() => {
    props.getDogs();
    props.dogs.forEach((p) => {
      if (p.id === Number(id) && p.source === source) {
        setDog(p);
      }
    });
  }, [id, source]);

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

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDogs: () => {
      dispatch(getDogs());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    dogs: state.dogs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);