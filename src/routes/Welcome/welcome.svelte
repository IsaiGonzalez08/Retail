<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  function navigateToSign() {
    goto('../Sign');
  }

  const bgImages = [
    '/img-start-screen-option-1.png',
    '/img-start-screen-option-2.png',
    '/img-start-screen-option-3.png',
    '/img-start-screen-option-4.png',
    '/img-start-screen-option-5.png'
  ];

  let selectedImage;

  onMount(() => {
    const randomIndex = Math.floor(Math.random() * bgImages.length);
    selectedImage = bgImages[randomIndex];
  });
</script>

<div class="relative flex flex-col justify-around w-full h-screen bg-cover bg-center items-center px-10" style="background-image: url({selectedImage})">
  <div class="absolute inset-0 bg-black opacity-50"></div>
  <div class="relative z-10 flex flex-col justify-around w-full h-full">
      <div class="flex justify-center">
        <img src="/logo.svg" alt="Logo-welcome" class="w-72 h-5"/>
      </div>
      <span class="w-full text-[#FFFEFC]">
          <span class="font-zodiak leading-[50px]">
              <h1 class="text-[64px] font-zodiakBold">Welcome</h1>
              <h3 class="text-[28px] font-zodiakRegular">to our returns process</h3>
          </span>
          <h4 class="font-manrope font-semibold">Tap 'Get Started' and we'll swiftly <br> guide you through</h4>
      </span>
      <div class="w-full">
          <button on:click={navigateToSign} class="w-full h-[49px] bg-[#DA6353] text-[#FFFEFC] rounded-[5px] font-manrope font-semibold text-lg">
              Get Started
          </button>
      </div>
  </div>
</div>
