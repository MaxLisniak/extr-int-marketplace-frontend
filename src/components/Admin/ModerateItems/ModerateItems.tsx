import "./ModerateItems.scss";
import ModerateSingleItem from "../ModerateSingleItem/ModerateSingleItem";

const ModerateItems = (props: {
  items: any[],
  fieldsDefinition: string[],
  modelName: string,
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
              key={`${props.modelName}-${item.id}-form`}
            />
          )
        })
      }

    </div>
  )
}

export default ModerateItems;