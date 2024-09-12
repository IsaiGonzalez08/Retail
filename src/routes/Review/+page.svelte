<script>
	import { onMount, onDestroy } from 'svelte';
	import Header from '../components/Header.svelte';
	import CardOrder from '../Review/components/OrderCard.svelte';
	import { goto } from '$app/navigation';
	import { selectedProducts } from '../../stores/selectedProducts';
	import { balance as balanceStore } from '../../stores/balance';
	import { orderNumberStore } from '../../stores/orderStore';
	import { refundMethod } from '../../stores/refundMethod';
	import Modal from '../components/modal.svelte';

	let orderNumber = '';
	let refundPreference = 'Original Payment';

	onMount(() => {
		const unsubscribe = orderNumberStore.subscribe((value) => {
			orderNumber = value;
		});

		return () => unsubscribe();
	});

	onMount(() => {
		const unsubscribeRefundMethod = refundMethod.subscribe((value) => {
			refundPreference = value === 'online' ? 'Online Credit' : 'Original Payment'; // Actualiza el valor basado en el store
		});

		return () => unsubscribeRefundMethod();
	});

	let showModal = false;
	let products = [];
	let totalBalance = 0;

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

	const unsubscribeProducts = selectedProducts.subscribe((value) => {
		products = value;
	});

	const unsubscribeBalance = balanceStore.subscribe((value) => {
		totalBalance = value;
	});

	onDestroy(() => {
		unsubscribeProducts();
		unsubscribeBalance();
	});
</script>

<div class="flex flex-col w-full min-h-screen">
	<Header />
	<div class="flex flex-col w-full h-full px-6">
		<div class="flex items-center h-[36px] w-full mb-[24px] mt-8 justify-center">
			<div class="flex flex-col">
				<div class="flex items-center">
					<div
						class="flex justify-center items-center bg-[#FFF] border-[#D46353] border-[2px] w-[22px] h-[22px] rounded-full"
					>
						<div class="flex justify-center w-[7px] h-[7px] bg-[#D46353] rounded-full" />
					</div>
				</div>
				<h4 class="font-manrope font-medium text-start text-[8px] text-[#D46353] mt-[3px]">
					Order
				</h4>
			</div>
			<div class="w-[42px] h-[1.5px] bg-[#D46353] mx-[6px] mb-3" />
			<div class="flex flex-col ml-[-14px]">
				<div class="flex items-center justify-center">
					<div
						class="flex justify-center items-center bg-[#FFF] border-[#D46353] border-[2px] w-[22px] h-[22px] rounded-full"
					>
						<div class="flex justify-center w-[7px] h-[7px] bg-[#D46353] rounded-full" />
					</div>
				</div>
				<h4 class="font-manrope font-medium text-start text-[8px] text-[#D46353] mt-[3px]">
					Selected items
				</h4>
			</div>
			<div class="w-[42px] h-[1.5px] bg-[#D46353] mb-3 ml-[-10px]"></div>
			<div class="flex flex-col ml-[-10px]">
				<div class="flex items-center justify-center">
					<div
						class="flex justify-center items-center bg-[#FFF] border-[#D46353] border-[2px] w-[22px] h-[22px] rounded-full"
					>
						<div class="flex justify-center w-[7px] h-[7px] bg-[#D46353] rounded-full" />
					</div>
				</div>
				<h4 class="font-manrope font-medium text-start text-[8px] text-[#D46353] mt-[3px]">
					Return Reason
				</h4>
			</div>
			<div class="w-[42px] h-[1.5px] bg-[#D46353] mb-3 ml-[-10px]"></div>
			<div class="flex flex-col ml-1">
				<div class="flex items-center justify-center">
					<div
						class="flex justify-center items-center bg-[#FFF] border-[#D46353] border-[2px] w-[22px] h-[22px] rounded-full"
					>
						<div class="flex justify-center w-[7px] h-[7px] bg-[#D46353] rounded-full" />
					</div>
				</div>
				<h4 class="font-manrope font-medium text-start text-[8px] text-[#D46353] mt-[3px]">
					Refund
				</h4>
			</div>
			<div class="w-[42px] h-[1.5px] bg-[#D46353] mb-3 ml-1"></div>
			<div class="flex flex-col ml-1">
				<div class="flex items-center justify-center">
					<div
						class="flex justify-center items-center bg-[#FFF] border-[#D46353] border-[2px] w-[22px] h-[22px] rounded-full"
					>
						<div class="flex justify-center w-[7px] h-[7px] bg-[#D46353] rounded-full" />
					</div>
				</div>
				<h4 class="font-manrope font-medium text-start text-[8px] text-[#D46353] mt-[3px]">
					Review
				</h4>
			</div>
		</div>
		<div class="flex flex-col w-full h-full justify-between">
			<div>
				<h2 class="text-[#000101] text-[32px] font-zodiakBold leading-10">
					We're nearly done
				</h2>
				<h4 class="font-manrope text-[16px] font-normal">
					Please double-check all the details are correct. If everything looks good, tap 'Submit
					Return'
				</h4>
				<div class="flex items-center justify-between mt-7 mb-[18px]">
					<h2 class="text-[#0E0E0E] font-zodiakBold text-[20px]">Your Order</h2>
					<h3 class="text-[#0E0E0E] font-manrope font-normal text-[14px]">#{orderNumber}</h3>
				</div>
				{#each products as { name, image, price, reason }}
					<CardOrder {image} {name} {price} {reason} />
				{/each}
				<div class="flex justify-between mt-[18px]">
					<h2 class="text-[22px] text-[#000101] font-zodiakBold">Total</h2>
					<h3 class="text-[22px] font-medium text-[#000101] font-manrope">${totalBalance}</h3>
				</div>
				<span class="flex justify-end mr-[11px] text-[14px] font-light gap-2 mt-[23px] mb-[13px]">
					<span class="text-[#D9D9D9]">Refund preference:</span>
					<span class="text-[#000101]">{refundPreference}</span>
				</span>
				{#if refundPreference === 'Original Payment'}
					<div class="flex justify-end mr-[5px]">
						<h2
							class="border-b-[1px] border-[#000101] h-[18px] font-manrope text-[14px] font-medium"
						>
							Edit
						</h2>
						<img src="/card-orange.svg" alt="icon-card" class="mr-3 ml-[17px]" />
						<h2 class="font-manrope font-semibold text-[12px]">AMEX -1001</h2>
					</div>
				{:else if refundPreference === 'Online Credit'}
					<div class="flex justify-end mr-[5px] gap-3">
						<h2
							class="border-b-[1px] border-[#000101] h-[18px] font-manrope text-[14px] font-medium"
						>
							Edit
						</h2>
						<h2 class="flex flex-col items-end font-manrope font-light text-[12px] mt-[2px]">Online Credit</h2>
					</div>
				{/if}
			</div>
			<div class="flex flex-col items-center mt-10">
				<button
					on:click={navigateToUpdating}
					class="w-full h-[49px] text-[#FFFEFC] rounded-[5px] font-manrope font-semibold text-lg bg-[#000101] disabled:bg-[#6B7280] mt-6"
				>
					Submit return
				</button>
				<button
					on:click={openModal}
					class="mb-[22px] mt-[20px] w-[54px] h-[20px] font-manrope font-bold text-[#000101] border-b-[1px] border-[#000101]"
					>Cancel
				</button>
			</div>
		</div>
	</div>
</div>

{#if showModal}
  <Modal closeModal={closeModal} navigateToWelcome={navigateToWelcome} />
{/if}
