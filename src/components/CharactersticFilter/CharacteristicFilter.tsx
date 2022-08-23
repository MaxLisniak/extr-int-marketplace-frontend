import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./CharacteristicFilter.scss";
// import { selectCharacteristic } from "../../features/filter/filterSlice";
// import { removeCharacteristic } from "../../features/filter/filterSlice";
import { useEffect, useState } from "react";
import { selectCharacteristicsForName } from "../../features/filter/filterSlice";


const CharacteristicFilter = (
  props: {
    characteristics: {
      selected?: boolean | undefined;
      id: number,
      value: string,
      characteristic_name_id: number
    }[],
    // setAllCheckedCharacteristics: Function,
    // allCheckedCharacteristics: {}
  }
) => {

  const dispatch = useAppDispatch();
  // const [checkedCharacteristics, setCheckedCharacteristics] = useState<string[]>([])
  const charName = props.characteristics[0].characteristic_name_id;
  const allCheckedCharacteristics = useAppSelector(state => state.filter.selectedCharacteristics);
  const checkedCharacteristics = allCheckedCharacteristics[charName as keyof {}];

  // useState(() => {
  //   setCheckedCharacteristics(props.allCheckedCharacteristics[charName as keyof {}])
  // })

  // useEffect(() => {
  //   props.setAllCheckedCharacteristics({ ...props.allCheckedCharacteristics, [charName]: checkedCharacteristics })
  // }, [checkedCharacteristics])


  return (
    <form className="characteristic-filter">
      <div className="buttons">
        {props.characteristics.map(characteristicValue => {
          return (
            <div className="button-container" key={characteristicValue.id}>
              <input
                type="checkbox"
                name={characteristicValue.value}
                id={"checkbox-" + characteristicValue.id}
                checked={Boolean(checkedCharacteristics?.find((c: string) => c === characteristicValue.value))}
                onChange={(e: any) => {
                  dispatch(selectCharacteristicsForName({ characteristic_name_id: charName, value: characteristicValue.value }))
                  // !checkedCharacteristics.find((c) => characteristicValue.value === c) ?
                  //   setCheckedCharacteristics([...checkedCharacteristics, characteristicValue.value]) :
                  //   setCheckedCharacteristics(checkedCharacteristics.filter(c => c !== characteristicValue.value));
                }}
              //   if (e.target.checked)
              //     setCheckedCharacteristics([...checkedCharacteristics, { ...checkedCharacteristics.filter(c => c.id === characteristicValue.id)[0], selected: true }])
              //   // dispatch(selectCharacteristic({
              //   //   characteristic_name_id: characteristicValue.characteristic_name_id,
              //   //   id: characteristicValue.id,
              //   //   value: characteristicValue.value
              //   // }))
              //   else
              //     setCheckedCharacteristics([...checkedCharacteristics, { ...checkedCharacteristics.filter(c => c.id === characteristicValue.id)[0], selected: false }])

              //   // dispatch(removeCharacteristic({ id: characteristicValue.id }))
              // }}
              />
              <label htmlFor={"checkbox-" + characteristicValue.id}>{characteristicValue.value}</label>
            </div>
          )
        })}
      </div>
    </form>
  )
}

export default CharacteristicFilter