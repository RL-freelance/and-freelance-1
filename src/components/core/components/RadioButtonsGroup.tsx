import React, {PureComponent, useState} from 'react';

import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { faker } from '@faker-js/faker'

export default function RadioButtonsGroup(
  { id, defaultValue, radios, triggerFunc, className = "groupRadio"}:
  { id: string, defaultValue: string | number, radios: { name: string, value: string | number}[], triggerFunc: Function, className?: string}
) {

    const [radioValue, setRadioValue] = useState(defaultValue);

    const changeFunc = (e: any) => {
      const value = e.target.value;
      setRadioValue(value);
      triggerFunc(e);
    }

    return (
        <ToggleButtonGroup name={id} type="radio" defaultValue={defaultValue} className={className} >
            {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`${id}-${idx}`}
                    type="radio"
                    variant={idx % 2 ? 'outline-secondary' : 'outline-secondary'}
                    name={id}
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => changeFunc(e)}
                >
                    {radio.name}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}
