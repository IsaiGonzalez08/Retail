import { writable } from 'svelte/store';

export const selectedProducts = writable([]); 
export const totalBalance = writable(0);
export const productSelections = writable({});
