import { ThemePreference } from "auth";
import { useTheme } from "context";
import { actionTypes } from "context/reducer";

function Mode() {
  const [{ darkMode }, dispatch] = useTheme();
  return (
    <label
      htmlFor="mode"
      className={`relative w-12 h-6  ${
        darkMode === "dark" ? "bg-gray-800" : "bg-gray-200"
      }  rounded-full flex items-center transition cursor-pointer   px-1`}
    >
      <input
        type="checkbox"
        id="mode"
        className="appearance-none"
        onClick={() => {
          if (darkMode === "light") {
            dispatch({
              type: actionTypes.SET_THEME_PREFERENCE,
              payload: "dark",
            });
            localStorage.setItem("theme_preference", "dark");
            return;
          }
          dispatch({
            type: actionTypes.SET_THEME_PREFERENCE,
            payload: "light",
          });
          localStorage.setItem("theme_preference", "light");
        }}
      />
      <span
        className={`h-4 w-4  mover  absolute rounded-full  ${
          ThemePreference.theme() === "dark"
            ? "left-[28px] bg-green-800"
            : "left-[4px] bg-green-500"
        } `}
      ></span>
    </label>
  );
}

export default Mode;
