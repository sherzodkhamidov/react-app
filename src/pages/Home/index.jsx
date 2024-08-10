import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import BASE_URL from "../../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/documents`)
      .then((response) => {
        const fetchedData = response.data.data || [];
        setData(fetchedData);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  return (
    <div className={styles.table}>
      <Link to="/create" className={styles.btn}>
        Create New Document
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>DOCUMENT TITLE</th>
            <th>CREATED DATE</th>
            <th>DOCUMENT SIZE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.document_name}</td>
                <td>{item.created_at}</td>
                <td>{item.field_count}</td>
                <td>
                  <a
                    href={`/preview/${item.id}`}
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    Document preview
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
