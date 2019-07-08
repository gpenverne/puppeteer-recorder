webpackHotUpdate("popup",{

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/popup/components/RecordingTab.vue?vue&type=template&id=d693d01e&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/popup/components/RecordingTab.vue?vue&type=template&id=d693d01e&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { staticClass: \"tab recording-tab\" }, [\n    _c(\"div\", { staticClass: \"content\" }, [\n      _c(\n        \"div\",\n        {\n          directives: [\n            {\n              name: \"show\",\n              rawName: \"v-show\",\n              value: !_vm.isRecording,\n              expression: \"!isRecording\"\n            }\n          ],\n          staticClass: \"empty\"\n        },\n        [\n          _c(\"img\", {\n            attrs: { src: \"/images/Desert.svg\", alt: \"desert\", width: \"78px\" }\n          }),\n          _vm._v(\" \"),\n          _c(\"h3\", [_vm._v(\"No recorded events yet\")]),\n          _vm._v(\" \"),\n          _c(\"p\", { staticClass: \"text-muted\" }, [\n            _vm._v(\"Click record to begin\")\n          ]),\n          _vm._v(\" \"),\n          _c(\n            \"div\",\n            {\n              directives: [\n                {\n                  name: \"show\",\n                  rawName: \"v-show\",\n                  value: !_vm.isRecording,\n                  expression: \"!isRecording\"\n                }\n              ],\n              staticClass: \"nag-cta\"\n            },\n            [\n              _c(\n                \"a\",\n                {\n                  attrs: {\n                    href: \"https://staging.gensdeconfiance.fr\",\n                    target: \"_blank\"\n                  }\n                },\n                [_vm._v(\"⚡️ Go to staging! →\")]\n              )\n            ]\n          )\n        ]\n      ),\n      _vm._v(\" \"),\n      _c(\n        \"div\",\n        {\n          directives: [\n            {\n              name: \"show\",\n              rawName: \"v-show\",\n              value: _vm.isRecording,\n              expression: \"isRecording\"\n            }\n          ],\n          staticClass: \"events\"\n        },\n        [\n          _c(\n            \"p\",\n            {\n              directives: [\n                {\n                  name: \"show\",\n                  rawName: \"v-show\",\n                  value: _vm.liveEvents.length === 0,\n                  expression: \"liveEvents.length === 0\"\n                }\n              ],\n              staticClass: \"text-muted text-center loading\"\n            },\n            [_vm._v(\"Waiting for events\")]\n          ),\n          _vm._v(\" \"),\n          _c(\n            \"ul\",\n            { staticClass: \"event-list\" },\n            _vm._l(_vm.liveEvents, function(event, index) {\n              return _c(\"li\", { key: index, staticClass: \"event-list-item\" }, [\n                _c(\"div\", { staticClass: \"event-label\" }, [\n                  _vm._v(\"\\n            \" + _vm._s(index + 1) + \".\\n          \")\n                ]),\n                _vm._v(\" \"),\n                _c(\"div\", { staticClass: \"event-description\" }, [\n                  _c(\"div\", { staticClass: \"event-action\" }, [\n                    _vm._v(_vm._s(event.action))\n                  ]),\n                  _vm._v(\" \"),\n                  _c(\"div\", { staticClass: \"event-props text-muted\" }, [\n                    _vm._v(_vm._s(event.selector || _vm.parseEventValue(event)))\n                  ])\n                ])\n              ])\n            })\n          )\n        ]\n      )\n    ])\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcG9wdXAvY29tcG9uZW50cy9SZWNvcmRpbmdUYWIudnVlPzM4ZWQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1DQUFtQztBQUN2RCxlQUFlLHlCQUF5QjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDRCQUE0QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSw0QkFBNEI7QUFDekM7QUFDQSwrQkFBK0IsNkNBQTZDO0FBQzVFLDJCQUEyQiw2QkFBNkI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLG1DQUFtQztBQUM5RCw2QkFBNkIsOEJBQThCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix3Q0FBd0M7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8hLi9zcmMvcG9wdXAvY29tcG9uZW50cy9SZWNvcmRpbmdUYWIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWQ2OTNkMDFlJnNjb3BlZD10cnVlJi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJ0YWIgcmVjb3JkaW5nLXRhYlwiIH0sIFtcbiAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbnRlbnRcIiB9LCBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJzaG93XCIsXG4gICAgICAgICAgICAgIHJhd05hbWU6IFwidi1zaG93XCIsXG4gICAgICAgICAgICAgIHZhbHVlOiAhX3ZtLmlzUmVjb3JkaW5nLFxuICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIiFpc1JlY29yZGluZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJlbXB0eVwiXG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICBhdHRyczogeyBzcmM6IFwiL2ltYWdlcy9EZXNlcnQuc3ZnXCIsIGFsdDogXCJkZXNlcnRcIiwgd2lkdGg6IFwiNzhweFwiIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiaDNcIiwgW192bS5fdihcIk5vIHJlY29yZGVkIGV2ZW50cyB5ZXRcIildKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcInRleHQtbXV0ZWRcIiB9LCBbXG4gICAgICAgICAgICBfdm0uX3YoXCJDbGljayByZWNvcmQgdG8gYmVnaW5cIilcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXNob3dcIixcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiAhX3ZtLmlzUmVjb3JkaW5nLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIhaXNSZWNvcmRpbmdcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmFnLWN0YVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcImFcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBocmVmOiBcImh0dHBzOi8vc3RhZ2luZy5nZW5zZGVjb25maWFuY2UuZnJcIixcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBcIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwi4pqh77iPIEdvIHRvIHN0YWdpbmchIOKGklwiKV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIClcbiAgICAgICAgXVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJzaG93XCIsXG4gICAgICAgICAgICAgIHJhd05hbWU6IFwidi1zaG93XCIsXG4gICAgICAgICAgICAgIHZhbHVlOiBfdm0uaXNSZWNvcmRpbmcsXG4gICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiaXNSZWNvcmRpbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZXZlbnRzXCJcbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJwXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcInNob3dcIixcbiAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1zaG93XCIsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmxpdmVFdmVudHMubGVuZ3RoID09PSAwLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJsaXZlRXZlbnRzLmxlbmd0aCA9PT0gMFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0ZXh0LW11dGVkIHRleHQtY2VudGVyIGxvYWRpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCJXYWl0aW5nIGZvciBldmVudHNcIildXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ1bFwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJldmVudC1saXN0XCIgfSxcbiAgICAgICAgICAgIF92bS5fbChfdm0ubGl2ZUV2ZW50cywgZnVuY3Rpb24oZXZlbnQsIGluZGV4KSB7XG4gICAgICAgICAgICAgIHJldHVybiBfYyhcImxpXCIsIHsga2V5OiBpbmRleCwgc3RhdGljQ2xhc3M6IFwiZXZlbnQtbGlzdC1pdGVtXCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZXZlbnQtbGFiZWxcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCJcXG4gICAgICAgICAgICBcIiArIF92bS5fcyhpbmRleCArIDEpICsgXCIuXFxuICAgICAgICAgIFwiKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJldmVudC1kZXNjcmlwdGlvblwiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZXZlbnQtYWN0aW9uXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKGV2ZW50LmFjdGlvbikpXG4gICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImV2ZW50LXByb3BzIHRleHQtbXV0ZWRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoZXZlbnQuc2VsZWN0b3IgfHwgX3ZtLnBhcnNlRXZlbnRWYWx1ZShldmVudCkpKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIF1cbiAgICAgIClcbiAgICBdKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/popup/components/RecordingTab.vue?vue&type=template&id=d693d01e&scoped=true&\n");

/***/ })

})