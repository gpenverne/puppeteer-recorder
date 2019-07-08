webpackHotUpdate("background",{

/***/ "./src/background/index.js":
/*!*********************************!*\
  !*** ./src/background/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _pptrActions = __webpack_require__(/*! ../code-generator/pptr-actions */ \"./src/code-generator/pptr-actions.js\");\n\nvar _pptrActions2 = _interopRequireDefault(_pptrActions);\n\nvar _extensionControlMessages = __webpack_require__(/*! ../models/extension-control-messages */ \"./src/models/extension-control-messages.js\");\n\nvar _extensionControlMessages2 = _interopRequireDefault(_extensionControlMessages);\n\nvar _extensionUiActions = __webpack_require__(/*! ../models/extension-ui-actions */ \"./src/models/extension-ui-actions.js\");\n\nvar _extensionUiActions2 = _interopRequireDefault(_extensionUiActions);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar RecordingController = function () {\n  function RecordingController() {\n    (0, _classCallCheck3.default)(this, RecordingController);\n\n    this._recording = [];\n    this._boundedMessageHandler = null;\n    this._boundedNavigationHandler = null;\n    this._boundedWaitHandler = null;\n    this._boundedMenuHandler = null;\n    this._boundedKeyCommandHandler = null;\n    this._badgeState = '';\n    this._isPaused = false;\n\n    // Some events are sent double on page navigations to simplify the event recorder.\n    // We keep some simple state to disregard events if needed.\n    this._hasGoto = false;\n    this._hasViewPort = false;\n\n    this._menuId = 'PUPPETEER_RECORDER_CONTEXT_MENU';\n    this._menuOptions = {\n      SCREENSHOT: 'SCREENSHOT',\n      SCREENSHOT_CLIPPED: 'SCREENSHOT_CLIPPED'\n    };\n  }\n\n  (0, _createClass3.default)(RecordingController, [{\n    key: 'boot',\n    value: function boot() {\n      var _this = this;\n\n      chrome.extension.onConnect.addListener(function (port) {\n        console.debug('listeners connected');\n        port.onMessage.addListener(function (msg) {\n          if (msg.action && msg.action === _extensionUiActions2.default.START) _this.start();\n          if (msg.action && msg.action === _extensionUiActions2.default.STOP) _this.stop();\n          if (msg.action && msg.action === _extensionUiActions2.default.CLEAN_UP) _this.cleanUp();\n          if (msg.action && msg.action === _extensionUiActions2.default.PAUSE) _this.pause();\n          if (msg.action && msg.action === _extensionUiActions2.default.UN_PAUSE) _this.unPause();\n        });\n      });\n    }\n  }, {\n    key: 'start',\n    value: function start() {\n      var _this2 = this;\n\n      console.debug('start recording');\n      this.cleanUp(function () {\n        _this2._badgeState = 'rec';\n\n        _this2._hasGoto = false;\n        _this2._hasViewPort = false;\n\n        _this2.injectScript();\n\n        _this2._boundedMessageHandler = _this2.handleMessage.bind(_this2);\n        _this2._boundedNavigationHandler = _this2.handleNavigation.bind(_this2);\n        _this2._boundedWaitHandler = _this2.handleWait.bind(_this2);\n\n        chrome.runtime.onMessage.addListener(_this2._boundedMessageHandler);\n        chrome.webNavigation.onCompleted.addListener(_this2._boundedNavigationHandler);\n        chrome.webNavigation.onBeforeNavigate.addListener(_this2._boundedWaitHandler);\n\n        chrome.browserAction.setIcon({ path: './images/icon-green.png' });\n        chrome.browserAction.setBadgeText({ text: _this2._badgeState });\n        chrome.browserAction.setBadgeBackgroundColor({ color: '#FF0000' });\n\n        /**\n         * Right click menu setup\n         */\n\n        chrome.contextMenus.removeAll();\n\n        // add the parent and its children\n\n        chrome.contextMenus.create({\n          id: _this2._menuId,\n          title: 'Behat Recorder',\n          contexts: ['all']\n        });\n\n        chrome.contextMenus.create({\n          id: _this2._menuId + _this2._menuOptions.SCREENSHOT,\n          title: 'Take Screenshot (Ctrl+Shift+A)',\n          parentId: _this2._menuId,\n          contexts: ['all']\n        });\n\n        chrome.contextMenus.create({\n          id: _this2._menuId + _this2._menuOptions.SCREENSHOT_CLIPPED,\n          title: 'Take Screenshot Clipped (Ctrl+Shift+S)',\n          parentId: _this2._menuId,\n          contexts: ['all']\n        });\n\n        // add the handlers\n\n        _this2._boundedMenuHandler = _this2.handleMenuInteraction.bind(_this2);\n        chrome.contextMenus.onClicked.addListener(_this2._boundedMenuHandler);\n\n        _this2._boundedKeyCommandHandler = _this2.handleKeyCommands.bind(_this2);\n        chrome.commands.onCommand.addListener(_this2._boundedKeyCommandHandler);\n      });\n    }\n  }, {\n    key: 'stop',\n    value: function stop() {\n      console.debug('stop recording');\n      this._badgeState = this._recording.length > 0 ? '1' : '';\n\n      chrome.runtime.onMessage.removeListener(this._boundedMessageHandler);\n      chrome.webNavigation.onCompleted.removeListener(this._boundedNavigationHandler);\n      chrome.webNavigation.onBeforeNavigate.removeListener(this._boundedWaitHandler);\n      chrome.contextMenus.onClicked.removeListener(this._boundedMenuHandler);\n\n      chrome.browserAction.setIcon({ path: './images/icon-black.png' });\n      chrome.browserAction.setBadgeText({ text: this._badgeState });\n      chrome.browserAction.setBadgeBackgroundColor({ color: '#45C8F1' });\n\n      chrome.storage.local.set({ recording: this._recording }, function () {\n        console.debug('recording stored');\n      });\n    }\n  }, {\n    key: 'pause',\n    value: function pause() {\n      console.debug('pause');\n      this._badgeState = '❚❚';\n      chrome.browserAction.setBadgeText({ text: this._badgeState });\n      this._isPaused = true;\n    }\n  }, {\n    key: 'unPause',\n    value: function unPause() {\n      console.debug('unpause');\n      this._badgeState = 'rec';\n      chrome.browserAction.setBadgeText({ text: this._badgeState });\n      this._isPaused = false;\n    }\n  }, {\n    key: 'cleanUp',\n    value: function cleanUp(cb) {\n      console.debug('cleanup');\n      this._recording = [];\n      chrome.browserAction.setBadgeText({ text: '' });\n      chrome.storage.local.remove('recording', function () {\n        console.debug('stored recording cleared');\n        if (cb) cb();\n      });\n    }\n  }, {\n    key: 'recordCurrentUrl',\n    value: function recordCurrentUrl(href) {\n      if (!this._hasGoto) {\n        console.debug('recording goto* for:', href);\n        this.handleMessage({ selector: undefined, value: undefined, action: _pptrActions2.default.GOTO, href: href });\n        this._hasGoto = true;\n      }\n    }\n  }, {\n    key: 'recordCurrentViewportSize',\n    value: function recordCurrentViewportSize(value) {\n      if (!this._hasViewPort) {\n        this.handleMessage({ selector: undefined, value: value, action: _pptrActions2.default.VIEWPORT });\n        this._hasViewPort = true;\n      }\n    }\n  }, {\n    key: 'recordNavigation',\n    value: function recordNavigation() {\n      this.handleMessage({ selector: undefined, value: undefined, action: _pptrActions2.default.NAVIGATION });\n    }\n  }, {\n    key: 'recordScreenshot',\n    value: function recordScreenshot(value) {\n      this.handleMessage({ selector: undefined, value: value, action: _pptrActions2.default.SCREENSHOT });\n    }\n  }, {\n    key: 'handleMessage',\n    value: function handleMessage(msg, sender) {\n      if (msg.control) return this.handleControlMessage(msg, sender);\n\n      // to account for clicks etc. we need to record the frameId and url to later target the frame in playback\n      msg.frameId = sender ? sender.frameId : null;\n      msg.frameUrl = sender ? sender.url : null;\n\n      if (!this._isPaused) {\n        this._recording.push(msg);\n        chrome.storage.local.set({ recording: this._recording }, function () {\n          console.debug('stored recording updated');\n        });\n      }\n    }\n  }, {\n    key: 'handleControlMessage',\n    value: function handleControlMessage(msg, sender) {\n      if (msg.control === _extensionControlMessages2.default.EVENT_RECORDER_STARTED) chrome.browserAction.setBadgeText({ text: this._badgeState });\n      if (msg.control === _extensionControlMessages2.default.GET_VIEWPORT_SIZE) this.recordCurrentViewportSize(msg.coordinates);\n      if (msg.control === _extensionControlMessages2.default.GET_CURRENT_URL) this.recordCurrentUrl(msg.href);\n      if (msg.control === _extensionControlMessages2.default.GET_SCREENSHOT) this.recordScreenshot(msg.value);\n    }\n  }, {\n    key: 'handleNavigation',\n    value: function handleNavigation(_ref) {\n      var frameId = _ref.frameId;\n\n      console.debug('frameId is:', frameId);\n      this.injectScript();\n      if (frameId === 0) {\n        this.recordNavigation();\n      }\n    }\n  }, {\n    key: 'handleMenuInteraction',\n    value: function handleMenuInteraction(info, tab) {\n      console.debug('context menu clicked');\n      switch (info.menuItemId) {\n        case this._menuId + this._menuOptions.SCREENSHOT:\n          this.toggleScreenShotMode(_extensionUiActions2.default.TOGGLE_SCREENSHOT_MODE);\n          break;\n        case this._menuId + this._menuOptions.SCREENSHOT_CLIPPED:\n          this.toggleScreenShotMode(_extensionUiActions2.default.TOGGLE_SCREENSHOT_CLIPPED_MODE);\n          break;\n      }\n    }\n  }, {\n    key: 'handleKeyCommands',\n    value: function handleKeyCommands(command) {\n      switch (command) {\n        case _extensionUiActions2.default.TOGGLE_SCREENSHOT_MODE:\n          this.toggleScreenShotMode(_extensionUiActions2.default.TOGGLE_SCREENSHOT_MODE);\n          break;\n        case _extensionUiActions2.default.TOGGLE_SCREENSHOT_CLIPPED_MODE:\n          this.toggleScreenShotMode(_extensionUiActions2.default.TOGGLE_SCREENSHOT_CLIPPED_MODE);\n          break;\n      }\n    }\n  }, {\n    key: 'toggleScreenShotMode',\n    value: function toggleScreenShotMode(action) {\n      console.debug('toggling screenshot mode');\n      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {\n        chrome.tabs.sendMessage(tabs[0].id, { action: action });\n      });\n    }\n  }, {\n    key: 'handleWait',\n    value: function handleWait() {\n      chrome.browserAction.setBadgeText({ text: 'wait' });\n    }\n  }, {\n    key: 'injectScript',\n    value: function injectScript() {\n      chrome.tabs.executeScript({ file: 'content-script.js', allFrames: true });\n    }\n  }]);\n  return RecordingController;\n}();\n\nconsole.debug('booting recording controller');\nwindow.recordingController = new RecordingController();\nwindow.recordingController.boot();\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9pbmRleC5qcz9hYzI4Il0sIm5hbWVzIjpbIlJlY29yZGluZ0NvbnRyb2xsZXIiLCJfcmVjb3JkaW5nIiwiX2JvdW5kZWRNZXNzYWdlSGFuZGxlciIsIl9ib3VuZGVkTmF2aWdhdGlvbkhhbmRsZXIiLCJfYm91bmRlZFdhaXRIYW5kbGVyIiwiX2JvdW5kZWRNZW51SGFuZGxlciIsIl9ib3VuZGVkS2V5Q29tbWFuZEhhbmRsZXIiLCJfYmFkZ2VTdGF0ZSIsIl9pc1BhdXNlZCIsIl9oYXNHb3RvIiwiX2hhc1ZpZXdQb3J0IiwiX21lbnVJZCIsIl9tZW51T3B0aW9ucyIsIlNDUkVFTlNIT1QiLCJTQ1JFRU5TSE9UX0NMSVBQRUQiLCJjaHJvbWUiLCJleHRlbnNpb24iLCJvbkNvbm5lY3QiLCJhZGRMaXN0ZW5lciIsImNvbnNvbGUiLCJkZWJ1ZyIsInBvcnQiLCJvbk1lc3NhZ2UiLCJtc2ciLCJhY3Rpb24iLCJhY3Rpb25zIiwiU1RBUlQiLCJzdGFydCIsIlNUT1AiLCJzdG9wIiwiQ0xFQU5fVVAiLCJjbGVhblVwIiwiUEFVU0UiLCJwYXVzZSIsIlVOX1BBVVNFIiwidW5QYXVzZSIsImluamVjdFNjcmlwdCIsImhhbmRsZU1lc3NhZ2UiLCJiaW5kIiwiaGFuZGxlTmF2aWdhdGlvbiIsImhhbmRsZVdhaXQiLCJydW50aW1lIiwid2ViTmF2aWdhdGlvbiIsIm9uQ29tcGxldGVkIiwib25CZWZvcmVOYXZpZ2F0ZSIsImJyb3dzZXJBY3Rpb24iLCJzZXRJY29uIiwicGF0aCIsInNldEJhZGdlVGV4dCIsInRleHQiLCJzZXRCYWRnZUJhY2tncm91bmRDb2xvciIsImNvbG9yIiwiY29udGV4dE1lbnVzIiwicmVtb3ZlQWxsIiwiY3JlYXRlIiwiaWQiLCJ0aXRsZSIsImNvbnRleHRzIiwicGFyZW50SWQiLCJoYW5kbGVNZW51SW50ZXJhY3Rpb24iLCJvbkNsaWNrZWQiLCJoYW5kbGVLZXlDb21tYW5kcyIsImNvbW1hbmRzIiwib25Db21tYW5kIiwibGVuZ3RoIiwicmVtb3ZlTGlzdGVuZXIiLCJzdG9yYWdlIiwibG9jYWwiLCJzZXQiLCJyZWNvcmRpbmciLCJjYiIsInJlbW92ZSIsImhyZWYiLCJzZWxlY3RvciIsInVuZGVmaW5lZCIsInZhbHVlIiwicHB0ckFjdGlvbnMiLCJHT1RPIiwiVklFV1BPUlQiLCJOQVZJR0FUSU9OIiwic2VuZGVyIiwiY29udHJvbCIsImhhbmRsZUNvbnRyb2xNZXNzYWdlIiwiZnJhbWVJZCIsImZyYW1lVXJsIiwidXJsIiwicHVzaCIsImN0cmwiLCJFVkVOVF9SRUNPUkRFUl9TVEFSVEVEIiwiR0VUX1ZJRVdQT1JUX1NJWkUiLCJyZWNvcmRDdXJyZW50Vmlld3BvcnRTaXplIiwiY29vcmRpbmF0ZXMiLCJHRVRfQ1VSUkVOVF9VUkwiLCJyZWNvcmRDdXJyZW50VXJsIiwiR0VUX1NDUkVFTlNIT1QiLCJyZWNvcmRTY3JlZW5zaG90IiwicmVjb3JkTmF2aWdhdGlvbiIsImluZm8iLCJ0YWIiLCJtZW51SXRlbUlkIiwidG9nZ2xlU2NyZWVuU2hvdE1vZGUiLCJUT0dHTEVfU0NSRUVOU0hPVF9NT0RFIiwiVE9HR0xFX1NDUkVFTlNIT1RfQ0xJUFBFRF9NT0RFIiwiY29tbWFuZCIsInRhYnMiLCJxdWVyeSIsImFjdGl2ZSIsImN1cnJlbnRXaW5kb3ciLCJzZW5kTWVzc2FnZSIsImV4ZWN1dGVTY3JpcHQiLCJmaWxlIiwiYWxsRnJhbWVzIiwid2luZG93IiwicmVjb3JkaW5nQ29udHJvbGxlciIsImJvb3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxtQjtBQUNKLGlDQUFlO0FBQUE7O0FBQ2IsU0FBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFNBQUtDLHNCQUFMLEdBQThCLElBQTlCO0FBQ0EsU0FBS0MseUJBQUwsR0FBaUMsSUFBakM7QUFDQSxTQUFLQyxtQkFBTCxHQUEyQixJQUEzQjtBQUNBLFNBQUtDLG1CQUFMLEdBQTJCLElBQTNCO0FBQ0EsU0FBS0MseUJBQUwsR0FBaUMsSUFBakM7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixLQUFqQjs7QUFFQTtBQUNBO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixLQUFoQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsS0FBcEI7O0FBRUEsU0FBS0MsT0FBTCxHQUFlLGlDQUFmO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQjtBQUNsQkMsa0JBQVksWUFETTtBQUVsQkMsMEJBQW9CO0FBRkYsS0FBcEI7QUFJRDs7OzsyQkFFTztBQUFBOztBQUNOQyxhQUFPQyxTQUFQLENBQWlCQyxTQUFqQixDQUEyQkMsV0FBM0IsQ0FBdUMsZ0JBQVE7QUFDN0NDLGdCQUFRQyxLQUFSLENBQWMscUJBQWQ7QUFDQUMsYUFBS0MsU0FBTCxDQUFlSixXQUFmLENBQTJCLGVBQU87QUFDaEMsY0FBSUssSUFBSUMsTUFBSixJQUFjRCxJQUFJQyxNQUFKLEtBQWVDLDZCQUFRQyxLQUF6QyxFQUFnRCxNQUFLQyxLQUFMO0FBQ2hELGNBQUlKLElBQUlDLE1BQUosSUFBY0QsSUFBSUMsTUFBSixLQUFlQyw2QkFBUUcsSUFBekMsRUFBK0MsTUFBS0MsSUFBTDtBQUMvQyxjQUFJTixJQUFJQyxNQUFKLElBQWNELElBQUlDLE1BQUosS0FBZUMsNkJBQVFLLFFBQXpDLEVBQW1ELE1BQUtDLE9BQUw7QUFDbkQsY0FBSVIsSUFBSUMsTUFBSixJQUFjRCxJQUFJQyxNQUFKLEtBQWVDLDZCQUFRTyxLQUF6QyxFQUFnRCxNQUFLQyxLQUFMO0FBQ2hELGNBQUlWLElBQUlDLE1BQUosSUFBY0QsSUFBSUMsTUFBSixLQUFlQyw2QkFBUVMsUUFBekMsRUFBbUQsTUFBS0MsT0FBTDtBQUNwRCxTQU5EO0FBT0QsT0FURDtBQVVEOzs7NEJBRVE7QUFBQTs7QUFDUGhCLGNBQVFDLEtBQVIsQ0FBYyxpQkFBZDtBQUNBLFdBQUtXLE9BQUwsQ0FBYSxZQUFNO0FBQ2pCLGVBQUt4QixXQUFMLEdBQW1CLEtBQW5COztBQUVBLGVBQUtFLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxlQUFLQyxZQUFMLEdBQW9CLEtBQXBCOztBQUVBLGVBQUswQixZQUFMOztBQUVBLGVBQUtsQyxzQkFBTCxHQUE4QixPQUFLbUMsYUFBTCxDQUFtQkMsSUFBbkIsQ0FBd0IsTUFBeEIsQ0FBOUI7QUFDQSxlQUFLbkMseUJBQUwsR0FBaUMsT0FBS29DLGdCQUFMLENBQXNCRCxJQUF0QixDQUEyQixNQUEzQixDQUFqQztBQUNBLGVBQUtsQyxtQkFBTCxHQUEyQixPQUFLb0MsVUFBTCxDQUFnQkYsSUFBaEIsQ0FBcUIsTUFBckIsQ0FBM0I7O0FBRUF2QixlQUFPMEIsT0FBUCxDQUFlbkIsU0FBZixDQUF5QkosV0FBekIsQ0FBcUMsT0FBS2hCLHNCQUExQztBQUNBYSxlQUFPMkIsYUFBUCxDQUFxQkMsV0FBckIsQ0FBaUN6QixXQUFqQyxDQUE2QyxPQUFLZix5QkFBbEQ7QUFDQVksZUFBTzJCLGFBQVAsQ0FBcUJFLGdCQUFyQixDQUFzQzFCLFdBQXRDLENBQWtELE9BQUtkLG1CQUF2RDs7QUFFQVcsZUFBTzhCLGFBQVAsQ0FBcUJDLE9BQXJCLENBQTZCLEVBQUVDLE1BQU0seUJBQVIsRUFBN0I7QUFDQWhDLGVBQU84QixhQUFQLENBQXFCRyxZQUFyQixDQUFrQyxFQUFFQyxNQUFNLE9BQUsxQyxXQUFiLEVBQWxDO0FBQ0FRLGVBQU84QixhQUFQLENBQXFCSyx1QkFBckIsQ0FBNkMsRUFBRUMsT0FBTyxTQUFULEVBQTdDOztBQUVBOzs7O0FBSUFwQyxlQUFPcUMsWUFBUCxDQUFvQkMsU0FBcEI7O0FBRUE7O0FBRUF0QyxlQUFPcUMsWUFBUCxDQUFvQkUsTUFBcEIsQ0FBMkI7QUFDekJDLGNBQUksT0FBSzVDLE9BRGdCO0FBRXpCNkMsaUJBQU8sZ0JBRmtCO0FBR3pCQyxvQkFBVSxDQUFDLEtBQUQ7QUFIZSxTQUEzQjs7QUFNQTFDLGVBQU9xQyxZQUFQLENBQW9CRSxNQUFwQixDQUEyQjtBQUN6QkMsY0FBSSxPQUFLNUMsT0FBTCxHQUFlLE9BQUtDLFlBQUwsQ0FBa0JDLFVBRFo7QUFFekIyQyxpQkFBTyxnQ0FGa0I7QUFHekJFLG9CQUFVLE9BQUsvQyxPQUhVO0FBSXpCOEMsb0JBQVUsQ0FBQyxLQUFEO0FBSmUsU0FBM0I7O0FBT0ExQyxlQUFPcUMsWUFBUCxDQUFvQkUsTUFBcEIsQ0FBMkI7QUFDekJDLGNBQUksT0FBSzVDLE9BQUwsR0FBZSxPQUFLQyxZQUFMLENBQWtCRSxrQkFEWjtBQUV6QjBDLGlCQUFPLHdDQUZrQjtBQUd6QkUsb0JBQVUsT0FBSy9DLE9BSFU7QUFJekI4QyxvQkFBVSxDQUFDLEtBQUQ7QUFKZSxTQUEzQjs7QUFPQTs7QUFFQSxlQUFLcEQsbUJBQUwsR0FBMkIsT0FBS3NELHFCQUFMLENBQTJCckIsSUFBM0IsQ0FBZ0MsTUFBaEMsQ0FBM0I7QUFDQXZCLGVBQU9xQyxZQUFQLENBQW9CUSxTQUFwQixDQUE4QjFDLFdBQTlCLENBQTBDLE9BQUtiLG1CQUEvQzs7QUFFQSxlQUFLQyx5QkFBTCxHQUFpQyxPQUFLdUQsaUJBQUwsQ0FBdUJ2QixJQUF2QixDQUE0QixNQUE1QixDQUFqQztBQUNBdkIsZUFBTytDLFFBQVAsQ0FBZ0JDLFNBQWhCLENBQTBCN0MsV0FBMUIsQ0FBc0MsT0FBS1oseUJBQTNDO0FBQ0QsT0F2REQ7QUF3REQ7OzsyQkFFTztBQUNOYSxjQUFRQyxLQUFSLENBQWMsZ0JBQWQ7QUFDQSxXQUFLYixXQUFMLEdBQW1CLEtBQUtOLFVBQUwsQ0FBZ0IrRCxNQUFoQixHQUF5QixDQUF6QixHQUE2QixHQUE3QixHQUFtQyxFQUF0RDs7QUFFQWpELGFBQU8wQixPQUFQLENBQWVuQixTQUFmLENBQXlCMkMsY0FBekIsQ0FBd0MsS0FBSy9ELHNCQUE3QztBQUNBYSxhQUFPMkIsYUFBUCxDQUFxQkMsV0FBckIsQ0FBaUNzQixjQUFqQyxDQUFnRCxLQUFLOUQseUJBQXJEO0FBQ0FZLGFBQU8yQixhQUFQLENBQXFCRSxnQkFBckIsQ0FBc0NxQixjQUF0QyxDQUFxRCxLQUFLN0QsbUJBQTFEO0FBQ0FXLGFBQU9xQyxZQUFQLENBQW9CUSxTQUFwQixDQUE4QkssY0FBOUIsQ0FBNkMsS0FBSzVELG1CQUFsRDs7QUFFQVUsYUFBTzhCLGFBQVAsQ0FBcUJDLE9BQXJCLENBQTZCLEVBQUVDLE1BQU0seUJBQVIsRUFBN0I7QUFDQWhDLGFBQU84QixhQUFQLENBQXFCRyxZQUFyQixDQUFrQyxFQUFDQyxNQUFNLEtBQUsxQyxXQUFaLEVBQWxDO0FBQ0FRLGFBQU84QixhQUFQLENBQXFCSyx1QkFBckIsQ0FBNkMsRUFBQ0MsT0FBTyxTQUFSLEVBQTdDOztBQUVBcEMsYUFBT21ELE9BQVAsQ0FBZUMsS0FBZixDQUFxQkMsR0FBckIsQ0FBeUIsRUFBRUMsV0FBVyxLQUFLcEUsVUFBbEIsRUFBekIsRUFBeUQsWUFBTTtBQUM3RGtCLGdCQUFRQyxLQUFSLENBQWMsa0JBQWQ7QUFDRCxPQUZEO0FBR0Q7Ozs0QkFFUTtBQUNQRCxjQUFRQyxLQUFSLENBQWMsT0FBZDtBQUNBLFdBQUtiLFdBQUwsR0FBbUIsSUFBbkI7QUFDQVEsYUFBTzhCLGFBQVAsQ0FBcUJHLFlBQXJCLENBQWtDLEVBQUVDLE1BQU0sS0FBSzFDLFdBQWIsRUFBbEM7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0Q7Ozs4QkFFVTtBQUNUVyxjQUFRQyxLQUFSLENBQWMsU0FBZDtBQUNBLFdBQUtiLFdBQUwsR0FBbUIsS0FBbkI7QUFDQVEsYUFBTzhCLGFBQVAsQ0FBcUJHLFlBQXJCLENBQWtDLEVBQUVDLE1BQU0sS0FBSzFDLFdBQWIsRUFBbEM7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0Q7Ozs0QkFFUThELEUsRUFBSTtBQUNYbkQsY0FBUUMsS0FBUixDQUFjLFNBQWQ7QUFDQSxXQUFLbkIsVUFBTCxHQUFrQixFQUFsQjtBQUNBYyxhQUFPOEIsYUFBUCxDQUFxQkcsWUFBckIsQ0FBa0MsRUFBRUMsTUFBTSxFQUFSLEVBQWxDO0FBQ0FsQyxhQUFPbUQsT0FBUCxDQUFlQyxLQUFmLENBQXFCSSxNQUFyQixDQUE0QixXQUE1QixFQUF5QyxZQUFNO0FBQzdDcEQsZ0JBQVFDLEtBQVIsQ0FBYywwQkFBZDtBQUNBLFlBQUlrRCxFQUFKLEVBQVFBO0FBQ1QsT0FIRDtBQUlEOzs7cUNBRWlCRSxJLEVBQU07QUFDdEIsVUFBSSxDQUFDLEtBQUsvRCxRQUFWLEVBQW9CO0FBQ2xCVSxnQkFBUUMsS0FBUixDQUFjLHNCQUFkLEVBQXNDb0QsSUFBdEM7QUFDQSxhQUFLbkMsYUFBTCxDQUFtQixFQUFDb0MsVUFBVUMsU0FBWCxFQUFzQkMsT0FBT0QsU0FBN0IsRUFBd0NsRCxRQUFRb0Qsc0JBQVlDLElBQTVELEVBQWtFTCxVQUFsRSxFQUFuQjtBQUNBLGFBQUsvRCxRQUFMLEdBQWdCLElBQWhCO0FBQ0Q7QUFDRjs7OzhDQUUwQmtFLEssRUFBTztBQUNoQyxVQUFJLENBQUMsS0FBS2pFLFlBQVYsRUFBd0I7QUFDdEIsYUFBSzJCLGFBQUwsQ0FBbUIsRUFBQ29DLFVBQVVDLFNBQVgsRUFBc0JDLFlBQXRCLEVBQTZCbkQsUUFBUW9ELHNCQUFZRSxRQUFqRCxFQUFuQjtBQUNBLGFBQUtwRSxZQUFMLEdBQW9CLElBQXBCO0FBQ0Q7QUFDRjs7O3VDQUVtQjtBQUNsQixXQUFLMkIsYUFBTCxDQUFtQixFQUFFb0MsVUFBVUMsU0FBWixFQUF1QkMsT0FBT0QsU0FBOUIsRUFBeUNsRCxRQUFRb0Qsc0JBQVlHLFVBQTdELEVBQW5CO0FBQ0Q7OztxQ0FFaUJKLEssRUFBTztBQUN2QixXQUFLdEMsYUFBTCxDQUFtQixFQUFFb0MsVUFBVUMsU0FBWixFQUF1QkMsWUFBdkIsRUFBOEJuRCxRQUFRb0Qsc0JBQVkvRCxVQUFsRCxFQUFuQjtBQUNEOzs7a0NBRWNVLEcsRUFBS3lELE0sRUFBUTtBQUMxQixVQUFJekQsSUFBSTBELE9BQVIsRUFBaUIsT0FBTyxLQUFLQyxvQkFBTCxDQUEwQjNELEdBQTFCLEVBQStCeUQsTUFBL0IsQ0FBUDs7QUFFakI7QUFDQXpELFVBQUk0RCxPQUFKLEdBQWNILFNBQVNBLE9BQU9HLE9BQWhCLEdBQTBCLElBQXhDO0FBQ0E1RCxVQUFJNkQsUUFBSixHQUFlSixTQUFTQSxPQUFPSyxHQUFoQixHQUFzQixJQUFyQzs7QUFFQSxVQUFJLENBQUMsS0FBSzdFLFNBQVYsRUFBcUI7QUFDbkIsYUFBS1AsVUFBTCxDQUFnQnFGLElBQWhCLENBQXFCL0QsR0FBckI7QUFDQVIsZUFBT21ELE9BQVAsQ0FBZUMsS0FBZixDQUFxQkMsR0FBckIsQ0FBeUIsRUFBRUMsV0FBVyxLQUFLcEUsVUFBbEIsRUFBekIsRUFBeUQsWUFBTTtBQUM3RGtCLGtCQUFRQyxLQUFSLENBQWMsMEJBQWQ7QUFDRCxTQUZEO0FBR0Q7QUFDRjs7O3lDQUVxQkcsRyxFQUFLeUQsTSxFQUFRO0FBQ2pDLFVBQUl6RCxJQUFJMEQsT0FBSixLQUFnQk0sbUNBQUtDLHNCQUF6QixFQUFpRHpFLE9BQU84QixhQUFQLENBQXFCRyxZQUFyQixDQUFrQyxFQUFFQyxNQUFNLEtBQUsxQyxXQUFiLEVBQWxDO0FBQ2pELFVBQUlnQixJQUFJMEQsT0FBSixLQUFnQk0sbUNBQUtFLGlCQUF6QixFQUE0QyxLQUFLQyx5QkFBTCxDQUErQm5FLElBQUlvRSxXQUFuQztBQUM1QyxVQUFJcEUsSUFBSTBELE9BQUosS0FBZ0JNLG1DQUFLSyxlQUF6QixFQUEwQyxLQUFLQyxnQkFBTCxDQUFzQnRFLElBQUlpRCxJQUExQjtBQUMxQyxVQUFJakQsSUFBSTBELE9BQUosS0FBZ0JNLG1DQUFLTyxjQUF6QixFQUF5QyxLQUFLQyxnQkFBTCxDQUFzQnhFLElBQUlvRCxLQUExQjtBQUMxQzs7OzJDQUU4QjtBQUFBLFVBQVhRLE9BQVcsUUFBWEEsT0FBVzs7QUFDN0JoRSxjQUFRQyxLQUFSLENBQWMsYUFBZCxFQUE2QitELE9BQTdCO0FBQ0EsV0FBSy9DLFlBQUw7QUFDQSxVQUFJK0MsWUFBWSxDQUFoQixFQUFtQjtBQUNqQixhQUFLYSxnQkFBTDtBQUNEO0FBQ0Y7OzswQ0FFc0JDLEksRUFBTUMsRyxFQUFLO0FBQ2hDL0UsY0FBUUMsS0FBUixDQUFjLHNCQUFkO0FBQ0EsY0FBUTZFLEtBQUtFLFVBQWI7QUFDRSxhQUFNLEtBQUt4RixPQUFMLEdBQWUsS0FBS0MsWUFBTCxDQUFrQkMsVUFBdkM7QUFDRSxlQUFLdUYsb0JBQUwsQ0FBMEIzRSw2QkFBUTRFLHNCQUFsQztBQUNBO0FBQ0YsYUFBTSxLQUFLMUYsT0FBTCxHQUFlLEtBQUtDLFlBQUwsQ0FBa0JFLGtCQUF2QztBQUNFLGVBQUtzRixvQkFBTCxDQUEwQjNFLDZCQUFRNkUsOEJBQWxDO0FBQ0E7QUFOSjtBQVFEOzs7c0NBRWtCQyxPLEVBQVM7QUFDMUIsY0FBUUEsT0FBUjtBQUNFLGFBQUs5RSw2QkFBUTRFLHNCQUFiO0FBQ0UsZUFBS0Qsb0JBQUwsQ0FBMEIzRSw2QkFBUTRFLHNCQUFsQztBQUNBO0FBQ0YsYUFBSzVFLDZCQUFRNkUsOEJBQWI7QUFDRSxlQUFLRixvQkFBTCxDQUEwQjNFLDZCQUFRNkUsOEJBQWxDO0FBQ0E7QUFOSjtBQVFEOzs7eUNBRXFCOUUsTSxFQUFRO0FBQzVCTCxjQUFRQyxLQUFSLENBQWMsMEJBQWQ7QUFDQUwsYUFBT3lGLElBQVAsQ0FBWUMsS0FBWixDQUFrQixFQUFDQyxRQUFRLElBQVQsRUFBZUMsZUFBZSxJQUE5QixFQUFsQixFQUF1RCxnQkFBUTtBQUM3RDVGLGVBQU95RixJQUFQLENBQVlJLFdBQVosQ0FBd0JKLEtBQUssQ0FBTCxFQUFRakQsRUFBaEMsRUFBb0MsRUFBRS9CLGNBQUYsRUFBcEM7QUFDRCxPQUZEO0FBR0Q7OztpQ0FFYTtBQUNaVCxhQUFPOEIsYUFBUCxDQUFxQkcsWUFBckIsQ0FBa0MsRUFBRUMsTUFBTSxNQUFSLEVBQWxDO0FBQ0Q7OzttQ0FFZTtBQUNkbEMsYUFBT3lGLElBQVAsQ0FBWUssYUFBWixDQUEwQixFQUFFQyxNQUFNLG1CQUFSLEVBQTZCQyxXQUFXLElBQXhDLEVBQTFCO0FBQ0Q7Ozs7O0FBR0g1RixRQUFRQyxLQUFSLENBQWMsOEJBQWQ7QUFDQTRGLE9BQU9DLG1CQUFQLEdBQTZCLElBQUlqSCxtQkFBSixFQUE3QjtBQUNBZ0gsT0FBT0MsbUJBQVAsQ0FBMkJDLElBQTNCIiwiZmlsZSI6Ii4vc3JjL2JhY2tncm91bmQvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHB0ckFjdGlvbnMgZnJvbSAnLi4vY29kZS1nZW5lcmF0b3IvcHB0ci1hY3Rpb25zJ1xuaW1wb3J0IGN0cmwgZnJvbSAnLi4vbW9kZWxzL2V4dGVuc2lvbi1jb250cm9sLW1lc3NhZ2VzJ1xuaW1wb3J0IGFjdGlvbnMgZnJvbSAnLi4vbW9kZWxzL2V4dGVuc2lvbi11aS1hY3Rpb25zJ1xuXG5jbGFzcyBSZWNvcmRpbmdDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuX3JlY29yZGluZyA9IFtdXG4gICAgdGhpcy5fYm91bmRlZE1lc3NhZ2VIYW5kbGVyID0gbnVsbFxuICAgIHRoaXMuX2JvdW5kZWROYXZpZ2F0aW9uSGFuZGxlciA9IG51bGxcbiAgICB0aGlzLl9ib3VuZGVkV2FpdEhhbmRsZXIgPSBudWxsXG4gICAgdGhpcy5fYm91bmRlZE1lbnVIYW5kbGVyID0gbnVsbFxuICAgIHRoaXMuX2JvdW5kZWRLZXlDb21tYW5kSGFuZGxlciA9IG51bGxcbiAgICB0aGlzLl9iYWRnZVN0YXRlID0gJydcbiAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlXG5cbiAgICAvLyBTb21lIGV2ZW50cyBhcmUgc2VudCBkb3VibGUgb24gcGFnZSBuYXZpZ2F0aW9ucyB0byBzaW1wbGlmeSB0aGUgZXZlbnQgcmVjb3JkZXIuXG4gICAgLy8gV2Uga2VlcCBzb21lIHNpbXBsZSBzdGF0ZSB0byBkaXNyZWdhcmQgZXZlbnRzIGlmIG5lZWRlZC5cbiAgICB0aGlzLl9oYXNHb3RvID0gZmFsc2VcbiAgICB0aGlzLl9oYXNWaWV3UG9ydCA9IGZhbHNlXG5cbiAgICB0aGlzLl9tZW51SWQgPSAnUFVQUEVURUVSX1JFQ09SREVSX0NPTlRFWFRfTUVOVSdcbiAgICB0aGlzLl9tZW51T3B0aW9ucyA9IHtcbiAgICAgIFNDUkVFTlNIT1Q6ICdTQ1JFRU5TSE9UJyxcbiAgICAgIFNDUkVFTlNIT1RfQ0xJUFBFRDogJ1NDUkVFTlNIT1RfQ0xJUFBFRCdcbiAgICB9XG4gIH1cblxuICBib290ICgpIHtcbiAgICBjaHJvbWUuZXh0ZW5zaW9uLm9uQ29ubmVjdC5hZGRMaXN0ZW5lcihwb3J0ID0+IHtcbiAgICAgIGNvbnNvbGUuZGVidWcoJ2xpc3RlbmVycyBjb25uZWN0ZWQnKVxuICAgICAgcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIobXNnID0+IHtcbiAgICAgICAgaWYgKG1zZy5hY3Rpb24gJiYgbXNnLmFjdGlvbiA9PT0gYWN0aW9ucy5TVEFSVCkgdGhpcy5zdGFydCgpXG4gICAgICAgIGlmIChtc2cuYWN0aW9uICYmIG1zZy5hY3Rpb24gPT09IGFjdGlvbnMuU1RPUCkgdGhpcy5zdG9wKClcbiAgICAgICAgaWYgKG1zZy5hY3Rpb24gJiYgbXNnLmFjdGlvbiA9PT0gYWN0aW9ucy5DTEVBTl9VUCkgdGhpcy5jbGVhblVwKClcbiAgICAgICAgaWYgKG1zZy5hY3Rpb24gJiYgbXNnLmFjdGlvbiA9PT0gYWN0aW9ucy5QQVVTRSkgdGhpcy5wYXVzZSgpXG4gICAgICAgIGlmIChtc2cuYWN0aW9uICYmIG1zZy5hY3Rpb24gPT09IGFjdGlvbnMuVU5fUEFVU0UpIHRoaXMudW5QYXVzZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBzdGFydCAoKSB7XG4gICAgY29uc29sZS5kZWJ1Zygnc3RhcnQgcmVjb3JkaW5nJylcbiAgICB0aGlzLmNsZWFuVXAoKCkgPT4ge1xuICAgICAgdGhpcy5fYmFkZ2VTdGF0ZSA9ICdyZWMnXG5cbiAgICAgIHRoaXMuX2hhc0dvdG8gPSBmYWxzZVxuICAgICAgdGhpcy5faGFzVmlld1BvcnQgPSBmYWxzZVxuXG4gICAgICB0aGlzLmluamVjdFNjcmlwdCgpXG5cbiAgICAgIHRoaXMuX2JvdW5kZWRNZXNzYWdlSGFuZGxlciA9IHRoaXMuaGFuZGxlTWVzc2FnZS5iaW5kKHRoaXMpXG4gICAgICB0aGlzLl9ib3VuZGVkTmF2aWdhdGlvbkhhbmRsZXIgPSB0aGlzLmhhbmRsZU5hdmlnYXRpb24uYmluZCh0aGlzKVxuICAgICAgdGhpcy5fYm91bmRlZFdhaXRIYW5kbGVyID0gdGhpcy5oYW5kbGVXYWl0LmJpbmQodGhpcylcblxuICAgICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKHRoaXMuX2JvdW5kZWRNZXNzYWdlSGFuZGxlcilcbiAgICAgIGNocm9tZS53ZWJOYXZpZ2F0aW9uLm9uQ29tcGxldGVkLmFkZExpc3RlbmVyKHRoaXMuX2JvdW5kZWROYXZpZ2F0aW9uSGFuZGxlcilcbiAgICAgIGNocm9tZS53ZWJOYXZpZ2F0aW9uLm9uQmVmb3JlTmF2aWdhdGUuYWRkTGlzdGVuZXIodGhpcy5fYm91bmRlZFdhaXRIYW5kbGVyKVxuXG4gICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHsgcGF0aDogJy4vaW1hZ2VzL2ljb24tZ3JlZW4ucG5nJyB9KVxuICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogdGhpcy5fYmFkZ2VTdGF0ZSB9KVxuICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3IoeyBjb2xvcjogJyNGRjAwMDAnIH0pXG5cbiAgICAgIC8qKlxuICAgICAgICogUmlnaHQgY2xpY2sgbWVudSBzZXR1cFxuICAgICAgICovXG5cbiAgICAgIGNocm9tZS5jb250ZXh0TWVudXMucmVtb3ZlQWxsKClcblxuICAgICAgLy8gYWRkIHRoZSBwYXJlbnQgYW5kIGl0cyBjaGlsZHJlblxuXG4gICAgICBjaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgICAgIGlkOiB0aGlzLl9tZW51SWQsXG4gICAgICAgIHRpdGxlOiAnQmVoYXQgUmVjb3JkZXInLFxuICAgICAgICBjb250ZXh0czogWydhbGwnXVxuICAgICAgfSlcblxuICAgICAgY2hyb21lLmNvbnRleHRNZW51cy5jcmVhdGUoe1xuICAgICAgICBpZDogdGhpcy5fbWVudUlkICsgdGhpcy5fbWVudU9wdGlvbnMuU0NSRUVOU0hPVCxcbiAgICAgICAgdGl0bGU6ICdUYWtlIFNjcmVlbnNob3QgKEN0cmwrU2hpZnQrQSknLFxuICAgICAgICBwYXJlbnRJZDogdGhpcy5fbWVudUlkLFxuICAgICAgICBjb250ZXh0czogWydhbGwnXVxuICAgICAgfSlcblxuICAgICAgY2hyb21lLmNvbnRleHRNZW51cy5jcmVhdGUoe1xuICAgICAgICBpZDogdGhpcy5fbWVudUlkICsgdGhpcy5fbWVudU9wdGlvbnMuU0NSRUVOU0hPVF9DTElQUEVELFxuICAgICAgICB0aXRsZTogJ1Rha2UgU2NyZWVuc2hvdCBDbGlwcGVkIChDdHJsK1NoaWZ0K1MpJyxcbiAgICAgICAgcGFyZW50SWQ6IHRoaXMuX21lbnVJZCxcbiAgICAgICAgY29udGV4dHM6IFsnYWxsJ11cbiAgICAgIH0pXG5cbiAgICAgIC8vIGFkZCB0aGUgaGFuZGxlcnNcblxuICAgICAgdGhpcy5fYm91bmRlZE1lbnVIYW5kbGVyID0gdGhpcy5oYW5kbGVNZW51SW50ZXJhY3Rpb24uYmluZCh0aGlzKVxuICAgICAgY2hyb21lLmNvbnRleHRNZW51cy5vbkNsaWNrZWQuYWRkTGlzdGVuZXIodGhpcy5fYm91bmRlZE1lbnVIYW5kbGVyKVxuXG4gICAgICB0aGlzLl9ib3VuZGVkS2V5Q29tbWFuZEhhbmRsZXIgPSB0aGlzLmhhbmRsZUtleUNvbW1hbmRzLmJpbmQodGhpcylcbiAgICAgIGNocm9tZS5jb21tYW5kcy5vbkNvbW1hbmQuYWRkTGlzdGVuZXIodGhpcy5fYm91bmRlZEtleUNvbW1hbmRIYW5kbGVyKVxuICAgIH0pXG4gIH1cblxuICBzdG9wICgpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdzdG9wIHJlY29yZGluZycpXG4gICAgdGhpcy5fYmFkZ2VTdGF0ZSA9IHRoaXMuX3JlY29yZGluZy5sZW5ndGggPiAwID8gJzEnIDogJydcblxuICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5yZW1vdmVMaXN0ZW5lcih0aGlzLl9ib3VuZGVkTWVzc2FnZUhhbmRsZXIpXG4gICAgY2hyb21lLndlYk5hdmlnYXRpb24ub25Db21wbGV0ZWQucmVtb3ZlTGlzdGVuZXIodGhpcy5fYm91bmRlZE5hdmlnYXRpb25IYW5kbGVyKVxuICAgIGNocm9tZS53ZWJOYXZpZ2F0aW9uLm9uQmVmb3JlTmF2aWdhdGUucmVtb3ZlTGlzdGVuZXIodGhpcy5fYm91bmRlZFdhaXRIYW5kbGVyKVxuICAgIGNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLnJlbW92ZUxpc3RlbmVyKHRoaXMuX2JvdW5kZWRNZW51SGFuZGxlcilcblxuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEljb24oeyBwYXRoOiAnLi9pbWFnZXMvaWNvbi1ibGFjay5wbmcnIH0pXG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHt0ZXh0OiB0aGlzLl9iYWRnZVN0YXRlfSlcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZUJhY2tncm91bmRDb2xvcih7Y29sb3I6ICcjNDVDOEYxJ30pXG5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyByZWNvcmRpbmc6IHRoaXMuX3JlY29yZGluZyB9LCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmRlYnVnKCdyZWNvcmRpbmcgc3RvcmVkJylcbiAgICB9KVxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIGNvbnNvbGUuZGVidWcoJ3BhdXNlJylcbiAgICB0aGlzLl9iYWRnZVN0YXRlID0gJ+KdmuKdmidcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiB0aGlzLl9iYWRnZVN0YXRlIH0pXG4gICAgdGhpcy5faXNQYXVzZWQgPSB0cnVlXG4gIH1cblxuICB1blBhdXNlICgpIHtcbiAgICBjb25zb2xlLmRlYnVnKCd1bnBhdXNlJylcbiAgICB0aGlzLl9iYWRnZVN0YXRlID0gJ3JlYydcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiB0aGlzLl9iYWRnZVN0YXRlIH0pXG4gICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZVxuICB9XG5cbiAgY2xlYW5VcCAoY2IpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdjbGVhbnVwJylcbiAgICB0aGlzLl9yZWNvcmRpbmcgPSBbXVxuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6ICcnIH0pXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKCdyZWNvcmRpbmcnLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmRlYnVnKCdzdG9yZWQgcmVjb3JkaW5nIGNsZWFyZWQnKVxuICAgICAgaWYgKGNiKSBjYigpXG4gICAgfSlcbiAgfVxuXG4gIHJlY29yZEN1cnJlbnRVcmwgKGhyZWYpIHtcbiAgICBpZiAoIXRoaXMuX2hhc0dvdG8pIHtcbiAgICAgIGNvbnNvbGUuZGVidWcoJ3JlY29yZGluZyBnb3RvKiBmb3I6JywgaHJlZilcbiAgICAgIHRoaXMuaGFuZGxlTWVzc2FnZSh7c2VsZWN0b3I6IHVuZGVmaW5lZCwgdmFsdWU6IHVuZGVmaW5lZCwgYWN0aW9uOiBwcHRyQWN0aW9ucy5HT1RPLCBocmVmfSlcbiAgICAgIHRoaXMuX2hhc0dvdG8gPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgcmVjb3JkQ3VycmVudFZpZXdwb3J0U2l6ZSAodmFsdWUpIHtcbiAgICBpZiAoIXRoaXMuX2hhc1ZpZXdQb3J0KSB7XG4gICAgICB0aGlzLmhhbmRsZU1lc3NhZ2Uoe3NlbGVjdG9yOiB1bmRlZmluZWQsIHZhbHVlLCBhY3Rpb246IHBwdHJBY3Rpb25zLlZJRVdQT1JUfSlcbiAgICAgIHRoaXMuX2hhc1ZpZXdQb3J0ID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIHJlY29yZE5hdmlnYXRpb24gKCkge1xuICAgIHRoaXMuaGFuZGxlTWVzc2FnZSh7IHNlbGVjdG9yOiB1bmRlZmluZWQsIHZhbHVlOiB1bmRlZmluZWQsIGFjdGlvbjogcHB0ckFjdGlvbnMuTkFWSUdBVElPTiB9KVxuICB9XG5cbiAgcmVjb3JkU2NyZWVuc2hvdCAodmFsdWUpIHtcbiAgICB0aGlzLmhhbmRsZU1lc3NhZ2UoeyBzZWxlY3RvcjogdW5kZWZpbmVkLCB2YWx1ZSwgYWN0aW9uOiBwcHRyQWN0aW9ucy5TQ1JFRU5TSE9UIH0pXG4gIH1cblxuICBoYW5kbGVNZXNzYWdlIChtc2csIHNlbmRlcikge1xuICAgIGlmIChtc2cuY29udHJvbCkgcmV0dXJuIHRoaXMuaGFuZGxlQ29udHJvbE1lc3NhZ2UobXNnLCBzZW5kZXIpXG5cbiAgICAvLyB0byBhY2NvdW50IGZvciBjbGlja3MgZXRjLiB3ZSBuZWVkIHRvIHJlY29yZCB0aGUgZnJhbWVJZCBhbmQgdXJsIHRvIGxhdGVyIHRhcmdldCB0aGUgZnJhbWUgaW4gcGxheWJhY2tcbiAgICBtc2cuZnJhbWVJZCA9IHNlbmRlciA/IHNlbmRlci5mcmFtZUlkIDogbnVsbFxuICAgIG1zZy5mcmFtZVVybCA9IHNlbmRlciA/IHNlbmRlci51cmwgOiBudWxsXG5cbiAgICBpZiAoIXRoaXMuX2lzUGF1c2VkKSB7XG4gICAgICB0aGlzLl9yZWNvcmRpbmcucHVzaChtc2cpXG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyByZWNvcmRpbmc6IHRoaXMuX3JlY29yZGluZyB9LCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoJ3N0b3JlZCByZWNvcmRpbmcgdXBkYXRlZCcpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNvbnRyb2xNZXNzYWdlIChtc2csIHNlbmRlcikge1xuICAgIGlmIChtc2cuY29udHJvbCA9PT0gY3RybC5FVkVOVF9SRUNPUkRFUl9TVEFSVEVEKSBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiB0aGlzLl9iYWRnZVN0YXRlIH0pXG4gICAgaWYgKG1zZy5jb250cm9sID09PSBjdHJsLkdFVF9WSUVXUE9SVF9TSVpFKSB0aGlzLnJlY29yZEN1cnJlbnRWaWV3cG9ydFNpemUobXNnLmNvb3JkaW5hdGVzKVxuICAgIGlmIChtc2cuY29udHJvbCA9PT0gY3RybC5HRVRfQ1VSUkVOVF9VUkwpIHRoaXMucmVjb3JkQ3VycmVudFVybChtc2cuaHJlZilcbiAgICBpZiAobXNnLmNvbnRyb2wgPT09IGN0cmwuR0VUX1NDUkVFTlNIT1QpIHRoaXMucmVjb3JkU2NyZWVuc2hvdChtc2cudmFsdWUpXG4gIH1cblxuICBoYW5kbGVOYXZpZ2F0aW9uICh7IGZyYW1lSWQgfSkge1xuICAgIGNvbnNvbGUuZGVidWcoJ2ZyYW1lSWQgaXM6JywgZnJhbWVJZClcbiAgICB0aGlzLmluamVjdFNjcmlwdCgpXG4gICAgaWYgKGZyYW1lSWQgPT09IDApIHtcbiAgICAgIHRoaXMucmVjb3JkTmF2aWdhdGlvbigpXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTWVudUludGVyYWN0aW9uIChpbmZvLCB0YWIpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdjb250ZXh0IG1lbnUgY2xpY2tlZCcpXG4gICAgc3dpdGNoIChpbmZvLm1lbnVJdGVtSWQpIHtcbiAgICAgIGNhc2UgKHRoaXMuX21lbnVJZCArIHRoaXMuX21lbnVPcHRpb25zLlNDUkVFTlNIT1QpOlxuICAgICAgICB0aGlzLnRvZ2dsZVNjcmVlblNob3RNb2RlKGFjdGlvbnMuVE9HR0xFX1NDUkVFTlNIT1RfTU9ERSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgKHRoaXMuX21lbnVJZCArIHRoaXMuX21lbnVPcHRpb25zLlNDUkVFTlNIT1RfQ0xJUFBFRCk6XG4gICAgICAgIHRoaXMudG9nZ2xlU2NyZWVuU2hvdE1vZGUoYWN0aW9ucy5UT0dHTEVfU0NSRUVOU0hPVF9DTElQUEVEX01PREUpXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlS2V5Q29tbWFuZHMgKGNvbW1hbmQpIHtcbiAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcbiAgICAgIGNhc2UgYWN0aW9ucy5UT0dHTEVfU0NSRUVOU0hPVF9NT0RFOlxuICAgICAgICB0aGlzLnRvZ2dsZVNjcmVlblNob3RNb2RlKGFjdGlvbnMuVE9HR0xFX1NDUkVFTlNIT1RfTU9ERSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgYWN0aW9ucy5UT0dHTEVfU0NSRUVOU0hPVF9DTElQUEVEX01PREU6XG4gICAgICAgIHRoaXMudG9nZ2xlU2NyZWVuU2hvdE1vZGUoYWN0aW9ucy5UT0dHTEVfU0NSRUVOU0hPVF9DTElQUEVEX01PREUpXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlU2NyZWVuU2hvdE1vZGUgKGFjdGlvbikge1xuICAgIGNvbnNvbGUuZGVidWcoJ3RvZ2dsaW5nIHNjcmVlbnNob3QgbW9kZScpXG4gICAgY2hyb21lLnRhYnMucXVlcnkoe2FjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZX0sIHRhYnMgPT4ge1xuICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXS5pZCwgeyBhY3Rpb24gfSlcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlV2FpdCAoKSB7XG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogJ3dhaXQnIH0pXG4gIH1cblxuICBpbmplY3RTY3JpcHQgKCkge1xuICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoeyBmaWxlOiAnY29udGVudC1zY3JpcHQuanMnLCBhbGxGcmFtZXM6IHRydWUgfSlcbiAgfVxufVxuXG5jb25zb2xlLmRlYnVnKCdib290aW5nIHJlY29yZGluZyBjb250cm9sbGVyJylcbndpbmRvdy5yZWNvcmRpbmdDb250cm9sbGVyID0gbmV3IFJlY29yZGluZ0NvbnRyb2xsZXIoKVxud2luZG93LnJlY29yZGluZ0NvbnRyb2xsZXIuYm9vdCgpXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/background/index.js\n");

/***/ })

})