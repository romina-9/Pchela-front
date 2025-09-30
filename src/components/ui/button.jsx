import React from "react";

export function Button({
  children,
  onClick,
  variant = "default",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center px-4 py-2 rounded-lg font-medium transition shadow-sm";

  const variants = {
    default: "bg-pink-600 text-white hover:bg-pink-700",
    outline: "border border-pink-600 text-pink-600 hover:bg-pink-50",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
