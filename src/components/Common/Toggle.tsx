import React, { useState } from 'react';

interface ToggleProps<T> {
  items: T[];
  onSelect: (item: T) => void;
  selectedItem?: T;
  getItemLabel: (item: T) => string;
  getItemKey?: (item: T, index: number) => string | number;
  placeholder?: string;
  loading?: boolean;
  error?: string | null;
  loadingText?: string;
  errorText?: string;
  emptyText?: string;
}

const styles = {
  toggle: {
    position: 'relative' as const,
    width: '100%',
    marginBottom: '1rem',
  },
  toggleHeader: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    padding: '0.75rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  toggleArrow: {
    transition: 'transform 0.2s ease',
  },
  toggleArrowOpen: {
    transform: 'rotate(180deg)',
  },
  toggleDropdown: {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    width: '100%',
    maxHeight: '200px',
    overflowY: 'auto' as const,
    border: '1px solid #ccc',
    borderTop: 'none',
    borderRadius: '0 0 4px 4px',
    backgroundColor: '#fff',
    zIndex: 10,
  },
  toggleItem: {
    padding: '0.75rem 1rem',
    cursor: 'pointer',
  },
  toggleItemHover: {
    backgroundColor: '#f5f5f5',
  },
  toggleItemSelected: {
    backgroundColor: '#e6f7ff',
  },
  toggleEmpty: {
    padding: '0.75rem 1rem',
    color: '#999',
  },
  toggleLoading: {
    padding: '0.75rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f5f5f5',
  },
  toggleError: {
    padding: '0.75rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f5f5f5',
    color: '#ff4d4f',
  },
};

function Toggle<T>({
  items,
  onSelect,
  selectedItem,
  getItemLabel,
  getItemKey = (_, index) => index,
  placeholder = 'Select an item',
  loading = false,
  error = null,
  loadingText = 'Loading items...',
  errorText = 'Failed to load items',
  emptyText = 'No items available'
}: ToggleProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: T): void => {
    onSelect(item);
    setIsOpen(false);
  };

  if (loading) return <div style={styles.toggleLoading}>{loadingText}</div>;
  if (error) return <div style={styles.toggleError}>{errorText}</div>;

  const selectedLabel = selectedItem ? getItemLabel(selectedItem) : placeholder;

  return (
    <div style={styles.toggle}>
      <div style={styles.toggleHeader} onClick={handleToggle}>
        <span>{selectedLabel}</span>
        <span style={{
          ...styles.toggleArrow,
          ...(isOpen ? styles.toggleArrowOpen : {})
        }}>▼</span>
      </div>
      
      {isOpen && (
        <div style={styles.toggleDropdown}>
          {items.length === 0 ? (
            <div style={styles.toggleEmpty}>{emptyText}</div>
          ) : (
            items.map((item, index) => {
              const label = getItemLabel(item);
              const key = getItemKey(item, index);
              const isSelected = selectedItem && getItemLabel(selectedItem) === label;
              
              return (
                <div 
                  key={key} 
                  style={{
                    ...styles.toggleItem,
                    ...(isSelected ? styles.toggleItemSelected : {})
                  }}
                  onClick={() => handleSelect(item)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 
                      isSelected ? '#e6f7ff' : '';
                  }}
                >
                  {label}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default Toggle; 