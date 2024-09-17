<script>
    export let name;
    export let price;
    export let image;
    export let reason;
    export let deleteItem;
  </script>
  
  <div class="flex items-center justify-start w-full h-[145px] border-b-[1px] border-[#E4E3E1]">
    <div class="flex items-start">
      <button on:click={deleteItem}>
        <img src="/trash.svg" alt="trash-icon" class="w-[30px] h-[30px]">
      </button>
    </div>
    <div class="flex items-center min-w-[48px] min-h-[64px] mx-[20px]">
      <img src={image} alt="img-item" class="w-[73px] h-[75px]">
    </div>
    <div class="flex flex-col w-full">
      <div class="flex items-center w-full justify-between">
        <h3 class="text-[#000101] text-[18px] font-zodiakBold">{name}</h3>
        <h3 class="text-[#000101] text-[14px] font-zodiakBold">${price}.00</h3>
      </div>                
      <span class="flex gap-[8px] mt-[8px]">
        <h5 class="text-[#000101] font-medium font-manrope text-[12px]">Size</h5>
        <h5 class="font-manrope text-[#000101] font-light text-[12px]">Medium</h5>
      </span>
      <span class="flex gap-[8px]">
        <h5 class="text-[#000101] font-medium font-manrope text-[12px]">Quantity</h5>
        <h5 class="font-manrope text-[#000101] font-light text-[12px]">1</h5>
      </span>
      <span class="flex mt-[20px]">
        <h2 class="text-[#D46353] font-bold text-[14px]">Reason:</h2>
        <h3 class="text-[#000] font-light text-[14px] ml-2">{reason}</h3>
      </span>
    </div>
  </div>
  