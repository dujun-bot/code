var schedule = require("node-schedule");
var spawn = require('child_process').spawn;

var timer = new schedule.RecurrenceRule();
timer.minute = [10,20,32,40,50,59];
schedule.scheduleJob(timer, function () {
    console.log("计时器开始执行");
    var oder = spawn("casperjs", ["D:\\demo\\zhilian\\main.js"]);

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

