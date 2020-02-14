import React from 'react';
import {connect} from 'react-redux';
import {startGetCurrentUser} from '../../actions/user';
import Loader from './Loader';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    console.log('Current user: ', this.props.user);

    this.props.startGetCurrentUser();
    

    
  };

  componentWillReceiveProps(nextProps) {
    console.log('hello i am called', nextProps.userStatus);
    if (nextProps.userStatus) {
      this.props.navigation.navigate('Main');
    }
    if (!nextProps.userStatus) {
      this.props.navigation.navigate('Login');
    }
  }

  // Render any loading content that you like here
  render() {
    return <Loader />;
  }
}

const mapStateToProps = store => ({
  user: store.user.user,
  loader: store.user.loader,
  userStatus: store.user.userStatus,
});

export default connect(mapStateToProps, {
  startGetCurrentUser,
})(AuthLoadingScreen);
