(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.VOffline = factory());
}(this, (function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var ping = createCommonjsModule(function (module, exports) {
	  var Ping = function Ping(opt) {
	    this.opt = opt || {};
	    this.favicon = this.opt.favicon || "/favicon.ico";
	    this.timeout = this.opt.timeout || 0;
	    this.logError = this.opt.logError || false;
	  };

	  Ping.prototype.ping = function (source, callback) {
	    var self = this;
	    self.wasSuccess = false;
	    self.img = new Image();
	    self.img.onload = onload;
	    self.img.onerror = onerror;
	    var timer;
	    var start = new Date();

	    function onload(e) {
	      self.wasSuccess = true;
	      pingCheck.call(self, e);
	    }

	    function onerror(e) {
	      self.wasSuccess = false;
	      pingCheck.call(self, e);
	    }

	    if (self.timeout) {
	      timer = setTimeout(function () {
	        pingCheck.call(self, undefined);
	      }, self.timeout);
	    }

	    function pingCheck() {
	      if (timer) {
	        clearTimeout(timer);
	      }

	      var pong = new Date() - start;

	      if (typeof callback === "function") {
	        if (!this.wasSuccess) {
	          if (self.logError) {
	            console.error("error loading resource");
	          }

	          return callback("error", pong);
	        }

	        return callback(null, pong);
	      }
	    }

	    self.img.src = source + self.favicon + "?" + +new Date();
	  };

	  {
	    if ( module.exports) {
	      module.exports = Ping;
	    }
	  }
	});

	var ping_js = ping;

	var EVENTS = ['online', 'offline', 'load'];
	var script = {
	  name: 'VOffline',
	  props: {
	    slotName: {
	      type: String,
	      required: false,
	      "default": 'online'
	    },
	    onlineClass: {
	      type: String,
	      required: false,
	      "default": ''
	    },
	    offlineClass: {
	      type: String,
	      required: false,
	      "default": ''
	    },
	    pingUrl: {
	      type: String,
	      required: false,
	      "default": 'https://google.com'
	    }
	  },
	  data: function data() {
	    return {
	      isOnline: navigator.onLine || false
	    };
	  },
	  computed: {
	    computedClass: function computedClass() {
	      return this.isOnline ? this.onlineClass : this.offlineClass;
	    }
	  },
	  created: function created() {
	    var _this = this;

	    EVENTS.forEach(function (event) {
	      return window.addEventListener(event, _this.updateOnlineStatus);
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    var _this2 = this;

	    EVENTS.forEach(function (event) {
	      return window.removeEventListener(event, _this2.updateOnlineStatus);
	    });
	  },
	  methods: {
	    updateOnlineStatus: function updateOnlineStatus() {
	      var _this3 = this;

	      var t = this;
	      var p = new ping_js();
	      p.ping(t.pingUrl, function (err) {
	        if (err || !navigator.onLine) {
	          t.isOnline = false;
	          t.$emit('detected-condition', _this3.isOnline);
	        } else {
	          t.isOnline = true;
	          t.$emit('detected-condition', _this3.isOnline);
	        }
	      });
	    }
	  }
	};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	  if (typeof shadowMode !== 'boolean') {
	    createInjectorSSR = createInjector;
	    createInjector = shadowMode;
	    shadowMode = false;
	  }

	  var options = typeof script === 'function' ? script.options : script;

	  if (template && template.render) {
	    options.render = template.render;
	    options.staticRenderFns = template.staticRenderFns;
	    options._compiled = true;

	    if (isFunctionalTemplate) {
	      options.functional = true;
	    }
	  }

	  if (scopeId) {
	    options._scopeId = scopeId;
	  }

	  var hook;

	  if (moduleIdentifier) {
	    hook = function hook(context) {
	      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;

	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__;
	      }

	      if (style) {
	        style.call(this, createInjectorSSR(context));
	      }

	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier);
	      }
	    };

	    options._ssrRegister = hook;
	  } else if (style) {
	    hook = shadowMode ? function (context) {
	      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
	    } : function (context) {
	      style.call(this, createInjector(context));
	    };
	  }

	  if (hook) {
	    if (options.functional) {
	      var originalRender = options.render;

	      options.render = function renderWithStyleInjection(h, context) {
	        hook.call(context);
	        return originalRender(h, context);
	      };
	    } else {
	      var existing = options.beforeCreate;
	      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	    }
	  }

	  return script;
	}

	/* script */
	const __vue_script__ = script;

	/* template */
	var __vue_render__ = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("div", { class: _vm.computedClass }, [_vm._t(_vm.slotName)], 2)
	};
	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;

	  /* style */
	  const __vue_inject_styles__ = undefined;
	  /* scoped */
	  const __vue_scope_id__ = undefined;
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
	  /* functional template */
	  const __vue_is_functional_template__ = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__ = normalizeComponent(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	return __vue_component__;

})));
