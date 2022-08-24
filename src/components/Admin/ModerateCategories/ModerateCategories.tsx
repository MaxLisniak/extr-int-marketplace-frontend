import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchItems } from "../../../features/admin/thunks";
import ModerateItems from "../ModerateItems/ModerateItems";

const ModerateCategories = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchItems("categories"))
  }, [])

  const categories = useAppSelector(state => state.admin.categories);

  return (
    <ModerateItems
      items={categories}
      modelName={"categories"}
      fieldsDefinition={["name"]}
    />
  )
}

export default ModerateCategories;