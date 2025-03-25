import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "./Button.module.css";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  animationVariant?: "trill" | "fill" | "slide";
  colorVariant?: "primary" | "secondary" | "outline";
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  animationVariant = "trill",
  colorVariant = "primary",
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const fillLayer = fillLayerRef.current;

    if (!button || !fillLayer) return;

    // Set initial position of fillLayer
    gsap.set(fillLayer, { x: "-100%", y: "100%", borderRadius: "50%" });

    const onMouseEnter = () => {
      switch (animationVariant) {
        case "trill":
          gsap.to(button, {
            keyframes: [
              { rotation: 5, x: 5, duration: 0.1 },
              { rotation: -5, x: -5, duration: 0.1 },
              { rotation: 5, x: 5, duration: 0.1 },
              { rotation: -5, x: -5, duration: 0.1 },
              { rotation: 0, x: 0, duration: 0.1 },
            ],
            scaleX: 1.1,
            scaleY: 0.9,
            duration: 0.5,
            ease: "sine.inOut",
          });
          break;

        case "fill":
          gsap.to(button, {
            scaleX: 1.1,
            scaleY: 0.9,
            duration: 0.5,
          });
          gsap.to(fillLayer, {
            x: "0%",
            y: "0%",
            borderRadius: "0%",
            duration: 0.5,
            ease: "power2.out",
          });

          break;

        case "slide":
          gsap.to(button, { x: 10, duration: 0.2, ease: "back.inOut" });
          break;
      }
    };

    const onMouseLeave = () => {
      switch (animationVariant) {
        case "trill":
          gsap.to(button, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.5,
            ease: "elastic.inOut",
          });
          break;
        case "fill":
          gsap.to(button, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.5,
          });
          gsap.to(fillLayer, {
            x: "-100%",
            y: "20%",
            borderRadius: "50%",
            duration: 0.3,
            ease: "power2.out",
          });
          break;

        case "slide":
          gsap.to(button, { x: 0, duration: 0.3 });
          break;
      }
    };

    button.addEventListener("mouseenter", onMouseEnter);
    button.addEventListener("mouseleave", onMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", onMouseEnter);
      button.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [animationVariant]);

  return (
    <button
      ref={buttonRef}
      className={`${styles.animatedButton} ${styles[animationVariant]} ${styles[colorVariant]}`}
      onClick={onClick}
    >
      <div ref={fillLayerRef} className={styles.fillLayer}></div>
      <span>{children}</span>
    </button>
  );
};

export default AnimatedButton;
