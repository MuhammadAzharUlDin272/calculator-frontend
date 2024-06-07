import React from 'react';

const ItemSelectionList = ({ items, onSelectAll, onItemSelect, onClose }) => {
    return (
        <div className="flex flex-col w-full justify-center items-center gap-2 mt-4">
            <button onClick={onClose} className="absolute top-2 right-2">Close</button>
            <button onClick={onSelectAll} className="mb-2">Select All</button>
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        onChange={() => onItemSelect(index)}
                        className="form-checkbox h-5 w-5"
                    />
                    <span>{item.name}</span>
                </div>
            ))}
        </div>
    );
};

export default ItemSelectionList;
