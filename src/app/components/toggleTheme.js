import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

function ToggleThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    console.log(theme);
  }, [theme]);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => { 

setTheme(theme === "dark" ? "light" : "dark");
  console.log(theme);
  }

  return (
    <button
      onClick={toggleTheme}
      className="transition duration-300 absolute top-3 right-20"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ToggleThemeButton;
