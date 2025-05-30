import { defineStore } from 'pinia'


export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
      name: 'Joao Paulo',
      email: 'jprodrigues6@gmail.com'
    }
  }),
  getters: {
    // Define any getters here if necessary
    fullName: (state) => {
      // Example getter
      return state.user.name
    }
  },
  actions: {
    // Define any actions here that will modify the state
    updateUser(name, email) {
      this.user.name = name
      this.user.email = email
    }
  }
})
