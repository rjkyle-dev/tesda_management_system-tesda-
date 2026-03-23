import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { EncryptStorage } from 'encrypt-storage';

export const encryptStorage = new EncryptStorage(process.env.VUE_APP_USER_ID_SECRET, {
  storageType : 'localStorage',
  stateManagementUse : true
});

export default createStore({
  state: {
    user: null,
    serverUrl: null,
  },
  getters: {
  },
  mutations: {
    UPDATE_USER(state, payload){
      state.user = payload
    },
    UPDATE_SERVERURL(state, payload){
      state.serverUrl = payload
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: {
      setItem: (key, state) => encryptStorage.setItem(key, state),
      getItem: (key) => encryptStorage.getItem(key),
      removeItem: (key) => encryptStorage.removeItem(key)
    }
  })],
})
