import "./ModerateItems.scss";
import ModerateSingleItem from "../ModerateSingleItem/ModerateSingleItem";
import React from "react";
import { Subcategory } from "../../../features/admin/types";

const ModerateItems = (props: {
  items: any[],
  fieldsDefinition: string[],
  modelName: string,
  children?: React.ReactNode
}) => {

  return (
    <div className="moderate-items">
      <h2>Moderate {props.modelName}</h2>
      {
        props.items.map((item, id) => {
          return (
            <ModerateSingleItem
              modelName={props.modelName}
              items={props.items}
              fieldsDefinition={props.fieldsDefinition}
              id={id}
              deleteItem={() => { }}
              key={`${props.modelName}-${item.id}-form`}
            >
              {props.modelName === "categories" ?
                <>
                  <p>Has subcategories:</p>
                  <ul>
                    {item.subcategories.map((subcategory: Subcategory) => {
                      return <li key={subcategory.id}>{subcategory.name}</li>
                    })}
                  </ul>
                </>
                : null
              }
            </ModerateSingleItem>
          )
        })
      }

    </div>
  )
}

export default ModerateItems;