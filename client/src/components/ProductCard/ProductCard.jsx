import { Link } from "react-router-dom"
import "./ProductCard.scss"

// export default function ProductCard({ name, price, description, image, image2, image3, image4 }) {
//     return (
//         <div className="card">

<<<<<<< HEAD
export default function ProductCard({
  name,
  id,
  price,
  description,
  image,
  categories,
}) {
  return (
    <div className="card">
      <img className="imagenOne" src={image} alt="not found" />
      <div className="textContainer">
        <div className="headerContainer">
          <h2>{name} </h2>
          <h3>AR${price} </h3>
        </div>
        <h6>
          {categories[0]} <br /> {categories[1]}
        </h6>
        <Link to={'details/' + id } className='linkBtn'><button className='btnInfo'>Más información</button></Link>
      </div>
    </div>
=======
export default function ProductCard({ id, name, price, description, image, categories}) {
    return (
        <div className="card">
           <img className="imagenOne" src={image} alt="not found"/>
            <div className="textContainer">
              <div className="headerContainer">
                 <h2>{name} </h2>
                 <h3>AR${price} </h3>
              </div>
              <h6>{categories[0]} <br/> {categories[1]}</h6>
            </div>
            <Link to={'details/' + id } className='linkBtn'><button className='btnInfo'>Más información</button></Link>
        </div>
>>>>>>> 5cfd2bd8960ab1e346f208ac514d1b1d2b655842
  );
}
