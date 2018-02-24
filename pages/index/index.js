//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        allNum: [],
        num: [],
        modal: false,
        agreement: false,
        check: true,
        star: 0,
        end: 9,
        cardName: ['腾讯大王卡', '无限流量卡'],
        index: 0,
        combo: false,
        height: ''
    },
    bindPickerChange: function (e) {
        let value = e.detail.value;
        this.setData({
            index: value
        })
        console.log(e);
    },
    combo: function (e) {
        this.setData({
            combo: true
        })
    },
    loadImage: function () {
        let that = this;
        let image = this.data.goodsImage;
        let windowsWidth = "";
        wx.getSystemInfo({
            success: function (res) {
                windowsWidth = res.windowWidth * 2;
                console.log(windowsWidth);
            }
        });
        let arr = [];
        for (var i = 0; i < image.length; i++) {
            // debugger
            getImage(that, i)
        }

        function getImage(that, i) {
            wx.getImageInfo({
                src: that.data.goodsImage[i],
                success: function (res) {
                    let imageWidth = res.width;
                    let point = imageWidth / windowsWidth;
                    let imageHeight = res.height / point;
                    // var height=[];
                    let obj = {};
                    obj.image = that.data.goodsImage[i];
                    obj.height = imageHeight;
                    arr.push(obj);
                    console.log(arr);
                    that.setData({
                        height: arr
                    })
                }
            });
        }
    },
    comboHide: function (e) {
        this.setData({
            combo: false
        })
    },
    //事件处理函数
    check: function (e) {
        console.log(1);
        let check = this.data.check;
        this.setData({
            check: !check
        })
    },
    click: function (e) {
        let type = e.currentTarget.dataset.type;
        // console.log(type);
        this.setData({
            modal: false,
            code: this.data.num[type].code,
            cd_card: this.data.num[type].scode
        })
    },
    rest: function (e) {
        let star = this.data.star + 9;
        let end = this.data.end + 9;
        let allNum = this.data.allNum;
        let num = allNum.slice(star, end);
        console.log(num);
        console.log(end);
        this.setData({
            star: star,
            end: end,
            num: num
        })
        if (end > allNum.length) {
            this.setData({
                star: -9,
                end: 0
            })
        }
    },
    hide: function (e) {
        this.setData({
            modal: false,
        })
    },
    select: function (e) {
        // let type=e.currentTarget.dataset.type;
        this.setData({
            modal: true
        })
    },
    agreement: function (e) {
        this.setData({
            agreement: true
        })
    },
    read: function () {
        this.setData({
            agreement: false
        })
    },
    formSubmit: function (e) {
        let that = this;
        let value = e.detail.value;
        let data = {};
        data.name = value.name;
        data.IDcard = value.ID;
        data.phone = value.phone;
        data.rcode = value.inset_phone;
        data.scode = value.cd_card;
        data.address = value.add;
        data.m_id = this.data.allCard[this.data.index].id;
        if (this.data.check) {
            for (let k in data) {
                if (!data[k]) {
                    // console.log(1);
                    wx.showModal({
                        title: '提示',
                        content: '请完成表单填写',
                        showCancel: false,
                        success: res => {
                            if (res.confirm) {

                            }
                        }
                    });
                    return
                }
            }

            wx.request({
                url: "https://card.scmxkj.com/index.php/invo/card/order",
                method: 'POST',
                data: data,
                success: res => {
                    if (res.data.code == 500) {
                        wx.showModal({
                            title: '提示',
                            content: '提交成功，请等待运营商发货',
                            showCancel: false,
                            success: res => {
                                if (res.confirm) {
                                    that.formReset
                                }
                            }
                        })
                    }
                }
            })
        }

    },

    hidden: function (e) {
        this.setData({
            combo: false
        })
    },
    onLoad: function () {
        let that = this;
        wx.request({
            url: "https://card.scmxkj.com/index.php/invo/card/card",
            method: 'POST',
            success: res => {
                console.log(res.data.data);
                let num = res.data.data;
                let allNum = []
                res.data.data.forEach(function (item, index) {
                    function insert_flg(str, flg, f, s,) {
                        var newstr = "";
                        var tmp = str.substring(0, f);
                        newstr += tmp + flg;
                        var tmp = str.substring(f, s);
                        newstr += tmp + flg
                        var tmp = str.substring(s, 11);
                        newstr += tmp;
                        return newstr;
                    }
                    item.code = insert_flg(item.code, ' ', 3, 7)
                })
                let newNum = num.slice(0, 9);
                console.log(newNum);
                that.setData({
                    num: newNum,
                    allNum: num
                })
            }
        })
        wx.request({
            url: "https://card.scmxkj.com/index.php/invo/card/meal",
            method: 'POST',
            success: res => {
                console.log(res.data.data);
                let num = []
                let goodsDetail = []
                res.data.data.forEach(function (item, index) {

                    num.push(item.name);
                    goodsDetail.push(item.image)
                })
                console.log(num);
                that.setData({
                    allCard: res.data.data,
                    cardName: num,
                    goodsImage: goodsDetail
                })
                that.loadImage()
                // let num = res.data.data
                // // let str='asdfasdfasjdlfjalsdjfljsadlasdfasdf';
                // // let num=str.split('');
                // // console.log(num);
                // let newNum = num.slice(0, 9);
                // console.log(newNum);
                // that.setData({
                //     // allNum:res.data.data
                //     num: newNum,
                //     allNum: num
                // })
            }
        })
        // wx.request({
        //     url:'https://card.scmxkj.com/index.php/invo/card/image',
        //     method:'POST',
        //     success:res=>{
        //         console.log(res);
        //         that.setData({
        //             goodsImage:res.data.data
        //         })
        //
        //     }
        // })

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
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})
