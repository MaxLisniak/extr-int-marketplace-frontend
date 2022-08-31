import StarYellow from './assets/star-yellow.png';
import ThumbUp from './assets/thumb-up.png';
import ThumbDown from './assets/thumb-down.png';
import Eye from './assets/eye.png';
import "./InfoIcons.scss";

const InfoIcons = (props: { style: 'rows' | 'tiles' }) => {

  return (
    <ul className={`info-icons ${props.style}`}>
      <li><img src={Eye} alt="" /><span>100</span></li>
      <li><img src={StarYellow} alt="" /><span>100</span></li>
      <li><img src={ThumbUp} alt="" /><span>100</span></li>
      <li><img src={ThumbDown} alt="" /><span>100</span></li>
    </ul>
  )
}

export default InfoIcons;