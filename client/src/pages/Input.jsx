import React from 'react';
import { TextField, Grid } from '@material-ui/core';

//takes input from the text field and exports it to be used for project posts in the form of the executable
const Input = ({ name, handleChange, label, half, autoFocus, type }) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
    />
  </Grid>
);

export default Input;