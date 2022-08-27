import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { createItem } from "../../../features/admin/thunks";
import InputField from "../InputField/InputField";


const CreateItem = (props: {
  fieldsDefinition: any;
  modelName: string;
  reference_key?: number;
  parent_id?: number;
}) => {

  const dispatch = useAppDispatch();
  const [fields, setFields] = useState<{}>([]);

  useEffect(() => {
    const filledFields: any = {};
    Object.entries(props.fieldsDefinition).map(entry => {
      const [fieldName, field] = entry as [string, any];
      const { fieldType, objectCreation, values } = field;

      if (objectCreation?.include) {
        filledFields[fieldName as keyof {}] = {};
        filledFields[fieldName as keyof {}].fieldType = fieldType;
        filledFields[fieldName as keyof {}].required = objectCreation?.required;
        // if (fieldType === "select")
        //   filledFields[fieldName as keyof {}].value = undefined;
        filledFields[fieldName as keyof {}].value = ""
        filledFields[fieldName as keyof {}].values = values;
      }
    })
    setFields(filledFields);
  }, [props])

  const [itemToCreate, setItemToCreate] = useState({});
  useEffect(() => {
    const item: any = {}
    Object.entries(fields).map(entry => {
      const [fieldName, field] = entry as [string, any];
      if (field.value !== "")
        item[fieldName as keyof {}] = field.value;
    })
    if (props.reference_key && props.parent_id)
      item[props.reference_key] = props.parent_id;
    setItemToCreate(item);
  }, [fields])

  if (Object.entries(fields).length === 0) return null

  return (
    <form className="moderate-item create-item" onSubmit={(e) => {
      e.preventDefault()
      dispatch(createItem(
        {
          item: itemToCreate,
          modelName: props.modelName,
        }
      ));
      Object.entries(fields).map(entry => {
        const [fieldName, field] = entry as [string, any];
        setFields({
          ...fields,
          [fieldName]: { ...field, value: "" }
        })
      })
    }}>

      <b>{`Create ${props.modelName}`}</b>

      {Object.entries(fields).map((entry, i) => {

        const [fieldName, field] = entry as [string, any];
        const { required, value } = field;

        return <InputField
          field={field}
          fieldName={fieldName}
          fields={fields}
          setFields={setFields}
          id={i}
          key={i}
          inputFieldsProps={{
            required: required ? "required" : null,
            value,
          }}
        />
      })}
      <button>Create</button>
    </form>
  )
}

export default CreateItem;

