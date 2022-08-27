import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteCharacteristic, deleteProduct, fetchItems, updateCharacteristic, updateProduct } from "../../../features/admin/thunks";
import CreateItem from "../CreateItem/CreateItem";
import ModerateSingleItem from "../ModerateSingleItem/ModerateSingleItem";


const ModerateProducts = () => {

  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(fetchItems("products"));
    dispatch(fetchItems("subcategories"));
    dispatch(fetchItems("characteristics"));
    dispatch(fetchItems("characteristic_names"));
  }, [])

  const products = useAppSelector(state => state.admin.products);

  useEffect(() => {
    dispatch(fetchItems("characteristics"))
  }, [products])

  const subcategories = useAppSelector(state => state.admin.subcategories);
  const characteristics = useAppSelector(state => state.admin.characteristics);
  const characteristic_names = useAppSelector(state => state.admin.characteristic_names);
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
      editable: true,
      objectCreation: {
        include: true,
        required: true,
      }
    },
    description: {
      fieldType: "textInput",
      editable: true,
      objectCreation: {
        include: true,
        required: false,
      }
    },
    image_url: {
      fieldType: "textarea",
      editable: true,
      objectCreation: {
        include: true,
        required: false,
      }
    },
    subcategory_id: {
      fieldType: "select",
      values: subcategories,
      editable: true,
      objectCreation: {
        include: true,
        required: false,
      }
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
          objectCreation: {
            include: true,
            required: true,
          }
        },
        value: {
          fieldType: "textInput",
          editable: true,
          objectCreation: {
            include: true,
            required: true,
          }
        },
      },
      items: characteristics,
      deleteItem: deleteCharacteristic,
      updateItem: updateCharacteristic,
      reference_key: "product_id",
    }
  }

  return (
    <div className="moderate-items">
      <h2>Moderate {modelName}</h2>
      <CreateItem
        fieldsDefinition={fieldsDefinition}
        modelName={modelName}
      />
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
              updateItem={updateProduct}
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