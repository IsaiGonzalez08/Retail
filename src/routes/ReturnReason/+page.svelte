<script>
	import Header from '../components/Header.svelte';
	import { goto } from '$app/navigation';
	import { selectedProducts } from '../../stores/selectedProducts';
	import { onMount } from 'svelte';
	import Modal from '../components/modal.svelte';

	let products = [];
	let currentIndex = 0;
	let showModal = false;
	let selections = {};

	let touchStartX = 0;
	let touchEndX = 0;

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

	function handleTouchStart(event) {
		touchStartX = event.changedTouches[0].clientX;
	}

	function handleTouchMove(event) {
		touchEndX = event.changedTouches[0].clientX;
		if (touchEndX < touchStartX) {
			nextSlide();
		} else if (touchEndX > touchStartX) {
			prevSlide();
		}
	}

	function nextSlide() {
		if (currentIndex < products.length - 1) {
			currentIndex += 1;
			resetActiveButton();
		} else {
			navigateToRefund();
		}
	}

	function prevSlide() {
		currentIndex = (currentIndex - 1 + products.length) % products.length;
		resetActiveButton();
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

	function navigateToRefund() {
		updateProductReason();
		goto('../Refund');
	}

	function handleButtonClick(buttonId) {
		selections[currentIndex] = buttonId;
		updateProductReason();
	}

	function handleContinueClick() {
		if (currentIndex < products.length - 1) {
			nextSlide();
		} else {
			navigateToRefund();
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

	function resetActiveButton() {
		selections[currentIndex] = null;
	}
	$: isContinueButtonEnabled = allItemsSelected;
	$: allItemsSelected = products.length > 0 && products.every((_, index) => selections[index] !== undefined);
	$: isNextItemButtonEnabled = selections[currentIndex] !== undefined;
	$: buttonText = currentIndex === products.length - 1 ? 'Continue' : 'Next Item';
</script>

<div
	class="flex flex-col w-full h-full"
	on:touchstart={handleTouchStart}
	on:touchend={handleTouchMove}
>
	<Header />
	<div class="flex flex-col galaxy-z:px-1 custom:px-5 custom2:px-6 w-full h-full">
		<div class="flex flex-col justify-between w-full h-full">
			<div class="galaxy-z:px-2 custom:px-0">
				<h2 class="text-[#000101] text-[32px] font-zodiakBold">Specify your return reasons</h2>
				<h4 class="font-manrope text-[16px] font-normal">Choose any of the following reasons.</h4>
				{#if products.length > 0}
					<div class="flex flex-col items-center mt-8">
						<img
							src={products[currentIndex].image}
							alt={products[currentIndex].name}
							class="w-[176px] h-[176px]"
						/>
						<h2 class="text-[#000101] text-[18px] font-zodiakBold mt-4">
							{products[currentIndex].name}
						</h2>
					</div>
				{/if}
				<div class="flex gap-2 justify-center w-full mt-8">
					<button
						class={`${selections[currentIndex] === 1 ? 'bg-[#D46353] text-[#FFF]' : 'bg-[#FFF] border-[2px] border-[#D46353] hover:bg-[#ECB1A8] hover:text-[#FFF]'} flex items-center justify-center gap-3 w-1/2 h-[52px] rounded-[5px] text-[#000101] text-[14px] font-normal`}
						on:click={() => handleButtonClick(1)}
					>
						<img src={selections[currentIndex] === 1 ? '/FullScreen.svg' : '/size.svg'} alt="size-icon" />
						Size
					</button>
					<button
						class={`${selections[currentIndex] === 2 ? 'bg-[#D46353] text-[#FFF]' : 'bg-[#FFF] border-[2px] border-[#D46353] hover:bg-[#ECB1A8] hover:text-[#FFF]'} flex items-center justify-center gap-3 w-1/2 h-[52px] rounded-[5px] text-[#000101] text-[14px] font-normal`}
						on:click={() => handleButtonClick(2)}
					>
						<img src={selections[currentIndex] === 2 ? '/Target.svg' : '/damage.svg'} alt="damage-icon" />
						Damage
					</button>
				</div>
				<div class="flex mt-[8px] gap-2 justify-center w-full">
					<button
						class={`${selections[currentIndex] === 3 ? 'bg-[#D46353] text-[#FFF]' : 'bg-[#FFF] border-[2px] border-[#D46353] hover:bg-[#ECB1A8] hover:text-[#FFF]'} flex items-center justify-center gap-3 w-1/2 h-[52px] rounded-[5px] text-[#000101] text-[14px] font-normal`}
						on:click={() => handleButtonClick(3)}
					>
						<img src={selections[currentIndex] === 3 ? '/BarChart.svg' : '/quality.svg'} alt="quality-icon" />
						Quality
					</button>
					<button
						class={`${selections[currentIndex] === 4 ? 'bg-[#D46353] text-[#FFF]' : 'bg-[#FFF] border-[2px] border-[#D46353] hover:bg-[#ECB1A8] hover:text-[#FFF]'} flex items-center justify-center gap-3 w-1/2 h-[52px] rounded-[5px] text-[#000101] text-[14px] font-normal`}
						on:click={() => handleButtonClick(4)}
					>
						<img src={selections[currentIndex] === 4 ? '/change.svg' : '/Sad.svg'} alt="change-mind-icon" />
						Change Mind
					</button>
				</div>
				<div class="flex justify-center mt-6">
					{#each products as _, i}
						<button
							class={`w-2 h-2 rounded-full mx-1 ${currentIndex === i ? 'bg-[#D46353]' : 'bg-[#ECB1A8]'} transition-colors duration-300`}
							on:click={() => (currentIndex = i)}
						></button>
					{/each}
				</div>
			</div>
			<div class="flex flex-col items-center">
				<button
					on:click={handleContinueClick}
					class={`w-full h-[49px] ${isContinueButtonEnabled ? 'bg-[#000101]' : 'bg-gray-600'} rounded-[5px] font-manrope font-semibold text-lg mt-6 text-[#FFFEFC]`}
					disabled={!isContinueButtonEnabled}
				>
					{buttonText}
				</button>
				<button
					on:click={openModal}
					class="mb-[22px] mt-[20px] w-[54px] h-[20px] font-manrope font-bold text-[#000101] border-b-[1px] border-[#000101]"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
</div>

{#if showModal}
	<Modal {closeModal} {navigateToWelcome} />
{/if}
