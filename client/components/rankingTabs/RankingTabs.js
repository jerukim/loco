import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles, AppBar, Tabs, Tab} from '@material-ui/core/'
import {HomeTab} from '../'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
})

const dummyRank = {
  0: 2,
  1: 1
}

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({value})
  }

  render() {
    const {classes} = this.props
    const {value} = this.state
    const homes = this.props.homes
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
    homes: state.homes
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState)(withStyles(styles)(ScrollableTabsButtonAuto))
