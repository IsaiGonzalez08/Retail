<script>
	import Header from '../components/Header.svelte';
	import CardItem from './components/CardItem.svelte';
	import { goto } from '$app/navigation';
	import { selectedProducts } from '../../stores/selectedProducts';
	import { balance as balanceStore } from '../../stores/balance';
	import Modal from '../components/modal.svelte';

	let showModal = false;
	let localBalance = 0;
	let selectedItems = 0;

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

	function togglePrice(price, isAdding, product) {
		if (isAdding) {
			localBalance += Number(price);
			balanceStore.update(b => b + Number(price));
			selectedProducts.update(products => {
				const existingProduct = products.find(p => p.name === product.name);
				if (existingProduct) {
					return products.map(p => p.name === product.name ? { ...p, price: Number(price) } : p);
				} else {
					return [...products, { ...product, price: Number(price) }];
				}
			});
			selectedItems++;
		} else {
			localBalance -= Number(price);
			balanceStore.update(b => b - Number(price));
			selectedProducts.update(products => {
				return products.filter(p => p.name !== product.name);
			});
			selectedItems--;
		}
	}
</script>

<div class="flex flex-col w-full h-full">
	<Header />
	<div class="flex flex-col px-6 w-full h-full">
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
			<div class="w-[42px] h-[1.5px] bg-[#D9D9D9] mb-3 ml-[-10px]"></div>
			<div class="flex flex-col ml-[-10px]">
				<div class="flex items-center justify-center">
					<div
						class="flex justify-center items-center bg-[#FFF] border-[#D9D9D9] border-[2px] w-[22px] h-[22px] rounded-full"
					>
						<div class="flex justify-center w-[7px] h-[7px] bg-[#FFF] rounded-full" />
					</div>
				</div>
				<h4 class="font-manrope font-medium text-start text-[8px] text-[#D9D9D9] mt-[3px]">
					Return Reason
				</h4>
			</div>
			<div class="w-[42px] h-[1.5px] bg-[#D9D9D9] mb-3 ml-[-10px]"></div>
			<div class="flex flex-col ml-1">
				<div class="flex items-center justify-center">
					<div
						class="flex justify-center items-center bg-[#FFF] border-[#D9D9D9] border-[2px] w-[22px] h-[22px] rounded-full"
					>
						<div class="flex justify-center w-[7px] h-[7px] bg-[#FFF] rounded-full" />
					</div>
				</div>
				<h4 class="font-manrope font-medium text-start text-[8px] text-[#D9D9D9] mt-[3px]">
					Refund
				</h4>
			</div>
			<div class="w-[42px] h-[1.5px] bg-[#D9D9D9] mb-3 ml-1"></div>
			<div class="flex flex-col ml-1">
				<div class="flex items-center justify-center">
					<div
						class="flex justify-center items-center bg-[#FFF] border-[#D9D9D9] border-[2px] w-[22px] h-[22px] rounded-full"
					>
						<div class="flex justify-center w-[7px] h-[7px] bg-[#FFF] rounded-full" />
					</div>
				</div>
				<h4 class="font-manrope font-medium text-start text-[8px] text-[#D9D9D9] mt-[3px]">
					Review
				</h4>
			</div>
		</div>
		<div class="flex flex-col h-full w-full justify-between">
			<div>
				<h2 class="text-[#000101] text-[32px] font-zodiakBold">Select your items</h2>
				<h4>You may select the items from this order that you’d like to return.</h4>
				<CardItem name="Crochet Cardigan" price="148" image="/image1.png" togglePrice={(price, isAdding) => togglePrice(price, isAdding, { name: "Crochet Cardigan", image: "/image1.png" })} />
				<CardItem name="Blue Cardigan" price="198" image="/image2.png" togglePrice={(price, isAdding) => togglePrice(price, isAdding, { name: "Blue Cardigan", image: "/image2.png" })} />
				<CardItem name="Mohair Cardigan" price="148" image="/image3.png" togglePrice={(price, isAdding) => togglePrice(price, isAdding, { name: "Mohair Cardigan", image: "/image3.png" })} />
				<CardItem name="Pleated shorts" price="148" image="/image4.png" togglePrice={(price, isAdding) => togglePrice(price, isAdding, { name: "Pleated shorts", image: "/image4.png" })} />
				<div class="flex items-center justify-between mt-6">
					<h2 class="text-[#000101] text-[24px] font-zodiakBold leading-[30px]">
						Total<br />Balance:
					</h2>
					<h2 class="text-[#000101] font-manrope text-[24px] font-medium leading-[30px]">${localBalance}</h2>
				</div>
			</div>
			<div class="flex flex-col items-center">
				<button
					disabled={selectedItems === 0}
					on:click={navigateToReturn}
					class="w-full h-[49px] text-[#FFFEFC] rounded-[5px] font-manrope font-semibold text-lg
			  			 bg-[#000101] disabled:bg-[#6B7280] mt-6"
				>
					Continue
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
