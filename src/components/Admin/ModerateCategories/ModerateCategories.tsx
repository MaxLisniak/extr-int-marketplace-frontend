import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteCategory, deleteSubcategory, fetchItems } from "../../../features/admin/thunks";
import ModerateSingleItem from "../ModerateSingleItem/ModerateSingleItem";
import "../ModerateItems/ModerateItems.scss";

const ModerateCategories = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchItems("categories"))
    dispatch(fetchItems("subcategories"))
  }, [])

  const modelName = "categories";
  const categories = useAppSelector(state => state.admin.categories);
  const subcategories = useAppSelector(state => state.admin.subcategories)
  const items = categories;

  const fieldsDefinition = {
    id: {
      fieldType: "textInput",
      editable: false,
    },
    name: {
      fieldType: "textInput",
      editable: true,
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
          editable: true
        },
        category_id: {
          fieldType: "select",
          values: categories,
          editable: true,
        },
      },
      items: subcategories,
      deleteItem: deleteSubcategory,
      reference_key: "category_id",
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
              key={`${modelName}-${item.id}-form`}
              deleteItem={deleteCategory}
            >

            </ModerateSingleItem>
          )
        })
      }

    </div>
  )
}

export default ModerateCategories;