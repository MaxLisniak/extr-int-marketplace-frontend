import "../ModerateItems/ModerateItems.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteCategory, deleteCharacteristic, deleteCharacteristicName, deleteProduct, deleteSubcategory, fetchItems, updateCategory, updateCharacteristic, updateCharacteristicName, updateProduct, updateSubcategory } from "../../../features/admin/thunks";
import ModerateSingleItem from "../ModerateSingleItem/ModerateSingleItem";
import CreateItem from "../CreateItem/CreateItem";

const ModerateCategories = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchItems("categories"))
    dispatch(fetchItems("subcategories"))
    dispatch(fetchItems("characteristic_names"))
    dispatch(fetchItems("products"))
    dispatch(fetchItems("characteristics"))
  }, [])


  const modelName = "categories";
  const categories = useAppSelector(state => state.admin.categories);
  const subcategories = useAppSelector(state => state.admin.subcategories)
  const characteristicNames = useAppSelector(state => state.admin.characteristic_names)
  const products = useAppSelector(state => state.admin.products)
  const characteristics = useAppSelector(state => state.admin.characteristics)
  const items = categories;

  useEffect(() => {
    dispatch(fetchItems("characteristics"))
  }, [products, characteristicNames])

  const fieldsDefinition = {
    id: {
      fieldType: "textInput",
      editable: false,
    },
    name: {
      fieldType: "textInput",
      editable: true,
      objectCreation: {
        include: true,
        required: true
      }
    },
  };

  const nestedModelsDefinition = {
    subcategories: {
      fieldsDefinition: {
        id: {
          fieldType: "textInput",
          editable: false,
        },
        name: {
          fieldType: "textInput",
          editable: true,
          objectCreation: {
            include: true,
            required: true
          }
        },
        category_id: {
          fieldType: "select",
          values: categories,
          editable: true,
        },
      },
      items: subcategories,
      deleteItem: deleteSubcategory,
      updateItem: updateSubcategory,
      reference_key: "category_id",

      nestedModelsDefinition: {
        characteristic_names: {
          reference_key: "for_subcategory_id",
          deleteItem: deleteCharacteristicName,
          updateItem: updateCharacteristicName,
          items: characteristicNames,
          fieldsDefinition: {
            id: {
              fieldType: "textInput",
              editable: false,
            },
            name: {
              fieldType: "textInput",
              editable: true,
              objectCreation: {
                include: true,
                required: true
              }
            },
          },
        },
        products: {
          reference_key: "subcategory_id",
          deleteItem: deleteProduct,
          updateItem: updateProduct,
          items: products,
          fieldsDefinition: {
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
              editable: false,
            }
          },
          nestedModelsDefinition: {
            characteristics: {
              fieldsDefinition: {
                id: {
                  fieldType: "textInput",
                  editable: false,
                },
                product_id: {
                  fieldType: "select",
                  values: products,
                  editable: false,
                },
                characteristic_name_id: {
                  fieldType: "select",
                  values: characteristicNames,
                  editable: false,
                },
                value: {
                  fieldType: "textInput",
                  editable: true,
                },
              },
              items: characteristics,
              updateItem: updateCharacteristic,
              reference_key: "product_id",
            }
          }
        }
      }
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
              key={`${modelName}-${item.id}-form`}
              deleteItem={deleteCategory}
              updateItem={updateCategory}
            >

            </ModerateSingleItem>
          )
        })
      }

    </div>
  )
}

export default ModerateCategories;