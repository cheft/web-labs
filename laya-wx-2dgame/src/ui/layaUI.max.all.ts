
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.test {
    export class TestPageUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":667,"height":375},"child":[{"type":"Text","props":{"y":167,"x":100,"text":"LayaAir 微信小程序最小包","fontSize":40,"color":"#ff3200"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.test.TestPageUI.uiView);

        }

    }
}
