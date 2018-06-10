import {fetch,stamp} from './../../http/http'

const index = {
	state: {
	   noticeBarText:'',
	   noticeShow:true
	},
	mutations: {
	   getNotice:(state,notice) =>{
		   if(notice){
			state.noticeBarText = notice
			state.noticeShow = true
		   }else{
			state.noticeShow = false
		   }
	   }
	},
	actions: {
	   getNotice:(context,notice) =>{
		context.commit('getNotice',notice)
	   }
	},
	getters: {

	}
}
export default index