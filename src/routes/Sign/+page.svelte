<script>
	import { goto } from '$app/navigation';
	import { orderNumberStore } from '../../stores/index';
	import Popup from '$lib/components/Popup.svelte';
	import { showModal } from '../../stores/index';

	let showPopup = false;


	function openPopup() {
		showPopup = true;
	}

	function closePopup() {
		showPopup = false;
	}

	function openModal() {
   	 showModal.set(true);
  	}

	let email = '';
	let orderNumber = '';

	function isValidEmail(email) {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	}

	function isValidOrderNumber(orderNumber) {
		return orderNumber.length === 8;
	}

	$: isButtonDisabled = !isValidEmail(email) || !isValidOrderNumber(orderNumber);

	function handleOrderNumberInput(event) {
		const input = event.target;
		let value = input.value;

		value = value.replace(/\D/g, '');

		if (value.length > 8) {
			value = value.slice(0, 8);
		}

		input.value = value;
		orderNumber = value;
	}

	function navigateToItems() {
		orderNumberStore.set(orderNumber);
		goto('../SelectItems');
	}
</script>

<div class="flex flex-col w-full h-[90vh] galaxy-z:px-1 custom:px-5 custom2:px-6">
	<div class="flex justify-center items-center h-[36px] w-full gap-[6px] mt-6 mb-6">
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
		<div class="w-11 h-[1.5px] bg-[#D9D9D9] mt-[-14px] mr-[-10px]"/>
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
				Select items
			</h4>
		</div>
		<div class="w-11 h-[1.5px] bg-[#D9D9D9] mt-[-14px] ml-[-10px] mr-[-12px]"/>
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
		<div class="w-11 h-[1.5px] bg-[#D9D9D9] mt-[-14px] ml-[-12px]"/>
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
		<div class="w-11 h-[1.5px] bg-[#D9D9D9] mt-[-14px]"/>
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
	<div class="flex flex-col justify-between h-full">
		<div class="flex flex-col gap-8">
			<div>
				<h2 class="text-[#000101] text-[32px] font-zodiakBold">Look up order</h2>
				<h4 class="font-manrope text-[16px] font-normal leading-[21.86px]">
					Please enter the email address associated with your purchase and the 8-digit order number you
					received.
				</h4>
			</div>
			<div>
				<div class="flex gap-2 items-center">
					<img src="/icons/email.svg" alt="logo-email" />
					<h4 class="font-normal text-sm">Email</h4>
				</div>
				<input
					type="email"
					bind:value={email}
					class="border-b-[1px] border-[#000101] w-full h-[47px] pl-[12px] placeholder:text-[#6B7280] appearance-none outline-none"
					placeholder="foo@example.com"
				/>
			</div>
			<div>
				<div class="flex gap-2 items-center">
					<img src="/icons/order-fill.svg" alt="logo-order" />
					<h4 class="font-normal text-sm">Order confirmation</h4>
					<button on:click={openPopup}><img src="/icons/Info.svg" alt="info-icon" class="w-4" /></button>
				</div>
				<input
					type="text"
					bind:value={orderNumber}
					on:input={handleOrderNumberInput}
					class="border-b-[1px] border-[#000101] w-full h-[47px] pl-[12px] placeholder:text-[#6B7280] appearance-none outline-none"
					placeholder="8-digit number"
				/>
			</div>
		</div>
		<div class="flex flex-col justify-start items-center gap-5 galaxy-z:px-2 custom:px-0">
			<button
				on:click={navigateToItems}
				class="w-full h-[49px] text-[#FFFEFC] rounded-[5px] font-manrope font-semibold text-lg
						  bg-[#000101] disabled:bg-[#6B7280]"
				disabled={isButtonDisabled}
			>
				Look up order
			</button>
			<button
				on:click={openModal}
				class="w-[54px] h-[20px] font-manrope font-bold text-[#6B7280] border-b-[1px] border-[#6B7280]"
				>Cancel
			</button>
		</div>
	</div>	
</div>

<Popup visible={showPopup} {closePopup}>
	<div class="flex justify-end">
		<button on:click={closePopup}
			><img class="flex justify-end cursor-pointer" src="/icons/close.svg" alt="close-icon" /></button
		>
	</div>
	<h2 class="font-zodiak text-[#FFFEFC] text-[32px] font-zodiakBold">
		Where to find your order confirmation number
	</h2>
	<p class="mt-2 font-manrope text-[#FFFEFC] text-[16px] font-normal">
		Please enter the email confirmation you received and copy the 8-digit order number.
	</p>
	<div class="flex justify-center mt-5">
		<img src="/images/Ticket.png" alt="ticket-img" />
	</div>
</Popup>

