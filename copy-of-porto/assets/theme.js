var pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
window.theme = window.theme || {};

/* ================ SLATE ================ */
window.theme = window.theme || {};

theme.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
    .on('shopify:section:load', this._onSectionLoad.bind(this))
    .on('shopify:section:unload', this._onSectionUnload.bind(this))
    .on('shopify:section:select', this._onSelect.bind(this))
    .on('shopify:section:deselect', this._onDeselect.bind(this))
    .on('shopify:block:select', this._onBlockSelect.bind(this))
    .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _createInstance(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (_.isUndefined(constructor)) {
      return;
    }

    var instance = _.assignIn(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
      if(frontendData.imageLazyLoad) {
        $(container).find('img').addClass("lazyload");
      }
    }
  },

  _onSectionUnload(evt) {
    this.instances = _.filter(this.instances, function(instance) {
      var isEventInstance = (instance.id === evt.detail.sectionId);

      if (isEventInstance) {
        if (_.isFunction(instance.onUnload)) {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
      instance.onSelect(evt);
    }
  },

  _onDeselect(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
      instance.onDeselect(evt);
    }
  },

  _onBlockSelect(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
      instance.onBlockDeselect(evt);
    }
  },

  register(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(function(index, container) {
      this._createInstance(container, constructor);
    }.bind(this));
  },
});

/* ================ SECTION ================ */

window.theme = window.theme || {};
window.theme = window.theme || {};
theme.Slideshow = (function () {
  this.$container = null;
  function slideshow(el) {
    this.$container = $(el);

    if (this.$container.hasClass('owl-carousel')) {
      var data_carousel = this.$container.parent().find('.data-slideshow');
      if (data_carousel.data('auto')) {
        var autoplay = true;
        var autoplayTime = data_carousel.data('auto');
      }
      else {
        var autoplay = false;
        var autoplayTime = 5000;
      }

      if (data_carousel.data('transition') == 'fade' && data_carousel.data('transition') != '') {
        var transition = 'fadeOut';
      }
      else {
        var transition = false;
      }

      var slideContainer = this.$container;
      slideContainer.owlCarousel({
        items: 1,
        smartSpeed: 500,
        autoplay,
        lazyLoad: true,
        loop: slideContainer.children().length > 1,
        autoplayTimeout: autoplayTime,
        autoplayHoverPause: true,
        animateOut: transition,
        dots: data_carousel.data('paging'),
        nav: data_carousel.data('nav'),
        navText: [data_carousel.data('prev'), data_carousel.data('next')],
        thumbs: true,
        thumbImage: false,
        thumbsPrerendered: true,
        thumbContainerClass: 'owl-thumbs',
        thumbItemClass: 'owl-thumb-item',
        onTranslated() {
          $('.owl-item.active').find('video').each(function() {
            this.play();
          });
        },
        onTranslate() {
          $('.owl-item').find('video').each(function() {
            this.pause();
          });
        }
      });
    }

    if (this.$container.parents('.full-screen-slider').length > 0) {
      fullScreenInit();
      $(window).resize(() => {
        fullScreenInit();
      });
    }
  }

  function fullScreenInit() {
    var s_width = $(window).innerWidth();
    var s_height = $(window).innerHeight();
    var s_ratio = s_width / s_height;
    var v_width = 320;
    var v_height = 240;
    var v_ratio = v_width / v_height;

    $('.full-screen-slider div.item > video').css('position', 'absolute');
    $('.full-screen-slider div.item > video').bind('loadedmetadata', function () {
      v_width = this.videoWidth;
      v_height = this.videoHeight;
      v_ratio = v_width / v_height;

      if (s_ratio >= v_ratio) {
        $(this).width(s_width);
        $(this).height('');
        $(this).css('left', '0px');
        $(this).css('top', `${(s_height-s_width/v_width*v_height)/2}px`);
      }
      else {
        $(this).width('');
        $(this).height(s_height);
        $(this).css('left', `${(s_width-s_height/v_height*v_width)/2}px`);
        $(this).css('top', '0px');
      }

      $(this).get(0).play();
    });
  }

  return slideshow;
}());

theme.BannerMasonryGrid = (function () {
  this.$container = null;
  function masonryInit(el) {
    this.$container = $(el);
    var $container = this.$container.find('.masonry-grid');

    $container.css('opacity', 0);
    if ($container.length > 0) {
      $container.imagesLoaded(() => {
        $container.packery({
          itemSelector: ".masonry-grid-item",
          columnWidth: ".grid-sizer",
          percentPosition: true
        });
      });

      setTimeout(() => {
        $container.animate({
          opacity: 1
        }, 200);
      }, 1000);
    }
  }

  return masonryInit;
}());

theme.BlogCarousel = (function () {
  this.$container = null;
  function blogCarouselInit(el) {
    this.$container = $(el);
    if (this.$container.find('.owl-carousel').length > 0) {
      carouselSlider(this.$container.find('.owl-carousel'));
    }
  }
  return blogCarouselInit;
}());

theme.BlogTestimonial = (function () {
  this.$container = null;
  function blogInit(el) {
    this.$container = $(el);
    if (this.$container.find('.owl-carousel').length > 0) {
      carouselSlider(this.$container.find('.owl-carousel'));
    }
  }

  return blogInit;
}());

theme.BrandSlider = (function () {
  this.$container = null;
  function brandsInit(el) {
    this.$container = $(el);
    if (this.$container.find('.owl-carousel').length > 0) {
      carouselSlider(this.$container.find('.owl-carousel'));
    }
  }
  return brandsInit;
}());

theme.CollectionSlider = (function () {
  this.$container = null;
  function collectionInit(el) {
    this.$container = $(el);
    if (this.$container.find('.owl-carousel').length > 0) {
      carouselSlider(this.$container.find('.owl-carousel'));
    }
  }

  return collectionInit;
}());

theme.InstagramFeed = (function () {
  this.$container = null;
  function init(el) {
    this.$container = $(el);
    var instagram = this.$container.find('.blog-instagrams').css('opacity', 0);
    if (instagram.length > 0) {
      feedGetContent(instagram);
    }
  }
  function feedGetContent(instagram) {
    var userID = instagram.data('userid');
    var token = instagram.data('token');
    var count = instagram.data('count');
    var url = 'https://api.instagram.com/v1/users/' + userID + '/media/recent/?access_token=' + token;

    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      cache: false,
      url,
      success(data) {
        for (var i = 0; i < count; i++) {
          if (data.data[i]) {
            var caption = "";
            if (data.data[i].caption) {
              caption = data.data[i].caption.text;
            }

            if (frontendData.imageLazyLoad) {
              instagram.append("<div class='insta-item' data-date='"+data.data[i].created_time+"' data-sortid='"+i*2+"'><a target='_blank' href='" + data.data[i].link +"'><span class='content'><i class='icon-instagram'></i></span><img class='instagram-image lazyload' data-src='" + data.data[i].images.low_resolution.url +"' /></a></div>");
            }
            else {
              instagram.append("<div class='insta-item' data-date='"+data.data[i].created_time+"' data-sortid='"+i*2+"'><a target='_blank' href='" + data.data[i].link +"'><span class='content'><i class='icon-instagram'></i></span><img class='instagram-image' src='" + data.data[i].images.low_resolution.url +"' /></a></div>");
            }
          }
        }

        instagram.imagesLoaded().animate({
          'opacity' : 1
        }, 500);
        instagram.owlCarousel({
          loop: true,
          margin: 0,
          responsiveClass: true,
          nav: false,
          autoplay: true,
          autoplayTimeout: 3500,
          dots: false,
          lazyLoad: true,
          responsive: {
            0: {
              items: 2
            },
            480: {
              items: 3
            },
            768: {
              items: 5
            },
            992: {
              items: 6
            },
            1200: {
              items: 7
            },
            1400: {
              items: 8
            },
            1600: {
              items: 9
            },
            1800: {
              items: 10
            }
          }
        });
      },
    });
  }

  return init;
}());

theme.ParallaxSlider = (function () {
  this.$container = null;
  function parallaxslider(el) {
    this.$container = $(el);

    if (this.$container.find('.owl-carousel').length > 0) {
      carouselSlider(this.$container.find('.owl-carousel'));
    }
  }
  return parallaxslider;
}());

theme.MainBlock = (function () {
  this.$container = null;
  function mainblock(el) {
    this.$container = $(el);

    if (this.$container.find('.owl-carousel').length > 0) {
      this.$container.find('.owl-carousel').each(function () {
        carouselSlider($(this));
      });
    }

    if (this.$container.find('.category-products .products-grid').length > 0) {
      productGridSetup();
    }
    productReview();
    countDownInit();
    qtyInit();
  }
  return mainblock;
}());

theme.TestimonialBlog = (function () {
  this.$container = null;
  function testimonial(el) {
    this.$container = $(el);
    if (this.$container.find('.owl-carousel').length > 0) {
      carouselSlider(this.$container.find('.owl-carousel'));
    }
  }
  return testimonial;
}());

theme.CollectionProducts = (function () {
  this.$container = null;

  function collectionproducts(el) {
    this.$container = $(el);
    if (this.$container.find('.owl-carousel').length > 0) {
      this.$container.find('.owl-carousel').each(function () {
        carouselSlider($(this));
      });
    }

    if (this.$container.find('.category-products .products-grid').length > 0) {
      productGridSetup();
    }

    productReview();
    countDownInit();
    qtyInit();
  }

  return collectionproducts;
}());

theme.ProductsBannerSlider = (function () {
  this.$container = null;

  function productsbanner(el) {
    this.$container = $(el);
    $(`${el  } .half-image`).css('min-height', `${$(el + " .half-content").outerHeight()}px`);

    setTimeout(() => {
      $(el + " .half-image").css("min-height",$(el + " .half-content").outerHeight()+"px");
    }, 5000);

    $(window).resize(() => {
      setTimeout(function(){
        $(el + " .half-image").css("min-height",$(el + " .half-content").outerHeight()+"px");
      }, 500);
    });

    if (this.$container.find('.owl-carousel').length > 0) {
      carouselSlider(this.$container.find('.owl-carousel'));
    }

    productReview();
    countDownInit();
    qtyInit();
  }

  return productsbanner;
}());

theme.ProductsMasonry = (function () {
  this.$container = null;
  function productsmasonry(el) {
    productReview();
    countDownInit();
    qtyInit();
  }

  return productsmasonry;
}());

