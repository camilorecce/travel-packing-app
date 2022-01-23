<script>
	import Login from "./components/Login.svelte";
	import Item from "./components/Item.svelte";
	import Category from "./components/Category.svelte";
	import Checklist from "./components/Checklist.svelte";

	export let name;
</script>

<main>
	<h1>{name}</h1>
	<!-- <Login /> -->
	<!-- <Item item={{name:'sarasa', packed:true}} /> -->
	<!-- <Category bind:items category={{title: 'Verduras'}} /> -->
	<Checklist />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>