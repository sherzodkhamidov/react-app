import React, { useState } from "react";
import axios from "axios";
import styles from "./Create.module.css";
import BASE_URL from "../../services/api";
import { useNavigate } from "react-router-dom";

const CreateDocument = () => {
  const [documentName, setDocumentName] = useState("");
  const [formFields, setFormFields] = useState([
    {
      field_seq: 1,
      field_type: 1,
      field_name: "",
      is_mandatory: 0,
      select_values: [],
    },
  ]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleFieldChange = (index, event) => {
    const newFormFields = [...formFields];
    const { name, value, type, checked } = event.target;

    if (name === "is_mandatory") {
      newFormFields[index][name] = checked;
    } else if (name === "select_values") {
      newFormFields[index][name] = JSON.parse(value);
    } else {
      newFormFields[index][name] = value;
    }
    setFormFields(newFormFields);
  };

  const addField = () => {
    setFormFields([
      ...formFields,
      {
        field_seq: formFields.length + 1,
        field_type: 1,
        field_name: "",
        is_mandatory: 0,
        select_values: [],
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      document_name: documentName,
      form_values: formFields,
    };

    axios
      .post(`${BASE_URL}/documents/create`, data)
      .then((response) => {
        setSuccess("Document created successfully!");
        setError("");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error creating document:", err);
        setError("Error creating document");
        setSuccess("");
      });
  };

  return (
    <div className={styles.all}>
      <div className={styles.container}>
        <h1>Create New Document</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="documentName">Document Title:</label>
            <input
              type="text"
              id="documentName"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              required
            />
          </div>
          {formFields.map((field, index) => (
            <div key={index} className={styles.formGroup}>
              <label htmlFor={`field_seq_${index}`}>
                Field Sequence (weight):
              </label>
              <input
                type="number"
                id={`field_seq_${index}`}
                name="field_seq"
                value={field.field_seq}
                onChange={(e) => handleFieldChange(index, e)}
                required
              />
              <label htmlFor={`field_type_${index}`}>Field Type:</label>
              <select
                id={`field_type_${index}`}
                name="field_type"
                value={field.field_type}
                onChange={(e) => handleFieldChange(index, e)}
                required
              >
                <option value="1">Input</option>
                <option value="2">Select</option>
                <option value="3">NumberInput</option>
              </select>
              <label htmlFor={`field_name_${index}`}>Field Name:</label>
              <input
                type="text"
                id={`field_name_${index}`}
                name="field_name"
                value={field.field_name}
                onChange={(e) => handleFieldChange(index, e)}
                required
              />
              <label>
                <input
                  type="checkbox"
                  id={`is_mandatory_${index}`}
                  name="is_mandatory"
                  checked={field.is_mandatory}
                  onChange={(e) => handleFieldChange(index, e)}
                />
                Mandatory
              </label>
              {/* {field.field_type === "Select" && (
  <div>
    <label htmlFor={`select_values_${index}`}>
      Select Options:
    </label>
    <select
      id={`select_values_${index}`}
      name="select_values"
      value={field.select_values}
      onChange={(e) => handleFieldChange(index, e)}
    >
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>
)} */}
            </div>
          ))}
          <button type="button" onClick={addField} className={styles.addButton}>
            Add More
          </button>
          <button type="submit" className={styles.submitButton}>
            Save
          </button>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateDocument;
