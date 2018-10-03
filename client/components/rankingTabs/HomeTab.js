import React from 'react'
import {connect} from 'react-redux'
import {HomeCard, PlaceInfo} from '..'

import {fetchHomes, fetchPlaces, fetchHomePlaces} from '../../store'

class HomeTab extends React.Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.fetchPlaces(this.props.userId)
      this.props.fetchHomePlaces(this.props.userId)
    }
  }

  render() {
    return this.props.userId ? (
      <div id="home-info">
        <HomeCard homeId={this.props.homeId} />
        <PlaceInfo homeId={this.props.homeId} />
      </div>
    ) : (
      <h1>add a place</h1>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchHomes: userId => dispatch(fetchHomes(userId)),
    fetchPlaces: userId => dispatch(fetchPlaces(userId)),
    fetchHomePlaces: userId => dispatch(fetchHomePlaces(userId))
  }
}

export default connect(mapState, mapDispatch)(HomeTab)
