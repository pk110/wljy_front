<template>
    <div class="comments">
        <div class="comment_top">
            <span>取消</span>
            <div class="comment_top_center">
                <span>发评论</span>
                <span class="comment_name">杠南</span>
            </div>
            <span class="comment_top_end">发送</span>
        </div>
        <div style="width:100%;height:100%">
            <van-cell-group>
                <van-field
                    v-model="message"
                    label="留言"
                    type="textarea"
                    placeholder="请输入留言"
                    rows="1"
                    autosize
                />
            </van-cell-group>
        </div>
    </div>
</template>
<script>
    
</script>
<style lang="">
    .comments{
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        width:100%;
        overflow:auto;
        background:#fff;    
        z-index: 200;
    } 
    .comment_top{
        width:100%;
        box-sizing:border-box;
        padding:3px 10px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        background-color:#eee;
        box-shadow: 0px 2px 3px #ccc;
    }
    .comment_top_center{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }
    .comment_top_end{
        box-sizing:border-box;
        padding:3px;
        border:1px solid gray;
        color:gray;
    }
    .comment_name{
        color:gray;
    }
</style>