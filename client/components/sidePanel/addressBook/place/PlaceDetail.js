import React from 'react'
import Typography from '@material-ui/core/Typography'

const PlaceDetail = props => {
  const {place} = props
  return (
    <div className="flex-wrap content-wrap">
      <Typography variant="body2">{place.location.address}</Typography>
      <Typography variant="body1">{place.name}</Typography>
    </div>
  )
}

export default PlaceDetail
