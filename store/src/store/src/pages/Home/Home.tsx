import React from "react";
import Button from "../../../../components/src/base/Button";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>AnimotionUI</h1>
      <p>Ready to use, animated, React components</p>
      <Button variant="primary">Button</Button>
      <Button variant="secondary">Button</Button>
      <Button variant="outline">Button</Button>
    </div>
  );
};

export default Home;
