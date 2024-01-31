import styles from "../src/App.module.css";
import GPMap from "./GPMap";
import React from "react";

export default function App() {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.brand}>
          <a href="#">GP Search</a>
        </div>
      </div>

      <div className={styles.mapContainer}>
        <GPMap></GPMap>
      </div>
    </>
  );
}
