import { Provider } from "./Context/Context";
import { UserProvider } from "./Context/UserContext";
import { Navigation } from "./Components/Navigation";

export const App = () => {
  return (
    <Provider>
      <UserProvider>
        <Navigation />
      </UserProvider>
    </Provider>
  );
};