theme.OnePageCollection = (function () {
  this.$container = null;
  function onepage(el) {
    this.$container = $(el);

    if (this.$container.find('.owl-carousel').length > 0) {
      this.$container.find('.owl-carousel').each(function () {
        carouselSlider($(this));
      });
    }

    onpageAction();
    productReview();
    countDownInit();
    qtyInit();
  }

  function onpageAction() {
    $('.category-detail > .title-menu > a.parent').off('click').on('click', function (e) {
      if ($(this).hasClass('opened')) {
        $(this).parent().children('.menu-popup').fadeOut(200);
        $(this).removeClass('opened');
      }
      else {
        $(this).addClass('opened');
        $(this).parent().children('.menu-popup').fadeIn(200);
      }

      e.stopPropagation();
    });

    $('.category-detail > .title-menu > a.parent').parent().click((e) => {
      e.stopPropagation();
    });

    $('html,body').click(() => {
      $(".category-detail > .title-menu > a.parent").parent().children(".menu-popup").fadeOut(200);
      $(".category-detail > .title-menu > a.parent").removeClass("opened");
    });

    $('.onepage-category .category-list > ul > li > a').off('click').on('click', function () {
      link_id = $(this).attr('data-link');
      $('#link_' + link_id).scrollToMe();
      var cur_item = $(this);

      setTimeout(() => {
        $(".onepage-category .category-list > ul > li > a").removeClass("active");
        $(cur_item).addClass("active");
      }, 500);
    });

    $(window).scroll(function () {
      $('.onepage-category .category-list > ul > li > a').each(function () {
        if ($('#link_' + $(this).attr('data-link')).offset() && ($(window).scrollTop() >= $('#link_' + $(this).attr('data-link')).offset().top - $(window).innerHeight() / 2) && ($(window).scrollTop() <= $('#link_' + $(this).attr('data-link')).offset().top + $('#link_' + $(this).attr('data-link')).height() - $(window).innerHeight() / 2)) {
          $(this).addClass('active');
          $(`.onepage-category .category-list > ul > li > a:not([data-link='${$(this).attr("data-link")}'])`).removeClass('active');
        }
      });

      if ($('.onepage-category .category-list > ul').outerHeight() < $(this).innerHeight()) {
        $('.onepage-category .category-list > ul').removeClass('fixed-bottom');

        if ($(this).scrollTop() >= $('.onepage-category .category-list').offset().top - 24) {
          $('.onepage-category .category-list > ul').addClass('fixed-top');
        }
        else {
          $('.onepage-category .category-list > ul').removeClass('fixed-top');
        }
      }
      else {
        $('.onepage-category .category-list > ul').removeClass('fixed-top');
        if ($(this).scrollTop() >= $('.onepage-category .category-list').offset().top + $('.onepage-category .category-list > ul').outerHeight() + 46 - $(this).innerHeight()) {
          $('.onepage-category .category-list > ul').addClass('fixed-bottom');
        }
        else {
          $('.onepage-category .category-list > ul').removeClass('fixed-bottom');
        }
      }

      if (($('.onepage-category .category-list > ul').hasClass('fixed-bottom') && ($(this).scrollTop() + $(window).innerHeight() >= $('.footer-wrapper').offset().top)) || ($('.onepage-category .category-list > ul').hasClass('fixed-top') && ($(this).scrollTop() + $(window).innerHeight() >= $('.footer-wrapper').offset().top) && ($('.onepage-category .category-list > ul').offset().top + $('.onepage-category .category-list > ul').outerHeight() >= $('.footer-wrapper').offset().top) && ($(this).scrollTop() + $('.onepage-category .category-list > ul').outerHeight() + 70 >= $('.footer-wrapper').offset().top))) {
        $('.onepage-category .category-list > ul').addClass('absolute-bottom');
      }
      else {
        $('.onepage-category .category-list > ul').removeClass('absolute-bottom');
      }
    });
  }

  return onepage;
}());

theme.CollectionFilterTab = (function () {
  this.$container = null;

  function filtertab(el) {
    this.$container = $(el);
    if (this.$container.find('.owl-carousel').length > 0) {
      this.$container.find('.owl-carousel').each(function () {
        carouselSlider($(this));
      });
    }

    if (this.$container.find('.category-products .products-grid').length > 0) {
      productGridSetup();
    }

    productReview();
    countDownInit();
    qtyInit();
  }

  return filtertab;
}());

theme.slideshows = {};
theme.SlideshowSection = (function () {
  function SlideshowSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var slideshow = this.slideshow = `#slideshow-section-${sectionId}`;
    theme.slideshows[slideshow] = new theme.Slideshow(slideshow);
  }

  return SlideshowSection;
}());

theme.SlideshowSection.prototype = _.assignIn({}, theme.SlideshowSection.prototype, {
  onUnload() {
    delete theme.slideshows[this.slideshow];
  },
});

theme.bannermasonry = {};
theme.BannerMasonrySection = (function () {
  function BannerMasonrySection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var bannermasonry = this.bannermasonry = `#banner-masonry-${sectionId}`;
    theme.bannermasonry[bannermasonry] = new theme.BannerMasonryGrid(bannermasonry);
  }

  return BannerMasonrySection;
}());

theme.BannerMasonrySection.prototype = _.assignIn({}, theme.BannerMasonrySection.prototype, {
  onUnload() {
    delete theme.bannermasonry[this.bannermasonry];
  },
});

theme.blogslider = {};
theme.BlogSliderSection = (function () {
  function BlogSliderSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var blogslider = this.blogslider = `#blog-posts-${sectionId}`;
    theme.blogslider[blogslider] = new theme.BlogCarousel(blogslider);
  }

  return BlogSliderSection;
}());

theme.BlogSliderSection.prototype = _.assignIn({}, theme.BlogSliderSection.prototype, {
  onUnload() {
    delete theme.blogslider[this.blogslider];
  },
});

theme.blogtestimonial = {};
theme.BlogTestimonialSection = (function () {
  function BlogTestimonialSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var blogtestimonial = this.blogtestimonial = `#blog-testimonial-${sectionId}`;
    theme.blogtestimonial[blogtestimonial] = new theme.BlogTestimonial(blogtestimonial);
  }

  return BlogTestimonialSection;
}());

theme.BlogTestimonialSection.prototype = _.assignIn({}, theme.BlogTestimonialSection.prototype, {
  onUnload() {
    delete theme.blogtestimonial[this.blogtestimonial];
  },
});

theme.brandslider = {};
theme.BrandSliderSection = (function () {
  function BrandSliderSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var brandslider = this.blogtestimonial = `#brands-slider-${sectionId}`;
    theme.brandslider[brandslider] = new theme.BrandSlider(brandslider);
  }

  return BrandSliderSection;
}());

theme.BrandSliderSection.prototype = _.assignIn({}, theme.BrandSliderSection.prototype, {
  onUnload() {
    delete theme.brandslider[this.brandslider];
  },
});

theme.collectionslider = {};
theme.CollectionSliderSection = (function () {
  function CollectionSliderSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var collectionslider = this.collectionslider = `#collection-slider-${sectionId}`;
    theme.collectionslider[collectionslider] = new theme.CollectionSlider(collectionslider);
  }

  return CollectionSliderSection;
}());

theme.CollectionSliderSection.prototype = _.assignIn({}, theme.CollectionSliderSection.prototype, {
  onUnload() {
    delete theme.collectionslider[this.collectionslider];
  },
});

theme.instagramfeed = {};
theme.InstagramFeedSection = (function () {
  function InstagramFeedSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var instagramfeed = this.instagramfeed = `#instagram-section-${sectionId}`;
    theme.instagramfeed[instagramfeed] = new theme.InstagramFeed(instagramfeed);
  }

  return InstagramFeedSection;
}());

theme.InstagramFeedSection.prototype = _.assignIn({}, theme.InstagramFeedSection.prototype, {
  onUnload() {
    delete theme.instagramfeed[this.instagramfeed];
  },
});

theme.parallaxslider = {};
theme.ParallaxSliderSection = (function () {
  function ParallaxSliderSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var parallaxslider = this.parallaxslider = `#parallax-slider-${sectionId}`;
    theme.parallaxslider[parallaxslider] = new theme.ParallaxSlider(parallaxslider);
  }

  return ParallaxSliderSection;
}());

theme.ParallaxSliderSection.prototype = _.assignIn({}, theme.ParallaxSliderSection.prototype, {
  onUnload() {
    delete theme.parallaxslider[this.parallaxslider];
  },
});

theme.mainsection = {};
theme.MainBlockSection = (function () {
  function MainBlockSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var mainsection = this.mainsection = `#main-block-${sectionId}`;
    theme.mainsection[mainsection] = new theme.MainBlock(mainsection);
  }

  return MainBlockSection;
}());

theme.MainBlockSection.prototype = _.assignIn({}, theme.MainBlockSection.prototype, {
  onUnload() {
    delete theme.mainsection[this.mainsection];
  },
});

theme.testimonialsection = {};
theme.TestimonialSection = (function () {
  function TestimonialSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var testimonialsection = this.testimonialsection = `#testimonial-section-${sectionId}`;
    theme.testimonialsection[testimonialsection] = new theme.TestimonialBlog(testimonialsection);
  }

  return TestimonialSection;
}());

theme.TestimonialSection.prototype = _.assignIn({}, theme.TestimonialSection.prototype, {
  onUnload() {
    delete theme.testimonialsection[this.testimonialsection];
  },
});

theme.collectionproducts = {};
theme.CollectionProductsSection = (function () {
  function CollectionProductsSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var collectionproducts = this.collectionproducts = `#filter-products-${sectionId}`;
    theme.collectionproducts[collectionproducts] = new theme.CollectionProducts(collectionproducts);
  }

  return CollectionProductsSection;
}());

theme.CollectionProductsSection.prototype = _.assignIn({}, theme.CollectionProductsSection.prototype, {
  onUnload() {
    delete theme.collectionproducts[this.collectionproducts];
  },
});

theme.productsmasonry = {};
theme.ProductsMasonrySection = (function () {
  function ProductsMasonrySection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var productsmasonry = this.collectionproducts = `#products-masonry-${sectionId}`;
    theme.productsmasonry[productsmasonry] = new theme.ProductsMasonry(productsmasonry);
  }

  return ProductsMasonrySection;
}());

theme.ProductsMasonrySection.prototype = _.assignIn({}, theme.ProductsMasonrySection.prototype, {
  onUnload() {
    delete theme.productsmasonry[this.productsmasonry];
  },
});

theme.onepagecollections = {};
theme.OnePageSection = (function () {
  function OnePageSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var onepage = this.onepage = `#onepage-section-${sectionId}`;
    theme.onepagecollections[onepage] = new theme.OnePageCollection(onepage);
  }

  return OnePageSection;
}());

theme.OnePageSection.prototype = _.assignIn({}, theme.OnePageSection.prototype, {
  onUnload() {
    delete theme.onepagecollections[this.onepage];
  },
});

theme.productsbanner = {};
theme.ProductBannerSection = (function () {
  function ProductBannerSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var productsbanner = this.productsbanner = `#products-banner-${sectionId}`;
    theme.productsbanner[productsbanner] = new theme.ProductsBannerSlider(productsbanner);
  }

  return ProductBannerSection;
}());

theme.ProductBannerSection.prototype = _.assignIn({}, theme.ProductBannerSection.prototype, {
  onUnload() {
    delete theme.productsbanner[this.productsbanner];
  },
});

theme.collectionfilter = {};
theme.CollectionFillterTabSection = (function () {
  function CollectionFillterTabSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var collectionfilter = this.collectionfilter = `#collection-filter-${sectionId}`;
    theme.collectionfilter[collectionfilter] = new theme.CollectionFilterTab(collectionfilter);
  }

  return CollectionFillterTabSection;
}());

theme.CollectionFillterTabSection.prototype = _.assignIn({}, theme.CollectionFillterTabSection.prototype, {
  onUnload() {
    delete theme.collectionfilter[this.collectionfilter];
  },
});

