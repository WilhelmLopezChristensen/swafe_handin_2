import React from "react";
import { View } from "../../view";

export function HomeView() {
  const userName = localStorage.getItem("userName");

  return (
    <View title="Home">
      <h2>Welcome to the fitness application!</h2>
      <h3>{userName}</h3>
      <p>
        This application is designed to help you manage your fitness goals and
        track your progress.
      </p>
    </View>
  );
}
