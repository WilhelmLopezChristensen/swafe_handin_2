import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { StyledTable } from "../../app_navigation/ui/AppNavigation";
import { StyledManagerViewContent } from "../../manager_view";
import { AddExerciseToWorkoutProgram } from "../domain/Utils";
import { IWorkoutProgram } from "./AddWorkoutProgram";

interface WorkoutProgramExerciseDetailsProps {
  openDetails: boolean;
  onClose: () => void;
  selectedProgram: IWorkoutProgram;
}

export const WorkoutProgramExerciseDetails = ({
  openDetails,
  onClose,
  selectedProgram,
}: WorkoutProgramExerciseDetailsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitExercises = (data: any) => {
    AddExerciseToWorkoutProgram(data, selectedProgram.workoutProgramId);
    onClose();
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  return (
    <Dialog
      open={openDetails}
      onClose={onClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="md"
      fullWidth={true}
    >
      <form onSubmit={handleSubmit(onSubmitExercises)}>
        <DialogTitle id="scroll-dialog-title">Add exercise</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
            ref={descriptionElementRef}
          >
            <StyledManagerViewContent>
              <div>
                <StyledInput
                  type="name"
                  {...register("exerciseName", { required: true })}
                  placeholder="Name"
                />
                {errors.name && errors.name.type === "required" && (
                  <p>This field is required</p>
                )}

                <StyledInput
                  type="text"
                  {...register("exerciseDescription", { required: true })}
                  placeholder="Description"
                />
                {errors.text && errors.text.type === "required" && (
                  <p>This field is required</p>
                )}

                <StyledInput
                  type="text"
                  {...register("sets", { required: true })}
                  placeholder="Set"
                />
                {errors.sets && errors.sets.type === "required" && (
                  <p>This field is required</p>
                )}

                <StyledInput
                  type="text"
                  {...register("repetitions", { required: true })}
                  placeholder="Reps"
                />
                {errors.text && errors.text.type === "required" && (
                  <p>This field is required</p>
                )}

                <StyledInput
                  type="text"
                  {...register("time", { required: true })}
                  placeholder="Time"
                />
                {errors.text && errors.text.type === "required" && (
                  <p>This field is required</p>
                )}
                <StyledButton type={"submit"}>Create</StyledButton>
              </div>
            </StyledManagerViewContent>
            <StyledTable>
              <tr>
                <th>Excercise</th>
                <th>Description</th>
                <th>Set</th>
                <th>Reps</th>
                <th>Time</th>
              </tr>
              {selectedProgram.exercises.map((exercise: any) => (
                <tr>
                  <td>{exercise.name}</td>
                  <td>{exercise.description}</td>
                  <td>{exercise.sets}</td>
                  <td>{exercise.repetitions}</td>
                  <td>{exercise.time}</td>
                </tr>
              ))}
            </StyledTable>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{ color: "black" }}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  padding: 12px 20px;
  resize: vertical;
`;

export const StyledButton = styled.button`
  background-color: gray;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;

  &:hover {
    background-color: darkgray;
  }
`;
