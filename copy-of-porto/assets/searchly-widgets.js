(function (e, a) {
    function M(d, b) {
      a(".aikon-results-custom-scroll").length && (d = a(".aikon-results-custom-scroll"));
      var g = d.offset().top;
      d.prev().prev("h1.p25").length && (g -= d.prev().prev("h1.p25").outerHeight(!1) + 10);
      "Y" == c.options.demoMode && (g -= 95);
      b ? a("html, body").animate({
        scrollTop: g
      }, 400) : a(e).scrollTop(g)
    }

    function Y() {
      var c = "";
      e.location.search && (c = e.location.search.substring(1));
      return n(c)
    }

    function ca() {
      var c = "";
      e.location.hash && (c = decodeURIComponent(e.location.hash).substring(4));
      return n(c)
    }

    function n(a) {
      var b = {};
      a = a.split("&");
      for (var d = 0; d < a.length; d++) {
        var f = a[d].split("=");
        if (f[0] && f[1]) {
          var k = f[0];
          if ("templates" == c.options.ResultsUseAsNavigation && c.isCollectionPage(e.location.href) && "q" == k)
            return;
          f = decodeURIComponent(f[1].replace(/\+/g, "%20")) || "";
          b[k] = f
        }
      }
      return b
    }

    function m(c) {
      return (c = document.cookie.match(new RegExp("(?:^|; )" + c.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"))) ? decodeURIComponent(c[1].split("||tkn||").join("%")) : void 0
    }

    function l(c, b, a, f) {
      a = a || {};
      var d = a.expires;
      if ("number" == typeof d && d) {
        var e = new Date;
        e.setTime(e.getTime() + 1E3 * d);
        d = a.expires = e
      }
      d && d.toUTCString && (a.expires = d.toUTCString());
      b = encodeURIComponent(b);
      f && (b = b.split("%").join("||tkn||"));
      c = c + "=" + b;
      for (var g in a)
        c += "; " + g,
          b = a[g],
        !0 !== b && (c += "=" + b);
      document.cookie = c
    }

    function D(c, b) {
      for (var a = 0, d = c.length; a < d; a++) {
        var e = 0;
        for (d = b.length; e < d; e++)
          if (c[a] == b[e])
            try {
              delete b[e]
            } catch (h) {
              b[e] = void 0
            }
      }
      e = [];
      a = 0;
      for (d = b.length; a < d; a++)
        b[a] && e.push(b[a]);
      return c.concat(e)
    }

    function K() {
      return /iP(hone|ad)|Android|BlackBerry|Windows Phone/i.test(navigator.userAgent)
    }

    function G(a) {
      var b = c.parseHref(e.location.href);
      b = b.path_parts && "cart" == b.path_parts[0];
      "magento" !== c.options.Platform && "shopify" !== c.options.Platform || !a && !b || e.location.reload()
    }

    function ja(c) {
      w("getCart", function (b) {
        for (var d, f = 0; f < b.items.length; f++)
          b.items.hasOwnProperty(f) && b.items[f].id == c && (d = b.items[f]);
        a("#cartCount, .cart-count").length ? a("#cartCount, .cart-count").each(function () {
          a(this).children().length || a(this).html(b.item_count).removeClass("hidden-count")
        }) : a(".site-header-cart--count").length && a(".site-header-cart--count").addClass("visible").attr("data-header-cart-count", b.item_count);
        "object" === typeof e.ajaxCart && "function" === typeof e.ajaxCart.load && e.ajaxCart.load();
        a(".site-header__icons .site-header__icon.site-header__cart").length && (a(".site-header__cart .site-header__cart-count").length || a(".site-header__cart").append('<div id="CartCount" class="site-header__cart-count hide" data-cart-count-bubble=""><span data-cart-count="">' + b.item_count + '</span><span class="icon__fallback-text medium-up--hide">items</span></div>'),
          a(".site-header__cart .site-header__cart-count").removeClass("hide").children("span").first().html(b.item_count));
        a(".navbar .navbar-nav .cart-icon .count").length && a(".navbar .navbar-nav .cart-icon .count").removeClass("hidden").html(b.item_count);
        a("#PageContainer #shopify-section-header #CartDrawer").length && e.$ && e.$("body").trigger("added.ajaxProduct");
        a("#sidebar-cart.Drawer").length && a("#sidebar-cart.Drawer").data("section-settings") && ("drawer" === a("#sidebar-cart.Drawer").data("section-settings").type ? d && document.querySelector("body").dispatchEvent(new CustomEvent("product:added", {
          bubbles: !0,
          detail: {
            variant: d,
            quantity: 1
          }
        })) : a(".Header__Wrapper .HorizontalList .Header__CartCount").length && a(".Header__Wrapper .HorizontalList .Header__CartCount").html(b.item_count));
        a("#pageheader .cart-summary .cart-count").length && a("#mobile-header .cart-count").length && a.get("/search", function (b) {
          for (var c = ["#pageheader .cart-summary .cart-count", "#mobile-header .cart-count"], d = 0; d < c.length; d++)
            if (c.hasOwnProperty(d)) {
              var f = a("<div>" + b + "</div>").find(c[d]).first();
              a(c[d]).html(f.html())
            }
        });
        a(".site-header__cart span#CartCount").length && a(".site-header__cart span#CartCount").html(b.item_count);
        a(".header-cart .header-cart__count").length && a(".header-cart .header-cart__count").html(b.item_count);
        a(".menu .icon-cart.cart-button").length && e.$ && e.refreshCart && (e.refreshCart(b),
          setTimeout(function () {
            e.$(".menu .icon-cart.cart-button").first().click()
          }, 500));
        a("#cart .my-cart-link #item_count").length && a("#cart .my-cart-link #item_count").html(b.item_count);
        a("ul:not(.nav_buttons) .cart_button span.cart_count").length && a("ul:not(.nav_buttons) .cart_button span.cart_count").html(b.item_count);
        a(".nav_buttons .cart_button span.cart_count").length && e.refreshCart && e.refreshCart(b);
        a(".header__action-item--cart #mini-cart").length && d && document.querySelector("body").dispatchEvent(new CustomEvent("product:added", {
          bubbles: !0,
          detail: {
            variant: d,
            quantity: 1
          }
        }));
        a(".header__cart-icon .header__cart-count").length && a(".header__cart-icon .header__cart-count").html(b.item_count);
        a(".secondary-nav .js-cart-trigger").length && e.theme && e.theme.mfpOpen && setTimeout(function () {
          e.theme.mfpOpen("cart")
        }, 100);
        a(".CartToggle .cartCost .money").length && e.slate && e.slate.Currency && e.slate.Currency.formatMoney && (d = slate.Currency.formatMoney(b.total_price, theme.moneyFormat),
          a(".cartCost").html("(<span class='money'>" + d + "</span>)").removeClass("hidden-count"));
        if (e.theme && e.theme.partials && e.theme.settings)
          if ("drawer" == e.theme.settings.cart_type)
            try {
              e.theme.partials.Cart.updateAllHtml(function () {
                e.theme.partials.Cart.updateAllHasItems(1);
                e.theme.partials.Cart.updateTotals();
                e.$('[data-off-canvas--open="right-sidebar"]').first().trigger("click")
              })
            } catch (k) {
            }
          else if ("page" == e.theme.settings.cart_type) {
            try {
              e.theme.classes.Cart.prototype.updateTotalsComplete(b.item_count),
                e.theme.partials.Cart.updateTotals()
            } catch (k) {
            }
            a(".cart .header--cart-link .cart--external--total-items").length && a(".cart .header--cart-link .cart--external--total-items").html(b.item_count)
          } else
            e.theme.partials.cart && e.theme.partials.cart.recentCartItemPopUp && e.theme.partials.cart.recentCartItemPopUp();
        a(".mini-cart-wrap span.item-count").length && a(".mini-cart-wrap span.item-count").html(b.item_count);
        a("#top-header-section #nav-shopping-cart-dialog").length && e.Shopify.updateQuickCart && e.Shopify.afterCartUpdate && (e.Shopify.updateQuickCart(b),
          e.Shopify.afterCartUpdate(b));
        a(".drawers .mini-cart .mini-cart__content").length && e.$ && e.$(document).trigger("product.added");
        a(".site-actions-cart span[data-cart-item-count]").length && a(".site-actions-cart span[data-cart-item-count]").html(b.item_count);
        a(".cart-wrapper .cart-item-count").length && e.theme && e.theme.Cart && e.theme.Cart.updateCartItemCount && e.theme.Cart.updateCartItemCount(b.item_count, b.total_price, b.total_discount, b);
        a("form.mini-cart .mini-cart__inner").length && e.$ && e.$(document).trigger("theme:cart:updated", [b, !0, !0]);
        a(".site-cart-handle a").length && e.sidebarCartAjaxFunctions && e.updateCart && e.$ && a.ajax({
          url: "/cart",
          success: function (b) {
            e.updateCart(b);
            e.$(".site-cart-handle a").trigger("click")
          }
        })
      })
    }

    function ea(d) {
      var b = c.options.BigcommerceClientID
        , e = !1;
      if (!b)
        return e;
      a.ajax({
        url: "/customer/current.jwt?app_client_id=" + b,
        complete: function (b) {
          "function" === typeof d && (200 === b.status && (e = !0),
            d.call(this, e))
        }
      })
    }

    function ma() {
      e._swat ? ba() : (e.SwymCallbacks || (e.SwymCallbacks = []),
        e.SwymCallbacks.push(ba))
    }

    function ba() {
      a(".swym-add-to-wishlist-view-product").addClass("swym-loaded");
      Commerceinstruments.AddToSwymWishlist()
    }

    function invokeProductCompare() {

      var spcmpD_pid = a("form[action='/cart/add']").find(".SPCMP_Add").attr('spcmp_pid');
      var spcmpD_vid = a("form[action='/cart/add']").find('[name=id]').val();

      if (window.isInCMPStorage != null) {
        var sp_checkAganId = window.isInCMPStorage(spcmpD_pid, spcmpD_vid);
        if (sp_checkAganId) {
          a('.SPCMP_Add').val(SACMP_app_data['lang_arr']['compare_added_txt']);
          a('.SPCMP_Add_span').text(SACMP_app_data['lang_arr']['compare_added_txt']);
        } else {
          a('.SPCMP_Add').val(SACMP_app_data['lang_arr']['compare_add_txt']);
          a('.SPCMP_Add_span').text(SACMP_app_data['lang_arr']['compare_add_txt']);
        }
      }

      a('.SPCMP_Add,.SPCMP_chk_lbl').show();
    }

    var c = {
      protocol: "https:" == document.location.protocol ? "https" : "http",
      paths: {},
      vesion: '',
      http: {
        request_url: "http://search-master.commerceinstruments.com/getwidgets",
        request_results_url: "http://search-master.commerceinstruments.com/getresults",
        request_recommendations_url: "http://search-master.commerceinstruments.com/recommendations",
        analytics_url: "http://nyqs7x5nhd.execute-api.us-west-1.amazonaws.com/prod",
        load_meter_image_src: "https://stats.commerceinstruments.com/widgets/images/load_speed.gif",
        stats_update_search_url: "http://rxeks2tuz2.execute-api.us-west-1.amazonaws.com/prod",
        tag_label_new_image_url: "http://search-master.s3-us-west-1.amazonaws.com/assets/tag_label_new.png",
        tag_label_sale_image_url: "http://search-master.s3-us-west-1.amazonaws.com/assets/tag_label_sale.png",
        stats_url: "https://stats.commerceinstruments.com/stats.gif"
      },
      https: {
        request_url: "https://search-master.commerceinstruments.com/getwidgets",
        request_results_url: "https://search-master.commerceinstruments.com/getresults",
        request_recommendations_url: "https://search-master.commerceinstruments.com/recommendations",
        analytics_url: "https://nyqs7x5nhd.execute-api.us-west-1.amazonaws.com/prod",
        load_meter_image_src: "https://www.commerceinstruments.com/widgets/images/load_speed.gif",
        stats_update_search_url: "https://rxeks2tuz2.execute-api.us-west-1.amazonaws.com/prod",
        tag_label_new_image_url: "https://search-master.s3-us-west-1.amazonaws.com/assets/tag_label_new.png",
        tag_label_sale_image_url: "https://search-master.s3-us-west-1.amazonaws.com/assets/tag_label_sale.png",
        stats_url: "https://stats.commerceinstruments.com/stats.gif"
      },
      options: {},
      defaultOptions: {
        Platform: "",
        StoreName: "",
        WidgetsEnabled: "Y",
        UseGATrackParam: "N",
        IsAdmin: "N",
        IsExtraObjectsPermitted: "N",
        SearchInput: "#aikon-input",
        ResultsDiv: "#aikon_results",
        ResultsFormPath: "",
        AutoSpellCorrection: "Y",
        PersonalizationEnabled: "N",
        CommerceinstrumentsCustomerTags: [],
        UsergroupRules: [],
        UsergroupRulesHiddenPriceTags: [],
        AutocompleteShow: "Y",
        AutocompleteLayout: "classic",
        AutocompleteStyle: "ITEMS_MODERN",
        AutocompleteItemCount: 3,
        AutocompletePagesCount: 3,
        AutocompleteCategoriesCount: 3,
        AutocompleteSuggestionCount: 4,
        AutocompleteVendorsCount: 3,
        AutocompleteTagsCount: 3,
        AutocompleteAlwaysShow: "N",
        AutocompleteFollowLinks: "Y",
        AutocompleteHighlight: "Y",
        AutocompleteProductAttributeName: "",
        AutocompleteShowViewAllLink: "Y",
        AutocompleteShowPrice: "Y",
        AutocompleteShowListPrice: "Y",
        AutocompleteShowProductImages: "Y",
        AutocompleteShowProductCode: "N",
        AutocompleteShowMobileWidget: "Y",
        AutocompleteShowOnlyInStock: "N",
        AutocompleteShowRecent: "N",
        AutocompleteClickSend: "Y",
        AutocompleteShowBrand: "N",
        AutocompleteShowResultsHTML: "N",
        AutocompleteShowNoResultsHTML: "N",
        AutocompleteShowEmptyFieldHTML: "N",
        AutocompleteShowInStockStatus: "N",
        AutocompleteSuggestOnSearchBoxEmpty: "N",
        AutocompleteShowSeparator: "Y",
        AutocompleteShowMoreLink: "N",
        AutocompleteIsMulticolumn: "N",
        AutocompleteZeroPriceAction: "show_zero_price",
        AutocompleteResultsOrder: ["suggestions", "categories", "pages", "products"],
        AutocompleteTemplate: "<ul/>",
        AutocompleteMobileTemplate: '<ul><li class="aikon-mobile-top-panel"><div class="aikon-close-button"><button type="button" class="aikon-close-button-arrow"></button></div><form action="#" style="margin: 0px"><div class="aikon-search"><input id="aikon-mobile-search-input" autocomplete="off" class="aikon-input-style aikon-mobile-input-style"></div><div class="aikon-clear-button-container"><button type="button" class="aikon-clear-button" style="visibility: hidden"></button></div></form></li></ul>',
        AutocompleteResultsHTML: '<div style="text-align: center;"><a href="#" title="Exclusive sale"><img src="https://www.commerceinstruments.com/images/sale_sign.jpg" style="display: inline;" /></a></div>',
        AutocompleteNoResultsHTML: '<p>Sorry, nothing found for [search_string].</p><p>Try some of our <a href="#" title="Bestsellers">bestsellers \u2192</a>.</p>',
        AutocompleteEmptyFieldHTML: "<br><i>Start typing for instant search results</i><br><br>",
        AutocompleteItem: '<li class="aikon-ac-odd aikon-product" id="aikon-ac-product-${product_id}"><a href="${autocomplete_link}" class="aikon-item clearfix" draggable="false"><span class="aikon-thumbnail"><img src="${image_link}" class="aikon-item-image" style="max-width:70px;max-height:70px;" alt="" border="0"></span><span class="aikon-overhidden"><span class="aikon-title">${title}</span>${autocomplete_product_code_html}${autocomplete_product_attribute_html}<span class="aikon-description">${description}</span>${autocomplete_prices_html}${autocomplete_in_stock_status_html}${reviews_html}</span></a></li>',
        AutocompleteMobileItem: "",
        AutocompletePricesHTML: '<div class="aikon-price-list">${autocomplete_price_from_text_html}${autocomplete_price_html}${autocomplete_list_price_html}</div>',
        AutocompleteZeroPriceTextHTML: '<span class="aikon-price-zero-text">${autocomplete_zero_price_text}</span>',
        AutocompletePriceFromTextHTML: '<span class="aikon-price-from-text">${autocomplete_price_from_text} </span>',
        priceHTML: '<span class="aikon-price ${aikon_price_with_discount_class} money ${extra_money_class}" ${extra_money_attr}>${price}</span>',
        emptyPriceHTML: '<span class="aikon-price">&nbsp;</span>',
        listPriceHTML: '<span class="aikon-discounted-price money ${extra_money_class}" ${extra_money_attr}>${list_price}</span>',
        savePriceHTML: '<span class="aikon-save-price-wrapper">${save_price_text_html}${save_price_value_html}</span>',
        savePriceTextHTML: '<span class="aikon-save-price-label">Save</span>',
        savePriceValueHTML: '<span class="aikon-save-price money ${extra_money_class}" ${extra_money_attr}>${save_price}</span>',
        AutocompleteProductDiscountLabelShow: "N",
        LabelAutocompleteProductDiscountText: "[discount]% off",
        ProductDiscountBgcolor: "D2354F",
        ProductDiscountLabelHTML: '<div class="aikon-product-label aikon-product-discount-label" style="background: #${product_discount_label_bgcolor};"><span class="aikon-left-arrow" style="border-right-color: #${product_discount_label_bgcolor};"></span>${product_discount_label_text}</div>',
        AutocompleteInStockStatusHTML: '<span class="${autocomplete_in_stock_status_class}">${autocomplete_in_stock_status_text}</span>',
        ResultsInStockStatusHTML: '<span class="${results_in_stock_status_class}">${results_in_stock_status_text}</span>',
        reviewsHTML: '<span class="aikon-reviews">${reviews_content_html}</span>',
        reviewsContentHTML: '<span class="stars-container stars-${reviews_average_score_percent}">\u2605\u2605\u2605\u2605\u2605</span><span class="total-reviews">${total_reviews_text}</span>',
        AutocompleteProductCodeHTML: '<span class="aikon-sku">${autocomplete_product_code_text}</span>',
        ResultsProductCodeHTML: '<span class="aikon-sku">${results_product_code_text}</span>',
        ResultsQuickViewProductCodeHTML: '<span class="aikon-quick-view-sku">${results_product_code_text}</span>',
        AutocompleteProductAttributeHTML: '<span class="aikon-attribute"><span class="aikon-attribute-title">${autocomplete_product_attribute_title}</span> ${autocomplete_product_attribute_text}</span>',
        ResultsProductAttributeHTML: '<span class="aikon-attribute"><span class="aikon-attribute-title">${results_product_attribute_title}</span> ${results_product_attribute_text}</span>',
        ResultsQuickViewProductAttributeHTML: '<span class="aikon-quick-view-attribute"><span class="aikon-quick-view-attribute-title">${results_product_attribute_title}</span> ${results_product_attribute_text}</span>',
        ResultsCategoryImageHTML: '<span class="aikon-thumbnail"><img src="${image_link}" class="aikon-item-image" alt="${image_alt}" border="0"></span>',
        ResultsPageImageHTML: '<span class="aikon-thumbnail"><img src="${image_link}" class="aikon-item-image" alt="${image_alt}" border="0"></span>',
        ResultsShow: "N",
        ResultsStyle: "RESULTS_BIG_PICTURES",
        ResultsItemCount: 15,
        ResultsPagesCount: 20,
        ResultsCategoriesCount: 20,
        ResultsMaxProductsPerRow: 5,
        ResultsShowActionButton: "view_product",
        ResultsShowOnlyInStock: "N",
        ResultsShowFiltersInSidebar: "Y",
        ResultsShowFiltersInTopSection: "Y",
        ResultsShowFiltersWithNoResults: "Y",
        ResultsDefaultView: "grid",
        ResultsShowPrice: "Y",
        ResultsShowListPrice: "Y",
        ResultsShowProductCode: "N",
        ResultsShowInStockStatus: "N",
        ResultsProductAttributeName: "",
        ResultsFlipImageOnHover: "Y",
        ResultsEnableInfiniteScrolling: "N",
        ResultsShowOptionVariants: "N",
        ResultsEnableNewMobileLook: "Y",
        ResultsStockStatusShowedClass: "aikon-stock-status-showed",
        ResultsTopRightLabelShowedClass: "aikon-top-right-label-showed",
        ResultsPriceWithDiscountClass: "aikon-price-with-discount",
        ResultsShowCategoryImages: "Y",
        ResultsShowPageImages: "Y",
        ResultsTitleStrings: 2,
        ResultsDescriptionStrings: 2,
        ResultsZeroPriceAction: "show_zero_price",
        ResultsUseAsNavigation: "no",
        ResultsFallbackUrl: e.location.protocol + "//" + (e.location.hostname || e.location.host) + "/search?q=",
        ResultsItemGrid: '<li class="aikon-product" id="aikon-product-${product_id}"><a href="${results_link}" class="aikon-view-link" data-no-instant="true" draggable="false"><div class="aikon-item clearfix ${results_show_top_right_label_class}">${results_wishlist_button_html}<div class="aikon-thumbnail-wrapper">${results_product_top_left_label_html}${results_product_down_left_label_html}${results_product_down_right_label_html}<span class="aikon-thumbnail"><img src="${image_link}" class="aikon-item-image" alt="${image_alt}" border="0">${flip_image_html}</span></div><span class="aikon-overhidden"><span class="aikon-title">${title}</span>${results_product_code_html}${results_product_attribute_html}<span class="aikon-description">${description}</span>${results_prices_list_html}${results_product_top_right_label_html}${action_button_html}${reviews_html}</span></div></a>${product_compare_html}</li>',
        ResultsOptionsItemGrid: '<li class="aikon-product" id="aikon-product-${product_id}"><a href="${link}" class="aikon-view-link" data-no-instant="true" draggable="false"><div class="aikon-item clearfix ${results_show_top_right_label_class}">${results_wishlist_button_html}<div class="aikon-thumbnail-wrapper">${results_product_top_left_label_html}${results_product_down_left_label_html}${results_product_down_right_label_html}<span class="aikon-thumbnail"><img src="${results_image_link}" class="aikon-item-image" alt="${image_alt}" border="0">${flip_image_html}</span></div><span class="aikon-overhidden"><span class="aikon-title">${title}</span>${results_product_code_html}${results_product_attribute_html}<span class="aikon-description">${description}</span><div class="aikon-options-box">${results_color_swatches_html}${results_unmapped_colors_html}${results_size_squares_html}${results_other_options_html}</div>${results_prices_list_html}${results_product_top_right_label_html}${action_button_html}${reviews_html}</span></div></a>${product_compare_html}</li>',
        ResultsCategory: '<li class="aikon-category" id="aikon-category-${category_id}"><a href="${link}" class="aikon-view-link" data-no-instant="true" draggable="false"><div class="aikon-item clearfix">${results_category_image_html}<span class="aikon-overhidden"><span class="aikon-title">${title}</span><span class="aikon-description">${description}</span></span></div></a></li>',
        ResultsPage: '<li class="aikon-page" id="aikon-page-${page_id}"><a href="${link}" class="aikon-view-link" data-no-instant="true" draggable="false"><div class="aikon-item clearfix">${results_page_image_html}<span class="aikon-overhidden"><span class="aikon-title">${title}</span><span class="aikon-description">${description}</span></span></div></a></li>',
        RecommendationShowActionButton: "view_product",
        RecommendationItem: '<li class="aikon-product item" id="aikon-product-${product_id}"><a href="${link}" class="aikon-view-link" data-no-instant="true" draggable="false"><div class="aikon-item clearfix ${results_show_top_right_label_class}">${results_wishlist_button_html}<div class="aikon-thumbnail-wrapper">${results_product_top_left_label_html}${results_product_down_left_label_html}${results_product_down_right_label_html}<span class="aikon-thumbnail"><img src="${image_link}" class="aikon-item-image" alt="" border="0"></span></div><span class="aikon-overhidden"><span class="aikon-title">${title}</span>${results_prices_list_html}${results_product_top_right_label_html}${recommendation_action_button_html}${reviews_html}</span></div></a></li>',
        ResultsBoldProductDiscountIconHTML: '<div class="aikon-product-label-image bold_collection_discount_icon"></div>',
        ResultsPricesListHTML: '<div class="aikon-price-list">${results_prices_html}</div>',
        ResultsPricesHTML: "${results_price_from_text_html}${results_price_html}${results_list_price_html}",
        ResultsPriceFromTextHTML: '<span class="aikon-price-from-text">${results_price_from_text} </span>',
        ResultsZeroPriceTextHTML: '<span class="aikon-price-zero-text">${results_zero_price_text}</span>',
        ResultsShowProductDiscountLabel: "N",
        LabelResultsProductDiscountText: "[discount]% off",
        ResultsProductDiscountBgcolor: "D2354F",
        ResultsProductDiscountLabelHTML: '<div class="aikon-product-label top-left" style="background: #${results_product_discount_label_bgcolor};"><span class="aikon-right-arrow" style="border-left-color: #${results_product_discount_label_bgcolor};"></span>${results_product_discount_label_text}</div>',
        LabelResultsSortBy: "Sort by",
        LabelResultsSortRelevance: "Relevance",
        LabelResultsSortTitleAsc: "Title: A-Z",
        LabelResultsSortTitleDesc: "Title: Z-A",
        LabelResultsSortCreatedDesc: "Date: New to Old",
        LabelResultsSortCreatedAsc: "Date: Old to New",
        LabelResultsSortPriceAsc: "Price: Low to High",
        LabelResultsSortPriceDesc: "Price: High to Low",
        LabelResultsSortDiscountDesc: "Discount: High to Low",
        LabelResultsSortDiscountAsc: "Discount: Low to High",
        LabelResultsSortRatingAsc: "Rating: Low to High",
        LabelResultsSortRatingDesc: "Rating: High to Low",
        LabelResultsSortTotalReviewsAsc: "Total reviews: Low to High",
        LabelResultsSortTotalReviewsDesc: "Total reviews: High to Low",
        LabelResultsBestselling: "Bestselling",
        LabelResultsFeatured: "Featured",
        LabelResultsNoReviews: "No reviews",
        SmartNavigationDefaultSorting: "created:desc",
        SmartNavigationOverrideSeo: "Y",
        ResultsProductDefaultSorting: "relevance:desc",
        ShowBestsellingSorting: "N",
        ShowDateCreatedSorting: "N",
        ShowDiscountSorting: "N",
        LabelResultsTabCategories: "Categories",
        LabelResultsTabProducts: "Products",
        LabelResultsTabPages: "Pages",
        LabelResultsProductAttributeTitle: "",
        LabelResultsFound: 'Showing [count] results for "[search_string]"',
        LabelResultsFoundWithoutQuery: "Showing [count] results",
        LabelResultsNothingFound: "Nothing found for [search_string]",
        LabelResultsNothingFoundSeeAllCatalog: 'Your search "[search_string]" didn\'t match any results. Look at [link_catalog_start]other items in our store[link_catalog_end]',
        LabelResultsDidYouMean: "Did you mean: [suggestions]?",
        LabelResultsNothingFoundWithoutQuery: "Nothing found",
        LabelResultsFilters: "Filters",
        LabelResultsFrom: "From",
        LabelResultsInStock: "In Stock",
        LabelResultsPreOrder: "Pre-Order",
        LabelResultsOutOfStock: "Out Of Stock",
        LabelResultsSku: "SKU",
        LabelResultsZeroPriceText: "Contact us for price",
        LabelResultsAddToCart: "Add to cart",
        LabelResultsViewProduct: "View product",
        LabelResultsQuickView: "Quick view",
        LabelResultsViewFullDetails: "View full details",
        LabelResultsQuantity: "Quantity",
        LabelResultsViewCart: "View cart",
        LabelSeoTitle: "[search_request] - [store_name]",
        LabelSeoTitleFilters: "[filters] / [search_request] - [store_name]",
        LabelSeoDescription: "Shop [search_request] on [store_name]",
        LabelSeoDescriptionFilters: "Shop [search_request] [filters] on [store_name]",
        LabelResultsBucketsShowMore: "Show more",
        LabelResultsShowProducts: "Show [count] products",
        LabelResultsResetFilters: "Reset filters",
        LabelResultsInfiniteScrollingLoadMore: "Show more",
        LabelResultsPaginationCurrentPage: "[page] of [total_pages]",
        LabelResultsPaginationPreviousPage: "\u2190 Previous",
        LabelResultsPaginationNextPage: "Next \u2192",
        LabelAutocompletePages: "Pages",
        LabelAutocompleteProducts: "Products",
        LabelAutocompleteVendors: "Vendors",
        LabelAutocompleteTags: "Tags",
        LabelAutocompleteCategories: "Categories",
        LabelAutocompleteSuggestions: "Popular suggestions",
        LabelAutocompleteProductAttributeTitle: "",
        LabelAutocompleteNothingFound: "Sorry, nothing found for [search_string].",
        LabelAutocompleteResultsFound: 'Showing [count] results for "[search_string]"',
        LabelAutocompleteDidYouMean: "Did you mean: [suggestions]?",
        LabelAutocompletePopularSuggestions: "Check out some of these popular searches: [suggestions]",
        LabelAutocompleteSeeAllProducts: "See all products",
        LabelAutocompleteMoreProducts: "View all [count] items",
        LabelAutocompleteSearchInputPlaceholder: "",
        LabelAutocompleteMobileSearchInputPlaceholder: "Search our store...",
        LabelAutocompleteInStock: "In Stock",
        LabelAutocompletePreOrder: "Pre-Order",
        LabelAutocompleteOutOfStock: "Out Of Stock",
        LabelAutocompleteFrom: "From",
        LabelAutocompleteSku: "SKU",
        LabelAutocompleteMore: "More",
        LabelAutocompleteNoSuggestionsFound: "No suggestions were found",
        LabelAutocompleteNoVendorsFound: "No vendors were found",
        LabelAutocompleteNoTagsFound: "No tags were found",
        LabelAutocompleteNoCategoriesFound: "No categories were found",
        LabelAutocompleteNoPagesFound: "No pages were found",
        LabelAutocompleteTypeForResults: "Start typing for search results",
        LabelAutocompleteNoSearchQuery: "Type something above to start search...",
        LabelAutocompleteNumReviews: "[count] review(s)",
        LabelAutocompleteZeroPriceText: "Contact us for price",
        StickySearchboxShow: "auto",
        StickySearchboxPosition: "bottom-right",
        Redirects: {},
        Search: {
          timeout: 30
        },
        LabelStickySearchboxInputPlaceholder: "What are you looking for?",
        LabelStickySearchboxSearchButtonText: "Search",
        AppSupportCoin: "N",
        LangifySupport: "N",
        WeglotSupport: "N",
        LangifyDefaultLanguage: "",
        Translations: {},
        BoldProductDiscountSupport: "N",
        BoldProductDiscountTag: "",
        BestCurrencyConverter: "N",
        BoldMultiCurrency: "N",
        AppmateWishlistKingSupport: "N",
        AppmateWishlistKingButtonHtml: "\x3c!-- include 'wishlist-button-collection' with '${product_id}' --\x3e",
        ProductCompareHtml: '<label class="SPCMP_chk_lbl" style="display:none;"><input type="checkbox" class="SPCMP_Add " name=\'SPCMP_chk\' spcmp_pid="${product_id}" spcmp_vid="${first_variant_id}"><span class="SPCMP_Add_span"></span></label>',
        ProductCompareEnabled: "N",
        SwymCorporationWishlistPlusSupport: "N",
        GrowaveWishlistSupport: "N",
        SwymCorporationWishlistPlusHtml: '<button class="swym-button swym-add-to-wishlist-view-product product_${product_id}" data-swaction="addToWishlist" data-product-id="${product_id}" data-product-data=\'${swym_corporation_wishlist_plus_product_data}\'></button>',
        GrowaveWishlistHtml: '<div class="ssw-faveiticon sswfaveicon${product_id}"><i data-product-id="${product_id}" data-count="0" class="ssw-icon-heart-o ssw-fave-icon ssw-wishlist-element ssw-not-synch" data-params=\'{"product_id":"${product_id}","event":"fave_button","page":"product_profile"}\'></i><span class="faves-count"></span></div>',
        AutocompleteTagLabels: {},
        AutocompleteTagLabelsTextHTML: '<div class="aikon-product-label aikon-product-tag-label" style="background: #${autocomplete_tag_label_bgcolor};"><span class="aikon-left-arrow" style="border-right-color: #${autocomplete_tag_label_bgcolor};"></span>${autocomplete_tag_label_text}</div>',
        ResultsTagLabels: {},
        ResultsTagLabelsTextHTML: '<div class="aikon-product-label ${results_label_position}" style="background: #${results_tag_label_bgcolor};"><span class="${results_tag_label_arrow_class}" style="border-left-color: #${results_tag_label_bgcolor}; border-right-color: #${results_tag_label_bgcolor};"></span>${results_tag_label_text}</div>',
        ResultsTagLabelsImageHTML: '<div class="aikon-product-label-image ${results_label_position}">${results_tag_label_image}</div>',
        ReviewsShowRating: "N",
        onSuggestionClick: null,
        ImageNotFound: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAMAAAAPK1hoAAABZVBMVEW+vcy/vs7Mvb7BwcW/wsLCwr/FwcHCwsLCwsjCwtHFwsvFw8TFwtHFxMXQwcPCxcXCxcfDxcXOwsXFxcLCxNXFxcPFxcXFxNHFxcjRwsXIxcXFxsjFxdTIxsXDxtTFx8jIx8XFyMXRxcLFyMjVxMLIyMXHyMjIyMfIyMjUxcXZx8HDy93cyMPCzeHYysLE0uXm0sPF2Ozo0sPM2Obg1Nfm2MzL3fDs2MXd3d3q3M7f39/U4fTy38vT5vbl5eXn5+fo6Ojp6enc7vn46tbe8Pr67NX37t/w8ubk9fv09PT89ePq+fzq+f7s+f7v+fzq/P/8+er0+vzt/P7++er5+fnt/P/5+fz8+fn8+vD9+vD5+vz8+vTv/f/8+vz3/Pz9+/b5/Pn8+/z+/O35/Pz//O36/Pz8/Pf8/e/8/Pn7/Pzw///9/Pn8/Pz8/P35/fz+/P3+/fX8/f7+/fz///D+//////7///+w096rAAAACXBIWXMAAAsTAAALEwEAmpwYAAABi0lEQVRYw2PwdLSyoC6wcvRkcLQrozawc2SwKqM+sGKwoIGpFkPQVHsHe2oAB3sUUx1yQqgBchxQ3RpCHWA/auqoqaOmjpo6auqoqQRNTS7EX5MWZZBjagATCzsewMrgTY6pSZJqGniAOk/Q4DJVVhi79/mlKTFVJgt7TBVrUmAqFp05JaU5uOTINTUs2pSN2TgwlrqmJpjza2gIG+alUMPUZGfrVDAjXUVZQ0NVJIYapoZFaHE4ZVPb1GQbflVxjwzqhkCYl5CyhpS2XzhVYyvNSAKYl6T048KpmLKSXXnBWVTULBUmFUWxqWEROsqQnM9tmwkO5UgTX4rDNdlGAFqeqHK5AGMs102J0Z9SUxNBUQUzVs4nv8BSUJEzlEJTQ+MNJBCln5Suu54YsFyh2NQUPmWkQlVBTF6DKqZilt2D1tRgzDqRlcGH0jSQg6X+LsqhKBfQpoahUW04VNoDtGkR0ab1NtoqHjV11NRRU0dNHTV1sJpKozF4mswXjOR5GNrMb9FmLo4m84YAt3Fm79D3vA0AAAAASUVORK5CYII=",
        PriceAccess: "Y",
        HideAddToCartButton: "N",
        HiddenPriceTags: "COMMERCEINSTRUMENTS_HIDDEN_PRICE",
        ShowPriceOnlyForLoggedCustomer: "N",
        PriceSource: "first_variant",
        PriceFormatSymbol: "$",
        PriceFormatBefore: "$",
        PriceFormatAfter: "",
        PriceFormatDecimals: 2,
        PriceFormatRate: 1,
        PriceFormatDecimalSeparator: ".",
        PriceFormatThousandsSeparator: ",",
        EnableShopifyMultiCurrency: "N",
        TaxRate: 1,
        Currencies: {},
        ShopifyCurrency: "USD",
        ResultsManualSortingCategories: {},
        ColorsCSS: "",
        CustomCSS: "",
        RecommendationCustomCSS: "",
        demoMode: "N",
        Statistic: {
          ProductSelector: ".aikon-product",
          SessionLength: 3600,
          DateNow: Math.floor(Date.now() / 1E3),
          SessionName: "StatisticSession",
          SearchStorageName: "ProductsSearch",
          QueueName: "ClicksQueue",
          CheckoutButton: '.cart-form [type="submit"][name="checkout"], .cart-form .additional-checkout-button, form[action="/checkout"] [type="submit"], #cart .action_button[type="submit"], #checkout'
        },
        Personalization: {
          StorageName: "Personalization"
        },
        RecommendationsLayout: {},
        BigcommerceClientID: "",
        UseCrossDomainStats: "Y"
      },
      cache: [],
      autocmp_params: {
        api_key: "",
        q: "",
        restrictBy: {},
        maxResults: 10,
        startIndex: 0,
        items: !0,
        pages: !0,
        facets: !1,
        categories: !0,
        suggestions: !0,
        vendors: !1,
        tags: !1,
        pageStartIndex: 0,
        pagesMaxResults: 0,
        categoryStartIndex: 0,
        categoriesMaxResults: 0,
        suggestionsMaxResults: 7
      },
      result_params: {
        api_key: "",
        q: "",
        sortBy: "relevance",
        sortOrder: "desc",
        restrictBy: {},
        startIndex: 0,
        maxResults: 10,
        items: !0,
        pages: !0,
        categories: !0,
        suggestions: !0,
        queryCorrection: !0,
        suggestionsMaxResults: 3,
        pageStartIndex: 0,
        pagesMaxResults: 10,
        categoryStartIndex: 0,
        categoriesMaxResults: 10,
        facets: !0,
        facetsShowUnavailableOptions: !0
      },
      searchResults: {},
      searchInputs: null,
      stickySearchInput: null,
      suggestionClicked: !1,
      handleUsergroupRules: function (d) {
        c.options.UsergroupRules = d || [];
        c.options.UsergroupRulesHiddenPriceTags = [];
        c.options.UsergroupRules.length && a.each(c.options.UsergroupRules, function (b, a) {
          if ("hide_prices" == a.action) {
            var d = a.products_tags.split(",").map(function (b) {
              b = b.trim();
              "Y" == c.options.PriceAccess && "*" == b && (c.options.PriceAccess = "N");
              return b
            });
            d.length && (c.options.UsergroupRulesHiddenPriceTags = c.options.UsergroupRulesHiddenPriceTags.concat(d))
          }
        })
      },
      isRightToLeftLanguage: function () {
        var c = document.querySelector("body");
        c = e.getComputedStyle(c).getPropertyValue("direction");
        var b = document.querySelector("html");
        b = e.getComputedStyle(b).getPropertyValue("direction");
        return "rtl" == c || "rtl" == b
      },
      renderProductActionButton: function (d, b) {
        var e = a("<button />").addClass("aikon-button aikon-action-button")
          , f = "9o8d2w2I3O" == c.autocmp_params.api_key || "9E1N6v5G3r" == c.autocmp_params.api_key
          , k = !0;
        if ("results" == d) {
          k = "add_to_cart" == c.options.ResultsShowActionButton;
          "woocommerce" != c.options.Platform || b.hasOwnProperty("add_to_cart_url") && "" != a.trim(b.add_to_cart_url) || (k = !1);
          if ("Y" == c.options.ResultsShowOptionVariants && "add_to_cart" == c.options.ResultsShowActionButton && ("undefined" !== typeof b.shopify_variants && "0" == b.shopify_variants[0].available || "undefined" !== typeof b.quantity && "0" == b.quantity))
            return e.addClass("aikon-out-of-stock-product-button").text(c.options.LabelResultsOutOfStock),
              e.prop("outerHTML");
          if ("quick_view" == c.options.ResultsShowActionButton && (!K() || f))
            return e.addClass("aikon-quick-view-button").text(c.options.LabelResultsQuickView),
              e.prop("outerHTML")
        }
        "recommendations" == d && (k = "add_to_cart" == c.options.RecommendationShowActionButton);
        if (0 == b.price && k && "show_zero_price" != c.options.ResultsZeroPriceAction && "Y" == c.options.HideAddToCartButton)
          return e.addClass("aikon-view-product-button").text(c.options.LabelResultsViewProduct),
            "quick_view" == d ? !1 : e.prop("outerHTML");
        if (k && 0 < Math.abs(Number(b.quantity)) && ("Y" == c.isPriceAccessed(b) && "Y" == c.options.HideAddToCartButton || "N" == c.options.HideAddToCartButton)) {
          if (e.addClass("aikon-add-to-cart-button").text(c.options.LabelResultsAddToCart),
          "quick_view" == d)
            return !0
        } else if (e.addClass("aikon-view-product-button").text(c.options.LabelResultsViewProduct),
        "quick_view" == d)
          return !1;
        return e.prop("outerHTML")
      },
      isPriceAccessed: function (d) {
        var b = c.options.PriceAccess;
        if ("Y" == b) {
          var e = tags = [];
          c.options.HiddenPriceTags.length && (e = e.concat(c.options.HiddenPriceTags));
          c.options.UsergroupRulesHiddenPriceTags.length && (e = e.concat(c.options.UsergroupRulesHiddenPriceTags));
          e.length && (tags = "undefined" !== typeof d.tags ? d.tags.split("[:ATTR:]") : []);
          if (tags.length)
            for (var f in e)
              if ("" != e[f] && 0 <= a.inArray(e[f], tags)) {
                b = "N";
                break
              }
        }
        return b
      },
      renderDropdownSelectOptions: function (d, b) {
        var e = "";
        if (!a.isEmptyObject(d)) {
          var f = 1;
          a.each(d, function (d, h) {
            var g = "9q7S8y3L7V" == c.options.api_key;
            e += '<div class="' + (1 == h.length && g ? "aikon-size-select-box aikon-option-selector-text" : "aikon-option-selector-wrapper") + " aikon-option-count-" + h.length + '"><label for="aikon-option-' + b + "-" + f + '">' + c.escapeHTML(d) + "</label>";
            1 == h.length && g ? (e += '<span class="aikon-option aikon-option-other">' + c.escapeHTML(h[0]) + "</span>",
              e += '<input type="hidden" id="aikon-option-' + b + "-" + f + '" name="' + c.escapeHTML(d) + '" value="' + h[0] + '" />') : (e += '<select id="aikon-option-' + b + "-" + f + '" class="aikon-option aikon-option-other" name="' + c.escapeHTML(d) + '">',
              a.each(h, function (b, a) {
                e += '<option value="' + c.escapeHTML(a) + '">' + c.escapeHTML(a) + "</option>"
              }),
              e += "</select>");
            e += "</div>";
            f++
          })
        }
        return e
      },
      getProductLink: function (d) {
        var b = d.link;
        "shopify" == c.options.Platform && "undefined" !== typeof d.shopify_variants && a.each(d.shopify_variants, function (c, a) {
          "true" == a.relevant && (b = a.link)
        });
        return b
      },
      formatPrice: function (a) {
        a = c.numberFormat(a / c.options.PriceFormatRate / c.options.TaxRate, c.options.PriceFormatDecimals, c.options.PriceFormatDecimalSeparator, c.options.PriceFormatThousandsSeparator);
        "0c3F0i8I5m" == c.autocmp_params.api_key ? (a = a.split(c.options.PriceFormatDecimalSeparator),
          a[0] = '<span class="aikon-number-decmal">' + a[0] + "</span>",
          a[1] = '<span class="aikon-number-div">' + c.options.PriceFormatDecimalSeparator + a[1] + "</span>",
          a = '<span class="aikon-price-before">' + c.options.PriceFormatBefore + "</span>" + a.join("") + '<span class="aikon-price-after">' + c.options.PriceFormatAfter + "</span>") : a = c.options.PriceFormatBefore + a + c.options.PriceFormatAfter;
        return a
      },
      priceInfo: function (d) {
        var b = {};
        "undefined" !== typeof d.shopify_variants && d.shopify_variants.length && (b = d.shopify_variants,
        "from_min_to_max_available_variant" == c.options.PriceSource || "min_available_variant" == c.options.PriceSource || "from_min_available_variant" == c.options.PriceSource) && (b = b.filter(function (b) {
          return "0" != b.available
        }));
        b.length || (b = {
          0: {
            list_price: d.list_price,
            price: d.price
          }
        });
        var e = 0, f, k, h;
        a.each(b, function (b, a) {
          e++;
          var d = parseFloat(a.list_price)
            , g = parseFloat(a.price);
          d = 0 < d ? c.numberFormat((d - g) / d * 100) : 0;
          if ("undefined" == typeof f || f > g)
            f = g;
          if ("undefined" == typeof k || k < g)
            k = g;
          if ("undefined" == typeof h || parseInt(h) < parseInt(d))
            h = d
        });
        return {
          variant_number: e,
          is_ranged: f != k,
          min_price: f,
          max_price: k,
          max_discount: h
        }
      },
      numberFormat: function (a, b, c, f) {
        var d, e = "";
        0 > a ? (e = "-",
          a = -1 * (a - 0)) : a -= 0;
        "undefined" == typeof c && (c = ".");
        "undefined" == typeof f && (f = ",");
        var g = parseInt(a = (+a || 0).toFixed(b)) + "";
        var z = (d = 3 < (d = g.length) ? d % 3 : 0) ? g.substr(0, d) + f : "";
        f = g.substr(d).replace(/(\d{3})(?=\d)/g, "$1" + f);
        a = b ? c + Math.abs(a - g).toFixed(b).replace(/-/, 0).slice(2) : "";
        return e + z + f + a
      },
      getTagLabelHtmlByPosition: function (d, b) {
        var e = 0;
        if ("shopify" == c.options.Platform || "magento" == c.options.Platform) {
          var f = "undefined" !== typeof b.tags ? b.tags.split("[:ATTR:]") : [], k;
          for (k in c.options.ResultsTagLabels)
            if (0 <= a.inArray(c.options.ResultsTagLabels[k].product_tag, f) && c.options.ResultsTagLabels[k].position == d) {
              e = k;
              break
            }
        }
        return 0 < e ? c.render_tpl("image" == c.options.ResultsTagLabels[e].type ? c.options.ResultsTagLabelsImageHTML : c.options.ResultsTagLabelsTextHTML, c.options.ResultsTagLabels[e]) : ""
      },
      attach_ga_param: function (a, b) {
        return "Y" == c.options.UseGATrackParam && -1 === a.indexOf("?q=") ? a + "?q=" + encodeURIComponent(b) : a
      },
      render_tpl: function (d, b) {
        var g = d
          , f = c.options;
        g = b.list_price ? g.split("${list_price}").join(c.formatPrice(b.list_price)) : g.split("${list_price}").join("");
        g = g.split("${title}").join(b.title).split("${description}").join(b.description).split("${link}").join(b.link);
        if ("Y" == f.ReviewsShowRating && void 0 != b.reviews_average_score) {
          var k = 10 * Math.round(b.reviews_average_score / 5 * 100 / 10);
          g = g.split("${reviews_average_score_percent}").join(k).split("${total_reviews_text}").join(f.LabelAutocompleteNumReviews.split("[count]").join(b.total_reviews))
        }
        b.image_link ? (k = b.image_link,
        "3P3P5P3Y6k" == c.autocmp_params.api_key && (k = k.replace("_large.", "_300x300.")),
          g = g.split("${image_link}").join(k)) : g = g.split("${image_link}").join(f.ImageNotFound);
        "Y" == c.options.ResultsShowOptionVariants && b.shopify_variants && b.shopify_variants.length && ((k = b.shopify_variants[0].image_link) || (k = b.shopify_images && b.shopify_images.length ? b.shopify_images[0] : b.image_link || f.ImageNotFound),
          g = g.split("${results_image_link}").join(k));
        return g = g.replace("${price}", function () {
          var a = c.formatPrice(b.price);
          "6G4o6P8m1f" == c.autocmp_params.api_key && b.product_type && e.fqa && e.fqa.product && e.fqa.product[b.product_type] && e.fqa.product[b.product_type].unit_per_short && (a += '<span class="aikon-unit-per-short">' + e.fqa.product[b.product_type].unit_per_short + "</span>");
          return a
        }).replace("${image_alt}", function () {
          var a = "";
          b.image_link && (a = c.escapeHTML(b.title));
          return a
        }).replace("${results_link}", function () {
          return c.getProductLink(b)
        }).replace("${autocomplete_link}", function () {
          return c.getProductLink(b)
        }).replace("${aikon_price_with_discount_class}", function () {
          return parseFloat(b.list_price) > parseFloat(b.price) && (0 != b.price || "show_zero_price" == f.ResultsZeroPriceAction) && ("from_min_to_max_variant" != f.PriceSource && "from_min_to_max_available_variant" != f.PriceSource || !b.price_info.is_ranged) ? f.ResultsPriceWithDiscountClass : ""
        }).replace("${save_price_text_html}", function () {
          return "5I4W9m6S4G" == c.autocmp_params.api_key ? c.render_tpl(f.savePriceTextHTML, b) : ""
        }).replace("${extra_money_class}", function () {
          var b = ""
            , a = w("getHandedThemeName");
          "Y" == c.options.BestCurrencyConverter && (b += "best-currency-converter ");
          switch (a) {
            case "sunrise":
              b += "price-money ";
              break;
            case "canopy":
              b += "theme-money "
          }
          return b
        }).replace("${extra_money_attr}", function () {
          var b = "";
          switch (w("getHandedThemeName")) {
            case "trademark":
              b += 'data-money-convertible="" '
          }
          return b
        }).replace("${save_price_value_html}", function () {
          return "5I4W9m6S4G" == c.autocmp_params.api_key ? c.render_tpl(f.savePriceValueHTML, b) : ""
        }).replace("${save_price}", c.formatPrice(b.list_price - b.price)).replace("${autocomplete_prices_html}", function () {
          if ("Y" != f.AutocompleteShowPrice)
            return "";
          if ("Y" == c.isPriceAccessed(b)) {
            var d = c.render_tpl(f.AutocompletePricesHTML, b);
            if ("9o8d2w2I3O" == c.autocmp_params.api_key || "9E1N6v5G3r" == c.autocmp_params.api_key) {
              var e = b.shopify_variants && b.shopify_variants.length ? b.shopify_variants[0].variant_id : 0;
              d = a("<div />").html(d);
              a(".aikon-price", d).wrap(function () {
                return '<span class="aikon-price-data-wrapper" data-product-id="' + b.product_id + '" data-variant-id="' + e + '"></span>'
              });
              a(".aikon-discounted-price", d).wrap(function () {
                return '<span class="aikon-price-data-wrapper" data-product-id="' + b.product_id + '" data-variant-id="' + e + ':compare"></span>'
              });
              d = a(d).html()
            }
            return d
          }
          return f.emptyPriceHTML
        }).replace("${autocomplete_price_from_text_html}", function () {
          return "from_min_variant" != c.options.PriceSource && "from_min_available_variant" != c.options.PriceSource || !b.price_info.is_ranged ? "" : c.render_tpl(f.AutocompletePriceFromTextHTML, b)
        }).replace("${autocomplete_price_from_text}", f.LabelAutocompleteFrom).replace("${autocomplete_price_html}", function () {
          var a = "";
          "Y" == f.AutocompleteShowPrice && ("from_min_to_max_variant" != c.options.PriceSource && "from_min_to_max_available_variant" != c.options.PriceSource || !b.price_info.is_ranged ? 0 == b.price ? "show_custom_text" == f.AutocompleteZeroPriceAction ? a = c.render_tpl(f.AutocompleteZeroPriceTextHTML, b) : "hide_zero_price" != f.AutocompleteZeroPriceAction && (a = c.render_tpl(f.priceHTML, b)) : b.price && (a = c.render_tpl(f.priceHTML, b)) : a = c.render_tpl(f.priceHTML, {
            price: b.price_info.min_price
          }) + " - " + c.render_tpl(f.priceHTML, {
            price: b.price_info.max_price
          }),
            a = "" != a ? a : f.emptyPriceHTML);
          return a
        }).replace("${autocomplete_zero_price_text}", f.LabelAutocompleteZeroPriceText).replace("${results_prices_list_html}", function () {
          var d = "";
          if ("2K7C1q0w1b" == c.autocmp_params.api_key) {
            b.vendor && (d += '<span class="aikon-attribute aikon-attribute-vendor"><span class="aikon-attribute-title">by </span>' + b.vendor + "</span>");
            if (b.product_type) {
              var e = b.product_type.split(" ").map(Function.prototype.call, String.prototype.toLowerCase).join("-");
              d += '<span class="aikon-attribute aikon-attribute-product-type aikon-attribute-product-type-' + e + '"><span class="aikon-attribute-title"></span>' + b.product_type + "</span>"
            }
            e = b.shopify_variants ? b.shopify_variants.reduce(function (b, a) {
              return b + ("0" != a.available ? 1 : 0)
            }, 0) : 0;
            var g = !1;
            0 == e && (e = 1,
              g = !0);
            d += '<span class="aikon-attribute aikon-attribute-sizes-available">' + e + (1 < e ? '<span class="aikon-attribute-title"> Sizes available</span>' : '<span class="aikon-attribute-title"> Size available</span>') + "</span>";
            g && (d += '<span class="aikon-attribute-no-sizes"></span>')
          }
          if ("Y" == f.ResultsShowPrice && "Y" == c.isPriceAccessed(b) && (d += c.render_tpl(f.ResultsPricesListHTML, b),
          "9o8d2w2I3O" == c.autocmp_params.api_key || "9E1N6v5G3r" == c.autocmp_params.api_key)) {
            var k = b.shopify_variants && b.shopify_variants.length ? b.shopify_variants[0].variant_id : 0;
            d = a("<div />").html(d);
            a(".aikon-price", d).wrap(function () {
              return '<span class="aikon-price-data-wrapper" data-product-id="' + b.product_id + '" data-variant-id="' + k + '"></span>'
            });
            a(".aikon-discounted-price", d).wrap(function () {
              return '<span class="aikon-price-data-wrapper" data-product-id="' + b.product_id + '" data-variant-id="' + k + ':compare"></span>'
            });
            d = a(d).html()
          }
          return d
        }).replace("${results_prices_html}", function () {
          return c.render_tpl(f.ResultsPricesHTML, b)
        }).replace("${results_price_from_text_html}", function () {
          return "Y" == c.options.ResultsShowOptionVariants && b.shopify_variants && b.shopify_variants.length ? "" : "from_min_variant" != c.options.PriceSource && "from_min_available_variant" != c.options.PriceSource || !b.price_info.is_ranged ? "" : c.render_tpl(f.ResultsPriceFromTextHTML, b)
        }).replace("${results_price_from_text}", f.LabelResultsFrom).replace("${results_price_html}", function () {
          var a = "";
          "Y" == c.options.ResultsShowOptionVariants && b.shopify_variants && b.shopify_variants.length && (b.price = b.shopify_variants[0].price);
          "Y" == f.ResultsShowPrice && ("from_min_to_max_variant" != c.options.PriceSource && "from_min_to_max_available_variant" != c.options.PriceSource || !b.price_info.is_ranged || "N" != c.options.ResultsShowOptionVariants ? 0 == b.price ? "show_custom_text" == f.ResultsZeroPriceAction ? a = c.render_tpl(f.ResultsZeroPriceTextHTML, b) : "hide_zero_price" != f.ResultsZeroPriceAction && (a = c.render_tpl(f.priceHTML, b)) : b.price && (a = c.render_tpl(f.priceHTML, b)) : a = c.render_tpl(f.priceHTML, {
            price: b.price_info.min_price
          }) + " - " + c.render_tpl(f.priceHTML, {
            price: b.price_info.max_price
          }));
          return a
        }).replace("${results_zero_price_text}", f.LabelResultsZeroPriceText).replace("${results_in_stock_status_class}", function () {
          var a = "aikon-out-of-stock"
            , d = Number(b.quantity);
          if ("Y" == c.options.ResultsShowOptionVariants && b.shopify_variants && b.shopify_variants.length) {
            if ("0" == b.shopify_variants[0].available)
              return a;
            if ("-1" == b.shopify_variants[0].available)
              return "aikon-pre-order"
          }
          0 < d ? a = "aikon-in-stock" : -1 == d && (a = "aikon-pre-order");
          return a
        }).replace("${autocomplete_in_stock_status_class}", function () {
          var a = "aikon-out-of-stock"
            , c = Number(b.quantity);
          0 < c ? a = "aikon-in-stock" : -1 == c && (a = "aikon-pre-order");
          return a
        }).replace("${autocomplete_in_stock_status_text}", function () {
          var a = f.LabelAutocompleteOutOfStock
            , c = Number(b.quantity);
          0 < c ? a = f.LabelAutocompleteInStock : -1 == c && (a = f.LabelAutocompletePreOrder);
          return a
        }).replace("${results_in_stock_status_text}", function () {
          var a = f.LabelResultsOutOfStock
            , d = Number(b.quantity);
          if ("Y" == c.options.ResultsShowOptionVariants && b.shopify_variants && b.shopify_variants.length) {
            if ("0" == b.shopify_variants[0].available)
              return a;
            if ("-1" == b.shopify_variants[0].available)
              return f.LabelResultsPreOrder
          }
          0 < d ? a = f.LabelResultsInStock : -1 == d && (a = f.LabelResultsPreOrder);
          return a
        }).replace("${action_button_html}", function () {
          return "N" != f.ResultsShowActionButton ? c.renderProductActionButton("results", b) : ""
        }).replace("${recommendation_action_button_html}", function () {
          return "N" != f.RecommendationShowActionButton ? c.renderProductActionButton("recommendations", b) : ""
        }).replace("${autocomplete_in_stock_status_html}", function () {
          return "Y" == f.AutocompleteShowInStockStatus ? c.render_tpl(f.AutocompleteInStockStatusHTML, b) : ""
        }).replace("${autocomplete_product_code_html}", function () {
          return "Y" == f.AutocompleteShowProductCode && "" != a.trim(b.product_code || "") ? c.render_tpl(f.AutocompleteProductCodeHTML, b) : ""
        }).replace("${results_product_code_html}", function () {
          return "Y" == f.ResultsShowProductCode && "" != a.trim(b.product_code || b.sku || "") ? c.render_tpl(f.ResultsProductCodeHTML, b) : ""
        }).replace("${autocomplete_product_code_text}", function () {
          var c = b.product_code || "";
          a.trim(f.LabelAutocompleteSku) && (c = f.LabelAutocompleteSku + ": " + a.trim(c));
          return c
        }).replace("${results_product_code_text}", function () {
          var c = b.product_code || b.sku || "";
          a.trim(f.LabelResultsSku) && "" != a.trim(c) && (c = f.LabelResultsSku + ": " + a.trim(c));
          return c
        }).replace("${autocomplete_product_attribute_html}", function () {
          return "7G0u5P1x7F" == c.autocmp_params.api_key && "quantity" == f.AutocompleteProductAttributeName && -1 == b[f.AutocompleteProductAttributeName] ? 0 : f.AutocompleteProductAttributeName && b[f.AutocompleteProductAttributeName] ? c.render_tpl(f.AutocompleteProductAttributeHTML, b) : ""
        }).replace("${autocomplete_product_attribute_text}", function () {
          return b[f.AutocompleteProductAttributeName] ? c.escapeHTML(b[f.AutocompleteProductAttributeName]).split("[:ATTR:]").join(", ") : ""
        }).replace("${autocomplete_product_attribute_title}", function () {
          return f.LabelAutocompleteProductAttributeTitle ? f.LabelAutocompleteProductAttributeTitle + ":" : ""
        }).replace("${results_product_attribute_html}", function () {
          return f.ResultsProductAttributeName && b[f.ResultsProductAttributeName] ? c.render_tpl(f.ResultsProductAttributeHTML, b) : ""
        }).replace("${results_color_swatches_html}", function () {
          if ("shopify" == f.Platform && b.shopify_variants && b.shopify_variants.length) {
            var d = ""
              , e = []
              , g = b.shopify_variants.filter(function (a) {
              return a.color_code
            }).length;
            a.each(b.shopify_variants, function (a, f) {
              f.option_color && 0 < g && g != b.shopify_variants.length && (f.color_code = "");
              if (f.color_code) {
                var h = f.options[f.option_color];
                e.some(function (a) {
                  return a.color === h
                }) || e.push({
                  color: h,
                  code: f.color_code,
                  vid: f.variant_id
                });
                d || (d = '<input type="hidden" name="' + c.escapeHTML(f.option_color) + '" value="' + c.escapeHTML(h) + '" class="aikon-option aikon-option-color">')
              }
            });
            if (0 < e.length)
              for (var k in e)
                if (e.hasOwnProperty(k)) {
                  var l = 0 == k ? "aikon-color-swatch-active" : ""
                    , n = ""
                    , m = "";
                  "*" == e[k].code ? n = "icon-multicolor" : "#" == e[k].code ? n = "icon-clear" : m = "background-color: #" + e[k].code + ";";
                  d += '<div class="aikon-color-swatch ' + l + '" data-value="' + c.escapeHTML(e[k].color) + '" data-sntooltip="' + c.escapeHTML(e[k].color) + '"><span class="' + n + '" style="' + m + '"></span></div>'
                }
            return '<div class="aikon-color-swatch-box aikon-option-count-' + e.length + '">' + d + "</div>"
          }
          return ""
        }).replace("${results_size_squares_html}", function () {
          if ("shopify" == f.Platform && b.shopify_variants && b.shopify_variants.length) {
            var d = ""
              , e = [];
            a.each(b.shopify_variants, function (b, f) {
              f.option_size && (-1 == a.inArray(f.options[f.option_size], e) && e.push(f.options[f.option_size]),
              d || (d = '<input type="hidden" name="' + c.escapeHTML(f.option_size) + '" value="' + c.escapeHTML(f.options[f.option_size]) + '" class="aikon-option aikon-option-size">'))
            });
            if (0 < e.length)
              for (var g = 0; g < e.length; g++)
                d += '<div class="aikon-size ' + (0 == g ? "aikon-size-active" : "") + '" data-value="' + c.escapeHTML(e[g]) + '">' + c.escapeHTML(e[g]) + "</div>";
            return '<div class="aikon-size-select-box aikon-option-count-' + e.length + '">' + d + "</div>"
          }
          return ""
        }).replace("${results_other_options_html}", function () {
          if ("shopify" == f.Platform && b.shopify_variants && b.shopify_variants.length) {
            var d = {}
              , e = "";
            a.each(b.shopify_variants, function (b, c) {
              c.options_other && c.options_other.length && a.each(c.options_other, function (a, b) {
                "undefined" === typeof d[b] && (d[b] = []);
                -1 == d[b].indexOf(c.options[b]) && d[b].push(c.options[b])
              })
            });
            e = c.renderDropdownSelectOptions(d, b.product_id);
            return '<div class="aikon-simple-options-box">' + e + "</div>"
          }
          return ""
        }).replace("${results_unmapped_colors_html}", function () {
          if ("shopify" == f.Platform && b.shopify_variants && b.shopify_variants.length) {
            var d = {}
              , e = "";
            a.each(b.shopify_variants, function (a, b) {
              if (!b.color_code && b.option_color) {
                var c = b.option_color;
                "undefined" === typeof d[c] && (d[c] = []);
                -1 == d[c].indexOf(b.options[c]) && d[c].push(b.options[c])
              }
            });
            e = c.renderDropdownSelectOptions(d, b.product_id);
            return '<div class="aikon-simple-options-box aikon-unmapped-colors-box">' + e + "</div>"
          }
          return ""
        }).replace("${results_product_attribute_text}", function () {
          return "7G0u5P1x7F" == c.result_params.api_key && "quantity" == f.ResultsProductAttributeName && -1 == b[f.ResultsProductAttributeName] ? 0 : b[f.ResultsProductAttributeName] ? c.escapeHTML(b[f.ResultsProductAttributeName]).split("[:ATTR:]").join(", ") : ""
        }).replace("${results_product_attribute_title}", function () {
          return f.LabelResultsProductAttributeTitle ? f.LabelResultsProductAttributeTitle + ":" : ""
        }).replace("${autocomplete_list_price_html}", function () {
          var d = 0;
          if ("shopify" == f.Platform || "magento" == f.Platform) {
            var e = "undefined" !== typeof b.tags ? b.tags.split("[:ATTR:]") : [], g;
            for (g in f.AutocompleteTagLabels)
              if (0 <= a.inArray(f.AutocompleteTagLabels[g].product_tag, e)) {
                d = g;
                break
              }
          }
          e = "";
          0 < d && (e += c.render_tpl(f.AutocompleteTagLabelsTextHTML, f.AutocompleteTagLabels[d]));
          "Y" == f.AutocompleteProductDiscountLabelShow && f.LabelAutocompleteProductDiscountText.length && parseFloat(b.list_price) > parseFloat(b.price) ? e += c.render_tpl(f.ProductDiscountLabelHTML, b) : "Y" == f.AutocompleteShowPrice && "Y" == f.AutocompleteShowListPrice && parseFloat(b.list_price) > parseFloat(b.price) && (0 == b.price && "show_zero_price" != f.AutocompleteZeroPriceAction || ("from_min_to_max_variant" == c.options.PriceSource || "from_min_to_max_available_variant" == c.options.PriceSource) && b.price_info.is_ranged || (e += c.render_tpl(f.listPriceHTML, b) + c.render_tpl(f.savePriceHTML, b)));
          return e
        }).split("${autocomplete_tag_label_bgcolor}").join(b.bg_color).replace("${autocomplete_tag_label_text}", b.text).replace("${product_discount_label_bgcolor}", f.ProductDiscountBgcolor).replace("${product_discount_label_text}", function () {
          return f.LabelAutocompleteProductDiscountText.split("[discount]").join(b.price_info.max_discount)
        }).replace("${results_list_price_html}", function () {
          "Y" == c.options.ResultsShowOptionVariants && b.shopify_variants && b.shopify_variants.length && (b.price = b.shopify_variants[0].price,
            b.list_price = b.shopify_variants[0].list_price);
          if ("Y" == f.ResultsShowPrice && "Y" == f.ResultsShowListPrice && parseFloat(b.list_price) > parseFloat(b.price))
            if ("Y" == c.options.ResultsShowOptionVariants) {
              if (0 != b.price || "show_zero_price" == f.ResultsZeroPriceAction)
                return c.render_tpl(f.listPriceHTML, b) + c.render_tpl(f.savePriceHTML, b)
            } else if ((0 != b.price || "show_zero_price" == f.ResultsZeroPriceAction) && ("from_min_to_max_variant" != c.options.PriceSource && "from_min_to_max_available_variant" != c.options.PriceSource || !b.price_info.is_ranged))
              return c.render_tpl(f.listPriceHTML, b) + c.render_tpl(f.savePriceHTML, b);
          return ""
        }).replace("${flip_image_html}", function () {
          var a = "";
          "Y" == f.ResultsFlipImageOnHover && (b.shopify_images && 1 < b.shopify_images.length ? (a = b.shopify_images[1],
          "3P3P5P3Y6k" == c.autocmp_params.api_key && (a = a.replace("_large.", "_300x300."))) : b.bigcommerce_images && 1 < b.bigcommerce_images.length && (a = b.bigcommerce_images[1]));
          return a ? '<img src="' + a + '" class="aikon-item-image aikon-flip-image" border="0">' : ""
        }).replace("${results_category_image_html}", function () {
          return "Y" == f.ResultsShowCategoryImages && b.image_link ? c.render_tpl(f.ResultsCategoryImageHTML, b) : ""
        }).replace("${results_page_image_html}", function () {
          return "Y" == f.ResultsShowPageImages && b.image_link ? c.render_tpl(f.ResultsPageImageHTML, b) : ""
        }).replace("${results_product_top_left_label_html}", function () {
          if ("shopify" == f.Platform && "Y" == f.BoldProductDiscountSupport) {
            var d = "undefined" !== typeof b.tags ? b.tags.split("[:ATTR:]") : [];
            if (f.BoldProductDiscountTag.length && 0 <= a.inArray(f.BoldProductDiscountTag, d))
              return f.ResultsBoldProductDiscountIconHTML
          } else {
            d = c.getTagLabelHtmlByPosition("top-left", b);
            if ("" != d)
              return d;
            if ("Y" == f.ResultsShowProductDiscountLabel && f.LabelResultsProductDiscountText.length && parseFloat(b.list_price) > parseFloat(b.price))
              return c.render_tpl(f.ResultsProductDiscountLabelHTML, b)
          }
          return ""
        }).replace("${results_product_top_right_label_html}", function () {
          return "Y" == f.ResultsShowInStockStatus ? c.render_tpl(f.ResultsInStockStatusHTML, b) : c.getTagLabelHtmlByPosition("top-right", b)
        }).replace("${results_product_down_left_label_html}", function () {
          return "7w8Z1e2S0i" == c.autocmp_params.api_key && b.hasOwnProperty("polarized") && "Y" == b.polarized ? c.render_tpl(c.options.ResultsTagLabelsTextHTML, {
            text: "Polarized",
            bg_color: "transparent",
            position: "down-left"
          }) : c.getTagLabelHtmlByPosition("down-left", b)
        }).replace("${results_product_down_right_label_html}", function () {
          return "7w8Z1e2S0i" == c.autocmp_params.api_key && b.hasOwnProperty("fitment") ? c.render_tpl(c.options.ResultsTagLabelsTextHTML, {
            text: b.fitment,
            bg_color: "transparent",
            position: "down-right"
          }) : c.getTagLabelHtmlByPosition("down-right", b)
        }).replace("${results_label_position}", b.position).replace("${results_tag_label_arrow_class}", function () {
          return "top-right" == b.position || "down-right" == b.position ? "aikon-left-arrow" : "aikon-right-arrow"
        }).split("${results_tag_label_bgcolor}").join(b.bg_color).replace("${results_tag_label_text}", b.text).replace("${results_tag_label_image}", function () {
          var a = "";
          "new" == b.image_type ? a = c.paths.tag_label_new_image_url : "sale" == b.image_type ? a = c.paths.tag_label_sale_image_url : "custom" == b.image_type && b.image_url.length && (a = b.image_url);
          return a.length ? '<img src="' + a + '" />' : ""
        }).replace("${results_product_discount_label_bgcolor}", f.ResultsProductDiscountBgcolor).replace("${results_product_discount_label_text}", function () {
          return f.LabelResultsProductDiscountText.split("[discount]").join(b.price_info.max_discount)
        }).replace("${results_show_top_right_label_class}", function () {
          return "Y" == f.ResultsShowInStockStatus ? f.ResultsStockStatusShowedClass : "" != c.getTagLabelHtmlByPosition("top-right", b) ? f.ResultsTopRightLabelShowedClass : ""
        }).replace("${results_wishlist_button_html}", function () {
          if ("shopify" == f.Platform) {
            if ("Y" == f.AppmateWishlistKingSupport)
              return c.render_tpl(f.AppmateWishlistKingButtonHtml, b);
            if ("Y" == f.SwymCorporationWishlistPlusSupport)
              return c.render_tpl(f.SwymCorporationWishlistPlusHtml, b);
            if ("Y" == f.GrowaveWishlistSupport)
              return c.render_tpl(f.GrowaveWishlistHtml, b)
          }
          return ""
        }).replace("${product_compare_html}", function () {
          if (f.ProductCompareEnabled === 'Y') {
            return c.render_tpl(f.ProductCompareHtml, b);
          }
          return "";
        }).replace(/\${first_variant_id}/g, b.add_to_cart_id
        ).replace("${swym_corporation_wishlist_plus_product_data}", function () {
          var a = {
            du: b.link,
            dt: c.escapeHTML(b.title),
            epi: b.add_to_cart_id,
            empi: b.product_id,
            iu: b.image_link,
            pr: b.price
          };
          return JSON.stringify(a)
        }).replace(/\${product_id}/g, b.product_id).replace("${category_id}", b.category_id).replace("${page_id}", b.page_id).replace("${reviews_html}", function () {
          return "Y" == f.ReviewsShowRating ? c.render_tpl(f.reviewsHTML, b) : ""
        }).replace("${reviews_content_html}", function () {
          return 0 < b.total_reviews ? c.render_tpl(f.reviewsContentHTML, b) : ""
        })
      },
      param: function (d) {
        var b, e = [], f = function (b, d) {
          d = a.isFunction(d) ? d() : null == d ? "" : d;
          e[e.length] = c.fixedEncodeURIComponent(b) + "=" + c.fixedEncodeURIComponent(d)
        };
        for (b in d)
          c.buildParams(b, d[b], f);
        return e.join("&")
      },
      buildParams: function (a, b, e) {
        var d;
        if ("object" === typeof b)
          for (d in b)
            c.buildParams(a + "[" + d + "]", b[d], e);
        else
          e(a, b)
      },
      processRequest: function (d, b, e, f) {
        var g = d + (-1 === d.indexOf("?") ? "?" : "&") + c.param(b);
        if ("function" == typeof e && "object" == typeof c.cache[g])
          e(c.cache[g]);
        else if (d = a.getJSON(g, function (b) {
          "function" == typeof e && (clearTimeout(h),
            b.suggestions = b.suggestions || [],
            b.items = b.items || [],
          "links" == c.options.ResultsUseAsNavigation && b.categories && a.each(b.categories, function (a) {
            b.categories[a].link = b.categories[a].link.replace("/collections/", "/pages/search-results?collection=")
          }),
            c.cache[g] = b,
            e(b))
        }),
        "function" == typeof f) {
          "undefined" != typeof d && "function" == typeof d.fail && d.fail(function () {
            clearTimeout(h);
            f()
          });
          var h = setTimeout(function () {
            f()
          }, 1E3 * c.options.Search.timeout)
        }
      },
      escapeFacetValue: function (a) {
        processedValue = c.unescapeFacetValue(a);
        return processedValue = processedValue.replace(/\|/g, "\\|").replace(/,/g, "\\,")
      },
      unescapeFacetValue: function (a) {
        return processedValue = a.replace("\\|", "|").replace("\\,", ",")
      },
      escapeHTML: function (a) {
        var b = {
          '"': "&quot;",
          "'": "&#39;",
          "/": "&#47;",
          "<": "&lt;",
          ">": "&gt;"
        };
        return a.replace(/["'\/<>]/g, function (a) {
          return b[a]
        })
      },
      fixedEncodeURIComponent: function (a) {
        return encodeURIComponent(a).replace(/%20/g, "+")
      },
      parseHref: function (c) {
        var b = document.createElement("a");
        b.href = c;
        c = [];
        var d = {}
          , f = "";
        b.pathname && (c = b.pathname.split("/").filter(Boolean));
        if (0 === b.search.indexOf("?")) {
          var k = b.search.substr(1).split("&");
          a.each(k, function (a) {
            a = k[a].split("=");
            d[a[0]] = decodeURI(a[1])
          })
        }
        e.langify && e.langify.locale && e.langify.locale.iso_code && c[0] && c[0].toLowerCase() === e.langify.locale.iso_code.toLowerCase() && (f = e.langify.locale.iso_code);
        return {
          protocol: b.protocol,
          host: b.host,
          hostname: b.hostname,
          port: b.port,
          path_parts: c,
          search: d,
          hash: b.hash,
          lang_code: f
        }
      },
      collectionHrefData: function (d, b) {
        var g = {};
        if (!d.length)
          return g;
        var f = c.parseHref(d)
          , k = f.path_parts;
        if ("Y" == c.options.LangifySupport && e.langify && e.langify.helper) {
          var h = a("html").prop("lang");
          "" == h && (h = e.langify.helper.getSelectedLanguage());
          h == f.lang_code && (k = k.slice(1))
        }
        if ("shopify" == c.options.Platform && "collections" == k[0]) {
          if ("products" == k[2])
            return g;
          var N = {
            all: "rb_tags",
            types: "rb_product_type",
            vendors: "rb_vendor"
          }
            , z = h = "all";
          g = [];
          var L = k[k.length - 1];
          1 < k.length && 0 < a.inArray(L, Object.keys(N)) && (z = L);
          k[1] && 0 > a.inArray(k[1], Object.keys(N)) && (h = k[1]);
          f.search.q ? "templates" == c.options.ResultsUseAsNavigation ? g.push(N[z] + "=" + decodeURIComponent(f.search.q)) : g.push(N[z] + "=" + f.search.q) : k[2] && (f = "",
            "templates" == c.options.ResultsUseAsNavigation ? f = decodeURIComponent(L) : "object" == typeof b && (f = c.fixedEncodeURIComponent(b.text().trim())),
          0 < f.length && (L = f.split("-").join(" "),
            g.push("rb_tags=" + (f != L ? f + "|" + L : f))));
          g = {
            collection: h,
            query_string_parts: g
          }
        }
        "bigcommerce" == c.options.Platform && "search-results" != k[0] && (k = location.protocol + "//" + location.host + location.pathname,
          g = [],
          g = {
            category: k,
            query_string_parts: g
          });
        return g
      },
      isCollectionPage: function (a) {
        a = c.collectionHrefData(a);
        return 0 < Object.keys(a).length
      },
      triggerEvent: function (c, b) {
        "undefined" !== typeof e.jQuery && e.jQuery(document).trigger(c, b);
        a(document).trigger(c, b)
      },
      parseCollectionHref: function (a) {
        return -1 == a.indexOf("collections") || /^.*collections\/.+\/products\/.+$/g.test(a) ? null : /^.*collections\/([^\/\?]+)[\/]*([^\/\?]*).*$/g.exec(a)
      },
      getRecentSearches: function () {
        var a = Commerceinstruments.GetLocalStorage("aikon-recent") || "";
        return a.length ? a.split(":|||:") : []
      },
      updateRecentSearches: function (a) {
        if (a && 0 != a.length) {
          a = a.toLowerCase();
          for (var b = c.getRecentSearches(), d = 0; d < b.length; d++)
            if (b[d] == a)
              return;
          b.push(a);
          12 < b.length && b.shift();
          b = b.join(":|||:");
          Commerceinstruments.SetLocalStorage("aikon-recent", b)
        }
      },
      generateUserID: function () {
        return (new Date).getTime()
      },
      makeDidYouMeanHTML: function (d, b, e) {
        if (!d.length)
          return "";
        var f = []
          , g = "";
        a.each(d, function (a, d) {
          d != b && "" != d && f.push('<a class="aikon-no-products-found-link" href="#" data-no-instant="true">' + c.escapeHTML(d) + "</a>")
        });
        f.length && (g = "autocomplete" == e ? "classic" != c.options.AutocompleteLayout ? c.options.LabelAutocompleteDidYouMean.split("[suggestions]").join("<br/>" + f.join("")) : f.length ? c.options.LabelAutocompleteDidYouMean.split("[suggestions]").join(f.join(", ")) : "" : f.length ? c.options.LabelResultsDidYouMean.split("[suggestions]").join(f.join(", ")) : "");
        return g
      },
      makePopularSuggestionsHTML: function (a) {
        if (!(Commerceinstruments.preloadedSuggestions && 5 <= Commerceinstruments.preloadedSuggestions.length))
          return "";
        for (var b = [], d = 5 > Commerceinstruments.preloadedSuggestions.length ? Commerceinstruments.preloadedSuggestions.length : 5, e = 0; e < d; e++) {
          var k = Commerceinstruments.preloadedSuggestions[e];
          k != a && "" != k && b.push('<a class="aikon-no-products-found-link" href="#" data-no-instant="true">' + c.escapeHTML(k) + "</a>")
        }
        a = "";
        b.length && (a += c.options.LabelAutocompletePopularSuggestions.split("[suggestions]").join('<div class="aikon-popular-suggestions-container">' + b.join("") + "</div>"));
        return a
      },
      start: function () {
        "N" == c.options.IsAdmin && "Y" == c.options.ShowPriceOnlyForLoggedCustomer && ("bigcommerce" == c.options.Platform && ea(function (a) {
          a || (c.options.PriceAccess = "N")
        }),
        "shopify" == c.options.Platform && 0 == w("getCustomerId") && (c.options.PriceAccess = "N"));
        if ("bigcommerce" == c.options.Platform && !a.isEmptyObject(c.options.Currencies)) {
          var d = a('a[href*="setCurrencyId="] > strong').eq(0).parent();
          d.length && (d = /setCurrencyId=(\d+)/.exec(d.attr("href"))) && (d = d[1],
          c.options.Currencies[d] && a.extend(c.options, c.options.Currencies[d]))
        }
        "shopify" != c.options.Platform && "magento" != c.options.Platform || "Y" != c.options.WidgetsEnabled || fa();
        "NONE" == c.options.AutocompleteStyle && (c.options.AutocompleteShow = "N");
        if ("vegansupplyco.club" != e.location.hostname && "N" != c.options.WidgetsEnabled) {
          "undefined" !== typeof CommerceinstrumentsCustomerTags && CommerceinstrumentsCustomerTags.length && (c.options.CommerceinstrumentsCustomerTags = CommerceinstrumentsCustomerTags);
          (c.options.ColorsCSS || c.options.CustomCSS || c.options.RecommendationCustomCSS) && a('link[href="' + c.paths.style + "?version=" +  c.version + '"]').after('<style type="text/css">' + c.options.ColorsCSS + c.options.CustomCSS + c.options.RecommendationCustomCSS + "</style>");
          "Y" == c.options.PersonalizationEnabled && Commerceinstruments.ProcessPersonalization();
          if ("Y" == c.options.LangifySupport && e.langify && e.langify.helper) {
            var b = d = "";
            "undefined" !== typeof e.langify.locale ? (d = e.langify.locale.language_id,
            "/" !== e.langify.locale.root_url && (b = e.langify.locale.root_url,
              c.options.ResultsFormPath = b + c.options.ResultsFormPath)) : d = e.langify.helper.getSelectedLanguage();
            c.autocmp_params.translationLanguage = c.result_params.translationLanguage = d;
            c.autocmp_params.translationUrl = c.result_params.translationUrl = e.location.hostname + b;
            if (d != c.options.LangifyDefaultLanguage && c.options.Translations[d])
              for (var g in c.options.Translations[d])
                c.options[g] = c.options.Translations[d][g]
          }
          "string" == typeof c.options.HiddenPriceTags && (c.options.HiddenPriceTags = c.options.HiddenPriceTags.split(",").map(function (a) {
            return a.trim()
          }));
          "Y" == c.options.EnableShopifyMultiCurrency && w("isNativeMulticurrencyEnabled") && (c.options.AppSupportCoin = "N",
            c.options.BestCurrencyConverter = "N",
            c.options.BoldMultiCurrency = "N",
            w("setCurrentMoneyFormat"));
          g = c.searchInputs = a(c.options.SearchInput).not(".aikon-exclude-input").filter(function () {
            var b = a(this).parents("form:first");
            return !b.find('input[name="type"][value="page"]').length && !b.find('input[name="type"][value="article"]').length
          });
          "Y" == c.options.AutocompleteShow && "Y" == c.options.WidgetsEnabled && (("Y" == c.options.StickySearchboxShow || "auto" == c.options.StickySearchboxShow && !g.length) && "Y" == c.options.ResultsShow && c.options.ResultsFormPath && (d = e.location.href,
            b = ~d.indexOf("/checkouts/") || ~d.indexOf("/checkout/") || ~d.indexOf("/orders/") || ~d.indexOf("/password"),
          "magento" == c.options.Platform && (b |= ~d.indexOf("catalog/product_compare")),
          b || K() && "Y" != c.options.AutocompleteShowMobileWidget || (d = new StickySearchbox("sticky-searchbox"),
            d.build(),
            c.stickySearchInput = d.getSearchInput().get(0),
            g.push(c.stickySearchInput))),
          g.length && ("Y" == c.options.BoldMultiCurrency && setTimeout(function () {
            "undefined" !== typeof BOLDCURRENCY && BOLDCURRENCY.converter && "function" === typeof BOLDCURRENCY.converter.enableAggressiveRefresh && BOLDCURRENCY.converter.enableAggressiveRefresh()
          }),
            a.each(g, function (b, d) {
              d = a(d);
              d.data("autocompleter", new aa(d, c.options));
              !c.options.LabelAutocompleteSearchInputPlaceholder || c.stickySearchInput && d.is(c.stickySearchInput) || (d.attr("placeholder", c.options.LabelAutocompleteSearchInputPlaceholder),
              d.hasClass("cm-hint") && (d.attr("title", c.options.LabelAutocompleteSearchInputPlaceholder),
                d.val(c.options.LabelAutocompleteSearchInputPlaceholder)))
            })),
          e.Shopify && e.Shopify.theme && c.hideThemeLiveSearch());
          if (g.length && (a.each(g, function (b, d) {
            d = a(d);
            var f = d.parents("form:first");
            f.length && f.bind("submit.autocomplete", function (b) {
              var g = d.data("autocompleter");
              g = g && g.select && g.select.getSearchData() || {};
              g.s_sgstn && (c.suggestionClicked || "Y" == c.options.AutoSpellCorrection) && (c.suggestionClicked && "undefined" != typeof d.attr("name") && 0 === d.attr("name").indexOf("hint_") && d.attr("name", d.attr("name").substr(5)),
                c.suggestionClicked = !1,
                g.query = g.s_sgstn,
                d.val(g.s_sgstn));
              l("aikon_search_data", JSON.stringify(g), {
                expires: 120,
                path: "/",
                domain: document.domain
              }, !0);
              if (c.checkAndRedirect(a.trim(d.val())))
                return b.stopImmediatePropagation(),
                  !1;
              if ("Y" == c.options.ResultsShow && "Y" == c.options.WidgetsEnabled)
                if ("Y" == c.options.demoMode)
                  b.preventDefault(),
                    c.updateSearchStats(),
                    c.searchResults.search({
                      q: d.val(),
                      page: 1,
                      restrictBy: {}
                    });
                else if (c.options.ResultsFormPath) {
                  b.stopImmediatePropagation();
                  b = c.fixedEncodeURIComponent(d.val());
                  g = f.find("input[name=se_tab]").val();
                  var h = c.options.ResultsFormPath;
                  e.location = h + (-1 === h.indexOf("?") ? "?" : "&") + "q=" + b + (g ? "&tab=" + g : "");
                  return !1
                }
            })
          }),
            c.updateSearchStats(),
            Commerceinstruments.AdditionalSearchInputs)) {
            var f = Commerceinstruments.AdditionalSearchInputs.split(",");
            f.length && a(f[0]).parents("form:first").bind("submit.autocomplete", function (b) {
              var d = a(f[0]).data("autocompleter")
                , e = d && d.select && d.select.getSearchData() || {};
              e.query = "";
              a.each(f, function (b, c) {
                e.query += " " + a(c).val()
              });
              l("aikon_search_data", JSON.stringify(e), {
                expires: 120,
                path: "/",
                domain: document.domain
              }, !0);
              if (c.checkAndRedirect(a.trim(e.query)))
                return b.stopImmediatePropagation(),
                  !1
            })
          }
          "links" == c.options.ResultsUseAsNavigation && a("a:not(.aikon-exclude-link)").each(function () {
            var b = a(this).attr("href") || "";
            b = c.collectionHrefData(b, a(this));
            if (0 < Object.keys(b).length) {
              var d = "/pages/search-results?collection=" + b.collection;
              b.query_string_parts.length && (d += "&" + b.query_string_parts.join("&"));
              a(this).attr("href", d)
            }
          });
          a(document).delegate("a.aikon-send-no-results", "click touch", function (b) {
            c.options.AutocompleteLastNoResultQuery && a.ajax({
              url: c.paths.analytics_url,
              contentType: "application/json; charset=utf-8",
              type: "post",
              dataType: "json",
              data: JSON.stringify({
                api_key: c.autocmp_params.api_key,
                no_results_data: {
                  q: c.options.AutocompleteLastNoResultQuery
                }
              })
            });
            return !0
          });
          c.ResultsDiv = a(c.options.ResultsDiv);
          if (c.options.StoreName === "sl-test-v19" && c.ResultsDiv.length > 0 && c.isCollectionPage(e.location.href)) {
            var filterSelector = '.filters-toolbar-wrapper.filters-toolbar--has-filter';
            var productWrapperSelector = '#Collection';
            a(filterSelector).hide();
            a(productWrapperSelector).empty();
            c.ResultsDiv.detach().appendTo(productWrapperSelector)
          }
          if ("Y" == c.options.ResultsShow && "Y" == c.options.WidgetsEnabled && c.ResultsDiv.length) {
            this.searchResults = p(c.ResultsDiv, c.options);
            this.searchResults.start();
            var k = this;
            Commerceinstruments.history.init(function () {
              k.searchResults.search()
            }, {
              unescape: !0
            });
            "shopify" == c.options.Platform && "Y" == c.options.SwymCorporationWishlistPlusSupport && ma();
            "shopify" === c.options.Platform && "Y" === c.options.ProductCompareEnabled && invokeProductCompare();
          }
          "5Z4o3T5V8y" == c.autocmp_params.api_key && c.allowTextSelect()
        }
      },
      convertNativePickerMoney: function () {
        var d = w("getHandedThemeName");
        if (("Y" != c.options.EnableShopifyMultiCurrency || !w("isNativeMulticurrencyEnabled")) && d && -1 !== "empire showtime sunrise blockshop flow pacific kagami trademark retina responsive mobilia parallax venue canopy".split(" ").indexOf(d))
          if (e.Currency && e.Currency.convertAll) {
            var b = e.shopCurrency ? e.shopCurrency : ""
              , g = e.Currency.currentCurrency ? e.Currency.currentCurrency : "";
            switch (d) {
              case "pacific":
                e.Shop && e.Shop.defaultCurrency && (b = e.Shop.defaultCurrency,
                  g = a("[data-currency-converter]").val());
                break;
              case "responsive":
                g = a("#currencies").val();
                break;
              case "flow":
                b = e.Currency.shopCurrency;
                break;
              case "kagami":
                e.shop && e.shop.shopCurrency && (b = e.shop.shopCurrency);
                break;
              case "trademark":
                e.theme && e.theme.shopCurrency && (b = e.theme.shopCurrency)
            }
            b && g && e.Currency.convertAll(b, g)
          } else
            switch (d) {
              case "empire":
                e.$ && e.$("[data-currency-converter]").trigger("change");
                break;
              case "sunrise":
                e.Sunrise && e.Sunrise.doCurrency();
                break;
              case "blockshop":
                try {
                  e.theme.classes.FrameworkCart.prototype.updateCurrencies()
                } catch (f) {
                }
            }
      },
      hideThemeLiveSearch: function () {
        var c = w("getHandedThemeName");
        if (c) {
          var b = {
            local: ".search--results",
            prestige: ".Search__Results",
            boost: ".search-bar__results",
            warehouse: ".search-bar__inner",
            symmetry: ".search-form .results-box",
            atlantic: ".ls-results",
            pacific: ".livesearch-results",
            "palo alto": ".nav-search #search-results"
          };
          -1 !== "debut;empire;showtime;impulse;motion;blockshop;trademark;split;expression;kagami;flow;local;prestige;boost;warehouse;symmetry;atlantic;pacific;palo alto".split(";").indexOf(c) && ("debut" === c ? e.theme && e.theme.SearchHeader && e.theme.SearchHeader.unload && (e.theme.SearchHeader.unload(),
            a("input.aikon-input-style").attr("autocomplete", "off")) : (e.$ && e.$("input.aikon-input-style").off(),
          e.jQuery && e.jQuery("input.aikon-input-style").off()),
          b[c] && a(b[c]).length && ("pacific" === c ? a(b[c]).css("visibility", "hidden") : a(b[c]).hide()))
        }
      },
      hideThemeMobileSidebar: function () {
        var a = w("getHandedThemeName");
        if (a && -1 !== ["retina", "blockshop", "local"].indexOf(a))
          switch (a) {
            case "retina":
              e.$ && e.$("#nav").data("mmenu").close();
              break;
            case "local":
            case "blockshop":
              setTimeout(function () {
                e.theme && e.theme.partials && (e.theme.partials.OffCanvas ? e.theme.partials.OffCanvas.closeLeft() : e.theme.partials.FrameworkOffCanvas && e.theme.partials.FrameworkOffCanvas.closeLeft())
              }, 300)
          }
      },
      hideThemeMobileSearchPopup: function (c) {
        var b = w("getHandedThemeName");
        if (c && b && -1 !== "empire impulse local prestige motion warehouse boundless blockshop avenue galleria pacific loft trademark split".split(" ").indexOf(b))
          switch (b) {
            case "local":
            case "blockshop":
              e.$ && e.$('.mobile-nav--search a[href="/search"]').off();
              e.$ && e.$('.mobile-nav--menu a[href="/search"]').off();
              break;
            case "prestige":
              a('.SidebarMenu__Nav a[href="/search"]').attr("data-action", "");
              break;
            case "empire":
              a('.live-search-takeover-cancel[type="button"]').click();
              break;
            case "impulse":
            case "motion":
              e.$ && e.$(".site-nav__icons .js-search-header").off();
              break;
            case "warehouse":
              a('[data-action="unfix-search"]').click();
              break;
            case "boundless":
              a(".search-bar.drawer").addClass("aikon-hidden");
              a(".search-bar__icon-button.search-bar__close").click();
              break;
            case "avenue":
              a(".mobile-only .header-searchbar").hide();
              break;
            case "galleria":
              e.$ && e.$(".lin.lin-magnifier.search-modal-popup").off();
              break;
            case "pacific":
              a(".header-livesearch .livesearch-button-close").click();
              break;
            case "loft":
              e.$ && e.$(".mobile-icon .icon.search-icon").off();
              e.$ && e.$("#mobile-search-icon").off();
              break;
            case "trademark":
              e.$ && e.$('.header__secondary-nav a[href="/search"]').off();
              break;
            case "split":
              e.$ && e.$('.site-nav .site-search-handle [href="/search"]').off()
          }
      },
      allowTextSelect: function () {
        "Y" == c.options.ResultsShow && "Y" == c.options.WidgetsEnabled && c.ResultsDiv.length && a(document).bind("Commerceinstruments.ResultsUpdated", function (c, b) {
          a(".aikon-product", a(b)).hover(function () {
            var b = setTimeout(function (b) {
              a(b).addClass("aikon-text-selecting");
              a(b).children(".aikon-view-link").css("pointer-events", "none")
            }, 500, this);
            a(this).data("aikon-selectable-timeout", b)
          }, function () {
            clearTimeout(a(this).data("aikon-selectable-timeout"));
            a(this).removeClass("aikon-text-selecting");
            a(this).children(".aikon-view-link").css("pointer-events", "auto")
          })
        });
        "Y" == c.options.AutocompleteShow && "Y" == c.options.WidgetsEnabled && a(document).bind("Commerceinstruments.AutocompleteUpdated", function (c, b, e) {
          a(".aikon-product ", a(e)).hover(function () {
            var b = setTimeout(function (b) {
              a(b).addClass("aikon-text-selecting");
              a(b).children(".aikon-item").css("pointer-events", "none")
            }, 500, this);
            a(this).data("aikon-selectable-timeout", b)
          }, function () {
            clearTimeout(a(this).data("aikon-selectable-timeout"));
            a(this).removeClass("aikon-text-selecting");
            a(this).children(".aikon-item").css("pointer-events", "auto")
          })
        });
        a(document).bind("Commerceinstruments.RecommendationUpdated", function (c, b) {
          a(".aikon-product", a(b)).hover(function () {
            var b = setTimeout(function (b) {
              a(b).addClass("aikon-text-selecting").unbind();
              a(b).children(".aikon-view-link").css("pointer-events", "none").css("display", "block")
            }, 500, this);
            a(this).data("aikon-selectable-timeout", b)
          }, function () {
            clearTimeout(a(this).data("aikon-selectable-timeout"));
            a(this).removeClass("aikon-text-selecting");
            a(this).children(".aikon-view-link").css("pointer-events", "auto")
          })
        });
        a(document).delegate(".aikon-product.aikon-text-selecting", "mousedown", function (c) {
          a(this).data("aikon-mouse-x", c.pageX);
          a(this).data("aikon-mouse-y", c.pageY)
        });
        a(document).delegate(".aikon-product.aikon-text-selecting", "mouseup", function (c) {
          var b = a(this).data("aikon-mouse-x")
            , d = a(this).data("aikon-mouse-y");
          if (b && d && b === c.pageX && d === c.pageY) {
            if (a(c.target).parents(".wk-button-collection").length || a(c.target).is(".wk-button-collection") || a(c.target).is(".aikon-disable-redirect"))
              return !1;
            a(this).children(".aikon-view-link").length ? e.location.href = a(this).children(".aikon-view-link").attr("href") : a(this).children(".aikon-item").length && (e.location.href = a(this).children(".aikon-item").attr("href"))
          }
        })
      },
      updateSearchStats: function () {
        var d = m("aikon_search_data");
        if (void 0 != d) {
          d = a.parseJSON(d);
          var b = d.query;
          void 0 != b && "Y" == c.options.AutocompleteShowRecent && c.updateRecentSearches(a.trim(b));
          void 0 != d.original_query && (d.api_key = c.autocmp_params.api_key,
            c.processRequest(c.paths.stats_update_search_url, d));
          l("aikon_search_data", null, {
            expires: -120,
            path: "/",
            domain: document.domain
          })
        }
      },
      checkAndRedirect: function (d) {
        if ("N" == c.options.AutocompleteFollowLinks)
          return !1;
        d = d.toLowerCase();
        for (var b in c.options.Redirects)
          if (-1 != a.inArray(d, c.options.Redirects[b]))
            return e.location.href = c.attach_ga_param(b, d),
              !0;
        return !1
      },
      sendGoogleEvent: function (a) {
        "undefined" !== typeof e.ga && e.ga("send", "event", "Commerceinstruments", a)
      },
      translateQueryIfNeeded: function (d, b) {
        function g() {
          var c = Weglot.getCurrentLang()
            , g = Weglot.options.language_from;
          if (c !== g) {
            var h = encodeURIComponent('[{"t":1,"w":"' + d + '"}]')
              , N = encodeURIComponent(e.location.href);
            a.getJSON("https://api.weglot.com/translate?l_from=" + c + "&l_to=" + g + "&words=" + h + "&request_url=" + N + "&api_key=" + Weglot.options.api_key).done(function (a) {
              b(a.to_words[0])
            }).fail(function () {
              console.log("Weglot API error");
              b(d)
            })
          } else
            b(d)
        }

        if ("Y" == c.options.WeglotSupport && e.Weglot && d)
          if (Weglot.initialized)
            g();
          else
            Weglot.on("initialized", g);
        else
          b(d)
      }
    };
    Commerceinstruments.Init = function () {
      Commerceinstruments.SetOptions(c.defaultOptions)
    }
    ;
    Commerceinstruments.Start = function () {

      if(window.CommerceInstrumentsSmartNavigationDefaultSorting != null) {
        if(window.CommerceInstrumentsSmartNavigationDefaultSorting === 'manual') {
          c.options.ResultsManualSortingCategories[window.CommerceInstrumentsSmartNavigationHandle] = window.CommerceInstrumentsSmartNavigationCollectionId;
        } else if (window.CommerceInstrumentsSmartNavigationDefaultSorting === 'best-selling') {
          c.options.SmartNavigationDefaultSorting = 'sales_amount:desc';
        } else if (window.CommerceInstrumentsSmartNavigationDefaultSorting === 'created-descending') {
          c.options.SmartNavigationDefaultSorting = 'created:desc';
        } else if (window.CommerceInstrumentsSmartNavigationDefaultSorting === 'created-ascending') {
          c.options.SmartNavigationDefaultSorting = 'created:asc';
        } else if (window.CommerceInstrumentsSmartNavigationDefaultSorting === 'title-ascending') {
          c.options.SmartNavigationDefaultSorting = 'title:asc';
        } else if (window.CommerceInstrumentsSmartNavigationDefaultSorting === 'title-descending') {
          c.options.SmartNavigationDefaultSorting = 'title:desc';
        } else if (window.CommerceInstrumentsSmartNavigationDefaultSorting === 'price-ascending') {
          c.options.SmartNavigationDefaultSorting = 'price:asc';
        } else if (window.CommerceInstrumentsSmartNavigationDefaultSorting === 'price-descending') {
          c.options.SmartNavigationDefaultSorting = 'price:desc';
        }
      }

      Commerceinstruments.Loaded && c.start();
      Commerceinstruments.StatisticLoaded || "shopify" != c.options.Platform || (Commerceinstruments.InitStatisticSession(),
        Commerceinstruments.ProcessStatistic());
      W("init");
      Z("init");
      a(document).delegate(c.options.Statistic.ProductSelector, "mousedown touchstart", function (d) {
        d = a(d.target).closest(c.options.Statistic.ProductSelector);
        d.length && W("click", {
          product_id: Commerceinstruments.ExtractProductId(d.attr("id"))
        })
      });
      e.Shopify && e.Shopify.checkout && e.Shopify.checkout.order_id && e.Shopify.checkout.line_items && W("order", {
        cart: e.Shopify.checkout,
        items: e.Shopify.checkout.line_items
      })
    }
    ;
    Commerceinstruments.InitStatisticSession = function () {
      Commerceinstruments.StatisticSession = Commerceinstruments.GetLocalStorage(c.options.Statistic.SessionName);
      if (Commerceinstruments.IsNewStatisticSession())
        Commerceinstruments.StartNewStatisticSession();
      else {
        var a = {
          updated: c.options.Statistic.DateNow,
          expires: c.options.Statistic.DateNow + c.options.Statistic.SessionLength,
          state: "update",
          times_updated: ++Commerceinstruments.StatisticSession.times_updated
        }, b;
        for (b in a)
          Commerceinstruments.SetStatisticSessionKey(b, a[b])
      }
    }
    ;
    Commerceinstruments.IsNewStatisticSession = function () {
      return !Commerceinstruments.StatisticSession || c.options.Statistic.DateNow - Commerceinstruments.StatisticSession.updated > c.options.Statistic.SessionLength || Commerceinstruments.StatisticSession.end_point_reached
    }
    ;
    Commerceinstruments.StartNewStatisticSession = function () {
      Commerceinstruments.StatisticSession = {
        started: c.options.Statistic.DateNow,
        updated: c.options.Statistic.DateNow,
        expires: c.options.Statistic.DateNow + c.options.Statistic.SessionLength,
        state: "new",
        times_updated: 0,
        end_point_reached: !1
      };
      Commerceinstruments.SetLocalStorage(c.options.Statistic.SearchStorageName, []);
      Commerceinstruments.SetLocalStorage(c.options.Statistic.SessionName, Commerceinstruments.StatisticSession)
    }
    ;
    Commerceinstruments.SetStatisticSessionKey = function (a, b) {
      Commerceinstruments.StatisticSession = Commerceinstruments.GetLocalStorage(c.options.Statistic.SessionName);
      Commerceinstruments.StatisticSession[a] = b;
      Commerceinstruments.SetLocalStorage(c.options.Statistic.SessionName, Commerceinstruments.StatisticSession)
    }
    ;
    Commerceinstruments.GetStatisticSessionKey = function (a, b) {
      return Commerceinstruments.StatisticSession[a] ? Commerceinstruments.StatisticSession[a] : b
    }
    ;
    Commerceinstruments.SetLocalStorage = function (a, b) {
      localStorage.setItem(a, JSON.stringify(b))
    }
    ;
    Commerceinstruments.GetLocalStorage = function (a) {
      return JSON.parse(localStorage.getItem(a))
    }
    ;
    Commerceinstruments.ProcessStatistic = function () {
      a(document).delegate(c.options.Statistic.ProductSelector, "mousedown touchstart", function (b) {
        b = a(b.target).is(c.options.Statistic.ProductSelector) ? a(b.target) : a(b.target).parents(c.options.Statistic.ProductSelector);
        b.length && Commerceinstruments.AddClickToQueue({
          product_id: Commerceinstruments.ExtractProductId(b.attr("id"))
        })
      });
      a(document).delegate(c.options.Statistic.CheckoutButton, "click touchstart", function (b) {
        var d = a(b.target);
        return d.hasClass("se-processed") || "Y" == c.options.EnableShopifyMultiCurrency ? !0 : (b.preventDefault(),
          w("getCart", function (a) {
            Commerceinstruments.SendOrderStatistic(a, a.items, function () {
              d.addClass("se-processed").trigger("click")
            })
          }),
          !1)
      });
      Commerceinstruments.ProcessStatisticQueue();
      e.Shopify && e.Shopify.checkout && e.Shopify.checkout.order_id && e.Shopify.checkout.line_items && Commerceinstruments.SendOrderStatistic(e.Shopify.checkout, e.Shopify.checkout.line_items);
      if ("Y" == c.options.EnableShopifyMultiCurrency && e.Shopify && e.Shopify.currency && (!e.Shopify.checkout || !e.Shopify.checkout.order_id)) {
        var d = Commerceinstruments.GetLocalStorage("aikon-shopify-cart-currency");
        if (null === d || "object" != typeof d)
          d = {};
        d[e.Shopify.currency.active] = e.Shopify.currency;
        Commerceinstruments.SetLocalStorage("aikon-shopify-cart-currency", d)
      }
      Commerceinstruments.StatisticLoaded = !0
    }
    ;
    Commerceinstruments.AddClickToQueue = function (a) {
      var b = Commerceinstruments.GetLocalStorage(c.options.Statistic.QueueName) || [];
      b.push(a);
      Commerceinstruments.SetLocalStorage(c.options.Statistic.QueueName, b)
    }
    ;
    Commerceinstruments.AddToSwymWishlist = function () {
      e._swat.fetch(function (c) {
        a(".aikon-item .swym-button").each(function (b) {
          var d = this
            , f = a(d).data("product-id");
          b = c.filter(function (a) {
            return a.et == e._swat.EventTypes.addToWishList && a.empi == f
          });
          a(d).hasClass("swym-processed") || (0 < b.length && a(d).addClass("swym-added"),
            a(d).click(function (b) {
              b.preventDefault();
              b = e.SwymViewProducts[f] ? JSON.parse(JSON.stringify(e.SwymViewProducts[f])) : a(d).data("product-data");
              a(d).hasClass("swym-added") ? e._swat.removeFromWishList(b, function () {
                a(d).removeClass("swym-added")
              }) : (b.et = SwymTracker.EventTypes.addToWishList,
                e._swat.addToWishList(b, function () {
                  a(d).addClass("swym-added")
                }))
            }),
            a(d).addClass("swym-processed"))
        })
      })
    }
    ;
    Commerceinstruments.ProcessStatisticQueue = function () {
      var a = Commerceinstruments.GetLocalStorage(c.options.Statistic.QueueName) || [];
      a = a.filter(function (a) {
        return !a.processed
      });
      if (a.length)
        for (var b = 0; b < a.length; b++)
          a[b].product_id ? (Commerceinstruments.SaveClick({
            product_id: a[b].product_id
          }),
            a[b].processed = !0) : a[b].product_handle && (a[b].processed = !0);
      Commerceinstruments.SetLocalStorage(c.options.Statistic.QueueName, a)
    }
    ;
    Commerceinstruments.ProcessPersonalization = function () {
      var d = Commerceinstruments.GetLocalStorage(c.options.Personalization.StorageName) || {};
      d.recentlyViewedProducts ? c.autocmp_params.recentlyViewedProducts = c.result_params.recentlyViewedProducts = d.recentlyViewedProducts.join(",") : d.recentlyViewedProducts = [];
      var b = function (a) {
        ~d.recentlyViewedProducts.indexOf(a) || (20 > d.recentlyViewedProducts.length || d.recentlyViewedProducts.pop(),
          d.recentlyViewedProducts.unshift(a),
          Commerceinstruments.SetLocalStorage(c.options.Personalization.StorageName, d))
      };
      if ("shopify" == c.options.Platform)
        w("getCurrentProductId", function (a) {
          b(a)
        });
      else if ("magento" == c.options.Platform || "magento2" == c.options.Platform) {
        var e = a('#product_addtocart_form input[type="hidden"][name="product"]').val();
        e && b(e)
      }
    }
    ;
    Commerceinstruments.IsProductClicked = function (a) {
      for (var b = !1, d = Commerceinstruments.GetLocalStorage(c.options.Statistic.SearchStorageName) || [], e = 0; e < d.length; e++)
        if (a == d[e].product_id) {
          b = !0;
          break
        }
      return b
    }
    ;
    Commerceinstruments.SendOrderStatistic = function (d, b, e) {
      var f = d.order_id ? d.order_id : 0;
      d = d.presentment_currency ? d.presentment_currency : d.currency ? d.currency : "";
      for (var g = Commerceinstruments.GetLocalStorage("aikon-shopify-cart-currency"), h = {
        external_order_id: f,
        currency: d,
        viewer_id: w("getViewerId"),
        customer_id: w("getCustomerId"),
        order_items: []
      }, N = 0; N < b.length; N++) {
        var z = Commerceinstruments.IsProductClicked(b[N].product_id)
          , L = 0 < f ? Z("get_added_data", b[N].product_id) : !1;
        if (z || L) {
          var l = b[N].currency ? b[N].currency : d
            , n = b[N].price
            , m = b[N].price;
          g && g.hasOwnProperty(l) && (m = (m / g[l].rate).toFixed(2));
          h.order_items.push({
            product_id: b[N].product_id,
            variant_id: b[N].variant_id,
            price: w("formatMoney", m),
            original_price: w("formatMoney", n),
            quantity: b[N].quantity,
            currency: l,
            add_also_bought: z,
            add_ra_revenue: !1 !== L,
            widget_key: !1 !== L ? L.widget_key : ""
          })
        }
      }
      0 == h.order_items.length ? (0 != h.external_order_id && Commerceinstruments.SetStatisticSessionKey("end_point_reached", !0),
      "function" == typeof e && e.call(this),
        Commerceinstruments.SetLocalStorage(c.options.Statistic.SearchStorageName, [])) : a.ajax({
        url: c.paths.analytics_url,
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
          api_key: c.autocmp_params.api_key,
          order_data: h
        }),
        complete: function () {
          0 != h.external_order_id && (Commerceinstruments.SetStatisticSessionKey("end_point_reached", !0),
            Z("finish"));
          "function" == typeof e && e.call(this);
          Commerceinstruments.SetLocalStorage(c.options.Statistic.SearchStorageName, [])
        }
      })
    }
    ;
    Commerceinstruments.ExtractProductId = function (a) {
      return (a = a.match(/(aikon-ac-product|aikon-product)-(.*)$/)) ? a[2] : null
    }
    ;
    Commerceinstruments.ExtractProductHandle = function (a) {
      return a.replace(/[A-Za-z0-9:\/_\.\-]*products\/([%A-Za-z0-9_\-]+)[\?=&A-Za-z0-9_\/\-]*/g, "$1")
    }
    ;
    Commerceinstruments.SaveClick = function (a) {
      if (a.product_id) {
        for (var b = Commerceinstruments.GetLocalStorage(c.options.Statistic.SearchStorageName) || [], d = 0; d < b.length; d++)
          if (b[d].product_id == a.product_id)
            return;
        b.push(a);
        Commerceinstruments.SetLocalStorage(c.options.Statistic.SearchStorageName, b)
      }
    }
    ;
    Commerceinstruments.AutocompleteClose = function () {
      c.searchInputs && a.each(c.searchInputs, function (c, b) {
        var d = a(b).data("autocompleter");
        d && d.select && d.select.hide()
      })
    }
    ;
    Commerceinstruments.AutocompleteUpdate = function () {
      c.cache = [];
      Commerceinstruments.AutocompleteClose();
      c.searchInputs && a.each(c.searchInputs, function (c, b) {
        b = a(b);
        var d = b.data("autocompleter");
        b.unbind();
        d && d.select && d.select.reset()
      });
      c.start()
    }
    ;
    Commerceinstruments.SetCSS = function (c) {
      a(".aikon_widget_css").remove();
      a('<style type="text/css" class="aikon_widget_css">' + c + "</style>").appendTo("body")
    }
    ;
    Commerceinstruments.SetParams = function (d) {
      a.extend(c.autocmp_params, d)
    }
    ;
    Commerceinstruments.SetResultsParams = function (d) {
      a.extend(c.result_params, d)
    }
    ;
    Commerceinstruments.SetVersion = function (d) {
      c.version = d;
    }
    ;
    Commerceinstruments.SetPaths = function (d) {
      a.extend(c.paths, d, c[c.protocol]);
      c.options.paths = c.paths
    }
    ;
    Commerceinstruments.SetOptions = function (d) {
      void 0 !== d.SearchForm && "string" == typeof d.SearchForm && (d.SearchInput = d.SearchForm);
      d.PriceFormat && (d.PriceFormatSymbol = d.PriceFormat.symbol,
        d.PriceFormatBefore = 0 == d.PriceFormat.after ? d.PriceFormat.symbol : "",
        d.PriceFormatAfter = 1 == d.PriceFormat.after ? " " + d.PriceFormat.symbol : "",
        d.PriceFormatDecimals = d.PriceFormat.decimals,
        d.PriceFormatRate = d.PriceFormat.rate,
        d.PriceFormatDecimalSeparator = d.PriceFormat.decimals_separator,
        d.PriceFormatThousandsSeparator = d.PriceFormat.thousands_separator);
      a.extend(c.options, d)
    }
    ;
    Commerceinstruments.GetWidgets = function () {
      return c
    }
    ;
    e.Commerceinstruments = Commerceinstruments;
    var aa = function (d, b) {
      function g(c) {
        c = a(c.target);
        !c.is(":visible") || c.hasClass(b.resultsClass) || c.parents().hasClass(b.resultsClass) || c.hasClass(b.resultsClassMobile) || c.parents().hasClass(b.resultsClassMobile) || c.get(0) == d.get(0) || C.visible() && "N" == b.AutocompleteAlwaysShow && N()
      }

      function f(d) {
        P = a(this).val().toLowerCase();
        if (d || P != u)
          u = P,
            0 < P.length ? (C.init(),
              C.show(),
              C.showSpinner(),
              C.rebuld(),
              c.translateQueryIfNeeded(P, function (a) {
                P = a;
                m(a, z, function () {
                  C.isMobileMode() || N()
                })
              })) : (0 == P.length && (C.isMobileMode() || "Y" == b.AutocompleteShowEmptyFieldHTML || "Y" == b.AutocompleteSuggestOnSearchBoxEmpty && 0 != b.AutocompleteSuggestionCount && Commerceinstruments.preloadedSuggestions && 5 <= Commerceinstruments.preloadedSuggestions.length) ? (C.hideSpinner(),
              C.display("", {
                empty: !0
              }),
              C.show(),
              k()) : (C.hideSpinner(),
              C.hide()),
              J = {
                totalItems: 0,
                pages: [],
                items: [],
                vendors: [],
                tags: [],
                recent: [],
                categories: [],
                suggestions: []
              })
      }

      function k() {
        h();
        a(document.body).bind("click mousedown touchstart", function (a) {
          "undefined" != typeof a.originalEvent && (!0 === a.originalEvent.isTrusted && void 0 === a.originalEvent.isPrimary || !0 === a.originalEvent.isPrimary) && g(a)
        })
      }

      function h() {
        a(document.body).unbind("click mousedown touchstart", g)
      }

      function N() {
        C.hide();
        h();
        clearTimeout(U);
        C.hideSpinner()
      }

      function z(a, b) {
        a == P && A && (C.hideSpinner(),
          "Y" == c.options.WeglotSupport ? C.display(u, b) : C.display(a, b),
          C.show(),
          k());
        A || N()
      }

      function L(a) {
        return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
      }

      function l(a) {
        var b = []
          , d = c.getRecentSearches();
        a = new RegExp("(^| |\\()(" + L(a) + ")", "i");
        if (d.length)
          for (var e = 0, f = 0, g = d.length; e < g && f < c.options.AutocompleteSuggestionCount; e++) {
            var h = d[e];
            -1 !== h.search(a) && (b[f] = h,
              f++)
          }
        return b
      }

      function n(a) {
        var b = [];
        a = new RegExp("(^| |\\()(" + L(a) + ")", "i");
        if (Commerceinstruments.preloadedSuggestions && Commerceinstruments.preloadedSuggestions.length)
          for (var d = 0, e = 0, f = Commerceinstruments.preloadedSuggestions.length; d < f && e < c.options.AutocompleteSuggestionCount; d++) {
            var g = Commerceinstruments.preloadedSuggestions[d];
            -1 !== g.search(a) && (b[e] = g,
              e++)
          }
        return b
      }

      function m(d, e, f) {
        var g = a.extend({}, c.autocmp_params, {
          q: d,
          maxResults: b.AutocompleteItemCount,
          pagesMaxResults: b.AutocompletePagesCount,
          categoriesMaxResults: b.AutocompleteCategoriesCount,
          suggestionsMaxResults: b.AutocompleteSuggestionCount,
          vendorsMaxResults: b.AutocompleteVendorsCount,
          tagsMaxResults: b.AutocompleteTagsCount
        });
        "Y" == b.AutocompleteShowOnlyInStock && (g.restrictBy.quantity = "1|");
        c.options.CommerceinstrumentsCustomerTags.length && (g.customer_tags = c.options.CommerceinstrumentsCustomerTags);
        "Y" == c.options.EnableShopifyMultiCurrency && w("isNativeMulticurrencyEnabled") && (g.shopify_currency = Shopify.currency.active);
        "Y" == c.options.IsExtraObjectsPermitted && (g.vendors = !0,
          g.tags = !0);
        var h = "Y" == b.AutocompleteShowRecent ? l(g.q) : []
          , k = n(g.q);
        if (k.length || h.length) {
          var z = 0 == b.AutocompleteItemCount && k.length >= b.AutocompleteSuggestionCount;
          (z || "Y" != b.AutocompleteIsMulticolumn) && e(d, {
            totalItems: J.totalItems,
            items: J.items,
            recent: h.length ? h : [],
            suggestions: k.length ? D(k, J.suggestions) : h.length ? J.suggestions : []
          });
          if (z)
            return;
          C.showSpinner()
        }
        c.triggerEvent("Commerceinstruments.DataRequestBefore", ["autocomplete", g]);
        c.processRequest(c.paths.request_url, g, function (a) {
          c.triggerEvent("Commerceinstruments.DataRequestEnd", ["autocomplete", g, a]);
          c.handleUsergroupRules(a.usergroup_rules);
          0 < a.totalItems && W("instant", {
            q: a.correctedQuery ? a.correctedQuery : g.q || "",
            total: a.totalItems
          });
          a.recent = h;
          a.suggestions = D(k, a.suggestions);
          J = {
            totalItems: a.totalItems,
            pages: a.pages,
            items: a.items,
            vendors: a.vendors,
            tags: a.tags,
            recent: a.recent,
            categories: a.categories,
            suggestions: a.suggestions
          };
          e(d, a)
        }, function () {
          p++;
          k.length ? C.hideSpinner() : f()
        })
      }

      var J = {
        totalItems: 0,
        pages: [],
        items: [],
        vendors: [],
        tags: [],
        recent: [],
        categories: [],
        suggestions: []
      };
      b = a.extend({
        inputClass: "aikon-input-style",
        resultsClass: "aikon-ac-results",
        resultsClassMobile: "aikon-ac-results-mobile",
        overClass: "aikon-ac-over",
        overNoDropClass: "aikon-ac-over-nodrop",
        delay: 5,
        selectFirst: !0,
        autoFill: !0
      }, b);
      var U, p = 0, P = "", u = "", A = 0;
      this.input = d;
      this.onKeyDown = function (a) {
        if (!C.isMobileMode() || C.getMobileInput() == this)
          if (A = 1,
          "paste" == a.type) {
            var d = this;
            setTimeout(function () {
              f.call(d)
            }, 100)
          } else
            switch (a.keyCode) {
              case 38:
                C.visible() ? (a.preventDefault(),
                  C.moveUp()) : f.call(this, !0);
                break;
              case 40:
                C.visible() ? (a.preventDefault(),
                  C.moveDown()) : f.call(this, !0);
                break;
              case 9:
                C.visible() && C.moveTab() && a.preventDefault();
                break;
              case 13:
                if ("N" == b.AutocompleteFollowLinks) {
                  a.preventDefault();
                  break
                }
                if ("5I1r9C9J5Q" == c.autocmp_params.api_key && !K() || C.selectCurrent())
                  C.submitSearchForm(),
                    a.preventDefault();
                return !1;
              case 27:
                C.hide();
                break;
              default:
                d = this;
                K() && 300 > b.delay && (b.delay = 300);
                var e = function () {
                  f.call(d);
                  K() && (clearTimeout(U),
                    U = setTimeout(e, b.delay))
                };
                clearTimeout(U);
                U = setTimeout(e, b.delay)
            }
      }
      ;
      d.attr("autocomplete", "off").removeClass(b.inputClass).addClass(b.inputClass);
      var C = this.select = new aa.Select(this, b);
      d.bind("keydown.autocomplete paste.autocomplete search.autocomplete", this.onKeyDown).focus(function () {
        A++
      });
      e.Shopify && e.Shopify.theme && c.hideThemeMobileSearchPopup(C.isMobileMode());
      if (C.isMobileMode()) {
        var na = function (a) {
            a.stopPropagation();
            a.preventDefault();
            A++;
            d.focus();
            f.call(this, !0);
            e.Shopify && e.Shopify.theme && c.hideThemeMobileSidebar()
          }
          ,
          oa = a("#search-toggle").add("a.toggler-search").add(".search-toggle").add("a.search-drawer-toggle").add(".mobile-header-search-toggle").add(".fa-search").add("#search-mobile-trigger > a").add("li.nav-item.search").add(".mobile-cart a.search").add(".search-area .search-icon").add("label[data-role=minisearch-label]").add(".site-header__icons .icon-search").add(".site-header-mobile-search-button").add(".site-nav__icons .js-search-header").add('.Header__Icon[href="/search"]').add(".utils__item.mobile-search").add('.SidebarMenu__Nav a[href="/search"]').add('.header__action-list a[href="/search"]').add(".header .header-trigger__link--search").add(".site-header__link.site-header__search").add('.mobile-nav--search a[href="/search"]').add('.mobile-nav--menu a[href="/search"]').add('.customer-links [role="menuitem"] .open-header').add(".live-search .ls-button-search").add(".lin.lin-magnifier.search-modal-popup").add('.header-tools-search[href="/search"]').add(".mobile-icon .icon.search-icon").add(".sticky-header .js-mobile-search-open").add('.header__secondary-nav a[href="/search"]').add(".site-nav .site-search-handle").add(".header.sticky .icon-search").add(".header-search-icon .mobile-icon").add('.search-form + #side-menu a[href="/search"]').add('.site-header__section a[href="/search"]').add(".off-canvas-navigation .menu-search").add(".aikon-custom-widget-opener");
        oa.length && oa.is(":visible") && oa.unbind().bind("click touch", function (a) {
          d.one("touchstart", na);
          d.val("").trigger("touchstart");
          return !1
        });
        d.bind("mousedown", na);
        d.bind("touchstart", na);
        d.bind("touchend", na)
      } else
        d.bind("click", function (a) {
          a.stopPropagation();
          C.visible() || f.call(this, !0)
        });
      a(e).bind("resize", function () {
        C && C.visible() && !C.isMobileMode() && (d.is(":visible") ? C.show() : C.hide())
      })
    };
    aa.Select = function (d, b) {
      function g() {
        if (!u) {
          u && u.unbind().remove();
          A && A.unbind().remove();
          u = a("<div/>").hide().addClass(b.resultsClass).appendTo(document.body);
          c.isRightToLeftLanguage() && u.addClass("aikon-rtl");
          a('<div class="aikon-dropdown-arrow"><div class="aikon-arrow-outer"></div><div class="aikon-arrow-inner"></div></div>').appendTo(u);
          A = a(E ? b.AutocompleteMobileTemplate : b.AutocompleteTemplate);
          N();
          A.appendTo(u).mouseover(function (b) {
            var c = a(f(b));
            if (c.hasClass("aikon-ac-odd") || c.hasClass("aikon-ac-even")) {
              var d = P.NODROP_ACTIVE;
              D = w.removeClass(P.ACTIVE).removeClass(P.NODROP_ACTIVE).index(f(b));
              c.addClass(d)
            }
          }).bind("click touch", function (b) {
            var c = a(f(b))
              , d = E ? O : I;
            return c.hasClass("aikon-ac-odd") || c.hasClass("aikon-ac-even") ? (c.addClass(P.NODROP_ACTIVE),
            c.hasClass("aikon-text-selecting") || m(),
              !1) : a(b.target).hasClass("aikon-no-products-found-link") ? (b.preventDefault(),
              d.val(a(b.target).text()),
              d.triggerHandler("keydown"),
              !1) : a(b.target).hasClass("aikon-ac-view-all-products") ? (d.val(""),
              B(d),
              !1) : !0
          }).mousedown(function () {
            mouseDownOnSelect = !0
          }).mouseup(function () {
            mouseDownOnSelect = !1
          });
          if (E) {
            O = a("#aikon-mobile-search-input", A);
            O.attr("placeholder", b.LabelAutocompleteMobileSearchInputPlaceholder);
            O.bind("keydown.autocomplete paste.autocomplete", d.onKeyDown);
            O.parents("form:first").bind("submit.autocomplete", function (a) {
              setTimeout(function () {
                var a = I.data("autocompleter");
                a && a.select && a.select.hide();
                B(I)
              });
              return !1
            });
            a(".aikon-close-button", A).click(function () {
              var a = I.data("autocompleter");
              a && a.select && a.select.hide()
            });
            a(".aikon-clear-button", A).bind("touchstart mousedown", function () {
              O.val("").focus();
              O.triggerHandler("keydown");
              return !1
            });
            var g = null;
            u.bind("touchstart.autocomplete", function (b) {
              (a(b.target).is(".aikon-ac-results-mobile") || a(b.target).is(".aikon-close-area")) && p();
              b.currentTarget.scrollTop === b.currentTarget.scrollHeight - b.currentTarget.offsetHeight && --b.currentTarget.scrollTop;
              g = {
                X: b.originalEvent.touches[0].clientX,
                Y: b.originalEvent.touches[0].clientY
              }
            });
            u.bind("touchmove.autocomplete", function (a) {
              var b = g.Y - a.originalEvent.touches[0].clientY;
              (Math.abs(g.X - a.originalEvent.touches[0].clientX) > Math.abs(b) || a.currentTarget.offsetHeight >= a.currentTarget.scrollHeight || a.currentTarget.scrollTop >= a.currentTarget.scrollHeight - a.currentTarget.offsetHeight - 1 && 0 < b) && a.preventDefault()
            })
          } else if ("Y" == b.AutocompleteShowBrand) {
            var h = "marketplace.cs-cart.com" == e.location.hostname ? "https://marketplace.cs-cart.com/add-ons/customer-experience/commerceinstruments.html" : "https://start.commerceinstruments.com";
            u.find(".aikon-ac-results-content").css("border-bottom-right-radius", "0");
            "ITEMS" == b.AutocompleteStyle ? a('<div style="cursor:auto!important;position:absolute!important;right:0!important;bottom:-13px!important;height:13px!important;padding:0 5px 0px 5px!important;background-color:#303235!important;box-shadow:4px 5px 10px rgba(0, 0, 0, 0.2)!important;display:block!important;"><a href="' + h + '" target="_blank" style="vertical-align:top!important;color:#C9C9C9!important;text-decoration:none!important;font-size:10px!important;line-height:13px!important;">Powered by <span style="color:#FFFFFF!important;font-size:10px!important;font-weight:bold!important;line-height:13px!important;vertical-align:top!important;">Commerceinstruments</span></a></div>').appendTo(u) : a('<div style="cursor:auto!important;position:absolute!important;right:0!important;bottom:-15px!important;height:15px!important;padding:0 6px 0px 6px!important;background-color:#5a6367!important;box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.45)!important;display:block!important;border-bottom-left-radius:5px!important;border-bottom-right-radius:5px!important;"><a href="' + h + '" target="_blank" style="display:block!important;vertical-align:top!important;color:#e5e5e5!important;text-decoration:none!important;font-size:11px!important;line-height:15px!important;">Powered by <span style="color:#FFFFFF!important;font-size:11px!important;font-weight:bold!important;line-height:14px!important;vertical-align:top!important;">Commerceinstruments</span></a></div>').appendTo(u)
          }
          "Y" == b.AutocompleteIsMulticolumn && (0 == b.AutocompleteItemCount ? u.addClass("aikon-ac-results-only-first-column") : 0 == b.AutocompleteSuggestionCount && 0 == b.AutocompleteCategoriesCount && 0 == b.AutocompletePagesCount && u.addClass("aikon-ac-results-only-second-column"))
        }
      }

      function f(a) {
        for (a = a.target; a && "LI" != a.tagName;)
          a = a.parentNode;
        return a ? a : []
      }

      function k(a) {
        w.slice(D, D + 1);
        w.removeClass(P.ACTIVE).removeClass(P.NODROP_ACTIVE);
        D += a;
        -1 > D ? D = w.length - 1 : D >= w.length && (D = -1);
        w.slice(D, D + 1);
        a = P.NODROP_ACTIVE;
        a = w.slice(D, D + 1).addClass(a);
        a.length && void 0 === a.data("aikon_item_data") ? "Y" != c.options.WeglotSupport || a.hasClass("aikon-view-all-link") ? (a = a.data("aikon_row_data"),
        b.autoFill && (E ? O.val(a) : I.val(a))) : (a = a.text(),
        b.autoFill && (E ? O.val(a) : I.val(a))) : E ? O.val(C) : I.val(C)
      }

      function h(a) {
        var c = a.substr(0, C.length);
        return "Y" == b.AutocompleteHighlight && c.toLowerCase() == C.toLowerCase() ? c + "<strong>" + a.split("<strong>").join("").split("</strong>").join("").replace(new RegExp(C.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), "i"), "") + "</strong>" : a
      }

      function N() {
        A && (A.find("#aikon-ac-items-container-1,#aikon-ac-items-container-2,#aikon-ac-items-container-3,#aikon-ac-items-container-4,#aikon-ac-results-html-container").empty().add(A.children().not(".aikon-mobile-top-panel")).addClass("aikon-hidden"),
          A.children(".aikon-removable").remove())
      }

      function z(d, e) {
        var f = e.correctedQuery && e.correctedQuery != a.trim(d) ? e.correctedQuery : d
          , g = e.items ? e.items : []
          , k = e.pages ? e.pages : []
          , z = e.recent ? e.recent : []
          , L = e.vendors ? e.vendors : []
          , F = e.tags ? e.tags : []
          , r = e.categories ? e.categories : []
          , y = e.suggestions ? e.suggestions : []
          , l = []
          , H = {
          suggestions: [],
          categories: [],
          pages: [],
          products: [],
          vendors: [],
          tags: []
        };
        N();
        var n = A.is("ul") ? "li" : "div";
        "4J2e3t3P4S" == c.autocmp_params.api_key && (g.length ? (y = [],
          u.addClass("aikon-ac-results-items")) : u.removeClass("aikon-ac-results-items"));
        e.empty && ("Y" == b.AutocompleteShowEmptyFieldHTML && (n = A.is("ul") ? "li" : "div",
          A.append(a("<" + n + ' class="aikon-emptyfield-html aikon-removable" style="cursor:auto;">' + b.AutocompleteEmptyFieldHTML + "</" + n + ">"))),
        "Y" == b.AutocompleteSuggestOnSearchBoxEmpty && Commerceinstruments.preloadedSuggestions && 5 <= Commerceinstruments.preloadedSuggestions.length && (y = Commerceinstruments.preloadedSuggestions.slice(0, b.AutocompleteSuggestionCount)));
        for (var q = 0; q < y.length; q++)
          -1 == a.inArray(y[q], z) && l.push(y[q]);
        y = 0;
        var m = b.AutocompleteSuggestionCount <= z.length ? b.AutocompleteSuggestionCount : z.length
          , B = b.AutocompleteSuggestionCount - m <= l.length ? b.AutocompleteSuggestionCount - m : l.length;
        m || B || "Y" == b.AutocompleteIsMulticolumn && !E && "" != f && 0 != b.AutocompleteSuggestionCount ? ("Y" == b.AutocompleteShowSeparator && (a(".aikon-arrow-inner", u).addClass("aikon-arrow-inner-label"),
          H.suggestions.push(a('<li class="aikon-label">' + b.LabelAutocompleteSuggestions + "</li>"))),
        m || B || H.suggestions.push('<li class="aikon-no-suggestions-found"><span>' + b.LabelAutocompleteNoSuggestionsFound + "</span></li>")) : a(".aikon-arrow-inner", u).removeClass("aikon-arrow-inner-label");
        for (q = 0; q < m; q++)
          if (z[q]) {
            y++;
            var Q = '<li class="aikon-suggestion aikon-recent">' + h(c.escapeHTML(z[q])) + "</li>";
            H.suggestions.push(a(Q).addClass(0 == y % 2 ? "aikon-ac-even" : "aikon-ac-odd").css("cursor", "pointer").data("aikon_row_data", z[q]))
          }
        for (q = 0; q < B; q++)
          l[q] && (y++,
            Q = '<li class="aikon-suggestion">' + h(c.escapeHTML(l[q])) + "</li>",
            H.suggestions.push(a(Q).addClass(0 == y % 2 ? "aikon-ac-even" : "aikon-ac-odd").css("cursor", "pointer").data("aikon_row_data", l[q])));
        if ("Y" == b.IsExtraObjectsPermitted) {
          B = b.AutocompleteVendorsCount <= L.length ? b.AutocompleteVendorsCount : L.length;
          if (0 != B || "Y" == b.AutocompleteIsMulticolumn && !E && "" != f && 0 != b.AutocompleteVendorsCount)
            0 != y && "N" == b.AutocompleteShowSeparator ? H.vendors.push(a('<li class="aikon-separator"></li>')) : "Y" == b.AutocompleteShowSeparator && (a(".aikon-arrow-inner", u).addClass("aikon-arrow-inner-label"),
              H.vendors.push(a('<li class="aikon-label">' + b.LabelAutocompleteVendors + "</li>"))),
            0 == B && H.vendors.push('<li class="aikon-no-vendors-found"><span>' + b.LabelAutocompleteNoVendorsFound + "</span></li>");
          for (q = 0; q < B; q++)
            L[q].title && (y++,
              L[q].link = c.attach_ga_param(L[q].link, f),
              Q = '<li class="aikon-vendor"><a href="' + L[q].link + '" class="aikon-view-link" data-no-instant="true">' + h(c.escapeHTML(L[q].title)) + "</a></li>",
              H.vendors.push(a(Q).addClass(0 == y % 2 ? "aikon-ac-even" : "aikon-ac-odd").css("cursor", "pointer").data("aikon_row_data", L[q].title).data("aikon_item_data", L[q])));
          "Y" == b.AutocompleteShowMoreLink && 0 != B && e.totalVendors && +B < +e.totalVendors && (y++,
            H.vendors.push(a('<li class="aikon-vendor aikon-view-all-vendors ' + (0 == y % 2 ? "aikon-ac-even" : "aikon-ac-odd") + '">' + b.LabelAutocompleteMore + '<i class="aikon-ac-results-arrow"></i></li>')));
          B = b.AutocompleteTagsCount <= F.length ? b.AutocompleteTagsCount : F.length;
          if (0 != B || "Y" == b.AutocompleteIsMulticolumn && !E && "" != f && 0 != b.AutocompleteTagsCount)
            0 != y && "N" == b.AutocompleteShowSeparator ? H.tags.push(a('<li class="aikon-separator"></li>')) : "Y" == b.AutocompleteShowSeparator && (a(".aikon-arrow-inner", u).addClass("aikon-arrow-inner-label"),
              H.tags.push(a('<li class="aikon-label">' + b.LabelAutocompleteTags + "</li>"))),
            0 == B && H.tags.push('<li class="aikon-no-tags-found"><span>' + b.LabelAutocompleteNoTagsFound + "</span></li>");
          for (q = 0; q < B; q++)
            F[q].title && (y++,
              F[q].link = c.attach_ga_param(F[q].link, f),
              Q = '<li class="aikon-tag"><a href="' + F[q].link + '" class="aikon-view-link" data-no-instant="true">' + h(c.escapeHTML(F[q].title)) + "</a></li>",
              H.tags.push(a(Q).addClass(0 == y % 2 ? "aikon-ac-even" : "aikon-ac-odd").css("cursor", "pointer").data("aikon_row_data", F[q].title).data("aikon_item_data", F[q])));
          "Y" == b.AutocompleteShowMoreLink && 0 != B && e.totalTags && +B < +e.totalTags && (y++,
            H.tags.push(a('<li class="aikon-tag aikon-view-all-tags ' + (0 == y % 2 ? "aikon-ac-even" : "aikon-ac-odd") + '">' + b.LabelAutocompleteMore + '<i class="aikon-ac-results-arrow"></i></li>')))
        }
        B = b.AutocompleteCategoriesCount <= r.length ? b.AutocompleteCategoriesCount : r.length;
        if (0 != B || "Y" == b.AutocompleteIsMulticolumn && !E && "" != f && 0 != b.AutocompleteCategoriesCount)
          0 != y && "N" == b.AutocompleteShowSeparator ? H.categories.push(a('<li class="aikon-separator"></li>')) : "Y" == b.AutocompleteShowSeparator && (a(".aikon-arrow-inner", u).addClass("aikon-arrow-inner-label"),
            H.categories.push(a('<li class="aikon-label">' + b.LabelAutocompleteCategories + "</li>"))),
          0 == B && H.categories.push('<li class="aikon-no-categories-found"><span>' + b.LabelAutocompleteNoCategoriesFound + "</span></li>");
        for (q = 0; q < B; q++)
          r[q].title && (y++,
            r[q].link = c.attach_ga_param(r[q].link, f),
            "4J2e3t3P4S" == c.autocmp_params.api_key ? (Q = 1 < r[q].products_count ? " Products" : " Product",
              Q = '<li class="aikon-category"><a href="' + r[q].link + '" class="aikon-view-link" data-no-instant="true"><span class="aikon-thumbnail"><img src="' + r[q].image_link + '" class="aikon-item-image" alt="" border="0"></span><span class="aikon-overhidden"><span class="aikon-title">' + h(c.escapeHTML(r[q].title)) + '</span><span class="aikon-category-products-available">' + r[q].products_count + Q + "</span></span></a></li>") : Q = '<li class="aikon-category"><a href="' + r[q].link + '" class="aikon-view-link" data-no-instant="true">' + h(c.escapeHTML(r[q].title)) + "</a></li>",
            H.categories.push(a(Q).addClass(0 == y % 2 ? "aikon-ac-even" : "aikon-ac-odd").css("cursor", "pointer").data("aikon_row_data", r[q].title).data("aikon_item_data", r[q])));
        "Y" == b.AutocompleteShowMoreLink && 0 != B && e.totalCategories && +B < +e.totalCategories && (y++,
          H.categories.push(a('<li class="aikon-category aikon-view-all-categories ' + (0 == y % 2 ? "aikon-ac-even" : "aikon-ac-odd") + '">' + b.LabelAutocompleteMore + '<i class="aikon-ac-results-arrow"></i></li>')));
        B = b.AutocompletePagesCount <= k.length ? b.AutocompletePagesCount : k.length;
        if (0 != B || "Y" == b.AutocompleteIsMulticolumn && !E && "" != f && 0 != b.AutocompletePagesCount)
          0 != y && "N" == b.AutocompleteShowSeparator ? H.pages.push(a('<li class="aikon-separator"></li>')) : "Y" == b.AutocompleteShowSeparator && (a(".aikon-arrow-inner", u).addClass("aikon-arrow-inner-label"),
            H.pages.push(a('<li class="aikon-label">' + b.LabelAutocompletePages + "</li>"))),
          0 == B && H.pages.push('<li class="aikon-no-pages-found"><span>' + b.LabelAutocompleteNoPagesFound + "</span></li>");
        for (q = 0; q < B; q++)
          k[q].title && (y++,
            k[q].link = c.attach_ga_param(k[q].link, f),
            Q = '<li class="aikon-page"><a href="' + k[q].link + '" class="aikon-view-link" data-no-instant="true"><div class="aikon-page-img"></div>' + h(c.escapeHTML(k[q].title)) + "</a></li>",
            H.pages.push(a(Q).addClass(0 == y % 2 ? "aikon-ac-even" : "aikon-ac-odd").css("cursor", "pointer").data("aikon_row_data", k[q].title).data("aikon_item_data", k[q])));
        "Y" == b.AutocompleteShowMoreLink && 0 != B && e.totalPages && +B < +e.totalPages && (y++,
          H.pages.push(a('<li class="aikon-page aikon-view-all-pages ' + (0 == y % 2 ? "aikon-ac-even" : "aikon-ac-odd") + '">' + b.LabelAutocompleteMore + '<i class="aikon-ac-results-arrow"></i></li>')));
        z = b.AutocompleteItemCount <= g.length ? b.AutocompleteItemCount : g.length;
        if (0 != z || "Y" == b.AutocompleteIsMulticolumn && !E && 0 != b.AutocompleteItemCount)
          0 != y && "N" == b.AutocompleteShowSeparator ? H.products.push(a('<li class="aikon-separator"></li>')) : "Y" == b.AutocompleteShowSeparator && (a(".aikon-arrow-inner", u).addClass("aikon-arrow-inner-label"),
            H.products.push(a('<li class="aikon-label">' + b.LabelAutocompleteProducts + "</li>"))),
          0 == z && ("" == f ? H.products.push('<li class="aikon-no-products-found"><div class="aikon-no-products-found-text">' + b.LabelAutocompleteTypeForResults + "</div></li>") : H.products.push('<li class="aikon-no-products-found"><div class="aikon-no-products-found-text">' + b.LabelAutocompleteNothingFound.split("[search_string]").join("<b>" + c.escapeHTML(d) + "</b>") + '</div><div class="aikon-popular-suggestions-text">' + c.makePopularSuggestionsHTML(f) + '</div><div class="aikon-popular-suggestions-view-all-products-text"><a class="aikon-ac-view-all-products" href="#" data-no-instant="true">' + b.LabelAutocompleteSeeAllProducts + '<i class="aikon-ac-results-arrow aikon-ac-view-all-products"></i></a></div></li>'));
        G.original_query = G.s_sgstn = null;
        e.correctedQuery && e.correctedQuery != a.trim(d) && 0 != b.AutocompleteItemCount && (G.original_query = d,
          G.s_sgstn = e.correctedQuery,
          H.products.push(a('<li class="aikon-no-products-found"><div class="aikon-no-products-found-text"><span>' + b.LabelAutocompleteNothingFound.split("[search_string]").join("<b>" + c.escapeHTML(d) + "</b>") + "</span> <span>" + b.LabelAutocompleteResultsFound.split("[count]").join("<b>" + c.escapeHTML(e.totalItems + "") + "</b>").split("[search_string]").join('<a class="aikon-no-products-found-link" href="#" data-no-instant="true">' + c.escapeHTML(e.correctedQuery) + "</a>") + '</span><div class="aikon-did-you-mean"><span>' + c.makeDidYouMeanHTML(e.suggestions, e.correctedQuery, "autocomplete") + "</span></div></li>")));
        for (q = 0; q < z; q++)
          g[q].title && (y++,
            g[q].link = c.attach_ga_param(g[q].link, f),
            g[q].price_info = c.priceInfo(g[q]),
            Q = c.render_tpl(Y, g[q]),
          g[q].image_link || "multicolumn" == c.options.AutocompleteLayout || (Q = Q.replace(/<(div|span) class="aikon-thumbnail">.*?<\/\1>/, "")),
          "4J2e3t3P4S" == c.autocmp_params.api_key && (B = g[q].shopify_variants.filter(function (a) {
            if ("undefined" !== typeof a.options.Color)
              return a
          }).reduce(function (a, b) {
            return a + ("0" !== b.available ? 1 : 0)
          }, 0),
          0 < B && (B = '<span class="aikon-colors-available">' + B + (1 < B ? " Colors Available" : " Color Available") + "</span>",
            Q = a("<div/>").html(Q).find(".aikon-description").before(B).parents(".aikon-product").parent("div").html())),
            Q = a(Q).addClass(0 == y % 2 ? "aikon-ac-even" : "aikon-ac-odd").css("cursor", "pointer").data("aikon_row_data", g[q].title.split("<strong>").join("").split("</strong>").join("")).data("aikon_item_data", g[q]),
            a("img", Q).bind("error", function (c) {
              a(c.target).attr("src", b.ImageNotFound)
            }),
            H.products.push(Q),
          q != z - 1 && H.products.push(a('<li class="aikon-separator"></li>')));
        "Y" == b.AutocompleteShowViewAllLink && 0 != z && e.totalItems && +z < +e.totalItems && (y++,
          H.products.push(a('<li class="aikon-separator"></li>')),
          H.products.push(a('<li class="aikon-view-all-link"><span>' + b.LabelAutocompleteMoreProducts.split("[count]").join(e.totalItems + (e.totalItemsLimited ? "+" : "")) + '</span><i class="aikon-ac-results-arrow"></i></li>').addClass(0 == y % 2 ? "aikon-ac-even" : "aikon-ac-odd").data("aikon_row_data", e.correctedQuery ? e.correctedQuery : d)));
        g = 0 == k.length && 0 == r.length && 0 == l.length && 0 == g.length;
        "Y" == c.options.IsExtraObjectsPermitted && (g = g && 0 == L.length && 0 == F.length);
        if (!g) {
          var U = !1;
          a.each(b.AutocompleteResultsOrder, function (b, c) {
            H[c].length && (U = !0,
              a.each(H[c], function (c, d) {
                a("#aikon-ac-items-container-" + (b + 1), A).length ? a("#aikon-ac-items-container-" + (b + 1), A).append(d).removeClass("aikon-hidden") : (d.addClass("aikon-removable"),
                  A.append(d))
              }))
          });
          U && A.children(":not([id^=aikon-ac-items-container-])").removeClass("aikon-hidden")
        }
        e.empty || (g ? ("Y" == b.AutocompleteShowNoResultsHTML ? A.append(a("<" + n + ' class="aikon-noresults-html aikon-removable" style="cursor:auto;">' + (E ? "<span>" : "") + (d ? b.AutocompleteNoResultsHTML.split("[search_string]").join("<strong>" + c.escapeHTML(d) + "</strong>") : "") + (E ? "</span>" : "") + "</" + n + ">")) : "classic" != b.AutocompleteLayout ? A.append(a("<" + n + ' class="aikon-nothing-found aikon-removable"><span><div class="aikon-nothing-found-text">' + (d ? b.LabelAutocompleteNothingFound.split("[search_string]").join("<b>" + c.escapeHTML(d) + "</b>") : b.LabelAutocompleteNoSearchQuery) + '</div><div class="aikon-popular-suggestions-text">' + c.makePopularSuggestionsHTML(f) + '</div><div class="aikon-popular-suggestions-view-all-products-text"><a class="aikon-ac-view-all-products" href="#" data-no-instant="true">' + b.LabelAutocompleteSeeAllProducts + '<i class="aikon-ac-results-arrow aikon-ac-view-all-products"></i></a></div></span></' + n + ">")) : A.append(a("<" + n + ' class="aikon-nothing-found aikon-removable"><span>' + (d ? b.LabelAutocompleteNothingFound.split("[search_string]").join("<strong>" + c.escapeHTML(d) + "</strong>") : b.LabelAutocompleteNoSearchQuery) + "</span></" + n + ">")),
          c.options.AutocompleteLastNoResultQuery = f) : "Y" == b.AutocompleteShowResultsHTML && (a("#aikon-ac-results-html-container", A).length ? a("#aikon-ac-results-html-container", A).append(b.AutocompleteResultsHTML).removeClass("aikon-hidden") : (A.append(a('<li class="aikon-separator aikon-removable"></li>')),
          A.append(a('<li class="aikon-results-html aikon-removable" style="cursor:auto;">' + b.AutocompleteResultsHTML + "</li>")))));
        E && (a("#aikon-ac-close-area", A).length || a('<li class="aikon-close-area aikon-removable"></li>').appendTo(A));
        w = a(".aikon-suggestion", A).add(".aikon-category", A).add(".aikon-page", A).add(".aikon-product", A).add(".aikon-view-all-link", A);
        "Y" == c.options.IsExtraObjectsPermitted && (w = w.add(".aikon-vendor", A).add(".aikon-tag", A))
      }

      function L() {
        x.css("background-position", -R + "px center");
        R += X;
        M += 1;
        12 <= M && (M = R = 0)
      }

      function n() {
        S && clearInterval(S);
        S = null;
        x && x.remove();
        x = null
      }

      function m() {
        if ("N" == b.AutocompleteFollowLinks)
          return !1;
        var d = w && w.filter("." + P.ACTIVE).removeClass(P.ACTIVE);
        if (!d || !d.length)
          if (d = w && w.filter("." + P.NODROP_ACTIVE).removeClass(P.NODROP_ACTIVE),
          !d || !d.length)
            return c.checkAndRedirect(a.trim(E ? O.val() : I.val())) ? !1 : I.closest("form").length || E ? !0 : (B(I),
              !1);
        if (d.hasClass("aikon-view-all-categories"))
          return B(I, "categories"),
            !0;
        if (d.hasClass("aikon-view-all-pages"))
          return B(I, "pages"),
            !0;
        var f = d.data("aikon_row_data");
        if (!f)
          return !0;
        if (d.hasClass("aikon-suggestion") && c.checkAndRedirect(f))
          return !1;
        G.original_query = E ? O.val() : I.val();
        d = d.data("aikon_item_data") || {};
        d.product_id ? G.selected_product_id = d.product_id : d.category_id ? G.selected_category_id = d.category_id : d.page_id && (G.selected_page_id = d.page_id);
        if ("undefined" != typeof d.link)
          return l("aikon_search_data", JSON.stringify(G), {
            expires: 120,
            path: "/",
            domain: document.domain
          }, !0),
            "object" === typeof Tygh && Tygh.embedded ? Tygh.$.ceAjax("request", d.link, {
              result_ids: Tygh.container
            }) : e.location.href = c.getProductLink(d),
            !1;
        if ("Y" == b.AutocompleteClickSend) {
          if (b.onSuggestionClick && !1 === b.onSuggestionClick(f))
            return !1;
          c.suggestionClicked = !0;
          G.s_sgstn = f;
          B(E ? O : I)
        }
        return !0
      }

      function B(b, d) {
        var e = b.parents("form:first");
        !e.length && c.searchInputs && a.each(c.searchInputs, function (c, d) {
          e = a(d).parents("form:first");
          if (e.length)
            return a(d).val(b.val()),
              !1
        });
        d && e.append(a('<input type="hidden" name="se_tab" value="' + d + '"/>'));
        e.length && (e.children('[name="submit"]').length ? e.children('[name="submit"]').trigger("click") : e.trigger("submit"))
      }

      function J(b) {
        clearTimeout(a.data(this, "scrollTimer"));
        T && a.data(this, "scrollTimer", setTimeout(function () {
          T && (T = !1,
            a(e).scrollTop(u.offset().top),
            a(e).scrollLeft(u.offset().left),
            setTimeout(function () {
              T = !0
            }, 200))
        }, 200))
      }

      function U() {
        var d = 0 == b.AutocompleteSuggestionCount && 0 == b.AutocompleteCategoriesCount && 0 == b.AutocompletePagesCount && 0 == b.AutocompleteItemCount;
        "Y" == c.options.IsExtraObjectsPermitted && (d = d && 0 == b.AutocompleteVendorsCount && 0 == b.AutocompleteTagsCount);
        if (!d) {
          if (E)
            u.is(":visible") || (W = a(":absoluteNotPositioned").add(":fixed").add("#shopify-section-header").not(u).not(".sd-sticky-menu").not("body").not("html").filter(":visible"),
              W.hide(),
              u.addClass(b.resultsClassMobile),
              O.val(I.val()),
              u.show(),
              a(e).bind("scroll.autocomplete", J),
              a("ul", u).bind("touchstart", function (b) {
                O.is(":focus") && !a(b.target).is(O) && (O.blur(),
                  setTimeout(function () {
                    u.css({
                      height: e.innerHeight,
                      width: e.innerWidth
                    })
                  }, 500))
              }),
              O.focus(),
              setTimeout(function () {
                a('meta[name="viewport"]').length || a("head").append('<meta id="aikon-viewport" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no">');
                u.css({
                  top: e.pageYOffset,
                  left: e.pageXOffset,
                  height: e.innerHeight,
                  width: e.innerWidth
                });
                O.focus()
              }, 500)),
              O.val() ? a(".aikon-clear-button", u).css("visibility", "visible") : a(".aikon-clear-button", u).css("visibility", "hidden");
          else {
            d = I.offset();
            var f = d.left
              , g = d.top + I.outerHeight(!1);
            g += a(".aikon-dropdown-arrow", u).height();
            var h = a("iframe#admin_bar_iframe:visible");
            h.length && (40 == h.width() || I.is(c.stickySearchInput) || I.parents().is(":fixed") || (g -= h.height()));
            "fixed" === u.css("position") && (g -= a(e).scrollTop(),
              h = a(e).height() - g,
              u.css({
                "max-height": h + "px"
              }).show(),
              A.css({
                "max-height": h + "px",
                "overflow-y": "auto"
              }).show(),
              A.animate({
                scrollTop: 0
              }, 100));
            if (I.is(c.stickySearchInput))
              return a(".aikon-dropdown-arrow", u).css({
                right: "auto",
                left: "48%"
              }),
                u.width(.6 * e.innerWidth),
                u.css({
                  top: g + 20,
                  left: (e.innerWidth - u.width()) / 2
                }),
                u.show(),
                !0;
            e.innerWidth && 150 < e.innerWidth && u.outerWidth(!1) > .9 * e.innerWidth && u.width(.9 * e.innerWidth);
            e.pageXOffset && 0 != e.pageXOffset && e.innerWidth && 0 != e.innerWidth && f + u.outerWidth(!1) > e.pageXOffset + e.innerWidth && (f = d.left);
            (I.outerWidth(!1) > u.outerWidth(!1) || e.pageXOffset && 0 != e.pageXOffset && e.innerWidth && 0 != e.innerWidth && f + u.outerWidth(!1) > e.pageXOffset + e.innerWidth) && u.width(I.outerWidth(!1));
            e.pageXOffset && 0 != e.pageXOffset && f < e.pageXOffset && (f = e.pageXOffset + 10);
            E || "Y" != b.AutocompleteIsMulticolumn ? f < u.outerWidth(!1) ? a(".aikon-dropdown-arrow", u).css({
              right: "auto",
              left: "30px"
            }) : I.outerWidth(!1) <= u.outerWidth(!1) && (f += I.outerWidth(!1) - u.outerWidth(!1)) : (f = d.left + I.outerWidth(!1) / 2 - u.outerWidth(!1) / 2,
            f + u.outerWidth(!1) > e.innerWidth - .05 * u.outerWidth(!1) && (f = e.innerWidth - u.outerWidth(!1) - .05 * u.outerWidth(!1)),
            f < .05 * u.outerWidth(!1) && (f = .05 * u.outerWidth(!1),
              u.width(.9 * e.innerWidth)),
              a(".aikon-dropdown-arrow", u).css({
                left: Math.round(d.left - f + I.outerWidth(!1) / 2)
              }));
            u.css({
              top: g,
              left: Math.round(f)
            }).show()
          }
          "Y" == c.options.BestCurrencyConverter && "undefined" !== typeof e.DoublyGlobalCurrency && e.DoublyGlobalCurrency.convertAll(a("[name=doubly-currencies]").val())
        }
      }

      function p() {
        e.Shopify && e.Shopify.theme && c.hideThemeMobileSearchPopup(E);
        u && u.hide();
        w && w.removeClass(P.NODROP_ACTIVE);
        w && w.removeClass(P.ACTIVE);
        D = -1;
        N();
        E && (W.length && W.css("display", ""),
          a(e).unbind("scroll.autocomplete", J),
          a("meta#aikon-viewport").remove(),
        "undefined" != typeof I.attr("name") && 0 === I.attr("name").indexOf("hint_") && I.attr("name", I.attr("name").substr(5)),
        "undefined" != typeof O && null !== O && I.val(O.val()),
          setTimeout(function () {
            document.activeElement.blur()
          }))
      }

      var P = {
          ACTIVE: b.overClass,
          NODROP_ACTIVE: b.overNoDropClass
        }, u, A, C = "", D = -1, w, E = "Y" == c.options.AutocompleteShowMobileWidget && K(),
        Y = E && c.options.AutocompleteMobileItem ? c.options.AutocompleteMobileItem : c.options.AutocompleteItem;
      "N" == c.options.AutocompleteShowProductImages && (Y = Y.replace(/<(div|span) class="aikon-thumbnail">.*?<\/\1>/, ""));
      var I = d.input, O, G = {}, v = a.trim(I.val());
      v.length && c.checkAndRedirect(v);
      var R = 0, M = 0, X = 0, S = null, x, T = !0, W = [];
      return {
        init: function () {
          g()
        },
        reset: function () {
          u = null
        },
        display: function (a, b) {
          g();
          C = a;
          z(a, b);
          c.triggerEvent("Commerceinstruments.AutocompleteUpdated", [I, u]);
          c.convertNativePickerMoney()
        },
        showSpinner: function () {
          if (A) {
            var c = a(".aikon-results-html", A);
            c = 0 < a("li.aikon-product", A).length || 0 < a(".aikon-emptyfield-html", A).length || 0 < c.length && !c.is(":empty") || 0 == b.AutocompleteItemCount && 0 < a("li.aikon-suggestion", A).length || "Y" == b.AutocompleteIsMulticolumn && 0 < a("li.aikon-no-products-found").length;
            1 == c && 24 != X && 0 != X && n();
            S || (1 == c ? (X = 24,
              x = a('<div class="aikon-small-spinner"></div>'),
            "Y" != b.AutocompleteIsMulticolumn && (A.children(":first").data("aikon_row_data") ? x.css("height", A.children(":first:visible").css("height")) : x.css("top", E ? "67px" : "8px")),
              x.appendTo(u)) : (X = 32,
              x = a('<div class="aikon-big-spinner"></div>'),
              E ? x.insertAfter(a(".aikon-mobile-top-panel", A)) : (A.children(".aikon-nothing-found, .aikon-noresults-html").remove(),
                x.appendTo(A))),
              x.show(),
              M = R = 0,
              S = setInterval(L, 30))
          }
        },
        hideSpinner: function () {
          n()
        },
        moveDown: function () {
          k(1)
        },
        moveUp: function () {
          k(-1)
        },
        moveTab: function () {
          return !1
        },
        hide: function () {
          p()
        },
        rebuld: function () {
          D = -1
        },
        visible: function () {
          return u && u.is(":visible")
        },
        current: function () {
        },
        show: function () {
          u.css("position", I.hasFixedParent() ? "fixed" : "absolute");
          U()
        },
        selectCurrent: function () {
          if ("N" != b.AutocompleteFollowLinks)
            return m()
        },
        getSearchData: function () {
          return G
        },
        isMobileMode: function () {
          return E
        },
        getMobileInput: function () {
          return O && O.get(0)
        },
        submitSearchForm: function () {
          return B(E ? O : I)
        }
      }
    }
    ;
    var R = function () {
      this.init.apply(this, arguments)
    };
    R.prototype = {
      init: function (c, b) {
        this.id = c;
        this.withOverlay = b;
        this.container = a(document.body);
        this.modal = this.overlay = null
      },
      build: function () {
        this.container.append(this.render());
        this.withOverlay && (this.overlay = a("#aikon-overlay-" + this.id));
        this.modal = a("#aikon-modal-" + this.id);
        this.attachEvents()
      },
      render: function () {
        var a = this.withOverlay ? '<div id="aikon-overlay-' + this.id + '" class="aikon-overlay" style="display: none"></div>' : "";
        return a += '<div id="aikon-modal-' + this.id + '" class="' + ("mobile-filters-dialog" == this.id ? "aikon aikon-modal" : "aikon-modal") + '" style="display: none"><button class="aikon-close-button"></button>' + this.renderContent() + "</div>"
      },
      renderContent: function () {
        return '<div class="aikon-modal-content"></div>'
      },
      attachEvents: function () {
        var c = this;
        a(".aikon-close-button", this.modal).click(function () {
          c.hide();
          return !1
        });
        a(document).keydown(function (a) {
          27 == a.keyCode && c.hide()
        });
        this.overlay && this.overlay.click(function () {
          c.hide()
        })
      },
      show: function () {
        this.overlay && this.overlay.show();
        this.modal.show();
        var a = document.documentElement;
        this.left = (e.pageXOffset || a.scrollLeft) - (a.clientLeft || 0);
        this.top = (e.pageYOffset || a.scrollTop) - (a.clientTop || 0);
        this.container.addClass("aikon-no-scroll")
      },
      hide: function () {
        this.container.removeClass("aikon-no-scroll");
        this.overlay && this.overlay.hide();
        this.modal.hide();
        e.scrollTo(this.left, this.top)
      }
    };
    StickySearchbox = function (a) {
      R.call(this, a, !1)
    }
    ;
    StickySearchbox.prototype = Object.create(R.prototype);
    StickySearchbox.constructor = StickySearchbox;
    a.extend(StickySearchbox.prototype, {
      render: function () {
        return '<a href="#" class="aikon-sticky-searchbox aikon-custom-widget-opener ' + c.options.StickySearchboxPosition + '" data-no-instant="true"><div class="aikon-search-magnifier"></div></a>' + R.prototype.render.apply(this, arguments)
      },
      renderContent: function () {
        return '<div class="aikon-modal-content-wrapper"><form action="' + c.options.ResultsFormPath + '"><div class="control-group"><i class="aikon-modal-sticky-icon"></i><input type="search" name="q" placeholder="' + c.options.LabelStickySearchboxInputPlaceholder + '" /></div><button type="submit">' + c.options.LabelStickySearchboxSearchButtonText + '</button><button class="aikon-sticky-close aikon-close-button"></button></form></div>'
      },
      attachEvents: function () {
        var c = this;
        R.prototype.attachEvents.apply(this, arguments);
        a(".aikon-sticky-searchbox").click(function () {
          c.show();
          c.getSearchInput().focus();
          return !1
        });
        a("form", this.modal).submit(function () {
          c.hide();
          return !0
        })
      },
      getSearchInput: function () {
        return a("input[type=search]", this.modal)
      }
    });
    var p = function (d, b) {
      function g() {
        if (!e.scrollProcessing) {
          e.scrollProcessing = !0;
          var b = 0 < a("#aikon-search-results-grid-mode", v).length;
          a(v).find(".aikon-product").each(function () {
            var c = b ? a(this).find(".aikon-thumbnail") : a(this);
            a(c).is(":inview") ? a(this).addClass("mobile-in-view") : a(this).removeClass("mobile-in-view")
          });
          e.scrollProcessing = !1
        }
      }

      function f(d, e, f) {
        var g = {}
          , h = d.data("aikon_item_data")
          , y = 0
          , k = 0
          , r = []
          , F = e.shopify_variants
          , z = !1;
        e = 0;
        if (f) {
          for (e = 0; e < F.length; e++)
            if ("true" == F[e].relevant) {
              r.push(F[e]);
              z = !0;
              break
            }
          if ("0" == F[0].available && !r.length)
            for (e = 0; e < F.length; e++)
              if ("0" != F[e].available) {
                r.push(F[e]);
                z = !0;
                break
              }
        }
        r.length || (a.each(a("select, input", d).serializeArray(), function () {
          g[this.name] = this.value
        }),
          r = a.grep(F, function (a) {
            for (option in g)
              if (!a.options[option] || a.options[option] != g[option])
                return !1;
            return !0
          }));
        r.length && (y = r[0].available,
          k = r[0].price);
        "Y" == b.ResultsShowInStockStatus && a(".aikon-in-stock, .aikon-out-of-stock, .aikon-pre-order", d).replaceWith(c.render_tpl(b.ResultsInStockStatusHTML, {
          quantity: y
        }));
        "add_to_cart" == b.ResultsShowActionButton && a(".aikon-button", d).replaceWith(c.render_tpl("${action_button_html}", {
          quantity: y,
          tags: h.tags,
          price: k
        }));
        if ((z || !f) && r.length) {
          a(d).attr("data-product-variant", r[0].variant_id);
          h.add_to_cart_id = r[0].variant_id;
          h.link = r[0].link;
          a(".aikon-view-link", d).attr("href", r[0].link);
          d.data("aikon_item_data", h);
          r[0].price_info = c.priceInfo(r[0]);
          "Y" == c.isPriceAccessed(r[0]) && a(".aikon-price-list", d).html(c.render_tpl(b.ResultsPricesHTML, r[0]));
          "Y" == b.ResultsShowProductCode && (f = "",
          r[0].sku && (f = c.render_tpl(b.ResultsProductCodeHTML, r[0])),
            a(".aikon-sku", d).length ? a(".aikon-sku", d).replaceWith(f) : a(".aikon-title", d).after(f));
          (f = r[0].image_link) || (f = h.shopify_images && h.shopify_images.length ? h.shopify_images[0] : h.image_link || b.ImageNotFound);
          a(".aikon-item-image:not(.aikon-flip-image)", d).attr("src", f);
          if (r.length && (r[0].option_size && (h = r[0].options[r[0].option_size],
          a(".aikon-size-select-box", d).length && (a(".aikon-option-size", d).val(h),
            a(".aikon-size", d).removeClass("aikon-size-active"),
            a('.aikon-size[data-value="' + h.replace(/[""]/g, '\\"') + '"]', d).addClass("aikon-size-active"))),
          r[0].option_color && (h = r[0].option_color,
            f = r[0].options[h],
            a(".aikon-color-swatch", d).length ? (a(".aikon-option-color", d).val(f),
              a(".aikon-color-swatch", d).removeClass("aikon-color-swatch-active"),
              a('.aikon-color-swatch[data-value="' + f.replace(/[""]/g, '\\"') + '"]', d).addClass("aikon-color-swatch-active")) : a('.aikon-option-other[name="' + h + '"] option[value="' + f.replace(/[""]/g, '\\"') + '"]', d).prop("selected", !0)),
            r[0].options_other))
            for (e = 0; e < r[0].options_other.length; e++)
              h = r[0].options_other[e],
                a('.aikon-option-other[name="' + h + '"] option[value="' + r[0].options[h] + '"]', d).prop("selected", !0);
          c.convertNativePickerMoney()
        }
      }

      function k(F, r) {
        if ("init" == F) {
          var y = e.location.href;
          if (-1 != y.indexOf("?collection=") || -1 != y.indexOf("/collections/"))
            ia = !0,
              v.addClass("aikon-collection-mode"),
              a(".aikon-search-results-page-title").hide();
          y = a(".aikon-main-panel", v);
          y.delegate(".aikon-main-panel-controls a", "click", function (b) {
            b.preventDefault();
            b.stopPropagation();
            b = a(b.target);
            b = (b.hasClass("aikon-main-panel-controls-products") || 0 < b.parents(".aikon-main-panel-controls-products").length) && "products" || (b.hasClass("aikon-main-panel-controls-categories") || 0 < b.parents(".aikon-main-panel-controls-categories").length) && "categories" || (b.hasClass("aikon-main-panel-controls-pages") || 0 < b.parents(".aikon-main-panel-controls-pages").length) && "pages";
            var c = V.params;
            c.tab = b;
            k("results", {
              params: c
            })
          });
          y.delegate(".aikon-main-panel-dropdown a", "click", function (a) {
            a.preventDefault()
          });
          y.delegate(".aikon-main-panel-dropdown", K() ? "click" : "mouseenter", function () {
            (E() && da ? da : a(".aikon-main-panel-dropdown-content", v)).show()
          });
          K() || y.delegate(".aikon-main-panel-dropdown", "mouseleave", function () {
            a(".aikon-main-panel-dropdown-content", v).hide()
          });
          E() && (da = new R("mobile-sortby-dialog", !0),
            da.build());
          (E() ? da.modal : y).delegate(".aikon-main-panel-dropdown-content", "click", function (b) {
            b.preventDefault();
            b.stopPropagation();
            if (a(b.target).is("a") && a(b.target).attr("class") && -1 != a(b.target).attr("class").indexOf("aikon-main-panel-dropdown-")) {
              var c = a(b.target).attr("class").replace("current", "").replace(" ", "").replace("aikon-main-panel-dropdown-", "").split("-");
              b = c[0];
              c = c[1];
              var d = {
                sortBy: b,
                sortOrder: c
              };
              V.params.q && (d.q = V.params.q);
              if (V.params.sortBy != b || V.params.sortOrder != c)
                d.page = 1;
              d.tab = "products";
              G(A(d));
              (E() && da ? da : a(".aikon-main-panel-dropdown-content", v)).hide()
            }
          });
          y.delegate(".aikon-grid-mode-icon", "click", function (a) {
            a.preventDefault();
            a.stopPropagation();
            k("changeView", "gridMode")
          });
          y.delegate(".aikon-list-mode-icon", "click", function (a) {
            a.preventDefault();
            a.stopPropagation();
            k("changeView", "listMode")
          });
          y.delegate(".aikon-main-panel-mobile-filters", "click", function (a) {
            a.preventDefault();
            a.stopPropagation();
            ka.show()
          });
          var u = a(".aikon-search-results-content", v);
          u.delegate("img", "error", function (c) {
            a(c.target).attr("src", b.ImageNotFound)
          });
          u.delegate(".aikon-product", "click", la);
          "shopify" == c.options.Platform && "Y" == c.options.ResultsShowOptionVariants && (a(v).addClass("aikon-options"),
            u.delegate(".aikon-color-swatch", "click", function () {
              var b = a(this).parents(".aikon-product")
                , c = b.data("aikon_item_data");
              a(".aikon-option-color", b).val(a(this).data("value"));
              a(".aikon-color-swatch", b).removeClass("aikon-color-swatch-active");
              a(this).addClass("aikon-color-swatch-active");
              f(b, c, !1)
            }),
            u.delegate(".aikon-size", "click", function () {
              var b = a(this).parents(".aikon-product")
                , c = b.data("aikon_item_data");
              a(".aikon-option-size", b).val(a(this).data("value"));
              a(".aikon-size", b).removeClass("aikon-size-active");
              a(this).addClass("aikon-size-active");
              f(b, c, !1)
            }),
            u.delegate(".aikon-size-select-box, .aikon-simple-options-box, .aikon-color-swatch-box", "click", function (a) {
              a.preventDefault()
            }),
            u.delegate(".aikon-option-other", "change", function () {
              var b = a(this).parents(".aikon-product")
                , c = b.data("aikon_item_data");
              f(b, c, !1)
            }));
          if ("infinite" == c.options.ResultsEnableInfiniteScrolling) {
            var H = 0;
            a(e).bind("scroll", function () {
              var b = a(".aikon-pagination")
                , c = a(".aikon-pagination .aikon-infinite-loader")
                , d = a(".aikon-infinite-loader").attr("rev")
                , f = {}
                , g = a(e).scrollTop();
              c.length && !c.hasClass("aikon-load-locked") && b.offset().top - 50 < a(e).height() + g && b.offset().top > g && g > H && (f.action = "moreResults",
                c.addClass("aikon-load-locked"),
                z(d, f));
              H = g
            })
          }
          a(".aikon-pagination", v).click(function (b) {
            b.preventDefault();
            b.stopPropagation();
            var d = a(b.target).attr("rev")
              , e = {};
            d && (a(b.target).hasClass("aikon-pagination-load-more") ? e.action = "moreResults" : M(c.searchResults.getPageHeader(), !0),
              z(d, e))
          });
          a(v).delegate(".aikon-no-products-found-text a.aikon-no-products-found-link", "click touch", function (b) {
            b.preventDefault();
            b.stopPropagation();
            S.q = a(b.target).text();
            S.sortBy = "relevance";
            S.sortOrder = "desc";
            S.startIndex = 0;
            G(S)
          });
          a(v).delegate(".aikon-link-home", "click", function (b) {
            b.preventDefault();
            b.stopPropagation();
            G(a.extend(!0, {}, X))
          });
          a(e).bind("resize", P);
          K() && (a(e).bind("scroll", g),
            g())
        }
        "showSpinner" == F && (a("#widget_disabled_opacity", v).width(a(".aikon-search-results-content", v).width()),
          a("#widget_disabled_opacity", v).height(a(".aikon-search-results-content", v).height()),
          a("#widget_disabled_opacity", v).removeClass("aikon-hidden"),
          a(".aikon-pagination", v).addClass("aikon-hidden"),
          a(".aikon-search-results-header", v).addClass("aikon-hidden"));
        "hideSpinner" == F && a("#widget_disabled_opacity", v).addClass("aikon-hidden");
        "changeView" == F && (a(".aikon-grid-mode-icon").toggleClass("active", "gridMode" == r),
          a(".aikon-list-mode-icon").toggleClass("active", "listMode" == r),
          a(".aikon-search-results-main-content > div", v).attr("id", "listMode" == r ? "aikon-search-results-list-mode" : "aikon-search-results-grid-mode"),
          Commerceinstruments.SetLocalStorage("aikon-view-mode", "gridMode" == r ? "grid" : "list"),
          P());
        if ("searchError" == F)
          return "infinite" == c.options.ResultsEnableInfiniteScrolling && r.params.hasOwnProperty("page") && 1 != r.params.page ? (a(".aikon-pagination .aikon-infinite-loader", v).removeClass("aikon-load-locked"),
            a("#widget_disabled_opacity", v).addClass("aikon-hidden"),
            a(".aikon-pagination", v).removeClass("aikon-hidden"),
            a(".aikon-search-results-header", v).removeClass("aikon-hidden")) : e.location.href = b.ResultsFallbackUrl + r.params.q,
            !0;
        if ("results" == F || "moreResults" == F) {
          var ha = {};
          var q = [];
          T = r.params.tab;
          V = r;
          q = r.params;
          r.result && ("moreResults" == F && x ? a.each(r.result, function (a, b) {
            "items" != a && "categories" != a && "pages" != a && (x[a] = b)
          }) : x = r.result);
          "bigcommerce" == c.options.Platform && "bigcom_category" in x && (ia = !0,
            v.addClass("aikon-collection-mode"),
            a(".aikon-search-results-page-title").hide());
          y = x.correctedQuery ? x.correctedQuery : q.q;
          ba = x.facets ? D(q.restrictBy, x.facets) : {};
          T || (x.items.length || !a.isEmptyObject(ba) ? T = "products" : x.categories.length ? T = "categories" : x.pages.length && (T = "pages"));
          "results" == F && (c.searchInputs.val(q.q),
            a(".aikon-main-panel", v).html(m(T, x, q)));
          var J = []
            , w = void 0;
          "products" == T ? ("results" == F && (J = a(".aikon-grid-mode-icon", v).hasClass("active") ? "aikon-search-results-grid-mode" : "aikon-search-results-list-mode",
            a(".aikon-search-results-main-content > div", v).removeClass("aikon-search-results-categories").removeClass("aikon-search-results-pages").attr("id", J)),
            r.result ? (J = L(r.result.items, y),
              x.items = "moreResults" == F ? x.items.concat(r.result.items) : r.result.items) : J = L(x.items, y),
          "results" == F && x.facets && x.facets.length && (x.items && x.items.length || !a.isEmptyObject(ba)) && (!E() || "Y" != b.ResultsShowFiltersInSidebar && "Y" != b.ResultsShowFiltersInTopSection ? ("Y" == b.ResultsShowFiltersInSidebar && (w = !0,
            a(".aikon-filters-sidebar", v).removeClass("aikon-hidden"),
          null == ea && (ea = new p.sidebarFilters),
            ea.build(a(".aikon-filters-sidebar", v), x)),
          "Y" == b.ResultsShowFiltersInTopSection && (a(".aikon-horizontal-filters", v).removeClass("aikon-hidden"),
          null == fa && (fa = new p.topbarFilters(a(".aikon-horizontal-filters", v), x.facets)),
            fa.build(a(".aikon-horizontal-filters", v), x))) : (ka || (ka = new R("mobile-filters-dialog", !0),
            ka.build()),
          null == pa && (pa = new p.MobileFilters(ka)),
            pa.build(a(".aikon-modal-content", ka.modal), x, a(".aikon-selected-filters-container", v), a(".aikon-selected-filters-count-container", v))))) : (a(".aikon-product-filters", v).addClass("aikon-hidden"),
            "pages" == T ? ("results" == F && a(".aikon-search-results-main-content > div", v).removeClass("aikon-search-results-categories").addClass("aikon-search-results-pages").attr("id", "aikon-search-results-list-mode"),
              r.result ? (J = l(r.result.pages, y),
                x.pages = "moreResults" == F ? x.pages.concat(r.result.pages) : r.result.pages) : J = l(x.pages)) : "categories" == T && ("results" == F && (a(".aikon-search-results-main-content > div", v).removeClass("aikon-search-results-pages").addClass("aikon-search-results-categories").attr("id", "aikon-search-results-list-mode"),
              x.categories = x.categories || {}),
              r.result ? (J = n(r.result.categories, y),
                x.categories = "moreResults" == F ? x.categories.concat(r.result.categories) : r.result.categories) : J = n(x.categories)));
          J.length ? (a(".aikon-pagination", v).html(B(T, x)),
            a(".aikon-pagination", v).removeClass("aikon-hidden"),
            u = a(".aikon-search-results-content", v),
            a(".aikon-search-results-header", v).html(U(T, x, q)).removeClass("aikon-hidden"),
          "results" == F && u.empty(),
          "results" == F && x.correctedQuery && (u.append(qa(T, x, q)),
            q.q = x.correctedQuery),
            u.append(J),
            v.height()) : (a(".aikon-search-results-header", v).addClass("aikon-hidden"),
            a(".aikon-pagination", v).addClass("aikon-hidden"),
            a(".aikon-search-results-content", v).empty().append(qa(T, x, q)));
          ha = a.extend(ha, q);
          S = a.extend(S, ha);
          Commerceinstruments.history.load(C(ha), ha);
          q = x.facets ? N(q.restrictBy, x.facets) : [];
          "Y" == b.demoMode && a(".aikon-view-link", v).add(".aikon-button", v).attr("target", "_blank");
          a.contains(document, d.get(0)) && d.replaceWith(v);
          P(w);
          "shopify" == b.Platform && ("products" == T && "Y" == c.options.ResultsShowOptionVariants && J.each(function (b, c) {
            var d = a(this).data("aikon_item_data");
            a(this).attr("data-product-variant", d.shopify_variants[0].variant_id);
            f(a(this), d, !0)
          }),
            ha = "",
          ia && x.shopify_collection && (ha = x.shopify_collection.title),
            ia ? "Y" === c.options.SmartNavigationOverrideSeo && h(q, ha) : h(q, y),
          "Y" == c.options.SwymCorporationWishlistPlusSupport && ma(),
          "Y" === c.options.ProductCompareEnabled && invokeProductCompare(),
          "Y" == c.options.BestCurrencyConverter && "undefined" !== typeof e.DoublyGlobalCurrency && e.DoublyGlobalCurrency.convertAll(a("[name=doubly-currencies]").val()))
        }
      }

      function h(a, c) {
        var d = b.StoreName
          , e = a.filter(function (a) {
          return a
        })
          , f = d
          , g = d;
        !e.length && c ? (f = b.LabelSeoTitle.split("[search_request]").join(c).split("[store_name]").join(d),
          g = b.LabelSeoDescription.split("[search_request]").join(c).split("[store_name]").join(d)) : c && (f = b.LabelSeoTitleFilters.split("[filters]").join(e.join(" / ")).split("[search_request]").join(c).split("[store_name]").join(d),
          g = b.LabelSeoDescriptionFilters.split("[filters]").join(e.join(" / ")).split("[search_request]").join(c).split("[store_name]").join(d));
        document.title = f;
        document.querySelector('meta[name="description"]') && document.querySelector('meta[name="description"]').setAttribute("content", g)
      }

      function N(b, d) {
        var e = [];
        a.each(d, function (d, f) {
          if (void 0 != b[f.attribute]) {
            var g = "";
            g = "";
            var h = [];
            "price" == f.attribute ? (g = b[f.attribute].split(",").map(function (a) {
              return c.options.PriceFormatSymbol + a
            }).join("-"),
              e.push(g)) : (g = b[f.attribute].split("\\|").join("[:dummy:]").split("|").join("[:separator:]").split("[:dummy:]").join("|"),
              h = g.split("[:separator:]"),
              g = a.grep(f.buckets, function (b) {
                return -1 !== a.inArray(b.value, h)
              }),
              g = a.map(g, function (a) {
                return a.title ? a.title : a.value
              }),
              h = a(g).filter(function (a, b) {
                return a === this.indexOf(b)
              }),
              e.push(a.map(h, function (a) {
                return a
              }).join(" / ")))
          }
        });
        return e
      }

      function z(a, b) {
        b = b || {};
        "products" == T ? b.page = a : "categories" == T ? b.category_index = a : "pages" == T && (b.page_index = a);
        c.searchResults.search(b)
      }

      function L(d, e) {
        var f = a("<div/>")
          , g = b.ResultsItemGrid;
        "Y" == c.options.ResultsShowOptionVariants && (g = b.ResultsOptionsItemGrid);
        a.each(d, function (d, h) {
          h.link = c.attach_ga_param(h.link, e);
          h.price_info = c.priceInfo(h);
          var k = c.render_tpl(g, h);
          a("#aikon-product-" + h.product_id, v).find(".aikon-action-button").hasClass("size-button-view-cart") && (k = a(k),
            k.find(".aikon-action-button").addClass("size-button-view-cart").text(b.LabelResultsViewCart));
          a("#aikon-product-" + h.product_id, v).hasClass("mobile-in-view") && (k = a(k).addClass("mobile-in-view"));
          "9G7N6o8F6N" == c.result_params.api_key && a(k).find("span.aikon-description ul.aikon-bullet-list").length && (k = a(k),
            k.find("span.aikon-description").addClass("aikon-bullet-wrapper"));
          a(k).data("aikon_item_data", h).appendTo(f)
        });
        0 != c.options.ResultsTitleStrings ? a("span.aikon-title", f).css({
          "max-height": 1.4 * c.options.ResultsTitleStrings + "em",
          "-webkit-line-clamp": c.options.ResultsTitleStrings.toString()
        }) : a("span.aikon-title", f).addClass("aikon-hidden");
        0 != c.options.ResultsDescriptionStrings ? a("span.aikon-description", f).css({
          "max-height": 1.4 * c.options.ResultsDescriptionStrings + "em",
          "-webkit-line-clamp": c.options.ResultsDescriptionStrings.toString()
        }) : a("span.aikon-description", f).addClass("aikon-hidden");
        a(".aikon-product .bold_collection_discount_icon", f).html(a("#se_support_bold_product_discount .shappify-sales-icon-collection").clone());
        return f.children()
      }

      function n(d, e) {
        var f = a("<div/>");
        a.each(d, function (a, d) {
          d.link = c.attach_ga_param(d.link, e);
          f.append(c.render_tpl(b.ResultsCategory, d).replace('<span class="aikon-description"></span>', ""))
        });
        return f.children()
      }

      function l(d, e) {
        var f = a("<div/>");
        a.each(d, function (a, d) {
          d.link = c.attach_ga_param(d.link, e);
          f.append(c.render_tpl(b.ResultsPage, d).replace('<span class="aikon-description"></span>', ""))
        });
        return f.children()
      }

      function B(b, d) {
        if ("categories" == b) {
          var f = parseInt(d.categoryStartIndex);
          var g = parseInt(d.totalCategories);
          var h = c.result_params.categoriesMaxResults;
          var k = S.category_index ? parseInt(S.category_index) : 1
        } else
          "pages" == b ? (f = parseInt(d.pageStartIndex),
            g = parseInt(d.totalPages),
            h = c.result_params.pagesMaxResults,
            k = S.page_index ? parseInt(S.page_index) : 1) : (f = parseInt(d.startIndex),
            g = parseInt(d.totalItems),
            h = c.options.ResultsItemCount,
            k = S.page ? parseInt(S.page) : 1);
        var r = Math.ceil(g / h);
        h = "";
        if ("infinite" == c.options.ResultsEnableInfiniteScrolling)
          return d["products" == b ? "items" : b].length != g && (h = 10 < k ? '<div><a href="" class="aikon-pagination-load-more" rev="' + (k + 1) + '" data-no-instant="true">' + c.options.LabelResultsInfiniteScrollingLoadMore + "</a></div>" : '<div class="aikon-infinite-loader" rev="' + (k + 1) + '"></div>'),
            h;
        if ("Y" == c.options.ResultsEnableInfiniteScrolling)
          return d["products" == b ? "items" : b].length != g && (h = '<div><a href="" class="aikon-pagination-load-more" rev="' + (k + 1) + '" data-no-instant="true">' + c.options.LabelResultsInfiniteScrollingLoadMore + "</a></div>"),
            h;
        if (E() && "Y" == c.options.ResultsEnableNewMobileLook)
          return d["products" == b ? "items" : b].length != g && (h += '<div class="aikon-current-page">' + c.options.LabelResultsPaginationCurrentPage.split("[page]").join(k).split("[total_pages]").join(r) + "</div>",
            h += '<a href="#" class="aikon-pagination-prev' + (1 == k ? ' disabled"' : '" rev="' + (k - 1) + '"') + ' data-no-instant="true">' + c.options.LabelResultsPaginationPreviousPage + "</a>",
            h += '<a href="#" class="aikon-pagination-next' + (k == r ? ' disabled"' : '" rev="' + (k + 1) + '"') + ' data-no-instant="true">' + c.options.LabelResultsPaginationNextPage + "</a>"),
            h;
        if (0 == g || f > g || 1 == r)
          return h;
        h += "<ul>";
        h = (1 == k ? h + '<li><span class="aikon-pagination-prev disabled">\u00ab</span></li>' : h + ('<li><a href="#" class="aikon-pagination-prev" rev="' + (k - 1) + '" data-no-instant="true">\u00ab</a></li>')) + ('<li><a href="#"' + (1 == k ? ' class="active"' : "") + ' rev="1" data-no-instant="true">1</a></li>');
        3 < k - 1 && (h += "<li><span>...</span></li>");
        for (f = Math.max(2, k - 2); f <= Math.min(k + 2, r - 1); f++)
          h = f == k ? h + ('<li><a href="#" class="active" rev="' + f + '" data-no-instant="true">' + f + "</a></li>") : h + ('<li><a href="#" rev="' + f + '" data-no-instant="true">' + f + "</a></li>");
        3 < r - k && (h += "<li><span>...</span></li>");
        1 != r && (h += '<li><a href="#"' + (k == r ? ' class="active"' : "") + ' rev="' + r + '" data-no-instant="true">' + r + "</a></li>");
        h = (k == r ? h + '<li><span class="aikon-pagination-next disabled">\u00bb</span></li>' : h + ('<li><a href="#"class="aikon-pagination-next" rev="' + (k + 1) + '" data-no-instant="true">\u00bb</a></li>')) + "</ul>";
        if ("5Z4o3T5V8y" == c.result_params.api_key && "function" === typeof URLSearchParams) {
          f = new URLSearchParams(e.location.search);
          g = e.location.href.split("?")[0];
          a('link[rel="prev"],link[rel="next"]').remove();
          if (1 != k) {
            f.set("page", k - 1);
            var F = g + "?" + f.toString();
            a("head").append('<link rel="prev" href="' + F + '" />')
          }
          k != r && (f.set("page", k + 1),
            k = g + "?" + f.toString(),
            a("head").append('<link rel="next" href="' + k + '" />'))
        }
        return h
      }

      function m(b, d, e) {
        var f = ""
          , g = c.options
          , h = {};
        "bigcommerce" == c.options.Platform ? h = d.bigcom_category : "shopify" == c.options.Platform && (h = d.shopify_collection);
        if (ia && d.items.length) {
          var k = h ? g.LabelResultsFound : g.LabelResultsFoundWithoutQuery;
          k = k.split("[count]").join("<b>" + d.totalItems + (d.totalItemsLimited ? "+" : "") + "</b>");
          h && (k = k.split("[search_string]").join(c.escapeHTML(h.title)),
            a(".aikon-search-results-page-title").html(c.escapeHTML(h.title)).show());
          f += '<div class="aikon-main-panel-collection-results-found">' + k + "</div>"
        }
        f += '<div class="aikon-main-panel-controls"><ul>';
        if (d.items.length || !a.isEmptyObject(ba))
          f += '<li><a href="#" class="aikon-main-panel-controls-products' + ("products" == b ? " active" : "") + '" data-no-instant="true">' + g.LabelResultsTabProducts + '<span class="aikon-products-tab-total"> (' + d.totalItems + ")</span></a></li>";
        d.categories.length && (f += '<li><a href="#" class="aikon-main-panel-controls-categories' + ("categories" == b ? " active" : "") + '" data-no-instant="true">' + g.LabelResultsTabCategories + '<span class="aikon-categories-tab-total"> (' + d.totalCategories + ")</span></a></li>");
        d.pages.length && (f += '<li><a href="#" class="aikon-main-panel-controls-pages' + ("pages" == b ? " active" : "") + '" data-no-instant="true">' + g.LabelResultsTabPages + '<span class="aikon-pages-tab-total"> (' + d.totalPages + ")</span></a></li>");
        f += "</ul></div>";
        if ("products" == b) {
          b = {};
          !ia || "shopify" != c.options.Platform && "bigcommerce" != c.options.Platform ? b["relevance-desc"] = {
            label: g.LabelResultsSortRelevance,
            isCurrent: !e.sortBy || "relevance" == e.sortBy
          } : d.shopify_collection && g.ResultsManualSortingCategories[e.collection] && (b["collection_" + d.shopify_collection.collection_id + "_position-asc"] = {
            label: g.LabelResultsFeatured,
            isCurrent: e.sortBy == "collection_" + d.shopify_collection.collection_id + "_position" && "asc" == e.sortOrder
          });
          b["title-asc"] = {
            label: g.LabelResultsSortTitleAsc,
            isCurrent: "title" == e.sortBy && "asc" == e.sortOrder
          };
          b["title-desc"] = {
            label: g.LabelResultsSortTitleDesc,
            isCurrent: "title" == e.sortBy && "desc" == e.sortOrder
          };
          if ("shopify" == g.Platform || "bigcommerce" == g.Platform || "Y" == g.ShowDateCreatedSorting)
            b["created-desc"] = {
              label: g.LabelResultsSortCreatedDesc,
              isCurrent: "created" == e.sortBy && "desc" == e.sortOrder
            },
              b["created-asc"] = {
                label: g.LabelResultsSortCreatedAsc,
                isCurrent: "created" == e.sortBy && "asc" == e.sortOrder
              };
          "Y" == g.PriceAccess && (b["price-asc"] = {
            label: g.LabelResultsSortPriceAsc,
            isCurrent: "price" == e.sortBy && "asc" == e.sortOrder
          },
            b["price-desc"] = {
              label: g.LabelResultsSortPriceDesc,
              isCurrent: "price" == e.sortBy && "desc" == e.sortOrder
            });
          "Y" != g.ShowDiscountSorting || "Y" != g.PriceAccess || "shopify" != g.Platform && "bigcommerce" != g.Platform || (b["discount-desc"] = {
            label: g.LabelResultsSortDiscountDesc,
            isCurrent: "discount" == e.sortBy && "desc" == e.sortOrder
          });
          "Y" == g.ShowDiscountSorting && "Y" == g.PriceAccess && "5w1L9J3k5v" == c.result_params.api_key && (b["discount-asc"] = {
            label: g.LabelResultsSortDiscountAsc,
            isCurrent: "discount" == e.sortBy && "asc" == e.sortOrder
          });
          "Y" == g.ReviewsShowRating && (b["reviews_average_score-asc"] = {
            label: g.LabelResultsSortRatingAsc,
            isCurrent: "reviews_average_score" == e.sortBy && "asc" == e.sortOrder
          },
            b["reviews_average_score-desc"] = {
              label: g.LabelResultsSortRatingDesc,
              isCurrent: "reviews_average_score" == e.sortBy && "desc" == e.sortOrder
            },
            b["total_reviews-asc"] = {
              label: g.LabelResultsSortTotalReviewsAsc,
              isCurrent: "total_reviews" == e.sortBy && "asc" == e.sortOrder
            },
            b["total_reviews-desc"] = {
              label: g.LabelResultsSortTotalReviewsDesc,
              isCurrent: "total_reviews" == e.sortBy && "desc" == e.sortOrder
            });
          "Y" == g.ShowBestsellingSorting && (b["sales_amount-desc"] = {
            label: g.LabelResultsBestselling,
            isCurrent: "sales_amount" == e.sortBy && "desc" == e.sortOrder
          });
          "7G0u5P1x7F" == c.result_params.api_key && (b["quantity-desc"] = {
            label: "Quantity: High to Low",
            isCurrent: "quantity" == e.sortBy && "desc" == e.sortOrder
          });
          var r = currentLabel = "";
          a.each(b, function (a, b) {
            b.isCurrent && (currentLabel = b.label);
            b.label && (r += '<li><a href="#" class="aikon-main-panel-dropdown-' + a + (b.isCurrent ? " current" : "") + '" data-no-instant="true">' + b.label + "</a></li>")
          });
          e = Commerceinstruments.GetLocalStorage("aikon-view-mode") || g.ResultsDefaultView;
          f = f + ('<div class="aikon-main-panel-view-mode"><a href="#" class="aikon-view-mode-icon aikon-grid-mode-icon' + ("grid" == e ? " active" : "") + '" data-no-instant="true"><a href="#" class="aikon-view-mode-icon aikon-list-mode-icon' + ("list" == e ? " active" : "") + '" data-no-instant="true"></div><div class="aikon-main-panel-dropdown"><a href="#" class="aikon-main-panel-dropdown-button" data-no-instant="true"><span>') + (currentLabel + '</span><b class="caret"></b></a>');
          E() && da ? a(".aikon-modal-content", da.modal).html('<div class="aikon-sortby-header"><span class="aikon-sortby-title">' + g.LabelResultsSortBy + '</span></div><ul class="aikon-main-panel-dropdown-content">' + r + "</ul>") : f += '<ul class="aikon-main-panel-dropdown-content">' + r + "</ul>";
          f += "</div>";
          E() && d.facets && d.facets.length && ("Y" == g.ResultsShowFiltersInSidebar || "Y" == g.ResultsShowFiltersInTopSection) && (f += '<div class="aikon-main-panel-mobile-filters"><a href="#">' + g.LabelResultsFilters + '<span class="aikon-selected-filters-count-container"></span></a></div><div class="aikon-selected-filters-container"></div>')
        }
        return f
      }

      function U(a, b, d) {
        d = b.correctedQuery ? b.correctedQuery : d.q;
        var e = "pages" == a ? b.totalPages : "categories" == a ? b.totalCategories : b.totalItems;
        var f = d ? c.options.LabelResultsFound : c.options.LabelResultsFoundWithoutQuery;
        f = f.split("[count]").join("<b>" + c.escapeHTML(e + "") + ("products" == a && b.totalItemsLimited ? "+" : "") + "</b>");
        d && (f = f.split("[search_string]").join('<a class="aikon-no-products-found-link" href="#" data-no-instant="true">' + c.escapeHTML(d) + "</a>"));
        return f
      }

      function qa(b, d, e) {
        var f = '<li class="aikon-no-products-found' + (d.correctedQuery ? " aikon-with-suggestion" : "") + '"><div class="aikon-no-products-found-text">';
        e.q && ("products" != b || a.isEmptyObject(ba) || d.items.length) ? d.items.length || d.categories.length || d.pages.length || d.suggestions.length ? (f += "<span>" + c.options.LabelResultsNothingFound.split("[search_string]").join("<b>" + c.escapeHTML(e.q) + "</b>") + "</span>",
        d.correctedQuery && (f += ". <span>" + U(b, d, e) + "</span>"),
        d.suggestions.length && (f += "<div><span>" + c.makeDidYouMeanHTML(d.suggestions, d.correctedQuery || e.q, "results") + "</span></div>")) : f += "<span>" + c.options.LabelResultsNothingFoundSeeAllCatalog.split("[search_string]").join("<b>" + c.escapeHTML(e.q) + "</b>").split("[link_catalog_start]").join('<a class="aikon-link-home" href="#" data-no-instant="true">').split("[link_catalog_end]").join("</a>") + "</span>" : f += "<span>" + c.options.LabelResultsNothingFoundWithoutQuery + "</span>";
        return f + "</div></li>"
      }

      function P(d) {
        var f = a("#aikon-search-results-grid-mode")
          , g = "100%"
          , h = a("#aikon_results")
          , k = h.width();
        d = "object" === typeof d ? void 0 : d;
        void 0 == d && (d = a(".aikon-filters-sidebar", h).length && a(".aikon-filters-sidebar", h).is(":visible"));
        E() ? h.addClass("aikon-mobile-design") : h.removeClass("aikon-mobile-design");
        d && (g = k - 246 + "px");
        a(".aikon-search-results-main-content > div", h).css("width", g);
        a(".aikon-pagination").css("width", g);
        if (f.length) {
          f.removeClass();
          g = 0;
          d && (g = a(".aikon-filters-sidebar", h).width() + parseInt(a(".aikon-filters-sidebar", h).css("marginRight")));
          h = E() ? k : k - g;
          k = a(".aikon-product", f);
          d = k.eq(0);
          g = parseFloat(d.css("marginLeft")) + parseFloat(d.css("marginRight"));
          var z = parseFloat(d.css("minWidth")) + g;
          z = Math.floor(h / z);
          z > b.ResultsMaxProductsPerRow && (z = b.ResultsMaxProductsPerRow);
          E() && (z = parseFloat(d.css("minWidth")),
            d = parseFloat(d.css("paddingLeft")) + parseFloat(d.css("paddingRight")),
          160 < z && (z = 160),
            z = Math.ceil(2 * (z + g + d)) > a(e).width() ? 1 : 2);
          f.addClass(["aikon-one-column", "aikon-two-columns", "aikon-three-columns", "aikon-four-columns", "aikon-five-columns"][z - 1]);
          k.css({
            width: (100 / z - (0 < g ? 100 * g / h : 0)).toFixed(2) + "%"
          })
        } else
          a(".aikon-product", v).css({
            width: "100%"
          });
        c.triggerEvent("Commerceinstruments.ResultsUpdated", [v]);
        c.convertNativePickerMoney()
      }

      function u(a) {
        var d = /(.*):(asc|desc)$/
          , f = null;
        if ("shopify" == c.options.Platform) {
          if (~e.location.href.indexOf("/pages/search-results?collection=") ? f = a.collection : c.isCollectionPage(e.location.href) && "templates" == c.options.ResultsUseAsNavigation && (f = c.collectionHrefData(e.location.href).collection),
          null !== f)
            return b.ResultsManualSortingCategories[f] ? ["collection_" + b.ResultsManualSortingCategories[f] + "_position", "asc"] : d.test(b.SmartNavigationDefaultSorting) ? b.SmartNavigationDefaultSorting.match(d).slice(1, 3) : ["relevance", "desc"]
        } else if ("bigcommerce" == c.options.Platform && !~e.location.href.indexOf("/search-results"))
          return d.test(b.SmartNavigationDefaultSorting) ? b.SmartNavigationDefaultSorting.match(d).slice(1, 3) : ["relevance", "desc"];
        return d.test(b.ResultsProductDefaultSorting) ? b.ResultsProductDefaultSorting.match(d).slice(1, 3) : ["relevance", "desc"]
      }

      function A(d) {
        var f = {};
        d = d || {};
        var g = {};
        g = a.extend(Y(), ca());
        g.sort_by && (g.sortBy = g.sort_by);
        g.sort_order && (g.sortOrder = g.sort_order);
        d.restrictBy || (d.restrictBy = X.restrictBy ? a.extend({}, X.restrictBy) : {},
          a.each(g, function (a, b) {
            0 === a.indexOf("rb_") && (d.restrictBy[a.substr(3)] = b,
              delete g[a])
          }));
        if (!g.sortBy || !g.sortOrder) {
          var h = u(g);
          g.sortBy = g.sortBy ? g.sortBy : h[0];
          g.sortOrder = g.sortOrder ? g.sortOrder : h[1]
        }
        f = S = a.extend(!0, {}, X, g, d);
        f.startIndex = f.page ? (f.page - 1) * b.ResultsItemCount : 0;
        f.pageStartIndex = f.page_index ? (f.page_index - 1) * b.ResultsPagesCount : 0;
        f.categoryStartIndex = f.category_index ? (f.category_index - 1) * b.ResultsCategoriesCount : 0;
        "Y" == b.ResultsShowOnlyInStock && (f.restrictBy = f.restrictBy || {},
          f.restrictBy.quantity = "1|");
        if ("templates" == b.ResultsUseAsNavigation && (h = c.collectionHrefData(e.location.href),
        0 < Object.keys(h).length)) {
          "shopify" == c.options.Platform && (f.collection = decodeURIComponent(h.collection.replace(/\+/g, "%20")) || "");
          "bigcommerce" == c.options.Platform && (f.category = decodeURIComponent(h.category.replace(/\+/g, "%20")) || "");
          var k = Object.keys(f.restrictBy).length
            , z = "Y" == b.ResultsShowOnlyInStock && 1 == k && f.restrictBy.hasOwnProperty("quantity");
          if ((0 == k || z) && h.query_string_parts && h.query_string_parts.length) {
            var L = h.query_string_parts;
            a.each(L, function (a) {
              a = L[a].split("=");
              0 === a[0].indexOf("rb_") && (f.restrictBy[a[0].substr(3)] = a[1])
            })
          }
        }
        "Y" == c.options.EnableShopifyMultiCurrency && w("isNativeMulticurrencyEnabled") && (f.union = {
          price: {
            min: "price_" + Shopify.currency.active
          }
        },
          f.shopify_currency = Shopify.currency.active);
        return f
      }

      function C(b) {
        var d = Y() || {}
          , f = u(b);
        (d.q = "templates" == c.options.ResultsUseAsNavigation && c.isCollectionPage(e.location.href) ? "" : b.q) || delete d.q;
        (d.tab = b.tab) || delete d.tab;
        (d.sort_by = b.sortBy && b.sortBy != f[0] && b.sortBy) || delete d.sort_by;
        (d.sort_order = b.sortOrder && b.sortOrder != f[1] && b.sortOrder) || delete d.sort_order;
        (d.page = b.page) || delete d.page;
        (d.page_index = b.page_index) || delete d.page_index;
        (d.category_index = b.category_index) || delete d.category_index;
        b.restrictBy && x && x.facets && a.each(x.facets, function (a, c) {
          (d["rb_" + c.attribute] = b.restrictBy[c.attribute]) || delete d["rb_" + c.attribute]
        });
        return (f = a.param(d)) ? "!/?" + f : ""
      }

      function D(b, c) {
        var d = {};
        a.each(c, function (a, c) {
          void 0 != b[c.attribute] && (d[c.attribute] = b[c.attribute])
        });
        return d
      }

      function G(a, b) {
        k("showSpinner", {
          params: a
        });
        c.options.CommerceinstrumentsCustomerTags.length && (a.customer_tags = c.options.CommerceinstrumentsCustomerTags);
        "Y" == c.options.ResultsShowOptionVariants && (a.prepareVariantOptions = !0);
        c.triggerEvent("Commerceinstruments.DataRequestBefore", ["results", a]);
        c.processRequest(c.paths.request_results_url, a, function (d) {
          d.pages = d.pages || [];
          d.items = d.items || [];
          d.categories = d.categories || [];
          d.suggestions = d.suggestions || [];
          k("hideSpinner");
          c.triggerEvent("Commerceinstruments.DataRequestEnd", ["results", a, d]);
          c.handleUsergroupRules(d.usergroup_rules);
          var e = a.action || "results";
          d.error ? e = "searchError" : 0 < d.totalItems && W("results", {
            q: a.q || "",
            total: d.totalItems
          });
          k(e, {
            params: a,
            result: d
          });
          b && b()
        }, function () {
          k("hideSpinner");
          k("searchError", {
            params: a,
            result: x
          })
        })
      }

      function E() {
        return 769 > a(e).width()
      }

      var Z = '<div class="aikon-header"><div class="aikon-search-results-header aikon-hidden">' + b.LabelResultsFound + "</div></div>"
        ,
        I = '<div class="aikon-search-results-main-content"><div id="aikon-search-results-grid-mode"><div id="widget_disabled_opacity" class="disabled-opacity aikon-hidden"></div>' + ("0f8t6G2p5K" == c.autocmp_params.api_key ? '<h1 class="aikon-content-title" style="margin-bottom: 15px;text-align:center;font-weight: bold">Tip: Want to see more? Use broader or different keywords. For e.g. \'USB\' instead of USB 8GB memory Sticks. <br />Want to see less or refine the search results? Use filters on your left or check the Menu above</h1>' : "") + '<ul class="aikon-search-results-content clearfix"></ul></div></div>'
        ,
        O = "Y" == b.ResultsShowFiltersInSidebar ? '<div class="aikon-filters-sidebar aikon-product-filters aikon-hidden"></div>' : ""
        ,
        aa = "Y" == b.ResultsShowFiltersInTopSection ? '<div class="aikon-horizontal-filters aikon-product-filters clearfix aikon-hidden"></div>' : ""
        , v = a(".aikon-search-results")
        , ja = rtlClass = "";
      E() && (ja = " aikon-mobile-design",
      "Y" == b.ResultsEnableNewMobileLook && (ja += " aikon-new-version"));
      c.isRightToLeftLanguage() && (rtlClass = " aikon-rtl");
      v.length || (v = a('<div class="aikon aikon-search-results' + ja + rtlClass + '" id="' + d.attr("id") + '"><div class="aikon-main-panel"></div>' + Z + aa + O + I + '<div class="aikon-pagination aikon-hidden"></div>'));
      var V = void 0
        , X = c.result_params;
      X.maxResults = b.ResultsItemCount;
      X.pagesMaxResults = b.ResultsPagesCount;
      X.categoriesMaxResults = b.ResultsCategoriesCount;
      X.facets = "Y" == b.ResultsShowFiltersInSidebar || "Y" == b.ResultsShowFiltersInTopSection ? !0 : !1;
      X.facetsShowUnavailableOptions = "Y" == b.ResultsShowFiltersWithNoResults ? !0 : !1;
      X.ResultsTitleStrings = b.ResultsTitleStrings;
      X.ResultsDescriptionStrings = b.ResultsDescriptionStrings;
      var S = a.extend(!0, {}, X), x, T, ba, ia = !1, ea, fa, pa, ka, da, ra = a(e).width();
      a(e).bind("resize", function () {
        a(e).width() != ra && (ra = a(e).width(),
          k("results", {
            params: V.params
          }))
      });
      return {
        search: function (a, b) {
          G(A(a), b)
        },
        start: function () {
          k("init");
          var a = A();
          if ("Y" == c.options.ResultsEnableInfiniteScrolling || "infinite" == c.options.ResultsEnableInfiniteScrolling) {
            if (1 < a.page) {
              var b = a.page * a.maxResults;
              100 <= b ? a.page = 1 : a.maxResults = b;
              a.startIndex = 0
            }
            1 < a.category_index && (b = a.category_index * a.categoriesMaxResults,
              50 <= b ? a.category_index = 1 : a.categoriesMaxResults = b,
              a.categoryStartIndex = 0);
            1 < a.page_index && (b = a.page_index * a.pagesMaxResults,
              50 <= b ? a.page_index = 1 : a.pagesMaxResults = b,
              a.pageStartIndex = 0)
          }
          c.translateQueryIfNeeded(a.q, function (b) {
            a.q = b;
            G(a)
          })
        },
        getStoredParams: function () {
          return S
        },
        setStoredParams: function (a) {
          S = a
        },
        getPrevData: function () {
          return V
        },
        getContent: function () {
          return v
        },
        getPageHeader: function () {
          var b = a("div.aikon-search-results").parent().siblings("h1:visible")
            , c = a("div.aikon-search-results").parents().find("h1:visible").first();
          return b.length ? b : c.length ? c : v
        },
        isCollectionMode: function () {
          return ia
        },
        isMobileMode: function () {
          return E()
        }
      }
    };
    p.filters = function () {
      this.init.apply(this, arguments)
    }
    ;
    p.filters.prototype = {
      init: function () {
        this.statesMap = {};
        this.hiddenBuckets = []
      },
      build: function (a, b, c, e) {
        this.container = a;
        this.result = b;
        this.container.html(this.render());
        c && (this.selectedFiltersContainer = c,
          this.selectedFiltersContainer.html(this.renderSelected()));
        e && (this.selectedFiltersCountContainer = e,
          this.selectedFiltersCountContainer.html(this.renderSelectedCount()));
        this.attachEvents();
        this.initSliders()
      },
      render: function () {
      },
      renderSelected: function () {
      },
      renderSelectedCount: function () {
      },
      getSelectedFilterCount: function (a) {
        var b = 0;
        if (0 < a.buckets.length)
          for (var c = 0; c < a.buckets.length; c++)
            a.buckets[c].hasOwnProperty("selected") && "true" == a.buckets[c].selected && b++;
        return b
      },
      renderOne: function (d, b) {
        var e = ""
          , f = this
          , k = c.searchResults.getStoredParams();
        if ("select" == d.type && "color" == d.appearance)
          e += '<ul class="aikon-product-color-filter clearfix" style="display: ' + (b ? "block" : "none") + '">',
            a.each(d.buckets, function (a, b) {
              if (b.count || "Y" == c.options.ResultsShowFiltersWithNoResults) {
                var f = ""
                  , g = "";
                "*" == b.color_code ? f = "icon-multicolor" : "#" == b.color_code ? f = "icon-clear" : (g = "background-color: #" + b.color_code + ";",
                !b.count && b.color_code.match(/ffffff/i) && (g += " opacity: 0.5;"));
                e += '<li class="' + (b.count ? "" : "aikon-disabled") + " " + (0 != d.more_count && a + 1 > d.more_count ? "aikon-hidden" : "") + '"><label><div class="aikon-color-filter-checkbox"><input class="aikon-product-filters-checkbox aikon-product-color-filters-checkbox" type="checkbox" name="' + d.attribute + '" value="' + c.escapeHTML(c.escapeFacetValue(b.value)) + '"' + (b.selected && b.count ? ' checked="true"' : "") + (b.count ? "" : ' disabled="true"') + " /><span" + (0 < f.length ? ' class="' + f + '"' : "") + (0 < g.length ? ' style="' + g + '"' : "") + ' title="' + b.title + '"></span></div></label></li>'
              }
            }),
          0 != d.more_count && d.buckets.length > d.more_count && (e += '<li class="aikon-filters-show-more"><div id="aikon-show-more-filters">' + c.options.LabelResultsBucketsShowMore + "</div></li>",
            a(document.body).delegate("#aikon-show-more-filters", "mousedown", function () {
              a(this).parent().prevAll().removeClass("aikon-hidden");
              a(this).addClass("aikon-hidden").parent(".aikon-filters-show-more").addClass("aikon-hidden")
            })),
            e += "</ul>";
        else if ("select" == d.type && "size" == d.appearance)
          e += '<ul class="aikon-product-size-filter clearfix" style="display: ' + (b ? "block" : "none") + '">',
            a.each(d.buckets, function (a, b) {
              if (b.count || "Y" == c.options.ResultsShowFiltersWithNoResults)
                e += '<li class="' + (b.count ? "" : "aikon-disabled") + " " + (0 != d.more_count && a + 1 > d.more_count ? "aikon-hidden" : "") + '"><label><div class="aikon-size-filter-checkbox"><input class="aikon-product-filters-checkbox aikon-product-size-filters-checkbox" type="checkbox" name="' + d.attribute + '" value="' + c.escapeHTML(c.escapeFacetValue(b.value)) + '"' + (b.selected && b.count ? 'checked="true"' : "") + (b.count ? "" : ' disabled="true"') + " /><span>" + (b.title ? b.title : b.value) + "</span></div></label></li>"
            }),
          0 != d.more_count && d.buckets.length > d.more_count && (e += '<li class="aikon-filters-show-more"><div id="aikon-show-more-filters">' + c.options.LabelResultsBucketsShowMore + "</div></li>",
            a(document.body).delegate("#aikon-show-more-filters", "mousedown", function () {
              a(this).parent().prevAll().removeClass("aikon-hidden");
              a(this).addClass("aikon-hidden").parent(".aikon-filters-show-more").addClass("aikon-hidden")
            })),
            e += "</ul>";
        else if ("select" == d.type && "rating" == d.attribute)
          "Y" == c.options.ReviewsShowRating && (e += '<ul class="aikon-product-filters-list" style="display: ' + (b ? "block" : "none") + '">',
            a.each(d.buckets, function (a, b) {
              e += '<li class="' + (b.count ? "" : "aikon-disabled") + '"><label><div class="aikon-filter-checkbox"><input class="aikon-product-filters-checkbox" type="checkbox" name="' + d.attribute + '" value="' + b.value + '"' + (b.selected && b.count ? ' checked="true"' : "") + (b.count ? "" : ' disabled="true"') + " /><span></span></div><span>" + ("nostar" != b.value ? '<span class="stars-container stars-' + b.value + '">\u2605\u2605\u2605\u2605\u2605</span>' : c.options.LabelResultsNoReviews) + '<span class="aikon-filter-variant-count">' + (b.count || 0) + "</span></span></label></li>"
            }),
            e += "</ul>");
        else if ("select" == d.type) {
          var h = function (a, b) {
            return '<li class="' + (a.count ? "" : "aikon-disabled") + '"><label><div class="aikon-filter-checkbox"><input class="aikon-product-filters-checkbox" type="checkbox" name="' + b.attribute + '" value="' + c.escapeHTML(c.escapeFacetValue(a.value)) + '"' + (a.selected ? ' checked="true"' : "") + (a.count || a.selected ? "" : ' disabled="true"') + ' /><span class="needsclick"></span></div><span class="needsclick">' + c.escapeHTML(a.title ? a.title : a.value) + '<span class="aikon-filter-variant-count">' + a.count + "</span></span></label></li>"
          };
          "7w8Z1e2S0i" == c.autocmp_params.api_key && 10 < d.buckets.length && (e += '<div class="aikon-product-filters-search"><input type="text" class="aikon-filter-input" id="product_filters_search_' + d.attribute + '" name="product_filters_search_' + d.attribute + '" placeholder="Refine Search.." /></div>',
            d.more_count = 0);
          e += '<ul class="aikon-product-filters-list" style="display: ' + (b ? "block" : "none") + '">';
          var n = k.restrictBy[d.attribute];
          a.each(d.buckets, function (b, g) {
            "stock_status" == d.attribute && "In stock" == g.value && (g.title = c.options.LabelResultsInStock);
            "stock_status" == d.attribute && "Pre-Order" == g.value && (g.title = c.options.LabelResultsPreOrder);
            g.value = a.trim(g.value.replace(/&nbsp;/gi, " "));
            if (0 != d.more_count && b + 1 > d.more_count) {
              "undefined" === typeof f.hiddenBuckets[d.attribute] && (f.hiddenBuckets[d.attribute] = []);
              if (f.hiddenBuckets[d.attribute].length >= d.buckets.length - d.more_count)
                return;
              if (!n || -1 === n.replace(/\\\|/g, "").split("|").indexOf(g.value)) {
                f.hiddenBuckets[d.attribute].push(g);
                return
              }
            }
            if (g.count || g.selected || "Y" == c.options.ResultsShowFiltersWithNoResults)
              e += h(g, d)
          });
          0 != d.more_count && d.buckets.length > d.more_count && (e += '<li class="aikon-filters-show-more"><div id="aikon-show-more-filters" data-se-facet-attribute="' + d.attribute + '">' + c.options.LabelResultsBucketsShowMore + "</div></li>",
            a(document.body).off("mousedown").on("mousedown", "#aikon-show-more-filters", function () {
              var b = a(this).data("seFacetAttribute")
                , c = a(this).parents("ul.aikon-product-filters-list");
              a(this).hasClass("aikon-clicked") || (a(this).addClass("aikon-clicked"),
                a.each(f.hiddenBuckets[b], function (a, d) {
                  var e = h(d, {
                    attribute: b
                  });
                  c.append(e)
                }));
              a(this).parent().addClass("aikon-hidden")
            }));
          e += "</ul>"
        } else
          "slider" == d.type && (e += '<ul class="aikon-product-filters-list" style="display: ' + (b ? "block" : "none") + '">',
            e += '<li><div class="aikon-price-range"><input type="number" class="aikon-price-range-input aikon-range-min-' + d.attribute + '" placeholder="Min" /><span class="aikon-range-divider"> \u2013 </span><input type="number" class="aikon-price-range-input aikon-range-max-' + d.attribute + '" placeholder="Max" /><div class="aikon-price-range-slider"><input id="aikon_slider_' + d.attribute + '" type="hidden" class="aikon-range-slider"  style="display: none;"></div></div></li>',
            e += "</ul>");
        return e
      },
      attachEvents: function (d, b) {
        var e = this;
        a(".aikon-product-filters-reset", this.container).click(function (b) {
          b.stopPropagation();
          e.resetHiddenBuckets();
          b = a(this).data("seFacetAttribute");
          var d = c.searchResults.getStoredParams();
          delete d.restrictBy[b];
          c.searchResults.search({
            page: 1,
            restrictBy: d.restrictBy
          });
          return !1
        });
        a(".aikon-product-filters-reset-all", this.container).click(function (a) {
          e.resetHiddenBuckets();
          c.searchResults.search({
            page: 1,
            restrictBy: {}
          })
        });
        a(this.container).off("change").on("change", ".aikon-product-filters-checkbox", function (f) {
          f = a(this).attr("name");
          var g = c.searchResults.getStoredParams()
            , h = [];
          e.resetHiddenBuckets();
          a('input[name="' + f + '"]:checked', e.container).each(function () {
            h.push(a(this).val())
          });
          g = g.restrictBy;
          h.length ? g[f] = h.join("|") : delete g[f];
          d && d.call(this);
          c.searchResults.isMobileMode() || M(c.searchResults.getPageHeader(), !0);
          c.searchResults.search({
            restrictBy: g,
            page: 1
          }, b)
        })
      },
      initSliders: function (d, b) {
        var e = this
          , f = c.searchResults.getStoredParams();
        a.each(this.result.facets, function (g, h) {
          if ("N" != c.options.PriceAccess || "price" != h.attribute) {
            if ("slider" != h.type)
              return !0;
            var k = "price" == h.attribute ? {
              from: h.buckets[0].from / c.options.PriceFormatRate,
              to: h.buckets[0].to / c.options.PriceFormatRate,
              left: h.buckets[0].left / c.options.PriceFormatRate,
              right: h.buckets[0].right / c.options.PriceFormatRate
            } : h.buckets[0];
            var z = Math.floor(k.from)
              , n = Math.ceil(k.to);
            if (f.restrictBy && f.restrictBy[h.attribute]) {
              var l = parseFloat(k.left) != Math.round(k.left) ? parseFloat(k.left).toFixed(2) : Math.round(k.left);
              k = parseFloat(k.right) != Math.round(k.right) ? parseFloat(k.right).toFixed(2) : Math.round(k.right)
            } else
              l = z,
                k = n;
            var m = a(".aikon-range-min-" + h.attribute, e.container)
              , B = a(".aikon-range-max-" + h.attribute, e.container)
              , J = a("#aikon_slider_" + h.attribute, e.container)
              , U = null;
            m.add(B).change(function () {
              var a = parseFloat(m.val()) || 0
                , e = parseFloat(B.val()) || 0;
              if (0 == a || a < h.buckets[0].from)
                a = h.buckets[0].from;
              "9u1C3q5Z9D" == c.autocmp_params.api_key && (h.buckets[0].to = n);
              0 == e || e > h.buckets[0].to ? e = h.buckets[0].to : e < h.buckets[0].from && (e = h.buckets[0].from);
              a > e && (a = e);
              parseFloat(a) != Math.round(a) && (a = parseFloat(a).toFixed(2));
              parseFloat(e) != Math.round(e) && (e = parseFloat(e).toFixed(2));
              m.val(a);
              B.val(e);
              U = setTimeout(function () {
                var g = f.restrictBy;
                g[h.attribute] = "price" == h.attribute ? a * c.options.PriceFormatRate + "," + e * c.options.PriceFormatRate : a + "," + e;
                c.searchResults.isMobileMode() || M(c.searchResults.getPageHeader(), !0);
                d && d.call(this);
                c.searchResults.search({
                  restrictBy: g,
                  page: 1
                }, function () {
                  b && b(h)
                })
              }, 100);
              J.jRange("setValue", a + "," + e)
            });
            J.val(l + "," + k);
            if (l != z || k != n)
              m.val(l),
                B.val(k);
            var p = isUpdateRangeMaxVal = !1;
            J.jRange({
              onstatechange: function (a) {
                a = a.split(",");
                isNaN(a[0]) || isNaN(a[1]) || (p ? m.val(a[0]) : isUpdateRangeMaxVal && B.val(a[1]))
              },
              ondragstart: function (a, b) {
                clearTimeout(U);
                b.hasClass("low") ? p = !0 : isUpdateRangeMaxVal = !0
              },
              ondragend: function (a) {
                p = isUpdateRangeMaxVal = !1;
                m.trigger("change")
              },
              from: z,
              to: n,
              step: 1,
              format: "%s",
              width: J.parent().width() ? J.parent().width() - 24 : 176,
              isRange: !0,
              theme: "aikon-theme",
              showLabels: !1
            })
          }
        })
      },
      resetState: function () {
        this.statesMap = {}
      },
      resetHiddenBuckets: function () {
        this.hiddenBuckets = []
      }
    };
    p.sidebarFilters = function () {
      p.filters.apply(this, arguments)
    }
    ;
    p.sidebarFilters.prototype = Object.create(p.filters.prototype);
    p.sidebarFilters.prototype.constructor = p.sidebarFilters;
    a.extend(p.sidebarFilters.prototype, {
      init: function () {
        p.filters.prototype.init.apply(this, arguments)
      },
      render: function () {
        var d = ""
          , b = this
          , e = c.searchResults.getStoredParams()
          , f = !0;
        c.searchResults.isMobileMode() && (f = !1,
        void 0 != b.statesMap.aikon_filters_block && (f = "open" == b.statesMap.aikon_filters_block),
          d += '<div id="aikon_filters_block" class="aikon-product-filters-block"><div class="aikon-product-filters-title ' + (f ? "open" : "") + '"><i class="aikon-product-filters-close"></i><i class="aikon-product-filters-open"></i><span>' + c.options.LabelResultsFilters + "</span></div>");
        a.each(this.result.facets, function (a, g) {
          if (!("N" == c.options.PriceAccess && "price" == g.attribute || "N" == c.options.ReviewsShowRating && "rating" == g.attribute || c.searchResults.isMobileMode() && "Y" != g.show_on_mobile)) {
            var h = !c.searchResults.isMobileMode() && "open" == g.desktop_view;
            void 0 != b.statesMap["aikon_filters_block_" + g.attribute] && (h = "open" == b.statesMap["aikon_filters_block_" + g.attribute]);
            d += '<div id="aikon_filters_block_' + g.attribute + '" class="aikon-product-filters-block" style="display: ' + (f ? "block" : "none") + '"><div class="aikon-product-filters-title ' + (h ? "open" : "") + '"><i class="aikon-product-filters-close"></i><i class="aikon-product-filters-open"></i><span>' + g.title;
            "price" == g.attribute && (d += '<span class="aikon-product-filters-price-symbol">, ' + c.options.PriceFormatSymbol + "</span>");
            e.restrictBy[g.attribute] && ("select" == g.type && (d += " (" + b.getSelectedFilterCount(g) + ")"),
              d += ' <a href="#" data-no-instant="true"><i class="aikon-product-filters-reset" data-se-facet-attribute="' + g.attribute + '"></i></a>');
            d += "</span></div>";
            d += b.renderOne(g, h);
            d += "</div>"
          }
        });
        c.searchResults.isMobileMode() && (d += "</div>");
        return d
      },
      attachEvents: function () {
        var c, b, e = this;
        p.filters.prototype.attachEvents.call(this, function () {
          c = a(this).closest(".aikon-product-filters-block").attr("id");
          b = a(this).closest(".aikon-product-filters-list").scrollTop()
        }, function () {
          a("#" + c).find(".aikon-product-filters-list").scrollTop(b)
        });
        a(".aikon-product-filters-title", this.container).bind("click.sidebar", function (b) {
          b.stopPropagation();
          a(this).toggleClass("open");
          a(this).nextAll().toggle();
          e.statesMap[a(this).parent().attr("id")] = a(this).hasClass("open") ? "open" : ""
        });
        a(".aikon-product-filters-search input.aikon-filter-input", this.container).bind("keyup", function () {
          var b = this.value.toLowerCase().trim()
            , c = a(this).closest(".aikon-product-filters-block").find("ul.aikon-product-filters-list")
            , d = a(this).closest(".aikon-filters-dropdown-content").find("ul.aikon-product-filters-list");
          a(c).children("li:not(.aikon-product-filters-search)").show().filter(function () {
            return -1 == a(this).children("label").text().toLowerCase().trim().indexOf(b)
          }).hide();
          a(d).children("li:not(.aikon-product-filters-search)").show().filter(function () {
            return -1 == a(this).children("label").text().toLowerCase().trim().indexOf(b)
          }).hide()
        })
      }
    });
    p.topbarFilters = function () {
      p.filters.apply(this, arguments)
    }
    ;
    p.topbarFilters.prototype = Object.create(p.filters.prototype);
    p.topbarFilters.prototype.constructor = p.topbarFilters;
    a.extend(p.topbarFilters.prototype, {
      init: function () {
        p.filters.prototype.init.apply(this, arguments)
      },
      render: function () {
        var d = ""
          , b = this
          , e = c.searchResults.getStoredParams()
          , f = !0;
        c.searchResults.isMobileMode() && (f = !1,
        void 0 != b.statesMap.aikon_filters_block && (f = "open" == b.statesMap.aikon_filters_block),
          d += '<div id="aikon_filters_block" class="aikon-product-filters-block"><div class="aikon-product-filters-title ' + (f ? "open" : "") + '"><i class="aikon-product-filters-close"></i><i class="aikon-product-filters-open"></i><span>' + c.options.LabelResultsFilters + "</span></div>");
        a.each(this.result.facets, function (a, g) {
          "N" == c.options.PriceAccess && "price" == g.attribute || c.searchResults.isMobileMode() && "Y" != g.show_on_mobile || (c.searchResults.isMobileMode(),
            d += '<div id="aikon_filters_dropdown_' + g.attribute + '" class="aikon-filters-dropdown js" style="display: ' + (f ? "block" : "none") + '"><div class="aikon-filters-dropdown-title"><span>' + g.title,
          "price" == g.attribute && (d += '<span class="aikon-product-filters-price-symbol">, ' + c.options.PriceFormatSymbol + "</span>"),
          e.restrictBy[g.attribute] && ("select" == g.type && (d += " (" + b.getSelectedFilterCount(g) + ")"),
            d += ' <a href="#" data-no-instant="true"><i class="aikon-product-filters-reset" data-se-facet-attribute="' + g.attribute + '"></i></a>'),
            d += ' <b class="caret"></b></span></div><div class="aikon-filters-dropdown-content" style="display: none">',
            d += b.renderOne(g, !0),
            d += "</div></div>")
        });
        c.searchResults.isMobileMode() && (d += "</div>");
        return d
      },
      attachEvents: function () {
        var d, b;
        p.filters.prototype.attachEvents.call(this, function () {
          d = a(this).closest(".aikon-filters-dropdown").attr("id");
          b = a(this).closest(".aikon-product-filters-list").scrollTop()
        }, function () {
          var c = a("#" + d).find(".aikon-filters-dropdown-title")
            , e = a("#" + d).find(".aikon-product-filters-list");
          c.click();
          e.scrollTop(b)
        });
        var e = a(".aikon-filters-dropdown-title", this.container);
        a(".aikon-filters-dropdown-content", this.container);
        var f = this;
        e.click(function () {
          var b = a(this).next();
          "none" == b.css("display") ? (f.container.hasClass("aikon-mobile-design") || (e.next().hide(),
            e.removeClass("active")),
            b.show(),
          f.container.hasClass("aikon-mobile-design") || a(this).addClass("active")) : b.hide()
        });
        c.searchResults.getContent().hasClass("aikon-mobile-design") || (a(".aikon-filters-dropdown", f.container).click(function (a) {
          a.stopPropagation()
        }),
          a(document).click(function () {
            e.next().hide();
            e.removeClass("active")
          }));
        a(".aikon-product-filters-title", this.container).bind("click.topbar", function (b) {
          b.stopPropagation();
          a(this).toggleClass("open");
          a(this).nextAll().toggle();
          f.statesMap[a(this).parent().attr("id")] = a(this).hasClass("open") ? "open" : ""
        });
        a(".aikon-product-filters-search input.aikon-filter-input", this.container).bind("keyup", function () {
          var b = this.value.toLowerCase().trim()
            , c = a(this).closest(".aikon-product-filters-block").find("ul.aikon-product-filters-list")
            , d = a(this).closest(".aikon-filters-dropdown-content").find("ul.aikon-product-filters-list");
          a(c).children("li:not(.aikon-product-filters-search)").show().filter(function () {
            return -1 == a(this).children("label").text().toLowerCase().trim().indexOf(b)
          }).hide();
          a(d).children("li:not(.aikon-product-filters-search)").show().filter(function () {
            return -1 == a(this).children("label").text().toLowerCase().trim().indexOf(b)
          }).hide()
        })
      },
      initSliders: function () {
        p.filters.prototype.initSliders.call(this, null, function (c) {
          a("#aikon_filters_dropdown_" + c.attribute).find(".aikon-filters-dropdown-title").click()
        })
      }
    });
    p.MobileFilters = function () {
      p.filters.apply(this, arguments)
    }
    ;
    p.MobileFilters.prototype = Object.create(p.filters.prototype);
    p.MobileFilters.prototype.constructor = p.MobileFilters;
    a.extend(p.MobileFilters.prototype, {
      init: function (a) {
        p.filters.prototype.init.apply(this, arguments);
        this.dialog = a;
        this.facetsColorsData = {}
      },
      render: function () {
        var d = this
          , b = c.searchResults.getStoredParams()
          , e = ""
          , f = 0;
        a.each(this.result.facets, function (g, h) {
          if (!("N" == c.options.PriceAccess && "price" == h.attribute || "N" == c.options.ReviewsShowRating && "rating" == h.attribute || c.searchResults.isMobileMode() && "Y" != h.show_on_mobile)) {
            e += '<div class="aikon-product-filter-opener" data-se-facet-attribute="' + h.attribute + '"><span class="aikon-product-filter-title">' + h.title;
            "price" == h.attribute && (e += '<span class="aikon-product-filters-price-symbol">, ' + c.options.PriceFormatSymbol + "</span>");
            e += "</span>";
            var k = "";
            if (b.restrictBy[h.attribute]) {
              f++;
              var n = 0;
              k = '<span class="aikon-selected-filter-values">';
              "slider" == h.type ? k += '<span class="aikon-selected-filter-value">' + d.renderSelectedValue(h, h.buckets[0]) + "</span>" : a.each(h.buckets, function (a, b) {
                b.selected && b.count && (k = "color" == h.appearance ? k + d.renderSelectedValue(h, b) : k + ('<span class="aikon-selected-filter-value">' + d.renderSelectedValue(h, b) + "</span>"),
                  n++)
              });
              k += "</span>";
              "slider" != h.type && (e += '<span class="aikon-product-filter-count">' + n + "</span>");
              e += '<a href="#" data-no-instant="true"><i class="aikon-product-filters-reset" data-se-facet-attribute="' + h.attribute + '"></i></a>'
            }
            e += k + "</div>"
          }
        });
        var k = '<div id="aikon_filters_block_header" class="aikon-product-filters-header" style="display: ' + (a.isEmptyObject(this.statesMap) ? "block" : "none") + ';"><span class="aikon-product-filters-title">' + c.options.LabelResultsFilters;
        f && (k += '<span class="aikon-product-filters-count">' + f + "</span>");
        k += '</span></div><div id="aikon_filters_block" class="aikon-product-filters-list-container" style="display: ' + (a.isEmptyObject(this.statesMap) ? "block" : "none") + ';">' + e + "</div>";
        a.each(this.result.facets, function (a, b) {
          "N" == c.options.PriceAccess && "price" == b.attribute || "Y" != b.show_on_mobile || (k += d.renderOne(b, "open" == d.statesMap[b.attribute]))
        });
        k += '<div class="aikon-product-filters-buttons-container">';
        var h = c.options.LabelResultsShowProducts.split("[count]").join(this.result.totalItems + (this.result.totalItemsLimited ? "+" : ""));
        k += '<button class="aikon-product-filters-show-products">' + h + "</button>";
        k += '<button class="aikon-product-filters-reset-all">' + c.options.LabelResultsResetFilters + "</button>";
        return k += "</div>"
      },
      renderSelected: function () {
        var d = ""
          , b = this
          , e = c.searchResults.getStoredParams();
        this.selectedFiltersCount = 0;
        !a.isEmptyObject(e.restrictBy) && this.result.facets && a.each(this.result.facets, function (e, g) {
          "slider" == g.type ? (bucket = g.buckets[0],
          bucket.selected && (d += "<span>" + b.renderSelectedValue(g, bucket) + '<i class="aikon-product-filters-reset" data-se-facet-attribute="' + g.attribute + '" data-se-facet-value="' + c.escapeHTML(c.escapeFacetValue(bucket.value)) + '"></i></span>',
            b.selectedFiltersCount++)) : a.each(g.buckets, function (a, e) {
            e.selected && e.count && (d += "<span>" + b.renderSelectedValue(g, e) + '<i class="aikon-product-filters-reset" data-se-facet-attribute="' + g.attribute + '" data-se-facet-value="' + c.escapeHTML(c.escapeFacetValue(e.value)) + '"></i></span>',
              b.selectedFiltersCount++)
          })
        });
        return d
      },
      renderSelectedValue: function (a, b) {
        var d = "";
        if ("color" == a.appearance) {
          var e = d = "";
          "*" == b.color_code ? d = "icon-multicolor" : "#" == b.color_code ? d = "icon-clear" : e = "background-color: #" + b.color_code + ";";
          d = '<span class="aikon-selected-filter-color' + (d ? " " + d : "") + '"' + (e ? ' style="' + e + '"' : "") + ' title="' + b.title + '"></span>'
        } else
          d = "slider" == a.type ? d + (c.formatPrice(b.left) + "-" + c.formatPrice(b.right)) : "rating" == a.attribute ? d + ("nostar" != b.value ? '<span class="stars-container stars-' + b.value + '">\u2605\u2605\u2605\u2605\u2605</span>' : c.options.LabelResultsNoReviews) : d + (b.title || b.value);
        return d
      },
      renderSelectedCount: function () {
        return 0 < this.selectedFiltersCount ? this.selectedFiltersCount : ""
      },
      getSelectedFilterCount: function (a) {
        var b = 0;
        if (0 < a.buckets.length)
          for (var c = 0; c < a.buckets.length; c++)
            a.buckets[c].hasOwnProperty("selected") && "true" == a.buckets[c].selected && b++;
        return b
      },
      renderOne: function (a, b) {
        var d = c.searchResults.getStoredParams()
          ,
          e = '<div id="aikon_product_filter_header_' + a.attribute + '" class="aikon-product-filters-header" style="display: ' + (b ? "block" : "none") + ';"><a href="" class="aikon-back-to-filters" data-se-facet-attribute="' + a.attribute + '"><span class="aikon-back-arrow"></span>' + c.options.LabelResultsFilters + '</a><div><span class="aikon-product-filters-title">' + a.title;
        "price" == a.attribute && (e += '<span class="aikon-product-filters-price-symbol">, ' + c.options.PriceFormatSymbol + "</span>");
        d.restrictBy[a.attribute] && ("select" == a.type && (e += '<span class="aikon-product-filter-count">' + d.restrictBy[a.attribute].replace(/\\\|/g, "").split("|").length + "</span>"),
          e += ' <a href="#" data-no-instant="true"><i class="aikon-product-filters-reset" data-se-facet-attribute="' + a.attribute + '"></i></a>');
        return e += '</span></div></div><div id="aikon_product_filter_' + a.attribute + '" class="aikon-product-filter-container" style="display: ' + (b ? "block" : "none") + ';">' + p.filters.prototype.renderOne.call(this, a, !0) + "</div>"
      },
      attachEvents: function () {
        var d = this, b, e;
        p.filters.prototype.attachEvents.call(this, function () {
          b = a(this).closest(".aikon-product-filter-container").attr("id");
          e = a(this).closest(".aikon-product-filter-container").scrollTop()
        }, function (c) {
          a("#" + b).scrollTop(e)
        });
        a(".aikon-product-filter-opener", this.container).click(function (b) {
          b.stopPropagation();
          b = a(this).data("seFacetAttribute");
          a("#aikon_filters_block_header,#aikon_filters_block", d.container).hide();
          d.container.addClass("aikon-filter-opened");
          a("#aikon_product_filter_" + b + ",#aikon_product_filter_header_" + b).show();
          d.statesMap[b] = "open";
          return !1
        });
        a(".aikon-back-to-filters", this.container).click(function (b) {
          b.stopPropagation();
          b = a(this).data("seFacetAttribute");
          a("#aikon_product_filter_" + b + ",#aikon_product_filter_header_" + b).hide();
          d.container.removeClass("aikon-filter-opened");
          a("#aikon_filters_block,#aikon_filters_block_header", d.container).show();
          d.resetState();
          return !1
        });
        a(".aikon-product-filters-show-products", this.container).click(function (a) {
          d.dialog.hide()
        });
        a(".aikon-product-filters-reset", this.selectedFiltersContainer).click(function (b) {
          b = c.searchResults.getStoredParams();
          var e = a(this).data("seFacetAttribute")
            , f = a(this).data("seFacetValue")
            , g = [];
          a.each(d.result.facets, function (b, c) {
            c.attribute == e && "slider" != c.type && a.each(c.buckets, function (a, b) {
              b.selected && b.count && b.value != f && g.push(b.value)
            })
          });
          g.length ? b.restrictBy[e] = g.join("|") : delete b.restrictBy[e];
          c.searchResults.search({
            page: 1,
            restrictBy: b.restrictBy
          });
          return !1
        })
      }
    });
    p.ProductQuickView = function () {
      R.apply(this, arguments)
    }
    ;
    p.ProductQuickView.prototype = Object.create(R.prototype);
    p.ProductQuickView.constructor = p.ProductQuickView;
    a.extend(p.ProductQuickView.prototype, {
      init: function (a, b, c) {
        R.prototype.init.apply(this, arguments);
        this.item = null;
        this.itemVariants = [];
        this.itemImages = [];
        this.itemOptions = {};
        this.setItem(c)
      },
      renderContent: function () {
        var d = variantsHtml = ""
          , b = c.options
          , g = this.item;
        if (1 < this.itemImages.length) {
          var f = this.itemImages[0];
          d = '<ul class="aikon-quick-view-thumbnails">';
          a.each(this.itemImages, function (a, b) {
            "3P3P5P3Y6k" == c.autocmp_params.api_key && (b = b.replace("_large.", "_480x."));
            d += '<li class="aikon-quick-view-thumbnail' + (0 == a ? " active" : "") + '"><img src="' + b + '" /></li>'
          });
          d += "</ul>"
        } else
          f = g.image_link ? g.image_link : b.ImageNotFound;
        "3P3P5P3Y6k" == c.autocmp_params.api_key && (f = f.replace("_large.", "_480x."));
        if (a.isEmptyObject(this.itemOptions))
          g.add_to_cart_id && (variantsHtml += '<input type="hidden" name="variant_id" value="' + g.add_to_cart_id + '" />');
        else {
          var k = 1;
          a.each(this.itemOptions, function (b, d) {
            var e = "9q7S8y3L7V" == c.options.api_key;
            variantsHtml += '<div class="' + (1 == d.length && e ? "aikon-option-selector-wrapper aikon-option-selector-text" : "aikon-option-selector-wrapper") + " aikon-option-count-" + d.length + '"><label for="aikon-option-selector-' + k + '">' + c.escapeHTML(b) + "</label>";
            1 == d.length && e ? (variantsHtml += '<span class="aikon-option aikon-option-other">' + c.escapeHTML(d[0]) + "</span>",
              variantsHtml += '<input type="hidden" id="aikon-option-selector-' + k + '" name="' + c.escapeHTML(b) + '" value="' + d[0] + '" data-option="' + b + '" />') : (variantsHtml += '<select id="aikon-option-selector-' + k + '" class="aikon-option aikon-option-other" name="' + c.escapeHTML(b) + '" data-option="' + b + '">',
              a.each(d, function (a, b) {
                variantsHtml += '<option value="' + c.escapeHTML(b) + '">' + c.escapeHTML(b) + "</option>"
              }),
              variantsHtml += "</select>");
            variantsHtml += "</div>";
            k++
          });
          variantsHtml += '<input type="hidden" name="variant_id" value="' + this.itemVariants[0].variant_id + '" />'
        }
        variantsHtml += '<input type="hidden" name="product_id" value="' + g.product_id + '" />';
        quantityHtml = '<input type="number" id="aikon-quick-view-quantity" name="quantity" class="aikon-add-to-cart-quantity-num" value="1" min="1" autocomplete="off" />';
        var h = b.LabelResultsQuantity
          , n = b.LabelResultsAddToCart
          , l = !1 === c.renderProductActionButton("quick_view", g);
        if ("9o8d2w2I3O" == c.autocmp_params.api_key || "9E1N6v5G3r" == c.autocmp_params.api_key) {
          var m = void 0 != g.tags ? g.tags.split("[:ATTR:]") : []
            , p = "1"
            , w = "1";
          ~m.indexOf("fabricqty") && (p = w = "0.25",
            h += " (yards)");
          ~m.indexOf("pre-order") && (n = "pre-order");
          quantityHtml = '<span class="ss-icon product-minus js-change-quantity" data-func="minus"><span class="icon-minus"></span></span><input type="number" min="' + w + '" size="2" class="quantity" name="quantity" step="' + p + '" id="aikon-quick-view-quantity" value="1"><span class="ss-icon product-plus js-change-quantity" data-func="plus"><span class="icon-plus"></span></span>'
        }
        m = "";
        "Y" == c.isPriceAccessed(g) && (m = c.render_tpl(c.options.ResultsPricesHTML, g),
        "9o8d2w2I3O" == c.autocmp_params.api_key || "9E1N6v5G3r" == c.autocmp_params.api_key) && (m = a("<div />").html(m),
          a(".aikon-price", m).wrap(function () {
            return g.shopify_variants && g.shopify_variants.length ? '<span class="aikon-price-data-wrapper" data-product-id="' + g.product_id + '" data-variant-id="' + g.shopify_variants[0].variant_id + '"></span>' : '<span class="aikon-price-data-wrapper" data-product-id="' + g.product_id + '"></span>'
          }),
          a(".aikon-discounted-price", m).wrap(function () {
            return g.shopify_variants && g.shopify_variants.length ? '<span class="aikon-price-data-wrapper" data-product-id="' + g.product_id + '" data-variant-id="' + g.shopify_variants[0].variant_id + ':compare"></span>' : '<span class="aikon-price-data-wrapper" data-product-id="' + g.product_id + '"></span>'
          }),
          m = a(m).html());
        return html = '<div class="aikon-modal-content-wrapper" style="max-height: ' + parseInt(.8 * a(e).height()) + 'px"><div class="aikon-quick-view-content-left"><a href="' + g.link + '" data-no-instant="true"><div class="aikon-quick-view-image-wrapper"><img src="' + f + '" class="aikon-quick-view-image" /></div></a>' + d + '</div><div class="aikon-quick-view-content-right"><a href="' + g.link + '" class="aikon-quick-view-title" data-no-instant="true">' + g.title + "</a>" + ("Y" == b.ResultsShowProductCode ? c.render_tpl(b.ResultsQuickViewProductCodeHTML, g) : "") + (b.ResultsProductAttributeName && g[b.ResultsProductAttributeName] ? c.render_tpl(b.ResultsQuickViewProductAttributeHTML, g) : "") + '<div class="aikon-quick-view-price-wrapper">' + m + '</div><div class="aikon-quick-view-reviews-wrapper">' + ("Y" == b.ReviewsShowRating ? c.render_tpl(c.options.reviewsHTML, g) : "") + '</div><div class="aikon-quick-view-description">' + g.description + '</div><a href="' + g.link + '" class="aikon-quick-view-show-more" data-no-instant="true">' + b.LabelResultsViewFullDetails + '</a><div class="aikon-quick-view-form-wrapper"><form action="/cart/add" method="post" class="' + (g.quantity ? "" : "aikon-add-to-cart-form-out-of-stock") + '">' + variantsHtml + '<div class="aikon-quick-view-add-to-cart-wrapper' + (l ? " aikon-hidden" : "") + '"><hr /><div class="aikon-quick-view-add-to-cart-quantity"><label for="aikon-quick-view-quantity" class="aikon-quick-view-quantity-label">' + h + ":</label>" + quantityHtml + '</div><button id="aikon-quick-view-add-to-cart" class="aikon-button" type="submit">' + n + '</button><button id="aikon-quick-view-out-of-stock" class="aikon-button" disabled="true">' + b.LabelResultsOutOfStock + '</button><button id="aikon-quick-view-view-cart" class="aikon-button" type="submit">' + b.LabelResultsViewCart + "</button></div></form></div></div></div>"
      },
      setItem: function (a) {
        this.item = a;
        a.shopify_variants && a.shopify_variants.length ? this.itemVariants = a.shopify_variants : a.bigcommerce_variants && a.bigcommerce_variants.length && (this.itemVariants = a.bigcommerce_variants);
        a.shopify_images && a.shopify_images.length ? this.itemImages = a.shopify_images : a.bigcommerce_images && a.bigcommerce_images.length && (this.itemImages = a.bigcommerce_images);
        this.itemOptions = this.extractItemOptions(this.itemVariants)
      },
      rebuild: function () {
        a(".aikon-modal-content-wrapper", this.modal).replaceWith(this.renderContent());
        a("select", this.modal).eq(0).trigger("change")
      },
      attachEvents: function () {
        R.prototype.attachEvents.apply(this, arguments);
        var d = this
          , b = c.options
          , g = this.modal;
        a(e).resize(function () {
          a(".aikon-modal-content-wrapper", g).css("max-height", parseInt(.8 * a(e).height()))
        });
        g.delegate("select", "change", function (e) {
          var f = {}
            , h = a(this.form)
            , n = a("#aikon-product-" + d.item.product_id).attr("data-product-variant");
          if (void 0 !== e.originalEvent || "N" == c.options.ResultsShowOptionVariants) {
            a("select", g).each(function (b, c) {
              f[a(c).data("option")] = a(c).val()
            });
            var m = a.grep(d.itemVariants, function (a) {
              return JSON.stringify(f) === JSON.stringify(a.options)
            })
          } else {
            m = a.grep(d.itemVariants, function (a) {
              return parseInt(n, 10) === parseInt(a.variant_id, 10)
            });
            for (var l in d.itemOptions) {
              var p = m[0].options[l];
              a('select[data-option="' + l + '"]').find("option").filter(function () {
                return this.value == p
              }).prop("selected", !0)
            }
          }
          h.toggleClass("aikon-add-to-cart-form-out-of-stock", !(m.length && "0" != m[0].available));
          if (m.length) {
            m[0].price_info = c.priceInfo(m[0]);
            "shopify" == c.options.Platform && "undefined" !== typeof d.item.tags && (m[0].tags = d.item.tags);
            a("input[name=variant_id]", h).val(m[0].variant_id);
            "shopify" == c.options.Platform && "undefined" !== typeof e.originalEvent && a(".aikon-quick-view-show-more", g).attr("href", m[0].link);
            "Y" == b.ResultsShowProductCode && a(".aikon-quick-view-sku", g).replaceWith(c.render_tpl(b.ResultsQuickViewProductCodeHTML, m[0].sku ? m[0] : d));
            if ("Y" == c.isPriceAccessed(m[0])) {
              e = c.render_tpl(b.ResultsPricesHTML, m[0]);
              if ("9o8d2w2I3O" == c.autocmp_params.api_key || "9E1N6v5G3r" == c.autocmp_params.api_key)
                e = a("<div />").html(e),
                  a(".aikon-price", e).wrap(function () {
                    return '<span class="aikon-price-data-wrapper" data-product-id="' + d.item.product_id + '" data-variant-id="' + m[0].variant_id + '"></span>'
                  }),
                  a(".aikon-discounted-price", e).wrap(function () {
                    return '<span class="aikon-price-data-wrapper" data-product-id="' + d.item.product_id + '" data-variant-id="' + m[0].variant_id + ':compare"></span>'
                  }),
                  e = a(e).html();
              a(".aikon-quick-view-price-wrapper", d.modal).html(e)
            }
            (e = m[0].image_link) || (e = d.itemImages.length ? d.itemImages[0] : d.item.image_link || b.ImageNotFound);
            a('img[src="' + e + '"]', a(".aikon-quick-view-thumbnails")).trigger("click");
            c.convertNativePickerMoney()
          }
        });
        g.delegate(".aikon-quick-view-thumbnail", "click", function () {
          a(".aikon-quick-view-thumbnail").removeClass("active");
          a(this).addClass("active");
          a(".aikon-quick-view-image").attr("src", a("img", this).attr("src"))
        });
        g.delegate("form", "submit", function () {
          var b = a(this)
            , g = a("[name=product_id]", this).val()
            , h = a("#aikon-product-" + g).data("aikon_item_data");
          if (b.hasClass("aikon-add-to-cart-form-success"))
            e.location.href = "bigcommerce" == c.options.Platform ? "/cart.php" : "/cart";
          else if (a(".aikon-error", b).remove(),
            a("#aikon-quick-view-add-to-cart").addClass("aikon-button-loading"),
            c.sendGoogleEvent("Added product via Quick View"),
          "shopify" == c.options.Platform) {
            var m = {
              id: a("[name=variant_id]", this).val(),
              quantity: a("[name=quantity]", this).val()
            };
            if ("9o8d2w2I3O" == c.autocmp_params.api_key || "9E1N6v5G3r" == c.autocmp_params.api_key) {
              var n = void 0 != d.item.tags ? d.item.tags.split("[:ATTR:]") : [];
              ~n.indexOf("fabricqty") && m.quantity && (m.quantity *= 4,
                m.properties = {
                  _use_yards: "1"
                })
            }
            a.post("/cart/add.js", a.param(m), null, "json").done(function () {
              c.triggerEvent("Commerceinstruments.AddToCartSuccess", [m.id, h ? h : m]);
              a("#aikon-quick-view-add-to-cart").removeClass("aikon-button-loading");
              b.addClass("aikon-add-to-cart-form-success");
              Commerceinstruments.SaveClick({
                product_id: a("[name=product_id]", this).val()
              });
              ja(m.id)
            }).fail(function (d) {
              a("#aikon-quick-view-add-to-cart").removeClass("aikon-button-loading");
              var e = "";
              try {
                if (e = JSON.parse(d.responseText).description,
                ("9o8d2w2I3O" == c.autocmp_params.api_key || "9E1N6v5G3r" == c.autocmp_params.api_key) && ~n.indexOf("fabricqty") && m.quantity && (e = e.replace(/\d+/, function (a) {
                  return parseFloat(a / 4).toFixed(2) + " yards of "
                })),
                  !e)
                  throw !0;
              } catch (J) {
                e = "Unknown error occurred"
              }
              a(":button:last", b).after('<p class="aikon-error">' + e + "</p>")
            })
          } else if ("bigcommerce" == c.options.Platform) {
            m = {
              lineItems: [{
                productId: a("[name=product_id]", this).val(),
                variantId: a("[name=variant_id]", this).val(),
                quantity: a("[name=quantity]", this).val()
              }]
            };
            var l = function (d, e, f) {
              a("#aikon-quick-view-add-to-cart").removeClass("aikon-button-loading");
              c.triggerEvent("Commerceinstruments.AddToCartSuccess", [g, h ? h : d.lineItems]);
              if (d.lineItems) {
                var k = !1
                  , n = 0;
                a.each(d.lineItems, function (b, c) {
                  a.each(c, function (a, b) {
                    !(k || b.productId != m.lineItems[0].productId || m.lineItems[0].variantId && b.variantId != m.lineItems[0].variantId) && 0 < b.quantity && (k = !0);
                    n += b.quantity
                  })
                });
                k ? (b.addClass("aikon-add-to-cart-form-success"),
                  a(".cart-quantity").html(n).addClass("countPill--positive")) : p(f)
              }
            }
              , p = function (c) {
              a("#aikon-quick-view-add-to-cart").removeClass("aikon-button-loading");
              var d = "";
              try {
                if (d = 200 == c.status ? "The selected product combination is currently unavailable." : 404 == c.status ? "Not enough stock" : JSON.parse(c.responseText).title,
                  !d)
                  throw !0;
              } catch (J) {
                d = "Unknown error occurred"
              }
              a(":button:last", b).after('<p class="aikon-error">' + d + "</p>")
            };
            a.getJSON("/api/storefront/carts", function (b) {
              b.length ? a.each(b, function (b, c) {
                a.post("/api/storefront/carts/" + c.id + "/items", JSON.stringify(m)).done(l).fail(p)
              }) : a.post("/api/storefront/carts", JSON.stringify(m)).done(l).fail(p)
            })
          }
          return !1
        });
        g.delegate(":input:not(:button)", "click", function () {
          a(this.form).removeClass("aikon-add-to-cart-form-success");
          a(".aikon-error", this.form).remove()
        });
        a("select", g).eq(0).trigger("change")
      },
      extractItemOptions: function (c) {
        var b = {};
        a.each(c, function (c, d) {
          a.each(d.options, function (c, d) {
            if ("Title" == c && ("Default Title" == d || "Default" == d))
              return !0;
            b[c] ? -1 == a.inArray(d, b[c]) && b[c].push(d) : b[c] = [d]
          })
        });
        return b
      }
    });
    var fa = function () {
      function d(d) {
        "shopify" == c.options.Platform && a(".aikon-recommendations").length && g();
        a(".commerceinstruments-recommendations").each(function (f) {
          var g = a(this).attr("id");
          if (0 < g.length) {
            var h = {
              api_key: c.autocmp_params.api_key,
              recommendation_widget_key: g,
              request_page: d.page_type,
              product_ids: d.product_ids.join(","),
              recommendation_collection: d.collection
            };
            if ("Y" == c.options.LangifySupport && e.langify && e.langify.helper) {
              var k = f = "";
              "undefined" !== typeof e.langify.locale ? (f = e.langify.locale.language_id,
              "/" !== e.langify.locale.root_url && (k = e.langify.locale.root_url)) : f = e.langify.helper.getSelectedLanguage();
              h.translationLanguage = f;
              h.translationUrl = e.location.hostname + k
            }
            "Y" == c.options.ResultsShowOnlyInStock && (h.restrictBy = h.restrictBy || {},
              h.restrictBy.quantity = "1|");
            "Y" == c.options.EnableShopifyMultiCurrency && w("isNativeMulticurrencyEnabled") && (h.union = {
              price: {
                min: "price_" + Shopify.currency.active
              }
            },
              h.shopify_currency = Shopify.currency.active);
            c.triggerEvent("Commerceinstruments.DataRequestBefore", ["recommendation", h]);
            c.processRequest(c.paths.request_recommendations_url, h, function (a) {
              c.triggerEvent("Commerceinstruments.DataRequestEnd", ["recommendation", h, a]);
              a.error || 1 > a.currentItemCount || (W("recommendations", {
                total: a.currentItemCount
              }),
                m[g] = a,
                b(g),
              "shopify" == c.options.Platform && "Y" == c.options.SwymCorporationWishlistPlusSupport && ma())
            })
          }
        })
      }

      function b(b) {
        var d = a("#" + b)
          , f = "";
        c.isRightToLeftLanguage() && (f = "aikon-rtl");
        d.empty();
        d.removeData("plugin_tinycarousel");
        if (m[b]) {
          b = m[b];
          var g = a('<ul class="overview"/>');
          a.each(b.items, function (b, d) {
            d.price_info = c.priceInfo(d);
            var e = c.render_tpl(c.options.RecommendationItem, d);
            a(e).data("aikon_item_data", d).appendTo(g)
          });
          a("img", g).bind("error", function (b) {
            a(b.target).attr("src", c.options.ImageNotFound)
          });
          var h = '<div class="aikon-recommendation' + (K() ? " aikon-mobile-design" : "") + '">'
            , k = 4
            , n = !1
            , l = "";
          "1u9y9f0f0P" == c.result_params.api_key && (n = !0);
          376 > a(e).width() ? k = 1 : 769 > a(e).width() && (k = 2);
          if ("1u9y9f0f0P" == c.result_params.api_key) {
            l = '<ul class="aikon-dots">';
            for (var p = g.children().length, B = Math.ceil(p / k), z = p % k, U = 0, J = 0; J < B; J++)
              U = J * k,
              J + 1 == B && 0 < z && (U = p - k),
                l += '<li class="bullet" data-slide="' + U + '"><button></button></li>';
            l += "</ul>"
          }
          b.recommendation && b.recommendation.title && 0 < b.recommendation.title.length && (h += '\t<h3 class="aikon-recommendation-title">' + b.recommendation.title + "</h3>");
          h += '\t<div class="aikon-recommendation-results ' + f + '">\t\t<a class="buttons prev" href="#" data-no-instant="true">\t\t\t<div class="aikon-recommendation-arrow">';
          h += '\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 44.5 62.03">';
          h += '\t\t\t\t\t<path d="M5 .6a2 2 0 0 0-3 0L1 1.8a2 2 0 0 0 0 2.8l14.6 14.7a2 2 0 0 1 0 2.8L.6 37a2 2 0 0 0 0 3L2 41.3a2 2 0 0 0 3 0l19-19a2 2 0 0 0 0-2.8z"></path>';
          h += "\t\t\t\t</svg>";
          h += "\t\t\t</div>";
          h += "\t\t</a>";
          h += '\t\t<div class="viewport"><ul class="overview"></ul>' + l + "</div>";
          h += '\t\t<a class="buttons next" href="#" data-no-instant="true">';
          h += '\t\t\t<div class="aikon-recommendation-arrow">';
          h += '\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 44.5 62.03">';
          h += '\t\t\t\t\t<path d="M5 .6a2 2 0 0 0-3 0L1 1.8a2 2 0 0 0 0 2.8l14.6 14.7a2 2 0 0 1 0 2.8L.6 37a2 2 0 0 0 0 3L2 41.3a2 2 0 0 0 3 0l19-19a2 2 0 0 0 0-2.8z"></path>';
          h += "\t\t\t\t</svg>";
          h += "\t\t\t</div>";
          h += "\t\t</a>";
          h += "\t</div>";
          h += "</div>";
          d.append(h);
          a(".aikon-recommendation-results .overview", d).append(g.children());
          d.tinycarousel({
            slidesVisible: k,
            isMobileMode: K(),
            animationTime: 500,
            bullets: n
          });
          a(".aikon-product", d).bind("click touchstart", la);
          c.triggerEvent("Commerceinstruments.RecommendationUpdated", [d]);
          c.convertNativePickerMoney()
        }
      }

      function g() {
        var b = a(".aikon-recommendations")
          , c = e.innerWidth - document.documentElement.clientWidth;
        c = b.width() + c;
        b.offset().left + c + 25 >= e.innerWidth && b.addClass("aikon-horizontal-padding")
      }

      function f() {
        var b = document.querySelector("#shopify-section-footer") || document.querySelector("#footer") || document.querySelector("footer") || document.querySelector("#pagefooter")
          ,
          c = document.querySelector("#MainContent") || document.querySelector("#main-wrap") || document.querySelector(".main-content") || document.querySelector("#main-content") || document.querySelector("#pageContent")
          , d = {
            element: a("main").length ? a("main") : a("#main"),
            attach: "append"
          };
        if (!d.element.length) {
          if (c)
            return {
              element: a(c),
              attach: "append"
            };
          if (b)
            return {
              element: a(b),
              attach: "before"
            }
        }
        return d
      }

      function k(b, d, e) {
        var g;
        "shopify" == c.options.Platform ? g = f() : "magento" == c.options.Platform && (g = {
          element: a(e),
          attach: "append"
        });
        if (d[b] && g.element.length) {
          var h = '<div class="aikon-recommendations page-width">';
          a.each(d[b], function (a, b) {
            h += '<div class="commerceinstruments-recommendations" id="' + b + '"></div>'
          });
          h += "</div>";
          switch (g.attach) {
            case "append":
              g.element.append(h);
              break;
            case "before":
              g.element.before(h)
          }
        }
      }

      function h(a) {
        var b = "";
        a.lang_code && a.path_parts.shift();
        a.path_parts[0] ? "collections" == a.path_parts[0] && "products" == a.path_parts[2] || "products" == a.path_parts[0] ? b = "product" : "collections" == a.path_parts[0] ? b = "collection" : "search" == a.path_parts[0] || "search-results" == a.path_parts[1] ? b = "search results" : "cart" == a.path_parts[0] && (b = "cart") : b = "home page";
        return b
      }

      var m = []
        , n = []
        , l = ""
        , p = ""
        , D = {}
        , B = a(e).width();
      if ("shopify" == c.options.Platform) {
        var J = c.parseHref(e.location.href);
        (p = h(J)) && k(p, c.options.RecommendationsLayout);
        "cart" == p ? a.getJSON("/cart.js", function (b) {
          b.item_count && a.each(b.items, function (a, b) {
            ~n.indexOf(b.product_id) || n.push(b.product_id)
          });
          D = {
            page_type: p,
            product_ids: n,
            collection: l
          };
          d(D)
        }) : ("product" == p && "undefined" != typeof meta && meta.product && meta.product.id ? n.push(meta.product.id) : "collection" == p && (l = c.collectionHrefData(e.location.href).collection),
          D = {
            page_type: p,
            product_ids: n,
            collection: l
          },
          d(D))
      } else
        "magento" == c.options.Platform && a(".aikon-recommendation-wrapper", document).each(function () {
          p = a(this).data("page-type");
          D = {
            page_type: p,
            product_ids: [],
            collection: ""
          };
          if (p) {
            k(p, c.options.RecommendationsLayout, this);
            if ("product" == p || "cart" == p)
              if (n = a(this).data("product-ids") + "")
                D.product_ids = n.split(",");
            d(D)
          }
        });
      a(e).resize(function () {
        a(e).width() != B && (B = a(e).width(),
          a(".commerceinstruments-recommendations").each(function (c) {
            c = a(this).attr("id");
            0 < c.length && b(c)
          }))
      })
    }
      , V = null
      , la = function (d) {
      var b = a(this).data("aikon_item_data")
        , g = "aikon-search-results"
        , f = a(this).closest(".commerceinstruments-recommendations").attr("id");
      a(this).parents(".aikon-recommendation").length && (g = "aikon-recommendation");
      if (b && "aikon-search-results" == g) {
        var k = {
          original_query: c.searchResults.getStoredParams().q || "",
          results_selected_product_id: b.product_id
        };
        l("aikon_search_data", JSON.stringify(k), {
          expires: 120,
          path: "/",
          domain: document.domain
        }, !0)
      }
      if (a(d.target).hasClass("aikon-add-to-cart-button")) {
        var h = a(d.target);
        if (h.hasClass("size-button-view-cart"))
          ($redirect_url = h.attr("redirect-url")) || ($redirect_url = "/cart"),
            e.location.href = $redirect_url;
        else if ("bigcommerce" == c.options.Platform)
          e.location.href = "/cart.php?action=add&product_id=" + b.product_id;
        else if ("shopify" == c.options.Platform && b && b.add_to_cart_id) {
          var m = {
            url: "/cart/add.js",
            data: {
              id: b.add_to_cart_id,
              quantity: 1
            }
          };
          "5Z4o3T5V8y" == c.result_params.api_key && (m.data.properties = {
            _compare_at_price: 100 * b.list_price
          })
        } else if (("magento" == c.options.Platform || "magento2" == c.options.Platform) && b && b.product_id) {
          d = "add";
          var n = a(this).parents(".aikon-recommendation-wrapper");
          "magento" == c.options.Platform && n.length && (d = n.data("add-url"));
          m = {
            url: d,
            data: {
              id: b.product_id,
              quantity: 1
            }
          }
        } else
          "woocommerce" == c.options.Platform && "" != b.add_to_cart_url && (m = {
            url: b.add_to_cart_url,
            data: {}
          });
        m && a.ajax(a.extend({
          method: "post",
          dataType: "json",
          beforeSend: function () {
            h.prop("disabled", !0).data("text", h.text()).css("width", h.width() + "px").text("...")
          },
          error: function (a) {
            if ("shopify" == c.options.Platform) {
              var b = "";
              try {
                if (b = JSON.parse(a.responseText).description,
                  !b)
                  throw !0;
              } catch (sa) {
                b = "Unknown error occurred"
              }
              alert(b)
            }
          },
          success: function (a, d, f) {
            "4D8S4v0O3m" != c.result_params.api_key && h.data("text", c.options.LabelResultsViewCart).addClass("size-button-view-cart");
            "shopify" == c.options.Platform && (c.triggerEvent("Commerceinstruments.AddToCartSuccess", [b.add_to_cart_id, b]),
              ja(b.add_to_cart_id),
              Commerceinstruments.SaveClick({
                product_id: b.product_id
              }));
            "aikon-recommendation" === g && (d = n && "cart" === n.data("page-type"),
              G(d));
            "magento" != c.options.Platform && "magento2" != c.options.Platform && "woocommerce" != c.options.Platform || c.triggerEvent("Commerceinstruments.AddToCartSuccess", [b.product_id, b]);
            "magento2" == c.options.Platform && "undefined" !== typeof require && "object" == typeof a && require(["Magento_Customer/js/customer-data"], function (b) {
              var c = a.update_sections || ["cart"];
              b.invalidate(c);
              b.reload(c, !0)
            });
            "object" == typeof a && a.redirect && ("OK" == a.status ? h.attr("redirect-url", a.redirect) : e.location.href = a.redirect)
          },
          complete: function () {
            c.sendGoogleEvent("Added product");
            h.text(h.data("text")).prop("disabled", !1).css("width", "");
            f && (Z("clicks", f, b.product_id),
              Z("add_to_cart", f, b.product_id),
              Z("send"))
          }
        }, m));
        return !1
      }
      if (a(d.target).hasClass("aikon-quick-view-button"))
        return c.sendGoogleEvent("Viewed product via Quick View"),
          V ? (V.setItem(b),
            V.rebuild()) : (V = new p.ProductQuickView("product-quick-view", !0, b),
            V.build()),
          V.show(),
          c.convertNativePickerMoney(),
        "Y" == c.options.BestCurrencyConverter && a(".currency-switcher").trigger("change"),
          !1;
      a(d.target).hasClass("aikon-view-product-button") ? (f && Z("clicks", f, b.product_id),
        e.location.href = b.link) : f && Z("clicks", f, b.product_id)
    };
    a.extend(a.expr[":"], {
      absoluteNotPositioned: function (c) {
        return "absolute" === a(c).css("position") && a(c).offsetParent().is("html")
      },
      fixed: function (c) {
        return "fixed" === a(c).css("position")
      },
      inview: function (c) {
        var b = a(e).scrollTop()
          , d = b + (a(e).outerHeight() || e.outerHeight || e.innerHeight)
          , f = a(c).offset().top;
        return f + a(c).outerHeight() <= d && f >= b
      }
    });
    if (e.self === e.top && "object" === typeof e.InstantClick && "function" === typeof e.InstantClick.on)
      e.InstantClick.on("change", function (a) {
        a || Commerceinstruments.GetWidgets().start()
      });
    var w = function (a) {
      var b = {}
        , d = {
        getCart: function (b) {
          a.getJSON("/cart.js", function (a) {
            "function" == typeof b && b.call(this, a)
          })
        },
        getProduct: function (c, d) {
          b.hasOwnProperty(c) ? "function" == typeof d && d.call(this, b[c]) : a.getJSON("/products/" + c + ".js", function (a) {
            "function" == typeof d && (b[a.handle] = a,
              d.call(this, a))
          })
        },
        getCurrentProductId: function (a) {
          if (~e.location.href.indexOf("/products/")) {
            var b = w("getPageData");
            "product" == b.resourceType ? "function" == typeof a && a.call(this, b.resourceId) : (b = Commerceinstruments.ExtractProductHandle(e.location.href),
            e.location.href !== b && w("getProduct", b, function (b) {
              "function" == typeof a && a.call(this, b.id)
            }))
          }
        },
        getCustomerId: function () {
          var a = 0;
          "undefined" != typeof Shopify && Shopify.checkout && Shopify.checkout.customer_id ? a = Shopify.checkout.customer_id : "undefined" != typeof ShopifyAnalytics && ShopifyAnalytics.meta && ShopifyAnalytics.meta.page && ShopifyAnalytics.meta.page.customerId ? a = ShopifyAnalytics.meta.page.customerId : "undefined" != typeof __st && __st.cid && (a = __st.cid);
          return a
        },
        getCustomerData: function (b) {
          var c = w("getCustomerId");
          a.getJSON("/customer/" + c + ".js", function (a) {
            "function" == typeof b && b.call(this, a)
          })
        },
        getViewerId: function () {
          return m("_shopify_y")
        },
        getPageData: function () {
          var b = {
            pageType: "",
            resourceType: "",
            resourceId: ""
          };
          e.ShopifyAnalytics && e.ShopifyAnalytics.meta && e.ShopifyAnalytics.meta.page && (b = a.extend(b, e.ShopifyAnalytics.meta.page));
          return b
        },
        formatMoney: function (a) {
          "string" == typeof a && (a = a.replace(".", ""));
          if (isNaN(a) || null == a)
            return 0;
          a = (a / 100).toFixed(2);
          a = a.split(".");
          var b = a[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
          a = a[1] ? "." + a[1] : "";
          return b + a
        },
        isNativeMulticurrencyEnabled: function () {
          return e.Shopify && e.Shopify.currency && e.Shopify.currency.active != c.options.ShopifyCurrency
        },
        getSupportedMoneyFormats: function () {
          return [{
            re: /^([^{}]*)\{\{amount\}\}([^{}]*)$/,
            thousands: ",",
            decimal: "."
          }, {
            re: /^([^{}]*)\{\{amount_no_decimals\}\}([^{}]*)$/,
            thousands: ",",
            decimal: ""
          }, {
            re: /^([^{}]*)\{\{amount_with_comma_separator\}\}([^{}]*)$/,
            thousands: ".",
            decimal: ","
          }, {
            re: /^([^{}]*)\{\{amount_no_decimals_with_comma_separator\}\}([^{}]*)$/,
            thousands: ".",
            decimal: ""
          }, {
            re: /^([^{}]*)\{\{amount_with_apostrophe_separator\}\}([^{}]*)$/,
            thousands: "'",
            decimal: "."
          }]
        },
        getMoneyFormat: function () {
          var b = {
            AUD: "${{amount}}",
            CAD: "${{amount}}",
            EUR: "\u20ac{{amount_with_comma_separator}}",
            GBP: "\u00a3{{amount}}",
            HKD: "${{amount}}",
            JPY: "\u00a5{{amount_no_decimals}}",
            NZD: "${{amount}}",
            SGD: "${{amount}}",
            USD: "${{amount}}"
          };
          if (e.moneyFormat)
            return e.moneyFormat;
          if (e.theme && e.theme.moneyFormat)
            return e.theme.moneyFormat;
          if (e.theme && e.theme.settings && e.theme.settings.moneyFormat)
            return e.theme.settings.moneyFormat;
          if (e.theme && e.theme.money_format)
            return e.theme.money_format;
          if (e.StyleHatch && e.StyleHatch.currencyFormat)
            return e.StyleHatch.currencyFormat;
          if (a("body[data-money-format]").data("money-format"))
            return a("body[data-money-format]").data("money-format");
          if (e.Shopify && e.Shopify.currency) {
            var c = e.Shopify.currency.active;
            return b.hasOwnProperty(c) ? b[c] : b.USD
          }
          return b.USD
        },
        setCurrentMoneyFormat: function () {
          for (var a = w("getMoneyFormat"), b = w("getCurrencySymbol"), d = w("getSupportedMoneyFormats"), e = 0; e < d.length; e++)
            if (a.match(d[e].re)) {
              var g = a.match(d[e].re);
              a = g[1];
              g = g[2];
              a ? b = a : g && (b = g);
              c.options.PriceFormatSymbol = b;
              c.options.PriceFormatBefore = a;
              c.options.PriceFormatAfter = g;
              c.options.PriceFormatDecimalSeparator = d[e].decimal;
              c.options.PriceFormatThousandsSeparator = d[e].thousands;
              "" == d[e].decimal && (c.options.PriceFormatDecimals = 0);
              return !0
            }
        },
        getCurrencySymbol: function () {
          var a = {
            EUR: "\u20ac",
            GBP: "\u00a3",
            JPY: "\u00a5"
          };
          return e.Shopify && e.Shopify.currency && a.hasOwnProperty(e.Shopify.currency.active) ? a[e.Shopify.currency.active] : "$"
        },
        getHandedThemeName: function () {
          var a = [["alchemy", 657], ["artisan", 856], ["atlantic", 566], ["avenue", 865], ["blockshop", 606], ["boost", 863], ["boundless", 766], ["brooklyn", 730], ["broadcast", 868], ["california", 691], ["canopy", 732], ["capital", 812], ["cascade", 859], ["colors", 757], ["context", 870], ["debut", 796], ["district", 735], ["editions", 457], ["editorial", 827], ["envy", 411], ["empire", 838], ["expression", 230], ["fashionopolism", 141], ["flow", 801], ["focal", 714], ["galleria", 851], ["grid", 718], ["handy", 826], ["icon", 686], ["impulse", 857], ["ira", 790], ["jumpstart", 782], ["kagami", 747], ["kingdom", 725], ["label", 773], ["launch", 793], ["local", 833], ["loft", 846], ["lorenza", 798], ["maker", 765], ["masonry", 450], ["minimal", 380], ["mobilia", 464], ["modular", 849], ["motion", 847], ["mr parker", 567], ["narrative", 829], ["pacific", 705], ["parallax", 688], ["palo alto", 777], ["pipeline", 739], ["pop", 719], ["prestige", 855], ["providence", 587], ["reach", 853], ["retina", 601], ["responsive", 304], ["showcase", 677], ["showtime", 687], ["split", 842], ["startup", 652], ["simple", 578], ["story", 864], ["supply", 679], ["sunrise", 57], ["streamline", 872], ["symmetry", 568], ["testament", 623], ["trademark", 816], ["vantage", 459], ["venture", 775], ["venue", 836], ["vogue", 808], ["warehouse", 871]];
          try {
            for (var b = 0; b < a.length; b++) {
              var c = a[b][0];
              if (e.Shopify.theme.theme_store_id === a[b][1] || -1 !== e.Shopify.theme.name.toLowerCase().indexOf(c))
                return a[b][0]
            }
          } catch (N) {
          }
          return !1
        }
      };
      return function (a) {
        if ("shopify" != c.options.Platform)
          return !1;
        if ("function" == typeof d[a])
          return d[a].apply(this, Array.prototype.slice.call(arguments, 1));
        console.error("Method '" + a + "' doesn't exist in shopy_helper object");
        return !1
      }
    }(a)
      , Z = function (a) {
      function b() {
        "Y" == Commerceinstruments.GetLocalStorage("aikon-cart-changed") && w("getCart", function (a) {
          for (var b = Commerceinstruments.GetLocalStorage("aikon-recommendations-clicks") || [], c = 0; c < a.items.length; c++)
            for (var d = 0; d < b.length; d++)
              a.items[c].product_id == b[d].product_id && n("add_to_cart", b[d].widget_key, b[d].product_id);
          Commerceinstruments.SetLocalStorage("aikon-cart-changed", "N");
          p()
        })
      }

      function d() {
        if (~e.location.href.indexOf("/products/")) {
          var a = Commerceinstruments.GetLocalStorage("aikon-current-product-id");
          if (a) {
            var c = Commerceinstruments.GetLocalStorage("aikon-recommendations-clicks") || [];
            if (c.length) {
              c = c.reverse();
              for (var d = 0; d < c.length; d++)
                if (c[d].product_id == a && !h(a)) {
                  n("add_to_cart", c[d].widget_key, a);
                  p();
                  break
                }
            }
          }
        }
        Commerceinstruments.SetLocalStorage("aikon-cart-changed", "Y");
        setTimeout(b, 1E3)
      }

      function f(a) {
        var b = m("aikon-recommendation");
        if (!b || "undefined" != typeof a && !0 === a)
          Commerceinstruments.SetLocalStorage("aikon-recommendations-clicks", []),
            Commerceinstruments.SetLocalStorage("aikon-recommendations-added", []),
            Commerceinstruments.SetLocalStorage("aikon-current-product-id", 0),
            Commerceinstruments.SetLocalStorage("aikon-cart-changed", "N"),
            b = Math.random().toString(36).substr(2, 11),
            l("aikon-recommendation", b, {
              expires: 0,
              path: "/"
            });
        return b
      }

      function k(a) {
        a = parseInt(a);
        return -1 != (Commerceinstruments.GetLocalStorage("aikon-recommendations-clicks") || []).map(function (a) {
          return parseInt(a.product_id)
        }).indexOf(a)
      }

      function h(a) {
        a = parseInt(a);
        return -1 != (Commerceinstruments.GetLocalStorage("aikon-recommendations-added") || []).map(function (a) {
          return parseInt(a.product_id)
        }).indexOf(a)
      }

      function n(a, b, c, d, e) {
        var f = !0
          , g = Commerceinstruments.GetLocalStorage("aikon-recommendations-queue") || [];
        if ("clicks" != a || k(c))
          "add_to_cart" == a && (h(c) ? f = !1 : (m = Commerceinstruments.GetLocalStorage("aikon-recommendations-added") || [],
            m.push({
              widget_key: b,
              product_id: c
            }),
            Commerceinstruments.SetLocalStorage("aikon-recommendations-added", m)));
        else {
          var m = Commerceinstruments.GetLocalStorage("aikon-recommendations-clicks") || [];
          m.push({
            widget_key: b,
            product_id: c
          });
          Commerceinstruments.SetLocalStorage("aikon-recommendations-clicks", m)
        }
        f && (g.push({
          widget_key: b,
          action: a,
          product_id: "undefined" == typeof c || null === c ? 0 : c,
          value: "undefined" == typeof d || null === d ? 1 : d
        }),
          Commerceinstruments.SetLocalStorage("aikon-recommendations-queue", g),
        "undefined" !== typeof e && !0 === e && p())
      }

      function p() {
        recommendations_queue = Commerceinstruments.GetLocalStorage("aikon-recommendations-queue") || [];
        recommendations_queue.length && a.ajax({
          url: c.paths.analytics_url,
          type: "post",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          data: JSON.stringify({
            api_key: c.autocmp_params.api_key,
            recommendations: recommendations_queue
          }),
          complete: function () {
            Commerceinstruments.SetLocalStorage("aikon-recommendations-queue", [])
          }
        })
      }

      var D = !1
        , K = ["clicks", "add_to_cart"]
        , G = {
        init: function () {
          if (D)
            return !1;
          setTimeout(function () {
            p();
            f();
            b();
            w("getCurrentProductId", function (a) {
              Commerceinstruments.SetLocalStorage("aikon-current-product-id", a)
            });
            a(document).delegate('form[action="/cart/add"]', "submit", d);
            a(document).delegate('form[action="/cart/add"] button[type="submit"], form[action="/cart/add"] input[type="submit"]', "click touch", d);
            a(document).delegate('form[action="/cart/add"] button.shopify-payment-button__button', "click touch", d);
            D = !0
          }, 0);
          return !0
        },
        send: function () {
          return p()
        },
        get_added_data: function (a) {
          for (var b = Commerceinstruments.GetLocalStorage("aikon-recommendations-added") || [], c = 0; c < b.length; c++)
            if (b[c].product_id == a)
              return b[c];
          return !1
        },
        finish: function () {
          p();
          f(!0)
        }
      };
      return function (a) {
        if ("shopify" != c.options.Platform)
          return !1;
        if (-1 != K.indexOf(a))
          return n.apply(this, arguments);
        if ("function" == typeof G[a])
          return G[a].apply(this, Array.prototype.slice.call(arguments, 1));
        console.error("Method '" + a + "' doesn't exist in ra object");
        return !1
      }
    }(a)
      , W = function (a) {
      function b() {
        "function" == typeof _aikonXDomainCookie ? (Commerceinstruments.xdc = _aikonXDomainCookie("//" + Commerceinstruments.host, "searchly-xdsc", !1, !1, !0),
          Commerceinstruments.xdc.get("aikon_uid", function (a) {
            a || (a = Math.random().toString(36).substr(2, 9),
              Commerceinstruments.xdc.set("aikon_uid", a, 180));
            W("start", {
              sa_uid: a
            })
          })) : W("start")
      }

      function d(b) {
        (new Image).src = c.paths.stats_url + "?global_stats&api_key=" + c.autocmp_params.api_key + "&" + a.param(b)
      }

      var e = ""
        , k = {
        start: function (a) {
          a.viewer_id = w("getViewerId");
          return a
        },
        order: function (a) {
          for (var b = {
            session_id: a.session_id,
            timestamp: a.timestamp,
            customer_id: w("getCustomerId"),
            order_id: a.cart.order_id,
            email: a.cart.email,
            total: w("formatMoney", a.cart.total_price),
            currency: a.cart.currency,
            items: []
          }, c = 0; c < a.items.length; c++)
            b.items.push({
              product_id: a.items[c].product_id,
              quantity: a.items[c].quantity,
              price: a.items[c].price
            });
          return b
        },
        click: function (a) {
          a.q = e;
          var b = JSON.parse(localStorage.getItem("aikon_stats")) || [];
          b.push({
            action: "click",
            data: a
          });
          localStorage.setItem("aikon_stats", JSON.stringify(b));
          return !1
        },
        instant: function (a) {
          if (3 > a.q.length)
            return !1;
          e = a.q;
          return a
        }
      };
      return function (a, e) {
        if ("shopify" != c.options.Platform)
          return !1;
        if ("N" == c.options.UseCrossDomainStats)
          return l("aikon_session", null, {
            expires: -120
          }),
            l("aikon_uid", null, {
              expires: -120
            }),
          "function" == typeof _aikonXDomainCookie && (Commerceinstruments.xdc = _aikonXDomainCookie("//" + Commerceinstruments.host, "searchly-xdc", !1, !1, !0),
            Commerceinstruments.xdc.set("aikon_uid", null, -120)),
            !1;
        e = e || {};
        var f = m("aikon_session");
        if ("start" == a) {
          var g = JSON.parse(localStorage.getItem("aikon_stats")) || [];
          if (g.length) {
            for (; 0 < g.length;) {
              var h = g.shift();
              d(h)
            }
            localStorage.setItem("aikon_stats", JSON.stringify(g))
          }
          if (f)
            return
        } else if ("init" == a)
          return b();
        f || (f = Math.random().toString(36).substr(2, 9),
          l("aikon_session", f, {
            expires: 0
          }));
        e.session_id = f;
        e.timestamp = Math.floor(Date.now() / 1E3);
        if ("function" == typeof k[a] && (e = k[a](e),
        !1 === e))
          return;
        d({
          action: a,
          data: e
        })
      }
    }(a)
  }
)(window, Commerceinstruments.$);
(function (e) {
    function a(a, ca) {
      function n(b) {
        "prev" == b && (p -= aa,
        !l.options.infinite && 0 > p && (p = 0),
        l.options.bullets && a.find(".bullet.active").removeClass("active").prev().addClass("active"));
        "next" == b && (p += aa,
        !l.options.infinite && p > l.slidesTotal - aa && (p = l.slidesTotal - aa,
        0 > p && (p = 0)),
        l.options.bullets && a.find(".bullet.active").removeClass("active").next().addClass("active"));
        l.move(p)
      }

      function m() {
        l.options.buttons && !l.options.infinite && (ea.toggleClass("disable", 0 >= l.slideCurrent),
          Y.toggleClass("disable", l.slideCurrent >= l.slidesTotal - aa))
      }

      this.options = e.extend({}, M, ca);
      this._defaults = M;
      this._name = "tinycarousel";
      var l = this
        , D = a.find(".viewport:first")
        , K = a.find(".overview:first")
        , G = null
        , Y = a.find(".next:first")
        , ea = a.find(".prev:first")
        , ma = a.find(".bullet")
        , ba = 0
        , c = {}
        , aa = this.options.slidesVisible
        , R = 0
        , p = 0
        , fa = "x" === this.options.axis
        , V = fa ? "Width" : "Height"
        , la = fa ? "margin-left" : "margin-top"
        , w = null
        , Z = !1
        , W = {
        x: 0,
        y: 0,
        px: 0,
        py: 0
      }
        , d = {
        x: 0,
        y: 0,
        px: 0,
        py: 0
      }
        , b = {
        touchstart: function (a) {
          Z = !0;
          t = a.touches[0];
          d = W = {
            x: t.screenX,
            y: t.screenY,
            px: t.pageX,
            py: t.pageY
          }
        },
        touchmove: function (a) {
          1 < a.touches.length ? Z = !1 : (t = a.touches[0],
            d = {
              x: t.screenX,
              y: t.screenY,
              px: t.pageX,
              py: t.pageY
            })
        },
        touchend: function (a) {
          if (Z) {
            a = Math.abs(d.x - W.x);
            var b = Math.abs(d.y - W.y);
            20 > Math.max(a, b) || (a > b && .3 > b / a && 20 < Math.abs(W.px - d.px) && (0 > d.x - W.x ? n("next") : n("prev")),
              Z = !1)
          }
        },
        touchcancel: function (a) {
          Z = !1
        }
      };
      this.slidesTotal = this.slideCurrent = 0;
      this.intervalActive = !1;
      this.update = function () {
        K.find(".mirrored").remove();
        G = K.children();
        ba = D[0]["offset" + V];
        R = Math.ceil(ba / aa);
        l.slidesTotal = G.length;
        l.slideCurrent = l.options.start || 0;
        G.css(V.toLowerCase(), R - parseFloat(G.first().css("margin-right")));
        K.css(V.toLowerCase(), R * l.slidesTotal);
        l.options.infinite && (K.append(G.slice(0, aa).clone().addClass("mirrored")),
          K.css(V.toLowerCase(), R * (l.slidesTotal + aa)));
        m();
        return l
      }
      ;
      this.start = function () {
        l.options.interval && (clearTimeout(w),
          l.intervalActive = !0,
          w = setTimeout(function () {
            l.move(++p)
          }, l.options.intervalTime));
        return l
      }
      ;
      this.stop = function () {
        clearTimeout(w);
        l.intervalActive = !1;
        return l
      }
      ;
      this.move = function (b) {
        p = isNaN(b) ? l.slideCurrent : b;
        l.slideCurrent = p % l.slidesTotal;
        0 > p && (l.slideCurrent = p = l.slidesTotal - 1,
          K.css(la, -l.slidesTotal * R));
        p > l.slidesTotal && (l.slideCurrent = p = 1,
          K.css(la, 0));
        c[la] = -p * R;
        K.animate(c, {
          queue: !1,
          duration: l.options.animation ? l.options.animationTime : 0,
          always: function () {
            a.trigger("move", [G[l.slideCurrent], l.slideCurrent])
          }
        });
        m();
        l.start();
        return l
      }
      ;
      l.update();
      l.move(l.slideCurrent);
      (function () {
          var c = e(window).width();
          if (l.options.buttons && (ea.click(function () {
            n("prev");
            return !1
          }),
            Y.click(function () {
              n("next");
              return !1
            }),
          l.options.isMobileMode && a[0]))
            for (var d in b)
              a[0].addEventListener(d, b[d], !1);
          e(window).resize(function () {
            e(window).width() != c && (c = e(window).width(),
              l.update())
          });
          if (l.options.bullets)
            a.on("click", ".bullet", function () {
              l.move(p = +e(this).attr("data-slide"));
              ma.removeClass("active");
              e(this).addClass("active");
              return !1
            })
        }
      )();
      l.options.bullets && a.find('.bullet[data-slide="' + l.slideCurrent + '"]').addClass("active");
      return l
    }

    var M = {
      start: 0,
      axis: "x",
      slidesVisible: 4,
      buttons: !0,
      bullets: !1,
      interval: !1,
      intervalTime: 3E3,
      animation: !0,
      animationTime: 1E3,
      infinite: !1,
      isMobileMode: !1
    };
    e.fn.tinycarousel = function (M) {
      return this.each(function () {
        e.data(this, "plugin_tinycarousel") || e.data(this, "plugin_tinycarousel", new a(e(this), M))
      })
    }
  }
)(Commerceinstruments.$, window, document);
(function (e) {
    function a(a) {
      function m(a) {
        var m = new RegExp(e.map(a, encodeURIComponent).join("|"), "ig");
        return function (a) {
          return a.replace(m, decodeURIComponent)
        }
      }

      a = e.extend({
        unescape: !1
      }, a || {});
      M.encoder = function (a) {
        return !0 === a ? function (a) {
            return a
          }
          : "string" == typeof a && (a = m(a.split(""))) || "function" == typeof a ? function (e) {
              return a(encodeURIComponent(e))
            }
            : encodeURIComponent
      }(a.unescape)
    }

    var M = {
      put: function (a, e) {
        (e || window).location.hash = this.encoder(a)
      },
      get: function (a) {
        a = (a || window).location.hash.replace(/^#/, "");
        try {
          return decodeURIComponent(a)
        } catch (l) {
          return a
        }
      },
      encoder: encodeURIComponent
    }
      , Y = {
      storage: null,
      first: "",
      put: function (a, e) {
        this.storage || (this.storage = {},
          this.first = a);
        this.storage[a] = e
      },
      get: function (a) {
        return a in this.storage ? this.storage[a] : {}
      }
    }
      , ca = {
      base: {
        callback: void 0,
        type: void 0,
        check: function () {
        },
        load: function (a) {
        },
        init: function (e, l) {
          a(l);
          n.callback = e;
          n._options = l;
          n._init()
        },
        _init: function () {
        },
        _options: {}
      },
      hashchangeEvent: {
        _skip: !1,
        _init: function () {
          e(window).bind("hashchange", function () {
            !0 === n._skip ? n._skip = !1 : n.check()
          })
        },
        check: function () {
          var a = M.get() ? M.get() : Y.first;
          n.callback(a, Y.get(a))
        },
        load: function (a, e) {
          var m = M.get() ? M.get() : Y.first;
          Y.put(a, e);
          a != m && (n._skip = !0);
          M.put(a)
        },
        reload: function (a, e) {
          Y.put(a, e)
        }
      },
      HTML5: {
        _init: function () {
          e(window).bind("popstate", n.check)
        },
        check: function (a) {
          a = a.originalEvent.state;
          n.callback(a ? document.location : "", a)
        },
        load: function (a, e) {
          var n = location.protocol + "//" + location.host + location.pathname + a.replace(/^!\//, "");
          decodeURIComponent(n) != decodeURIComponent(window.location.href) && window.history.pushState(e, null, n)
        },
        reload: function (a, e) {
          window.history.replaceState(e, null, location.protocol + "//" + location.host + location.pathname + a.replace(/^!\//, ""))
        }
      }
    }
      , n = e.extend({}, ca.base);
    "pushState" in window.history ? n.type = "HTML5" : "onhashchange" in window && (n.type = "hashchangeEvent");
    n.type && (e.extend(n, ca[n.type]),
      Commerceinstruments.history = n);
    e.fn.hasFixedParent = function (a) {
      var n = !1;
      this.parents().each(function (a, m) {
        if ("fixed" === e(m).css("position"))
          return n = !0,
            !1
      });
      return n
    }
  }
)(Commerceinstruments.$);
(function (e, a, M, Y) {
    var ca = function () {
      return this.init.apply(this, arguments)
    };
    ca.prototype = {
      defaults: {
        onstatechange: function () {
        },
        ondragstart: function () {
        },
        ondragend: function () {
        },
        isRange: !1,
        showLabels: !0,
        showScale: !0,
        step: 1,
        format: "%s",
        theme: "theme-green",
        width: 300,
        disable: !1
      },
      template: '<div class="slider-container"><div class="back-bar"><div class="selected-bar"></div><div class="pointer low"></div><div class="pointer-label">123456</div><div class="pointer high"></div><div class="pointer-label">456789</div><div class="clickable-dummy"></div></div><div class="scale"></div></div>',
      init: function (a, m) {
        this.options = e.extend({}, this.defaults, m);
        this.inputNode = e(a);
        this.options.value = this.inputNode.val() || (this.options.isRange ? this.options.from + "," + this.options.from : this.options.from);
        this.domNode = e(this.template);
        this.domNode.addClass(this.options.theme);
        this.inputNode.after(this.domNode);
        this.domNode.bind("change", this.onChange);
        this.pointers = e(".pointer", this.domNode);
        this.lowPointer = this.pointers.first();
        this.highPointer = this.pointers.last();
        this.labels = e(".pointer-label", this.domNode);
        this.lowLabel = this.labels.first();
        this.highLabel = this.labels.last();
        this.scale = e(".scale", this.domNode);
        this.bar = e(".selected-bar", this.domNode);
        this.clickableBar = this.domNode.find(".clickable-dummy");
        this.interval = this.options.to - this.options.from;
        this.render()
      },
      render: function () {
        0 !== this.inputNode.width() || this.options.width ? (this.domNode.width(this.options.width || this.inputNode.width()),
          this.inputNode.hide(),
        this.isSingle() && (this.lowPointer.hide(),
          this.lowLabel.hide()),
        this.options.showLabels || this.labels.hide(),
          this.attachEvents(),
        this.options.showScale && this.renderScale(),
          this.setValue(this.options.value)) : console.log("jRange : no width found, returning")
      },
      isSingle: function () {
        return "number" === typeof this.options.value ? !0 : -1 !== this.options.value.indexOf(",") || this.options.isRange ? !1 : !0
      },
      attachEvents: function () {
        this.clickableBar.click(e.proxy(this.barClicked, this));
        this.pointers.bind("mousedown touchstart", e.proxy(this.onDragStart, this));
        this.pointers.bind("dragstart", function (a) {
          a.preventDefault()
        })
      },
      onDragStart: function (a) {
        this.options.disable || "mousedown" === a.type && 1 !== a.which || (a.stopPropagation(),
          a.preventDefault(),
          a = e(a.target),
          this.pointers.removeClass("last-active"),
          a.addClass("focused last-active"),
          this[(a.hasClass("low") ? "low" : "high") + "Label"].addClass("focused"),
          e(M).bind("mousemove.slider touchmove.slider", e.proxy(this.onDrag, this, a)),
          e(M).bind("mouseup.slider touchend.slider touchcancel.slider", e.proxy(this.onDragEnd, this)),
          this.options.ondragstart.call(this, this.options.valuei, a))
      },
      onDrag: function (a, e) {
        e.stopPropagation();
        e.preventDefault();
        e.originalEvent.touches && e.originalEvent.touches.length ? e = e.originalEvent.touches[0] : e.originalEvent.changedTouches && e.originalEvent.changedTouches.length && (e = e.originalEvent.changedTouches[0]);
        var n = e.clientX - this.domNode.offset().left;
        this.domNode.trigger("change", [this, a, n])
      },
      onDragEnd: function (a) {
        this.pointers.removeClass("focused");
        this.labels.removeClass("focused");
        e(M).unbind(".slider");
        this.options.ondragend.call(this, this.options.value)
      },
      barClicked: function (a) {
        if (!this.options.disable)
          if (a = a.pageX - this.clickableBar.offset().left,
            this.isSingle())
            this.setPosition(this.pointers.last(), a, !0, !0);
          else {
            var e = Math.abs(parseInt(this.pointers.first().css("left"), 10) - a + this.pointers.first().width() / 2) < Math.abs(parseInt(this.pointers.last().css("left"), 10) - a + this.pointers.first().width() / 2) ? this.pointers.first() : this.pointers.last();
            this.setPosition(e, a, !0, !0)
          }
      },
      onChange: function (a, e, l, D) {
        if (e.isSingle()) {
          a = 0;
          var n = e.domNode.width()
        } else
          a = l.hasClass("high") ? e.lowPointer.position().left + e.lowPointer.width() / 2 : 0,
            n = l.hasClass("low") ? e.highPointer.position().left + e.highPointer.width() / 2 : e.domNode.width();
        e.setPosition(l, Math.min(Math.max(D, a), n), !0)
      },
      setPosition: function (a, e, l, D) {
        var n = this.lowPointer.position().left
          , m = this.highPointer.position().left
          , M = a.width() / 2;
        l || (e = this.prcToPx(e));
        a[0] === this.highPointer[0] ? m = Math.round(e - M) : n = Math.round(e - M);
        a[D ? "animate" : "css"]({
          left: Math.round(e - M)
        });
        l = this.isSingle() ? 0 : n + M;
        this.bar[D ? "animate" : "css"]({
          width: Math.round(m + M - l),
          left: l
        });
        this.showPointerValue(a, e, D);
        this.isReadonly()
      },
      setValue: function (a) {
        var e = a.toString().split(",");
        this.options.value = a;
        a = this.valuesToPrc(2 === e.length ? e : [0, e[0]]);
        this.isSingle() || this.setPosition(this.lowPointer, a[0]);
        this.setPosition(this.highPointer, a[1])
      },
      renderScale: function () {
        var a = this.options.to - this.options.from;
        4 < a ? a = 5 : 2 > a && (a = 2);
        for (var m = Math.round(100 / (a - 1) * 10) / 10, l = "", D = 0; D < a; D++)
          l += '<span style="left: ' + D * m + '%"><ins>' + Commerceinstruments.GetWidgets().numberFormat(this.prcToValue(D * m), 0, "", Commerceinstruments.GetWidgets().options.PriceFormatThousandsSeparator) + "</ins></span>";
        this.scale.html(l);
        e("ins", this.scale).each(function () {
          e(this).css({
            marginLeft: -e(this).outerWidth(!1) / 2
          })
        })
      },
      getBarWidth: function () {
        var a = this.options.value.split(",");
        return 1 < a.length ? parseInt(a[1], 10) - parseInt(a[0], 10) : parseInt(a[0], 10)
      },
      showPointerValue: function (a, m, l) {
        var n = e(".pointer-label", this.domNode)[a.hasClass("low") ? "first" : "last"]()
          , K = this.positionToValue(m);
        if (e.isFunction(this.options.format)) {
          var G = this.isSingle() ? Y : a.hasClass("low") ? "low" : "high";
          G = this.options.format(K, G)
        } else
          G = this.options.format.replace("%s", K);
        G = n.html(G).width();
        n[l ? "animate" : "css"]({
          left: Math.min(Math.max(m - G / 2, 0), this.options.width - G)
        });
        this.setInputValue(a, K)
      },
      valuesToPrc: function (a) {
        return [100 * (a[0] - this.options.from) / this.interval, 100 * (a[1] - this.options.from) / this.interval]
      },
      prcToValue: function (a) {
        return Math.round(a / 100 * this.interval + this.options.from)
      },
      prcToPx: function (a) {
        return this.domNode.width() * a / 100
      },
      positionToValue: function (a) {
        a = a / this.domNode.width() * this.interval;
        a += this.options.from;
        return Math.round(a / this.options.step) * this.options.step
      },
      setInputValue: function (a, e) {
        if (this.isSingle())
          this.options.value = e.toString();
        else {
          var l = this.options.value.split(",");
          a.hasClass("low") ? this.options.value = e + "," + l[1] : this.options.value = l[0] + "," + e
        }
        this.inputNode.val() !== this.options.value && (this.inputNode.val(this.options.value),
          this.options.onstatechange.call(this, this.options.value))
      },
      getValue: function () {
        return this.options.value
      },
      isReadonly: function () {
        this.domNode.toggleClass("slider-readonly", this.options.disable)
      },
      disable: function () {
        this.options.disable = !0;
        this.isReadonly()
      },
      enable: function () {
        this.options.disable = !1;
        this.isReadonly()
      },
      toggleDisable: function () {
        this.options.disable = !this.options.disable;
        this.isReadonly()
      }
    };
    e.fn.jRange = function (n) {
      var m = arguments, l;
      this.each(function () {
        var D = e(this)
          , K = e.data(this, "plugin_jRange")
          , G = "object" === typeof n && n;
        K || (D.data("plugin_jRange", K = new ca(this, G)),
          e(a).resize(function () {
            K.setValue(K.getValue())
          }));
        "string" === typeof n && (l = K[n].apply(K, Array.prototype.slice.call(m, 1)))
      });
      return l || this
    }
  }
)(Commerceinstruments.$, window, document);
