import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
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
  const [activeSubIndex, setActiveSubIndex] = useState<
    Record<number, number | null>
  >({});

  const descriptionRefs = useRef<Array<HTMLDivElement | null>>(
    new Array(content.length).fill(null)
  );

  const subDescriptionRefs = useRef<
    Record<number, Array<HTMLDivElement | null>>
  >({});

  const closeSubDescriptions = (parentIndex: number) => {
    if (subDescriptionRefs.current[parentIndex]) {
      subDescriptionRefs.current[parentIndex].forEach(
        (subDescRef, subIndex) => {
          if (subDescRef) {
            gsap.to(subDescRef, {
              height: 0,
              opacity: 0,
              duration: 0.3,
            });
          }
        }
      );
    }
  };

  const handleToggle = (index: number) => {
    if (activeIndex !== null) {
      const currentDescriptionRef = descriptionRefs.current[activeIndex];

      closeSubDescriptions(activeIndex);

      if (currentDescriptionRef) {
        gsap.to(currentDescriptionRef, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setActiveIndex(activeIndex === index ? null : index);
            setActiveSubIndex({});
          },
        });
      } else {
        setActiveIndex(index);
        setActiveSubIndex({});
      }
    } else {
      setActiveIndex(index);
    }
  };

  const handleSubAccordionToggle = (parentIndex: number, subIndex: number) => {
    if (!subDescriptionRefs.current[parentIndex]) {
      subDescriptionRefs.current[parentIndex] = [];
    }

    const currentSubIndex = activeSubIndex[parentIndex] ?? null;

    if (currentSubIndex !== null) {
      const currentSubDescriptionRef =
        subDescriptionRefs.current[parentIndex]?.[currentSubIndex];

      if (currentSubDescriptionRef) {
        gsap.to(currentSubDescriptionRef, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setActiveSubIndex((prev) => ({
              ...prev,
              [parentIndex]: currentSubIndex === subIndex ? null : subIndex,
            }));
          },
        });
      } else {
        setActiveSubIndex((prev) => ({
          ...prev,
          [parentIndex]: subIndex,
        }));
      }
    } else {
      setActiveSubIndex((prev) => ({
        ...prev,
        [parentIndex]: subIndex,
      }));
    }
  };

  useEffect(() => {
    if (activeIndex !== null) {
      const descriptionRef = descriptionRefs.current[activeIndex];

      if (descriptionRef) {
        gsap.fromTo(
          descriptionRef,
          { height: 0, opacity: 0, y: -20 },
          {
            height: "auto",
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          }
        );
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    Object.keys(activeSubIndex).forEach((parentIndexStr) => {
      const parentIndex = parseInt(parentIndexStr);
      const subIndex = activeSubIndex[parentIndex];

      if (subIndex !== null && subIndex !== undefined) {
        const subDescriptionRef =
          subDescriptionRefs.current[parentIndex]?.[subIndex];

        if (subDescriptionRef) {
          gsap.fromTo(
            subDescriptionRef,
            { height: 0, opacity: 0, y: -20 },
            {
              height: "auto",
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              delay: 0.2,
            }
          );
        }
      }
    });
  }, [activeSubIndex]);

  const renderSubAccordion = (
    description: AccordionItem[],
    parentIndex: number
  ) => (
    <div className={styles.subAccordion}>
      {description.map((subItem, subIndex) => {
        const isSubActive = activeSubIndex[parentIndex] === subIndex;

        if (!subDescriptionRefs.current[parentIndex]) {
          subDescriptionRefs.current[parentIndex] = [];
        }

        return (
          <div key={subIndex}>
            <h4
              onClick={() => handleSubAccordionToggle(parentIndex, subIndex)}
              className={`${styles.accordionTitle} ${
                isSubActive ? styles.active : ""
              }`}
            >
              {subItem.title}
            </h4>
            <div
              ref={(el) => {
                if (subDescriptionRefs.current[parentIndex]) {
                  subDescriptionRefs.current[parentIndex][subIndex] = el;
                }
              }}
              className={`${styles.accordionDescription} ${
                isSubActive ? styles.visible : ""
              }`}
            >
              {Array.isArray(subItem.description) ? (
                subItem.description.map((item, idx) => (
                  <p key={idx}>{item.title}</p>
                ))
              ) : (
                <p>{subItem.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

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
            ref={(el) => {
              descriptionRefs.current[index] = el;
            }}
            className={`${styles.accordionDescription} ${
              activeIndex === index ? styles.visible : ""
            }`}
          >
            {item.description &&
              (Array.isArray(item.description) ? (
                renderSubAccordion(item.description, index)
              ) : (
                <p>{item.description}</p>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
