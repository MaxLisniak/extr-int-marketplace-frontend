import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteProduct, fetchItems } from "../../../features/admin/thunks";
import ModerateSingleItem from "../ModerateSingleItem/ModerateSingleItem";


const ModerateProducts = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchItems("products"))
  }, [])

  const items = useAppSelector(state => state.admin.products);
  const modelName = "products";
  const fieldsDefinition = ["name", "description", "image_url"];

  return (
    <div className="moderate-items">
      <h2>Moderate {modelName}</h2>
      {
        items.map((item, id) => {
          return (
            <ModerateSingleItem
              modelName={modelName}
              items={items}
              fieldsDefinition={fieldsDefinition}
              id={id}
              deleteItem={deleteProduct}
              key={`${modelName}-${item.id}-form`}
            >
            </ModerateSingleItem>
          )
        })
      }

    </div>
  )
}

export default ModerateProducts;