import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchItems } from "../../../features/admin/thunks";
import ModerateItems from "../ModerateItems/ModerateItems";

const ModerateSubcategories = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchItems("subcategories"))
  }, [])

  const subcategories = useAppSelector(state => state.admin.subcategories);

  return (
    <ModerateItems
      items={subcategories}
      modelName={"subcategories"}
      fieldsDefinition={["name"]}
    />
  )
}

export default ModerateSubcategories;