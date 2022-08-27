import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateCharacteristicName } from "../../../../features/admin/thunks";
import { toggleCharacteristic } from "../../../../features/filter/filterSlice";
import { CharacteristicName } from "../../../../features/filter/types";
import "./CharacteristicFilter.scss";
// import { selectCharacteristicsForName } from "../../../../features/filter/filterSlice";
// import selectCharacteristicsForName 

const CharacteristicFilter = (
  props: { characteristicNameNameValue: string }
) => {

  const dispatch = useAppDispatch();
  const characteristicName = useAppSelector<CharacteristicName | undefined>(
    state => state.filter.characteristicNames
      .find(CharacteristicName =>
        CharacteristicName.name === props.characteristicNameNameValue
      )
  )
  // const charName = props.characteristics[0]?.characteristic_name_id;
  // const allCheckedCharacteristics = useAppSelector(state => state.filter.selectedCharacteristics);
  // const checkedCharacteristics = allCheckedCharacteristics[charName as keyof {}];

  return (
    <form className="characteristic-filter">
      <div className="buttons">
        {characteristicName?.characteristics
          .filter(characteristicValue => characteristicValue.value)
          .map(characteristicValue => {
            return (
              <div className="button-container" key={characteristicValue.id}>
                <input
                  type="checkbox"
                  name={characteristicValue.value}
                  id={"checkbox-" + characteristicValue.id}
                  checked={
                    characteristicValue.selected ?
                      characteristicValue.selected :
                      false
                  }
                  onChange={(e) => {
                    dispatch(toggleCharacteristic(
                      {
                        name: props.characteristicNameNameValue,
                        characteristicId: characteristicValue.id,
                      }
                    ))
                  }}
                // checked={Boolean(checkedCharacteristics?.find((c: string) => c === characteristicValue.value))}
                // onChange={(e: any) => {
                //   dispatch(selectCharacteristicsForName({ characteristic_name_id: charName, value: characteristicValue.value }))
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