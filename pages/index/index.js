//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    allNum:[],
      num:[],
      modal:false,
      agreement:false,
      check:true,
      star:0,
      end:9
  },
  //事件处理函数
    check:function (e) {
        console.log(1);
        let check=this.data.check;
      this.setData({
          check:!check
      })
    },
    click:function (e) {
      let type=e.currentTarget.dataset.type;
      // console.log(type);
      this.setData({
          modal:false,
          code:this.data.num[type].code,
          cd_card:this.data.num[type].scode
      })
    },
    rest:function (e) {
        let star=this.data.star+9;
        let end=this.data.end+9;
        let allNum=this.data.allNum;
        let num=allNum.slice(star,end);
        console.log(num);
        console.log(end);
        this.setData({
            star:star,
            end:end,
            num:num
        })
        if(end>allNum.length){
           this.setData({
               star:-9,
               end:0
           })
        }

    },
    hide:function (e) {
        this.setData({
            modal:false,
        })
    },
    select:function (e) {
      // let type=e.currentTarget.dataset.type;
      this.setData({
          modal:true
      })
    },
  agreement:function (e) {
      this.setData({
          agreement:true
      })
  },
    read:function () {
      this.setData({
          agreement:false
      })
    },
    formSubmit:function (e) {
        let value=e.detail.value;
        let data={};
        data.name   =value.name;
        data.IDcard =value.ID;
        data.phone  =value.phone;
        data.rcode  =value.inset_phone;
        data.scode  =value.cd_card;
        data.address=value.add;
        if(this.data.check){
            for(let k in data){
                if(!data[k]){
                    // console.log(1);
                    wx.showModal({
                        title: '提示',
                        content: '请完成表达填写',
                        showCancel:false,
                        success: res=>{
                            if (res.confirm) {

                            }
                        }
                    });
                    return
                }
            }

            wx.request({
                url:"https://card.scmxkj.com/index.php/invo/card/order",
                method:'POST',
                data:data,
                success:res=>{
                    console.log(res);
                    console.log(1)
                }
            })
        }

    },
  onLoad: function () {
    let that=this;
    wx.request({
        url:"https://card.scmxkj.com/index.php/invo/card/card",
        method:'POST',
        success:res=>{
            console.log(res.data.data);
            let str='asdfasdfasjdlfjalsdjfljsadlasdfasdf';
            let num=str.split('');
            console.log(num);
            let newNum=num.slice(0,9);
            console.log(newNum);
            that.setData({
                // allNum:res.data.data
                num:newNum,
                allNum:num
            })
        }
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
