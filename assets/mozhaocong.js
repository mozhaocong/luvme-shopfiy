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
})(theme.jQuery)
