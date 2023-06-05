import React from "react";
import { handleLogin } from "../domain/utils";
import { View } from "../../view";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  StyledButton,
  StyledInput,
} from "../../personal_trainer_view/ui/WorkoutProgramExerciseDetails";
import styled from "styled-components";

export function LoginView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    handleLogin(data, navigate);
  };

  return (
    <View title="Loginpage">
      <StyledContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledFormField>
            Email
            <StyledInput
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && errors.email.type === "required" && (
              <span>This is required</span>
            )}
          </StyledFormField>
          <StyledFormField>
            Password
            <StyledInput
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && errors.password.type === "required" && (
              <span>This is required</span>
            )}
          </StyledFormField>
          <StyledButton type={"submit"}>Login</StyledButton>
        </form>
      </StyledContent>
    </View>
  );
}

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
