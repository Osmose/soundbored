/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _electron = __webpack_require__(1);

	var mainWindow = null;

	// Quit when all windows are closed.
	/**
	 * Application entry point.
	 */
	_electron.app.on('window-all-closed', function () {
	    // On OS X it is common for applications and their menu bar
	    // to stay active until the user quits explicitly with Cmd + Q
	    if (process.platform != 'darwin') {
	        _electron.app.quit();
	    }
	});

	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	_electron.app.on('ready', function () {
	    mainWindow = new _electron.BrowserWindow({ width: 800, height: 600 });

	    _electron.Menu.setApplicationMenu(_electron.Menu.buildFromTemplate([{
	        label: 'Soundbored',
	        submenu: [{
	            label: 'Reload Window',
	            accelerator: 'Command+R',
	            click: function click() {
	                mainWindow.reload();
	            }
	        }, {
	            label: 'Open DevTools',
	            accelerator: 'Command+K',
	            click: function click() {
	                mainWindow.openDevTools({ detach: true });
	            }
	        }, {
	            label: 'Quit',
	            accelerator: 'Command+Q',
	            click: function click() {
	                _electron.app.quit();
	            }
	        }]
	    }, {
	        label: 'File',
	        submenu: [{
	            label: 'Open Preset...',
	            accelerator: 'Command+O',
	            click: function click() {
	                var paths = _electron.dialog.showOpenDialog({
	                    title: 'Open Preset',
	                    properties: ['openFile']
	                });

	                if (!paths) {
	                    return;
	                }

	                mainWindow.webContents.send('openPreset', paths[0]);
	            }
	        }, {
	            label: 'Save Preset As...',
	            accelerator: 'Command+S',
	            click: function click() {
	                var path = _electron.dialog.showSaveDialog({
	                    title: 'Save Preset',
	                    properties: ['openFile']
	                });

	                if (!path) {
	                    return;
	                }

	                mainWindow.webContents.send('savePresetAs', path);
	            }
	        }]
	    }]));

	    console.log('file://' + __dirname + '/../static/index.html');
	    mainWindow.loadURL('file://' + __dirname + '/../static/index.html');

	    // Emitted when the window is closed.
	    mainWindow.on('closed', function () {
	        mainWindow = null;
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("electron");

/***/ }
/******/ ]);