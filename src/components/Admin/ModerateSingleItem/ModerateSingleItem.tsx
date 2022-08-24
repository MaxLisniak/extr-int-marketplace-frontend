import "./ModerateSingleItem.scss";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { deleteItem, updateItem } from "../../../features/admin/thunks";

const ModerateSingleItem = (props: {
  items: any[],
  fieldsDefinition: string[],
  id: number,
  modelName: string,
}) => {

  const dispatch = useAppDispatch();
  const item = props.items[props.id];

  const [fields, setFields] = useState({})

  interface Field {
    editing: boolean,
    value: string,
    originalValue: string,
    prevValue: string
  }

  useEffect(() => {
    const filledFields: any = {};
    for (const fieldName of props.fieldsDefinition) {
      filledFields[fieldName as keyof {}] = {}
      filledFields[fieldName as keyof {}].editing = false;
      filledFields[fieldName as keyof {}].value = item[fieldName]
      filledFields[fieldName as keyof {}].originalValue = item[fieldName]
    }
    setFields(filledFields);
  }, [item, props])

  const hasChanges = Object.entries(fields)
    .map((f) => {
      const [fieldName, field] = f as [string, Field];
      return field.value !== field.originalValue;
    })
    .reduce(
      (prevValue, currentValue) => {
        return prevValue || currentValue
      },
      false
    );

  const isEditing = Object.entries(fields)
    .map(f => {
      const [fieldName, field] = f as [string, Field];
      return field.editing;
    })
    .reduce(
      (prevValue, currentValue) => {
        return prevValue || currentValue
      },
      false
    );

  const itemToUpdate: any = {}
  Object.entries(fields).map(entry => {
    const [fieldName, field] = entry as [string, Field];
    if (field.value !== field.originalValue && !field.editing)
      itemToUpdate[fieldName as keyof {}] = field.value;
  })


  const formInputs = Object.entries(fields).map((entry) => {
    const [fieldName, field] = entry as [string, Field];

    return (
      <div className="input" key={`${fieldName}-for-${item.id}`}>
        <label htmlFor={`${fieldName}-field-${item.id}`}>{fieldName}</label>
        <input
          style={{
            backgroundColor: field.editing ?
              "unset" :
              field.value === field.originalValue ?
                "unset" :
                "rgb(236, 236, 173)"
          }}
          disabled={!field.editing}
          type="text"
          autoComplete="off"
          id={`${fieldName}-field-${item.id}`}
          value={field.value || ""}
          onChange={(e) => {
            setFields({
              ...fields,
              [fieldName]: {
                ...field,
                value: e.target.value,
              }
            })
          }}
        />
        <div className="buttons">
          <button
            disabled={field.editing}
            onClick={
              () =>
                setFields(
                  {
                    ...fields,
                    [fieldName]: {
                      ...field,
                      editing: true,
                      prevValue: field.value
                    }
                  }
                )
            }>
            Edit
          </button>
          <button
            disabled={!field.editing}
            onClick={
              () =>
                setFields(
                  {
                    ...fields,
                    [fieldName]: {
                      ...field,
                      editing: false,
                      prevValue: undefined
                    }
                  }
                )
            }>
            Save
          </button>
          <button
            disabled={!field.editing}
            onClick={
              () =>
                setFields(
                  {
                    ...fields,
                    [fieldName]: {
                      ...field,
                      editing: false,
                      value: field.prevValue
                    }
                  }
                )
            }>
            Cancel
          </button>
          <button
            disabled={field.value === field.originalValue}
            onClick={
              () =>
                setFields(
                  {
                    ...fields,
                    [fieldName]: {
                      ...field,
                      value: field.originalValue
                    }
                  }
                )
            }>
            Reset
          </button>
        </div>
      </div>
    )
  })

  return (
    <form className="moderate-item" onSubmit={(e) => {
      e.preventDefault();
    }}>
      <div className="input">
        <label htmlFor={`id-field-${item.id}`}>id</label>
        <input
          disabled
          type="number"
          id={`id-field-${item.id}`}
          value={item.id}
        />
      </div>
      <>{formInputs}</>
      <button
        disabled={isEditing || !hasChanges}
        onClick={() => {
          dispatch(updateItem(
            {
              item: itemToUpdate,
              modelName: props.modelName,
              id: item.id
            }
          ));
        }
        }
      >Update</button>
      <button
        className="delete"
        onClick={() => dispatch(
          deleteItem(
            {
              modelName: props.modelName,
              id: item.id
            }
          )
        )
        }
      >
        Delete
      </button>
    </form>
  )
}

export default ModerateSingleItem;