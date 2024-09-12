<script>
    export let name;
    export let price;
    export let image;
</script>

<div class="w-full h-[115px] border-b-[1px] border-[#E4E3E1] flex gap-4 items-center px-5">
    <img src="{image}" alt="item" class="w-12 h-16">
    <div class="flex flex-col w-full">
        <div class="flex w-full justify-between">
            <h2 class="text-[#000101] font-zodiakBold text-[18px]">{name}</h2>
            <h2 class="text-[#000101] font-zodiakBold text-[14px]">${price}.00</h2>
        </div>
        <span class="flex gap-2 font-manrope text-[12px] mt-2">
            <span class="font-medium">Size</span>
            <span class="font-light">Medium</span>
        </span>
        <span class="flex gap-2 font-manrope text-[12px]">
            <span class="font-medium">Quantity</span>
            <span class="font-light">1</span>
        </span>
    </div>
</div>