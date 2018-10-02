import React from 'react'
import {connect} from 'react-redux'
import {withStyles, AppBar, Tabs, Tab, Typography} from '@material-ui/core/'
import {HomeCard, PlaceInfo} from '..'

import {fetchHomes, fetchPlaces} from '../../store'

class RankTab extends React.Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.fetchPlaces(this.props.userId)
    }
  }

  render() {
    return this.props.userId ? (
      <div id="home-info">
        <HomeCard homeId={this.props.homeId} />
        <PlaceInfo />
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
    fetchPlaces: userId => dispatch(fetchPlaces(userId))
  }
}

export default connect(mapState, mapDispatch)(RankTab)
