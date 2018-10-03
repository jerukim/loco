import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import React from 'react'

export const renderFuncSearch = ({
  getInputProps,
  suggestions,
  getSuggestionItemProps,
  loading
}) => (
  <div>
    <Input
      {...getInputProps({
        placeholder: 'Search Places ...',
        className: 'location-search-input'
      })}
    />

    <div className="autocomplete-dropdown-container">
      {loading && <div>Loading...</div>}
      {suggestions.map((suggestion, i) => {
        const className = suggestion.active
          ? 'suggestion-item--active'
          : 'suggestion-item'
        const style = suggestion.active
          ? {backgroundColor: '#fafafa', cursor: 'pointer'}
          : {backgroundColor: '#ffffff', cursor: 'pointer'}
        return (
          <div
            key={i}
            {...getSuggestionItemProps(suggestion, {
              className,
              style
            })}
          >
            <span>{suggestion.description}</span>
          </div>
        )
      })}
    </div>
  </div>
)

export const renderFuncEdit = ({
  getInputProps,
  suggestions,
  getSuggestionItemProps,
  loading
}) => (
  <div className="content-wrap no-margins">
    <TextField
      InputProps={{
        ...getInputProps({
          className: 'location-search-input',
          style: {marginBottom: '8px'}
        })
      }}
      label="Place"
      style={{width: '100%'}}
      className="text-field"
    />

    <div className="autocomplete-dropdown-container content-wrap no-margins">
      {loading && <div>Loading...</div>}
      {suggestions.map((suggestion, i) => {
        const className = suggestion.active
          ? 'suggestion-item--active'
          : 'suggestion-item'
        const style = suggestion.active
          ? {backgroundColor: '#fafafa', cursor: 'pointer'}
          : {backgroundColor: '#ffffff', cursor: 'pointer'}
        return (
          <div
            key={i}
            {...getSuggestionItemProps(suggestion, {
              className,
              style
            })}
          >
            <span>{suggestion.description}</span>
          </div>
        )
      })}
    </div>
  </div>
)
