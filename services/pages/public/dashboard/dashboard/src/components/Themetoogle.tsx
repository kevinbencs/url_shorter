
import { useEffect, useState } from "react";
import { PiSunBold } from "react-icons/pi";
import { FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || ""
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "" : "dark")}
      className="p-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
    >
      {theme === "dark" ? <FaMoon /> : <PiSunBold className="text-yellow-400"/>}
    </button>
  );
}