<script>
    import Item from "./Item.svelte";
    import { createEventDispatcher } from "svelte";
    import { getUuid } from "../util";

    const dispatch = createEventDispatcher();

    export let category;

    $: items = category.items;
    $: title = category.name;
    $: packedItems = items.filter((item) => !item.packed);
    $: remaining = packedItems.length;
    $: total = items.length;

    let name = '';

    const deleteItem = (deletedItem) => {
        category.items = category.items.filter((item) => item.id != deletedItem.id);
        category = category;
    };

    const addItem = () => {
        let newItem = {
            name,
            packed: false,
            id: getUuid()
        }
        category.items = [...category.items, newItem];
        name = '';
    };

</script>

<h2>{title}</h2>
<span>{remaining} of {total} remaining</span>
<button type="button" id="delete" on:click={() => { dispatch('deleteCategory') }}>X</button>
<label for="item-name">
    Add item
    <input type="text" id="item-name" bind:value={name}>
</label>
<button type="button" id="add" on:click={addItem}>+</button>

<ul>
    {#each items as item}
            <Item bind:item on:deleteItem={() => deleteItem(item)} />
    {/each}
</ul>

<style>

</style>