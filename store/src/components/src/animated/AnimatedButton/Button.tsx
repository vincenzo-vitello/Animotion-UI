import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "./Button.module.css";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "bounce" | "pulse" | "slide";
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = "bounce",
  className = "",
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;

    if (!button) return;

    switch (variant) {
      case "bounce":
        gsap.to(button, {
          scale: 1.1,
          yoyo: true,
          repeat: 1,
          duration: 0.1,
          ease: "power1.inOut",
        });
        break;
      case "pulse":
        gsap.to(button, {
          scale: 1.05,
          repeat: 1,
          yoyo: true,
          duration: 0.2,
          ease: "power1.inOut",
        });
        break;
      case "slide":
        gsap.from(button, {
          x: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        break;
    }
  }, [variant]);

  return (
    <button
      ref={buttonRef}
      className={`${styles.animatedButton} ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;
