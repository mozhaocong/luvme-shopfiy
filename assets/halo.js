(function ($) {
    var body = $('body'),
        doc = $(document),
        html = $('html'),
        win = $(window),
        wrapperOverlaySlt = '.wrapper-overlay',
        iconNav,
        dropdownCart,
        miniProductList;
  
    var sidebarCart = $('#sidebar-cart'),
        btnRemove = sidebarCart.find('.btn-remove'),
        sidebarCartNoItems = sidebarCart.find('.cart-empty'),
        sidebarCartHasItems = sidebarCart.find('.mini-products-list'),
        sidebarCartFooter = sidebarCart.find('.cart-footer');

    var wishListsArr = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    var compareArr = localStorage.getItem('compareArr') ? JSON.parse(localStorage.getItem('compareArr')) : [];

    localStorage.setItem('items', JSON.stringify(wishListsArr));
    localStorage.setItem('compareArr', JSON.stringify(compareArr));

    if (wishListsArr.length) {
        wishListsArr = JSON.parse(localStorage.getItem('items'));
    };

    if (compareArr.length) {
        compareArr = JSON.parse(localStorage.getItem('compareArr'));
    };

    doc.ready(function () {
        iconNav = $('[data-menu-mb-toogle]'),
        dropdownCart = $('#dropdown-cart'),
        miniProductList = dropdownCart.find('.mini-products-list');

        doc.ajaxStart(function () {
            ella.isAjaxLoading = true;
        });

        doc.ajaxStop(function () {
            ella.isAjaxLoading = false;
        });

        ella.init();
    });

    var winWidth = win.innerWidth();

    win.off('resize.initMenuMobile').on('resize.initMenuMobile', function() {
        var resizeTimerId;

        clearTimeout(resizeTimerId);

        resizeTimerId = setTimeout(function() {
            var curWinWidth = win.innerWidth();

            if ((curWinWidth < 1200 && winWidth >= 1200) || (curWinWidth >= 1200 && winWidth < 1200)) {
                // ella.showHideMenuMobile();
                // ella.initToggleMuiltiLangCurrency();
                // ella.addTextMuiltiOptionActive($('#lang-switcher'), $('#lang-switcher [data-value].active'), $('[data-language-label]'));
                // ella.addTextMuiltiOptionActive($('#currencies'), $('#currencies [data-currency].active'), $('[data-currency-label]'));
                // ella.initDropdownColFooter();
                // ella.dropdownCart();
                // ella.dropdownCustomer();

                // ella.stickyFixedTopMenu();
            };
            winWidth = curWinWidth;
        }, 0);
    });
    var ella = {
        ellaTimeout: null,
        isSidebarAjaxClick: false,
        isAjaxLoading: false,
        init: function () {
            this.initCountdownNormal();
        },

        initCountdownNormal: function () {
            var countdownElm = $('[data-countdown-normal]');
            countdownElm.each(function () {
                var self = $(this),
                    countdownValue = self.data('countdown-value');

                if(self.hasClass('countdown-suppermarket')) {
                    if(window.product_style == 'supermarket') {
                        self.countdown(countdownValue, function (event) {
                            $(this).html(event.strftime('' +
                                '<div class="clock-item"><span class="num">%D</span><span>:</span></div>' +
                                '<div class="clock-item"><span class="num">%H</span><span>:</span></div>' +
                                '<div class="clock-item"><span class="num">%M</span><span>:</span></div>' +
                                '<div class="clock-item"><span class="num">%S</span></div>'));
                        });
                    } else {
                        self.countdown(countdownValue, function (event) {
                            $(this).html(event.strftime('' +
                                '<div class="clock-item day"><span class="num">%D<span>d</span></span></div>' +
                                '<div class="clock-item"><span class="num">%H</span>:</div>' +
                                '<div class="clock-item"><span class="num">%M</span>:</div>' +
                                '<div class="clock-item"><span class="num">%S</span></div>'));
                        });
                    }
                }
                else if(window.product_style == 'supermarket') {
                    self.countdown(countdownValue, function (event) {
                        $(this).html(event.strftime('' +
                            '<div class="clock-item"><span class="num">%D</span><span> days</span></div>' +
                            '<div class="clock-item"><span class="num">%H</span>&nbsp;:</div>' +
                            '<div class="clock-item"><span class="num">%M</span>&nbsp;:</div>' +
                            '<div class="clock-item"><span class="num">%S</span></div>'));
                    });
                } 
                else {
                    self.countdown(countdownValue, function (event) {
                        $(this).html(event.strftime('' +
                            '<div class="clock-item"><span class="num">%D</span><span>D</span>:</div>' +
                            '<div class="clock-item"><span class="num">%H</span><span>H</span>:</div>' +
                            '<div class="clock-item"><span class="num">%M</span><span>M</span>:</div>' +
                            '<div class="clock-item"><span class="num">%S</span><span>S</span></div>'));
                    });
                }
            });
        },

    };

})(jQuery);
