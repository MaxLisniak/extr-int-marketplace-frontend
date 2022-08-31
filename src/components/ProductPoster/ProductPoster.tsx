import './ProductPoster.scss';
import NoImage from './assets/no-image.png';


const ProductPoster = (props: { image_url: string }) => {

  return (

    <div className="product-poster">{
      props.image_url ?
        <img src={props.image_url} alt="" /> :
        <img src={NoImage} alt="" />
    }
    </div>

  )
}

export default ProductPoster;