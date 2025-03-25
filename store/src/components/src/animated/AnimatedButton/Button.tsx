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

  useEffect(() => {
    const button = buttonRef.current;

    if (!button) return;

    button.addEventListener("mouseenter", () => {
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
            ease: "sine.inOut",
          });
          break;
        case "slide":
          gsap.to(button, { x: 10, duration: 0.2, ease: "back.inOut" });
          break;
      }
    });
    button.addEventListener("mouseleave", () => {
      switch (animationVariant) {
        case "slide":
          gsap.to(button, { x: 0, duration: 0.3 });
          break;
      }
    });
  }, [animationVariant]);

  return (
    <button
      ref={buttonRef}
      className={`${styles.animatedButton} ${styles[animationVariant]} ${styles[colorVariant]}`}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
};

export default AnimatedButton;
