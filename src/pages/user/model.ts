import { Reducer, Effect, Subscription } from 'umi';
import { getRemoteList, editRecord, deleteUser } from './service';

interface UserModelType {
  namespace: 'users';
  state: {};
  reducers: {
    getList: Reducer;
  };
  effects: {
    getRemote: Effect;
    edit: Effect;
    delete: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: UserModelType = {
  namespace: 'users',
  state: {},
  reducers: {
    getList(state, { payload }) {
      return payload;
    },
  },
  effects: {
    *getRemote(action, { call, put }) {
      const data = yield call(getRemoteList);
      console.log('4', data);

      yield put({
        type: 'getList',
        payload: data,
      });
    },
    *edit({ payload: { id, values } }, { call, put }) {
      console.log('edit,', id);
      console.log('edit,', values);

      const data = yield call(editRecord, { id, values });
    },
    *delete({ payload }, { call, put }) {
      console.log('payload', payload);

      const data = yield call(deleteUser, { id: payload });
      // yield put({
      //   type: 'delete',
      //   payload: data,
      // });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (location.pathname === '/user') {
          console.log('1');
          // dispatch({
          //   type: 'getRemote',
          // });
        }
      });
    },
  },
};

export default UserModel;
