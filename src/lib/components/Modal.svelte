<script>
	export let closeModal;
	export let navigateToWelcome;
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
	<div class="w-[35.8vh] h-[36.1vh] bg-black rounded-lg p-4">
		<div class="flex flex-col justify-between h-full">
			<div class="flex flex-col">
				<button on:click={closeModal} class="flex flex-col items-end">
					<img src="/close.svg" alt="close" />
				</button>
				<h2 class="text-[#FFFEFC] font-zodiakBold text-[24px]">
					Are you sure you<br />want to cancel?
				</h2>
				<h4 class="text-[#FFFEFC] font-light text-[12px] mt-1">
					If you cancel, you will lose all your progress<br />and the return will not be applied.
				</h4>
			</div>
			<div class="flex justify-center w-full mb-5">
				<button
					on:click={navigateToWelcome}
					class="text-[#FFFEFC] font-manrope font-medium text-base bg-[#D46353] rounded-[5px] h-[39px] w-full"
					>Yes, cancel</button
				>
			</div>
		</div>
	</div>
</div>
