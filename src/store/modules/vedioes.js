import {fetch,stamp} from './../../http/http'

const vedioes = {
	state: {
        vedioes:[],
        vedioes_detail:[],
        vedioesAddress:'',
        vedioesPoster:'',
        showComment:false
	},
	mutations: { 
	   getVedioesList:(state,newData) =>{
		    state.vedioes = newData
     },
     getVedioes_detail:(state,newData) =>{
		    state.vedioes_detail = newData
            state.vedioesAddress = newData.vedioes
            state.vedioesPoster = newData.image
     }
	},
	actions: {
    getVedioesList:(context,data)=>{
        let newData = []
        for(let i = 0;i<data.length;i++){
            const newTime = new Date(data[i].time).getFullYear()+'-'+new Date(data[i].time).getMonth()+'-'+new Date(data[i].time).getDate()
            newData.push({
              id:data[i].id,
              image:data[i].image,
              title:data[i].title,
              people:data[i].people,
              money:data[i].money,
              specialMoney:data[i].specialMoney,
              time:newTime,
            })
        }
        context.commit('getVedioesList',newData)
    },
    getVedioes_detail:(context,data) =>{
      context.commit('getVedioes_detail',data)
    }
	},
	getters: {

	}
}
export default vedioes