import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  addDays, addMonths, addYears, format,
} from 'date-fns';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 3,
  },
  result: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: theme.palette.background.paper,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
  },
});

const processDate = (selectedDate, milestone) => {
  let dateFn = addDays;
  if (milestone.unit === 'months') {
    dateFn = addMonths;
  } else if (milestone.unit === 'years') {
    dateFn = addYears;
  }
  return dateFn(selectedDate, milestone.count);
};

const addToCalendar = (text, date, selectedDate, milestone) => {
  const root = 'https://calendar.google.com/calendar/r/eventedit?';
  const message = `${milestone.count} ${milestone.unit} since ${format(selectedDate, 'dd/MM/yyyy')}`;
  const nextDay = addDays(date, 1);
  const formattedDate = `${format(date, 'yyyyMMdd')}/${format(nextDay, 'yyyyMMdd')}`;
  const url = `${root}text=${text}&dates=${formattedDate}&details=${message}&sf=true&output=xml`;
  window.open(url, '_blank', 'false');
};

function Result(props) {
  const {
    classes, milestones, reset, selectedDate,
  } = props;
  const [text, setText] = useState('');
  return (
    <Grid className={classes.root} container alignItems="center">
      <div className={classes.result}>
        <div className={classes.section3}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="component-simple">What is the event?</InputLabel>
            <Input id="component-simple" value={text} onChange={(event) => { setText(event.target.value); }} />
          </FormControl>
        </div>
        <Divider variant="middle" />
        <div className={classes.section3}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Milestone</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {milestones.map((milestone) => {
                const id = `${milestone.count}${milestone.unit}`;
                const date = processDate(selectedDate, milestone);
                return (
                  <TableRow className={classes.row} key={id}>
                    <TableCell component="th" scope="row">
                      {milestone.count}
                      {' '}
                      {milestone.unit}
                    </TableCell>
                    <TableCell>{format(date, 'dd/MM/yyyy')}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => { addToCalendar(text, date, selectedDate, milestone); }}
                        variant="contained"
                        color="secondary"
                        size="small"
                      >
                        Add to calendar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className={classes.section3}>
          <Button onClick={reset} variant="contained" color="primary" fullWidth>
           Reset
          </Button>
        </div>
      </div>
    </Grid>
  );
}

Result.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Result);
