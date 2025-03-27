import React from "react";
import Accordion from "../../../../components/src/base/Accordion";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>AnimotionUI</h1>
      <p className="home__description">
        Ready to use, animated, React components
      </p>
      <div
        style={{
          width: "60%",
          margin: "0 auto",
        }}
      >
        <Accordion
          content={[
            {
              title: "Accordion 1",
              description: [
                {
                  title: "Accordion 1.1",
                  description: "Description 1.1",
                },
                {
                  title: "Accordion 1.2",
                  description: "Description 1.2",
                },
              ],
            },
            {
              title: "Accordion 2",
              description: "Description 2",
            },
            {
              title: "Accordion 3",
              description: "Description 3",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
