import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteProduct, fetchItems } from "../../../features/admin/thunks";
import ModerateSingleItem from "../ModerateSingleItem/ModerateSingleItem";


const ModerateProducts = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchItems("products"));
    dispatch(fetchItems("subcategories"));
  }, [])

  const products = useAppSelector(state => state.admin.products);
  const subcategories = useAppSelector(state => state.admin.subcategories);
  const items = products;
  const modelName = "products";
  const fieldsDefinition = {
    id: {
      fieldType: "textInput",
      editable: false
    },
    name: {
      fieldName: "name",
      fieldType: "textInput"
    },
    description: {
      fieldType: "textInput"
    },
    image_url: {
      fieldType: "textarea"
    },
    subcategory_id: {
      fieldType: "select",
      values: subcategories,
    }
  };

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