function carouselSlider(el) {
  var carousel = el;
  var data_carousel = carousel.parent().find('.data-carousel');

  if (data_carousel.data('auto')) {
    var autoplay = true;
    var autoplayTime = data_carousel.data('auto');
  }
  else {
    var autoplay = false;
    var autoplayTime = 5000;
  }

  var item_1200 = data_carousel.data('1200') ? data_carousel.data('1200') : 1;
  var item_992 = data_carousel.data('992') ? data_carousel.data('992') : item_1200;
  var item_768 = data_carousel.data('768') ? data_carousel.data('768') : item_992;
  var item_640 = data_carousel.data('640') ? data_carousel.data('640') : item_768;
  var item_480 = data_carousel.data('480') ? data_carousel.data('480') : item_640;
  var item_320 = data_carousel.data('320') ? data_carousel.data('320') : item_480;
  var loop = carousel.children().length > data_carousel.data('items');

  carousel.owlCarousel({
    items: data_carousel.data('items'),
    smartSpeed: 500,
    autoplay,
    loop: loop,
    lazyLoad: true,
    autoplayTimeout: autoplayTime,
    autoplayHoverPause: true,
    dots: data_carousel.data('paging'),
    margin: data_carousel.data('margin'),
    nav: carousel.children().length > data_carousel.data('items') ? data_carousel.data('nav'):false,
    navText: [data_carousel.data('prev'), data_carousel.data('next')],
    responsive: {
      0: {
        items: item_320,
      },
      480: {
        items: item_480,
      },
      640: {
        items: item_640,
      },
      768: {
        items: item_768,
      },
      992: {
        items: item_992,
      },
      1200: {
        items: item_1200,
      },
    },
  });

  var $thumbsOwl = carousel.owlCarousel();
  carousel.on('mouseenter', '.owl-item', function (e) {
    var i = $(this).index();
    carousel.find('.item img').removeClass('current');
    carousel.find('.item img').eq(i).addClass('current');
  });
  carousel.find('.active .item img').eq(0).addClass('current');
}

function productGridSetup() {
  $('.category-products .products-grid li.item:nth-child(2n)').addClass('nth-child-2n');
  $('.category-products .products-grid li.item:nth-child(2n+1)').addClass('nth-child-2np1');
  $('.category-products .products-grid li.item:nth-child(3n)').addClass('nth-child-3n');
  $('.category-products .products-grid li.item:nth-child(3n+1)').addClass('nth-child-3np1');
  $('.category-products .products-grid li.item:nth-child(4n)').addClass('nth-child-4n');
  $('.category-products .products-grid li.item:nth-child(4n+1)').addClass('nth-child-4np1');
  $('.category-products .products-grid li.item:nth-child(5n)').addClass('nth-child-5n');
  $('.category-products .products-grid li.item:nth-child(5n+1)').addClass('nth-child-5np1');
  $('.category-products .products-grid li.item:nth-child(6n)').addClass('nth-child-6n');
  $('.category-products .products-grid li.item:nth-child(6n+1)').addClass('nth-child-6np1');
  $('.category-products .products-grid li.item:nth-child(7n)').addClass('nth-child-7n');
  $('.category-products .products-grid li.item:nth-child(7n+1)').addClass('nth-child-7np1');
  $('.category-products .products-grid li.item:nth-child(8n)').addClass('nth-child-8n');
  $('.category-products .products-grid li.item:nth-child(8n+1)').addClass('nth-child-8np1');
}

function colorSwatchGrid() {
  $('.configurable-swatch-list li a').on('mouseenter', function (e) {
    e.preventDefault();
    var productImage = $(this).parents('.item-area').find('.product-image-area').find('.product-image');
    productImage.find('img.main').attr('src', $(this).data('image'));
  });
}

function productReview() {
  if ($('.spr-badge').length > 0) {
    SPR.registerCallbacks();
    SPR.initRatingHandler();
    SPR.initDomEls();
    SPR.loadProducts();
    SPR.loadBadges();
  }
}

function qtyInit() {
  $('.qtyplus').click(function (e) {
    // Stop acting like a button
    e.preventDefault();
    // Get its current value
    var currentVal = parseInt($(this).parent('form').find('input[name="quantity"]').val());
    // If is not undefined
    if (!isNaN(currentVal)) {
      // Increment
      $(this).parent('form').find('input[name="quantity"]').val(currentVal + 1);
    }
    else {
      // Otherwise put a 0 there
      $(this).parent('form').find('input[name="quantity"]').val(0);
    }
  });

  // This button will decrement the value till 0
  $('.qtyminus').click(function (e) {
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    fieldName = $(this).attr('field');
    // Get its current value
    var currentVal = parseInt($(this).parent('form').find('input[name="quantity"]').val());
    // If it isn't undefined or its greater than 0
    if (!isNaN(currentVal) && currentVal > 0) {
      // Decrement one
      $(this).parent('form').find('input[name="quantity"]').val(currentVal - 1);
    }
    else {
      // Otherwise put a 0 there
      $(this).parent('form').find('input[name="quantity"]').val(0);
    }
  });
}

function countDownInit() {
  if ($('.product-date').length > 0) {
    $('.product-date').each((i,item) => {
      var date = $(item).attr('data-date');
      var countdown = {
        "yearText": window.date_text.year_text,
        "monthText": window.date_text.month_text,
        "weekText": window.date_text.week_text,
        "dayText": window.date_text.day_text,
        "hourText": window.date_text.hour_text,
        "minText": window.date_text.min_text,
        "secText": window.date_text.sec_text,
        "yearSingularText": window.date_text.year_singular_text,
        "monthSingularText": window.date_text.month_singular_text,
        "weekSingularText": window.date_text.week_singular_text,
        "daySingularText": window.date_text.day_singular_text,
        "hourSingularText": window.date_text.hour_singular_text,
        "minSingularText": window.date_text.min_singular_text,
        "secSingularText": window.date_text.sec_singular_text
      };
      var template;
      if($(item).parents().is(".product-view")) {
        template = '<div class="day"><span class="no">%d</span><span class="text">%td</span></div><div class="hours"><span class="no">%h</span><span class="text">%th</span></div><div class="min"><span class="no">%i</span><span class="text">%ti</span></div><div class="second"><span class="no">%s</span><span class="text">%ts</span></div>';
      }
      else {
        template = '<span class="offer-endtext">Sale Ends In:</span><span>%d days, %h : %i : %s</span>';
      }
      if(date) {
        var config = {date: date};
        $.extend(config, countdown);
        if(template) {
          config.template = template;
        }
        $(item).countdown(config);
      }
    });
  }
}

function isEmpty(el) {
  return !$.trim(el.html());
}

function checkItemCompareExist() {
  if ($('#compareTableList table > tbody > tr:first-child > td').length > 1) {
    return true;
  }

  return false;
}

function setQuantityDown(event) {
  var result = $(event.target).parents('.input-box').find('.quantity-selector');
  var qty = parseInt(result.val());
  if (qty > 1) {result.val(--qty);}
  return false;
}

function setQuantityUp(event) {
  var result = $(event.target).parents('.input-box').find('.quantity-selector');
  var qty = parseInt(result.val());
  result.val(++qty);
  return false;
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = 'expires=' + d.toUTCString();
  document.cookie = `${cname  }=${cvalue};${expires};path=/`;
}

