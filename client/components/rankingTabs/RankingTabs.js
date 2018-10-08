import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles, AppBar, Tabs, Tab} from '@material-ui/core/'
import {HomeTab} from '../'
import {getBounds} from '../../store'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
})

const dummyRank = {
  0: 2, // value: homeId
  1: 1,
  2: 5
}

class RankingTabs extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value, homeId) => {
    this.setState({value})
    const {markers, getBounds, homes} = this.props
    const {lat, lng} = homes[homeId].location
    let markersArr = []
    for (let key in markers[homeId]) {
      if (markers[homeId].hasOwnProperty(key)) {
        for (let i = 0; i < 5; i++) {
          markersArr.push(markers[key][i].geometry)
        }
      }
    }
    const bounds = getBounds(markersArr, {lat, lng})
  }

  render() {
    const {classes, homes} = this.props
    const {value} = this.state
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            {homes.map((home, i) => <Tab key={home.id} label={i + 1} />)}
          </Tabs>
        </AppBar>
        <HomeTab homeId={dummyRank[value]} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    homes: state.homes,
    userId: state.user.id,
    markers: state.categoryResults
  }
}

const mapDispatch = dispatch => ({
  getBounds: (markers, homeLatLng) => dispatch(getBounds(markers, homeLatLng))
})

RankingTabs.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(RankingTabs))
