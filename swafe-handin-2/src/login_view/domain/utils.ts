import { NavigateFunction } from "react-router-dom";

export type userType = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personalTrainerId: number;
  accountType: string;
};

const endpoint = "https://fitnessbackend2022.azurewebsites.net/api";

export async function handleLogin(data: any, navigate: NavigateFunction) {
  const loginCredentials = data as userType;

  await fetch(`${endpoint}/users/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginCredentials),
  })
    .then((response) => response.json())
    .then((loginResponse) => {
      if (!loginResponse.jwt) {
        alert("Invalid login");
      } else {
        setUser(loginResponse.jwt, loginCredentials.email).then(() =>
          navigate("/")
        );
      }
    })
    .catch((error) => {
      console.error("handleLogin error:", error);
    });
}

export async function setUser(userJWT: string, email: string) {
  localStorage.setItem("userToken", userJWT);
  await fetch(`${endpoint}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userJWT}`,
    },
  })
    .then((response) => response.json())
    .then((userList: userType[]) => {
      userList.forEach((user) => {
        if (user.email === email) {
          localStorage.setItem("accountType", user.accountType);
          localStorage.setItem("userId", user.userId.toString());
        }
      });
    })
    .catch((error) => {
      console.log("setUser error:", error);
    });
}
