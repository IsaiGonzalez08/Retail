<script>
    import { fly } from 'svelte/transition';
    export let visible = false;
  </script>
  
  {#if visible}
    <div
      class="fixed bottom-0 left-0 right-0 bg-[#D46353] pt-8 px-8 rounded-t-lg shadow-lg z-50 transform transition-all duration-300 ease-out"
      in:fly="{{ y: 200, duration: 300 }}"
      out:fly="{{ y: 200, duration: 300 }}"
    >
      <slot></slot>
    </div>
  {/if}
  