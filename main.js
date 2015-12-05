'use strict';

// アプリケーションをコントロールするモジュール
var app = require('app');
// ウィンドウを作成するモジュール
var BrowserWindow = require('browser-window');

// クラッシュレポート
require('crash-reporter').start();

var hid = require('node-hid');

// メインウィンドウはGCされないようにグローバル宣言
var mainWindow = null;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});


// var devs = hid.devices(0x22ea, 0x42);

// for(var i = 0; i < devs.length; i++){console.log(devs[i].path);}

// var horicon = null;
// for(var i = 0; i < devs.length; i++){if(devs[i]. path.indexOf("hid#vid_22ea&pid_0042&mi_03") >= 0){horicon = devs[i];}}
// console.log(horicon);

// var dev = new hid.HID(horicon.path);

// dev.gotData = function (err, data) {
//     console.log('got data', data.length, data);
//     this.read(this.gotData.bind(this));
// };

// dev.read(dev.gotData.bind(dev));

// // DataRead
// dev.write([0x00, 0x37, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);

// https://github.com/atom/electron/blob/master/docs/api/remote.md
