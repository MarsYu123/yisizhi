"use strict";

function _instanceof4(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _instanceof3(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return _instanceof4(left, right);
  }
}

function _instanceof2(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return _instanceof3(left, right);
  }
}

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return _instanceof2(left, right);
  }
}

if (typeof Object.assign != "function") {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2
      "use strict";

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError("Cannot convert undefined or null to object");
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    },
    writable: true,
    configurable: true
  });
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === "[object Arguments]"
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // import video from 'video.min.js'

/* 


JSON 文件介绍
[ // 一级菜单列表
  {
    title: "Power Train",  // 一级菜单名称
    img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584265295579&di=3512890e36a2ea1b8ee46583757218b6&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F5312bbd31eb278818052ffab9f2e113672454704.png",  // 一级菜单图片
    list: [  // 二级菜单列表
      {
        title: "Vertiv Liebert APM160三合一智能电力模组",  // 二级菜单名称
        content: "",   // 二级菜单描述& 三级菜单简介
        img: "", // 二级菜单图片
        detail: { // 三级菜单
          trait:  // 三级菜单优势
            "输入配电、UPS、输出精密配电一体化智慧融合, 节省系统67%占地和施工工时。<br>全功率链路统一管理，不错过任何关键节点<br>输入、输出布线分区独立，避免交叉走线带来的安全隐患；<br>UPS 功率模块输出采用独创的母排并联技术，系统均流度好，可靠性高；<br>增强型安规防护设计及严苛的湿尘环境测试，提升产品可靠性；",
          scope: "中、小企业数据机房<br>微模块数据中心<br>分布式数据中心",  // 三级菜单范围
          tmt: "电信<br>金融<br>政府<br>企业<br>交通<br>教育<br>医疗<br>制造业", // 三级菜单行业
          about: [  // 三级菜单相关视频
            "https://www.w3school.com.cn/i/movie.ogg",
            "http://vjs.zencdn.net/v/oceans.mp4"
          ],
          video: '', //三级主视频
          file: [  // 三级菜单文件
            {
              title: '',  // 三级菜单文件名
              url: ''  //三级菜单文件名地址
            }
          ]
        }
      }
    ]
  }
];

*/

var apiHost = "https://events-uat.issmart.com.cn/isdm_sys_module";
var WlHost = "https://php-api2.issmart.com.cn/applets/index.php";

function $http(url, type, data, ayanc) {
  var ayanc = ayanc || true;
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: apiHost + url,
      type: type,
      ayanc: ayanc,
      cache: false,
      dataType: "json",
      contentType: "application/json;charset=UTF-8",
      data: type === "post" ? JSON.stringify(data) : data,
      success: function success(res) {
        resolve(res);
      }
    });
  });
}

function $wlHttp(url, data) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: WlHost + url,
      type: "post",
      data: data,
      dataType: "json",
      success: function success(res) {
        resolve(res);
      }
    });
  });
}

