import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchItems } from "../../../features/admin/thunks";
import ModerateItems from "../ModerateItems/ModerateItems";


const ModerateProducts = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchItems("products"))
  }, [])

  const products = useAppSelector(state => state.admin.products);

  return (
    <ModerateItems
      items={products}
      modelName={"products"}
      fieldsDefinition={["name", "description", "image_url"]}
    />
  )
}

export default ModerateProducts;