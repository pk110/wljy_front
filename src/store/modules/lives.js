import {fetch,stamp} from './../../http/http'

const lives = {
	state: {
        isLoading:false,
        lives:[]
	},
	mutations: { 
	   getLivesList:(state,newData) =>{
		   state.lives = newData
           state.isLoading = false
	   }
	},
	actions: {
        getLivesList:(context,data)=>{
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
            context.commit('getLivesList',newData)
        }
	},
	getters: {

	}
}
export default lives