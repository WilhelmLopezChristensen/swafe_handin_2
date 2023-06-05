export async function GetWorkOutProgram(id: number) {
  const endpoint = "https://fitnessbackend2022.azurewebsites.net/api";
  const response = await fetch(`${endpoint}/workoutprograms/client/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return response;
}
