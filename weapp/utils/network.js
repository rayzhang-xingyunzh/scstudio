
// var baseUrl = 'https://www.camproz.com/clockin';
var baseUrl = 'http://localhost:7112';


function bindingTel(userid,telNo,callback){
  
  let options = {
    method: 'POST',
    url: baseUrl + '/user/update',
    data: {
      id:userid,
      tel:telNo
    },
    success: function (res) {
      if (res.data.status == "S") {
        callback(null, res)
      } else {
        callback(res)
      }

    },
    fail: function (err) {
      console.log(err)
      callback(err)
    }
  }
  sendReq(options,false);
}


function login(callback){
  console.log('login')
  wx.login({
    success: function (codeRes) {
      console.log(codeRes);
      wx.request({
        method:'POST',
        url: baseUrl + '/user/login/weapp',
        data: {
          code: codeRes.code,
        },
        success: function (res) {
          console.log(res)
          if (res.data.body.shouldGetPrivateUserInfo){
            var sessionId = res.data.body.sessionId;
            wx.getUserInfo({
              withCredentials:true,
              success:function(res){
                console.log(res)
                register(sessionId,res,function(err,response){
                  if(err){
                    callback(err,null)
                  }else{
                    var token = response.header['set-token']
                    wx.setStorageSync('token', token)
                    callback(null, response.data.body.user)
                  }
                });
              },
              fail:function(err){
                console.log(err)
                callback(err,null)
              }
            })
          }else{
            console.log('should not')
            var token = res.header['set-token']
            wx.setStorageSync('token', token)
            callback(null,res.data.body.user)
          }
        },
        fail: function (err) {
          console.log(err)
          callback(err,null)
        },
        header: {
          'content-type': 'application/json'
        }
      })
    }
  })
}

function register(sessionId,options,callback){
  console.log(options)
  wx.request({
    method:'POST',
    url: baseUrl + '/user/login/weapp/register',
    data:{
      sessionId:sessionId,
      encryptedData:options.encryptedData,
      iv:options.iv
    },
    success:function(res){
      if(res.data.status == "S"){
        callback(null,res)
      }else{
        callback(res)
      }
     
    },
    fail: function (err) {
      console.log(err)
      callback(err)
    },
    header: {
      'content-type': 'application/json'
    }
  })
}

function sendReq(options,needToken){
  console.log('sending request')
  var nt = true
  if(needToken !== 'undefined' && needToken != null){
    nt = needToken
  }
  if(nt){
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token', res)
        options.header = {
          'content-type': 'application/json',
          'x-access-token': res.data
        },
        wx.request(options)
      },
      fail: function (err) {
        options.fail(err)
      }
    })
  }else{
    wx.request(options)
  }
}

module.exports = {
  login:login,
  bindingTel: bindingTel
}