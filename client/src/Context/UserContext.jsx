import React from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = React.useState(
    JSON.parse(localStorage.getItem("bookmarks"))
  );

  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  React.useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <UserContext.Provider
      value={{
        bookmarks,
        setBookmarks,
        theme,
        setTheme,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
