//获取cookie、
export function getCookie(name) {
 var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
 if (arr = document.cookie.match(reg))
  return (arr[2]);
 else
  return null;
}
 
//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
 var exdate = new Date();
 exdate.setDate(exdate.getDate() + expiredays);
 document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};
 
//删除cookie
export function delCookie (name) {
 var exp = new Date();
 exp.setTime(exp.getTime() - 1);
 var cval = getCookie(name);
 if (cval != null)
  document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

// 打印日志开关
export function stamp(label,val){
  const a = true;
  if(a == true){
    if(label == null){
      return new Promise((resolve,reject) => {
        console.log(val)
      })

    }else{
      return new Promise((resolve,reject) => {
        console.log(label+':'+val)
      })
    }
  }else{
    return new Promise((resolve,reject) => {
      return;
    })
  }
}