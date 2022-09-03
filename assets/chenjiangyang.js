// header.liquid - 点击查看购物车
$('.hete-shopping-cart').click(function(){
  dataLayer.push({
    'event': 'uaEvent',
    'event_type': 'top_function',
    'event_label': 'cart',
 })
})

// header.liquid - 点击Mobil web导航展开导航列表
$('.hete-mobile-nav-toggle').click(function(){
  dataLayer.push({
    'event': 'uaEvent',
    'event_type': 'top_function',
    'event_label': 'expand',
 })
})

// header.liquid - 点击个人中心图标触发
$('.hete-personal-center').click(function(){
  dataLayer.push({
    'event': 'uaEvent',
    'event_type': 'top_function',
    'event_label': 'account',
 })
})

// header.liquid - 点击logo触发
$('.hete-logo-area').click(function(){
  dataLayer.push({
    'event': 'uaEvent',
    'event_type': 'top_function',
    'event_label': 'logo',
 })
})

// main-nav-links.liquid - 点击导航栏的一级导航
function titleClick(params, e) {
  console.log('titleClick', e)
  dataLayer.push({
    'event': 'uaEvent',
    'event_type': 'top_navigation',
    'first_navigation': params,
 })
console.log('点击导航栏的一级导航',params)
}

// main-nav-links.liquid - 点击导航栏的二级
function secondTitleClick(first,second) {
dataLayer.push({
    'event': 'uaEvent',
    'event_type': 'top_navigation',
    'first_navigation': first,
    'second_navigation': second,
 })
console.log('击导航栏的二级',first,second)
}

// main-nav-links.liquid - 点击导航栏的三级
function thirdTitleClick(first,second,third) {
dataLayer.push({
    'event': 'uaEvent',
    'event_type': 'top_navigation',
    'first_navigation': first,
    'second_navigation': second,
    'third_navigation': third,
 })
console.log('击导航栏的三级',first,second,third)
}

// responsive-image.liquid - 导航图片点击
function imageWrapper(val,val1) {
 dataLayer.push({ ecommerce: null });
 dataLayer.push({
   'event': 'eeEvent',
   'event_type': 'select_promotion',
   'ecommerce':{
     'items':[
       {
         'creative_slot': $(val1).parents('.navigation__child-tier').siblings('.hete-title-link').text(),
         'promotion_name': $(val1).find('.hete-image-src').attr('alt'),
         'creative_name': window.location.origin + val,
       }
     ]
   }
})
// console.log(val,val1,$(val1).find('.hete-image-src').attr('alt'),$(val1).parents('.navigation__child-tier').siblings('.hete-title-link').text())
}



// social-icons.liquid - 点击顶部的社媒渠道图标
$('.announcement-bar__left').find('.hete-settings').click(function(){
  dataLayer.push({
    'event': 'uaEvent',
    'event_type': 'top_function',
    'event_label': $(this).attr('aria-label'),
 })
// console.log($(this).attr('aria-label'))
})

// header.liquid - 在输入框输入搜索词 - 监听输入关键字和检索关键字
function blurSearchInput(params) {
var text = $(".hete-search-input").val()
var str = ''
  if( text !== '' ){
    if( text.includes('@') ){
      var aseKey = "ABCD1234"//秘钥必须为：8/16/32位
      str = CryptoJS.AES.encrypt(text.toString(), CryptoJS.enc.Utf8.parse(aseKey), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
      }).toString();
    } else {
      str = text
    }
    dataLayer.push({
        'event': 'uaEvent',
        'event_type': 'search_input',
        'search_term': str,
    })
    dataLayer.push({ ecommerce: null });
    dataLayer.push({
        'event': 'uaEvent',
        'event_type': 'search',
        'ecommerce':{
          'search_term': str,
        }
    })
    // console.log(str)
  }
}

// header.liquid - 点击检索图标 - 监听输入关键字
$('.hete-search-button').click(function(){
  var text = $(".hete-search-input").val()
  var str = ''
  if( text.includes('@') ){
    var aseKey = "ABCD1234"//秘钥必须为：8/16/32位
    str = CryptoJS.AES.encrypt(text.toString(), CryptoJS.enc.Utf8.parse(aseKey), {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
    }).toString();
  } else {
    str = text
  }
  dataLayer.push({ ecommerce: null });
  dataLayer.push({
      'event': 'uaEvent',
      'event_type': 'search',
      'ecommerce':{
        'search_term': str,
      }
   })
// console.log(str)
})

