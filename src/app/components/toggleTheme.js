import { useTheme } from "../context/themeContext";

function ToggleThemeButton() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`bg-${isDarkMode ? "blue-900" : "white"}`}>
      <button onClick={toggleTheme}>
        {isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
      </button>
      {/* Other content */}
    </div>
  );
}

export default ToggleThemeButton