import React from "react";
import Button from "../../../../components/src/base/Button";
import { AnimatedButton } from "../../../../components/src/animated/AnimatedButton";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>AnimotionUI</h1>
      <p>Componenti React animati pronti all'uso</p>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          width: "100%",
          gridTemplateColumns: "repeat(3, 1fr)",
          maxWidth: "fit-content",
          margin: "0 auto",
        }}
      >
        <p style={{ gridColumn: "1 / span 3" }}>Base Buttons: </p>
        <Button variant="primary">Base</Button>
        <Button variant="secondary">Base</Button>
        <Button variant="outline">Base</Button>
        <p style={{ gridColumn: "1 / span 3" }}>Animated Buttons: </p>
        <AnimatedButton variant="outline" animationVariant="shadow">
          Animated
        </AnimatedButton>
        <AnimatedButton variant="full" animationVariant="shadow">
          Animated
        </AnimatedButton>
        <AnimatedButton variant="outline" animationVariant="repulsion">
          Animated
        </AnimatedButton>
        <AnimatedButton variant="full" animationVariant="repulsion">
          Animated
        </AnimatedButton>
      </div>
    </div>
  );
};

export default Home;
