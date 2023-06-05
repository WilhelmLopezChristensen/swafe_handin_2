import { Tab, Tabs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { View } from "../../view";

import { AddWorkoutProgram } from "./AddWorkoutProgram";
import { GetClients, GetWorkoutPrograms } from "../domain/Utils";
import { AddClient } from "./AddClient";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const PersonalTrainerView = () => {
  const [workOutProgram, setWorkOutProgram] = React.useState<[]>();

  const [clients, setClients] = React.useState<[]>();

  React.useEffect(() => {
    workOutProgramForTrainer();
    personalTrainerClients();
  }, []);

  //Tab constants
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //exercise program constants
  const workOutProgramForTrainer = async () => {
    setWorkOutProgram(await GetWorkoutPrograms());
  };

  const personalTrainerClients = async () => {
    setClients(await GetClients());
  };

  return (
    <View title="Personal Trainer View">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Welcome" {...a11yProps(0)} />
          <Tab label="Clients" {...a11yProps(1)} />
          <Tab label="Workout programs" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Welcome to the personal trainer view
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddClient />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AddWorkoutProgram />
      </TabPanel>
    </View>
  );
};
