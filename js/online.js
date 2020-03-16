// import video from 'video.min.js'

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

var a = 123;
$(function() {
  // Vue.use(video)
  var app = new Vue({
    el: "#app",
    data() {
      return {
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
        page: "one",
        onlineList: [],
        activeList: [],
        isOpenVideo: false,
        openVideoSrc: "",
        mainVideo: null,
        viceVideo: null
      };
    },
    created() {
      var pageName = this.pageName();
      console.log(pageName);
      try {
        if (!IsPC()) {
          window.location = "mobile_" + pageName + ".html" + location.search;
        }
        window.οnresize = function() {
          if (!IsPC()) {
            window.location = "mobile_" + pageName + ".html" + location.search;
          }
        };
      } catch (err) {}
    },
    mounted() {
      var that = this;
      that.listIndex = that.getQueryVariable("homeIndex");
      that.page = that.getQueryVariable("type");
      that.detailIndex = that.getQueryVariable("listIndex");
      var pageName = that.pageName();
      if (
        (pageName === "online_list" && !that.listIndex) ||
        (pageName === "online_detail" && !that.detailIndex)
      ) {
        location.replace("./online.html");
        return "";
      }
      $.ajax({
        url: "onlineData.json",
        type: "get",
        dataType: "json",
        success: function(res) {
          that.onlineList.push(...res);
          var active = {};
          res.forEach(function(e, index) {
            active["home_" + index] = {
              active: false,
              son: []
            };
          });
          that.activeList = Object.assign(
            {},
            that.activeList,
            JSON.parse(localStorage.getItem("pageActive")) || active
          );

          that.$nextTick(function() {
            if (
              that.page === "detail" &&
              that.onlineList[that.listIndex].list[that.detailIndex].detail
                .video
            ) {
              that.mainVideo = videojs("example_video_1", {
                controls: true,
                loop: true,
                preload: "auto"
              });
            }

            if (pageName === "mobile_online_list") {
              new Swiper("#listSwiper", {
                slidesPerView: 1,
                centeredSlides: true,
                centeredSlidesBounds: true,
                centerInsufficientSlides: true,
                spaceBetween: that.rem2px(-2.5),
                slidesOffsetBefore: that.rem2px(1.56),
                initialSlide: 1,
                nested: true,
                autoHeight: true
              });
            }
          });
        }
      });
    },
    methods: {
      openNav: function () {
        this.isOpenNav = true
      },
      rem2px: function (num) {
        return num * 100 * ($(window).width() / 750);
      },
      getQueryVariable: function(variable) {
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
      toList: function(i, index) {
        var arr = JSON.parse(JSON.stringify(this.activeList));
        location.href = "./online_list.html?homeIndex=" + index + "&type=list";
        if (arr["home_" + index].active) return;
        arr["home_" + index].active = true;
        localStorage.setItem("pageActive", JSON.stringify(arr));
      },
      toDetail: function(i, index) {
        var arr = JSON.parse(JSON.stringify(this.activeList));
        location.href =
          "./online_detail.html?homeIndex=" +
          this.listIndex +
          "&listIndex=" +
          index +
          "&type=detail";
        if (arr["home_" + this.listIndex].son.indexOf(index) !== -1) return;
        arr["home_" + this.listIndex].son.push(index);
        localStorage.setItem("pageActive", JSON.stringify(arr));
      },
      pageName: function() {
        var a = location.href;
        var b = a.split("/");
        var c = b
          .slice(b.length - 1, b.length)
          .toString(String)
          .split(".");
        return c.slice(0, 1).join();
      },
      openVideo: function(i) {
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
      closeVideo: function() {
        this.isOpenVideo = false;
        this.openVideoSrc = "";
        this.viceVideo.dispose();
        this.viceVideo = null;
      }
    },
    // filters: {
    //   rem2pxFilters: function (num) {
        
    //   }
    // }
  });
});
