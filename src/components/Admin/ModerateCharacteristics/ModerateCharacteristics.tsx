import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { deleteCharacteristic, fetchItems } from "../../../features/admin/thunks"
import ModerateSingleItem from "../ModerateSingleItem/ModerateSingleItem"


const ModerateCharacteristics = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchItems("characteristics"))
    dispatch(fetchItems("characteristic_names"))
    dispatch(fetchItems("products"))
  }, [])

  const characteristics = useAppSelector(state => state.admin.characteristics);
  const products = useAppSelector(state => state.admin.products)
  const characteristicNames = useAppSelector(state => state.admin.characteristic_names)
  const items = characteristics;

  const modelName = "characteristics";
  const fieldsDefinition = {
    id: {
      fieldType: "textInput",
      editable: false,
    },
    product_id: {
      fieldType: "select",
      values: products,
      editable: true,
    },
    characteristic_name: {
      fieldType: "select",
      values: characteristicNames,
      editable: true,
    },
    value: {
      fieldType: "textInput",
      editable: true,
    },
  };

  return (
    <div className="moderate-items">
      <h2>Moderate {modelName}</h2>
      {
        items.map((item, i) => {
          return (
            <ModerateSingleItem
              modelName={modelName}
              items={items}
              fieldsDefinition={fieldsDefinition}
              i={i}
              key={`${modelName}-${item.id}-form`}
              deleteItem={deleteCharacteristic}
            >
            </ModerateSingleItem>
          )
        })
      }

    </div>
  )
}

export default ModerateCharacteristics;