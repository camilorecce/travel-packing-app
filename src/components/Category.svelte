<script>
    import Item from "./Item.svelte";
    import Dialog from "./Dialog.svelte";
    import { createEventDispatcher } from "svelte";
    import { getUuid, blurOnKey } from "../util";

    const dispatch = createEventDispatcher();

    export let category;
    export let dnd;

    $: items = category.items;
    $: title = category.name;
    $: packedItems = items.filter((item) => !item.packed);
    $: remaining = packedItems.length;
    $: total = items.length;

    let name = '';
    let message = '';
    let dialog = null;

    const deleteItem = (deletedItem) => {
        category.items = category.items.filter((item) => item.id != deletedItem.id);
        category = category;
        dispatch('persist');
    };

    const addItem = () => {
        if (!name) return;
        
        if (items.filter((item) => item.name == name).length) {
            message = 'The item "' + name + '" already exists.';
            dialog.showModal();
            return;
        } 

        let newItem = {
            name,
            packed: false,
            id: getUuid()
        }

        category.items = [...category.items, newItem];
        name = '';
        dispatch('persist');
    };

    const addOnKeydown = (event) => {
        const { code } = event;
        if (code === 'Enter') addItem();
    }

</script>

<div class="container">
    <h2>{title}</h2>
    <div class="item-header">
        <span>{remaining} of {total} remaining</span>
        <button type="button" id="delete" on:click={() => { dispatch('deleteCategory') }}>X</button>
    </div>
    <div class="add-item">
        <label for="item-name">
            Add item
            <input type="text" id="item-name" bind:value={name} on:keydown={addOnKeydown}>
        </label>
        <button type="button" id="add" disabled={!name} on:click={addItem}>+</button>
    </div>
    
    <div class="items-container">
        <ul>
            {#each items as item}
                    <Item bind:item on:deleteItem={() => deleteItem(item)} categoryId={category.id} dnd={dnd}/>
            {/each}
        </ul>
    </div>
</div>
<Dialog title="Category" bind:dialog>
    {message}
</Dialog>

<style>
    .container {
        width: 100%;
        margin: auto;
    }

    h2 {
		color: #ff3e00;
		font-size: 2em;
        font-weight: 300;
        text-align: start;
	}
    
    span {
        text-align: start;
    }
    
    .item-header {
        text-align: start;
    }

    .items-container {
       
    }

    .items-container ul {
        margin: 0;
        padding: 0 10px;
    }

    .add-item {
        display: flex;
        flex-direction: row;
        justify-content: start;
    }
</style>