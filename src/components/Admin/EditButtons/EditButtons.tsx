

const EditButtons = (props: {
  fieldContext: {
    field: any,
    fieldName: any,
    fields: any,
    setFields: any
  }
}) => {

  return (
    <div className="buttons">

      {/* EDIT */}

      <button
        disabled={props.fieldContext.field.editing}
        onClick={
          () =>
            props.fieldContext.setFields(
              {
                ...props.fieldContext.fields,
                [props.fieldContext.fieldName]: {
                  ...props.fieldContext.field,
                  editing: true,
                  prevValue: props.fieldContext.field.value
                }
              }
            )
        }>
        Edit
      </button>

      {/* SAVE  */}

      <button
        disabled={!props.fieldContext.field.editing}
        onClick={
          () =>
            props.fieldContext.setFields(
              {
                ...props.fieldContext.fields,
                [props.fieldContext.fieldName]: {
                  ...props.fieldContext.field,
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
        disabled={!props.fieldContext.field.editing}
        onClick={
          () =>
            props.fieldContext.setFields(
              {
                ...props.fieldContext.fields,
                [props.fieldContext.fieldName]: {
                  ...props.fieldContext.field,
                  editing: false,
                  value: props.fieldContext.field.prevValue
                }
              }
            )
        }>
        Cancel
      </button>

      {/* RESET  */}

      <button
        disabled={props.fieldContext.field.value === props.fieldContext.field.originalValue}
        onClick={
          () =>
            props.fieldContext.setFields(
              {
                ...props.fieldContext.fields,
                [props.fieldContext.fieldName]: {
                  ...props.fieldContext.field,
                  value: props.fieldContext.field.originalValue
                }
              }
            )
        }>
        Reset
      </button>
    </div>
  )
}

export default EditButtons;