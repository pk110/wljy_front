import {fetch,stamp} from './../../http/http'

const vedioes = {
	state: {
        vedioes:[]
	},
	mutations: { 
	   getVedioesList:(state,newData) =>{
		    state.vedioes = newData
	   }
	},
	actions: {
        getVedioesList:(context,data)=>{
            let newData = []
            for(let i = 0;i<data.length;i++){
                const newTime = new Date(data[i].time).getFullYear()+'-'+new Date(data[i].time).getMonth()+'-'+new Date(data[i].time).getDate()
                newData.push({
                    image:data[i].image,
                    title:data[i].title,
                    people:data[i].people,
                    money:data[i].money,
                    specialMoney:data[i].specialMoney,
                    time:newTime,
                })
            }
            context.commit('getVedioesList',newData)
        }
	},
	getters: {

	}
}
export default vedioes