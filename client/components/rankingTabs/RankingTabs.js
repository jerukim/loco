import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles, AppBar, Tabs, Tab, Typography} from '@material-ui/core/'
import {RankTab} from '../'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
})

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
            {homes.map(home => <Tab key={home.id} label={home.id} />)}
          </Tabs>
        </AppBar>
        <RankTab homeId={value} home={homes[value]} />
        {/* {value === 0 && <TabContainer>Item One</TabContainer>} */}
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
