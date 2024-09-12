<script>
	import Header from '../components/Header.svelte';
	import { goto } from '$app/navigation';
	import { selectedProducts } from '../../stores/selectedProducts';
	import { onMount } from 'svelte';
	import Modal from '../components/modal.svelte';
  
	let activeButton = null;
	let products = [];
	let currentIndex = 0;
	let showModal = false;
	let isContinueButtonEnabled = false;
  
	function handleClick(buttonId) {
	  activeButton = activeButton === buttonId ? null : buttonId;
	  isContinueButtonEnabled = activeButton !== null;
	}
  
	$: products = $selectedProducts;
  
	$: console.log("Productos seleccionados en el componente:", products);
  
	onMount(() => {
	  if (products.length === 0) {
		console.log("No hay productos seleccionados");
	  } else {
		console.log("Productos cargados:", products);
	  }
	});
  
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
	  goto('../Refund');
	}
  
	function nextSlide() {
	  currentIndex = (currentIndex + 1) % products.length;
	}
  
	function prevSlide() {
	  currentIndex = (currentIndex - 1 + products.length) % products.length;
	}
  
	function handleTouchStart(event) {
	  touchStartX = event.touches[0].clientX;
	}
  
	function handleTouchMove(event) {
	  touchEndX = event.changedTouches[0].clientX;
	  if (touchStartX - touchEndX > 50) {
		nextSlide();
	  } else if (touchStartX - touchEndX < -50) {
		prevSlide();
	  }
	}
  
	let touchStartX = 0;
	let touchEndX = 0;
  </script>
  
  <div
	class="flex flex-col w-full h-full"
	on:touchstart={handleTouchStart}
	on:touchend={handleTouchMove}
  >
	<Header />
	<div class="flex flex-col px-6 w-full h-full">
	  <div class="flex flex-col justify-between w-full h-full">
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
		<div>
		  <h2 class="text-[#000101] text-[32px] font-zodiakBold">
			Specify your return reasons
		  </h2>
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
			  on:click={() => handleClick(1)}
			  class={`${activeButton === 1 ? 'bg-[#D46353] text-[#FFF]' : 'bg-[#FFF] border-[2px] border-[#D46353] hover:bg-[#ECB1A8] hover:text-[#FFF]'} flex items-center justify-center gap-3 w-1/2 h-[52px] rounded-[5px] text-[#000101] text-[14px] font-normal`}
			>
			  <img src="/size.svg" alt="size-icon" />Size
			</button>
			<button
			  on:click={() => handleClick(2)}
			  class={`${activeButton === 2 ? 'bg-[#D46353] text-[#FFF]' : 'bg-[#FFF] border-[2px] border-[#D46353] hover:bg-[#ECB1A8] hover:text-[#FFF]'} flex items-center justify-center gap-3 w-1/2 h-[52px] rounded-[5px] text-[#000101] text-[14px] font-normal`}
			>
			  <img src="/damage.svg" alt="damage-icon" />Damage
			</button>
		  </div>
		  <div class="flex mt-[8px] gap-2 justify-center w-full">
			<button
			  on:click={() => handleClick(3)}
			  class={`${activeButton === 3 ? 'bg-[#D46353] text-[#FFF]' : 'bg-[#FFF] border-[2px] border-[#D46353] hover:bg-[#ECB1A8] hover:text-[#FFF]'} flex items-center justify-center gap-3 w-1/2 h-[52px] rounded-[5px] text-[#000101] text-[14px] font-normal`}
			>
			  <img src="/quality.svg" alt="quality-icon" />Quality
			</button>
			<button
			  on:click={() => handleClick(4)}
			  class={`${activeButton === 4 ? 'bg-[#D46353] text-[#FFF]' : 'bg-[#FFF] border-[2px] border-[#D46353] hover:bg-[#ECB1A8] hover:text-[#FFF]'} flex items-center justify-center gap-3 w-1/2 h-[52px] rounded-[5px] text-[#000101] text-[14px] font-normal`}
			>
			  <img src="/change.svg" alt="change-mind-icon" />Change Mind
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
			disabled={!isContinueButtonEnabled}
			on:click={navigateToRefund}
			class={`w-full h-[49px] ${isContinueButtonEnabled ? 'bg-[#000101]' : 'bg-gray-600'} rounded-[5px] font-manrope font-semibold text-lg mt-6 text-[#FFFEFC]`}
		  >
			Continue
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
  <Modal closeModal={closeModal} navigateToWelcome={navigateToWelcome} />
{/if}