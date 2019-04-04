import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { DatePicker } from 'material-ui-pickers';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 3,
  },
  form: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    margin: theme.spacing.unit,
  },
  section: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

const units = ['days', 'months', 'years'];

function Form(props) {
  const {
    classes, milestones, updateMilestones, generateMilestones, selectedDate, handleDateChange,
  } = props;

  const [count, setCount] = useState(1);
  const [unit, setUnit] = useState(units[0]);

  const addToMilestone = () => {
    const updatedMilestones = [...milestones];
    updatedMilestones.push({ count, unit });
    updateMilestones(updatedMilestones);
    setCount(1);
    setUnit(units[0]);
  };

  return (
    <Grid className={classes.root} container alignItems="center">
      <div className={classes.form}>
        <div className={classes.section}>
          <Typography gutterBottom variant="h4">
            Initial Date
          </Typography>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            autoOk
          />
        </div>
        <Divider variant="middle" />
        <div className={classes.section}>
          <Typography gutterBottom variant="h4">
            Milestones
          </Typography>
          <div>
            {milestones.map((milestone) => {
              const deleteMilestone = () => {
                const updatedMilestones = milestones.filter(ms => ms.count !== milestone.count
                  || ms.unit !== milestone.unit);
                updateMilestones(updatedMilestones);
              };
              return (
                <Chip
                  key={`${milestone.count}${milestone.unit}`}
                  label={`${milestone.count} ${milestone.unit}`}
                  className={classes.chip}
                  onDelete={deleteMilestone}
                />
              );
            })}
          </div>
        </div>
        <Divider variant="middle" />
        <div className={classes.section}>
          <Typography gutterBottom variant="h4">
            Add milestone
          </Typography>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="component-simple">Count</InputLabel>
            <Input id="component-simple" value={count} onChange={(event) => { setCount(event.target.value); }} />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="unit-simple">Unit</InputLabel>
            <Select
              value={unit}
              onChange={(event) => { setUnit(event.target.value); }}
              inputProps={{
                name: 'unit',
                id: 'unit-simple',
              }}
            >
              {units.map(ut => <MenuItem key={ut} value={ut}>{ut}</MenuItem>)}
            </Select>
          </FormControl>
          <br />
          <FormControl className={classes.formControl}>
            <Button onClick={addToMilestone} variant="contained" color="secondary" size="small">
             Add
            </Button>
          </FormControl>
        </div>
        <div className={classes.section}>
          <Button onClick={generateMilestones} variant="contained" color="primary" fullWidth>
           Generate Milestones
          </Button>
        </div>
      </div>
    </Grid>
  );
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  milestones: PropTypes.arrayOf(PropTypes.shape(
    {
      count: PropTypes.number,
      unit: PropTypes.string,
    },
  )),
  updateMilestones: PropTypes.func.isRequired,
  generateMilestones: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

Form.defaultProps = {
  milestones: [],
};
export default withStyles(styles)(Form);
