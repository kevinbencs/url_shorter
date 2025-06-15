
import { useEffect, useState } from "react";

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
      {theme === "dark" ? "🌙" : "🌞"}
    </button>
  );
}