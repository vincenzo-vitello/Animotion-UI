import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Button.module.css";
import globalStyles from "./global.css";
interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant: "full" | "outline";
  animationVariant: "shadow" | "repulsion";
  customClass?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant,
  animationVariant,
  customClass = "",
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const addShadow = () => {
      const animation = gsap.to(button, {
        keyframes: [
          { rotate: 25, duration: 0.1, ease: "power1.inOut" },
          { rotate: -25, duration: 0.1, ease: "power1.inOut" },
          { rotate: 25, duration: 0.1, ease: "power1.inOut" },
          { rotate: -25, duration: 0.1, ease: "power1.inOut" },
          { rotate: 25, duration: 0.1, ease: "power1.inOut" },
          { rotate: -25, duration: 0.1, ease: "power1.inOut" },
          {
            rotate: 0,
            x: 5,
            y: -5,
            duration: 0.1,
            ease: "power1.inOut",
          },
        ],
        paused: true,
        onStart: () => {
          button.addEventListener("mouseleave", handleMouseLeave);
        },
        onComplete: () => {
          button.removeEventListener("mouseleave", handleMouseLeave);
        },
      });

      animation.play();

      const handleMouseLeave = () => {
        animation.pause();
        gsap.to(button, {
          x: 0,
          y: 0,
          rotate: 0,
          duration: 0.1,
          ease: "power3.inOut",
        });
      };
    };
    const removeShadow = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0.1,
        ease: "power3.inOut",
      });
    };

    const addRepulsion = (event: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const mouseX = event.clientX - (left + width / 2);
      const mouseY = event.clientY - (top + height / 2);

      gsap.to(button, {
        x: mouseX * 0.3,
        y: mouseY * 0.6,
        rotate: mouseX * 0.3,
        duration: 0.05,
        ease: "power3.inOut",
      });
    };

    const removeRepulsion = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.1, rotate: 0 });
    };

    if (animationVariant === "shadow") {
      button.addEventListener("mouseenter", addShadow);
      button.addEventListener("mouseleave", removeShadow);
    } else if (animationVariant === "repulsion") {
      button.addEventListener("mousemove", addRepulsion);
      button.addEventListener("mouseleave", removeRepulsion);
    }

    return () => {
      button.removeEventListener("mouseenter", addShadow);
      button.removeEventListener("mouseleave", removeShadow);
      button.removeEventListener("mousemove", addRepulsion);
      button.removeEventListener("mouseleave", removeRepulsion);
    };
  }, [animationVariant]);
  return (
    <div className={styles.animatedButtonWrapper}>
      <div
        className={`${styles.buttonBackground} ${styles[variant]} ${customClass}`}
      ></div>
      <button
        ref={buttonRef}
        className={`${styles.animatedButton} ${styles[variant]} ${customClass}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default AnimatedButton;
