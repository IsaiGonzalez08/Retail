<script>
	import '../app.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
    import { showModal } from '../stores/index'
	import Header from '$lib/components/Header.svelte';
	import Modal from '$lib/components/Modal.svelte';

	const routesWithoutModal = ['/', '/Updating'];
    const routesWithoutHeader = ['/', '/Updating'];

	function closeModal() {
		showModal.set(false);
	}

	function navigateToWelcome() {
		goto('/');
	}

</script>

{#if !routesWithoutHeader.includes($page.url.pathname)}
	<Header />
{/if}

{#if !routesWithoutModal.includes($page.url.pathname)}
	{#if $showModal}
		<Modal {closeModal} {navigateToWelcome} />
	{/if}
{/if}

<slot />
