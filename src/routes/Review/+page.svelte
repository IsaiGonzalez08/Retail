<script>
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { selectedProducts, totalBalance } from '../../stores/selectedProducts';
	import { orderNumberStore } from '../../stores/orderStore';
	import { refundMethod } from '../../stores/refundMethod';
	import OrderCard from '../../lib/components/OrderCard.svelte';
	import Modal from '../../lib/components/Modal.svelte';

	let orderNumber = '';
	let refundPreference = 'Original Payment';
	let showModal = false;
	let products = [];
	let currentTotalBalance = 0;

	onMount(() => {
		const unsubscribeProducts = selectedProducts.subscribe((value) => {
			products = value;
			updateTotalBalance();
		});

		const unsubscribeTotalBalance = totalBalance.subscribe((value) => {
			currentTotalBalance = typeof value === 'number' ? value : 0;
		});

		const unsubscribeOrderNumber = orderNumberStore.subscribe((value) => {
			orderNumber = value;
		});

		const unsubscribeRefundMethod = refundMethod.subscribe((value) => {
			refundPreference = value === 'online' ? 'Online Credit' : 'Original Payment';
		});

		return () => {
			unsubscribeProducts();
			unsubscribeTotalBalance();
			unsubscribeOrderNumber();
			unsubscribeRefundMethod();
		};
	});

	function updateTotalBalance() {
		console.log('Products:', products);
		currentTotalBalance = products.reduce((sum, p) => {
			const price = typeof p.price === 'number' ? p.price : parseFloat(p.price);
			console.log('Price:', price);
			return sum + price;
		}, 0);
		totalBalance.set(currentTotalBalance);
	}

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	function navigateToWelcome() {
		goto('/');
	}

	function navigateToUpdating() {
		goto('../Updating');
	}

	function navigateToRefund() {
		goto('../Refund');
	}

	function deleteItem(index) {
		products = products.filter((_, i) => i !== index);
		selectedProducts.set(products);
		updateTotalBalance();
	}
</script>

