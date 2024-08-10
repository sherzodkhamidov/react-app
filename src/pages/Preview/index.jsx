import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Preview.module.css";
import { useParams, useNavigate } from "react-router-dom";
import BASE_URL from "../../services/api";

const DocumentPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/documents/${id}`)
      .then((response) => {
        setDocument(response.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching document:", error);
        setError("Error fetching document");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {document ? (
          <>
            <h1 className={styles.title}>{document.documentName}</h1>
            <p className={styles.text}>ID: {id}</p>
            {document.fields.map((el, index) => (
              <div className={styles.card} key={index}>
                <p className={styles.text}>Field Name: {el.field_name}</p>
                <p className={styles.text}>Field Sequence: {el.field_seq}</p>
                <p className={styles.text}>Field Type: {el.field_type}</p>
                <p className={styles.text}>Is Mandatory: {el.is_mandatory ? 'Yes' : 'No'}</p>
                <p className={styles.text}>Select Values:</p>
                <ul>
                  {el.select_values ? JSON.parse(el.select_values).map((option, optIndex) => (
                    <li key={optIndex} className={styles.text}>
                      {option.label} ({option.value.toString()})
                    </li>
                  )) : "No select values"}
                </ul>
              </div>
            ))}
            <button className={styles.button} onClick={() => navigate("/")}>
              Back
            </button>
          </>
        ) : (
          <p>No document found</p>
        )}
      </div>
    </div>
  );
};

export default DocumentPreview;
