<script>
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { selectedProducts } from '../../stores/index';
	import CardItem from '$lib/components/CardItem.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let showModal = false;
	let products = [];
	let localBalance = 0;
	let selectedItems = 0;
	export let data;

	console.log(data);

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	function navigateToWelcome() {
		goto('/');
	}

	function navigateToReturn() {
		goto('../ReturnReason');
	}

	const unsubscribe = selectedProducts.subscribe((value) => {
		products = value;
		selectedItems = products.length;
		localBalance = products.reduce((sum, p) => sum + p.price, 0);
	});

	onDestroy(() => {
		unsubscribe();
	});

	function togglePrice(price, isAdding, product) {
		const numericPrice = Number(price);
		if (isAdding) {
			localBalance += numericPrice;
			selectedProducts.update((products) => {
				const existingProduct = products.find((p) => p.name === product.name);
				if (existingProduct) {
					return products.map((p) =>
						p.name === product.name
							? { ...p, price: numericPrice, reason: existingProduct.reason }
							: p
					);
				} else {
					return [...products, { ...product, price: numericPrice, reason: null }];
				}
			});
			selectedItems++;
		} else {
			localBalance -= numericPrice;
			selectedProducts.update((products) => {
				const filteredProducts = products.filter((p) => p.name !== product.name);
				if (filteredProducts.length < products.length) {
					selectedItems--;
				}
				return filteredProducts;
			});
		}
	}

	function isSelected(productName) {
		return products.some((p) => p.name === productName);
	}
</script>

<div class="flex flex-col justify-between w-full h-screen ">
	<div class="galaxy-z:px-1 custom:px-5 custom2:px-6">
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
			<div class="w-11 h-[1.5px] bg-[#D9D9D9] mt-[-14px] ml-[-10px] mr-[-12px]" />
			<div class="flex flex-col">
				<div class="flex justify-center items-center">
					<div
						class="flex justify-center items-center bg-[#FFF] border-[#D9D9D9] border-[2px] w-[22px] h-[22px] rounded-full"
					>
						<div class="flex justify-center w-[7px] h-[7px] bg-[#FFF] rounded-full" />
					</div>
				</div>
				<h4
					class="font-manrope font-medium text-start galaxy-z:text-[6.8px] custom:text-[7px] custom2:text-[8px] text-[#D9D9D9] mt-[3px]"
				>
					Return Reason
				</h4>
			</div>
			<div class="w-11 h-[1.5px] bg-[#D9D9D9] mt-[-14px] ml-[-12px]" />
			<div class="flex flex-col">
				<div class="flex justify-center items-center">
					<div
						class="flex justify-center items-center bg-[#FFF] border-[#D9D9D9] border-[2px] w-[22px] h-[22px] rounded-full"
					>
						<div class="flex justify-center w-[7px] h-[7px] bg-[#FFF] rounded-full" />
					</div>
				</div>
				<h4
					class="font-manrope font-medium text-start galaxy-z:text-[6.8px] custom:text-[7px] custom2:text-[8px] text-[#D9D9D9] mt-[3px]"
				>
					Refund
				</h4>
			</div>
			<div class="w-11 h-[1.5px] bg-[#D9D9D9] mt-[-14px]" />
			<div class="flex flex-col">
				<div class="flex justify-center items-center">
					<div
						class="flex justify-center items-center bg-[#FFF] border-[#D9D9D9] border-[2px] w-[22px] h-[22px] rounded-full"
					>
						<div class="flex justify-center w-[7px] h-[7px] bg-[#FFF] rounded-full" />
					</div>
				</div>
				<h4
					class="font-manrope font-medium text-start galaxy-z:text-[6.8px] custom:text-[7px] custom2:text-[8px] text-[#D9D9D9] mt-[3px]"
				>
					Review
				</h4>
			</div>
		</div>
		<div class="flex flex-col w-full galaxy-z:px-2 custom:px-0">
			<h2 class="text-[#000101] text-[32px] font-zodiakBold">Select your items</h2>
			<h4 class="font-manrope font-normal text-base">
				You may select the items from this order that you’d like to return.
			</h4>
			<div class="min-h-[460x] max-h-[460px] overflow-y-scroll no-scrollbar">
				{#each data.items as item}
					<CardItem
						name={item.name}
						price={item.price}
						image={item.image}
						isSelected={isSelected(item.name)}
						togglePrice={(price, isAdding) => togglePrice(price, isAdding, item)}
					/>
				{/each}
			</div>
		</div>
	</div>
	<div class="shadow-top flex flex-col">
		<div class="flex items-center justify-between my-6 mx-6">
			<h2 class="text-[#000101] text-[24px] font-zodiakBold leading-[30px]">
				Total<br />Balance:
			</h2>
			<h2 class="text-[#000101] font-manrope text-[24px] font-medium leading-[30px]">
				${localBalance}.00
			</h2>
		</div>
		<div class="flex flex-col items-center gap-5 mx-6">
			<button
				disabled={selectedItems === 0}
				on:click={navigateToReturn}
				class="w-full h-[49px] text-[#FFFEFC] rounded-[5px] font-manrope font-semibold text-lg
						   bg-[#000101] disabled:bg-[#6B7280]"
			>
				Continue
			</button>
			<button
				on:click={openModal}
				class="w-[54px] h-[20px] font-manrope font-bold text-[#000101] border-b-[1px] border-[#000101] mb-8"
			>
				Cancel
			</button>
		</div>
	</div>
</div>

{#if showModal}
	<Modal {closeModal} {navigateToWelcome} />
{/if}

<style>
	.no-scrollbar::-webkit-scrollbar {
	  display: none;
	}
	.shadow-top {
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
  	}
</style>
