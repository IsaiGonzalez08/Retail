<script>
	import { onDestroy } from 'svelte';
	import { selectedProducts, totalBalance, refundMethod } from '../../stores/index';
	import CardSuccess from '$lib/components/CardSuccess.svelte';

	let products = [];
	let balance = 0;
	let refundPreference = 'Original Payment';

	const unsubscribeProducts = selectedProducts.subscribe((value) => {
		products = value;
	});

	const unsubscribeBalance = totalBalance.subscribe((value) => {
		balance = value;
	});

	const unsubscribeRefundMethod = refundMethod.subscribe((value) => {
		refundPreference = value === 'online' ? 'Online Credit' : 'Original Payment';
	});

	onDestroy(() => {
		unsubscribeProducts();
		unsubscribeBalance();
		unsubscribeRefundMethod();
	});
</script>

<div class="flex flex-col w-full h-full px-6 pb-16">
	<img src="/icons/success.svg" alt="success-icon" class="w-20 h-16 my-5" />
	<h2 class="font-zodiakBold text-[#000101] text-[32px] leading-10">
		Return<br />successfully initiated
	</h2>
	<h4 class="font-manrope text-[16px] font-normal">
		We've sent you an email with the return instructions and shipping label. Your refund will be
		processed within 3 days once we receive your return.
	</h4>
	<h2 class="text-[20px] font-zodiakBold mt-7">Apparel returned:</h2>
	<div class="flex flex-col h-full w-full">
		{#each products as product}
			<CardSuccess name={product.name} price={product.price} image={product.image} />
		{/each}
	</div>
	<div class="flex justify-between mt-[18px]">
		<h2 class="text-[22px] text-[#000101] font-zodiakBold">Total</h2>
		<h3 class="text-[22px] font-medium text-[#000101] font-manrope">${balance.toFixed(2)}</h3>
	</div>
	<span class="flex justify-end mr-[11px] text-[14px] font-light gap-2 mt-[23px] mb-[13px]">
		<span class="text-[#D9D9D9]">Refund preference:</span>
		<span class="text-[#000101]">{refundPreference}</span>
	</span>

	{#if refundPreference === 'Original Payment'}
		<div class="flex justify-end mr-[5px]">
			<img src="/icons/card-orange.svg" alt="icon-card" class="mr-3 ml-[17px]" />
			<h2 class="font-manrope font-semibold text-[12px]">AMEX -1001</h2>
		</div>
	{:else if refundPreference === 'Online Credit'}
		<div class="flex justify-end mr-[5px] gap-3">
			<h2 class="flex flex-col items-end font-manrope font-light text-[12px] mt-[2px]">
				Online Credit
			</h2>
		</div>
	{/if}
	
	<div class="flex justify-center">
		<div class="bg-vip-gradient flex flex-col mt-10 px-16 py-12  rounded-lg shadow-[6px 6px 10px 0px #000000] max-w-[410px]">
			<div class="flex justify-center px-9">
				<img src="/icons/logo.svg" alt="logo" />
			</div>	
			<div class="mt-14">
					<h2 class="text-[#FFFEFC] font-zodiakLight text-5xl leading-[42px]">VIP</h2>
					<h2 class="font-manrope font-extralight text-[#FFFEFC] text-xl tracking-widest">
						SHOPPING EXPERIENCE
					</h2>
				</div>
				<p class="text-[#FFFEFC] font-manrope font-extralight text-base mt-6">
					You're invited to a VIP shopping spree with early access and special perks. Claim your
					pass and step into luxury.
				</p>
				<button class="w-full bg-[#000101] text-[#FFF] h-[46px] rounded-[5px] font-manrope mt-12">
					Claim VIP Pass
				</button>
			</div>
		</div>
	</div>

<style>
	.bg-vip-gradient {
    background-image: radial-gradient(circle, #bebebd, #545454);
	}	
</style>
