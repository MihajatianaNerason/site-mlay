import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

const Button = ({ id, title, leftIcon, rightIcon, containerClass }) => {
  const buttonRef = useRef(null); // Référence pour le bouton
  const textRef = useRef(null); // Référence pour le texte

  useEffect(() => {
    // Timeline GSAP pour l'animation
    const tl = gsap.timeline({ paused: true });

    // Animation sur le texte
    tl.to(textRef.current, {
      duration: 0.2,
      yPercent: -150, // Le texte monte
      ease: "power2.in",
    })
      .set(textRef.current, { yPercent: 150 }) // Réinitialisation sous le bouton
      .to(textRef.current, {
        duration: 0.2,
        yPercent: 0, // Le texte remonte en place
      });

    // Ajout des événements au bouton
    const button = buttonRef.current;

    const handleMouseEnter = () => tl.play(0); // Lancer l'animation au hover
    const handleMouseLeave = () => tl.reverse(); // Revenir en arrière à la sortie

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup pour éviter les fuites de mémoire
    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef} // Référence pour le bouton
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-lg bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}
      <span
        ref={textRef} // Référence pour le texte
        className="relative inline-block font-general text-xs uppercase"
      >
        {title}
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
