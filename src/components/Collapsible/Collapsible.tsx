import "./Collapsible.scss"
import Arrow from "./assets/arrow.png";

import { useState } from "react";


const Collapsible = (props: { label: string, children?: any }) => {

  const toggle = () => {
    setOpen(!open)
  }

  const [open, setOpen] = useState(false);
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