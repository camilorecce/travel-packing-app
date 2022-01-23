import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Travel packing app'
	}
});

export default app;