<div class="flex flex-col w-full h-full galaxy-z:px-1 custom:px-5 custom2:px-6">
	<div class="flex justify-center items-center h-[36px] w-full gap-[6px] mt-8 mb-6">
		<div class="flex flex-col">
			<div class="flex items-center">
				<div
					class="flex justify-center items-center bg-[#FFF] border-[#D46353] border-[2px] w-[22px] h-[22px] rounded-full"
				>
					<div class="flex justify-center w-[7px] h-[7px] bg-[#D46353] rounded-full" />
				</div>
			</div>
			<h4
				class="font-manrope font-medium text-start galaxy-z:text-[6.8px] custom:text-[7px] custom2:text-[8px] text-[#D46353] mt-[3px]"
			>
				Order
			</h4>
		</div>
		<div class="w-11 h-[1.5px] bg-[#D46353] mt-[-14px] mr-[-10px]" />
		<div class="flex flex-col">
			<div class="flex justify-center items-center">
				<div
					class="flex justify-center items-center bg-[#FFF] border-[#D46353] border-[2px] w-[22px] h-[22px] rounded-full"
				>
					<div class="flex justify-center w-[7px] h-[7px] bg-[#D46353] rounded-full" />
				</div>
			</div>
			<h4
				class="font-manrope font-medium text-start galaxy-z:text-[6.8px] custom:text-[7px] custom2:text-[8px] text-[#D46353] mt-[3px]"
			>
				Select items
			</h4>
		</div>
		<div class="w-11 h-[1.5px] bg-[#D46353] mt-[-14px] ml-[-10px] mr-[-12px]" />
		<div class="flex flex-col">
			<div class="flex justify-center items-center">
				<div
					class="flex justify-center items-center bg-[#FFF] border-[#D46353] border-[2px] w-[22px] h-[22px] rounded-full"
				>
					<div class="flex justify-center w-[7px] h-[7px] bg-[#D46353] rounded-full" />
				</div>
			</div>
			<h4
				class="font-manrope font-medium text-start galaxy-z:text-[6.8px] custom:text-[7px] custom2:text-[8px] text-[#D46353] mt-[3px]"
			>
				Return Reason
			</h4>
		</div>
		<div class="w-11 h-[1.5px] bg-[#D46353] mt-[-14px] ml-[-12px]" />
		<div class="flex flex-col">
			<div class="flex justify-center items-center">
				<div
					class="flex justify-center items-center bg-[#FFF] border-[#D46353] border-[2px] w-[22px] h-[22px] rounded-full"
				>
					<div class="flex justify-center w-[7px] h-[7px] bg-[#D46353] rounded-full" />
				</div>
			</div>
			<h4
				class="font-manrope font-medium text-start galaxy-z:text-[6.8px] custom:text-[7px] custom2:text-[8px] text-[#D46353] mt-[3px]"
			>
				Refund
			</h4>
		</div>
		<div class="w-11 h-[1.5px] bg-[#D46353] mt-[-14px]" />
		<div class="flex flex-col">
			<div class="flex justify-center items-center">
				<div
					class="flex justify-center items-center bg-[#FFF] border-[#D46353] border-[2px] w-[22px] h-[22px] rounded-full"
				>
					<div class="flex justify-center w-[7px] h-[7px] bg-[#D46353] rounded-full" />
				</div>
			</div>
			<h4
				class="font-manrope font-medium text-start galaxy-z:text-[6.8px] custom:text-[7px] custom2:text-[8px] text-[#D46353] mt-[3px]"
			>
				Review
			</h4>
		</div>
	</div>
	<div class="flex flex-col w-full h-full gap-4 galaxy-z:px-2 custom:px-0">
		<div>
			<h2 class="text-[#000101] text-[32px] font-zodiakBold leading-10">We're nearly done</h2>
			<h4 class="font-manrope text-[16px] font-normal">
				Please double-check all the details are correct. If everything looks good, tap 'Submit
				Return'
			</h4>
			<div class="flex items-center justify-between mt-7 mb-[18px]">
				<h2 class="text-[#0E0E0E] font-zodiakBold text-[20px]">Your Order</h2>
				<h3 class="text-[#0E0E0E] font-manrope font-normal text-[14px]">#{orderNumber}</h3>
			</div>
			{#each products as product, index}
				<OrderCard
					image={product.image}
					name={product.name}
					price={product.price}
					reason={product.reason}
					deleteItem={products.length > 1 ? () => deleteItem(index) : null}
					showDeleteButton={products.length > 1}
				/>
			{/each}

			<div class="flex justify-between mt-[18px]">
				<h2 class="text-[22px] text-[#000101] font-zodiakBold">Total</h2>
				<h3 class="text-[22px] font-medium text-[#000101] font-manrope">
					${currentTotalBalance.toFixed(2)}
				</h3>
			</div>
			<span class="flex justify-end mr-[11px] text-[14px] font-light gap-2 mt-[23px] mb-[13px]">
				<span class="text-[#D9D9D9]">Refund preference:</span>
				<span class="text-[#000101]">{refundPreference}</span>
			</span>
			{#if refundPreference === 'Original Payment'}
				<div class="flex justify-end mr-[5px]">
					<button
						on:click={navigateToRefund}
						class="border-b-[1px] border-[#000101] h-[18px] font-manrope text-[14px] font-medium"
					>
						Edit
					</button>
					<img src="/card-orange.svg" alt="icon-card" class="mr-3 ml-[17px]" />
					<h2 class="font-manrope font-semibold text-[12px]">AMEX -1001</h2>
				</div>
			{:else if refundPreference === 'Online Credit'}
				<div class="flex justify-end mr-[5px] gap-3">
					<button
						on:click={navigateToRefund}
						class="border-b-[1px] border-[#000101] h-[18px] font-manrope text-[14px] font-medium"
					>
						Edit
					</button>
					<h2 class="flex flex-col items-end font-manrope font-light text-[12px] mt-[2px]">
						Online Credit
					</h2>
				</div>
			{/if}
		</div>
		<div class="flex flex-col items-center gap-5">
			<button
				on:click={navigateToUpdating}
				class="w-full h-[49px] text-[#FFFEFC] rounded-[5px] font-manrope font-semibold text-lg bg-[#000101] disabled:bg-[#6B7280] mt-6"
			>
				Submit return
			</button>
			<button
				on:click={openModal}
				class="w-[54px] h-[20px] font-manrope font-bold text-[#000101] border-b-[1px] border-[#000101]"
			>
				Cancel
			</button>
		</div>
	</div>
</div>

{#if showModal}
	<Modal {closeModal} {navigateToWelcome} />
{/if}
