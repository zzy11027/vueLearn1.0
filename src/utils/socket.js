import store from "@/store/index";
var thatSocket;
var socket = {
    ws: null,
    lockReconnect: false,
    timeout: 10 * 1000,
    timeoutObj: null,
    serverTimeoutObj: null,
    timeoutnum: null,
    initWebSocket() {
        //初始化  websocket
        let _this = this;
        thatSocket = this;
        //这里是关键，可以判断当前环境是生产环境还是开发环境，开发环境加测试域名即可调试，生产环境由于代码要放到服务器获取本地域名即可
        if (process.env.NODE_ENV === "development") {
            var wsuri = "ws://live.douyar.cc" + ":8282"; //本地
        } else {
            const path = window.location.host;
            wsuri = "ws://" + path + ":8282";
        }
        if (window.WebSocket) {
            let ws = new WebSocket(wsuri);

            _this.ws = ws;
            _this.ws.onopen = _this.onopen;
            _this.ws.onmessage = _this.onmessage;
            _this.ws.onclose = _this.onclose;
            _this.ws.onerror = _this.onerror;
        }
    },
    reconnect() {
        //重新连接
        var that = this;
        if (that.lockReconnect) {
            return;
        }
        that.lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        that.timeoutnum && clearTimeout(that.timeoutnum);
        that.timeoutnum = setTimeout(function() {
            //新连接
            that.initWebSocket();
            that.lockReconnect = false;
        }, 5000);
    },
    reset() {
        //重置心跳
        var that = this;
        //清除时间
        clearTimeout(that.timeoutObj);
        clearTimeout(that.serverTimeoutObj);
        //重启心跳
        that.start();
    },
    start() {
        //开启心跳
        var self = this;
        self.timeoutObj && clearTimeout(self.timeoutObj);
        self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
        self.timeoutObj = setTimeout(function() {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            if (self.ws.readyState == 1) {
                //如果连接正常
                self.ws.send("heartCheck");
                // console.log("心跳监测！");
            } else {
                //否则重连
                self.reconnect();
            }
            self.serverTimeoutObj = setTimeout(function() {
                //超时关闭
                self.ws.close();
            }, self.timeout);
        }, self.timeout);
    },
    onopen() {
        var msg = JSON.stringify({ msg: "Connection successful" });
        thatSocket.ws.send(msg);
        //开启心跳
        thatSocket.start();
    },
    onmessage(e) {
        // console.log(e);
        if (e.data.indexOf("{") == 0) {
            // console.log(e.data);
            const data = JSON.parse(e.data);
            if (data.type == "init") {
                // console.log("握手成功！");
                store.commit("SOCKET_ID", data.client_id);
                sessionStorage.setItem("SOCKET_ID", data.client_id);
            } else if (
                e.data.indexOf("key") != -1 &&
                e.data.indexOf("nickname") == -1
            ) {
                store.commit("GET_PRIZE", data.key);
            } else {
                // console.log("VUEX   list")
                store.commit("LIST_RECORD", data);
            }
        } else {
            if (e.data.indexOf("{") != -1) {
                const msg = JSON.parse(e.data.slice(e.data.indexOf("{")));
                if (msg.msg !== "Connection successful") {
                    store.commit("LIST_RECORD", msg);
                }
            }
        }

        //收到服务器信息，心跳重置
        thatSocket.reset();
        return e;
    },
    onclose(e) {
        console.log("连接关闭");
        console.log(
            "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
        );
        var msg = JSON.stringify({ cmd: "Disconnect" });
        thatSocket.ws.send(msg);
        //重连
        thatSocket.reconnect();
    },
    onerror(e) {
        console.log("连接出错");
        //重连
        thatSocket.reconnect();
    }
};

export default socket;

//   单组件模式
// ws:null,
// lockReconnect: false,//是否真正建立连接
// timeout: 10*1000,//10秒一次心跳
// timeoutObj: null,//心跳心跳倒计时
// serverTimeoutObj: null,//心跳倒计时
// timeoutnum: null,//断开 重连倒计时
// initWebSocket() {
//     let _this = this;
//     //这里是关键，可以判断当前环境是生产环境还是开发环境，开发环境加测试域名即可调试，生产环境由于代码要放到服务器获取本地域名即可
//     if(process.env.NODE_ENV === 'development') {
//         var wsuri = 'ws://live.douyar.cc' + ":8282";//本地
//         console.log(`${this.baseURL.value}`)
//     } else {
//         const path = window.location.host;
//         var wsuri = 'ws://' + path + ":8282";
//     }
//     console.log(wsuri);
//     if (window.WebSocket) {
//         let ws = new WebSocket(wsuri);
//         _this.ws = ws;
//         _this.ws.onopen = _this.onopen;
//         _this.ws.onmessage = _this.onmessage;
//         _this.ws.onclose = _this.onclose;
//         _this.ws.onerror = _this.onerror;
//     }
// },
// reconnect() {//重新连接
//     var that = this;
//     if(that.lockReconnect) {
//         return;
//     };
//     that.lockReconnect = true;
//     //没连接上会一直重连，设置延迟避免请求过多
//     that.timeoutnum && clearTimeout(that.timeoutnum);
//     that.timeoutnum = setTimeout(function () {
//         //新连接
//         that.initWebSocket();
//         that.lockReconnect = false;
//     },5000);
// },
// reset(){//重置心跳
//     var that = this;
//     //清除时间
//     clearTimeout(that.timeoutObj);
//     clearTimeout(that.serverTimeoutObj);
//     //重启心跳
//     that.start();
// },
// start(){//开启心跳
//     var self = this;
//     self.timeoutObj && clearTimeout(self.timeoutObj);
//     self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
//     self.timeoutObj = setTimeout(function(){
//         //这里发送一个心跳，后端收到后，返回一个心跳消息，
//         if (self.ws.readyState == 1) {//如果连接正常
//             self.ws.send("heartCheck");
//         }else{//否则重连
//             self.reconnect();
//         }
//         self.serverTimeoutObj = setTimeout(function() {
//             //超时关闭
//             self.ws.close();
//         }, self.timeout);
//     }, self.timeout)
// },
// onopen() {
//     var msg = JSON.stringify({msg: 'Connection successful'});
//     this.ws.send(msg);
//     console.log("open");
//     //开启心跳
//     this.start();
// },
// onmessage(e) {
//     console.log(e)
//     //接收服务器返回的数据
//     let resData = e.data;
//     // let resData = JSON.parse(e.data);
//     if (resData.funName == "userCount") {
//         _this.count = resData.users;
//         _this.list = resData.chat;
//         console.log(resData.chat);
//     }
//     //收到服务器信息，心跳重置
//     this.reset();
// },
// onclose(e) {
//     console.log("连接关闭");
//     console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean);
//     var msg = JSON.stringify({cmd: 'Disconnect'});
//     this.ws.send(msg);
//     //重连
//     this.reconnect();
// },
// onerror(e) {
//     console.log("连接出错");
//     //重连
//     this.reconnect();
// },
