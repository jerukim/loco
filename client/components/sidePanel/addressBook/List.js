import React from 'react'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {fetchHomes, fetchPlaces} from '../../../store'
import AddressCard from './AddressCard'
import {sort} from '../../../utilities'

const Placeholder = props => {
  return (
    <Typography component="p" children={props}></Typography>
  )
}

class List extends React.Component {
  componentDidMount() {
    if (this.props.userId) {
      if (this.props.name === 'homes') {
        this.props.fetchHomes(this.props.userId)
      } else {
        this.props.fetchPlaces(this.props.userId)
      }
    }
  }

  render() {
    const {list, name} = this.props

    return (
      {}
      <div>
        this.props.userId && (
          <ul className="list">
            {sort(list).map(item => {
              return (
                <li className="li-item" key={item.id}>
                  {name === 'homes' ? (
                    <AddressCard home={item} />
                  ) : (
                    <AddressCard place={item} />
                  )}
                </li>
              )
            })}
          </ul>
      </div>
      )
    )
  }
}

const mapHomes = state => ({
  userId: state.user.id,
  list: state.homes,
  places: state.places,
  name: 'homes'
})

const mapPlaces = state => ({
  userId: state.user.id,
  list: state.homes,
  name: 'places'
})

const mapHomesDispatch = dispatch => {
  return {
    fetchHomes: userId => dispatch(fetchHomes(userId))
  }
}

const mapPlacesDispatch = dispatch => {
  return {
    fetchPlaces: userId => dispatch(fetchPlaces(userId))
  }
}

export const HomesList = connect(mapHomes, mapHomesDispatch)(List)
export const PlacesList = connect(mapPlaces, mapPlacesDispatch)(List)
