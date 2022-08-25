import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteCharacteristic, deleteProduct, fetchItems } from "../../../features/admin/thunks";
import ModerateSingleItem from "../ModerateSingleItem/ModerateSingleItem";


const ModerateProducts = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchItems("products"));
    dispatch(fetchItems("subcategories"));
    dispatch(fetchItems("characteristics"));
  }, [])

  const products = useAppSelector(state => state.admin.products);
  const subcategories = useAppSelector(state => state.admin.subcategories);
  const characteristics = useAppSelector(state => state.admin.characteristics);
  const characteristic_names = useAppSelector(state => state.admin.characteristic_names)
  const items = products;
  const modelName = "products";

  const fieldsDefinition = {
    id: {
      fieldType: "textInput",
      editable: false
    },
    name: {
      fieldName: "name",
      fieldType: "textInput",
      editable: true
    },
    description: {
      fieldType: "textInput",
      editable: true
    },
    image_url: {
      fieldType: "textarea",
      editable: true
    },
    subcategory_id: {
      fieldType: "select",
      values: subcategories,
      editable: true,
    }
  };

  const nestedModelsDefinition = {
    characteristics: {
      fieldsDefinition: {
        id: {
          fieldType: "textInput",
          editable: false,
        },
        characteristic_name_id: {
          fieldType: "select",
          values: characteristic_names,
          editable: false,
        },
        value: {
          fieldType: "textInput",
          editable: true
        },
      },
      items: characteristics,
      deleteItem: deleteCharacteristic,
      reference_key: "product_id",
    }
  }

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
              nestedModelsDefinition={nestedModelsDefinition}
              i={i}
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