// theme.js - 6152行 - 在检索后的产品列表,下方点击全部产品按钮时触发
function heteAllSearchInput(params) {
  var text = $(".hete-search-input").val()
  var str = ''
  if( text.includes('@') ){
    var aseKey = "ABCD1234"//秘钥必须为：8/16/32位
    str = CryptoJS.AES.encrypt(text.toString(), CryptoJS.enc.Utf8.parse(aseKey), {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
    }).toString();
  } else {
    str = text
  }
  dataLayer.push({ ecommerce: null });
  dataLayer.push({
      'event': 'uaEvent',
      'event_type': 'search',
      'ecommerce':{
        'search_term': str,
        'event_label': 'allSearch',
      }
   })
// console.log(111,$(".hete-search-input").val())
}

// header.liquid - 点击底部导航时触发
$('.hete-wrap-title').click(function(){
  dataLayer.push({
      'event': 'uaEvent',
      'event_type': 'bottom_navigation',
      'event_label': $(this).text(),
   })
// console.log($(this).text())
})

// header.liquid - 点击底部的社媒渠道图标
$('.section-footer__text-block__social').find('.hete-settings').click(function(){
  dataLayer.push({
    'event': 'uaEvent',
    'event_type': 'bottom_function',
    'event_label': $(this).attr('aria-label'),
 })
// console.log($(this).attr('aria-label'))
})

// home-custom-block-text.liquid - Custom Block Text组件，文字模块点击
function featureTitle(url,text){
  dataLayer.push({
    'event': 'uaEvent',
    'event_type': 'collection_entrance',
    'event_label': text,
    'creative_name': window.location.origin + url,
  })
  // console.log(url,text)
}

// home-custom-block-text-tow.liquid - Custom Block Text组件，文字模块点击
$('.hete-custom-block-text-row').click(function(){
  dataLayer.push({
    'event': 'uaEvent',
    'event_type': 'words_entrance',
    'event_label': $(this).find('.hete-span-text').text(),
    'creative_name': window.location.origin + $(this).attr('href'),
 })
// console.log($(this).find('.hete-span-text').text(),$(this).attr('href'))
})

// price-range.liquid -  集合列表 - 1、勾选筛选项 2、输入价格（输入框失焦时触发）
function priceBlur(params) {
  // faceted-filters.liquid - 获取以选择的查询条件列表
  var x = $('.hete-grop_applied-item')
  var arr = []
  for (var i = x.length - 1; i >= 0; i--) {
      arr[i] = x[i].innerText
  }
 dataLayer.push({
    'event': 'uaEvent',
    'event_type': 'product_filter',
    'filter_type': 'Price',
    'event_label': $('.hete-price-min').val()+','+$('.hete-price-max').val(),
    'applied_filters': arr.join(','),
 })
// console.log($('.hete-price-min').val()+','+$('.hete-price-max').val(),arr.join(','))
}

// faceted-filters.liquid -  集合列表 - 勾选筛选项 
function checkboxSelect(val) {
if( val.checked ){ // 选中状态
  // faceted-filters.liquid - 获取以选择的查询条件列表
  var x = $('.hete-grop_applied-item')
  var arr = []
  for (var i = x.length - 1; i >= 0; i--) {
      arr[i] = x[i].innerText
  }
 dataLayer.push({
    'event': 'uaEvent',
    'event_type': 'product_filter',
    'filter_type': 'product_type',
    'event_label': $(val).next('.hete-group-text').text(),
    'applied_filters': arr.join(','),
 })
}
// console.log($(val).next('.hete-group-text').text(), val.checked)
}

// product-block.liquid - Featured collection模块的view all按钮点击
function productLink(url, text) {
dataLayer.push({
   'event': 'uaEvent',
   'event_type': 'collection_entrance',
   'event_label': text + '_View All',
   'creative_name': window.location.origin + url,
})
// console.log(url, text)
}

// console.log(window.performance.navigation)

// 创建用户成功以后 - 只在首页触发 - home-custom-block-text-tow.liquid
$('.hete-Function-bottom .hete-btn-submit').click(function(){ 
var user_email = $('.input-row .hete-email-row').val()
var aseKey = "ABCD1234"//秘钥必须为：8/16/32位
var userEmail = CryptoJS.AES.encrypt(user_email.toString(), CryptoJS.enc.Utf8.parse(aseKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
}).toString();
localStorage.setItem('createUserEmail', userEmail)
localStorage.setItem('userList', 'userlist')
})

// account.liquid 退出登录
function log_out(){
  dataLayer.push({
    'event': 'uaEvent',
    'event_type': 'log_out',
  })
}

function test(title) {
console.log(title)
}






























