import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteSubcategory, fetchItems } from "../../../features/admin/thunks";
import ModerateSingleItem from "../ModerateSingleItem/ModerateSingleItem";

const ModerateSubcategories = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchItems("subcategories"))
    dispatch(fetchItems("categories"))
  }, [])

  const subcategories = useAppSelector(state => state.admin.subcategories);
  const categories = useAppSelector(state => state.admin.categories);
  const items = subcategories;

  const modelName = "subcategories";
  const fieldsDefinition = {
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
      editable: true
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
              deleteItem={deleteSubcategory}
            >
            </ModerateSingleItem>
          )
        })
      }

    </div>
  )
}

export default ModerateSubcategories;