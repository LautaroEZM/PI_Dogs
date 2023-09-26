import { Link } from "react-router-dom";
import style from "./Card.module.css";

export default function Card({ dog }) {

  return dog && (
      <div className={style.card} key={dog.id}>
        <Link to={`/detail/${dog.id}?source=${dog.source}`}><div className={style.textName}>{dog.name}</div></Link> {/*agregar un <p></p> y pasar el link a ese lugar*/}
        <div className={style.imgContainer}><img className={style.profileImg} src={dog.image} alt="" /></div>
        <div className={style.textStatus}>{`Altura: ${dog.height}`}</div>
          <div className={style.textStatus}>{`Peso: ${dog.weight}`}</div>
          <div className={style.textStatus}>{`Vida: ${dog.lifeSpan}`}</div>
          <div className={style.textStatusTemp}>{`Temperamento: ${dog.temperament}`}</div>
        <div className={style.botContainer}></div>
      </div>
  );
}
