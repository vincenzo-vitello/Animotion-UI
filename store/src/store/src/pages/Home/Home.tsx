import React from "react";
import Button from "../../../../components/src/base/Button";
import { AnimatedButton } from "../../../../components/src/animated/AnimatedButton";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>AnimotionUI</h1>
      <p>Componenti React animati pronti all'uso</p>
      <Button variant="primary">Esplora Componenti</Button>
      <AnimatedButton variant="bounce">Scopri Animazioni</AnimatedButton>
    </div>
  );
};

export default Home;
