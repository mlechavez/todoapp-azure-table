import { useEffect, useRef, useState } from "react";
import browserStorageService from "../services/browserStorageService";

export const useAppTheme = () => {
  const [themeColor, setThemeColor] = useState<string>("");
  const inputThemeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const themeColor = browserStorageService.getItem(
      "themeColor",
      "localStorage"
    );
    if (themeColor) {
      document.documentElement.style.setProperty("--main-color", themeColor);
      setThemeColor(themeColor);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputThemeRef && inputThemeRef.current?.value === themeColor) {
        browserStorageService.setItem("themeColor", themeColor, "localStorage");
        document.documentElement.style.setProperty("--main-color", themeColor);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [themeColor, inputThemeRef]);

  return { inputThemeRef, setThemeColor, themeColor };
};
