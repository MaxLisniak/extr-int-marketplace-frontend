import "./Collapsible.scss"
import { useState } from "react";
import Arrow from "./assets/arrow.png";



const Collapsible = (props: { label: string, openByDefault: boolean, children?: any }) => {

  const toggle = () => {
    setOpen(!open)
  }

  const [open, setOpen] = useState(props.openByDefault);
  return (
    <div className="collapsible">

      <div onClick={toggle} className="toggle-btn"><img className="arrow-icon" src={Arrow} alt="" />{props.label}</div>
      {open &&
        <div className="collapsible-child">
          {props.children}
        </div>
      }
    </div>
  )
}


export default Collapsible;