// EditableField.js
import React, { useState } from "react";

const EditableField = ({ label, value, isEditing, setIsEditing }) => {
  const [fieldValue, setFieldValue] = useState(value);

  const handleSave = () => {
    // Implement logic to save the updated field value to the server
    // This could involve making an API request to update the user's data
    // After successful save, setIsEditing(false) to exit editing mode
    setIsEditing(false);
  };

  return (
    <div className="mb-4">
      <label className="text-gray-700">{label}</label>
      {isEditing ? (
        <div className="flex">
          <input
            type="text"
            className="border rounded-md px-2 py-1 w-full"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-md px-2 ml-2"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <span className="mr-2">{fieldValue}</span>
          <button className="text-blue-500" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableField;
