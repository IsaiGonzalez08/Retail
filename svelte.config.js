import vercel from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';

export default {
  kit: {
    adapter: vercel(),
  },
  preprocess: [
  ],
  vite: {
    plugins: [sveltekit()],
  },
};
