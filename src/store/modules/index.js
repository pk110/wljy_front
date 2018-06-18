import {fetch,stamp} from './../../http/http'

const index = {
	state: {
	   noticeBarText:'',
	   noticeShow:true,
	   active:0,
	   livesListFour:[],
	   newsListFour:[],
	   vedioesListFour:[]
	},
	mutations: {
	   getNotice:(state,notice) =>{
		   if(notice){
        state.noticeBarText = notice
        state.noticeShow = true
		   }else{
			  state.noticeShow = false
		   }
	   },
	   getLivesListFour:(state,getLivesListFour) =>{
		   state.livesListFour = getLivesListFour
	   },
	   getNewsListFour:(state,getNewsListFour) =>{
		   state.newsListFour = getNewsListFour
	   },
	   getVedioesListFour:(state,getVedioesListFour) =>{
		   state.vedioesListFour = getVedioesListFour
	   }
	},
	actions: {
	   getNotice:(context,notice) =>{
		    context.commit('getNotice',notice)
	   },
	   getLivesListFour:(context,getLivesListFour) =>{
		    context.commit('getLivesListFour',getLivesListFour)
	   },
	   getNewsListFour:(context,getNewsListFour) =>{
		    context.commit('getNewsListFour',getNewsListFour)
	   },
	   getVedioesListFour:(context,getVedioesListFour) =>{
		    context.commit('getVedioesListFour',getVedioesListFour)
	   }
	},
	getters: {

	}
}
export default index