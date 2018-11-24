import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { USER_UPDATE, USERS_FETCH_SUCCESS } from "./types";

export const usersFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/`)
          .on('value', snapshot => {
              dispatch({ type: USERS_FETCH_SUCCESS, payload: snapshot.val()})
          });
  };
};

export const userUpdate = ({ prop, value, amount, date, type, note, repeating }) => {
  const { currentUser } = firebase.auth();

  // if (currentUser == currentUser.uid) {
    return {
      type: USER_UPDATE,
      payload: { prop, value }
    };
  // }
  // return (dispatch) => {
  //   firebase.database().ref(`/users/${currentUser.uid}/`)
  //       .push({ amount, date, type, note, repeating })
  //       .then(() => {
  //           dispatch({ type: USER_UPDATE });
  //           Actions.pop();
  //       });
  //};
  
};
