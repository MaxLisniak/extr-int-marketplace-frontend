import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { toggleCharacteristic } from "../../../../features/filter/filterSlice";
import { CharacteristicName } from "../../../../features/types";
import "./CharacteristicFilter.scss";

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