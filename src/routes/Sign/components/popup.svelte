<script>
    import { fly } from 'svelte/transition';
    export let visible = false;
    export let closePopup;
  </script>
  
  <!-- Estilos de Tailwind -->
  <style>
    .popup-enter {
      opacity: 0;
    }
  
    .popup-enter-active {
      opacity: 1;
      transition: opacity 300ms ease-out;
    }
  
    .popup-leave {
      opacity: 1;
    }
  
    .popup-leave-active {
      opacity: 0;
      transition: opacity 300ms ease-in;
    }
  </style>
  
  {#if visible}
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40" on:click={closePopup}></div>
  
    <div
      class="fixed bottom-0 left-0 right-0 bg-[#D46353] pt-8 px-8 rounded-t-lg shadow-lg z-50 transform transition-all duration-300 ease-out"
      in:fly="{{ y: 200, duration: 300 }}"
      out:fly="{{ y: 200, duration: 300 }}"
    >
      <slot></slot>
    </div>
  {/if}
  