import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-ink text-white shadow-soft hover:-translate-y-0.5 hover:bg-slate-800",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300",
  };

  return (
    <a
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
