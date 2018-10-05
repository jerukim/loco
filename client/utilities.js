/* eslint-disable react/display-name */
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import React from 'react'

export const renderFuncSearch = type => ({
  getInputProps,
  suggestions,
  getSuggestionItemProps,
  loading
}) => {
  const text = type === 'Home' ? 'Search Homes...' : 'Search Places...'
  return (
    <div className="content-wrap">
      <Input
        {...getInputProps({
          placeholder: text,
          className: 'location-search-input',
          style: {width: '100%', fontSize: '20px'}
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
}

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

export const sort = arr => {
  return arr.sort((a, b) => a.id - b.id)
}
