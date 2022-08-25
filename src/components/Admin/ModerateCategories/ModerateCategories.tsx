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
  }, [])

  const modelName = "categories";
  const items = useAppSelector(state => state.admin.categories);

  const fieldsDefinition = [
    { fieldName: "name", fieldType: "input" }
  ];

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

              {
                (item.subcategories?.length > 0) ?
                  <>
                    <p>Has subcategories:</p>
                    <ul className="subcategories">
                      {item?.subcategories?.map((subcategory: Subcategory) => {
                        return <li key={subcategory.id}>{subcategory.name}</li>
                      })}
                    </ul>
                  </> : null
              }

            </ModerateSingleItem>
          )
        })
      }

    </div>
  )
}

export default ModerateCategories;