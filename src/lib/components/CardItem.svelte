<script>
    export let name;
    export let price;
    export let image;
    export let togglePrice;
    export let isSelected = false; // Nueva propiedad

    function handleToggle(event) {
        if (event.target.checked) {
            togglePrice(price, true);
        } else {
            togglePrice(price, false);
        }
    }
</script>

<div class="flex items-center justify-start w-full h-[111px] border-b-[1px] border-[#E4E3E1]">
    <div class="flex items-start">
        <div class="relative">
            <input
                type="checkbox"
                on:change={handleToggle}
                checked={isSelected}
                class="customRadio"
            />
        </div>
    </div>
    <div class="flex items-center mx-[20px] w-[47px] h-[63px]">
        <img src={image} alt="img-item"/>
    </div>
    <div class="flex flex-col w-full">
        <div class="flex items-center w-full justify-between">
            <h3 class="text-[#000101] text-[18px] font-zodiakBold">{name}</h3>
            <h3 class="text-[#000101] text-[14px] font-zodiakBold">${price}.00</h3>
        </div>
        <span class="flex gap-[8px]">
            <h5 class="text-[#000101] font-medium font-manrope text-[12px]">Size</h5>
            <h5 class="font-manrope text-[#000101] font-light text-[12px]">Medium</h5>
        </span>
        <span class="flex gap-[8px]">
            <h5 class="text-[#000101] font-medium font-manrope text-[12px]">Quantity</h5>
            <h5 class="font-manrope text-[#000101] font-light text-[12px]">1</h5>
        </span>
    </div>
</div>

<style>
    .customRadio {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border-width: 1px;
        border-color: #D46353;
        background-color: #FFF;
        display: inline-block;
        position: relative;
        outline: none;
        cursor: pointer;
        transition:
            background-color 0.2s,
            border-color 0.2s;
    }

    .customRadio:checked {
        border-color: #D46353;
        background-color: #FFF;
    }

    .customRadio:checked::before {
        content: '';
        display: block;
        width: 9.6px;
        height: 9.6px;
        border-radius: 50%;
        background: #D46353;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .customRadio:disabled {
        cursor: not-allowed;
        background-color: #e0e0e0;
        border-color: #b5b3f1;
    }
</style>
