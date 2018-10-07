import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const NumberField = props => {
  const {classes, price, handleChange} = props
  return (
    <TextField
      label="Price"
      value={price}
      className={classes.textField}
      placeholder="0"
      InputProps={{
        className: classes.input,
        type: 'number',
        startAdornment: <InputAdornment position="start">$</InputAdornment>
      }}
      inputProps={{max: '2147483647'}}
      onChange={handleChange('price')}
    />
  )
}

export default NumberField
