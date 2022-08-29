

const InputField = (props: {
  field: any,
  fieldName: any,
  fields: any,
  setFields: any,
  id: number,
  inputFieldsProps?: any
}) => {


  return (
    <div className="input">
      <label htmlFor={`${props.fieldName}-field-${props.id}`}>{props.fieldName}</label>
      {

        // TEXTAREA

        props.field.fieldType === "textarea" ?
          <textarea
            {...props.inputFieldsProps}
            id={`${props.fieldName}-field-${props.id}`}
            onChange={(e: any) => {
              props.setFields({
                ...props.fields,
                [props.fieldName]: { ...props.field, value: e.target.value }
              })
            }}
          />

          // TEXTINPUT

          : ["textInput", "numericalInput", "datePicker"]
            .includes(props.field.fieldType) ?
            <input
              {...props.inputFieldsProps}
              id={`${props.fieldName}-field-${props.id}`}
              type={
                props.field.fieldType === "textInput" ?
                  "text" :
                  props.field.fieldType === "numericalInput" ?
                    "number" :
                    props.field.fieldType === "datePicker" ?
                      "date" : ""
              }
              autoComplete="off"
              onChange={(e) => {
                props.setFields({
                  ...props.fields,
                  [props.fieldName]: {
                    ...props.field, value:
                      props.field.fieldType === "numericalInput" ?
                        Number(e.target.value) :
                        e.target.value
                  }
                })
              }}
            />

            // SELECT

            : props.field.fieldType === "select" ?
              <select
                {...props.inputFieldsProps}
                id={`${props.fieldName}-field-${props.id}`}
                onChange={(e) => {
                  props.setFields({
                    ...props.fields,
                    [props.fieldName]: { ...props.field, value: Number(e.target.value), }
                  })
                }}
              >
                <option value={undefined}>---</option>
                {props.field.values?.map((value: { id: number, name: string }) => {
                  return <option
                    key={value.id}
                    value={value.id}
                  // selected={value.id === props.field.value}
                  // defaultValue={props.field.value === "" ? props.field.values[0].id : props.field.value}
                  >
                    {`${value.id}: ${value.name}`}
                  </option>
                })}
              </select>

              : null
      }

    </div>
  )
}

export default InputField;