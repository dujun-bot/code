//phantom.outputEncoding = "GBK";
var initUrl = 'http://www.zhaopin.com/';

var casper = require('casper').create({
    stepTimeout: 30000,
    clientScripts: ["jquery.js"],
    verbose: true,
    pageSettings: {
        javascriptEnabled: true,
        //userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36",
        loadImages: true
    },
    onError: function (self, m) {
        console.log("onError===================:" + m);
        self.exit(1);
    }
    // onResourceReceived:function (result) {//当请求资源加载完成
    //     console.log("==============result========="+result)
    // }
    // logLevel: "debug",
}).start();

// casper.page.onPageCreated = function (newPage) {
//     newPage.customHeaders = {
//         "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36"
//     };
// };

casper.on('remote.message', function (msg) {
    if (msg.indexOf(">>>>") == 0) {
        var _msg = msg.replace(">>>>", "");
        this.echo(_msg, 'info');
    }
});

//打印输出
function log(txt) {
    console.log(">>>>" + txt);
}
var option = {
    method: 'GET',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
};

/*打印title*/
casper.thenOpen(initUrl, option, function () {
    log("StartUrl===" + this.getCurrentUrl());
    log("StartTitle===" + this.getTitle());
});

/*输入用户名密码*/
casper.wait(2000,function () {
    this.fill('div[id="loginU"]', {
        'loginname': '',
        'Password': ''
    }, true);
    casper.capture('1111.png');
});
/*等待资源被加载完成*/
// casper.on('resource.received', function (resource) {
//     this.fill('div[id="loginU"]', {
//         'loginname': 'dujun_dujun@126.com',
//         'Password': 'dujun19870415'
//     }, true);
//     console.log(resource.url)
//     casper.capture('1111.png');
// });

/*提交表单*/
casper.then(function () {
    this.evaluate(function () {
        document.forms[0].submit();
    });
});

/*关闭弹窗*/
casper.wait(2000,function () {
    this.click(".popup_close");
    casper.capture('2222.png');
});
casper.wait(2000,function () {
    this.clickLabel("刷新");
});
casper.wait(2000,function () {
    casper.capture('3333.png');
    console.log("程序结束");
    this.exit(1);
});
casper.run();
