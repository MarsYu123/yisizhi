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
        loginType: 'login',
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
        timeFn: null
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
      }
    },
    mounted: function () {
      this.getLoginId()
    },
    methods: {
      getLoginId: function getLoginId (phone) {
        $http('/live/app/getMSVerifyCode','post',{eventId: 536,phone:phone}).then(function (res) {
          console.log(res)
        })
      },
      getLoginVerif: function getLoginVerif(phone,code) {
        $http('/attendees/getRegisterState','post',{eventId: 536,phone:phone,code:code})
      },
      signIn: function signIn(params) {
        $http('/attendees/registerPc','post',data)
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
      }
    },
    template:`     <div class="public_login">
    <div class="login_mb"></div>
    <div class="login_box" :class="loginType">
      <div class="login_cont" :class="loginType">
        <div>
          <div class="login_clear" @click="$emit('clear')"></div>
          <i class="ball"></i>
          <template v-if='loginType === "login"'>
            <div class="login_title">
              <div class="login_check" :class="{active: type === 'phone'}" @click="toggle('phone')">
                手机登录
              </div>
              <div class="login_check" :class="{active: type === 'email'}" @click="toggle('email')">
                邮箱登录
              </div>
            </div>
            <div class="login_form">
              <div class="userName form_input">
                <input type="text" placeholder="请输入手机号码" @blur="blur" v-model="phone" v-if="type === 'phone'">
                <input type="text" placeholder="请输入邮箱号码" @blur="blur" v-model="email" v-if="type === 'email'">
              </div>
              <div class="error" v-if="inputError">{{type==='email'?emailError:phoneError}}</div>
              <div class="code form_input">
                <input type="text" placeholder="请输入验证码" @blur="blur" v-model="code">
                <div class="getCode" :class="{active:!lock}" @click="getCode">
                  {{lock?'('+time+') s 后重新获取':'获取验证码'}}
                </div>
              </div>
              <div class="error" v-if="submitError">{{submitError}}</div>
              <a class="login_toSign">
                报名注册 >
              </a>
            </div>
            <div class="login_submit" @click="submit"></div>
          </template>
          <template v-if='loginType === "sign" '>
            <div class="login_title login_check active">
              注册
            </div>
            <div class="sign_form">
              <div class="input">
                <div class="head">
                  姓名：
                </div>
                <div class="cont">
                  <input type="text">
                </div>
              </div>
              <div class="input">
                <div class="head">
                  手机号：
                </div>
                <div class="cont">
                  <input type="text">
                  <div class="verify">
                    发送验证码
                  </div>
                </div>
              </div>
              <div class="input">
                <div class="head">
                  验证码：
                </div>
                <div class="cont">
                  <input type="text">
                </div>
              </div>
              <div class="input">
                <div class="head">
                  邮箱：
                </div>
                <div class="cont">
                  <input type="text">
                </div>
              </div>
              <div class="input">
                <div class="head">
                  公司名：
                </div>
                <div class="cont">
                  <input type="text">
                </div>
              </div>
              <div class="input">
                <div class="head">
                  职位：
                </div>
                <div class="cont">
                  <input type="text">
                </div>
              </div>
              <div class="input" style="margin-bottom:.1rem">
                <div class="head">
                  省份：
                </div>
                <div class="cont">
                  <input type="text">
                </div>
              </div>
              <div class="check">
                <div>
                  <i class='active'></i>
                  我愿意接受维谛技术（Vertiv）及其授权的合作伙伴为我发送维谛技术（Vertiv）产品、解决方案或服务的相关信息。我知道随时可以取消订阅。
                </div>
                <span>*</span>点击“提交”，表明我理解并同意按照维谛技术(Vertiv) <a href="">隐私保护</a>和<a href="">法律声明</a>使用和传递我的个人信息。
              </div>
              <div class="toLogin">
                已有账号，<span>马上登陆</span>
              </div>
            </div>
            <div class="sign_submit" @click="sign_submit">
              提交
            </div>
          </template>
          <template v-if='loginType === "success"'>
            <div class="login_title">
              <div class="login_check" @click="toLogin">
                登录
              </div>
              <div class="login_check active">
                注册
              </div>
            </div>
            <img src="./img/sign_success.png" alt="" class="success_img">
            <div class="h1">
              您的报名信息已提交给工作人员审核
            </div>
            <div class="tips">
              审核结果将会通过短信，<br>邮件等方式通知，请您耐心等待
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>`
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
          // 是否开启精彩回顾
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
              name: "精彩回顾"
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
          cacheListActive: 0,
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
          if(that.page){
           location.replace('index.html'); 
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
            location.replace('index.html');
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
            if(JSON.stringify(that.activeList) == '{}'){
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
              if(navigator.userAgent.indexOf("UCBrowser")){
                if (that.pageName() === "mobile") {
                  var time = setInterval(function() {
                    if(that.isLogin){
                      if(JSON.stringify(that.activeList) !='{}'){
                        that.getViewRecord()
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
