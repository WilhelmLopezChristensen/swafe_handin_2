import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AppGridNavigation, AppPageGrid } from "../../app_grid";

export function AppNavigation() {
  const isManager = localStorage.getItem("accountType") === "Manager";
  const isPersonalTrainer =
    localStorage.getItem("accountType") === "PersonalTrainer";
  const isClient = localStorage.getItem("accountType") === "Client";

  const location = useLocation();
  const showLoginButton =
    location.pathname !== "/login" && !localStorage.getItem("userToken");
  const showSignOutButton = localStorage.getItem("userToken");

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      setLoggedIn(false);
    }
  }, []);

  const [loggedIn, setLoggedIn] = React.useState<boolean>(true);

  const handleSignOut = async () => {
    if (loggedIn) {
      localStorage.clear();
      setLoggedIn(false);
      navigate("/login");
    }
  };

  return (
    <StyledAppNavigation>
      <StyledNavigation>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            fontSize: "40px",
          }}
        >
          Fitness application
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <StyledLink to="/">Home</StyledLink>
            {isManager && <StyledLink to="/manager">Manager</StyledLink>}
            {isPersonalTrainer && (
              <StyledLink to="/personal-trainer">Personal Trainer</StyledLink>
            )}
            {isClient && <StyledLink to="/client">Client</StyledLink>}
          </div>

          <div>
            {showLoginButton && (
              <button>
                <StyledLogin to="/login">Login</StyledLogin>
              </button>
            )}
            {showSignOutButton && (
              <StyledButton
                onClick={() => {
                  handleSignOut();
                }}
              >
                Sign out
              </StyledButton>
            )}
          </div>
        </div>
      </StyledNavigation>
    </StyledAppNavigation>
  );
}

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 1.2rem;
  font-weight: 300;
  transition: 0.2s ease-in-out;
  &:hover {
    color: #a9a9a9;
  }
  &:hover::after {
    content: "";
    display: block;
    width: 30%;
    height: 3px;
    background-color: #008000;
    transition: transform 250ms ease-in-out;
  `;

const StyledLogin = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 1.1rem;
  font-weight: 300;
`;

const StyledButton = styled.button`
  text-decoration: none;
  color: black;
  font-size: 1.1rem;
  font-weight: 300;
`;

const StyledNavigation = styled(AppPageGrid)`
  position: sticky;
  top: 0;
  min-height: 96vh;
  padding-bottom: 32px;
  white-space: nowrap;
  overflow: auto;
`;

const StyledAppNavigation = styled(AppGridNavigation)`
  padding: 0 24px;
  height: 100%;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 300px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  th {
    background-color: #4c4e52;
    color: #ffffff;
    text-align: center;
    padding: 12px 15px;
  }
  td {
    padding: 12px 15px;
  }
  tr {
    border-bottom: 1px solid #dddddd;
    text-align: center;
  }
`;
