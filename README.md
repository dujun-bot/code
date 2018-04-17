声明，本程序旨在技术交流，喜欢的请帮忙star一下，万分感谢，如不喜欢，请保留意见，谢谢！
前端时间找工作，为了能让自己的简历置顶，特意花钱买了智联的置顶服务，3320.png
其实也不贵，
因为之前用过casperjs和phantomjs，就向用这两个插件写个程序，自动去刷新简历，不过这种不花钱的的刷新，肯定没有花钱的好使！
下面开始介绍程序：
项目地址：https://github.com/duzitengg/code.git

这个casperjs 请参阅：http://casperjs.org/
phantomjs：http://phantomjs.org/
这里不过多介绍这两个插件，如需要，请自己看！

一，主程序在main,js
//phantom.outputEncoding = “GBK”;//如果用命令行执行，windows系统需要，否则乱码
var initUrl = ‘http://www.zhaopin.com/’;//招聘网站

//初始化casperjs
var casper = require(‘casper’).create({
stepTimeout: 30000,
clientScripts: [“jquery.js”],
verbose: true,
pageSettings: {
javascriptEnabled: true,
//userAgent: “Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36”,
loadImages: true
},
onError: function (self, m) {
console.log(“onError===================:” + m);
self.exit(1);
}
// logLevel: “debug”,
}).start();

//http相关设置
var option = {
method: ‘GET’,
timeout: 30000,
headers: {
‘Content-Type’: ‘application/x-www-form-urlencoded; charset=UTF-8’
}
};

//打开网址，并打印title
casper.thenOpen(initUrl, option, function () {
log(“StartUrl===” + this.getCurrentUrl());
log(“StartTitle===” + this.getTitle());
});

/输入用户名密码/
casper.wait(2000,function () {
this.fill(‘div[id=“loginU”]’, {
‘loginname’: ‘’,
‘Password’: ‘’
}, true);
casper.capture(‘1111.png’);
});

/提交表单/
casper.then(function () {
this.evaluate(function () {
document.forms[0].submit();
});
});
/关闭弹窗/
casper.wait(2000,function () {
this.click(".popup_close");
casper.capture(‘2222.png’);
});
//点击刷新按钮
casper.wait(2000,function () {
this.clickLabel(“刷新”);
});
//程序结束
casper.wait(2000,function () {
casper.capture(‘3333.png’);
console.log(“程序结束”);
this.exit(1);
});
casper.run();

二，app.js，这里用node的子进程去模拟命令行，并设置定时任务
var schedule = require(“node-schedule”);
var spawn = require(‘child_process’).spawn;

var timer = new schedule.RecurrenceRule();
timer.minute = [10,20,32,40,50,59];
schedule.scheduleJob(timer, function () {
console.log(“计时器开始执行”);
var oder = spawn(“casperjs”, [“D:\demo\zhilian\main.js”]);

oder.stdout.on("data", function (data) {
    console.log("子进程中的打印信息===" + data);
});
oder.stderr.on("data", function (data) {
    console.log(data)
});
oder.on("close", function (code) {
    console.log("子进程退出程序码==="+code);
});
});

三，启动的时候用node启动就可以了

到这里，整个程序就完了，其实也蛮简单，但是casperjs的功能其实相当强大，里面有很多功能没怎么用上，我之前写过一个seo的项目，用到的功能就多了！
如果有这方面的经验，欢迎交流！
喜欢请star，谢谢！
