
const my = {
	state: {
        myCollectionList:[],
        myCartsList:[],
        initResult:[]
	},
	mutations: {
        getCollectionList:(state,data) =>{
            for(let i = 0;i<data.length;i++){
                state.myCollectionList.push(data[i])
            }
        },
        getCartsList:(state,data) =>{
          for(let i = 0;i<data.length;i++){
            state.initResult.push(data[i].id)
          }
          state.myCartsList = data
        }
	},
	actions: {
        getCollectionList:(context,data) =>{
            context.commit('getCollectionList',data)
        },
        getCartsList:(context,data) =>{
          context.commit('getCartsList',data)
        }
	},
	getters: {

	}
}
export default my