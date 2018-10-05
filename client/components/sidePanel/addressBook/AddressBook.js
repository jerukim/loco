import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import HomeIcon from '@material-ui/icons/Home'
import StarIcon from '@material-ui/icons/Star'
import Button from '@material-ui/core/Button'
import Autocomplete from './Autocomplete'
import {HomesList, PlacesList} from './List'
import '../../../../secrets'

const styles = theme => ({
  round: {
    height: '35px',
    maxWidth: '35px',
    left: '62px',
    bottom: '6px',
    opacity: '0.2',
    borderRadius: '100px',
    backgroundColor: 'white',
    margin: '0 62px'
  },
  vertical: {
    flexFlow: 'column',
    backgroundColor: '#5665bb'
  },
  home: {
    left: '-9px',
    fontSize: '12px',
    justifyContent: 'left',
    width: '67%'
  },
  star: {
    left: '-9px',
    fontSize: '12px',
    justifyContent: 'left'
  },
  label: {
    textTransform: 'capitalize'
  }
})

class AddressBook extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.userId !== this.props.userId || nextState !== this.state
  }

  handleClick = (event, value) => {
    this.setState({value})
  }

  render() {
    const {value} = this.state
    const {classes, homes, places} = this.props
    const type = value === 0 ? 'Home' : 'Place'
    return (
      <div className="addressbook-display side-panel-body">
        <Autocomplete
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
            process.env.GOOGLE_API_KEY
          }&libraries=places`}
          loadingElement={<div style={{height: `100%`}} />}
          type={type}
        />

        <div className="addressbook-select">
          <Button
            variant="contained"
            classes={{
              label: classes.label
            }}
            className={classes.home}
            onClick={event => this.handleClick(event, 0)}
            value={0}
          >
            <HomeIcon className={classes.rightIcon} />
            Homes
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.star}
            classes={{
              label: classes.label
            }}
            onClick={event => this.handleClick(event, 1)}
            value={1}
          >
            <StarIcon className={classes.rightIcon} />
            Saved Locations
          </Button>
        </div>

        {value === 0 &&
          homes && (
            <HomesList>
              <p>Add addresses</p>
            </HomesList>
          )}
        {value === 1 &&
          places && (
            <PlacesList>
              <div>
                <p>Bookmark important locations</p>
                <small>e.g. work, Mom's house, pet hospital</small>
              </div>
            </PlacesList>
          )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  homes: state.homes,
  places: state.places
})

export default connect(mapStateToProps)(withStyles(styles)(AddressBook))

{
  /* <AppBar position="static">
            <Tabs
              value={value}
              // classes={{
              //   indicator: classes.round,
              //   wrapper: {flexFlow: 'column'}
              // }}
              className={classes.vertical}
              onChange={this.handleChange}
            >
              <Tab
                disableRipple
                label="Homes"
                className={classes.vertical}
                icon={<HomeIcon />}
              />
              <Tab
                disableRipple
                label="Saved Places"
                className={classes.vertical}
                icon={<StarIcon />}
              />
            </Tabs>
          </AppBar> */
}
