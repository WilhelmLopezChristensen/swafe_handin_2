import { userType } from "../../login_view/domain/utils";

const endpoint = "https://fitnessbackend2022.azurewebsites.net/api";

export async function getPersonalTrainers(): Promise<userType[]> {
  const response = await fetch(`${endpoint}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log("getPersonalTrainers error:", error));

  if (response) {
    const personalTrainers = (response as userType[]).filter(
      (user) => user.accountType === "PersonalTrainer"
    );
    return personalTrainers as userType[];
  }
  return [];
}

export async function createPersonalTrainer(data: any) {
  let personalTrainer = data as userType;

  personalTrainer.accountType = "PersonalTrainer";

  await fetch(`${endpoint}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
    body: JSON.stringify(data),
  }).catch((error) => {
    console.error("createPersonalTrainer error:", error);
  });
}
