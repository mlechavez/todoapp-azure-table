import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { instance, accounts } = useMsal();
  const name = accounts[0] && accounts[0].name;

  const handleSignout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    instance
      .logoutRedirect()
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <AuthenticatedTemplate>
      <div className="profile">
        <p>
          Hi! {name}
          <Link to="/" onClick={handleSignout}>
            Sign out
          </Link>
        </p>
      </div>
    </AuthenticatedTemplate>
  );
};

export default Profile;
