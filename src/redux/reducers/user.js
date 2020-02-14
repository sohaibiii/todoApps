import _ from 'lodash';
import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  GETUSER,
  LOGINERR,
  SIGNUPERR,
  LOGOUTERR,
  GETUSERERR,
  GETALLUSERS,
} from '../../constants/actionsConstants';

var initialState = {
  user: {},
  users: [],
  isLoading: 'nill',
  hasErrored: false,
  userStatus: false,
  getuserErr: 'sadf',
  loader: new Date(),
  LogoutDone: 'notdone',
  adressStatus: 'not done',
  allUsersStatus: 'not done',
  idsUsersLoader: false,
  followers_following: [],

  likedPosts: [],
  likedPostsLoading: false,
  orderdUsers: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        userStatus: true,
        loader: new Date(),
        LogoutDone: 'notdone',
        user: action.payload,
      };
    }

    case GETUSER: {
      return {
        ...state,
        userStatus: true,
        loader: new Date(),
        LogoutDone: 'notdone',
        user: action.payload,
      };
    }

    case GETUSERERR: {
      return {
        ...state,
        user: {},
        userStatus: false,
        loader: new Date(),
        getuserErr: new Date(),
      };
    }

    case LOGOUT: {
      return {
        ...state,
        LogoutDone: 'done',
        userStatus: false,
        loader: new Date(),
        user: {},
      };
    }

    case LOGOUTERR: {
      return {
        ...state,
        LogoutDone: 'error',

        loader: new Date(),
      };
    }

    case LOGINERR:
      return {
        ...state,
        user: {},
        userStatus: false,
        loader: new Date(),
      };

    case SIGNUP:
      return {
        ...state,
        userStatus: true,
        loader: new Date(),
        LogoutDone: 'notdone',
        user: action.payload,
      };

    case SIGNUPERR:
      return {
        ...state,
        user: {},
        userStatus: false,
        loader: new Date(),
      };

    case GETALLUSERS:
      return {
        ...state,
        loader: new Date(),
        users: action.payload,
        allUsersStatus: 'done',
      };
    case 'DELETE_USER':
      let newUsers = state.users;
      let filterUsers = newUsers.filter(u => u.uid !== action.user.uid);

      return {
        ...state,
        users: filterUsers,
        loader: new Date(),
        allUsersStatus: 'done',
      };
    case 'DELETE_FOLLOW_USER':
      let newUserss = state.followers_following;
      let filterUserss = newUserss.filter(u => u.uid !== action.user.uid);

      return {
        ...state,
        followers_following: filterUserss,
        loader: new Date(),
        allUsersStatus: 'done',
      };

    case 'RESET_USERS_STATUS':
      return {
        ...state,
        loader: new Date(),
        allUsersStatus: 'not done',
      };
    case 'ALL_USERS_ERROR':
      return {
        ...state,
        allUsersStatus: 'error',
      };
    case 'UPDATE_USER_INFO':
      return {
        ...state,
        loader: new Date(),
        user: {
          ...state.user,
          brand: action.userUpdates.brand,
          status: action.userUpdates.details,
          username: action.userUpdates.username,
        },
      };
    case 'SET_IMAGE_FOR_AVATAR':
      return {
        ...state,
        user: {...state.user, avatar: action.payload},
      };
    case 'FOLLOW_USER':
      var us = state.users;
      var cUser = state.user;
      us.forEach(user => {
        if (user.uid === action.payload.user.uid) {
          if (user.followers.includes(action.payload.currentUser.uid)) {
            var i = user.followers.indexOf(action.payload.currentUser.uid);

            user.followers.splice(i, 1);

            // for current user

            var ci = cUser.following.indexOf(action.payload.user.uid);
            cUser.following.splice(ci, 1);
            return user;
          } else {
            user.followers.push(action.payload.currentUser.uid);
            cUser.following.push(user.uid);

            return user;
          }
        }

        return user;
      });

      return {
        ...state,
        users: us,
        loader: new Date(),
        user: cUser,
      };

    case 'FOLLOW_USER_FROM_FOLLOWER':
      var fus = state.followers_following;
      var cUser = state.user;
      fus.forEach(user => {
        if (user.uid === action.payload.user.uid) {
          if (user.followers.includes(action.payload.currentUser.uid)) {
            var i = user.followers.indexOf(action.payload.currentUser.uid);

            user.followers.splice(i, 1);

            // for current user

            var ci = cUser.following.indexOf(action.payload.user.uid);
            cUser.following.splice(ci, 1);
            return user;
          } else {
            user.followers.push(action.payload.currentUser.uid);
            cUser.following.push(user.uid);

            return user;
          }
        }

        return user;
      });

      return {
        ...state,
        followers_following: fus,
        loader: new Date(),
        user: cUser,
      };

    case 'PENDING_IDS_USERS':
      return {
        ...state,
        idsUsersLoader: action.isLoading,
      };
    case 'FOLLOWERS_FOLLOWING':
      return {
        ...state,
        followers_following: action.data,
      };
    case 'LIKED_POSTS':
      return {
        ...state,
        likedPosts: action.likedPosts,
      };
    case 'LIKED_POSTS_PENDING':
      return {
        ...state,
        likedPostsLoading: action.isLoading,
      };
    case 'REORDER_USERS':
      let allUsers = state.users;
      let userid = action.userid;
      let index = allUsers.findIndex(x => x.uid === userid);
      let a = allUsers[0];
      allUsers[0] = allUsers[index];
      allUsers[index] = a;
      return {
        ...state,
        loader: new Date(),
        users: allUsers,
        orderdUsers: allUsers,
      };

    default:
      return state;
  }
}
