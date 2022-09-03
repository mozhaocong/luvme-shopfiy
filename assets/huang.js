  // 3
  $('.show-search-link').click(function(){
      window.dataLayer.push({
        'event': 'uaEvent',
        'event_type': 'top_function',
        'event_label': 'search',
     })
  })
  //101
  $('.logo-list__logo').click(function() {
    var logo_name = $('.rimage__image').attr('alt')
    var logo_link = $(this).attr('href')
     window.dataLayer.push({
        'event': 'uaEvent',
        'event_type': 'logo_entrance',
        'eventLabel': 'logo',
        'logo_name':logo_name,
        'logo_link':logo_link,
     })
  })
  //88
  $('.overlay-text__button').click(function(){
    var promotion_name = ''
    if(screen.width < 768){
      promotion_name = $(this).parent().parent().parent().parent().parent().find('.rimage-outer-wrapper').find('.mobile_alt_title').text()
    }else{
      promotion_name = $(this).parent().parent().parent().parent().parent().find('.rimage-outer-wrapper').find('.alt_title').text()
    }
    if($(this).prop('tagName') == "A"){
      var creative_slot = $(this).text()
      var creative_name = $(this).attr('href')
      window.dataLayer.push({
        'event': 'eeEvent',
        'event_type': 'select_promotion',
        'ecommerce':{
          'items':[{
            'promotion_name':promotion_name,
            'creative_name':'https://shop.luvmehair.com' + creative_name,
            'creative_slot':'button_' + creative_slot,
          }]
        }
     })
    }else{
      var creative_slot = $(this).text()
      var creative_name = $('.alter_image').attr('href')
      window.dataLayer.push({
        'event': 'eeEvent',
        'event_type': 'select_promotion',
        'ecommerce':{
          'items':[{
            'promotion_name':promotion_name,
            'creative_name':'https://shop.luvmehair.com' + creative_name,
            'creative_slot':'button_' + creative_slot,
          }]
        }
     })
    }
  })
  //87
  // $('.alt_over_list').click(function(){
  //   var promotion_name = ''
  //   if(screen.width < 768){
  //     promotion_name = $(this).parent().find('.rimage-outer-wrapper').find('.mobile_alt_title').text()
  //   }else{
  //     promotion_name = $(this).parent().find('.rimage-outer-wrapper').find('.alt_title').text()
  //   }
  //   if($(this).parent().prop('tagName') == "A"){
  //     var creative_name = $(this).parent().attr('href')
  //     window.dataLayer.push({
  //       'event': 'eeEvent',
  //       'event_type': 'select_promotion',
  //       'ecommerce':{
  //          'items':[{
  //             'promotion_name':promotion_name,
  //             'creative_name':'https://shop.luvmehair.com' + creative_name,
  //             'creative_slot':'image',
  //         }]
  //       }
  //    })
  //   }else{
  //     window.dataLayer.push({
  //       'event': 'eeEvent',
  //       'event_type': 'select_promotion',
  //       'ecommerce':{
  //          'items':[{
  //             'promotion_name':promotion_name,
  //             'creative_name':'',
  //             'creative_slot':'image',
  //           }]
  //       }
  //    })
  //   } 
    
  // })
  //87
  $('.img_alt_but .alt_back_image').click(function(){
      var promotion_name = ''
      if(screen.width < 768){
        promotion_name = $(this).find('.rimage-outer-wrapper').find('.mobile_alt_title').text()
      }else{
        promotion_name = $(this).find('.rimage-outer-wrapper').find('.alt_title').text()
      }
      if($(this).parent().prop('tagName') == "A"){
        var creative_name = $(this).attr('href')
        window.dataLayer.push({
          'event': 'eeEvent',
          'event_type': 'select_promotion',
          'ecommerce':{
             'items':[{
                'promotion_name':promotion_name,
                'creative_name':'https://shop.luvmehair.com' + creative_name,
                'creative_slot':'image',
              }]
          }
        })
      }else{
        window.dataLayer.push({
          'event': 'eeEvent',
          'event_type': 'select_promotion',
          'ecommerce':{
             'items':[{
                'promotion_name':promotion_name,
                'creative_name':'',
                'creative_slot':'image',
              }]
          }
        })
      }
      
  })
  
  // 19
  $('.opposing-items .btn').click(function(){ 
    var user_email = $('#login_email #customer_email').val()
    var aseKey = "ABCD1234"//秘钥必须为：8/16/32位
    var userEmail = CryptoJS.AES.encrypt(user_email.toString(), CryptoJS.enc.Utf8.parse(aseKey), {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
    }).toString();
    localStorage.setItem('userEmail', userEmail)
    localStorage.setItem('userList', 'userlist')
  })
  //22
  // $('.action_bottom .btn').click(function(){
    
  // })










