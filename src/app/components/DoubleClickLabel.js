import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";

const DoubleClickLabel = (props) => {
  const [toggle, setToggle] = useState(true);
  const [inputValue, setInputValue] = useState(props.value);
  function toggleInput() {
    setToggle(!toggle);
  }

  function handleInputChange(value) {
    setInputValue(value);
    props.setInputData(value);
  }

  useEffect(() => {
    setInputValue(props.value);
    props.setInputData(props.value);
  }, [props]);

  return (
    <>
      {toggle ? (
        <p onDoubleClick={toggleInput}>{inputValue}</p>
      ) : (
        <InputText
          onDoubleClick={toggleInput}
          className="p-inputtext-sm block mb-2"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={toggleInput}
        />
      )}
    </>
  );
};

export default DoubleClickLabel;
