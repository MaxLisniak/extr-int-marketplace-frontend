import "./ModerateSingleItem.scss";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { updateItem } from "../../../features/admin/thunks";
import React from "react";

const ModerateSingleItem = (props: {
  items: any[],
  fieldsDefinition: {},
  nestedModelsDefinition?: {},
  i: number,
  modelName: string,
  deleteItem: Function,
  children?: React.ReactNode
}) => {

  const dispatch = useAppDispatch();
  const item = props.items[props.i];
  const parentId = item["id"];
  const [fields, setFields] = useState({})

  interface Field {
    editing: boolean,
    value: string,
    originalValue: string,
    prevValue?: string,
    fieldType: string,
    values?: [] | undefined,
    editable: boolean,
  }
  interface NestedModel {
    items: any[],
    fieldsDefinition: {},
    deleteItem: Function,
    reference_key: number,
  }

  useEffect(() => {
    const filledFields: any = {};
    for (const fieldDefinition of Object.entries(props.fieldsDefinition)) {
      const [fieldName, fieldProperties] =
        fieldDefinition as [
          string,
          {
            fieldType: string,
            values: { id: number, name: {} }[],
            editable: boolean,
          }
        ];
      const { fieldType, values, editable } = fieldProperties;
      filledFields[fieldName] = {}
      filledFields[fieldName].fieldType = fieldType;
      filledFields[fieldName].editing = false;
      filledFields[fieldName].originalValue = item[fieldName as keyof {}];
      filledFields[fieldName].value = item[fieldName as keyof {}];
      filledFields[fieldName].editable = editable;
      if (fieldType === "select" && values)
        filledFields[fieldName].values = values;
      if (fieldType === "list")
        filledFields[fieldName].values = filledFields[fieldName].value;
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
        {

          // TEXTAREA

          field.fieldType === "textarea" ?
            <textarea
              style={{
                backgroundColor: field.editing ?
                  "unset" :
                  field.value === field.originalValue ?
                    "unset" :
                    "rgb(151, 183, 244)"
              }}
              disabled={!field.editing}
              autoComplete="off"
              id={`${fieldName}-field-${item.id}`}
              value={field.value || ""}
              onChange={(e) => {
                setFields({
                  ...fields,
                  [fieldName]: { ...field, value: e.target.value, }
                })
              }}
            />

            // TEXTINPUT

            : field.fieldType === "textInput" ?
              <input
                style={{
                  backgroundColor: field.editing ?
                    "unset" :
                    field.value === field.originalValue ?
                      "unset" :
                      "rgb(151, 183, 244)"
                }}
                disabled={!field.editing}
                type="text"
                autoComplete="off"
                id={`${fieldName}-field-${item.id}`}
                value={field.value || ""}
                onChange={(e) => {
                  setFields({
                    ...fields,
                    [fieldName]: { ...field, value: e.target.value, }
                  })
                }}
              />

              // SELECT

              : field.fieldType === "select" ?
                <select
                  id={`${fieldName}-field-${item.id}`}
                  disabled={!field.editing}
                  style={{
                    backgroundColor: field.editing ?
                      "unset" :
                      field.value === field.originalValue ?
                        "unset" :
                        "rgb(151, 183, 244)"
                  }}
                  value={field.value || ""}
                  onChange={(e) => {
                    setFields({
                      ...fields,
                      [fieldName]: { ...field, value: Number(e.target.value), }
                    })
                  }}
                >
                  {field.values?.map((value: { id: number, name: string }) => {
                    return <option
                      key={value.id}
                      value={value.id}
                      defaultValue={field.value}
                    >
                      {`${value.id}: ${value.name}`}
                    </option>
                  })}
                </select>

                // LIST

                : field.fieldType === "list" ?
                  <ul className="list">
                    {field.values?.map((value: { id: number, name: string }) => {
                      return <li key={value.id}>{`${value.id}: ${value.name}`}</li>
                    })}
                    {field.values?.length === 0 ?
                      <li><i>No values</i></li>
                      : null}
                  </ul>
                  : null
        }
        {

          // EDIT 

          field.editable ?
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

              {/* SAVE  */}

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

              {/* CANCEL  */}

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

              {/* RESET  */}

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
            : null
        }
      </div>
    )
  })

  let nestedModels: any = null;
  if (props.nestedModelsDefinition) {
    nestedModels = (
      Object.entries(props.nestedModelsDefinition as {})
        .map((entry) => {
          const [modelName, modelProperties] = entry as [string, NestedModel];
          const items = modelProperties.items
            .filter(item => {
              return parentId === item[modelProperties.reference_key]
            })
          return {
            modelName: modelName,
            reactElements:
              items.map((item, i) => {
                return (

                  <ModerateSingleItem
                    modelName={modelName}
                    items={items}
                    i={i}
                    fieldsDefinition={modelProperties.fieldsDefinition}
                    deleteItem={modelProperties.deleteItem}
                    key={`${modelName}-${item.id}-form`}
                  />

                )
              })
          }
        })
    )
  }

  return (
    <div className="moderate-item">
      <>{formInputs}</>
      {props.children}

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
          props.deleteItem(item.id)
        )
        }
      >
        Delete
      </button>
      {nestedModels?.map((model: any) => {
        const { modelName, reactElements } = model;
        if (reactElements.length > 0)
          return (
            <div className="nested" key={modelName}>
              <b>{modelName}</b>
              {reactElements}
            </div>
          )
        else return null
      })}
    </div>
  )
}

export default ModerateSingleItem;