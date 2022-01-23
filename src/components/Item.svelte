<script>
    import { showStatus } from "../stores.js";
    import { createEventDispatcher } from "svelte";
    export let item;

    const dispatch = createEventDispatcher();

    let status;
    
    /* 
    showStatus.subscribe((value) => {
        status = value;
    }); 
    */

    $: console.log(status);

    $: visible = $showStatus == 'all' || ($showStatus == 'packed' && item.packed) || ($showStatus == 'unpacked' && !item.packed)

    const deleteItem = () => {
        dispatch('deleteItem');
    }
</script>

{#if visible}
    <li>
        <div class="container">
            <input type="checkbox" bind:checked={item.packed} id={"checkbox-" + item.name} />
        
            <label class={item.packed ? "packed" : "unpacked"} for={"checkbox-" + item.name} >
                {item.name}
            </label>
            <button on:click={deleteItem}>
                X
            </button>
        </div>
    </li>    
{/if}


<style>
    li {
        list-style: none;
    }

    button {
        height: 2em;
        width: 2em;
        margin-left: 16px;
        align-content: center;
        margin: 0px 16px;
    }

    input[type="checkbox"] {
        margin: auto 8px;
    }

    label {
        margin: auto 0px;
        line-height: auto;
    }

    .container {
        display: flex;
        flex-direction: row;
        width: 50%;
        margin: auto;
    }

    .packed {
        text-decoration: line-through;
        color: grey;
    }
</style>