;(function ($) {
	console.log('mozhaocong buried')
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

	function initViewPromotion89() {
		const viewPromotion89 = document.querySelectorAll('.section-image-with-text-overlay')

		function setBuriedViewPromotion89(data = []) {
			const items = []
			data.forEach((item) => {
				const { buriedAlt = '', buriedSrc = '' } = item.querySelector(
					'.rimage-outer-wrapper.rimage-background',
				)?.dataset
				const href = item.querySelector('a')?.href || ''
				const promotion_name = buriedAlt
				const creative_name = href
				const creative_slot = buriedSrc ? window.location.protocol + buriedSrc : ''
				items.push({ promotion_name, creative_name, creative_slot })
			})
			const buriedData = {
				event: 'eeEvent',
				event_type: 'view_promotion',
				ecommerce: { items },
			}
			console.log('setBuriedViewPromotion89', buriedData)
            dataLayer.push({ ecommerce: null })
			dataLayer.push(buriedData)
		}
		exposureBuried({
			domList: viewPromotion89,
			setMark(target, index) {
				return 'imageText' + index
			},
			setBuried(data = []) {
				setBuriedViewPromotion89(data)
			},
		})
		initClickViewPromotion89(viewPromotion89)

		function initClickViewPromotion89(dataList = []) {
			dataList.forEach((item) => {
				const uuidA = initUuid()
				item.querySelector('a.image-overlay__image-link')?.addEventListener('click', (e) => {
					if (repeatClick(uuidA)) return
					const creative_slot = 'image'
					const creative_name = item.querySelector('a.image-overlay__image-link')?.href || ''
					const { buriedAlt = '' } = item.querySelector('.rimage-outer-wrapper.rimage-background')?.dataset
					const promotion_name = buriedAlt
					const buriedData = {
						event: 'eeEvent',
						event_type: 'select_promotion',
						ecommerce: {
							item: [
								{
									promotion_name,
									creative_name,
									creative_slot,
								},
							],
						},
					}
                    dataLayer.push({ ecommerce: null })
					dataLayer.push(buriedData)
					console.log('image-overlay__image-link', buriedData)
				})
				const aDom = item.querySelectorAll('a.overlay-text__button.button') || []
				aDom.forEach((res) => {
					const uuidB = initUuid()
					res.addEventListener('click', (e) => {
						if (repeatClick(uuidB)) return
						const creative_slot = 'button_' + res.innerText
						const creative_name = item.href || ''
						const { buriedAlt = '' } = item.querySelector('.rimage-outer-wrapper.rimage-background')?.dataset
						const promotion_name = buriedAlt
						const buriedData = {
							event: 'eeEvent',
							event_type: 'select_promotion',
							ecommerce: {
								item: [
									{
										promotion_name,
										creative_name,
										creative_slot,
									},
								],
							},
						}
                        dataLayer.push({ ecommerce: null })
						dataLayer.push(buriedData)
						console.log('overlay-text__button', buriedData)
					})
				})
			})
		}
	}
	initViewPromotion89()

	document.querySelector('#shopify-section-announcement-bar').addEventListener('click', (e) => {
		e.preventDefault()
	})

	function fetchPromise(url) {
		return new Promise((resolve) => {
			fetch(url)
				.then((response) => response.json())
				.then((res) => {
					resolve(res)
				})
		})
	}

	async function fetchList(data) {
		const list = data.map((res) => {
			return fetchPromise(res)
		})
		return await Promise.all(list)
	}

	async function viewItemList120() {
		const urlList = [
			'https://shop.luvmehair.com/products/silicone-wig-grip-headband-non-slip-headband.js',
			'https://shop.luvmehair.com/products/hair-wax-stick-cover-the-flying-hair.js',
			'https://shop.luvmehair.com/products/brown-stocking-fabric-wig-caps-10-pieces.js',
			'https://shop.luvmehair.com/products/double-layer-silk-soft-sleeping-cap.js',
		]
		const productData = await fetchList(urlList)
		// console.log('viewItemList120', data)

		function setBuriedViewPromotion120(data) {
			const items = []
			let value = 0
			data.forEach((item) => {
				const { index, productId } = item.dataset
				productData.forEach((res) => {
					if (res.id == productId) {
						value += res.price || 0
						items.push(getProductBuriedData(res, { title: 'Suggested Add-Ons' }, index))
					}
				})
			})
			const ecommerce = {
				currency: 'USD',
				value: value / 100,
				items,
			}
			return { ecommerce }
		}

		const domList = document.querySelectorAll('.pc_add_cart .add_btn')
		exposureBuried({
			domList: domList,
			setMark(target) {
				const { productId } = target.dataset
				return productId
			},
			setBuried(data = []) {
				const { ecommerce } = setBuriedViewPromotion120(data)
				console.log('setBuriedViewPromotion120', ecommerce)
				dataLayer.push({ ecommerce: null })
				dataLayer.push({
					event: 'eeEvent',
					event_type: 'view_item_list',
					ecommerce,
				})
			},
		})

		domList.forEach((item) => {
			const uuidA = initUuid()
			item.querySelector('.image-cont').addEventListener('click', (e) => {
				if (repeatClick(uuidA)) return
				const { ecommerce } = setBuriedViewPromotion120([item])
				dataLayer.push({ ecommerce: null })
				ecommerce.event_label = 'product_picture'
				console.log('setBuriedViewPromotion120 click', ecommerce)
				dataLayer.push({
					event: 'eeEvent',
					event_type: 'select_item',
					ecommerce,
				})
			})

			// const uuidB = initUuid()
			// item.querySelector('.product__title,.product__price').addEventListener('click', (e) => {
			//   if (repeatClick(uuidB)) return
			//   const {ecommerce} = setBuriedViewPromotion120([item])
			//   dataLayer.push({ ecommerce: null });
			//   ecommerce.event_label = 'product_title'
			//   console.log('setBuriedViewPromotion120 click', ecommerce)
			//   dataLayer.push({
			//     event: 'eeEvent',
			//     event_type: 'select_item',
			//     ecommerce
			//   })
			// })

			const uuidC = initUuid()
			item.querySelector('.add_text').addEventListener('click', (e) => {
				if (repeatClick(uuidC)) return
				const { ecommerce } = setBuriedViewPromotion120([item])
				dataLayer.push({ ecommerce: null })
				ecommerce.event_label = 'Suggested Add-Ons'
				console.log('setBuriedViewPromotion120 click', ecommerce)
				dataLayer.push({
					event: 'eeEvent',
					event_type: 'add_to_cart',
					ecommerce,
				})
			})
		})
	}
	viewItemList120()


	const product = window.ShopifyAnalytics?.meta?.product
	console.log('product', product)





	let clickBuried32 = false
	window.buried32 = function () {
		const dom32 = document.querySelectorAll('.gallery__inner.sticky-content-container .thumbnails .owl-stage-outer .owl-item ') || []
		dom32.forEach((item, index) => {
			const uuidA = initUuid()
			item.addEventListener('click', () => {
				clickBuried32 = true
				if (repeatClick(uuidA)) return
				const buriedData = {
					event: 'uaEvent',
					event_type: 'small_carousel_switch',
					event_label: item.querySelector('img').currentSrc,
					position: index + 1,
					product_name: document.querySelector('.title.hete-title-h1').innerText,
					product_id: product.id
				}
				console.log('buried32', buriedData)
				dataLayer.push(buriedData)
			})
		})
	}




	let buried33ACurrent = 0
	window.buried33A = (params) => {
		console.log('clickBuried32', clickBuried32, buried33ACurrent, params.current )
		if(buried33ACurrent === params.current || clickBuried32){
			clickBuried32 = false
			return
		}
		buried33ACurrent = params.current
		const buriedData = {
			event: 'uaEvent',
			event_type: 'small_carousel_switch',
			event_label: document.querySelector('.main-image .slick-active img').currentSrc,
			position: buried33ACurrent + 1,
			product_name: document.querySelector('.title.hete-title-h1').innerText,
			product_id: product.id
		}
		console.log('buried33A', buriedData)
		dataLayer.push(buriedData)
	}

	window.buried33B = (params) => {
		let position = 0
		params.dom[0].querySelectorAll('.gallery-viewer__thumb')?.forEach((item, index) => {
			if(item.className.includes('gallery-viewer__thumb--active')) {
				console.log('index', index)
				position = index + 1
			}
		})
		const buriedData = {
			event: 'uaEvent',
			event_type: 'small_carousel_switch',
			event_label: document.querySelector('.gallery-viewer__zoom-container img').currentSrc,
			position: position + 1,
			product_name: document.querySelector('.title.hete-title-h1').innerText,
			product_id: product.id
		}
		console.log('buried33A', buriedData)
		dataLayer.push(buriedData)
	}



	const contactUs125 =  document.querySelector('.shopify-section.page-section-spacing')
	// console.log('contactUs125', contactUs125)

	let contactUs125DOMNodeInserted = 0
	contactUs125?.addEventListener('DOMNodeInserted', function () {
		clearTimeout(contactUs125DOMNodeInserted)
		contactUs125DOMNodeInserted = setTimeout(() => {
			 if(!document.querySelector('.result.hairstylist')) return
			 contactUs125?.querySelector('.hairlist')?.addEventListener('click', () => {
				 const buriedData = {
					 event: 'uaEvent',
					 event_type: 'contact_us',
					 eventLabel: 'Luvme Email'
				 }
				 console.log('contactUs125', buriedData)
				 dataLayer.push(buriedData)
			})


			contactUs125?.querySelectorAll('#mytree li a')?.forEach(item => {
				item?.addEventListener('click', () => {
					const buriedData = {
						event: 'uaEvent',
						event_type: 'contact_us',
						eventLabel: 'phone_' + (item?.innerText || '')
					}
					console.log('contactUs126', buriedData)
					dataLayer.push(buriedData)
				})
			})
			console.log('DOMNodeInserted DOMNodeInserted DOMNodeInserted')
		}, 500)
	}, false);



	const oneTopList =  contactUs125?.querySelectorAll('.top.one_top') || []
	oneTopList.forEach(item => {
		item?.addEventListener('click', () => {
			const accordionStatus  = item.className?.includes('off') ? '收起' : '展开'
			const buriedData = {
				event: 'uaEvent',
				event_type: `accordion_${accordionStatus}`,
				eventLabel: item?.querySelector('p')?.innerText || ''
			}
			console.log('accordion_$accordionStatus127', buriedData)
			dataLayer.push(buriedData)
		})
	})
	const twoTopList =  contactUs125?.querySelectorAll('.top.two_top') || []
	twoTopList.forEach(res => {
		res?.addEventListener('click', () => {
			const accordionStatus  = res.querySelector('img').className?.includes('off') ? '收起' : '展开'
			const buriedData = {
				event: 'uaEvent',
				event_type: `accordion_${accordionStatus}`,
				eventLabel: res?.querySelector('p')?.innerText || ''
			}
			console.log('accordion_$accordionStatus128', buriedData)
			dataLayer.push(buriedData)
		})
	})
	const threeTopList =  contactUs125?.querySelectorAll('.top.three_top') || []
	threeTopList.forEach(res => {
		res?.addEventListener('click', () => {
			const accordionStatus  = res.querySelector('img').className?.includes('off') ? '收起' : '展开'
			const buriedData = {
				event: 'uaEvent',
				event_type: `accordion_${accordionStatus}`,
				eventLabel: res?.querySelector('p')?.innerText || ''
			}
			console.log('accordion_$accordionStatus129', buriedData)
			dataLayer.push(buriedData)
		})
	})


	const botList =  document.querySelectorAll('.one_ol .bot') || []
	botList.forEach(item => {
		item.querySelector('a').addEventListener('click', () => {
			const buriedData = {
				event: 'uaEvent',
				event_type: `question_function`,
				eventLabel: 'Still have problem?'
			}
			console.log('question_function', buriedData)
			dataLayer.push(buriedData)
		})
		item.querySelector('span').addEventListener('click', () => {
			const buriedData = {
				event: 'uaEvent',
				event_type: `question_function`,
				eventLabel: 'Helpful'
			}
			console.log('question_function', buriedData)
			dataLayer.push(buriedData)
		})
	})



	// 判断页面是否博客页面
	if(window.location.href.includes('/blogs/')) {
		const content =  document.querySelector('#content')
		const aList = content.querySelectorAll('a')
		console.log('aList', aList)
		aList.forEach((item, index) => {
			const uuidA = initUuid()
			item.setAttribute('data-setMarkIndex', index + 1)
			item.addEventListener('click', () => {
				if (repeatClick(uuidA)) return
				const buriedData = {
					event: 'uaEvent',
					event_type: `view_blog_list`,
					event_label: item.href || ''
				}
				console.log('blog_link_entrance', buriedData)
				dataLayer.push(buriedData)
			})
		})
		exposureBuried({
			domList: aList,
			setMark(target, index) {
				const { setmarkindex } = target.dataset
				return setmarkindex
			},
			setBuried(data = []) {
				data.forEach(item => {
					const buriedData = {
						event: 'uaEvent',
						event_type: `view_blog_list`,
						event_label: item.href || ''
					}
					console.log('view_blog_list', buriedData)
					dataLayer.push(buriedData)
				})
			},
		})
	}





})(theme.jQuery)
