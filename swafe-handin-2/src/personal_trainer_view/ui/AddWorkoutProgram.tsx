import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { StyledTable } from "../../app_navigation/ui/AppNavigation";
import { StyledManagerViewContent } from "../../manager_view";
import {
  AddWorkOutProgram,
  GetClients,
  GetWorkoutPrograms,
} from "../domain/Utils";
import { IClient } from "./AddClient";
import { WorkoutProgramExerciseDetails } from "./WorkoutProgramExerciseDetails";

export interface IWorkoutProgram {
  workoutProgramId: number;
  name: string;
  description: string;
  exercises: [];
  personalTrainerId: number;
  clientId: number;
}

export const AddWorkoutProgram = () => {
  const [workOutProgram, setWorkOutProgram] = React.useState<[]>();
  const [clients, setClients] = React.useState<[]>();
  const [selectedProgram, setSelectedProgram] =
    React.useState<IWorkoutProgram>();

  const [clientId, setClientId] = React.useState<number>(0);

  const [open, setOpen] = React.useState(false);
  const [openDetails, setDetailsOpen] = React.useState(false);

  const workOutProgramForTrainer = async () => {
    setWorkOutProgram(await GetWorkoutPrograms());
  };

  const clientsList = async () => {
    setClients(await GetClients());
  };

  React.useEffect(() => {
    workOutProgramForTrainer();
    clientsList();
  }, [workOutProgram]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onClose = () => {
    setOpen(false);
  };

  const handleDetailsOpen = (workoutProgram: IWorkoutProgram) => {
    setDetailsOpen(true);
    setSelectedProgram(workoutProgram);
  };

  const onSubmitWorkoutProgram = (data: any) => {
    AddWorkOutProgram(data, clientId);
    onClose();
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Add workout program</button>
      <StyledTable>
        <tr>
          <th>Workout Program</th>
          <th>Description</th>
          <th>Exercises</th>
          <th></th>
        </tr>
        {workOutProgram?.map((workOutProgram: IWorkoutProgram) => (
          <tr>
            <td>{workOutProgram.name}</td>
            <td>{workOutProgram.description}</td>
            <td>{workOutProgram.exercises.length}</td>
            <td>
              <button onClick={() => handleDetailsOpen(workOutProgram)}>
                Details
              </button>
            </td>
          </tr>
        ))}
      </StyledTable>
      {selectedProgram && (
        <WorkoutProgramExerciseDetails
          openDetails={openDetails}
          onClose={() => setDetailsOpen(false)}
          selectedProgram={selectedProgram}
        />
      )}
      <Dialog
        open={open}
        onClose={onClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
        fullWidth={true}
      >
        <form onSubmit={handleSubmit(onSubmitWorkoutProgram)}>
          <DialogTitle id="scroll-dialog-title">
            Add workout program
          </DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
              ref={descriptionElementRef}
            >
              <StyledManagerViewContent>
                <div>
                  <StyledInput
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Name"
                  />
                  {errors.name && errors.name.type === "required" && (
                    <p>This field is required</p>
                  )}

                  <StyledInput
                    type="text"
                    {...register("description", { required: true })}
                    placeholder="Description"
                  />
                  {errors.description &&
                    errors.description.type === "required" && (
                      <p>This field is required</p>
                    )}

                  <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Client</InputLabel>
                    <Select labelId="demo-select-small" id="demo-select-small">
                      {clients?.map((client: IClient) => (
                        <MenuItem
                          value={client.userId}
                          onClick={() => setClientId(client.userId)}
                        >
                          {client.firstName} {client.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </StyledManagerViewContent>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type={"submit"} sx={{ color: "green" }}>
              Add
            </Button>
            <Button onClick={onClose} sx={{ color: "black" }}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const StyledInput = styled.input`
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
