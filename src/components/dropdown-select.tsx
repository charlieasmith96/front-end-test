import React from 'react';
import { Form } from 'react-bootstrap';

interface DropdownSelectProps {
    onChangeHandler: (e: any) => void,
    dates: Date[],
    selectedIndex: number,
    className? : string
}

export const DropdownSelect = (props: DropdownSelectProps) => (
  <Form.Control className={props.className} as="select" onChange={(e) => props.onChangeHandler(e)}>
    {props.dates.map((date, index, array) => {
      return (
        <option
          selected={index === props.selectedIndex}
          value={date.valueOf()}
        >
          {date.toDateString()}
        </option>
      );
    })}
  </Form.Control>
);
