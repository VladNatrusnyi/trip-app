import styles from './Select.module.scss';
import {useEffect, useRef, useState} from "react";
export const Select = ({ options, onSelect, width = 200 }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} style={{ width: `${width}px`}} className={`${styles.customSelect} ${isOpen ? styles.open : ''}`}>
      <div className={styles.selectedOption} onClick={toggleDropdown}>
        {selectedOption ? (
          <span>{selectedOption.label}</span>
        ) : (
          <span className={styles.placeholder}>Select an option</span>
        )}
        <i className={`bi bi-caret-down ${styles.arrow}`}></i>
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.option}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
