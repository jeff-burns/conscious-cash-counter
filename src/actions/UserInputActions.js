import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { USER_UPDATE, USERS_FETCH_SUCCESS, USER_CREATE } from "./types";

export const usersFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/`)
          .on('value', snapshot => {
              dispatch({ type: USERS_FETCH_SUCCESS, payload: snapshot.val()})
          });
  };
};

export const userUpdate = ({ prop, value }) => {
    return {
      type: USER_UPDATE,
      payload: { prop, value }
    };
  };

export const userCreate = ({ amount, date, type, note, repeating }) => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  const email = currentUser.email;

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/`)
        .push({ uid, email, amount, date, type, note, repeating })
        .then(() => {
            dispatch({ type: USER_CREATE });
            // Actions.pop();
        });
  };
  
};
