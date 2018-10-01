import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSelectedCategories} from '../../../store/'
// Material UI
import Chip from '@material-ui/core/Chip'

function handleDelete() {
  alert('You clicked the delete icon.')
}

class SelectedCategories extends Component {
  componentDidMount() {
    this.props.fetchSelectedCategories()
  }

  render() {
    const {classes} = this.props
    const selectedCategories = this.props.selectedItems
    if (this.props.selectedErrored) {
      return <p>Sorry! There was an error loading your selected filters</p>
    }

    if (this.props.selectedFetching) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <div>
          <h4>CATEGORY FILTERS</h4>
        </div>
        <div>
          <h5>SELECTED CATEGORIES</h5>
        </div>
        <div>
          {selectedCategories &&
            selectedCategories.map(category => (
              <Chip
                key={category.id}
                label="Deletable Primary Chip"
                onDelete={handleDelete}
                className={classes.chip}
                color="primary"
                variant="outlined"
              >
                {selectedCategories.type.replace(/_/g, ' ')}
              </Chip>
            ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedErrored: state.categories.selectedErrored,
    selectedFetching: state.categories.selectedFetching,
    selectedItems: state.categories.selectedItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelectedCategories: () => dispatch(fetchSelectedCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCategories)

//
//
//
//-------PREVIOUS PLACEHOLDER-------------------
//
//
//
// import React, {Component} from 'react'

// class SelectedCategories extends Component {
//   render() {
//     return <p>placeholder</p>
//   }
// }
// export default SelectedCategories
