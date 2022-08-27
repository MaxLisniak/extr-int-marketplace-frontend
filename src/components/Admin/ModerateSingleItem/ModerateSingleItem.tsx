import "./ModerateSingleItem.scss";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import React from "react";
import InputField from "../InputField/InputField";
import EditButtons from "../EditButtons/EditButtons";
import CreateItem from "../CreateItem/CreateItem";
import Collapsible from "../../Collapsible/Collapsible";

const ModerateSingleItem = (props: {
  items: any[],
  fieldsDefinition: {},
  nestedModelsDefinition?: {},
  i: number,
  modelName: string,
  deleteItem: Function,
  updateItem: Function,
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
    updateItem: Function,
    reference_key: number,
    nestedModelsDefinition: NestedModel
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

    const inputFieldsProps = {
      style: {
        backgroundColor: field.editing ?
          "unset" :
          field.value === field.originalValue ?
            "unset" :
            "rgb(151, 183, 244)"
      },
      disabled: !field.editing,
      value: field.value || "",
    }

    return (
      <React.Fragment key={`${fieldName}-for-${item.id}`}>
        <InputField
          field={field}
          fieldName={fieldName}
          fields={fields}
          setFields={setFields}
          id={item.id}
          inputFieldsProps={inputFieldsProps}

        />
        {
          field.editable ?
            <EditButtons
              fieldContext={{
                field: field,
                fieldName: fieldName,
                fields: fields,
                setFields: setFields
              }}
            />
            : null
        }
      </React.Fragment>
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
            createItem: (
              <CreateItem
                fieldsDefinition={modelProperties.fieldsDefinition}
                modelName={modelName}
                reference_key={modelProperties.reference_key}
                parent_id={parentId}
              />
            ),
            reactElements:
              items.map((item, i) => {
                return (

                  <ModerateSingleItem
                    modelName={modelName}
                    items={items}
                    i={i}
                    fieldsDefinition={modelProperties.fieldsDefinition}
                    nestedModelsDefinition={modelProperties.nestedModelsDefinition}
                    deleteItem={modelProperties.deleteItem}
                    updateItem={modelProperties.updateItem}
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
          dispatch(props.updateItem(
            {
              item: itemToUpdate,
              id: item.id
            }
          ));
        }
        }
      >Update</button>
      <button
        className="delete"
        disabled={!props.deleteItem}
        style={{ display: props.deleteItem ? "unset" : "none" }}
        onClick={() => dispatch(
          props.deleteItem(item.id)
        )
        }
      >
        Delete
      </button>
      {nestedModels?.map((model: any) => {
        const { modelName, reactElements, createItem } = model;
        // if (reactElements.length > 0)
        return (
          <div className="nested" key={modelName}>
            <Collapsible
              label={modelName}
              openByDefault={false}
            >
              {createItem}
              {reactElements.length > 0 ? reactElements : <i>No items</i>}

            </Collapsible>
          </div>
        )
      })}
    </div>
  )
}

export default ModerateSingleItem;