function getCookie(cname) {
  var name = `${cname}=`;
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function removeWishlist(event) {
  var currentHandle = $(event.target).data('productHandle');
  var handles = getCookie('wishlistItems');
  var productHandle = $('.link-wishlist').data('productHandle');
  var handlesAfterRemove = [];
  if (handles != '') {
    var wishlistArr = JSON.parse(handles);
    $.each(wishlistArr, ( key, value ) => {
      if(value != currentHandle){
        handlesAfterRemove.push(value);
      }
    });
    var json_str = JSON.stringify(handlesAfterRemove);
    setCookie('wishlistItems', json_str);
    var wishlistCount = handlesAfterRemove.length;
    if (wishlistCount > 0) {
      $('#wishlistCount').html(`(${wishlistCount})`);
      $('#header-wishlist .wishlistCount').html(`(${wishlistCount})`);
    }
    else {
      $('#wishlistCount').html('');
      $('#header-wishlist .wishlistCount').html('');
    }
    $(event.target).parents('tr').remove();
    var alertTemplate = `<div class="message alert alert-success">${SW.page.translateText($(event.target).data('productTitle'))} ${wishlistData.remove}</div>`;
    $('#wishlistAlert').html(alertTemplate);

    if (currentHandle == productHandle) {
      $('.link-wishlist').removeClass('active');
    }
    $('.category-products .link-wishlist').each(function () {
      var checkHandle = $(this).data('productHandle');
      if (checkHandle == currentHandle) {
        $(this).removeClass('active');
      }
    });

    if (isEmpty($('#wishlistTableList tbody'))) {
      setCookie('wishlistItems', '');
      var alertTemplate = `<p class="alert alert-warning"><span class="brackets">${wishlistData.no_item}</span></p>`;
      $('#wishlistAlert').append(alertTemplate);
      $('#wishlistTableList .cart-table').hide();
    }
  }
}

function removeCompare(event) {
  var currentHandle = $(event.target).parents('.product-image').find('.btn-delete-compare').data('productHandle');
  var handles = getCookie('compareItems');
  var productHandle = $('.link-compare').data('productHandle');
  var handlesAfterRemove = [];

  if (handles != '') {
    var compareArr = JSON.parse(handles);

    $.each(compareArr, ( key, value ) => {
      if(value != currentHandle){
        handlesAfterRemove.push(value);
      }
    });

    var json_str = JSON.stringify(handlesAfterRemove);
    setCookie('compareItems', json_str);
    var compareCount = handlesAfterRemove.length;

    if (compareCount > 0) {
      $('#compareCount').html(`(${compareCount})`);
      $('#header-compare .compareCount').html(`(${compareCount})`);
    }
    else {
      $('#compareCount').html('');
      $('#header-compare .compareCount').html('');
    }

    var classRemove = $(event.target).parents('td').attr('class');
    $('#compareTableList').find(`.${classRemove}`).remove();
    var alertTemplate = `<div class="message alert alert-success">${SW.page.translateText($(event.target).parents('.product-image').find('.btn-delete-compare').data('productTitle'))} ${compareData.remove}</div>`;
    $('#compareAlert').html(alertTemplate);

    if (currentHandle == productHandle) {
      $('.link-compare').removeClass('active');
    }

    $('.category-products .link-compare').each(function () {
      var checkHandle = $(this).data('productHandle');
      if (checkHandle == currentHandle) {
        $(this).removeClass('active');
      }
    });

    if (!checkItemCompareExist()) {
      $('#compareTableList').hide();
      setCookie('compareItems', '');
      var alertTemplate = `<p class="alert alert-warning"><span class="brackets">${compareData.no_item}</span></p>`;
      $('#compareAlert').append(alertTemplate);
    }
  }
}

$(document).ready(() => {
  var sections = new theme.Sections();
  sections.register('slideshow-section', theme.SlideshowSection);
  sections.register('banner-masonry-section', theme.BannerMasonrySection);
  sections.register('blog-posts-section', theme.BlogSliderSection);
  sections.register('blog-testimonial-section', theme.BlogTestimonialSection);
  sections.register('brands-slider-section', theme.BrandSliderSection);
  sections.register('collection-slider-section', theme.CollectionSliderSection);
  sections.register('instagram-section', theme.InstagramFeedSection);
  sections.register('parallax-slider-section', theme.ParallaxSliderSection);
  sections.register('main-block-section', theme.MainBlockSection);
  sections.register('testimonial-section', theme.TestimonialSection);
  sections.register('filter-products-section', theme.CollectionProductsSection);
  sections.register('products-masonry-section', theme.ProductsMasonrySection);
  sections.register('onepage-section', theme.OnePageSection);
  sections.register('products-banner-section', theme.ProductBannerSection);
  sections.register('collection-filter-section', theme.CollectionFillterTabSection);
});

var SW = SW || {};
(function ($) {
  var pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
  var $window = $(window);
  var body = $("body");
  var deviceAgent = navigator.userAgent.toLowerCase();
  var isMobileAlt = deviceAgent.match(/(iphone|ipod|ipad|android|iemobile)/);
  var imageZoomThreshold = 20;
  var loading = false;
  var noMoreProducts = false;
  var infiniteMode = $('.infinite-loader').data('mode');

  SW.megamenu = {
    init() {
      var item = $('.top-navigation li.level0.parent');
      item.each(function(){
        if($(this).find('li.active').length > 0 ) {
          $(this).addClass('active');
        }
      });

      $('.main-navigation').find("li.m-dropdown .menu-wrap-sub ul > li.parent").mouseover(function() {
        var popup = $(this).children(".menu-wrap-sub");
        var w_width = $(window).innerWidth();

        if(popup) {
          var pos = $(this).offset();
          var c_width = $(popup).outerWidth();
          if(w_width <= pos.left + $(this).outerWidth() + c_width) {
            $(popup).css("left", "auto");
            $(popup).css("right", "100%");
            $(popup).css("border-radius", "6px 0 6px 6px");
          }
          else {
            $(popup).css("left", "100%");
            $(popup).css("right", "auto");
            $(popup).css("border-radius", "0 6px 6px 6px");
          }
        }
      });

      $('.main-navigation').find("li.static-dropdown.parent,li.m-dropdown.parent").mouseover(function() {
        var popup = $(this).children(".menu-wrap-sub");
        var w_width = $(window).innerWidth();
        if(popup) {
          var pos = $(this).offset();
          var c_width = $(popup).outerWidth();
          if(w_width <= pos.left + c_width) {
            $(popup).css("left", "auto");
            $(popup).css("right", "0");
            $(popup).css("border-radius", "6px 0 6px 6px");
          }
          else {
            $(popup).css("left", "0");
            $(popup).css("right", "auto");
            $(popup).css("border-radius", "0 6px 6px 6px");
          }
        }
      });
    },
  };

  SW.page = {
    init() {
      if($('.collection-main-banner').find('.move-below-header').length > 0) {
        var banner = $('.collection-main-banner');
        var banner_clone = $('.collection-main-banner').first().clone();
        banner_clone.appendTo('.top-container .category-banner');
        banner.remove();
      }

      if($('body').find('#resultLoading').attr('id') != 'resultLoading') {
        $('body').append('<div id="resultLoading" style="display:none"><div class="spinner"></div></div>');
      }

      if($('#popup_newsletter').length > 0) {
        var newsletter = $('#popup_newsletter');
        SW.page.newsletterPopupInit(newsletter);
      }

      SW.page.headerInit();
      SW.page.setVisualState();

      $('.smart_input').on('change', function() {
        'use strict';
        SW.page.setVisualState();
      });

      SW.page.parallaxInit();

      if($('.carousel-init.owl-carousel').length > 0) {
        var carousel = $('.carousel-init.owl-carousel');
        carousel.each(function(){
          carouselSlider($(this));
        });
      }

      $(".checkout-info .shipping a").click(function() {
        if ($(this).hasClass('collapsed')) {
          $(this).parent().removeClass('closed');
        }
        else {
          $(this).parent().addClass('closed');
        }
      });

      SW.page.wordRotateInit();
      SW.page.simpleDropdown();
      SW.page.ajaxSearch();
    },
    headerInit() {
      $(".search-area a.search-icon").click(function (e) {
        $(".top-links-icon").parent().children().children("ul.links").removeClass("d-block");
        if ($('.search-extended').is('.show')) {
          $('.search-extended').removeClass('d-block');
        }
        else {
          $('.search-extended').addClass('d-block');
        }

        e.stopPropagation();
      });

      $(".top-links-icon").click(function(e) {
        $(".search-area a.search-icon").parent().children(".search-extended").removeClass("d-block");
        if($(this).parent().children().children("ul.links").hasClass("d-block")) {
          $(this).parent().children().children("ul.links").removeClass("d-block");
        }
        else {
          $(this).parent().children().children("ul.links").addClass("d-block");
        }

        e.stopPropagation();
      });

      $(".search-area a.search-icon").parent().click(function(e) {
        e.stopPropagation();
      });

      $(".mini-cart").hover(function() {
        $(this).children().children('.cart-wrapper').fadeIn(200);
      }, function() {
        $(this).children().children('.cart-wrapper').fadeOut(200);
      });

      $("html,body").click(function() {
        $(".top-links-icon").parent().children().children("ul.links").removeClass("d-block");
        $(".search-area a.search-icon").parent().children(".search-extended").removeClass("d-block");
      });

      $('.menu-icon, .mobile-nav-overlay, .close-sidebar-menu').click(function(event) {
        if(!$('body').hasClass('md-mobile-menu') && ($(".header-container").hasClass('type11') || $(".header-container").hasClass('type13') || $(".header-container").hasClass('type7'))) {
          $('body').addClass('md-mobile-menu');
        }

        if(!$('body').hasClass('mobile-nav-shown')) {
          $('body').addClass('mobile-nav-shown', function() {
            setTimeout(function() {
              $(document).one("click",function(e) {
                var target = e.target;
                if (!$(target).is('.mobile-nav') && !$(target).parents().is('.mobile-nav')) {
                  $('body').removeClass('mobile-nav-shown');
                }
              });
            }, 111);
          });
        }
        else {
          $('body').removeClass('mobile-nav-shown');
          $(".mobile-nav").removeClass("d-block");
        }
      });

      $(".header-container.type8 .dropdown-menu .menu-container>a").click(function() {
        if(!$("body").hasClass("template-index") || $(".header-container.type8").hasClass("sticky-header")) {
          if ($(this).next().find('.side-menu').hasClass("show")) {
            $(this).next().find('.side-menu').removeClass("show");
          }
          else {
            $(this).next().find('.side-menu').addClass("show");
          }
        }

        if($(window).width()<=991) {
          if ($(".mobile-nav").hasClass("d-block")) {
            $(".mobile-nav").removeClass("d-block");
            $(".mobile-nav").slideUp();
            $('body').removeClass('mobile-nav-shown');
          }
          else {
            $(".mobile-nav").addClass("d-block");
            $(".mobile-nav").slideDown();
            $('body').addClass('mobile-nav-shown', function() {
              setTimeout(function() {
                $(document).one("click",function(e) {
                  var target = e.target;
                  if (!$(target).is('.mobile-nav') && !$(target).parents().is('.mobile-nav')) {
                    $('body').removeClass('mobile-nav-shown');
                  }
                });
              }, 111);
            });
          }
        }
      });
    },
    simpleDropdown() {
      $('.input-dropdown-inner').each(function() {
        var dd = $(this);
        var btn = dd.find('> a');
        var input = dd.find('> input');
        var list = dd.find('> .list-wrapper');
        inputPadding();

        $(document).click(function(e) {
          var target = e.target;
          if (dd.hasClass('dd-shown') && !$(target).is('.input-dropdown-inner') && !$(target).parents().is('.input-dropdown-inner')) {
            hideList();
            return false;
          }
        });

        btn.on('click', function(e) {
          e.preventDefault();
          if (dd.hasClass('dd-shown')) {
            hideList();
          }
          else {
            showList();
          }
          return false;
        });

        list.on('click', 'a', function(e) {
          e.preventDefault();
          var value = $(this).data('val');
          var label = $(this).html();
          list.find('.current-item').removeClass('current-item');
          $(this).parent().addClass('current-item');

          if (value != 0) {
            list.find('ul:not(.children) > li:first-child').show();
          }
          else if (value == 0) {
            list.find('ul:not(.children) > li:first-child').hide();
          }

          btn.html(label);
          input.val(value);
          $(this).closest("form.has-categories-dropdown").attr("action", "/search/collections/" + value);
          hideList();
          inputPadding();
        });

        function showList() {
          dd.addClass('dd-shown');
          list.slideDown(100);
        }

        function hideList() {
          dd.removeClass('dd-shown');
          list.slideUp(100);
        }

        function inputPadding() {
          var paddingValue = dd.innerWidth() + dd.parent().siblings('.searchsubmit').innerWidth() + 17,
              padding = 'padding-right';
          if($('body').hasClass('rtl')) {
            padding = 'padding-left';
          }
          dd.parent().parent().find( '.s' ).css( padding, paddingValue );
        }
      });
    },
    ajaxSearch() {
      if(!frontendData.ajax_search) {
        return false;
      }

      var form = $('form.searchform');
      var request = null;
      form.each(function() {
        var $this = $(this),
            $results = $this.parent().find('.autocomplete-suggestions'),
            input = $this.find('input[name="q"]');

        $(this).find('input[name="q"]').attr("autocomplete", "off").bind("keyup change", function() {
          var key = $(this).val();
          if (key.trim() == '') {
            $results.hide();
          }
          else {
            if(!frontendData.search_by_collection) {
              var url = "/search?type=product&q=" + key;
            }
            else {
              var val = input.val(), 
                product_cat = $this.find('[name="product_cat"]').val();
              if(product_cat) {
                var url = "/search/collections/" + product_cat + "?type=product&q=" + val;
              }
              else {
                var url = "/search?type=product&q=" + val;
              }
            }
            if(frontendData.search)
              form.addClass("search-loading");
            if (request != null) request.abort();
            request = $.get(url + "&view=json", function(e) {
              $results.html(e);
              if(frontendData.enableCurrency) {
                currenciesCallbackSpecial('.autocomplete-suggestion span.money');
              }
              setTimeout(function() {
                form.removeClass("search-loading");
              }, 300)
            });
            $results.show(500);
          }
        })
        $( 'body' ).click( function() {
          $results.hide(), form.removeClass("search-loading");
        });
        $( '.shopify-search-results' ).click( function( e ) {
          e.stopPropagation();
        });
      });
    },
    newsletterPopupInit(newsletter){
      $('#popup_newsletter .subcriper_label input').on('click', function(){
        if($(this).parent().find('input:checked').length){
          SW.collection.createCookie('newsletterSubscribe', 'true', 1);
        }
        else {
          SW.collection.readCookie('newsletterSubscribe');
        }
      });
      $('#popup_newsletter .input-box button.button').on('click', function(){
        var button = $(this);
        setTimeout(function(){
          if(!button.parent().find('input#popup-newsletter').hasClass('validation-failed')){
            SW.collection.createCookie('newsletterSubscribe', 'true', 1);
          }
        }, 500);
      });
      if (SW.collection.readCookie('newsletterSubscribe') == null) {
        setTimeout(function(){
          var mpInstance = $.magnificPopup.instance;
          if (mpInstance.isOpen) {
            mpInstance.close();
            setTimeout(function() {
              $.magnificPopup.open({
                items: {
                  src: $('#popup_newsletter'),
                  type: 'inline'
                },
                removalDelay: 350,
                mainClass: 'mfp-smooth-fade',
                midClick: true,
                fixedBgPos: true
              });
            },360);
          }
          else {
            $.magnificPopup.open({
              items: {
                src: $('#popup_newsletter'),
                type: 'inline'
              },
              removalDelay: 350,
              mainClass: 'mfp-smooth-fade',
              midClick: true,
              fixedBgPos: true
            });
          }
        }, newsletterData.delay);
      }
    },
    translateBlock(blockSelector) {
      if (multi_language && translator.isLang2()) {
        translator.doTranslate(blockSelector);
      }
    },
    translateText(str) {
      if (!multi_language || str.indexOf("|") < 0)
        return str;

      if (multi_language) {
        var textArr = str.split("|");
        if (translator.isLang2())
          return textArr[1];
        return textArr[0];
      }
    },
    setVisualState(){
      'use strict';
      $('.smart_input').each(function() {
        'use strict';
        var $value = $(this).val();
        if ($(this).is(':checked')) {
          $(this).next().addClass("checked");
        }
        else {
          $(this).next().removeClass("checked");
        }
      });
    },
    parallaxInit() {
      $(window).stellar({
        responsive: true,
        scrollProperty: 'scroll',
        parallaxElements: false,
        horizontalScrolling: false,
        horizontalOffset: 0,
        verticalOffset: 0
      });
    },
    wordRotateInit() {
      $(".word-rotate").each(function() {
        var $this = $(this),
            itemsWrapper = $(this).find(".word-rotate-items"),
            items = itemsWrapper.find("> span"),
            firstItem = items.eq(0),
            itemHeight = firstItem.height(),
            currentItem = 1,
            currentTop = 0,
            itemWidth = firstItem.width();

        $this
          .height(itemHeight)
          .addClass("active");
        setInterval(function() {
          currentTop = (currentItem * itemHeight);
          itemWidth = items.eq(currentItem).width();
          itemsWrapper.animate({
            top: -(currentTop) + "px",
            width: itemWidth
          }, 300, function() {
            currentItem++;
            if(currentItem == items.length) {
              itemsWrapper.css("top", 0);
              currentItem = 1;
            }
          });
        }, 2000);
      });
    },
  };
  SW.collection = {
    init() {
      var wishlistCount = 0;
      var compareCount = 0;
      var compareItemhandles = getCookie("compareItems");
      if (compareItemhandles != "") {
        var compareArr = JSON.parse(compareItemhandles);
        compareCount = compareArr.length;
        if(compareCount > 0) {
          $('#header-compare .compareCount').html('('+compareCount+')');
        }
      }

      /*Get number of wishlist*/
      var handles = getCookie("wishlistItems");
      if (handles != "") {
        var wishlistArr = JSON.parse(handles);
        wishlistCount = wishlistArr.length;
        if(wishlistCount > 0) {
          $('#header-wishlist .wishlistCount').html('('+wishlistCount+')');
        }
      }

      SW.collection.checkWishlist();
      SW.collection.checkCompare();
      productGridSetup();

      if($('.product-deal .product-date').length > 0) {
        var productsDeal = $('.product-date');
        productsDeal.each(function(){
          SW.collection.productDealInit($(this));
        });
      }

      SW.collection.layoutSwitch();

      if (SW.collection.readCookie('products-listmode') != null) {
        SW.collection.layoutListInit();
      }

      $(document).on("click", ".close-box", function(){
        $(this).parents('.box-popup').removeClass('d-block');
      }) 

      $(document).on("click", ".btn-remove-cart", function(e) {
        if(cartData.ajax_cart_use == false ) return;
        e.preventDefault();
        SW.collection.removeCartInit($(this).data('id'));
      });

      $(document).on("click", ".filter-bar a", function(e) {
        e.preventDefault();
        if ($('.filter-option-group').is('.open')) {
          $('.filter-option-group').removeClass('open');
        }
        else {
          $('.filter-option-group').addClass('open');
        }
      });

      /*wishlist & compare*/
      $(document).on('click', '.link-wishlist',function (e) {
        e.preventDefault();
        $("#resultLoading").show();
        var productHandle = $(this).data('productHandle');

        Shopify.getProduct(productHandle, function(product) {
          var checkItemExist = false;
          var wishlistArr = [];
          var handles = getCookie("wishlistItems");

          if (handles != "") {
            var wishlistArr = JSON.parse(handles);
            wishlistCount = wishlistArr.length;
            $.each( wishlistArr, function( key, value ) {
              if(value == product.handle){
                checkItemExist = true;
                return false;
              }
            });
          }
          else {
            var wishlistArr = [product.handle];
            var json_str = JSON.stringify(wishlistArr);
            setCookie("wishlistItems", json_str);
            wishlistCount = 1;
          }

          if(checkItemExist) {
            if (isEmpty($('#wishlistTableList tbody'))) {
              SW.collection.genarate(wishlistArr);
              $('#wishlistCount').html('(' + wishlistCount + ')');
            }
            var alertTemplate = '<div class="message alert alert-warning">'+SW.page.translateText(product.title)+' '+wishlistData.item_exist+'</div>';
            $( "#wishlistAlert").html(alertTemplate);
          }
          else {
            if (handles != "") {
              wishlistArr.push(product.handle);
              var json_str = JSON.stringify(wishlistArr);
              setCookie("wishlistItems", json_str);
              wishlistCount = wishlistArr.length;
              if (isEmpty($('#wishlistTableList tbody'))) {
                SW.collection.genarate(wishlistArr);
              }
              else {
                SW.collection.genarate([product.handle]);
              }
            }
            else {
              SW.collection.genarate(wishlistArr);
            }

            $('#header-wishlist .wishlistCount').html('('+wishlistCount+')');
            $('#wishlistCount').html('(' + wishlistCount + ')');
            var alertTemplate = '<div class="message alert alert-success">'+SW.page.translateText(product.title)+' '+wishlistData.item_added+'</div>';
            $( "#wishlistAlert").html(alertTemplate);
            SW.collection.checkWishlist();
          }

          setTimeout(function() {
            $("#resultLoading").hide();
            $("#wishlistModal").modal("show");
          }, 700);

        });
      });

      $('#wishlistModal').on('hidden.bs.modal', function () {
        $('#opacity').removeClass('active');
      });

      $(document).on('click','#header-wishlist', function() {
        $("#resultLoading").show();

        if (isEmpty($('#wishlistTableList tbody'))) {
          var handles = getCookie("wishlistItems");
          if (handles != "") {
            var wishlistArr = JSON.parse(handles);
            SW.collection.genarate(wishlistArr);
            $('#wishlistCount').html('(' + wishlistCount + ')');

            setTimeout(function() {
              $("#resultLoading").hide();
              $("#wishlistModal").modal("show");
            }, 700);
          }
          else {
            $("#resultLoading").hide();
            $("#wishlistModal").modal("show");
            var alertTemplate = ' <p class="alert alert-warning"><span class="brackets">'+wishlistData.no_item+'</span></p>';
            $( "#wishlistAlert").html(alertTemplate);
          }
        }
        else {
          $('#wishlistTableList .cart-table').show();
          $("#resultLoading").hide();
          $("#wishlistModal").modal("show");
        }
      });

      $("#wishlistModal").on('change', 'select', function() {
        var productHandle = $(this).parents('form').data('handle');
        var $thisForm = $(this).parents('form');
        var optionArr = [];

        $thisForm.find('.selector-wrapper select').each(function() {
          var optionSelected = $(this).data('position');
          var valueSelected = this.value;
          optionArr.push(valueSelected);
        });

        Shopify.getProduct(productHandle, function(product) {
          $.each(product.variants, function( key, value ) {
            var checkGetId = false;
            $.each(optionArr, function( index, optionValue ) {
              if(optionArr[index] == value.options[index]) {
                checkGetId = true;
              }
              else {
                checkGetId = false;
                return false;
              }
            });

            if(checkGetId) {
              $thisForm.find("input[name='id']").val(value.id);
              return false;
            }
          });
        });
      });

      $("#compareBox").on('change', 'select', function() {
        var productHandle = $(this).parents('form').data('handle');
        var $thisForm = $(this).parents('form');
        var optionArr = [];

        $thisForm.find('.selector-wrapper select').each(function() {
          var optionSelected = $(this).data('position');
          var valueSelected = this.value;
          optionArr.push(valueSelected);
        });

        Shopify.getProduct(productHandle, function(product) {
          $.each(product.variants, function( key, value ) {
            var checkGetId = false;
            $.each(optionArr, function( index, optionValue ) {
              if(optionArr[index] == value.options[index]) {
                checkGetId = true;
              }
              else {
                checkGetId = false;
                return false;
              }
            });

            if(checkGetId) {
              $thisForm.find("input[name='id']").val(value.id);
              return false;
            }
          });
        });
      });

      $(document).on('click', '.link-compare', function () {
        $('#opacity').addClass('active');
        $("#resultLoading").show();;
        $('#compareTableList').show();
        var productHandle = $(this).data('productHandle');

        Shopify.getProduct(productHandle, function(product) {
          var checkItemExist = false;
          var compareArr = [];
          var handles = getCookie("compareItems");

          if (handles != "") {
            var compareArr = JSON.parse(handles);
            compareCount = compareArr.length;
            $.each( compareArr, function( key, value ) {
              if(value == product.handle){
                checkItemExist = true;
                return false;
              }
            });
          }
          else {
            var compareArr = [product.handle];
            var json_str = JSON.stringify(compareArr);
            setCookie("compareItems", json_str);
            compareCount = 1;
          }

          if(checkItemExist){
            if (!checkItemCompareExist()) {
              SW.collection.genarateCompareTable(compareArr);
              $('#compareCount').html('(' + compareCount + ')');
            }
            var alertTemplate = '<div class="message alert alert-warning">'+SW.page.translateText(product.title)+' '+compareData.item_exist+'</div>';
            $("#compareAlert").html(alertTemplate);
          }
          else {
            if (handles != "") {
              compareArr.push(product.handle);
              var json_str = JSON.stringify(compareArr);
              setCookie("compareItems", json_str);
              compareCount = compareArr.length;
              if (!checkItemCompareExist()) {
                SW.collection.genarateCompareTable(compareArr);
              }
              else {
                SW.collection.genarateCompareTable([product.handle]);
              }
            }
            else {
              SW.collection.genarateCompareTable(compareArr);
            }

            $('#header-compare .compareCount').html('('+compareCount+')');
            $('#compareCount').html('(' + compareCount + ')');
            var alertTemplate = '<div class="message alert alert-success">'+SW.page.translateText(product.title)+' '+compareData.item_added+'</div>';
            $( "#compareAlert").html(alertTemplate);
            SW.collection.checkCompare();
          }

          setTimeout(function() {
            $("#resultLoading").hide();
            $("#compareBox").modal("show");
          }, 700);
        });
      });

      $('#compareBox').on('hidden.bs.modal', function () {
        $('#opacity').removeClass('active');
      });

      $(document).on('click','#header-compare', function() {
        $("#resultLoading").show();
        if (!checkItemCompareExist()) {
          var handles = getCookie("compareItems");
          if (handles != "") {
            var compareArr = JSON.parse(handles);
            SW.collection.genarateCompareTable(compareArr);
            $('#compareCount').html('(' + compareCount + ')');

            setTimeout(function() {
              $("#resultLoading").hide();
              $("#compareBox").modal("show");
            }, 700);
          }
          else {
            var alertTemplate = ' <p class="alert alert-warning"><span class="brackets">'+compareData.no_item+'</span></p>';
            $( "#compareAlert").html(alertTemplate);
            $("#compareTableList").hide();
            $("#resultLoading").hide();
            $("#compareBox").modal("show");
          }
        }
        else {
          $("#resultLoading").hide();
          $("#compareBox").modal("show");
        }
      });

      $('#wishlistModal').on('click', '.add-cart-wishlist', function() {
        var quantity =  $(this).parents('tr').find('.quantity-selector').val();
        $(this).parents('tr').find('form').find("input[name='quantity']").val(quantity);
        $(this).parents('tr').find('.add-to-cart').click();
        $(this).parents('td').find('.remove-wishlist-form').click();
        $("#wishlistModal").modal("hide");
      });

      $('#compareBox').on('click', '.add-cart-compare', function() {
        var className = $(this).parent('td').attr('class');
        var quantity =  $(this).parents('td').find('.quantity-selector').val();
        $(this).parents('tr').prev().find('.'+className).find('form').find("input[name='quantity']").val(quantity);
        $(this).parents('tr').prev().find('.'+className).find('.add-to-cart').click();
        $(this).parents('tbody').find('.'+className).find('.btn-delete-compare').click();
        $("#compareBox").modal("hide");
      });

      $("[data-with-product]").each(function() {
        SW.collection.prevNextProductData($(this));
      });

      SW.collection.addToCart();
      SW.collection.quickViewInit();
      SW.collection.sidebarMenuInit();
      SW.collection.layerFilterInit();
      colorSwatchGrid();
      countDownInit();
      SW.collection.initInfiniteScrolling();
      SW.collection.sidebarInitToggle();
      SW.collection.sidebarCategoryInitToggle();
      qtyInit();
      if ($.fn.themeSticky) {
        setTimeout(() => {
          SW.collection.stickySidebar();
        }, 500);
      }
    },
    createCookie(name, value, days) {
      var expires;
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      }
      else {
        expires = "";
      }
      document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
    },
    readCookie(name) {
      var nameEQ = escape(name) + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
      }
      return null;
    },
    eraseCookie(name) {
      SW.collection.createCookie(name, "", -1);
    },
    animateItems(productsInstance) {
      productsInstance.find(".product").each(function(aj) {
        $(this).css('opacity', 1);
        $(this).addClass("item-animated");
        $(this).delay(aj * 200).animate({
          opacity: 1
        }, 500, "easeOutExpo", function() {
          $(this).addClass("item-animated");
        });
      });
    },
    layoutSwitch() {
      var isSwitchingLayout = false;
      $(document).on('click', 'span.layout-opt', function(e) {
        var products = $('#products-grid'),
            selectedLayout = $(this).data('layout');

        $('.toolbar .view-mode .layout-opt').removeClass('active');
        $(this).addClass('active');
        if(selectedLayout == 'list') {
          if (SW.collection.readCookie('products-listmode') == null) {
            SW.collection.createCookie('products-listmode', 1, 10);
          }
        }else{
          SW.collection.eraseCookie('products-listmode');
        }
        if (isSwitchingLayout) {
          return;
        }
        isSwitchingLayout = true;
        products.animate({
          'opacity': 0
        }, 300);
        setTimeout(function() {
          products.find('.product').removeClass('product-layout-list product-layout-grid');
          products.find('.product').addClass('product-layout-' + selectedLayout);
          if ( $('.products-grid').length > 0 ) {
            $('.products-grid').children().css('min-height','0');
          }
          productGridSetup();
          products.animate({
            'opacity': 1
          }, 200);
          isSwitchingLayout = false;
        }, 300);
        e.preventDefault();
      });
    },
    layoutListInit() {
      var products = $('#products-grid');
      products.css('opacity',0);
      $('.toolbar .view-mode span[data-layout="grid"]').removeClass('active');
      $('.toolbar .view-mode span[data-layout="list"]').addClass('active');
      products.find('.product').removeClass('product-layout-list product-layout-grid');
      products.find('.product').addClass('product-layout-list');
      setTimeout(function() {
        products.animate({
          'opacity': 1
        }, 200);
      }, 300);
    },
    productDealInit(productDeal) {
      var date = productDeal.data('date');
      if(date) {
        var config = {date: date};
        $.extend(config, countdown);
        $.extend(config, countdownConfig);
        if(countdownTemplate) {
          config.template = countdownTemplate;
        }
        productDeal.countdown(config);
      }
    },
    quickViewInit() {
      $(document).on("click", ".quickview", function(e) {
        e.preventDefault();
        var url = $(this).attr("href"),
            item = $(this);
        SW.collection.quickViewLoad(url, item);
      });
    },
    quickViewLoad(url, el) {
      $("#resultLoading").show();
      $.ajax({
        url: url,
        dataType: "html",
        type: "GET",
        success: function(data) {
          $.magnificPopup.open({
            items: {
              src: '<div class="popup-quick-view">' + data + '</div>', // can be a HTML string, jQuery object, or CSS selector
              type: 'inline'
            },
            mainClass: 'mfp-smooth-fade',
            removalDelay: 350,
            callbacks: {
              open: function() {
                $("#resultLoading").hide();
                SW.verticleScroll.init();
                if($('.carousel-init.owl-carousel').length > 0) {
                  var carousel = $('.carousel-init.owl-carousel');
                  carousel.each(function() {
                    carouselSlider($(this));
                  });
                }
                SW.productMediaManager.init();
                countDownInit();
                SW.page.translateBlock('.popup-quick-view');
                if(frontendData.enableCurrency) {
                  currenciesCallbackSpecial(".popup-quick-view span.money");
                }
                productReview();
                $('body').addClass("quickview-raised");
              },
              close: function() {
                $('body').removeClass("quickview-raised");
                $(".popup-quick-view").empty();
                $('.zoomContainer').remove();
                SW.productMediaManager.init();
              }
            },
          });
        },
        complete: function() {
          el.removeClass("loading");
          SW.productMediaManager.destroyZoom();
        },
        error: function() {
          console.log("Quick view error");
        }
      })
    },
    prevNextProductData(el) {
      var e = el.data("with-product"),
          t = el.find('script[type="text/template"]'),
          i = t.html();
      $.getJSON("/products/" + e + ".json", function(e) {
        var a = e.product;
        var r;
        i = i.replace(/#title#/g, SW.page.translateText(a.title));
        if(a.image) {
          r = a.image.src.lastIndexOf(".");
          i = i.replace(/\[img:([a-z]*)\]/gi, a.image.src.slice(0, r) + "_$1" + a.image.src.slice(r)), t.replaceWith(i);
        } else {
          i = i.replace(/\[img:([a-z]*)\]/gi, ''), t.replaceWith(i);
        }
      });
    },
    addToCart() {
      if(cartData.ajax_cart_use == false ) {
        return;
      }

      $(document).on("click", ".add-to-cart", function(e) {
        e.preventDefault();
        var a = $(this);
        var form = a.closest("form");
        return $.ajax({
          type: "POST",
          url: "/cart/add.js",
          async: !0,
          data: form.serialize(),
          dataType: "json",
          beforeSend: function() {
            if(a.parents('.item-area').length > 0) {
              a.parents('.item-area').find(".loader-container").show();
            }
            else {
              $("#resultLoading").show();
            }
          },
          error: function(t) {
            var box = $('#error-notice'),
                i = $.parseJSON(t.responseText);
            box.find(".heading").html(i.message);
            box.find(".message").html(i.description);

            setTimeout(function() {
              $(".loader-container").hide();
              $("#resultLoading").hide();
              box.addClass('d-block');

              setTimeout(function() {
                box.removeClass('d-block');
              }, 5e3);
            }, 500);
          },
          success: function(t) {
            Shopify.getCart(function(e) {
              var i = parseInt(form.find('input[name="quantity"]').val()),
                  box = $('#cart-box');

              box.find(".product-link").attr("href", t.url),
              box.find(".product-img").attr("src", Shopify.resizeImage(t.image, "medium")).attr("alt", SW.page.translateText(t.title)),
              box.find(".product-title .product-link").html(SW.page.translateText(t.title)),
              box.find(".product-price").html(Shopify.formatMoney(t.price, money_format)),
              frontendData.enableCurrency && currenciesCallbackSpecial("#cart-box span.money");

              $.get("/cart?view=json", function(e) {
                $(".cart-inner-content").html(e);
              }),$.getJSON("/cart.js", function(e) {
                $(".cart-total .cart-qty").html(e.item_count);
              });

              if(frontendData.enableCurrency) {
                currenciesCallbackSpecial('.cart-wrapper .cart-inner span.money');
                currenciesCallbackSpecial('.icon-cart-header span.money');
              }

              $.magnificPopup.close();

              setTimeout(function() {
                $(".loader-container").hide();
                $("#resultLoading").hide();

                if(cartData.shopping_cart_action == 'popup') {
                  box.addClass('d-block');
                  setTimeout(function() {
                    box.removeClass('d-block');
                  }, 5e3);
                }

                if(cartData.shopping_cart_action == 'widget') {
                  if($('.header-container').hasClass('sticky-header')){
                    $('.main-top-nav .mini-cart .cart-wrapper').fadeIn(200);
                  }
                  else {
                    $('.mini-cart .cart-wrapper').fadeIn(200);
                  }

                  timeoutNumber = setTimeout(function() {
                    $('.mini-cart .cart-wrapper').fadeOut(200);
                  }, 3500 );
                }
              }, 500);
            });
            return false;
          },
          cache: !1
        });
      });
    },

    removeCartInit(id,r) {
      if(cartData.ajax_cart_use == false ) {
        return;
      }

      $.ajax({
        type: 'POST',
        url: '/cart/change.js',
        data:  'quantity=0&id='+id,
        dataType: 'json',
        beforeSend: function() {
          $(".cartloading").show();
        },
        success: function(t) {
          $.get("/cart?view=json", function(e) {
            $(".cart-inner-content").html(e);
          }),$.getJSON("/cart.js", function(e) {
            $(".cart-total .cart-qty").html(e.item_count);
          });

          if(frontendData.enableCurrency) {
            currenciesCallbackSpecial('.cart-wrapper .cart-inner span.money');
            currenciesCallbackSpecial('.icon-cart-header span.money');
          }
          $(".cartloading").hide();
        },
        error: function(XMLHttpRequest, textStatus) {
          Shopify.onError(XMLHttpRequest, textStatus);
        }
      });
    },
    stickySidebar: function () {
      $(".sidebar .block-main-canvas, .sidebar-product .block-main-canvas").themeSticky({
        autoInit: true,
        minWidth: 992,
        containerSelector: '.row, .container',
        autoFit: true,
        paddingOffsetBottom: 10,
        paddingOffsetTop: 60
      });
    },
    sidebarMenuInit() {
      $("#mobile-menu, #categories_nav").mobileMenu({
        accordion: true,
        speed: 400,
        closedSign: 'collapse',
        openedSign: 'expand',
        mouseType: 0,
        easing: 'easeInOutQuad'
      });
    },
    sortbyFilter() {
      $(document).on("change", ".sort-by .field", function(e) {
        e.preventDefault();
        var t = $(this), i = t.val();
        Shopify.queryParams.sort_by = i;
        SW.collection.filterAjaxRequest();
      });
    },
    limitedAsFilter() {
      $(document).on("change", ".limited-view .field", function(e) {
        e.preventDefault();
        var t = $(this), i = t.val();
        Shopify.queryParams.view = i;
        SW.collection.filterAjaxRequest();
      });
    },
    swatchListFilter() {
      $(document).on("click", ".narrow-by-list .item:not(.disable), .advanced-filter .field:not(.disable)", function() {
        var e = $(this),
            t = e.find("input").val(),
            i = [];
        if (Shopify.queryParams.constraint && (i = Shopify.queryParams.constraint.split("+")), !e.hasClass("active")) {
          var a = e.parents(".layer-filter, .advanced-filter").find(".active");
          a.length > 0 && a.each(function() {
            var e = $(this).data("handle");
            if ($(this).removeClass("active"), e) {
              var t = i.indexOf(e);
              t >= 0 && i.splice(t, 1)
            }
          })
        }
        if (t) {
          var o = i.indexOf(t);
          0 > o ? (i.push(t), e.addClass("active")) : (i.splice(o, 1), e.removeClass("active"));
        }
        i.length ? Shopify.queryParams.constraint = i.join("+") : delete Shopify.queryParams.constraint, SW.collection.filterAjaxRequest();
      });
    },
    paginationActionInit() {
      $(document).on("click", ".pagination-page a", function(e) {
        var page = $(this).attr("href").match(/page=\d+/g);
        if (page) {
          Shopify.queryParams.page = parseInt(page[0].match(/\d+/g));
          if (Shopify.queryParams.page) {
            var newurl = SW.collection.filterCreateUrl();
            History.pushState({
              param: Shopify.queryParams
            }, newurl, newurl);
            SW.collection.filterGetContent(newurl);
          }
        }
        e.preventDefault();
      });
    },
    layerFilterInit() {
      SW.collection.sortbyFilter();
      SW.collection.limitedAsFilter();
      SW.collection.paginationActionInit();
      SW.collection.swatchListFilter();
      SW.collection.layerClearAllFilter();
      SW.collection.layerClearFilter();
    },
    filterCreateUrl(baseLink) {
      var newQuery = $.param(Shopify.queryParams).replace(/%2B/g, '+');
      if (baseLink) {
        //location.href = baseLink + "?" + newQuery;
        if (newQuery != "")
          return baseLink + "?" + newQuery;
        else
          return baseLink;
      }
      return location.pathname + "?" + newQuery;
    },
    filterAjaxRequest(baseLink) {
      delete Shopify.queryParams.page;
      var newurl = SW.collection.filterCreateUrl(baseLink);
      History.pushState({
        param: Shopify.queryParams
      }, newurl, newurl);
      SW.collection.filterGetContent(newurl);
    },
    filterGetContent(e) {
      $.ajax({
        type: "get",
        url: e,
        beforeSend: function() {
          $("#resultLoading").show();
        },
        success: function(t) {
          infinite_loaded_count = 0;
          var i = t.match("<title>(.*?)</title>")[1];
          $("#collection-main").empty().html($(t).find("#collection-main").html()),
            $(".narrow-by-list").empty().html($(t).find(".narrow-by-list").html()),
            $(".pagination").empty().html($(t).find(".pagination").html()),
            $(".main-breadcrumbs").empty().html($(t).find(".main-breadcrumbs").html()),
            History.pushState({
              param: Shopify.queryParams
            }, i, e),
            SW.collection.initInfiniteScrolling();
            setTimeout(function() {
            $("html,body").animate({
              scrollTop: $(".toolbar").offset().top
            }, 500);
          }, 100);

          $("#resultLoading").hide();
          if (SW.collection.readCookie('products-listmode') != null) {
            SW.collection.layoutListInit();
          }

          productGridSetup();
          SW.collection.layerClearFilter();
          SW.collection.layerClearAllFilter();
          colorSwatchGrid();
          SW.page.setVisualState();
          SW.collection.sidebarInitToggle();
          SW.page.translateBlock('.main-wrapper');
          productReview();
          frontendData.enableCurrency && currenciesCallbackSpecial(".products-grid span.money");
          SW.collection.checkWishlist();
          SW.collection.checkCompare();
          countDownInit();
        },
        error: function() {
          $("#resultLoading").hide();
        }
      });
    },
    sidebarInitToggle() {
      if ($(".sidebar-toogle").length > 0) {
        $(".sidebar-toogle .block-title span.collapse").click(function() {
          if ($(this).hasClass('click')) {
            $(this).removeClass('click');
            $(this).parent().removeClass('closed');
          }
          else {
            $(this).parent().addClass('closed');
            $(this).addClass('click');
          }
          $(this).parents(".sidebar-toogle").find(".sidebar-content").slideToggle();
        });
      }
    },
    sidebarCategoryInitToggle() {
      if ($(".sidebar-cate-toogle").length > 0) {
        $(".sidebar-cate-toogle .block-title span.collapse").click(function() {
          if ($(this).hasClass('click')) {
            $(this).removeClass('click');
            $(this).parent().removeClass('closed');
          }
          else {
            $(this).parent().addClass('closed');
            $(this).addClass('click');
          }
          $(this).parents(".sidebar-cate-toogle").find(".sidebar-content").slideToggle();
        });
      }
    },
    layerClearFilter() {
      $(".narrow-by-list .narrow-item").each(function() {
        var e = $(this);
        e.find("input:checked").length > 0 && e.find(".clear").click(function(t) {
          var i = [];
          Shopify.queryParams.constraint && (i = Shopify.queryParams.constraint.split("+")), e.find("input:checked").each(function() {
            var e = jQuery(this),
                t = e.val();
            if (t) {
              var a = i.indexOf(t);
              a >= 0 && i.splice(a, 1)
            }
          }), i.length ? Shopify.queryParams.constraint = i.join("+") : delete Shopify.queryParams.constraint, SW.collection.filterAjaxRequest(), t.preventDefault();
        })
      })
    },
    layerClearAllFilter() {
      $(document).on("click", ".narrow-by-list .clearall, .filter-option-inner .clearall", function(e) {
        e.preventDefault();
        delete Shopify.queryParams.constraint, delete Shopify.queryParams.q, SW.collection.filterAjaxRequest();
      })
    },
    initInfiniteScrolling() {
      $(window).scroll(function() {
        if ($('.infinite-loader').length > 0) {
          if($(window).scrollTop() >= $(".infinite-loader").offset().top-$(window).height()+100) {
            if(infiniteMode == "byscroll" && loading == false && noMoreProducts == false) {
              SW.collection.doInfiniteScrolling();
            }
          }
        }
      });

      if ($('.infinite-loader').length > 0) {
        $('.infinite-loader a').click(function(e) {
          e.preventDefault();
          if(loading == false && noMoreProducts == false) {
            SW.collection.doInfiniteScrolling();
          }
        });
      }
    },
    doInfiniteScrolling() {
      var currentList = $('#collection-main .products-grid');
      var products = $('#products-grid');

      if (currentList) {
        var loaderParent = $('.infinite-loader').first();
        var showMoreButton = $('.infinite-loader .btn-load-more').first();
        $.ajax({
          type: 'GET',
          url: loaderParent.data('getfrom'),
          beforeSend: function() {
            showMoreButton.text("Loading...");
            showMoreButton.show();
            loading = true;
          },
          success: function(data) {
            loading = false;
            var items = $(data).find('#collection-main .products-grid .item');
            if (items.length > 0) {
              products.append(items);
              SW.page.translateBlock("." + currentList.attr("class"));

              //get link of Show more
              if ($(data).find('.infinite-loader').length > 0) {
                loaderParent.data('getfrom', $(data).find('.infinite-loader').attr('data-getfrom'));
                if(infiniteMode == 'byscroll') {
                  showMoreButton.hide();
                }
                else {
                  showMoreButton.text('Load More...');
                }
              }
              else {
                //no more products
                noMoreProducts = true;
                showMoreButton.hide();
              }

              if (SW.collection.readCookie('products-listmode') != null) {
                SW.collection.layoutListInit();
              }

              productGridSetup();
              SW.collection.layerClearFilter();
              SW.collection.layerClearAllFilter();
              colorSwatchGrid();
              SW.page.setVisualState();
              frontendData.enableCurrency && currenciesCallbackSpecial(".products-grid span.money");
              productReview();
            }
          },
          error: function(xhr, text) {
            showMoreButton.hide();
            loading = false;
          },
          dataType: "html"
        });
      }
    },
    checkWishlist() {
      var productHandle = $('.product-options-bottom .link-wishlist').data('productHandle');
      var handles = getCookie("wishlistItems");
      if (handles != "") {
        var wishlistArr = JSON.parse(handles);
        $.each( wishlistArr, function( key, value ) {
          if(value == productHandle){
            $('.product-options-bottom .link-wishlist').addClass('active');
            return false;
          }
        });

        $(".category-products .link-wishlist").each(function() {
          var currentHandle = $(this).data("productHandle");
          if($.inArray(currentHandle, wishlistArr) > -1) {
            $(this).addClass('active');
          }
        });
      }
    },
    checkCompare() {
      var productHandle = $('.product-options-bottom .link-compare').data('productHandle');
      var handles = getCookie("compareItems");

      if (handles != "") {
        var compareArr = JSON.parse(handles);
        $.each(compareArr, function (key, value) {
          if (value == productHandle) {
            $('.product-options-bottom .link-compare').addClass('active');
            return false;
          }
        });

        $(".category-products .link-compare").each(function() {
          var currentHandle = $(this).data("productHandle");
          if($.inArray(currentHandle, compareArr) > -1) {
            $(this).addClass('active');
          }
        });
      }
    },
    genarate(wishlistArr) {
      var count = wishlistArr.length;
      $.each( wishlistArr, function( key, productHandle ) {
        Shopify.getProduct(productHandle, function(product) {
          var htmlOptionTemplate = '<form action="/cart/add" method="post" enctype="multipart/form-data" data-handle="'+product.handle+'">';
          var checkHideOption = false;

          if (typeof product.options !== 'undefined') {
            var countOptions = product.options.length;
            $.each( product.options, function( index, option ) {
              var optionClass = '';

              if(countOptions == 1 && option.name == 'Title'){
                checkHideOption = true;
              }

              if(option.name == 'Title') {
                optionClass = 'hide';
              }

              htmlOptionTemplate += '<div class="'+optionClass+' wishlistOption'+index+'">';
              htmlOptionTemplate += '<div class="selector-wrapper js product-form__item">';
              htmlOptionTemplate += '<label>'+option.name+'</label>';
              htmlOptionTemplate += '<select id="WishlistSingleOptionSelector-'+option.position+'" class="single-option-selector single-option-selector-wishlist product-form__input">';

              $.each( option.values, function( key, value ) {
                htmlOptionTemplate += '<option value="'+value+'">'+ value +'</option>';
              });
              htmlOptionTemplate += '</select></div></div>';
            });
            // $('#wishlistModalBody .product-options').show();
          }

          htmlOptionTemplate += '<input type="hidden" name="id" value="'+product.variants[0].id+'"> <input type="hidden" name="quantity" value="1"><button type="button" class="button btn-cart add-to-cart hide">Add cart hidden</button></form>';
          $('#wishlistModalBody .product-options-form').html(htmlOptionTemplate);
          if(product.compare_at_price > 0) {
            $('#wishlistModalBody .compare_at_price').html(Shopify.formatMoney(product.compare_at_price, money_format));
          }

          var htmlTemplate = $('#wishlistModalBody tbody').html();
          var html = '';
          var img = product.featured_image.lastIndexOf(".");
          html += htmlTemplate.replace(/#image#/g, product.featured_image.slice(0, img) + "_100x" + product.featured_image.slice(img))
            .replace(/#title#/g, SW.page.translateText(product.title))
            .replace(/#urlProduct#/g, product.url)
            .replace(/#handle#/g, product.handle)
            .replace(/#price#/g, Shopify.formatMoney(product.price, money_format));

          $("#wishlistTableList tbody").append(html);
          $('#wishlistTableList .cart-table').show();
          if(product.compare_at_price > 0) {
            $('#wishlistTableList .compare-price').show();
          }
        });
      });
    },
    genarateCompareTable(compareArr) {
      var count = compareArr.length;
      var countCurrentItem = $('#compareTableList table > tbody > tr:first-child > td').length;

      $.each( compareArr, function( key, productHandle ) {
        Shopify.getProduct(productHandle, function(product) {
          if (typeof product.options !== 'undefined') {
            var optionTemplate = ' <td class="compare-item-'+countCurrentItem+'"> <form action="/cart/add" method="post" enctype="multipart/form-data" data-handle="'+product.handle+'">';
            $.each( product.options, function( index, option ) {
              var optionClass = '';
              if(option.name == 'Title') {
                optionClass = 'hide';
              }
              optionTemplate += '<div class="selector-wrapper js product-form__item '+optionClass+'">';
              optionTemplate += '<label>'+option.name+'</label>';
              optionTemplate += '<select id="conpareSingleOptionSelector-'+option.position+'" data-position = "option'+option.position+'" class="single-option-selector single-option-selector-wishlist product-form__input">';
              $.each( option.values, function( key, value ) {
                optionTemplate += '<option value="'+value+'">'+ value +'</option>';
              });
              optionTemplate += '</select></div>';
            });
            optionTemplate += '<input type="hidden" name="id" value="'+product.variants[0].id+'"> <input type="hidden" name="quantity" value="1">';
            optionTemplate += '<button type="button" class="button btn-cart add-to-cart hide">Add cart hidden</button></form></td>';
          }

          var img = product.featured_image.lastIndexOf(".");
          var featuresTemplate = '<td class="compare-item-'+countCurrentItem+'">';
          if (frontendData.imageLazyLoad) {
            featuresTemplate += '<div class="product-image"><img data-src="'+product.featured_image.slice(0, img) + "_100x" + product.featured_image.slice(img)+'" class="lazyload"><a class="btn-delete-compare" data-product-title="'+SW.page.translateText(product.title)+'" data-product-handle="'+product.handle+'" href="javascript:void(0);" onclick="removeCompare(event)"><i aria-hidden="true" class="fa fa-trash"></i></a></div>';
          }
          else {
            featuresTemplate += '<div class="product-image"><img src="'+product.featured_image.slice(0, img) + "_100x" + product.featured_image.slice(img)+'"><a class="btn-delete-compare" data-product-title="'+SW.page.translateText(product.title)+'" data-product-handle="'+product.handle+'" href="javascript:void(0);" onclick="removeCompare(event)"><i aria-hidden="true" class="fa fa-trash"></i></a></div>';
          }
          featuresTemplate += '<span class="product-title">'+SW.page.translateText(product.title)+'</span>';
          featuresTemplate += '</td>';

          if(product.available) {
            var availabilityTemplate = '<td class="compare-item-'+countCurrentItem+'">';
            featuresTemplate += '<div class="product-shop-stock-avai"><p class="availability in-stock"><span><span class="brackets">'+obProductData.in_stock+'</span></span></p></div>';
            featuresTemplate += '</td>';
          }
          else {
            var availabilityTemplate = ' <td class="compare-item-'+countCurrentItem+'">';
              availabilityTemplate += '<div class="product-shop-stock-avai"><p class="availability in-stock"><span><span class="brackets">'+obProductData.out_of_stock+'</span></span></p></div>';
            availabilityTemplate += '</td>';
          }

          var addClassHide = '';
          if(product.compare_at_price <= 0 || !product.compare_at_price) {
            addClassHide = 'hide';
          }

          var priceTemplate = '<td class="compare-item-'+countCurrentItem+'">';
          priceTemplate += '<div class="product-shop-stock-price">';
          priceTemplate += '<div class="price">';
          priceTemplate += '<span class="special-price"><span class="price">'+Shopify.formatMoney(product.price, money_format)+'</span></span>';
          priceTemplate += '<span class="compare-price '+ addClassHide +'"><span class="price">'+Shopify.formatMoney(product.compare_at_price, money_format)+'</span></span>';
          priceTemplate += '</div>';
          priceTemplate += '</div>';
          priceTemplate += '</td>';

          var actionTemplate = '<td class="compare-item-'+countCurrentItem+'">';
          actionTemplate += '<div class="product-type-main product-view">';
          actionTemplate += '<div class="product-options-bottom">';
          actionTemplate += '<div class="add-to-cart-box">';
          actionTemplate += '<div class="input-box">';
          actionTemplate += '<input type="text" name="quantity" value="1" min="1" class="quantity-selector"> ';
          actionTemplate += '<div class="plus-minus">';
          actionTemplate += '<div class="increase items" onclick="setQuantityUp(event)"><i class="icon-up-dir"></i></div>';
          actionTemplate += '<div class="reduced items" onclick="setQuantityDown(event)"><i class="icon-down-dir"></i></div>';
          actionTemplate += '</div>';
          actionTemplate += '</div>';
          actionTemplate += ' </div>';
          actionTemplate += '</div>';
          actionTemplate += '</div>';

          if(product.available) {
            actionTemplate += '<a href="javascript:void(0);" class="add-cart-compare btn-button">'+obProductData.add_to_cart+'</a></td>';
          }
          else {
            actionTemplate += '<span class="btn-button">'+obProductData.sold_out+'</span>';
          }

          $("#compareTableList table tbody tr:first-child").append(featuresTemplate);
          $("#compareTableList table tbody tr:nth-child(2)").append(availabilityTemplate);
          $("#compareTableList table tbody tr:nth-child(3)").append(priceTemplate);
          $("#compareTableList table tbody tr:nth-child(4)").append(optionTemplate);
          $("#compareTableList table tbody tr:nth-child(5)").append(actionTemplate);
          ++countCurrentItem;
        });
      });
    },
  };
  SW.productMediaManager = {
    destroyZoom() {
      $('.zoomContainer').remove();
      $('.product-image-gallery .gallery-image').removeData('elevateZoom');
    },
    init() {
      if(dataZoom.position == 'inside') {
        var zoomConfig = {gallery:'more-slides',zoomType: "inner",cursor: 'pointer',scrollZoom: false};
      }
      else {
        var zoomConfig = {gallery:'more-slides',cursor: 'pointer',scrollZoom: false,zoomWindowFadeIn: 500,zoomWindowFadeOut: 500,lensFadeIn: 500,lensFadeOut: 500,borderSize: 3,lensBorderSize: 2,lensBorderColour: "#999",borderColour: "#ddd"};
      }

      var zoomImage = $('#product-featured-image');
      var imageGallery = $('.product-image-gallery');
      imageGallery.addClass('loading');
      imagesLoaded(zoomImage, function() {
        if(!isMobileAlt) {
          zoomImage.elevateZoom(zoomConfig);
        }
        imageGallery.removeClass('loading');
      });

      $(document).on('mouseenter','#more-slides a', function() {
        var targetImage = $(this).closest('.product-img-list').find('#product-featured-image');
        if (targetImage.attr('src') != $(this).data('image')) {
          $('.zoomContainer').remove();
          targetImage.removeData('elevateZoom');
          targetImage.attr('src', $(this).data('image'));
          targetImage.data('zoom-image', $(this).data('zoom-image'));
          imageGallery.addClass('loading');
          imagesLoaded(targetImage, function() {
            if(!isMobileAlt) {
              targetImage.elevateZoom(zoomConfig);
            }
            imageGallery.removeClass('loading');
          });
        }
      });

      if(dataZoom.lightbox && !isMobileAlt) {
        $("#product-featured-image, .product-image-gallery .icon-zoom").bind("click", function(e) {
          var ez = $('#product-featured-image').data('elevateZoom');
          $.fancybox(ez.getGalleryList());
          return false;
        });
      }
    },
  };
  SW.verticleScroll = {
    init() {
      if($('.product-img-box .vertical-carousel').length > 0) {
        var carousel = $('.product-img-box .vertical-carousel');
        SW.verticleScroll.carouselInit(carousel);
      }
    },
    carouselInit(carousel) {
      var count = carousel.find('a').length;
      if (count <= 3) {
        carousel.parents('.more-views-vertical').find('.more-views-nav').hide();
      }

      $(".product-img-box #carousel-up").on("click", function () {
        if (!$(".product-img-box .vertical-carousel").is(':animated')) {
          var bottom = $(".product-img-box .vertical-carousel > a:last-child");
          var clone = $(".product-img-box .vertical-carousel > a:last-child").clone();
          clone.prependTo(".product-img-box .vertical-carousel");
          $(".product-img-box .vertical-carousel").animate({
            "top": "-=85"
          }, 0).stop().animate({
            "top": '+=85'
          }, 250, function () {
            bottom.remove();
          });
        }
      });

      $(".product-img-box #carousel-down").on("click", function () {
        if (!$(".product-img-box .vertical-carousel").is(':animated')) {
          var top = $(".product-img-box .vertical-carousel > a:first-child");
          var clone = $(".product-img-box .vertical-carousel > a:first-child").clone();
          clone.appendTo(".product-img-box .vertical-carousel");
          $(".product-img-box .vertical-carousel").animate({
            "top": '-=85'
          }, 250, function () {
            top.remove();
            $(".product-img-box .vertical-carousel").animate({
              "top": "+=85"
            }, 0);
          });
        }
      });
    },
  };

  SW.footer = {
    init() {
      SW.footer.backToTopInit();
    },
    backToTopInit() {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
          $('#back-top').fadeIn();
        }
        else {
          $('#back-top').fadeOut();
        }
      });

      $('#back-top a').click(function () {
        $('body,html').animate({
          scrollTop: 0
        }, 800);
        return false;
      });
    },
  };
  SW.onReady = {
    init() {
      SW.megamenu.init();
      SW.page.init();
      SW.collection.init();
      SW.footer.init();
      SW.verticleScroll.init();
      SW.productMediaManager.init();
    },
  };
  SW.onLoad = {
    init() {
    },
  };
  $(document).ready(() => {
    SW.onReady.init();
  });
  $(window).load(() => {
    SW.onLoad.init();
  });
}(jQuery));
