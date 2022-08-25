import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteCategory, fetchItems } from "../../../features/admin/thunks";
import { Subcategory } from "../../../features/admin/types";
import ModerateSingleItem from "../ModerateSingleItem/ModerateSingleItem";
import "../ModerateItems/ModerateItems.scss";
import "./ModerateCategories.scss";

const ModerateCategories = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchItems("categories"))
    dispatch(fetchItems("subcategories"))
  }, [])

  const modelName = "categories";
  const categories = useAppSelector(state => state.admin.categories);
  const items = categories;

  const fieldsDefinition = {
    id: {
      fieldType: "textInput",
      editable: false,
    },
    name: {
      fieldType: "textInput",
    },
    subcategories: {
      fieldType: "list",
      editable: false,
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