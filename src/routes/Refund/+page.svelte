<script>
	import { goto } from '$app/navigation';
	import { refundMethod } from '../../stores/index';
	import { onDestroy } from 'svelte';
	import { showModal } from '../../stores/index';

	let selectedCard = null;

	const unsubscribe = refundMethod.subscribe(value => {
		selectedCard = value;
	});

	onDestroy(() => {
		unsubscribe();
	});

	function openModal() {
		showModal.set(true);
	}

	function navigateToReview() {
		goto('../Review');
	}

	function selectCard(cardId) {
		selectedCard = cardId;
		refundMethod.set(cardId);
	}

	function handleButtonClick(cardId) {
		selectCard(cardId);
	}

	function handleKeyPress(event, cardId) {
		if (event.key === 'Enter' || event.key === ' ') {
			selectCard(cardId);
		}
	}
</script>

<div class="flex flex-col galaxy-z:px-1 custom:px-5 custom2:px-6 w-full h-[90vh] justify-between">
	<div class="flex flex-col w-full galaxy-z:px-2 custom:px-0">
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
		<div>
			<h2 class="text-[#000101] text-[32px] font-zodiakBold leading-10">
				Select your<br />refund method
			</h2>
			<h4 class="font-manrope text-[16px] font-normal">
				You can choose between the original payment method or online credit, which includes a $5 bonus.
			</h4>
			<button
				type="button"
				class={`flex items-center gap-[24px] mt-[16px] pl-[24px] w-full h-[110px] rounded-[5px] border-[1.5px] ${selectedCard === 'original' ? 'bg-[#D46353] border-[#D46353]' : 'bg-[#FFF] border-[#D46353]'}`}
				on:click={() => handleButtonClick('original')}
				on:keypress={(event) => handleKeyPress(event, 'original')}
				tabindex="0"
			>
				<input
					class="customRadio"
					type="radio"
					name="refund"
					id="original"
					value="original"
					checked={selectedCard === 'original'}
					on:change={() => selectCard('original')}
				/>
				<div class="ml-[16px]">
					<h2 class={`text-[16px] font-zodiakBold ${selectedCard === 'original' ? 'text-[#FFF]' : 'text-[#000101]'}`}>
						Original Payment
					</h2>
					<div class="flex gap-[12px] items-center mt-2">
						<img
							src={selectedCard === 'original' ? '/icons/icon-card.svg' : '/icons/card-orange.svg'}
							alt="card icon"
						/>
						<h2 class={`font-light text-[14px] ${selectedCard === 'original' ? 'text-[#FFF]' : 'text-[#000101]'}`}>
							AMEX -1001
						</h2>
					</div>
				</div>
			</button>
			<button
				type="button"
				class={`flex items-center gap-[24px] mt-[16px] pl-[24px] w-full h-[110px] rounded-[5px] border-[1.5px] ${selectedCard === 'online' ? 'bg-[#D46353] border-[#D46353]' : 'bg-[#FFF] border-[#D46353]'}`}
				on:click={() => handleButtonClick('online')}
				on:keypress={(event) => handleKeyPress(event, 'online')}
				tabindex="0"
			>
				<input
					class="customRadio"
					type="radio"
					name="refund"
					id="online"
					value="online"
					checked={selectedCard === 'online'}
					on:change={() => selectCard('online')}
				/>
				<div class="ml-[16px] text-start">
					<h2 class={`text-[16px] text-start font-zodiakBold ${selectedCard === 'online' ? 'text-[#FFF]' : 'text-[#000101]'}`}>
						Online Credit
					</h2>
					<span class={`text-[12px] text-start ${selectedCard === 'online' ? 'text-[#FFF]' : 'text-[#000101]'}`}>
						Enjoy a <span class="font-bold">$5 bonus credit</span> towards a future purchase with us
					</span>
				</div>
			</button>
		</div>
	</div>
	<div class="flex flex-col items-center mt-10">
		<button
			disabled={!selectedCard}
			on:click={navigateToReview}
			class="w-full h-[49px] text-[#FFFEFC] rounded-[5px] font-manrope font-semibold text-lg bg-[#000101] disabled:bg-[#6B7280] mt-6"
		>
			Review returns
		</button>
		<button
			on:click={openModal}
			class="mb-[22px] mt-[20px] w-[54px] h-[20px] font-manrope font-bold text-[#6B7280] border-b-[1px] border-[#6B7280]"
		>
			Cancel
		</button>
	</div>
</div>

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
		background-color: #fff;
		display: inline-block;
		position: relative;
		outline: none;
		cursor: pointer;
		transition: background-color 0.01s, border-color 0.01s;
	}

	.customRadio:checked {
		border-color: #000101;
		background-color: #d46353;
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
