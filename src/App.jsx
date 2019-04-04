import React, { useState } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

// pick utils
import DateFnsUtils from '@date-io/date-fns';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Form from './Form';
import Result from './Result';
import './App.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});

const defaultMilestones = [
  { count: 100, unit: 'days' },
  { count: 500, unit: 'days' },
  { count: 1000, unit: 'days' },
  { count: 10000, unit: 'days' },
];

function App() {
  const [milestones, updateMilestones] = useState(defaultMilestones);
  const [resultMode, setResultMode] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());

  const generateMilestones = () => {
    setResultMode(true);
  };
  const reset = () => { setResultMode(false); };
  const form = (
    <Form
      milestones={milestones}
      updateMilestones={updateMilestones}
      generateMilestones={generateMilestones}
      selectedDate={selectedDate}
      handleDateChange={handleDateChange}
    />
  );
  const result = <Result milestones={milestones} reset={reset} selectedDate={selectedDate} />;
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <AppBar color="secondary" position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
                Milestones
            </Typography>
          </Toolbar>
        </AppBar>
        {resultMode ? result : form }
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default App;
