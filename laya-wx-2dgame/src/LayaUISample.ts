import TestUI = ui.test.TestPageUI;

//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(667, 375, Laya.WebGL);

//实例UI界面
var testUI: TestUI = new TestUI();
Laya.stage.addChild(testUI);
