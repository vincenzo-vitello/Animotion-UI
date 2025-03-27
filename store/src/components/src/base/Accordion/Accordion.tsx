import React, { useState } from "react";
import styles from "./Accordion.module.css";

interface AccordionItem {
  title: string;
  description: string | AccordionItem[];
}

interface AccordionProps {
  content: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ content }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeSubIndex, setActiveSubIndex] = useState<{
    [key: number]: number | null;
  }>({});

  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));

    if (activeIndex !== index) {
      setActiveSubIndex({});
    }
  };

  const handleSubAccordionToggle = (parentIndex: number, subIndex: number) => {
    setActiveSubIndex((prevState) => ({
      ...prevState,
      [parentIndex]: prevState[parentIndex] === subIndex ? null : subIndex,
    }));
  };

  const renderDescription = (
    description: string | AccordionItem[],
    parentIndex: number
  ) => {
    if (Array.isArray(description)) {
      return (
        <div className={styles.subAccordion}>
          {description.map((subItem, subIndex) => (
            <div key={subIndex}>
              <h4
                onClick={() => handleSubAccordionToggle(parentIndex, subIndex)}
                className={`${styles.accordionTitle} ${
                  activeSubIndex[parentIndex] === subIndex ? styles.active : ""
                }`}
              >
                {subItem.title}
              </h4>
              <div
                className={`${styles.accordionDescription} ${
                  activeSubIndex[parentIndex] === subIndex
                    ? styles.visible
                    : styles.hidden
                }`}
              >
                {Array.isArray(subItem.description) ? (
                  subItem.description.map((item, index) => (
                    <p key={index}>{item.title}</p>
                  ))
                ) : (
                  <p>{subItem.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return <p>{description}</p>;
  };

  return (
    <div className={styles.accordion}>
      {content.map((item, index) => (
        <div key={index} className={styles.accordionItem}>
          <h3
            onClick={() => handleToggle(index)}
            className={`${styles.accordionTitle} ${
              activeIndex === index ? styles.active : ""
            }`}
          >
            {item.title}
          </h3>
          <div
            className={`${styles.accordionDescription} ${
              activeIndex === index ? styles.visible : styles.hidden
            }`}
          >
            {item.description && renderDescription(item.description, index)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
