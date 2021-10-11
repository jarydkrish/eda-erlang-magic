import userReducer from './user.reducer';

test('should set default state', () => {
  const state = { user: null };

  const action = { type: 'WEIRD_THING', payload: 'hello' };

  const newState = userReducer(state, action);
  expect(newState).toEqual({ user: null });
});

test('should handle SET_USER', () => {
  const state = {};

  const action = { type: 'SET_USER', payload: { id: 1, name: 'Bob' } };

  const newState = userReducer(state, action);
  expect(newState).toEqual({ id: 1, name: 'Bob' });
});

test('should unset the user when calling UNSET_USER', ()=> {
  const state = { id: 1, name: 'Bob' };

  const action = { type: 'UNSET_USER' };

  const newState = userReducer(state, action);
  expect(newState).toEqual({});
})
