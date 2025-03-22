import React from "react";
import Logo from "./Logo";

export default function LogoForAuthPage() {
  return (
    <div className="fixed top-4 md:top-8 left-4 md:left-8 p-4 rounded shadow dark:border scale-75 hover:scale-100 transition-transform duration-300">
      <Logo />
    </div>
  );
}
