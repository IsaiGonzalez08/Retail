<script>
	export let closeModal;
	export let navigateToWelcome;
</script>

<div class="fixed inset-0 bg-opacity-50 bg-[#000101] flex items-center justify-center">
	<div class="w-[90vw] max-w-[400px] h-[35vh] max-h-[250px] bg-[#000101] rounded-lg p-4 md:w-[35.8vh] md:h-[36.1vh]">
		<div class="flex flex-col justify-between h-full">
			<div class="flex flex-col">
				<button on:click={closeModal} class="flex flex-col items-end">
					<img src="/icons/close.svg" alt="close" />
				</button>
				<h2 class="text-[#FFFEFC] font-zodiakBold text-2xl">
					Are you sure you<br />want to cancel?
				</h2>
				<h4 class="font-manrope text-[#FFFEFC] font-extralight text-xs mt-1">
					If you cancel, you will lose all your progress and the return will not be applied.
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
