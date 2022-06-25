import { useState } from "react";
import Feather from "feather-icons-react";
import { useClickOutside } from "./useOutsideClick";
export default ({
  value,
  placeholder,
  options = [],
  onChange,
  compact,
  width
}) => {
  const [visible, setVisible] = useState(false);
  const handleValueClick = (e) => setVisible(!visible);
  const [localValue, setLocalValue] = useState(value);
  const ref = useClickOutside(() => setVisible(false));
  const selectedValue = options.find((option) =>
    [value, localValue].includes(option.value)
  )?.label;
  return (
    <div
      className={`dropdown-container ${compact ? "compact" : ""}`}
      ref={ref}
      style={{
        width: width ? width : ""
      }}
    >
      <div
        className={`selected-value`}
        onClick={handleValueClick}
        title={selectedValue || placeholder}
      >
        {selectedValue ? (
          <span>{selectedValue}</span>
        ) : (
          <span className="placeholder">{placeholder || "Select"}</span>
        )}
        <Feather icon={visible ? "chevron-down" : "chevron-right"} size={18} />
      </div>
      {visible && (
        <div className="dropdown-options">
          {options.map((option) => {
            return (
              <div
                onClick={(e) => {
                  onChange && onChange({ target: { value: option.value } });
                  setLocalValue(option.value);
                  setVisible(false);
                }}
                className="option"
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
