import firebase from 'firebase';
import { USER_DEBIT_UPDATE, USER_CREDIT_UPDATE, USERS_FETCH_SUCCESS, USER_CREATE } from "./types";

export const usersFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/`)
          .on('value', snapshot => {
              dispatch({ type: USERS_FETCH_SUCCESS, payload: snapshot.val()})
          });
  };
};

export const userDebitUpdate = ({ prop, value }) => {
    return {
      type: USER_DEBIT_UPDATE,
      payload: { prop, value }
    };
  };

export const userCreditUpdate = ({ prop, value }) => {
  return {
    type: USER_CREDIT_UPDATE,
    payload: { prop, value }
  };
};

export const userDebitCreate = ({ debitProp, debitAmount, debitDate, debitDateYYYYMM, debitType, debitNote, debitRepeating }) => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  const email = currentUser.email;

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/`)
        .push({ uid, email, debitProp, debitAmount, debitDate, debitDateYYYYMM, debitType, debitNote, debitRepeating })
        .then(() => {
            dispatch({ type: USER_CREATE });
        });
  };
};

export const userCreditCreate = ({ creditProp, creditAmount, creditDate, creditDateYYYYMM, creditType, creditNote, creditRepeating }) => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;
  const email = currentUser.email;

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/`)
        .push({ uid, email, creditProp, creditAmount, creditDate, creditDateYYYYMM, creditType, creditNote, creditRepeating })
        .then(() => {
            dispatch({ type: USER_CREATE });
        });
  };
};