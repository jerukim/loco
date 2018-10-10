import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles, AppBar, Tabs, Tab} from '@material-ui/core/'
import {HomeTab} from '../'
import {getBounds, getRanks} from '../../store'
import {rankHomes} from '../../utilities'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
})

class RankingTabs extends React.Component {
  // replace this ranking store
  state = {
    value: 0
  }

  handleChange = (event, value, homeId) => {
    this.setState({value})
    const {markers, getBounds, homes} = this.props
    // const {lat, lng} = homes[homeId].location
    // let markersArr = []
    // for (let key in markers[homeId]) {
    //   if (markers[homeId].hasOwnProperty(key)) {
    //     for (let i = 0; i < 5; i++) {
    //       markersArr.push(markers[key][i].geometry)
    //     }
    //   }
    // }
    // const bounds = getBounds(markersArr, {lat, lng})
  }

  rankHomes = () => {
    const {homes, homeCategories, homePlaces, selectedCategories} = this.props
    const data = rankHomes(
      homes,
      homeCategories,
      homePlaces,
      selectedCategories.selectedCategories
    )
    return data
  }

  render() {
    const {
      classes,
      homes,
      homeCategories,
      homePlaces,
      selectedCategories,
      rankings
    } = this.props
    const {value} = this.state
    if (!rankings.called) {
      const data = rankHomes(
        homes,
        homeCategories,
        homePlaces,
        selectedCategories.selectedCategories
      )
      this.props.getRanks(data)
    }

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
            {/* {homes.map((home, i) => <Tab key={home.id} label={i + 1} />)} */}
            {rankings.data &&
              homes.map((home, i) => {
                const homeId = rankings.data[i]
                return <Tab key={homeId} label={i + 1} />
              })}
          </Tabs>
        </AppBar>
        {/* <HomeTab homeId={dummyRank[value]} /> */}
        {rankings.data && <HomeTab homeId={rankings.data[value]} />}
      </div>
    )
  }
}

const mapState = state => {
  return {
    homes: state.homes,
    userId: state.user.id,
    markers: state.categoryResults,
    homeCategories: state.homeCategories,
    selectedCategories: state.selectedCategories,
    homePlaces: state.homePlaces,
    rankings: state.rankings
  }
}

const mapDispatch = dispatch => ({
  getBounds: (markers, homeLatLng) => dispatch(getBounds(markers, homeLatLng)),
  getRanks: rankData => dispatch(getRanks(rankData))
})

RankingTabs.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(RankingTabs))
