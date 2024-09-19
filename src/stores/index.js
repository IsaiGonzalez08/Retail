import { writable } from 'svelte/store';

export const orderNumberStore = writable('');
export const selectedProducts = writable([]); 
export const totalBalance = writable(0);
export const productSelections = writable({});
export const refundMethod = writable(null);
export let showModal = writable(false);