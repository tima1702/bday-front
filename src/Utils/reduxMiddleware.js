export default store => dispatch => action => {
  if (action.payload instanceof Promise) {

    dispatch({
      type: action.type + '_pending',
    });

    return action.payload.then(data => {
      dispatch({
        type: action.type + '_fulfilled',
        payload: data,
      });
      return data;
    }).catch(err => {
      dispatch({
        type: action.type + '_rejected',
        payload: err,
      });
      throw err;
    });
  }

  dispatch(action);
};
