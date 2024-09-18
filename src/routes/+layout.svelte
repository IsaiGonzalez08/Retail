<script>
    import "../app.css";
    import Header from "$lib/components/Header.svelte"
    import { page } from "$app/stores";

    const routesWithoutHeader = ['/', '/Updating'];
</script>

{#if !routesWithoutHeader.includes($page.url.pathname)}
    <Header />
{/if}

<slot />
