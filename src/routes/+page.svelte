<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  function navigateToSign() {
    goto('../Sign');
  }
  
  const bgImages = [
    '/images/img-start-screen-option-1.png',
    '/images/img-start-screen-option-2.png',
    '/images/img-start-screen-option-3.png',
    '/images/img-start-screen-option-4.png',
    '/images/img-start-screen-option-5.png'
  ];
  
  let backgroundStyle = '';

  onMount(() => {
    const randomIndex = Math.floor(Math.random() * bgImages.length);
    const selectedImage = bgImages[randomIndex];
    backgroundStyle = `background-image: url(${selectedImage})`;
  });
</script>

<div 
  class="w-full h-screen bg-cover bg-center px-10 py-12"
  style={backgroundStyle}
>
  <div class="absolute inset-0 bg-black opacity-50"></div>
  <div class="relative z-10 flex flex-col justify-between w-full h-full">
    <div class="flex justify-center">
      <img src="/icons/logo.svg" alt="logo" class="w-[260px] h-[18px]">
    </div>
    <div class="flex flex-col gap-40">
      <div class="flex flex-col">
        <span class="flex flex-col text-[#FFFEFC]">
          <span class="text-7xl font-zodiakSemibold">Welcome</span>
          <span class="text-4xl font-zodiakRegular">to our returns process</span>
        </span>
        <h4 class="font-manrope text-[#FFFEFC] font-semibold text-base mt-8">Tap 'Get Started' and we'll <br> swiftly guide you through</h4>
      </div>
      <button 
        on:click={navigateToSign}
        class="w-full h-12 rounded-md bg-[#D46353] text-[#FFFEFC] font-manrope font-semibold text-lg leading-6">
        Get Started
      </button>
    </div>
  </div>
</div>
