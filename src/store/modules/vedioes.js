import {fetch,post,stamp} from './../../http/http'

const vedioes = {
	state: {
        vedioes:[],
        vedioes_detail:[],
        vedioesAddress:'',
        vedioesPoster:'',
        showComment:false,
        comment_user_id:'',   //直接评论视频的用户id
        reply_user_id:'',   //回复评论人的用户id
        commentType: 1,// 切换区分是评论还是回复
        comment_id:0, //评论ID
        vedioes_id:''  //视频详情唯一id
	},
	mutations: { 
	   getVedioesList:(state,newData) =>{
		    state.vedioes = newData
     },
     getVedioes_detail:(state,newData) =>{
		    state.vedioes_detail = newData
        state.vedioesAddress = newData.vedioes
        state.vedioesPoster = newData.image
     },
     cancelCommentVedioes:(state) =>{
        state.showComment = false
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
    //取消评论弹窗
    cancelCommentVedioes:({commit}) =>{
      commit('cancelCommentVedioes')
    },
    //获取视频详情页信息
    getVedioes_detail:(context,date) =>{
      context.commit('getVedioes_detail',date)
    }
	},
	getters: {

	}
}
export default vedioes