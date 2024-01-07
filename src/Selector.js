import React from "react";
import Form from "react-bootstrap/Form";
import "./Selector.css"
export const Selector = ({ espID, setEspID }) => {
  const handleRadioChange = (event) => {
    // Update espID when a radio button is selected
    setEspID(event.target.value);
  };

  return (
    <Form className="Form">
      <div key={`default-radio`} className="mb-3">
        <Form.Label >Choose a device:</Form.Label>
        <Form.Check
          type={"radio"}
          id={`default-radio-0`}
          label={`Device 0`}
          value={0}
          checked={espID == 0}
          onChange={handleRadioChange}
        />

        <Form.Check
          type={"radio"}
          id={`default-radio-1`}
          label={`Device 1 (Fake data for development testing)`}
          value={1}
          checked={espID == 1}
          onChange={handleRadioChange}
        />
      </div>
    </Form>
  );
};
