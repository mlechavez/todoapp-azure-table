import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Redirect } from "react-router";

const HomeScreen = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const handleLogin = () => {
    instance.loginRedirect().catch((err) => {
      console.error(err);
    });
  };

  if (isAuthenticated) return <Redirect to="/tasks" />;

  return (
    <div className="home">
      <h1>Todo App</h1>
      <h2>Write, organise, and reprioritize your tasks more efficiently</h2>
      <button className="btn-sign-in" onClick={handleLogin}>
        Get started
      </button>
    </div>
  );
};

export default HomeScreen;
