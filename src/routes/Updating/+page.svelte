<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	const loadingTime = 4000;

	onMount(() => {
		setTimeout(() => {
			goto('/Succesfull');
		}, loadingTime);
	});
</script>

<div class="flex flex-col items-center justify-center w-full h-screen bg-[#D46353]">
    <div class="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    <h2 class="text-[#FFFEFC] font-semibold text-[32px]">Initiating return</h2>
    <h4 class="font-manrope text-[#FFFEFC] font-light text-[14px]">Updating your products</h4>
</div>