import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useState } from "react";

interface ChangeThemeProps{
  handleChangeTheme: (mode: "dark" | "light") => void;
}

function ChangeTheme(props: ChangeThemeProps) {
  const [isDarkMode, setDarkMode] = useState(true);

  const toggleDarkMode = (checked: boolean) => {
    const mode = checked ? "dark" : "light"
    setDarkMode(checked);
    props.handleChangeTheme(mode);
  };

  return (
    <DarkModeSwitch
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={24}
      sunColor="rgb(255, 168, 46)"
    />
  )
}

export default ChangeTheme;