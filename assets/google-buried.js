;(function ($) {
	console.log('google-buried')
	window.getDomBuriedData = function (data = {}) {
		return {
			item_list_id: data.collectionId ? data.collectionId * 1 : '',
			item_list_name: data.collectionTitle,
			item_category: data.productType,
			item_id: data.productId * 1,
			item_name: data.productTitle,
			item_variant: data.variantId,
			item_category5: data.variantId,
			item_brand: data.variantTitle,
			currency: 'USD',
			quantity: 1,
			// price: data.productPrice * 1,
			price: data.productPrice ? (data.productPrice * 1) / 100 : 0,
			index: data.index * 1 || 1,
		}
	}
	window.getProductBuriedData = (data = {}, collection = {}, index) => {
		return {
			item_list_id: collection.id || '',
			item_list_name: collection.title,
			item_category: data.type,
			item_id: data.id,
			item_name: data.title,
			items_variant: data?.variants?.[0].sku,
			item_category5: data?.variants?.[0].sku,
			item_brand: data?.variants?.[0].public_title,
			currency: 'USD',
			quantity: 1,
			price: data.price ? (data.price * 1) / 100 : 0,
			index: index * 1 || 1,
		}
	}

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

	window.exposureBuried = function (params) {
		let {
			time = 500,
			setMark,
			domList = [],
			setBuried,
			options = { threshold: [0.3] },
			callBack, // 曝光回调 特殊事件使用
			finishBuriedList = [],
		} = params
		let timeOutData = {}
		finishBuriedList = JSON.parse(JSON.stringify(finishBuriedList))
		let postData = []
		let setPost = 0
		function setExposureBuriedList(target, mark) {
			clearTimeout(setPost)
			postData.push(target)
			finishBuriedList.push(mark)
			setPost = setTimeout(() => {
				setBuried(postData)
				postData = []
			}, 100)
		}
		const intersectionObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry, index) => {
				// const {dataset} = entry.target
				// const mark = dataset.productId
				const mark = setMark(entry.target, index)
				if (callBack) {
					callBack(entry)
				}
				if (finishBuriedList.includes(mark)) {
					return
				}
				if (entry.isIntersecting) {
					clearTimeout(timeOutData[mark])
					timeOutData[mark] = setTimeout(() => {
						setExposureBuriedList(entry.target, mark)
					}, time)
				} else {
					clearTimeout(timeOutData[mark])
				}
			})
		}, options)
		domList.forEach((node, index) => {
			const productBuried = node.querySelector('.product-buried')
			if (productBuried) {
				// if (
				//   !productBuried?.dataset?.index ||
				//   productBuried.dataset.index != 0
				// ) {
				//   productBuried.setAttribute('data-index', index + 1)
				// }
				productBuried.setAttribute('data-index', index + 1)
			}
			intersectionObserver.observe(node)
		})
	}

	const finishGoogleBuriedList = []

	window.setGoogleBuried = function (params) {
		switch (params.type) {
			case 'view_promotion':
				return view_promotion(params.dom)
			case 'view_item_list43':
				return initViewItemList43()
			case 'view_item_list51':
				return initViewItemList51(params.data)
			case 'view_promotion86':
				return initViewPromotion86(params)
			case 'view_promotion86_afterChange':
				return viewPromotion86AfterChange(params)
			case 'ajaxLoadUrl':
				initProductSort()
				return initAjaxLoadUrl(params)
			case 'search_show':
				return initSearchShow(params)
			case 'navigation_recommendation':
				return initNavigationRecommendation(params)
			case 'swymWishlist':
				initSwymWishlist(params)
				clickWishlist()
				return true
			case 'owlCarousel2':
				return window.buried32()
			case 'galleryViewerChange':
				return window.buried33B(params)
			case 'slideshowAfterChange':
				return window.buried33A(params)
		}
	}

	function initAjaxLoadUrl(params) {
		const data = params?.data?.$container?.[0]
		try {
			const item = data.querySelectorAll('.filters-adjacent.collection-listing .product-block') || []
			initViewItemList24(item)
		} catch (e) {
			console.log(e)
		}
	}

	function view_promotion(dom) {
		if (dom) {
			const data = dom[0].querySelectorAll('.menu-promotion') || []
			if (!data.length) return
			const ecommerce = { items: [] }
			data.forEach((node) => {
				const creative_name = node.querySelector('.menu-promotion__link').href || ''
				const promotion_name = node.querySelector('.rimage__image').alt || ''
				const creative_slot = dom[0].querySelector('.navigation__link.hete-title-link').innerText || ''
				const mark = creative_name + promotion_name + creative_slot
				if (!finishGoogleBuriedList.includes(mark)) {
					finishGoogleBuriedList.push(mark)
					ecommerce.items.push({ promotion_name, creative_name, creative_slot })
				}
			})
			if (!ecommerce.items.length) return
			console.log('view_promotion123', ecommerce)
			dataLayer.push({ ecommerce: null })
			dataLayer.push({
				event_type: 'view_promotion',
				event: 'eeEvent',
				ecommerce,
			})
		}
	}

	const viewItemList24 = document.querySelectorAll('.main-collection-buried  .collection-listing .product-block') || []

	initViewItemList24(viewItemList24)
	function initViewItemList24(dom24List) {
		function setViewItemList24Buried(data = []) {
			let value = 0
			const buried = data.map((dom) => {
				const dataset = dom.querySelector('.product-buried').dataset
				value += (dataset.productPrice || 0) * 1
				return getDomBuriedData(dataset)
			})
			let ecommerce = {
				value: value / 100,
				currency: 'USD',
				items: buried,
			}

			// viewItemList53 搜索结果列表
			if (window.location.pathname === '/search') {
				let urlSearch = new URLSearchParams(window.location.search)
				const searchData = urlSearch.get('q')
				ecommerce.items = ecommerce.items.map((res) => {
					return { ...res, item_list_name: `search_${searchData}` }
				})
				ecommerce.event_label = `search_${searchData}`
			}
			return { ecommerce }
		}

		function initClickViewItemList24(domList = []) {
			domList.forEach((item) => {
				const uuidA = initUuid()
				item.querySelector('.image-cont .product-link')?.addEventListener('click', (e) => {
					if (repeatClick(uuidA)) return
					const { ecommerce } = setViewItemList24Buried([item])
					ecommerce.event_label = 'product_picture'
					console.log('initClickViewItemList24', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'select_item',
						ecommerce: ecommerce,
					})
				})

				const uuidC = initUuid()
				item.querySelector('.product-info .product-link')?.addEventListener('click', (e) => {
					if (repeatClick(uuidC)) return
					const { ecommerce } = setViewItemList24Buried([item])
					ecommerce.event_label = 'product_title'
					console.log('initClickViewItemList24', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'select_item',
						ecommerce: ecommerce,
					})
				})

				const uuidB = initUuid()
				// 收藏点击事件 add_to_wishlist47
				item.querySelector('.swym-button.swym-add-to-wishlist-view-product')?.addEventListener('click', (e) => {
					e.preventDefault()
					e.stopPropagation()
					if (e.target.classList.value.includes('disabled')) return
					if (repeatClick(uuidB)) return
					const { ecommerce } = setViewItemList24Buried([item])
					console.log('add_to_wishlist47', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'add_to_wishlist',
						ecommerce,
					})
				})

				function dataLayerWindowMapArrow(item, type) {
					let itemDom = {}
					if (type === 'click') {
						itemDom = item.querySelector('.product-block__image.product-block__image--show-on-hover') || {}
					} else {
						itemDom = item.querySelector('.product-block__image.product-block__image--active') || {}
					}
					const { imageIndex = 0, buriedImage } = itemDom?.dataset || {}
					const { protocol } = window.location
					const { ecommerce } = viewItemList94Buried([item])
					const event_label = protocol + buriedImage
					const { item_id, item_name } = ecommerce.items[0]
					const page_list_name = document.querySelector('.pagetitle.h3-style').innerText
					console.log('image-page-button item', event_label, imageIndex, page_list_name)
					dataLayer.push({
						event: 'uaEvent',
						event_type: 'window_map_arrow',
						event_label,
						position: imageIndex * 1 + 1,
						page_list_name,
						product_name: item_name,
						product_id: item_id,
					})
				}

				if (document.body.clientWidth < 1000) {
					console.log('监听拖动事件')
					item.querySelector('.image-cont.image-cont--with-secondary-image')?.addEventListener('touchend', () => {
						setTimeout(() => {
							dataLayerWindowMapArrow(item, 'touchend')
						}, 10)
					})
				}

				const resDom = item.querySelectorAll('.image-page-button.ltr-icon') || []
				resDom.forEach((res) => {
					res.addEventListener('click', () => {
						setTimeout(() => {
							dataLayerWindowMapArrow(item, 'click')
						}, 10)
					})
				})
			})
		}

		// console.log('dom24List', dom24List)
		if (dom24List && dom24List.length) {
			exposureBuried({
				domList: dom24List,
				setMark(target) {
					const { dataset } = target
					return dataset.productId
				},
				setBuried(data = []) {
					const { ecommerce } = setViewItemList24Buried(data)
					console.log('initClickViewItemList24', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'view_item_list',
						ecommerce: ecommerce,
					})
				},
			})
			initClickViewItemList24(dom24List)
		}
	}

	const viewItemList41 = document.querySelectorAll('.lightly-spaced-row.lightly-spaced-row-above .product-block')
	function setViewItemList41Buried(data = []) {
		let value = 0
		const item_list_name = document.querySelector('.lightly-spaced-row.lightly-spaced-row-above .label')?.innerText
		const buried = data.map((dom) => {
			const dataset = dom.querySelector('.product-buried').dataset
			value += (dataset.productPrice || 0) * 1
			return { ...getDomBuriedData(dataset), item_list_name }
		})
		const product = window?.SwymProductInfo?.product || {}

		const ecommerce = {
			event_label: product.title,
			product_id: product.id,
			value: value / 100,
			currency: 'USD',
			items: buried,
		}
		return { ecommerce }
	}
	function initClickViewItemList41(domList = []) {
		domList.forEach((item) => {
			const uuidA = initUuid()
			item.querySelector('.image-cont .product-link')?.addEventListener('click', () => {
				if (repeatClick(uuidA)) return
				const { ecommerce } = setViewItemList41Buried([item])
				console.log('initClickViewItemList41', ecommerce)
				ecommerce.event_label = 'product_picture'
				dataLayer.push({ ecommerce: null })
				dataLayer.push({
					event: 'eeEvent',
					event_type: 'select_item',
					ecommerce: ecommerce,
				})
			})

			const uuidC = initUuid()
			item.querySelector('.product-info .product-link')?.addEventListener('click', () => {
				if (repeatClick(uuidC)) return
				const { ecommerce } = setViewItemList41Buried([item])
				ecommerce.event_label = 'product_title'
				console.log('initClickViewItemList41', ecommerce)
				dataLayer.push({ ecommerce: null })
				dataLayer.push({
					event: 'eeEvent',
					event_type: 'select_item',
					ecommerce: ecommerce,
				})
			})

			const uuidB = initUuid()
			// 收藏点击事件 add_to_ViewItemList41
			item.querySelector('.swym-button.swym-add-to-wishlist-view-product')?.addEventListener('click', (e) => {
				e.preventDefault()
				e.stopPropagation()
				if (e.target.classList.value.includes('disabled')) return
				if (repeatClick(uuidB)) return
				const { ecommerce } = setViewItemList41Buried([item])
				console.log('add_to_ViewItemList41', ecommerce)
				dataLayer.push({ ecommerce: null })
				dataLayer.push({
					event: 'eeEvent',
					event_type: 'add_to_wishlist',
					ecommerce,
				})
			})

			let imagePageButtonTime = 0

			function windowMapArrow43(item, type) {

				let currentDom = {}
				if (type === 'click') {
					currentDom = item.querySelector('.product-block__image.product-block__image--show-on-hover') || {}
				} else {
					currentDom = item.querySelector('.product-block__image.product-block__image--active') || {}
				}

				// const currentDom = item.querySelector('.product-block__image--show-on-hover')
				const { ecommerce } = setViewItemList41Buried([item])
				const buriedData = {
					event: 'uaEvent',
					event_type: 'window_map_arrow',
					event_label: currentDom?.querySelector('img').currentSrc,
					position:`related_${currentDom?.dataset.imageIndex}`,
					product_name: ecommerce.items[0].item_name,
					product_id: ecommerce.items[0].item_id
				}
				console.log('window_map_arrow 43', buriedData)
				dataLayer.push(buriedData)
			}

			if (document.body.clientWidth < 1000) {
				console.log('监听拖动事件')
				item.querySelector('.image-cont.image-cont--with-secondary-image')?.addEventListener('touchend', () => {
					setTimeout(() => {
						windowMapArrow43(item, 'touchend')
					}, 10)
				})
			}

			item.querySelectorAll('.image-page-button')?.forEach(res => {
				res.addEventListener('click', () => {
					clearTimeout(imagePageButtonTime)
					imagePageButtonTime = setTimeout(() => {
						windowMapArrow43(item, 'click')
						// const currentDom = item.querySelector('.product-block__image--show-on-hover')
						// const { ecommerce } = setViewItemList41Buried([item])
						// const buriedData = {
						// 	event: 'uaEvent',
						// 	event_type: 'window_map_arrow',
						// 	event_label: currentDom.querySelector('img').currentSrc,
						// 	position:`related_${currentDom.dataset.imageIndex}`,
						//     product_name: ecommerce.items[0].item_name,
						//     product_id: ecommerce.items[0].item_id
						// }
						// console.log('window_map_arrow 43', buriedData)
						// dataLayer.push(buriedData)
					}, 50)
				})
			})

		})
	}
	if (viewItemList41 && viewItemList41.length) {
		exposureBuried({
			domList: viewItemList41,
			setMark(target) {
				const { dataset } = target
				return dataset.productId
			},
			setBuried(data = []) {
				const { ecommerce } = setViewItemList41Buried(data)
				dataLayer.push({ ecommerce: null })
				dataLayer.push({
					event: 'eeEvent',
					event_type: 'view_item_list',
					ecommerce,
				})
			},
		})
		initClickViewItemList41(viewItemList41)
	}

	function initViewItemList43() {
		const viewItemList43 = document.querySelectorAll('.section-product-recommendations .product-block')

		function setBuriedViewItemList43(data = []) {
			let value = 0
			const buried = data.map((dom) => {
				const dataset = dom.querySelector('.product-buried').dataset
				value += (dataset.productPrice || 0) * 1
				return {
					...getDomBuriedData(dataset),
					item_list_name: 'Customers Also Viewed',
				}
			})
			const product = window?.SwymProductInfo?.product || {}
			const ecommerce = {
				event_label: product.title,
				value: value / 100,
				currency: 'USD',
				items: buried,
			}
			return { ecommerce }
		}

		function initClickViewItemList43(domList = []) {
			domList.forEach((item) => {
				const uuidA = initUuid()
				item.querySelector('.image-cont .product-link')?.addEventListener('click', () => {
					if (repeatClick(uuidA)) return
					const { ecommerce } = setBuriedViewItemList43([item])
					console.log('initClickViewItemList43', ecommerce)
					ecommerce.event_label = 'product_picture'
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'select_item',
						ecommerce: ecommerce,
					})
				})

				const uuidC = initUuid()
				item.querySelector('.product-info .product-link')?.addEventListener('click', () => {
					if (repeatClick(uuidC)) return
					const { ecommerce } = setBuriedViewItemList43([item])
					console.log('initClickViewItemList43', ecommerce)
					ecommerce.event_label = 'product_title'
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'select_item',
						ecommerce: ecommerce,
					})
				})
				const uuidB = initUuid()
				// 收藏点击事件 add_to_wishlist46
				item.querySelector('.swym-button.swym-add-to-wishlist-view-product')?.addEventListener('click', (e) => {
					e.preventDefault()
					e.stopPropagation()
					if (e.target.classList.value.includes('disabled')) return
					if (repeatClick(uuidB)) return
					const { ecommerce } = setBuriedViewItemList43([item])
					console.log('add_to_wishlist46', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'add_to_wishlist',
						ecommerce,
					})
				})
			})
		}

		if (viewItemList43 && viewItemList43.length) {
			exposureBuried({
				domList: viewItemList43,
				setMark(target) {
					const { dataset } = target
					return dataset.productId
				},
				setBuried(data = []) {
					const { ecommerce } = setBuriedViewItemList43(data)
					console.log('ecommerce viewItemList43', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'view_item_list',
						ecommerce,
					})
				},
			})
			initClickViewItemList43(viewItemList43)
		}
	}

	function initViewItemList51(params) {
		console.log('viewItemList51')
		const view_item_list51 = document.querySelectorAll('.main-search__results .product-block')

		function setBuriedViewItemList51(data = []) {
			let value = 0
			const buried = data.map((dom) => {
				const dataset = dom.querySelector('.product-buried').dataset
				value += (dataset.productPrice || 0) * 1
				return {
					...getDomBuriedData(dataset),
					item_list_name: `search_${params}`,
				}
			})

			const ecommerce = {
				event_label: `search_preview`,
				value: value / 100,
				currency: 'USD',
				items: buried,
			}
			return { ecommerce }
		}

		function initClickViewItemList51(domList = []) {
			domList.forEach((item) => {
				const uuidA = initUuid()
				item.querySelector('.image-cont .product-link')?.addEventListener('click', (e) => {
					if (repeatClick(uuidA)) return
					const { ecommerce } = setBuriedViewItemList51([item])
					console.log('initClickViewItemList51', ecommerce)
					ecommerce.event_label = 'product_picture'
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'select_item',
						ecommerce: ecommerce,
					})
				})
                const uuidB = initUuid()
                item.querySelector('.product-info .product-link')?.addEventListener('click', (e) => {
                    if (repeatClick(uuidB)) return
                    const { ecommerce } = setBuriedViewItemList51([item])
                    console.log('initClickViewItemList51', ecommerce)
					ecommerce.event_label = 'product_title'
					dataLayer.push({ ecommerce: null })
                    dataLayer.push({
                        event: 'eeEvent',
                        event_type: 'select_item',
                        ecommerce: ecommerce,
                    })
                })
			})
		}

		if (view_item_list51 && view_item_list51.length) {
			exposureBuried({
				domList: view_item_list51,
				setMark(target) {
					const { dataset } = target
					return dataset.productId
				},
				setBuried(data = []) {
					console.log('data data data', data)
					const { ecommerce } = setBuriedViewItemList51(data)
					console.log('view_item_list51', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'view_item_list',
						ecommerce,
					})
				},
			})
			initClickViewItemList51(view_item_list51)
		}
	}

	// viewPromotion86Config 模块开发 开始

	const viewPromotion86Config = {
		setMark(target) {
			const { dataset } = target.querySelector('.rimage-outer-wrapper.rimage-background')
			return dataset.bgset
		},
		setBuried(target) {
			const creative_name = target.querySelector('.image-overlay__image-link')?.href || ''
			const promotion_name = target.querySelector('.alt_title')?.innerText || ''
			const mark = viewPromotion86Config.setMark(target)
			viewPromotion86Config.finishList.push(mark)
			return {
				promotion_name,
				creative_name,
				creative_slot: 'image',
			}
		},
		domState: {},
		finishList: [],
	}
	function initViewPromotion86() {
		const view_promotion86 = document.querySelectorAll(
			'.section-slideshow .image-overlay--bg-full.image-overlay--bg-shadow.slick-slide',
		)
		if (view_promotion86 && view_promotion86.length) {
			exposureBuried({
				domList: view_promotion86,
				setMark: viewPromotion86Config.setMark,
				callBack(item) {
					const { target, isIntersecting } = item
					const data = viewPromotion86Config.setMark(target)
					viewPromotion86Config.domState = {
						...viewPromotion86Config.domState,
						[data]: isIntersecting,
					}
				},
				setBuried(data = []) {
					const ecommerce = { items: [] }
					data.forEach((item) => {
						if (item.getAttribute('aria-hidden') == 'true' || data.length === 1) {
							ecommerce.items.push(viewPromotion86Config.setBuried(item))
						}
					})
					console.log('initViewPromotion86', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'view_promotion',
						ecommerce,
					})
				},
			})
		}
	}

	function viewPromotion86AfterChange(param) {
		const domList =
			param?.dom?.target?.querySelectorAll('.image-overlay--bg-full.image-overlay--bg-shadow.slick-slide') || []
		domList.forEach((node) => {
			if (node.getAttribute('aria-hidden') == 'true') {
				const mark = viewPromotion86Config.setMark(node)
				console.log(viewPromotion86Config.finishList)
				if (viewPromotion86Config.finishList.includes(mark)) {
					return
				}
				if (viewPromotion86Config.domState[mark]) {
					console.log('viewPromotion86AfterChange', node)
					const ecommerce = { item: viewPromotion86Config.setBuried(node) }
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'view_promotion',
						ecommerce,
					})
				}
			}
		})
	}
	// viewPromotion86Config 模块开发 结束

	const viewItemList94 = document.querySelectorAll('.section-featured-collection') || []
	viewItemList94.forEach((item) => {
		const domList = item.querySelectorAll('.product-block')
		initViewItemList94(domList)
		initClickViewPromotion94(domList)
	})
	function initClickViewPromotion94(domList) {
		domList.forEach((item) => {
			const uuidA = initUuid()
			item.querySelector('.image-cont .product-link')?.addEventListener('click', (e) => {
				if (repeatClick(uuidA)) return
				const { ecommerce } = viewItemList94Buried([item])
				ecommerce.event_label = 'product_picture'
				console.log('select_item94', ecommerce)
				dataLayer.push({ ecommerce: null })
				dataLayer.push({
					event: 'eeEvent',
					event_type: 'select_item',
					ecommerce,
				})
			})
			const uuidC = initUuid()
			item.querySelector('.product-info .product-link')?.addEventListener('click', (e) => {
				if (repeatClick(uuidC)) return
				const { ecommerce } = viewItemList94Buried([item])
				ecommerce.event_label = 'product_title'
				console.log('select_item94', ecommerce)
				dataLayer.push({ ecommerce: null })
				dataLayer.push({
					event: 'eeEvent',
					event_type: 'select_item',
					ecommerce,
				})
			})
			const uuidB = initUuid()
			// 收藏点击事件 add_to_wishlist96
			item.querySelector('.swym-button.swym-add-to-wishlist-view-product')?.addEventListener('click', (e) => {
				e.preventDefault()
				e.stopPropagation()
				if (repeatClick(uuidB)) return
				const { ecommerce } = viewItemList94Buried([item])
				console.log('add_to_wishlist96', ecommerce)
				dataLayer.push({ ecommerce: null })
				dataLayer.push({
					event: 'eeEvent',
					event_type: 'add_to_wishlist',
					ecommerce,
				})
			})

			// const resDom = item.querySelectorAll('.image-page-button.ltr-icon') || []
			// resDom.forEach(res => {
			//   res.addEventListener('click', () => {
			//     const itemDom = item.querySelector('.product-block__image.product-block__image--secondary.product-block__image--active')
			//     const {imageIndex = 1} = itemDom?.dataset
			//     const { ecommerce } = viewItemList94Buried([item])
			//     console.log('image-page-button item', ecommerce, imageIndex)
			//     const { item_id, item_name } = ecommerce.items[0]
			//     dataLayer.push({
			//       event: 'uaEvent',
			//       event_type: 'window_map_arrow',
			//       event_label:'',
			//       position: imageIndex,
			//       page_list_name:'',
			//       product_name: item_name,
			//       product_id: item_id
			//     })
			//   })
			// })
		})
	}

	function viewItemList94Buried(data = []) {
		let value = 0
		const buried = data.map((dom) => {
			const dataset = dom.querySelector('.product-buried').dataset
			value += (dataset.productPrice || 0) * 1
			const data = getDomBuriedData(dataset)
			return {
				...data,
				item_list_name: `Featured_collection_${data.item_list_name}`,
			}
		})
		const ecommerce = {
			event_label: 'Featured_collection',
			currency: 'USD',
			value: value / 100,
			items: buried,
		}
		return { ecommerce }
	}

	function initViewItemList94(domList) {
		if (domList && domList.length) {
			exposureBuried({
				domList: domList,
				setMark(target) {
					const { dataset } = target
					return dataset.productId
				},
				setBuried(data = []) {
					const { ecommerce } = viewItemList94Buried(data)
					console.log('initViewItemList94', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'view_item_list',
						ecommerce,
					})
				},
			})
		}
	}

	const viewPromotion98 = document.querySelectorAll('.section-multi-column') || []
	viewPromotion98.forEach((item) => {
		const isColumnList = item.className.includes('section-multi-column-list')
		const hometitle = item.querySelector('.hometitle')?.innerText
		if (!isColumnList) {
			const domList = item.querySelectorAll('.column.text-column')
			initViewPromotion98(domList, hometitle, isColumnList)
			initClickViewPromotion98(domList, hometitle, isColumnList)
		} else {
			const pcDomList = item.querySelectorAll('.pc_hide .text-column')
			initViewPromotion98(pcDomList, hometitle, isColumnList)
			initClickViewPromotion98(pcDomList, hometitle, isColumnList)
			const ydDomList = item.querySelectorAll('.yd_hide .text-column')
			initViewPromotion98(ydDomList, hometitle, isColumnList)
			initClickViewPromotion98(ydDomList, hometitle, isColumnList)
		}
	})

	function viewPromotion98BuriedData(item, hometitle, isColumnList) {
		const creative_name = item.querySelector('a')?.href || ''
		const promotion_name = item.querySelector('.hete-image-src.rimage__image')?.alt || ''
		let creative_slot = 'Image'
		if (hometitle) {
			if (isColumnList) {
				creative_slot = `Image_${hometitle}`
			} else {
				creative_slot = `${hometitle}_Image`
			}
		}

		return {
			creative_name,
			promotion_name,
			creative_slot,
		}
	}
	function initViewPromotion98(domList, hometitle, isColumnList) {
		if (domList && domList.length) {
			exposureBuried({
				domList: domList,
				setMark(target) {
					return target.id
				},
				setBuried(data = []) {
					const ecommerce = { items: [] }
					data.forEach((item) => {
						ecommerce.items.push(viewPromotion98BuriedData(item, hometitle, isColumnList))
					})
					console.log('viewPromotion98BuriedData', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'view_promotion',
						ecommerce,
					})
				},
			})
		}
	}

	function initClickViewPromotion98(domList = [], hometitle, isColumnList) {
		domList.forEach((item) => {
			const uuidA = initUuid()
			item.querySelector('a')?.addEventListener('click', () => {
				if (repeatClick(uuidA)) return
				const ecommerce = viewPromotion98BuriedData(item, hometitle, isColumnList)
				console.log('initClickViewPromotion98', ecommerce)
				dataLayer.push({ ecommerce: null })
				dataLayer.push({
					event: 'eeEvent',
					event_type: 'select_promotion',
					ecommerce: { items: [ecommerce] },
				})
			})
		})
	}

	const isSearchShow = false
	function initSearchShow() {
		if (isSearchShow) return
		const domList = document.querySelectorAll('.main-search__suggestions .product-block')
		if (!(domList && domList.length)) return
		domList.forEach((item) => {
			const uuidA = initUuid()
			item.addEventListener('click', () => {
				if (repeatClick(uuidA)) return
				const event_label = item.querySelector('.product-block__title').innerText
				console.log('initSearchShow', event_label)
				dataLayer.push({ ecommerce: null })
				dataLayer.push({
					event: 'uaEvent',
					event_type: 'search_main_meau',
					event_label,
				})
			})
		})
	}

	let isInitNavigationRecommendation = false
	function initNavigationRecommendation() {
		if (isInitNavigationRecommendation) {
			return
		}
		isInitNavigationRecommendation = true
		const domList = document.querySelectorAll('.navigation__mobile-products .product-block')

		function setBuriedNavigationRecommendation(data = []) {
			let value = 0
			const item_list_name = document.querySelector(
				'.navigation__mobile-products .navigation__mobile-products-title',
			).innerText
			const buried = data.map((dom) => {
				const dataset = dom.querySelector('.product-buried').dataset
				value += (dataset.productPrice || 0) * 1
				return { ...getDomBuriedData(dataset), item_list_name }
			})
			let ecommerce = {
				value: value / 100,
				currency: 'USD',
				items: buried,
			}

			return { ecommerce }
		}

		function initClickNavigationRecommendation(domList = []) {
			domList.forEach((item) => {
				const uuidA = initUuid()
				item.querySelector('.image-cont .product-link')?.addEventListener('click', (e) => {
					if (repeatClick(uuidA)) return
					const { ecommerce } = setBuriedNavigationRecommendation([item])
					ecommerce.event_label = 'product_picture'
					console.log('initClickNavigationRecommendation', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'select_item',
						ecommerce: ecommerce,
					})
				})

				const uuidC = initUuid()
				item.querySelector('.product-info .product-link')?.addEventListener('click', (e) => {
					if (repeatClick(uuidC)) return
					const { ecommerce } = setBuriedNavigationRecommendation([item])
					ecommerce.event_label = 'product_title'
					console.log('initClickNavigationRecommendation', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'select_item',
						ecommerce: ecommerce,
					})
				})
				const uuidB = initUuid()
				// 收藏点击事件 add_to_wishlistNavigationRecommendation
				item.querySelector('.swym-button.swym-add-to-wishlist-view-product')?.addEventListener('change', (e) => {
					e.preventDefault()
					e.stopPropagation()
					console.log('click add_to_wishlistNavigationRecommendation')
					if (e.target.classList.value.includes('disabled')) return
					if (repeatClick(uuidB)) return
					const { ecommerce } = setBuriedNavigationRecommendation([item])
					console.log('add_to_wishlistNavigationRecommendation', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'add_to_wishlist',
						ecommerce,
					})
				})
			})
		}

		const root = document.querySelector('.navigation__mobile-products ')
		if (domList && domList.length) {
			exposureBuried({
				domList: domList,
				setMark(target) {
					const { productId } = target.dataset
					return productId
				},
				options: {
					threshold: [0.3],
					root: root,
				},
				setBuried(data = []) {
					const ecommerce = setBuriedNavigationRecommendation(data)
					console.log('initNavigationRecommendation', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'view_item_list',
						ecommerce: ecommerce.ecommerce,
					})
				},
			})

			initClickNavigationRecommendation(domList)
		}
	}

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

	function getSwatFetch() {
		return new Promise((resolve) => {
			window._swat.fetch(function (r) {
				resolve(r)
			})
		})
	}

	const swatUrlData = []
	let swatApiData = []
	const finishList = []

	async function initSwymWishlist() {
		let detailDom = null

		function setBuriedSwymWishlist(data = []) {
			let value = 0
			const res = []
			data.forEach((item) => {
				const { productId, index } = item.dataset
				finishList.push(productId)
				const filterData = swatApiData.filter((item) => item.id == productId) || []
				const buriedData = filterData[0] || {}
				value += buriedData.price || 0
				res.push({ ...getProductBuriedData(filterData[0] || {}, {}, index), item_list_name: 'wishlist' })
			})
			const ecommerce = {
				event_label: 'wishlist',
				currency: 'USD',
				value: value / 100,
				items: res,
			}
			return { ecommerce }
		}

		function initClickSwymWishlist(data = []) {
			data.forEach((item) => {
				item.querySelector('.swym-add-to-cart-btn.swym-button').addEventListener('click', () => {
					console.log('setBuriedSwymWishlist', item)
					const { ecommerce } = setBuriedSwymWishlist([item])
					console.log('add_to_cartSwymWishlist', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'add_to_cart',
						ecommerce: ecommerce,
					})
				})

				item.addEventListener('click', () => {
					const { ecommerce } = setBuriedSwymWishlist([item])
					detailDom = item
					console.log('select_itemkSwymWishlist', ecommerce)
					dataLayer.push({ ecommerce: null })
					dataLayer.push({
						event: 'eeEvent',
						event_type: 'select_item',
						ecommerce: ecommerce,
					})
				})

				item.querySelector('.swym-delete-btn').addEventListener('click', () => {
					dataLayer.push({ ecommerce: null })
					const { productId } = item.dataset
					const product_name = item.querySelector('.swym-title').innerText
					console.log('swym-delete-btn SwymWishlist', productId, product_name)
					dataLayer.push({
						event: 'uaEvent',
						event_type: 'bottom_function',
						event_label: 'cancelwishlist',
						product_id: productId,
						product_name,
					})
				})
			})
		}

		function detailsViewItem() {
			const { ecommerce } = setBuriedSwymWishlist([detailDom])
			console.log('detailsViewItem', ecommerce)
			dataLayer.push({ ecommerce: null })
			dataLayer.push({
				event: 'eeEvent',
				event_type: 'view_item',
				ecommerce: ecommerce,
			})
		}

		function detailsInitClick() {
			setTimeout(() => {
				const domList = document.querySelectorAll(
					'.swym-wishlist-product-detail-container .swym-wishlist-add-to-cart-btn',
				)
				domList.forEach((item) => {
					item.addEventListener('click', () => {
						const { ecommerce } = setBuriedSwymWishlist([detailDom])
						console.log('detailsInitClick', ecommerce)
						dataLayer.push({ ecommerce: null })
						dataLayer.push({
							event: 'eeEvent',
							event_type: 'add_to_cart',
							ecommerce: ecommerce,
						})
					})
				})

				const moreDetailList = document.querySelectorAll(
					'.swym-wishlist-product-detail-container .swym-more-details-btn',
				)
				moreDetailList.forEach((item) => {
					item.addEventListener('click', () => {
						const { ecommerce } = setBuriedSwymWishlist([detailDom])
						const buriedData = {
							event_type: `more_detail`,
							event_label: 'wishlist_MoreDetail',
							product_id: ecommerce?.items[0]?.item_id || '',
							product_name: ecommerce?.items[0]?.item_name || ''
						}
						console.log('more_detail 114', buriedData)
						dataLayer.push(buriedData)
					})
				})
			}, 10)
		}

		console.log('initSwymWishlist')
		setTimeout(async () => {
			let timeNub = 0
			let isInit = false
			let isChange = false
			var container = document.querySelector('.swym-simple-wishlist-container-content')
			container?.addEventListener(
				'DOMSubtreeModified',
				function (e) {
					const classData = container.querySelector('.swym-wishlist-detail').classList
					clearTimeout(timeNub)
					timeNub = setTimeout(() => {
						isInit = classData.value.includes('swym-showing-product-detail')
						if (isInit && !isChange) {
							console.log('详情页')
							detailsViewItem()
							detailsInitClick()
						}
						if (isInit) {
							isChange = true
						}
						if (!isInit && isChange) {
							isChange = false
							setTimeout(() => {
								initSetTimeoutSwymWishlist()
							}, 10)
							console.log('列表页')
						}
					}, 100)
				},
				false,
			)

			async function initSetTimeoutSwymWishlist() {
				const domList = document.querySelectorAll('.swym-wishlist-grid .swym-wishlist-item')
				const data = await getSwatFetch()
				const url = data
					.map((res) => {
						return res.du + '.js'
					})
					.filter((res) => {
						const isOk = swatUrlData.includes(res)
						if (!isOk) swatUrlData.push(res)
						return !isOk
					})
				// console.log('data', data)
				// console.log('url', url)
				const getData = await fetchList(url)
				swatApiData = [...swatApiData, ...getData]
				// console.log('getData',swatApiData)

				if (!(domList && domList.length)) return
				domList.forEach((item, index) => {
					item.setAttribute('data-index', index + 1)
					item.setAttribute('data-product-id', data[index].empi)
				})

				exposureBuried({
					domList: domList,
					setMark(target) {
						const { productId } = target.dataset
						return productId
					},
					finishBuriedList: finishList,
					setBuried(data = []) {
						// console.log('data', data)
						const { ecommerce } = setBuriedSwymWishlist(data)
						console.log('setBuriedSwymWishlist', ecommerce)
						dataLayer.push({ ecommerce: null })
						dataLayer.push({
							event: 'eeEvent',
							event_type: 'view_item_list',
							ecommerce,
						})
					},
				})

				initClickSwymWishlist(domList)
			}
			initSetTimeoutSwymWishlist()
		}, 100)
	}

	function initProductSort() {
		const domList =
			document.querySelectorAll('.main-collection-buried .link-dropdown__options .link-dropdown__link') || []
		domList.forEach((item) => {
			item.addEventListener('click', () => {
				console.log('initProductSort', item.innerText)
				dataLayer.push({
					event: 'uaEvent',
					event_type: 'product_sort',
					event_label: item.innerText,
				})
			})
		})
	}

	initProductSort()


	function clickWishlist() {
		dataLayer.push({
			event: 'uaEvent',
			event_type: 'top_function',
			event_label: 'wishlist',
		})
		console.log('clickWishlist')

	}
})(theme.jQuery)
