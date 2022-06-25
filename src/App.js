import "./styles.css";
import Dropdown from "./Dropdown";
import { useState } from "react";

const options = [
  {
    id: 1,
    label: "This is a very big label which will get truncated",
    value: 1
  },
  {
    id: 2,
    label: "Two",
    value: 2
  },
  {
    id: 3,
    label: "Three",
    value: 3
  },
  {
    id: 4,
    label: "Four",
    value: 4
  },
  {
    id: 5,
    label: "Five",
    value: 5
  }
];
export default () => {
  const [selected, setSelected] = useState("");
  const [selectedSecond, setSelectedSecond] = useState("");
  return (
    <div className="container">
      <Dropdown
        options={options}
        value={selected}
        compact
        placeholder={"D1"}
        onChange={(e) => setSelected(e.target.value)}
      />
      <Dropdown options={options} width={200} />
      <div className="selected-values-from-dropdown">
        <div>{selected || "Dropdown One Value"}</div>
        <div>{selectedSecond || "Dropdown Two Value (Uncontrolled)"}</div>
      </div>
    </div>
  );
};
