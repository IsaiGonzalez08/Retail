<script>
	import Header from '../components/Header.svelte';
	import { goto } from '$app/navigation';
	import { refundMethod } from '../../stores/refundMethod';
	import Modal from '../components/modal.svelte';
  
	let showModal = false;
	let selectedCard = null;
  
	function openModal() {
	  showModal = true;
	}
  
	function closeModal() {
	  showModal = false;
	}
  
	function navigateToWelcome() {
	  goto('/');
	}
  
	function navigateToReview() {
	  goto('../Review');
	}
  
	function selectCard(cardId) {
		selectedCard = cardId;
		refundMethod.set(cardId);
	}
  </script>
  
  <div class="flex flex-col w-full h-screen">
	<Header />
	<div class="flex flex-col galaxy-z:px-1 custom:px-5 custom2:px-6 w-full h-full">
		<div class="flex items-center h-[36px] w-full mb-[24px] mt-8 justify-center">
			<div class="flex flex-col">
				<div class="flex items-center">
					<div
						class="flex justify-center items-center bg-[#FFF] border-[#D46353] border-[2px] w-[22px] h-[22px] rounded-full"
					>
						<div class="flex justify-center w-[7px] h-[7px] bg-[#D46353] rounded-full" />
					</div>
				</div>
				<h4 class="font-manrope font-medium text-start galaxy-z:text-[6.8px] custom:text-[7px] custom2:text-[8px] text-[#D46353] mt-[3px]">
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
				<h4 class="font-manrope font-medium text-start galaxy-z:text-[6.8px] custom:text-[7px] custom2:text-[8px] text-[#D46353] mt-[3px]">
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
				<h4 class="font-manrope font-medium text-start galaxy-z:text-[6.8px] custom:text-[7px] custom2:text-[8px] text-[#D46353] mt-[3px]">
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
				<h4 class="font-manrope font-medium text-start galaxy-z:text-[6.8px] custom:text-[7px] custom2:text-[8px] text-[#D46353] mt-[3px]">
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
				<h4 class="font-manrope font-medium text-start galaxy-z:text-[6.8px] custom:text-[7px] custom2:text-[8px] text-[#D9D9D9] mt-[3px]">
					Review
				</h4>
			</div>
		</div>
	  <div class="flex flex-col w-full h-full justify-between galaxy-z:px-2 custom:px-0">
		<div>
		  <h2 class="text-[#000101] text-[32px] font-zodiakBold leading-10">
			Select your<br />refund method
		  </h2>
		  <h4 class="font-manrope text-[16px] font-normal">
			You can choose between the original payment method or online credit, which includes a $5 bonus.
		  </h4>
		  <div
			class={`flex items-center gap-[24px] mt-[16px] pl-[24px] w-full h-[110px] rounded-[5px] border-[1.5px] ${selectedCard === 'original' ? 'bg-[#D46353] border-[#D46353]' : 'bg-[#FFF] border-[#D46353]'}`}
		  >
			<input class="customRadio" type="radio" name="refund" id="original" value="original" on:change={() => selectCard('original')} />
			<div class="flex flex-col gap-[8px]">
			  <h2 class={`text-[16px] font-zodiakBold ${selectedCard === 'original' ? 'text-[#FFF]' : 'text-[#000101]'}`}>Original Payment</h2>
			  <div class="flex gap-[12px] items-center">
				<img src={selectedCard === 'original' ? '/icon-card.svg' : '/card-orange.svg'} alt="card icon" />
				<h2 class={`font-light text-[14px] ${selectedCard === 'original' ? 'text-[#FFF]' : 'text-[#000101]'}`}>AMEX -1001</h2>
			  </div>
			</div>
		  </div>
		  <div
			class={`flex items-center gap-[24px] mt-[16px] pl-[24px] w-full h-[110px] rounded-[5px] border-[1.5px] ${selectedCard === 'online' ? 'bg-[#D46353] border-[#D46353]' : 'bg-[#FFF] border-[#D46353]'}`}
		  >
			<input class="customRadio" type="radio" name="refund" id="online" value="online" on:change={() => selectCard('online')} />
			<div class="flex flex-col gap-[8px]">
			  <h2 class={`text-[16px] font-zodiakBold ${selectedCard === 'online' ? 'text-[#FFF]' : 'text-[#000101]'}`}>Online Credit</h2>
			  <span class={`text-[12px] ${selectedCard === 'online' ? 'text-[#FFF]' : 'text-[#000101]'}`}>
				Enjoy a <span class="font-bold">$5 bonus credit</span> towards a future purchase with us
			  </span>
			</div>
		  </div>
		</div>
		<div class="flex flex-col items-center mt-10">
		  <button
		  	disabled={!selectedCard}
			on:click={navigateToReview}
			class="w-full h-[49px] text-[#FFFEFC] rounded-[5px] font-manrope font-semibold text-lg bg-[#000101] disabled:bg-[#6B7280] mt-6"
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

  <style>
	.customRadio {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		border-width: 1px;
		border-color: #000101;
		background-color: #FFF;
		display: inline-block;
		position: relative;
		outline: none;
		cursor: pointer;
		transition:
			background-color 0.01s,
			border-color 0.01s;
	}

	.customRadio:checked {
		border-color: #000101;
		background-color: #D46353;
	}

	.customRadio:checked::before {
		content: '';
		display: block;
		width: 9.6px;
		height: 9.6px;
		border-radius: 50%;
		background: #000101;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.customRadio:disabled {
		cursor: not-allowed;
		background-color: #e0e0e0;
		border-color: #b5b3f1;
	}
</style>

  
  