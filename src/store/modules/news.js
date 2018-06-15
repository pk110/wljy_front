import {fetch,stamp} from './../../http/http'

const news = {
	state: {
    news:[],
    news_detail:[]
	},
	mutations: { 
     getNewsList:(state,data) =>{
		    state.news = data
	   },
     getNews_detail:(state,data) =>{
		    state.news_detail = data
	   }
	},
	actions: {
      getNewsList:(context,data)=>{
          context.commit('getNewsList',data)
      },
      getNews_detail:(context,data) =>{
        context.commit('getNews_detail',data)
      }
	},
	getters: {

	}
}
export default news