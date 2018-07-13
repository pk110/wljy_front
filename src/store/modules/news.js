import {fetch,stamp} from './../../http/http'

const news = {
	state: {
    news:[],
    news_detail:[],
    showComment:false,
    comment_user_id:'',   //直接评论视频的用户id
    reply_user_id:'',   //回复评论人的用户id
    commentType: 1,// 切换区分是评论还是回复
    comment_id:0, //评论ID
    news_id:''  //视频详情唯一id
	},
	mutations: { 
     getNewsList:(state,data) =>{
		    state.news = data
	   },
     getNews_detail:(state,data) =>{
		    state.news_detail = data
	   },
     cancelCommentNews:(state) =>{
        state.showComment = false
     }
	},
	actions: {
      getNewsList:(context,data)=>{
          context.commit('getNewsList',data)
      },
      getNews_detail:(context,data) =>{
        context.commit('getNews_detail',data)
      },
      //取消评论弹窗
      cancelCommentNews:({commit}) =>{
        commit('cancelCommentNews')
      }
	},
	getters: {

	}
}
export default news