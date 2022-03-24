export const Auth = {
  isInjected() {
    const InjectedProvider = localStorage.getItem(
      "WEB3_CONNECT_CACHED_PROVIDER"
    );

    if (!InjectedProvider) return false;
    return true;
  },
  clearInjected(cb) {
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    cb();
  },
};

export const ThemePreference = {
  theme() {
    const themePref = localStorage.getItem("theme_preference");

    return themePref;
  },
};
