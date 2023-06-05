import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { StyledTable } from "../../app_navigation/ui/AppNavigation";
import { StyledManagerViewContent } from "../../manager_view";
import {
  GetClients,
  AddClients,
  GetClientWorkoutPrograms,
} from "../domain/Utils";
import { IWorkoutProgram } from "./AddWorkoutProgram";

export interface IClient {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personalTrainerId: number;
  accountType: string;
}

export const AddClient = () => {
  const [open, setOpen] = React.useState(false);
  const [openWorkOutProgram, setOpenWorkOutProgram] = React.useState(false);
  const [clients, setClients] = React.useState<[]>();
  const [clientId, setClientId] = React.useState<number>(0);

  const [clientWorkOutProgram, setClientWorkOutProgram] = React.useState<[]>();

  const clientWorkOutPrograms = async () => {
    setClientWorkOutProgram(await GetClientWorkoutPrograms(clientId));
  };

  const personalTrainerClients = async () => {
    setClients(await GetClients());
  };

  React.useEffect(() => {
    personalTrainerClients();
    clientWorkOutPrograms();
  }, [clients]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleButtonAddClient = (scrollType: DialogProps["scroll"]) => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setOpenWorkOutProgram(false);
  };

  const onSubmitClient = async (data: any) => {
    var personalId = localStorage.getItem("userId");
    var personalTrainerId = parseInt(personalId!);
    AddClients(data, personalTrainerId);
    onClose();
  };

  const handleWorkoutProgramOpen = (clientId: IClient) => {
    setOpenWorkOutProgram(true);
    setClientId(clientId.userId);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  return (
    <div>
      <button onClick={() => handleButtonAddClient("paper")}>Add Client</button>
      <StyledTable>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
          <th></th>
        </tr>
        {clients?.map((client: IClient) => (
          <tr>
            <td>{client.firstName}</td>
            <td>{client.lastName}</td>
            <td>{client.email}</td>
            <td>
              <button onClick={() => handleWorkoutProgramOpen(client)}>
                Workout program
              </button>
            </td>
          </tr>
        ))}
      </StyledTable>

      <Dialog
        open={open}
        onClose={onClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
        fullWidth={true}
      >
        <form onSubmit={handleSubmit(onSubmitClient)}>
          <DialogTitle id="scroll-dialog-title">Add Client</DialogTitle>
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
                    {...register("firstName", { required: true })}
                    placeholder="First name"
                  />
                  {errors.name && errors.name.type === "required" && (
                    <p>This field is required</p>
                  )}

                  <StyledInput
                    type="text"
                    {...register("lastName", { required: true })}
                    placeholder="Last name"
                  />
                  {errors.lastName && errors.lastName.type === "required" && (
                    <p>This field is required</p>
                  )}

                  <StyledInput
                    type="text"
                    {...register("email", { required: true })}
                    placeholder="Email"
                  />
                  {errors.email && errors.email.type === "required" && (
                    <p>This field is required</p>
                  )}

                  <StyledInput
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                  />
                  {errors.password && errors.password.type === "required" && (
                    <p>This field is required</p>
                  )}
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

      <Dialog
        open={openWorkOutProgram}
        onClose={onClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle id="scroll-dialog-title">Workout program</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
            ref={descriptionElementRef}
          >
            <StyledTable>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Exercises</th>
              </tr>
              {clientWorkOutProgram?.map((workOutProgram: IWorkoutProgram) => (
                <tr>
                  <td>{workOutProgram.name}</td>
                  <td>{workOutProgram.description}</td>
                  <td>{workOutProgram.exercises.length}</td>
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
