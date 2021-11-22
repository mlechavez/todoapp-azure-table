import GlobalStyle from "./styles/global";
import RootScreen from "./screens/RootScreen";
import Navbar from "./components/navbar";
import MainContent from "./components/mainContent";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import Profile from "./components/auth/Profile";

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthenticatedTemplate>
        <Navbar />
        <MainContent>
          <Profile />
          <RootScreen />
        </MainContent>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <RootScreen />
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
