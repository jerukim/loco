import React from 'react'
import {connect} from 'react-redux'
import {fetchHomes} from '../../../store'

class HomesList extends React.Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.fetchHomes(this.props.userId)
    }
  }

  sortHomes() {
    const {homes} = this.props
    return homes.sort((a, b) => a.id - b.id)
  }

  render() {
    return this.props.userId ? (
      <ul className="homes-list">
        {this.sortHomes(this.props.homes).map(home => {
          return (
            <li key={home.id}>
              <div>
                <img src={home.imageUrl} />
                <h3>{home.location.address}</h3>
                <p>{home.price}</p>
              </div>
            </li>
          )
        })}
      </ul>
    ) : (
      <div>
        <p>Add addresses</p>
        <small>e.g. apartments, mom's house, pet hospital</small>
      </div>
    )
  }
}

const mapStateToProps = state => ({userId: state.user.id, homes: state.homes})

const mapDispatchToProps = dispatch => {
  return {
    fetchHomes: userId => dispatch(fetchHomes(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomesList)
