<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { productSelections, selectedProducts, showModal } from '../../stores/index';

	let products = [];
	let currentIndex = 0;
	let selections = {};
	export let data;


	onMount(() => {
		selectedProducts.subscribe((value) => {
			products = value;
			if (products.length === 0) {
				console.log('No hay productos seleccionados');
			} else {
				console.log('Productos cargados:', products);
			}
		});
	});

	function nextSlide() {
		if (currentIndex < products.length - 1) {
			currentIndex += 1;
		} else {
			navigateToRefund();
		}
	}

	function openModal() {
		showModal.set(true)
	}

	function navigateToRefund() {
		updateProductReason();
		goto('../Refund');
	}

	function handleButtonClick(buttonId) {
		selections[currentIndex] = buttonId;
		productSelections.set(selections);
		updateProductReason();
	}

	function handleContinueClick() {
		if (isNextItemButtonEnabled) {
			if (currentIndex < products.length - 1) {
				nextSlide();
			} else {
				navigateToRefund();
			}
		}
	}

	function updateProductReason() {
		selectedProducts.update((products) => {
			return products.map((product, index) => {
				if (index === currentIndex) {
					return {
						...product,
						reason: selections[index] ? getReasonById(selections[index]) : product.reason
					};
				}
				return product;
			});
		});
	}

	function getReasonById(buttonId) {
		switch (buttonId) {
			case 1:
				return 'Size';
			case 2:
				return 'Damage';
			case 3:
				return 'Quality';
			case 4:
				return 'Change Mind';
			default:
				return 'Desconocida';
		}
	}

	$: isNextItemButtonEnabled = selections[currentIndex] !== undefined;
	$: isContinueButtonEnabled =
		products.length > 0 && products.every((_, index) => selections[index] !== undefined);
	$: buttonText = currentIndex === products.length - 1 ? 'Continue' : 'Next Item';
</script>

<div
	class="flex flex-col w-full h-[92vh] galaxy-z:overflow-y-hidden galaxy-z:px-1 custom:px-5 custom2:px-6 custom2:block"
>
	<div class="flex justify-center items-center h-[36px] w-full gap-[6px] mt-8 mb-6 galaxy-z:px-2 custom:px-0">
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
	<h2 class="text-[#000101] text-[32px] font-zodiakBold">Specify your return reasons</h2>
	<h4 class="font-manrope text-[16px] font-normal">Choose any of the following reasons.</h4>
	{#if products.length > 0}
		<div class="flex flex-col items-center mt-8">
			<img src={products[currentIndex].image} alt={products[currentIndex].name} class="w-44 h-44" />
			<h2 class="text-[#000101] text-[18px] font-zodiakBold mt-4">
				{products[currentIndex].name}
			</h2>
		</div>
	{/if}
	<div class="flex flex-wrap gap-2 justify-between w-full mt-8">
		{#each data.buttons as button}
			<button
				class={`${selections[currentIndex] === button.id ? 'bg-[#D46353] text-[#FFF]' : 'bg-[#FFF] border-[2px] border-[#D46353] hover:bg-[#ECB1A8] hover:text-[#FFF]'} flex items-center justify-center gap-3 w-[48%] h-[52px] rounded-[5px] text-[#000101] text-[14px] font-normal`}
				on:click={() => handleButtonClick(button.id)}
			>
				<img
					src={selections[currentIndex] === button.id ? button.activeIcon : button.icon}
					alt={`${button.name}-icon`}
				/>
				{button.name}
			</button>
		{/each}
	</div>
	<div class="flex justify-center mt-6">
		{#each products as _, i}
			<div
				class={`w-2 h-2 rounded-full mx-1 ${currentIndex === i ? 'bg-[#D46353]' : 'bg-[#ECB1A8]'} transition-colors duration-300`}
			></div>
		{/each}
	</div>
	<div class="flex flex-col items-center">
		<button
			on:click={handleContinueClick}
			class={`w-full h-[49px] ${isNextItemButtonEnabled ? 'bg-[#000101]' : 'bg-gray-600'} rounded-[5px] font-manrope font-semibold text-lg mt-6 text-[#FFFEFC]`}
			disabled={!isNextItemButtonEnabled}
		>
			{buttonText}
		</button>
		<button
			on:click={openModal}
			class="mt-[20px] w-[54px] h-[20px] font-manrope font-bold text-gray-600 border-b-[1px] border-gray-600"
		>
			Cancel
		</button>
	</div>
</div>