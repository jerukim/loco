/* eslint-disable react/display-name */
import TextField from '@material-ui/core/TextField'
import React from 'react'
import axios from 'axios'

export const renderFuncSearch = type => ({
  getInputProps,
  suggestions,
  getSuggestionItemProps,
  loading
}) => {
  const text = type === 'Home' ? 'Add Homes' : 'Add Places'
  return (
    <div className="content-wrap">
      <TextField
        InputProps={{
          ...getInputProps({
            className: 'location-search-input',
            style: {fontSize: '20px'}
          })
        }}
        label={text}
        style={{width: '96%'}}
        className="text-field"
        variant="outlined"
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
      label="Address"
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

export const reorderAndShift = (list, startIndex, endIndex) => {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  const shifted = result.map((item, index) => {
    return {...item, priority: index + 1}
  })
  return shifted
}

export const sort = arr => {
  return arr.sort((a, b) => a.id - b.id)
}

export const getUnselectedCategories = ({selected, categories}) => {
  const dictionary = selected.reduce((result, item) => {
    if (item.categoryId) {
      result[item.categoryId] = true
    }
    return result
  }, {})
  const unselected = categories.reduce((result, item) => {
    if (!dictionary[item.id]) result.push(item)
    return result
  }, [])
  return unselected
}

export const updateCategoriesInDb = async (event, {selected, userId}) => {
  if (selected && userId) {
    try {
      await axios.put(`/api/categories/${userId}`, {selected})
    } catch (err) {
      console.error('An error occured while updating selected categories')
    }
  }
}

export const states = [
  '',
  'AL',
  'AK',
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
]
