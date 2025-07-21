import React, { useState, useEffect } from 'react';
import { Select, Tag, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

/**
 * DeselectableMultiSelect - A custom select component that allows deselecting options by clicking them again
 * Features:
 * - Click to select/deselect options
 * - Multiple selection support
 * - Visual feedback for selected items
 * - Custom rendering for options
 * - Compatible with Ant Design styling
 */
const DeselectableMultiSelect = ({
  value = [],
  onChange,
  placeholder = "Select options...",
  options = [],
  style,
  allowClear = true,
  renderOption,
  renderTag,
  maxTagCount,
  ...props
}) => {
  const [selectedValues, setSelectedValues] = useState(Array.isArray(value) ? value : []);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Sync with external value changes
  useEffect(() => {
    const newValues = Array.isArray(value) ? value : [];
    setSelectedValues(newValues);
  }, [value]);

  // Handle option click - toggle selection
  const handleOptionClick = (optionValue) => {
    let newSelected;

    if (selectedValues.includes(optionValue)) {
      // Deselect if already selected
      newSelected = selectedValues.filter(val => val !== optionValue);
    } else {
      // Select if not selected
      newSelected = [...selectedValues, optionValue];
    }

    setSelectedValues(newSelected);

    // Call onChange callback
    if (onChange) {
      onChange(newSelected);
    }
  };

  // Handle clear all
  const handleClear = () => {
    setSelectedValues([]);
    if (onChange) {
      onChange([]);
    }
  };

  // Handle tag close
  const handleTagClose = (removedValue) => {
    const newSelected = selectedValues.filter(val => val !== removedValue);
    setSelectedValues(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  // Custom dropdown render
  const dropdownRender = () => (
    <div style={{ maxHeight: '256px', overflowY: 'auto' }}>
      {options.map(option => {
        const isSelected = selectedValues.includes(option.value);
        return (
          <div
            key={option.value}
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              backgroundColor: isSelected ? '#f0f8ff' : 'transparent',
              borderLeft: isSelected ? '3px solid #1890ff' : '3px solid transparent',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.target.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleOptionClick(option.value);
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                {renderOption ? renderOption(option, isSelected) : (
                  <span style={{
                    fontWeight: isSelected ? 'bold' : 'normal',
                    color: isSelected ? '#1890ff' : 'inherit'
                  }}>
                    {option.label}
                  </span>
                )}
              </div>
              {isSelected && (
                <div style={{ color: '#1890ff', fontSize: '12px' }}>
                  ✓ Selected
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  // Custom tag render
  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const option = options.find(opt => opt.value === value);

    if (renderTag && option) {
      return renderTag(option, () => handleTagClose(value));
    }

    return (
      <Tag
        color="blue"
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Select
      mode="multiple"
      value={selectedValues}
      placeholder={placeholder}
      style={style}
      allowClear={allowClear}
      open={dropdownVisible}
      onDropdownVisibleChange={setDropdownVisible}
      dropdownRender={dropdownRender}
      tagRender={tagRender}
      maxTagCount={maxTagCount}
      onClear={handleClear}
      {...props}
    >
      {/* Empty options - we handle rendering in dropdownRender */}
    </Select>
  );
};

export default DeselectableMultiSelect;
