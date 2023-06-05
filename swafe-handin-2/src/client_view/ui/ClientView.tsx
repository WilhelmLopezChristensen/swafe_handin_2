import { View } from "../../view";
import { StyledTable } from "../../app_navigation/ui/AppNavigation";
import React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { GetWorkOutProgram } from "../domain/utils";

export function ClientView() {
  const [workOutProgram, setWorkOutProgram] = React.useState<[]>();
  const [clientExercises, setClient] = React.useState<[]>();

  const getWorkOutProgram = async (id: number) => {
    setWorkOutProgram(await GetWorkOutProgram(id));
  };

  React.useEffect(() => {
    const id = localStorage.getItem("userId");
    getWorkOutProgram(parseInt(id || "0"));

    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, []);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const handleClickOpen =
    (scrollType: DialogProps["scroll"], workoutProgram: any) => () => {
      setOpen(true);
      setScroll(scrollType);
      setClient(workoutProgram);
    };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  return (
    <View title="ClientView">
      <h2>Workout program</h2>

      <StyledTable>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th></th>
        </tr>
        {workOutProgram &&
          workOutProgram.map((workOutProgram: any, index: any) => (
            <tr key={index}>
              <td>{workOutProgram.name}</td>
              <td>{workOutProgram.description}</td>
              <td>
                <button
                  onClick={handleClickOpen("paper", workOutProgram.exercises)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
      </StyledTable>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="scroll-dialog-title">
          <h3>Exercises</h3>
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <StyledTable>
              <tr>
                <th>Excercise</th>
                <th>Description</th>
                <th>Set</th>
                <th>Reps/time</th>
              </tr>
              {clientExercises &&
                clientExercises.map((exercise: any, index: any) => (
                  <tr key={index}>
                    <td>{exercise.name}</td>
                    <td>{exercise.description}</td>
                    <td>{exercise.sets}</td>
                    <td>{exercise.repetitions}</td>
                  </tr>
                ))}
            </StyledTable>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "black" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </View>
  );
}
