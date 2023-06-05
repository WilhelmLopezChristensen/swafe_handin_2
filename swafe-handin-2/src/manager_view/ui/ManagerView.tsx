import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { userType } from "../../login_view/domain/utils";
import {
  StyledInput,
  StyledButton,
} from "../../personal_trainer_view/ui/WorkoutProgramExerciseDetails";
import { View } from "../../view";
import { createPersonalTrainer, getPersonalTrainers } from "../domain/utils";

export function ManagerView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [personalTrainers, setPersonalTrainers] = React.useState<userType[]>();

  React.useEffect(() => {
    getPersonalTrainers().then((res) => setPersonalTrainers(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalTrainers, createPersonalTrainer]);

  const onSubmit = (data: any) => {
    createPersonalTrainer(data);
    reset();
  };

  return (
    <View title="Manager View">
      <h2>Create a new personal trainer account</h2>
      <StyledManagerViewContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <StyledInput
              type="firstName"
              {...register("firstName", { required: true })}
              placeholder="First name"
            ></StyledInput>

            <StyledInput
              type="lastName"
              {...register("lastName", { required: true })}
              placeholder="Last name"
            ></StyledInput>

            <StyledInput
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
            ></StyledInput>
            {errors.email && errors.email.type === "required" && (
              <span>This field is required</span>
            )}
            <StyledInput
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
            ></StyledInput>
            {errors.password && errors.password.type === "required" && (
              <span>This field is required</span>
            )}
          </div>
          <div>
            <StyledButton type={"submit"}>Create</StyledButton>
          </div>
        </form>

        <StyledTable>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </tbody>
          <tbody>
            {personalTrainers &&
              personalTrainers.map((personalTrainer: any, index: any) => (
                <tr key={index}>
                  <td>{personalTrainer.firstName}</td>
                  <td>{personalTrainer.lastName}</td>
                  <td>{personalTrainer.email}</td>
                </tr>
              ))}
          </tbody>
        </StyledTable>
      </StyledManagerViewContent>
    </View>
  );
}

export const StyledManagerViewContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 0;
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
