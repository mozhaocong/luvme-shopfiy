window.onload = function(){
    let uuid = 0
    function initUuid() {
        uuid++
        return uuid
    }
    const finishClickList = []
    // 防止重复点击
    function repeatClick(id) {
        if (finishClickList.includes(id)) {
            return true
        } else {
            finishClickList.push(id)
            return false
        }
    }
    console.log('checkout-buried')
    setTimeout(() => {
        let isCheckoutCLick = false
        let checkData = {
            tagsList: [],
            value: ''
        }
        function initCheckoutClick() {
            const sidebarContentForm = document.querySelector(".sidebar__content")
            const checkoutSubmit = sidebarContentForm.querySelector("#checkout_submit")
            checkoutSubmit?.addEventListener('click', () => {
                console.log('click click click')
                const value = document.querySelector('#checkout_reduction_code').value
                const tagsList = document.querySelectorAll('.sidebar__content .tags-list .tag')
                isCheckoutCLick = true
                checkData = {
                    tagsList,
                    value
                }
            })
            sidebarContentForm.querySelectorAll('.tags-list .tag')?.forEach(item => {
                const uuidA = initUuid()
                item?.querySelector('.tag__button')?.addEventListener('click', (e) => {
                    if (repeatClick(uuidA)) return
                    const type = item.querySelector('.reduction-code__icon use')?.href?.baseVal
                    let event_label = ''
                    if(type === '#tags-filled') {
                        event_label = item.querySelector('.reduction-code__text').innerText
                        event_label = `$coupon-${event_label}`
                    } else if(type === '#gift-filled') {
                        event_label = item.querySelector('.reduction-code').innerText
                        event_label = `$giftcard-${event_label.substr(-4)}`
                    }

                    const buriedData = {
                        event: 'uaEvent',
                        event_type: 'delete_discount',
                        event_label: event_label,
                    }
                    console.log('delete_discount', buriedData)
                    dataLayer.push(buriedData)
                })
            })
        }
        function initDOMNodeInserted() {
            var container = document.querySelector(".order-summary__sections")
            let DOMNodeInsertedTimeout = 0
            container?.addEventListener('DOMNodeInserted', function () {
                clearTimeout(DOMNodeInsertedTimeout)
                DOMNodeInsertedTimeout  = setTimeout(() => {
                    discountApplyBuried()
                    initCheckoutClick()
                }, 1000)
            }, false);
        }
        function discountApplyBuried() {
            if(!isCheckoutCLick) return
            isCheckoutCLick = false
            const tagsList = document.querySelectorAll('.sidebar__content .tags-list .tag')
            const error = document.querySelector('.sidebar__content .field__message.field__message--error')?.innerText
            console.log('tagsList', checkData, tagsList,  error)
            const buriedData = {
                event: 'uaEvent',
                event_type: 'discount_apply',
                event_label: checkData.value,
                status: ''
            }
            if(error) {
                buriedData.status = error
            } else if(tagsList.length !== checkData.tagsList.length) {
                buriedData.status = 'success'
            } else {
                return
            }
            console.log('discountApplyBuried', buriedData)
            dataLayer.push(buriedData)

        }
        initCheckoutClick()
        initDOMNodeInserted()

        document.querySelector('#checkout_email')?.addEventListener('blur',(e) => {
            const buriedData = {
                event: 'uaEvent',
                event_type: 'input_email',
                input_detail: e?.target?.value || '',
            }
            console.log('checkout_email_69', buriedData)
            dataLayer.push(buriedData)
        })


        document.querySelector('.step__sections .section--contact-information .layout-flex__item a')?.addEventListener('click', () => {
            const buriedData = {
                event: 'uaEvent',
                event_type: 'Log In',
            }
            console.log('Log_In_70', buriedData)
            dataLayer.push(buriedData)
        })

        document.querySelector('.logged-in-customer-information__paragraph')?.addEventListener('click', () => {
            const buriedData = {
                event: 'uaEvent',
                event_type: 'logout_button',
            }
            console.log('logout_button71', buriedData)
            dataLayer.push(buriedData)
        })


        let rememberMeTime = 0
        document.querySelector('#checkout_remember_me')?.addEventListener('change', (e) => {
            clearTimeout(rememberMeTime)
            rememberMeTime = setTimeout(() => {
                console.log('e', e.target.checked)
                const buriedData = {
                    event: 'uaEvent',
                    event_type: 'save_information',
                    event_label: '$checkboxState' + (e.target.checked ? 'On' : 'Off')
                }
                console.log('save_information72', buriedData)
                dataLayer.push(buriedData)
            }, 100)
        })



        const modifyInformationDom = document.querySelectorAll('.content-box__row.content-box__row--tight-spacing-vertical .review-block') || []
        modifyInformationDom.forEach(item => {
            item.querySelector('a').addEventListener('click', () => {
                const buriedData = {
                    event: 'uaEvent',
                    event_type: 'modify_information',
                    event_label: item.querySelector('.review-block__label')?.innerText || ''
                }
                console.log('modify_information76', buriedData)
                dataLayer.push(buriedData)
            })
        })


        const paymentMethodList = document.querySelectorAll('.section--payment-method .radio-wrapper.content-box__row') || []
        paymentMethodList.forEach((item, index) => {
            item.addEventListener('click', () => {
                const buriedData = {
                    event: 'uaEvent',
                    event_type: 'change_payment_method',
                    event_label: item.querySelector('.radio__label label')?.innerText || ''
                }
                console.log('change_payment_method80', buriedData)
                dataLayer.push(buriedData)
            })

        })



        const datatata = document.querySelectorAll('.section--billing-address input') || []
        datatata.forEach(item => {
            if(!['tel', 'text'].includes(item.type)) return
            item.addEventListener('blur', () => {
                const buriedData = {
                    event: 'uaEvent',
                    event_type: 'input_billing_address',
                    event_label: item.placeholder,
                    input: item.value || ''
                }
                console.log('input_billing_address', buriedData)
                dataLayer.push(buriedData)
            })
        })
    }, 100)
}