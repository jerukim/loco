import React from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

class Suggestions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: !!this.props.suggestions[0]
    }
  }

  componentDidUpdate(pastProps) {
    const diffProps = this.props.suggestions !== pastProps.suggestions
    if (diffProps && this.props.suggestions[0]) {
      this.setState({visible: true})
    } else if (diffProps && !this.props.suggestions[0]) {
      this.setState({visible: false})
    }
  }

  render() {
    const {classes, suggestions, getSuggestionItemProps, loading} = this.props
    const {visible} = this.state
    return visible ? (
      <div className="autocomplete-dropdown-container">
        <Paper className={classes.root} elevation={1}>
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
        </Paper>
      </div>
    ) : (
      <div />
    )
  }
}

Suggestions.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Suggestions)
