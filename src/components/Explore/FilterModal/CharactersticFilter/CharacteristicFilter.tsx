import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import "./CharacteristicFilter.scss";
import { selectCharacteristicsForName } from "../../../../features/filter/filterSlice";


const CharacteristicFilter = (
  props: {
    characteristics: {
      selected?: boolean | undefined;
      id: number,
      value: string,
      characteristic_name_id: number
    }[],
  }
) => {

  const dispatch = useAppDispatch();
  const charName = props.characteristics[0].characteristic_name_id;
  const allCheckedCharacteristics = useAppSelector(state => state.filter.selectedCharacteristics);
  const checkedCharacteristics = allCheckedCharacteristics[charName as keyof {}];

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
                }}
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