
const my = {
	state: {
        myCollectionList:[]
	},
	mutations: {
        getCollectionList:(state,data) =>{
            for(let i = 0;i<data.length;i++){
                state.myCollectionList.push(data[i])
            }
        }
	},
	actions: {
        getCollectionList:(context,data) =>{
            context.commit('getCollectionList',data)
        }
	},
	getters: {

	}
}
export default my