$(function() {
  Vue.component("publis_login", {
    data: function data() {
      return {
        loginType: "login",
        type: "phone",
        phone: null,
        email: null,
        code: null,
        emailError: "请填写邮箱",
        phoneError: "请填写手机号码",
        submitError: "",
        inputError: false,
        lock: false,
        time: 60,
        timeFn: null,
        loginVerif: false,
        sign_name: null,
        sign_phone: null,
        sign_code: null,
        sign_email: null,
        sign_company: null,
        sign_position: null,
        sign_city: null,
        checkSignActive: false,
        signPhoneError: false,
        getVerif: true
      };
    },
    watch: {
      phone: function phone(val) {
        this.inputError = false;
        var phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

        if (!val) {
          this.phoneError = "请填写手机号码";
          return;
        }

        if (!phoneReg.test(val)) {
          this.phoneError = "手机号码格式错误";
          return;
        }

        this.phoneError = "";
      },
      email: function email(val) {
        this.inputError = false;
        var myreg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

        if (!val) {
          this.emailError = "请填写邮箱";
          return;
        }

        if (!myreg.test(val)) {
          this.emailError = "邮箱格式错误";
          return;
        }

        this.emailError = "";
      },
      code: function code(val) {
        this.code = val.slice(0, 6);
      },
      sign_phone: function sign_phone(val) {
        var phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        this.signPhoneError = phoneReg.test(val)
        this.getVerif = false
      },
      sign_code: function sign_code(val) {
        this.sign_code = val.slice(0, 6);
        this.getVerif = false
      }
    },
    computed: {
      isSign: function isSign() {
        if(!this.sign_name) return false
        if(!this.signPhoneError) return false
        if(!this.sign_code) return false
        if(!this.sign_email) return false
        if(!this.sign_company) return false
        if(!this.sign_position) return false
        if(!this.sign_city) return false
        if(!this.loginVerif) return false
        if(!this.checkSignActive) return false
        return true
      }
    },
    mounted: function() {
    },
    methods: {
      checkSign: function checkSign() {
        this.checkSignActive = !this.checkSignActive
      },
      getLoginId: function getLoginId() {
        var that = this
        if(that.lock) return
        that.settime();
        if(!that.signPhoneError) return
        $http("/live/app/getMSVerifyCode", "post", {
          eventId: 536,
          phone: that.sign_phone
        })
      },
      getLoginVerif: function getLoginVerif() {
        var that = this
        if(that.getVerif) return
        if(!that.signPhoneError) return
        if(!that.sign_code || that.sign_code.length !== 6) return
        $http("/attendees/getRegisterState", "post", {
          eventId: "536",
          phone: that.sign_phone,
          code: that.sign_code
        }).then(function (res) {
          that.getVerif = true
          if(!res.meta.success){
            that.loginVerif = false
            alert(res.meta.message)
          }else{
            if(res.data.ifRegister == 'yes'){
              that.loginVerif = true
            }
          }
        });
      },
      signIn: function signIn() {
        var that = this
        if(!that.isSign) return
        var data = {
          "memberName": that.sign_name,
          "memberPhone": that.sign_phone,
          "memberEmail": that.sign_email,
          "positionCode": that.sign_position,
          "province": that.sign_city,
          "companyName": that.sign_company,
          "eventId": "536",
          "formId": "1175"
        }
        $http("/attendees/registerPc", "post", data).then(function (res) {
          if(res.meta.success){
            if(res.data.msg == '报名成功'){
              that.loginType = 'success'
            }
          }else{
            alert(res.meta.message)
          }
        });
      },
      settime: function settime() {
        this.lock = true;
        var that = this;
        var s = that.time;
        out();

        function out() {
          that.timeFn = setTimeout(function() {
            that.time--;
            if (that.time > 0) {
              out();
            } else {
              clearTimeout(that.timeFn);
              that.lock = false;
              that.time = s;
            }
          }, 1000);
        }
      },
      toggle: function toggle(active) {
        if (this.type === active) return;
        clearTimeout(this.timeFn);
        this.lock = false;
        this.time = 60;
        this.inputError = false;
        this.type = active;
        this.phone = null;
        this.email = null;
        this.code = null;
      },
      getCode: function getCode() {
        if (this.lock) return;

        if (this.type === "email") {
          if (this.emailError) {
            this.inputError = true;
            return;
          } else {
            this.getEmailCode(this.email);
          }
        }

        if (this.type === "phone") {
          if (this.phoneError) {
            this.inputError = true;
            return;
          } else {
            this.getPhoneCode(this.phone);
          }
        }

        this.inputError = false;
      },
      getEmailCode: function getEmailCode(email) {
        var data = {
          email: email
        };
        var that = this;
        $http("/live/app/sendEmailVerifyCode", "post", data, false).then(
          function(res) {
            if (res.meta.success) {
              that.settime();
            } else {
              alert(res.meta.message);
            }
          }
        );
      },
      getPhoneCode: function getPhoneCode(phone) {
        var data = {
          eventId: "537",
          phone: phone
        };
        var that = this;
        $http("/live/app/getMSVerifyCode", "post", data, false).then(function(
          res
        ) {
          if (res.meta.success) {
            that.settime();
          } else {
            alert(res.meta.message);
          }
        });
      },
      submit: function submit() {
        if (this.type === "email") {
          if (this.emailError) {
            this.inputError = true;
            return;
          }
        }

        if (this.type === "phone") {
          if (this.phoneError) {
            this.inputError = true;
            return;
          }
        }

        if (!this.code) {
          this.submitError = "请输入验证码";
          return;
        }

        var data = {
          email: this.email,
          phone: this.phone,
          code: this.code,
          eventId: "536"
        };
        this.$emit("submit", data);
      },
      blur: function blur() {
        window.scroll(0, 0);
      },
      checkLogin: function checkLogin(type) {
        Object.assign(this.$data,this.$options.data())
        this.loginType = type
      }
    },
    template: "<div class=\"public_login\">\n    <div class=\"login_mb\"></div>\n    <div class=\"login_box\" :class=\"loginType\">\n      <div class=\"login_cont\" :class=\"loginType\">\n        <div>\n          <div class=\"login_clear\" @click=\"$emit('clear')\"></div>\n          <i class=\"ball\"></i>\n          <template v-if='loginType === \"login\"'>\n            <div class=\"login_title\">\n              <div class=\"login_check\" :class=\"{active: type === 'phone'}\" @click=\"toggle('phone')\">\n                \u624B\u673A\u767B\u5F55\n              </div>\n              <div class=\"login_check\" :class=\"{active: type === 'email'}\" @click=\"toggle('email')\">\n                \u90AE\u7BB1\u767B\u5F55\n              </div>\n            </div>\n            <div class=\"login_form\">\n              <div class=\"userName form_input\">\n                <input type=\"text\" placeholder=\"\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801\" @blur=\"blur\" v-model=\"phone\" v-if=\"type === 'phone'\">\n                <input type=\"text\" placeholder=\"\u8BF7\u8F93\u5165\u90AE\u7BB1\u53F7\u7801\" @blur=\"blur\" v-model=\"email\" v-if=\"type === 'email'\">\n              </div>\n              <div class=\"error\" v-if=\"inputError\">{{type==='email'?emailError:phoneError}}</div>\n              <div class=\"code form_input\">\n                <input type=\"text\" placeholder=\"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801\" @blur=\"blur\" v-model=\"code\">\n                <div class=\"getCode\" :class=\"{active:!lock}\" @click=\"getCode\">\n                  {{lock?'('+time+') s \u540E\u91CD\u65B0\u83B7\u53D6':'\u83B7\u53D6\u9A8C\u8BC1\u7801'}}\n                </div>\n              </div>\n              <div class=\"error\" v-if=\"submitError\">{{submitError}}</div>\n              <a class=\"login_toSign\" @click=\"checkLogin('sign')\">\n                \u62A5\u540D\u6CE8\u518C >\n              </a>\n            </div>\n            <div class=\"login_submit\" @click=\"submit\"></div>\n          </template>\n\n          <template v-if='loginType === \"sign\" '>\n            <div class=\"login_title login_check active\">\n              \u6CE8\u518C\n            </div>\n            <div class=\"sign_form\">\n              <div class=\"input\">\n                <div class=\"head\">\n                  \u59D3\u540D\uFF1A\n                </div>\n                <div class=\"cont\">\n                  <input type=\"text\" v-model=\"sign_name\">\n                </div>\n              </div>\n              <div class=\"input\">\n                <div class=\"head\">\n                  \u624B\u673A\u53F7\uFF1A\n                </div>\n                <div class=\"cont\">\n                  <input type=\"text\" v-model=\"sign_phone\" @blur=\"getLoginVerif\">\n                  <div class=\"verify\" :class=\"{active:(signPhoneError&&!lock)}\" @click=\"getLoginId\">\n                    {{lock?'('+time+') s \u540E\u91CD\u65B0\u83B7\u53D6':'\u53D1\u9001\u9A8C\u8BC1\u7801'}}\n                  </div>\n                </div>\n              </div>\n              <div class=\"input\">\n                <div class=\"head\">\n                  \u9A8C\u8BC1\u7801\uFF1A\n                </div>\n                <div class=\"cont\">\n                  <input type=\"text\" v-model=\"sign_code\" @blur=\"getLoginVerif\">\n                </div>\n              </div>\n              <div class=\"input\">\n                <div class=\"head\">\n                  \u90AE\u7BB1\uFF1A\n                </div>\n                <div class=\"cont\">\n                  <input type=\"text\" v-model=\"sign_email\" @blur=\"getLoginVerif\">\n                </div>\n              </div>\n              <div class=\"input\">\n                <div class=\"head\">\n                  \u516C\u53F8\u540D\uFF1A\n                </div>\n                <div class=\"cont\">\n                  <input type=\"text\" v-model=\"sign_company\" @blur=\"getLoginVerif\">\n                </div>\n              </div>\n              <div class=\"input\">\n                <div class=\"head\">\n                  \u804C\u4F4D\uFF1A\n                </div>\n                <div class=\"cont\">\n                  <input type=\"text\" v-model=\"sign_position\" @blur=\"getLoginVerif\">\n                </div>\n              </div>\n              <div class=\"input\" style=\"margin-bottom:.1rem\">\n                <div class=\"head\">\n                  \u7701\u4EFD\uFF1A\n                </div>\n                <div class=\"cont\">\n                  <input type=\"text\" v-model=\"sign_city\" @blur=\"getLoginVerif\">\n                </div>\n              </div>\n              <div class=\"check\">\n                <div @click=\"checkSign\">\n                  <i :class=\"{active:checkSignActive}\"></i>\n                  \u6211\u613F\u610F\u63A5\u53D7\u7EF4\u8C1B\u6280\u672F\uFF08Vertiv\uFF09\u53CA\u5176\u6388\u6743\u7684\u5408\u4F5C\u4F19\u4F34\u4E3A\u6211\u53D1\u9001\u7EF4\u8C1B\u6280\u672F\uFF08Vertiv\uFF09\u4EA7\u54C1\u3001\u89E3\u51B3\u65B9\u6848\u6216\u670D\u52A1\u7684\u76F8\u5173\u4FE1\u606F\u3002\u6211\u77E5\u9053\u968F\u65F6\u53EF\u4EE5\u53D6\u6D88\u8BA2\u9605\u3002\n                </div>\n                <span>*</span>\u70B9\u51FB\u201C\u63D0\u4EA4\u201D\uFF0C\u8868\u660E\u6211\u7406\u89E3\u5E76\u540C\u610F\u6309\u7167\u7EF4\u8C1B\u6280\u672F(Vertiv) <a href=\"\">\u9690\u79C1\u4FDD\u62A4</a>\u548C<a href=\"\">\u6CD5\u5F8B\u58F0\u660E</a>\u4F7F\u7528\u548C\u4F20\u9012\u6211\u7684\u4E2A\u4EBA\u4FE1\u606F\u3002\n              </div>\n              <div class=\"toLogin\" @click=\"checkLogin('login')\">\n                \u5DF2\u6709\u8D26\u53F7\uFF0C<span>\u9A6C\u4E0A\u767B\u9646</span>\n              </div>\n            </div>\n            <div class=\"sign_submit\" :class=\"{active:isSign}\" @click=\"signIn\">\n              \u63D0\u4EA4\n            </div>\n          </template>\n\n          <template v-if='loginType === \"success\"'>\n            <div class=\"login_title\">\n              <div class=\"login_check\" @click=\"checkLogin('login')\">\n                \u767B\u5F55\n              </div>\n              <div class=\"login_check active\">\n                \u6CE8\u518C\n              </div>\n            </div>\n            <img src=\"./img/sign_success.png\" alt=\"\" class=\"success_img\">\n            <div class=\"h1\">\n              \u60A8\u7684\u62A5\u540D\u4FE1\u606F\u5DF2\u63D0\u4EA4\u7ED9\u5DE5\u4F5C\u4EBA\u5458\u5BA1\u6838\n            </div>\n            <div class=\"tips\">\n              \u5BA1\u6838\u7ED3\u679C\u5C06\u4F1A\u901A\u8FC7\u77ED\u4FE1\uFF0C<br>\u90AE\u4EF6\u7B49\u65B9\u5F0F\u901A\u77E5\uFF0C\u8BF7\u60A8\u8010\u5FC3\u7B49\u5F85\n            </div>\n          </template>\n        </div>\n      </div>\n    </div>\n  </div>"
  });
  var app = new Vue({
    el: "#app",
    // component: {}
    data: function data() {
      var _ref;

      return (
        (_ref = {
          isPlay: false,
          isPc: false,
          uid: null,
          openOnline: true,
          // 是否开启线上展会
          openAgenda: true,
          // 是否开启大会议程
          openReYery: true,
          // 是否开启精彩瞬间
          nav: [
            {
              name: "首页"
            },
            {
              name: "大会介绍"
            },
            {
              name: "线上展厅",
              active: true
            },
            {
              name: "大会议程"
            },
            {
              name: "精彩瞬间"
            },
            {
              name: "往届回顾"
            }
          ],
          isOpenNav: false,
          listIndex: 0,
          detailIndex: 0,
          page: "",
          token: "",
          member: {},
          showLogin: false,
          isLogin: false,
          isCheck: false,
          code: "",
          isPoll: false,
          // 验证码
          cacheListActive: 0
        }),
        _defineProperty(_ref, "page", "one"),
        _defineProperty(_ref, "onlineList", []),
        _defineProperty(_ref, "activeList", {}),
        _defineProperty(_ref, "isOpenVideo", false),
        _defineProperty(_ref, "openVideoSrc", ""),
        _defineProperty(_ref, "mainVideo", null),
        _defineProperty(_ref, "viceVideo", null),
        _ref
      );
    },
    computed: {
      filtrNav: function filtrNav() {
        if (!this.openReYery) {
          this.nav.splice(4, 1);
        }

        return "";
      }
    },
    created: function created() {
      var pageName = this.pageName();
      this.isPc = IsPC();
      this.filtrNav;
      if (location.protocol == "https:") {
        window.location =
          "http://" + location.host + location.pathname + location.search;
      }
      try {
        if (!IsPC() && pageName.indexOf("mobile") === -1) {
          window.location = "mobile_" + pageName + ".html" + location.search;
        }

        window.οnresize = function() {
          if (!IsPC() && pageName.indexOf("mobile") === -1) {
            window.location = "mobile_" + pageName + ".html" + location.search;
          }
        };
      } catch (err) {}

      var that = this;
      $(document).click(function(e) {
        var e = e || window.event;
        var elem = e.target || e.srcElement;

        while (elem) {
          if (
            (elem.id && elem.id == "nav-list") ||
            (elem.id && elem.id == "icon")
          ) {
            return;
          }

          elem = elem.parentNode;
        }

        that.isOpenNav = false;
      });
    },
    mounted: function mounted() {
      var that = this;
      that.listIndex = that.getQueryVariable("homeIndex");
      that.page = that.getQueryVariable("type");
      that.detailIndex = that.getQueryVariable("listIndex");

      if (that.getQueryVariable("isTest") == "true") {
        that.isLogin = true;
      }

      if (that.getQueryVariable("clear") == "true") {
        localStorage.clear();
      }

      var pageName = that.pageName();

      if (
        (pageName === "online_list" && !that.listIndex) ||
        (pageName === "online_detail" && !that.detailIndex)
      ) {
        location.replace("./online.html");
        return "";
      }

      if (
        (pageName === "mobile_online_list" && !that.listIndex) ||
        (pageName === "mobile_online_detail" && !that.detailIndex)
      ) {
        location.replace("./mobile_online.html");
        return "";
      }

      if (pageName.indexOf("online") !== -1) {
        if (
          sessionStorage.listActive &&
          pageName.indexOf("online_list") !== -1
        ) {
          that.cacheListActive = sessionStorage.listActive;
          sessionStorage.removeItem("listActive");
        }
      } else {
        sessionStorage.removeItem("listActive");
      }
      that.getOnlineData();
      that.autoLogin();
    },
    watch: {
      isLogin: function(val) {
        if (val && !this.isPoll) {
          this.pollLogin();
        }
      }
    },
    methods: {
      getViewRecord: function getViewRecord() {
        var that = this;
        $wlHttp("/Exhibition/Api/getRecord", { uid: this.uid }).then(function(
          res
        ) {
          if (res.code == "200") {
            sessionStorage.setItem("pageActive", res.message);
            that.activeList = Object.assign(
              {},
              that.activeList,
              JSON.parse(res.message)
            );
          }
        });
      },
      setViewRecord: function setViewRecord(record) {
        var data = {
          uid: this.uid,
          record: JSON.stringify(record)
        };
        $wlHttp("/Exhibition/Api/record", data);
      },
      login: function login(data) {
        var _this = this;

        $http("/live/chatRoom/login", "post", data).then(function(res) {
          if (res.meta.success) {
            _this.token = res.data.token;
            _this.member = Object.assign({}, _this.member, res.data.member);
            _this.pollLogin();
            _this.isLogin = true;
            _this.showLogin = false;
            sessionStorage.setItem("token", _this.token);
            _this.getUid();
          } else {
            alert(res.meta.message);
          }
          _this.isCheck = true;
        });
      },
      autoLogin: function autoLogin() {
        var that = this;
        that.token = sessionStorage.getItem("token");
        var data = {
          token: that.token
        };
        if (!that.token) {
          if (that.page) {
            location.replace("index.html");
          }
          that.isCheck = true;
          return;
        }
        $http("/live/chatRoom/checkToken", "get", data).then(function(res) {
          if (res.meta.success) {
            that.member = Object.assign({}, that.member, res.data.member);
            that.isLogin = true;
            that.showLogin = false;
            if (!that.uid) {
              that.getUid();
            }
          } else {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("pageActive");
            if (res.meta.message === "token被移除") {
              alert("你的账号当前正在其他设备登录");
            }
            location.replace("index.html");
          }
          that.isCheck = true;
        });
      },
      pollLogin: function pollLogin() {
        var that = this;
        that.isPoll = true;
        setInterval(function() {
          that.autoLogin();
        }, 5000);
      },
      getUid: function getUid() {
        var that = this;
        var data = {
          memberid: that.member.memberId,
          membername: that.member.memberName,
          companyname: that.member.companyName,
          province: that.member.province,
          companyrelationcode: "",
          email: that.member.email,
          phone: that.member.phone
        };
        $.ajax({
          url:
            "https://php-api2.issmart.com.cn/applets/index.php/Exhibition/Api/getUser",
          type: "post",
          data: data,
          dataType: "json",
          success: function success(res) {
            if (+res.code === 200) {
              that.uid = +res.message;
              KeFu.initialize(
                "php-api2.issmart.com.cn",
                "index",
                that.member.memberId
              );
              that.getViewRecord();
              if (that.page === "detail") {
                that.setViewRecord(
                  JSON.parse(sessionStorage.getItem("pageActive"))
                );
              }
              that.setOpenTime().then(function() {
                that.pollng();
              });
            }
          }
        });
      },
      setOpenTime: function setOpenTime() {
        var that = this;
        return new Promise(function(resolve) {
          $wlHttp("/Exhibition/Api/onlineTimeSignIn", {
            uid: that.uid,
            intime: parseInt(new Date().getTime() / 1000)
          }).then(function() {
            resolve();
          });
        });
      },
      setOutTime: function setOutTime() {
        var that = this;
        return new Promise(function(resolve) {
          $wlHttp("/Exhibition/Api/onlineTimeSignOut", {
            uid: that.uid,
            outtime: parseInt(new Date().getTime() / 1000)
          }).then(function() {
            resolve();
          });
        });
      },
      pollng: function pollng() {
        var that = this;
        timeFn();

        function timeFn() {
          setTimeout(function() {
            that.setOutTime().then(function() {
              that.setOpenTime().then(function() {
                timeFn();
              });
            });
          }, 1000 * 60);
        }
      },
      getOnlineData: function getOnlineData() {
        var that = this;
        var pageName = this.pageName();
        $.ajax({
          url: "onlineData.json",
          type: "get",
          dataType: "json",
          success: function success(res) {
            var _that$onlineList;

            (_that$onlineList = that.onlineList).push.apply(
              _that$onlineList,
              _toConsumableArray(res)
            );

            var active = [];
            res.forEach(function(e, index) {
              active["home_" + index] = [];
            });
            if (JSON.stringify(that.activeList) == "{}") {
              that.activeList = Object.assign({}, that.activeList, active);
            }
            that.$nextTick(function() {
              if (
                that.page === "detail" &&
                that.onlineList[that.listIndex].list[that.detailIndex].detail
                  .video
              ) {
                that.mainVideo = videojs(
                  "example_video_1",
                  {
                    controls: true,
                    loop: true,
                    preload: "auto",
                    poster: ""
                  },
                  function onPlayerReady() {
                    this.on("play", function() {
                      if (!that.isLogin) return;
                      that.setNote(
                        that.onlineList[that.listIndex].list[that.detailIndex]
                          .note + "视频"
                      );
                    });
                  }
                );
              }
              if (navigator.userAgent.indexOf("UCBrowser")) {
                if (that.pageName() === "mobile") {
                  var time = setInterval(function() {
                    if (that.isLogin) {
                      if (JSON.stringify(that.activeList) != "{}") {
                        that.getViewRecord();
                      }
                    }
                  }, 2500);
                }
              }

              if (pageName === "mobile_online_list") {
                new Swiper("#listSwiper", {
                  slidesPerView: 1,
                  centeredSlides: true,
                  centeredSlidesBounds: true,
                  centerInsufficientSlides: true,
                  spaceBetween: that.rem2px(-2.5),
                  slidesOffsetBefore: that.rem2px(1.56),
                  initialSlide: that.cacheListActive,
                  nested: true
                });
              }

              if (pageName === "online_list") {
                if (that.onlineList[that.listIndex].list.length > 3) {
                  new Swiper(".swiper-container", {
                    slidesPerView: 3,
                    centeredSlidesBounds: true,
                    centerInsufficientSlides: true,
                    spaceBetween: 30,
                    initialSlide: that.cacheListActive,
                    nested: true,
                    autoHeight: true,
                    navigation: {
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev"
                    }
                  });
                }
              }
            });
          }
        });
      },
      openNav: function openNav() {
        this.isOpenNav = !this.isOpenNav;
      },
      rem2px: function rem2px(num) {
        return num * 100 * ($(window).width() / 750);
      },
      getQueryVariable: function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split("=");

          if (pair[0] == variable) {
            return pair[1];
          }
        }

        return false;
      },
      toPlay: function toPlay() {
        if (!this.isPlay) return;
        if (!this.isLogin) {
          this.showLogin = true;
        } else {
          location.href =
            "https://2020vpac.vertiv.co/vertiv_live/537/a4d8b50d/live.html";
        }
      },
      toHome: function toHome(index) {
        sessionStorage.setItem("toHome", index);
        location.replace("./index.html");
      },
      toList: function toList(i, index) {
        var params = !this.isPc ? "mobile_" : "";

        if (!this.isLogin) {
          this.showLogin = true;
          return;
        }

        this.setNote(this.onlineList[index].note);
        sessionStorage.setItem("toHome", 2);
        location.href =
          "./" + params + "online_list.html?homeIndex=" + index + "&type=list";
      },
      toDetail: function toDetail(i, index) {
        var _this2 = this;

        var arr = JSON.parse(JSON.stringify(this.activeList));
        var params = !this.isPc ? "mobile_" : "";
        this.setNote(this.onlineList[this.listIndex].list[index].note);
        sessionStorage.listActive = index;
        location.href =
          "./" +
          params +
          "online_detail.html?homeIndex=" +
          this.listIndex +
          "&listIndex=" +
          index +
          "&type=detail";
        if (arr["home_" + this.listIndex].indexOf(index) !== -1) return;
        arr["home_" + this.listIndex].push(index);
        sessionStorage.setItem("pageActive", JSON.stringify(arr));
        setTimeout(function() {
          _this2.activeList = Object.assign({}, _this2.activeList, arr);
        }, 500);
      },
      pageName: function pageName() {
        var a = location.href;
        var b = a.split("/");
        var c = b
          .slice(b.length - 1, b.length)
          .toString(String)
          .split(".");
        return c.slice(0, 1).join();
      },
      openVideo: function openVideo(i) {
        this.mainVideo.pause();
        this.isOpenVideo = true;
        this.openVideoSrc = i;
        var that = this;
        this.$nextTick(function() {
          that.viceVideo = videojs("aboutVideo", {
            controls: true,
            loop: true,
            preload: "auto"
          });
        });
      },
      closeVideo: function closeVideo() {
        this.isOpenVideo = false;
        this.openVideoSrc = "";
        this.viceVideo.dispose();
        this.viceVideo = null;
      },
      openFile: function openFile() {
        if (!this.isLogin) return;
        this.setNote(
          this.onlineList[this.listIndex].list[this.detailIndex].note + "彩页"
        );
      },
      setNote: function setNote(note) {
        $wlHttp("/Exhibition/Api/setNode", {
          uid: this.uid,
          node: note
        });
      }
    }
  });
});
