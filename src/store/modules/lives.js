import {fetch,stamp} from './../../http/http'

const vedioes = {
	state: {
    lives:[]
	},
	mutations: { 
      getLivesList:(state,data) =>{
          state.lives = data
      }
	},
	actions: {
      getLivesList:(context,data)=>{
        context.commit('getLivesList',data)
      }
	},
	getters: {

	}
}
export default vedioes
