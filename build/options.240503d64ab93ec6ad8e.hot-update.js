webpackHotUpdate("options",{

/***/ "./src/code-generator/CodeGenerator.js":
/*!*********************************************!*\
  !*** ./src/code-generator/CodeGenerator.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.defaults = undefined;\n\nvar _getIterator2 = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ \"./node_modules/babel-runtime/core-js/get-iterator.js\");\n\nvar _getIterator3 = _interopRequireDefault(_getIterator2);\n\nvar _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ \"./node_modules/babel-runtime/core-js/object/assign.js\");\n\nvar _assign2 = _interopRequireDefault(_assign);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _domEventsToRecord = __webpack_require__(/*! ./dom-events-to-record */ \"./src/code-generator/dom-events-to-record.js\");\n\nvar _domEventsToRecord2 = _interopRequireDefault(_domEventsToRecord);\n\nvar _pptrActions = __webpack_require__(/*! ./pptr-actions */ \"./src/code-generator/pptr-actions.js\");\n\nvar _pptrActions2 = _interopRequireDefault(_pptrActions);\n\nvar _Block = __webpack_require__(/*! ./Block */ \"./src/code-generator/Block.js\");\n\nvar _Block2 = _interopRequireDefault(_Block);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar featureTitle = 'Feature: my feature name\\n\\n\\tScenario: my scenario\\n';\n\nvar defaults = exports.defaults = {\n  wrapAsync: true,\n  headless: true,\n  waitForNavigation: true,\n  waitForSelectorOnClick: true,\n  blankLinesBetweenBlocks: true,\n  dataAttribute: ''\n};\n\nvar CodeGenerator = function () {\n  function CodeGenerator(options) {\n    (0, _classCallCheck3.default)(this, CodeGenerator);\n\n    this._options = (0, _assign2.default)(defaults, options);\n    this._blocks = [];\n    this._frame = 'page';\n    this._frameId = 0;\n    this._allFrames = {};\n    this._screenshotCounter = 1;\n\n    this._hasNavigation = false;\n  }\n\n  (0, _createClass3.default)(CodeGenerator, [{\n    key: 'generate',\n    value: function generate(events) {\n      return featureTitle + this._parseEvents(events);\n    }\n  }, {\n    key: '_parseEvents',\n    value: function _parseEvents(events) {\n      console.debug('generating code for ' + (events ? events.length : 0) + ' events');\n      var result = '';\n\n      if (!events) return result;\n\n      for (var i = 0; i < events.length; i++) {\n        var _events$i = events[i],\n            action = _events$i.action,\n            selector = _events$i.selector,\n            value = _events$i.value,\n            href = _events$i.href,\n            keyCode = _events$i.keyCode,\n            tagName = _events$i.tagName,\n            frameId = _events$i.frameId,\n            frameUrl = _events$i.frameUrl;\n\n        // we need to keep a handle on what frames events originate from\n\n        this._setFrames(frameId, frameUrl);\n        console.log(action);\n\n        switch (action) {\n          case 'keydown':\n            if (keyCode === 9) {\n              // tab key\n              this._blocks.push(this._handleKeyDown(selector, value, keyCode));\n            }\n            break;\n          case 'click':\n            this._blocks.push(this._handleClick(selector, events));\n            break;\n          case 'change':\n            if (tagName === 'SELECT') {\n              this._blocks.push(this._handleChange(selector, value));\n            }\n            this._blocks.push(this._handleChange(selector, value));\n            break;\n          case _pptrActions2.default.GOTO:\n            this._blocks.push(this._handleGoto(href, frameId));\n            break;\n          case _pptrActions2.default.NAVIGATION:\n            this._blocks.push(this._handleWaitForNavigation());\n            this._hasNavigation = true;\n            break;\n          case _pptrActions2.default.SCREENSHOT:\n            this._blocks.push(this._handleScreenshot(value));\n            break;\n        }\n      }\n      var indent = this._options.wrapAsync ? '  ' : '';\n      var newLine = '\\n';\n\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = (0, _getIterator3.default)(this._blocks), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var block = _step.value;\n\n          if (typeof block == 'undefined') {\n            continue;\n          }\n          var lines = block.getLines();\n          var _iteratorNormalCompletion2 = true;\n          var _didIteratorError2 = false;\n          var _iteratorError2 = undefined;\n\n          try {\n            for (var _iterator2 = (0, _getIterator3.default)(lines), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n              var line = _step2.value;\n\n              result += indent + line.value + newLine;\n            }\n          } catch (err) {\n            _didIteratorError2 = true;\n            _iteratorError2 = err;\n          } finally {\n            try {\n              if (!_iteratorNormalCompletion2 && _iterator2.return) {\n                _iterator2.return();\n              }\n            } finally {\n              if (_didIteratorError2) {\n                throw _iteratorError2;\n              }\n            }\n          }\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator.return) {\n            _iterator.return();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n\n      return result;\n    }\n  }, {\n    key: '_setFrames',\n    value: function _setFrames(frameId, frameUrl) {\n      if (frameId && frameId !== 0) {\n        this._frameId = frameId;\n        this._frame = 'frame_' + frameId;\n        this._allFrames[frameId] = frameUrl;\n      } else {\n        this._frameId = 0;\n        this._frame = 'page';\n      }\n    }\n  }, {\n    key: '_handleKeyDown',\n    value: function _handleKeyDown(selector, value) {\n      return new _Block2.default(this._frameId, { type: _domEventsToRecord2.default.CHANGE, value: 'Given I type \\'' + value + '\\' in field \\'' + selector + '\\'' });\n    }\n  }, {\n    key: '_handleClick',\n    value: function _handleClick(selector) {\n      var block = new _Block2.default(this._frameId);\n      if (this._options.waitForSelectorOnClick) {\n        block.addLine({ type: _domEventsToRecord2.default.CLICK, value: 'Given I click on \\'' + selector + '\\'' });\n      }\n      return block;\n    }\n  }, {\n    key: '_handleChange',\n    value: function _handleChange(selector, value) {\n      return new _Block2.default(this._frameId, { type: _domEventsToRecord2.default.CHANGE, value: 'Given I type \\'' + value + '\\' in field \\'' + selector + '\\'' });\n    }\n  }, {\n    key: '_handleGoto',\n    value: function _handleGoto(href) {\n      return new _Block2.default(this._frameId, { type: _pptrActions2.default.GOTO, value: 'Given I go on \\'' + href + '\\'' });\n    }\n  }, {\n    key: '_handleScreenshot',\n    value: function _handleScreenshot(options) {\n      var block = void 0;\n      block = new _Block2.default(this._frameId, {\n        type: _pptrActions2.default.SCREENSHOT,\n        value: 'Take a screenshot '\n      });\n      this._screenshotCounter++;\n      return block;\n    }\n  }]);\n  return CodeGenerator;\n}();\n\nexports.default = CodeGenerator;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29kZS1nZW5lcmF0b3IvQ29kZUdlbmVyYXRvci5qcz85NDIyIl0sIm5hbWVzIjpbImZlYXR1cmVUaXRsZSIsImRlZmF1bHRzIiwid3JhcEFzeW5jIiwiaGVhZGxlc3MiLCJ3YWl0Rm9yTmF2aWdhdGlvbiIsIndhaXRGb3JTZWxlY3Rvck9uQ2xpY2siLCJibGFua0xpbmVzQmV0d2VlbkJsb2NrcyIsImRhdGFBdHRyaWJ1dGUiLCJDb2RlR2VuZXJhdG9yIiwib3B0aW9ucyIsIl9vcHRpb25zIiwiX2Jsb2NrcyIsIl9mcmFtZSIsIl9mcmFtZUlkIiwiX2FsbEZyYW1lcyIsIl9zY3JlZW5zaG90Q291bnRlciIsIl9oYXNOYXZpZ2F0aW9uIiwiZXZlbnRzIiwiX3BhcnNlRXZlbnRzIiwiY29uc29sZSIsImRlYnVnIiwibGVuZ3RoIiwicmVzdWx0IiwiaSIsImFjdGlvbiIsInNlbGVjdG9yIiwidmFsdWUiLCJocmVmIiwia2V5Q29kZSIsInRhZ05hbWUiLCJmcmFtZUlkIiwiZnJhbWVVcmwiLCJfc2V0RnJhbWVzIiwibG9nIiwicHVzaCIsIl9oYW5kbGVLZXlEb3duIiwiX2hhbmRsZUNsaWNrIiwiX2hhbmRsZUNoYW5nZSIsInBwdHJBY3Rpb25zIiwiR09UTyIsIl9oYW5kbGVHb3RvIiwiTkFWSUdBVElPTiIsIl9oYW5kbGVXYWl0Rm9yTmF2aWdhdGlvbiIsIlNDUkVFTlNIT1QiLCJfaGFuZGxlU2NyZWVuc2hvdCIsImluZGVudCIsIm5ld0xpbmUiLCJibG9jayIsImxpbmVzIiwiZ2V0TGluZXMiLCJsaW5lIiwiQmxvY2siLCJ0eXBlIiwiZG9tRXZlbnRzIiwiQ0hBTkdFIiwiYWRkTGluZSIsIkNMSUNLIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsc0VBQU47O0FBRU8sSUFBTUMsOEJBQVc7QUFDdEJDLGFBQVcsSUFEVztBQUV0QkMsWUFBVSxJ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QixDQUFQO0FBQ0Q7OztpQ0FFYUEsUSxFQUFVO0FBQ3RCLFVBQU1zQixRQUFRLElBQUlJLGVBQUosQ0FBVSxLQUFLdEMsUUFBZixDQUFkO0FBQ0EsVUFBSSxLQUFLSCxRQUFMLENBQWNMLHNCQUFsQixFQUEwQztBQUN4QzBDLGNBQU1RLE9BQU4sQ0FBYyxFQUFFSCxNQUFNQyw0QkFBVUcsS0FBbEIsRUFBeUI5QiwrQkFBNEJELFFBQTVCLE9BQXpCLEVBQWQ7QUFDRDtBQUNELGFBQU9zQixLQUFQO0FBQ0Q7OztrQ0FDY3RCLFEsRUFBVUMsSyxFQUFPO0FBQzlCLGFBQU8sSUFBSXlCLGVBQUosQ0FBVSxLQUFLdEMsUUFBZixFQUF5QixFQUFFdUMsTUFBTUMsNEJBQVVDLE1BQWxCLEVBQTBCNUIsMkJBQXdCQSxLQUF4QixzQkFBNENELFFBQTVDLE9BQTFCLEVBQXpCLENBQVA7QUFDRDs7O2dDQUNZRSxJLEVBQU07QUFDakIsYUFBTyxJQUFJd0IsZUFBSixDQUFVLEtBQUt0QyxRQUFmLEVBQXlCLEVBQUV1QyxNQUFNZCxzQkFBWUMsSUFBcEIsRUFBMEJiLDRCQUF5QkMsSUFBekIsT0FBMUIsRUFBekIsQ0FBUDtBQUNEOzs7c0NBRWtCbEIsTyxFQUFTO0FBQzFCLFVBQUlzQyxjQUFKO0FBQ0FBLGNBQVEsSUFBSUksZUFBSixDQUFVLEtBQUt0QyxRQUFmLEVBQXlCO0FBQzdCdUMsY0FBTWQsc0JBQVlLLFVBRFc7QUFFN0JqQjtBQUY2QixPQUF6QixDQUFSO0FBSUEsV0FBS1gsa0JBQUw7QUFDQSxhQUFPZ0MsS0FBUDtBQUNEOzs7OztrQkE3R2tCdkMsYSIsImZpbGUiOiIuL3NyYy9jb2RlLWdlbmVyYXRvci9Db2RlR2VuZXJhdG9yLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvbUV2ZW50cyBmcm9tICcuL2RvbS1ldmVudHMtdG8tcmVjb3JkJ1xuaW1wb3J0IHBwdHJBY3Rpb25zIGZyb20gJy4vcHB0ci1hY3Rpb25zJ1xuaW1wb3J0IEJsb2NrIGZyb20gJy4vQmxvY2snXG5cbmNvbnN0IGZlYXR1cmVUaXRsZSA9IGBGZWF0dXJlOiBteSBmZWF0dXJlIG5hbWVcXG5cXG5cXHRTY2VuYXJpbzogbXkgc2NlbmFyaW9cXG5gXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0cyA9IHtcbiAgd3JhcEFzeW5jOiB0cnVlLFxuICBoZWFkbGVzczogdHJ1ZSxcbiAgd2FpdEZvck5hdmlnYXRpb246IHRydWUsXG4gIHdhaXRGb3JTZWxlY3Rvck9uQ2xpY2s6IHRydWUsXG4gIGJsYW5rTGluZXNCZXR3ZWVuQmxvY2tzOiB0cnVlLFxuICBkYXRhQXR0cmlidXRlOiAnJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2RlR2VuZXJhdG9yIHtcbiAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0cywgb3B0aW9ucylcbiAgICB0aGlzLl9ibG9ja3MgPSBbXVxuICAgIHRoaXMuX2ZyYW1lID0gJ3BhZ2UnXG4gICAgdGhpcy5fZnJhbWVJZCA9IDBcbiAgICB0aGlzLl9hbGxGcmFtZXMgPSB7fVxuICAgIHRoaXMuX3NjcmVlbnNob3RDb3VudGVyID0gMVxuXG4gICAgdGhpcy5faGFzTmF2aWdhdGlvbiA9IGZhbHNlXG4gIH1cblxuICBnZW5lcmF0ZSAoZXZlbnRzKSB7XG4gICAgcmV0dXJuIGZlYXR1cmVUaXRsZSArIHRoaXMuX3BhcnNlRXZlbnRzKGV2ZW50cylcbiAgfVxuXG4gIF9wYXJzZUV2ZW50cyAoZXZlbnRzKSB7XG4gICAgY29uc29sZS5kZWJ1ZyhgZ2VuZXJhdGluZyBjb2RlIGZvciAke2V2ZW50cyA/IGV2ZW50cy5sZW5ndGggOiAwfSBldmVudHNgKVxuICAgIGxldCByZXN1bHQgPSAnJ1xuXG4gICAgaWYgKCFldmVudHMpIHJldHVybiByZXN1bHRcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB7IGFjdGlvbiwgc2VsZWN0b3IsIHZhbHVlLCBocmVmLCBrZXlDb2RlLCB0YWdOYW1lLCBmcmFtZUlkLCBmcmFtZVVybCB9ID0gZXZlbnRzW2ldXG5cbiAgICAgIC8vIHdlIG5lZWQgdG8ga2VlcCBhIGhhbmRsZSBvbiB3aGF0IGZyYW1lcyBldmVudHMgb3JpZ2luYXRlIGZyb21cbiAgICAgIHRoaXMuX3NldEZyYW1lcyhmcmFtZUlkLCBmcmFtZVVybClcbiAgICAgIGNvbnNvbGUubG9nKGFjdGlvbik7XG4gICAgICAgXG4gICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICBjYXNlICdrZXlkb3duJzpcbiAgICAgICAgICBpZiAoa2V5Q29kZSA9PT0gOSkgeyAvLyB0YWIga2V5XG4gICAgICAgICAgICB0aGlzLl9ibG9ja3MucHVzaCh0aGlzLl9oYW5kbGVLZXlEb3duKHNlbGVjdG9yLCB2YWx1ZSwga2V5Q29kZSkpXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICB0aGlzLl9ibG9ja3MucHVzaCh0aGlzLl9oYW5kbGVDbGljayhzZWxlY3RvciwgZXZlbnRzKSlcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdjaGFuZ2UnOlxuICAgICAgICAgIGlmICh0YWdOYW1lID09PSAnU0VMRUNUJykge1xuICAgICAgICAgICAgdGhpcy5fYmxvY2tzLnB1c2godGhpcy5faGFuZGxlQ2hhbmdlKHNlbGVjdG9yLCB2YWx1ZSkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2Jsb2Nrcy5wdXNoKHRoaXMuX2hhbmRsZUNoYW5nZShzZWxlY3RvciwgdmFsdWUpKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgcHB0ckFjdGlvbnMuR09UTzpcbiAgICAgICAgICB0aGlzLl9ibG9ja3MucHVzaCh0aGlzLl9oYW5kbGVHb3RvKGhyZWYsIGZyYW1lSWQpKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgcHB0ckFjdGlvbnMuTkFWSUdBVElPTjpcbiAgICAgICAgICB0aGlzLl9ibG9ja3MucHVzaCh0aGlzLl9oYW5kbGVXYWl0Rm9yTmF2aWdhdGlvbigpKVxuICAgICAgICAgIHRoaXMuX2hhc05hdmlnYXRpb24gPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBwcHRyQWN0aW9ucy5TQ1JFRU5TSE9UOlxuICAgICAgICAgIHRoaXMuX2Jsb2Nrcy5wdXNoKHRoaXMuX2hhbmRsZVNjcmVlbnNob3QodmFsdWUpKVxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGluZGVudCA9IHRoaXMuX29wdGlvbnMud3JhcEFzeW5jID8gJyAgJyA6ICcnXG4gICAgY29uc3QgbmV3TGluZSA9IGBcXG5gXG5cbiAgICBmb3IgKGxldCBibG9jayBvZiB0aGlzLl9ibG9ja3MpIHtcbiAgICAgIGlmICh0eXBlb2YgYmxvY2sgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCBsaW5lcyA9IGJsb2NrLmdldExpbmVzKClcbiAgICAgIGZvciAobGV0IGxpbmUgb2YgbGluZXMpIHtcbiAgICAgICAgcmVzdWx0ICs9IGluZGVudCArIGxpbmUudmFsdWUgKyBuZXdMaW5lXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgX3NldEZyYW1lcyAoZnJhbWVJZCwgZnJhbWVVcmwpIHtcbiAgICBpZiAoZnJhbWVJZCAmJiBmcmFtZUlkICE9PSAwKSB7XG4gICAgICB0aGlzLl9mcmFtZUlkID0gZnJhbWVJZFxuICAgICAgdGhpcy5fZnJhbWUgPSBgZnJhbWVfJHtmcmFtZUlkfWBcbiAgICAgIHRoaXMuX2FsbEZyYW1lc1tmcmFtZUlkXSA9IGZyYW1lVXJsXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZyYW1lSWQgPSAwXG4gICAgICB0aGlzLl9mcmFtZSA9ICdwYWdlJ1xuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVLZXlEb3duIChzZWxlY3RvciwgdmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEJsb2NrKHRoaXMuX2ZyYW1lSWQsIHsgdHlwZTogZG9tRXZlbnRzLkNIQU5HRSwgdmFsdWU6IGBHaXZlbiBJIHR5cGUgJyR7dmFsdWV9JyBpbiBmaWVsZCAnJHtzZWxlY3Rvcn0nYCB9KVxuICB9XG5cbiAgX2hhbmRsZUNsaWNrIChzZWxlY3Rvcikge1xuICAgIGNvbnN0IGJsb2NrID0gbmV3IEJsb2NrKHRoaXMuX2ZyYW1lSWQpXG4gICAgaWYgKHRoaXMuX29wdGlvbnMud2FpdEZvclNlbGVjdG9yT25DbGljaykge1xuICAgICAgYmxvY2suYWRkTGluZSh7IHR5cGU6IGRvbUV2ZW50cy5DTElDSywgdmFsdWU6IGBHaXZlbiBJIGNsaWNrIG9uICcke3NlbGVjdG9yfSdgIH0pXG4gICAgfVxuICAgIHJldHVybiBibG9ja1xuICB9XG4gIF9oYW5kbGVDaGFuZ2UgKHNlbGVjdG9yLCB2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgQmxvY2sodGhpcy5fZnJhbWVJZCwgeyB0eXBlOiBkb21FdmVudHMuQ0hBTkdFLCB2YWx1ZTogYEdpdmVuIEkgdHlwZSAnJHt2YWx1ZX0nIGluIGZpZWxkICcke3NlbGVjdG9yfSdgIH0pXG4gIH1cbiAgX2hhbmRsZUdvdG8gKGhyZWYpIHtcbiAgICByZXR1cm4gbmV3IEJsb2NrKHRoaXMuX2ZyYW1lSWQsIHsgdHlwZTogcHB0ckFjdGlvbnMuR09UTywgdmFsdWU6IGBHaXZlbiBJIGdvIG9uICcke2hyZWZ9J2AgfSlcbiAgfVxuXG4gIF9oYW5kbGVTY3JlZW5zaG90IChvcHRpb25zKSB7XG4gICAgbGV0IGJsb2NrXG4gICAgYmxvY2sgPSBuZXcgQmxvY2sodGhpcy5fZnJhbWVJZCwge1xuICAgICAgICB0eXBlOiBwcHRyQWN0aW9ucy5TQ1JFRU5TSE9ULFxuICAgICAgICB2YWx1ZTogYFRha2UgYSBzY3JlZW5zaG90IGBcbiAgICB9KVxuICAgIHRoaXMuX3NjcmVlbnNob3RDb3VudGVyKytcbiAgICByZXR1cm4gYmxvY2tcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/code-generator/CodeGenerator.js\n");

/***/ })

})