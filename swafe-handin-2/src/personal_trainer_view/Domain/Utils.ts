import { IClient } from "../ui/AddClient";

export async function GetWorkoutPrograms(): Promise<[]> {
  const endpoint = "https://fitnessbackend2022.azurewebsites.net/api";
  const response = await fetch(`${endpoint}/workoutprograms/trainer`, {
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

  if (response) {
    return response;
  }
  return [];
}

export async function GetClientWorkoutPrograms(clientId: number) {
  const endpoint = "https://fitnessbackend2022.azurewebsites.net/api";
  const response = await fetch(
    `${endpoint}/workoutprograms/client/${clientId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  )
    .then((response) => response.json())
    .then(async (data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  if (response) {
    return response;
  }
  return [];
}

export async function AddWorkOutProgram(data: any, clientId: number) {
  const endpoint = "https://fitnessbackend2022.azurewebsites.net/api";
  await fetch(`${endpoint}/workoutprograms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
    body: JSON.stringify({
      name: data.name,
      description: data.description,
      exercises: [],
      clientId: clientId,
    }),
  }).catch((error) => {
    console.error("Error:", error);
  });
}

export async function AddExerciseToWorkoutProgram(
  data: any,
  programId?: number
) {
  const endpoint = "https://fitnessbackend2022.azurewebsites.net/api";
  await fetch(`${endpoint}/exercises/Program/${programId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
    body: JSON.stringify({
      name: data.exerciseName,
      description: data.exerciseDescription,
      sets: data.sets,
      repetitions: data.repetitions,
      time: data.time,
    }),
  }).catch((error) => {
    console.error("Error:", error);
  });
}

export async function GetClients() {
  const endpoint = "https://fitnessbackend2022.azurewebsites.net/api";
  const response = await fetch(`${endpoint}/Users/Clients`, {
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

  if (response) {
    return response;
  }
  return [];
}

export async function AddClients(data: IClient, trainerId?: number) {
  console.log(data, trainerId);
  const endpoint = "https://fitnessbackend2022.azurewebsites.net/api";
  await fetch(`${endpoint}/Users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      personalTrainerId: trainerId,
      accountType: "Client",
    }),
  }).catch((error) => {
    console.error("Error:", error);
  });
}
