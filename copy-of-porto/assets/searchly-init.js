(function (d, k) {
    if (!d.CommerceinstrumentsIncluded) {
      d.CommerceinstrumentsIncluded = !0;
      for (var a = d.Commerceinstruments || {}, e = document.getElementsByTagName("script"), b = 0; b < e.length; b++)
        if (e[b].src) {
          var f = e[b].src.indexOf("searchly-init");
          if (-1 !== f) {
            var h = /a=([a-zA-Z0-9]{10})/.exec(e[b].src);
            a.host = e[b].src.substring(h + 6, f);
            a.SearchInput = 'input[name="q"],.mm-search > input[type="text"]';
            a.options = a.options || {};
            a.options.Platform = "shopify";
            a.options.ResultsDiv = "#aikon_results";
            a.options.ResultsFormPath = "/pages/search-results";

            var query = e[b].src.replace(/^.*\?/, '');
            var hashes = query.split('&');
            for (var i = 0; i < hashes.length; i++) {
              var hash = hashes[i].split('=');
              if (hash[0] === 'shop') {
                a.shop = hash[1];
                a.ApiKey = hash[1];
              }

              if(hash[0] === 'version') {
                a.version = hash[1];
              }
            }
            break
          }
        }
      a.userOptions = a.options || {};
      a.AutoCmpParams = a.AutoCmpParams || {};
      a.ResultsParams = a.ResultsParams || {};
      a.userOptions.api_key = a.AutoCmpParams.api_key = a.ResultsParams.api_key = a.api_key || a.ApiKey;
      a.userOptions.SearchInput = a.SearchInput;
      a.paths = {};
      //a.prefix = ("https:" === document.location.protocol ? "https://" : "http://") + "d1wpn76efzrpt5.cloudfront.net/";
      a.paths.jq = a.jq || "//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.4.min.js";
      a.paths.xdc = "//" + a.host + "searchly-xdc.min.js";
      a.paths.widgets = "//" + a.host + "searchly-widgets.js";
      a.paths.tpl = a.tpl || document.location.hostname == "localhost" ? "https://cdn.shopify.com/s/files/1/0268/5177/0431/t/12/assets/searchly-templates.js" : a.host + "searchly-templates.js";
      a.paths.style = a.style || document.location.hostname == "localhost" ? "https://cdn.shopify.com/s/files/1/0268/5177/0431/t/12/assets/searchly-styles.css" : a.host + "searchly-styles.css";
      a.paths.preload = a.preload || document.location.hostname == "localhost" ? "https://cdn.shopify.com/s/files/1/0268/5177/0431/t/12/assets/searchly-preload_data.js" : a.host + "searchly-preload_data.js";
      a.loadScript = function (src, b) {
        var c = document.createElement("script");
        c.charset = "utf-8";
        c.src = src + "?version=" + a.version;
        c.onload = c.onreadystatechange = function () {
          if (!c.readyState || /loaded|complete/.test(c.readyState))
            c.onload = c.onreadystatechange = null,
              c = k,
            b && b()
        };

        document.getElementsByTagName("head")[0].appendChild(c)
      }
        ,
        a.loadCss = function (src, b) {
          var c = document.createElement("link");
          c.rel = "stylesheet";
          c.href = src + "?version=" +  a.version;
          c.className = "aikon_widget_css";
          var d = setTimeout(function () {
            c.onload = null;
            b()
          }, 5E3);
          c.onload = function () {
            clearTimeout(d);
            b()
          }
          ;
          document.getElementsByTagName("head")[0].appendChild(c)
        }
        ,
        a.loader = {
          ready: null,
          loadedCount: 0,
          loaded: function () {
            a.loader.loadedCount++;
            5 === this.loadedCount && a.loader.ready()
          },
          jqLoaded: function () {
            a.loadScript(a.paths.widgets, function () {
              a.loader.loaded()
            });
            if (document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState)
              a.loader.loaded();
            else
              var b = setInterval(function () {
                if (document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState)
                  a.loader.loaded(),
                    clearInterval(b)
              }, 100);
            a.loader.loaded()
          },
          init: function (b) {
            a.loader.ready = b;
            a.loadScript(a.paths.xdc);
            a.loadScript(a.paths.tpl, function () {
              a.loader.loaded()
            });
            a.forceUseExternalJQuery ? (a.$ = d.jQuery,
              a.loader.jqLoaded()) : a.loadScript(a.paths.jq, function () {
              a.$ = jQuery.noConflict(!0);
              a.loader.jqLoaded()
            });
            a.loadCss(a.paths.style, function () {
              a.loader.loaded()
            });
            a.loadScript(a.paths.preload)
          }
        },
        a.loader.init(function () {
          a.Init();
          a.SetPaths(a.paths);
          a.SetOptions(d.Commerceinstruments.templates);
          a.SetOptions(a.userOptions);
          a.SetParams(a.AutoCmpParams);
          a.SetResultsParams(a.ResultsParams);
          a.SetVersion(a.version);
          a.Loaded = !0;
          a.Start()
        }),
        d.Commerceinstruments = a
    }
  }
)(window);
