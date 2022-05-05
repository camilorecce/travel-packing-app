<script>
    import { showStatus } from "../stores.js";
    import { createEventDispatcher } from "svelte";
    import CustomCheckbox from "./CustomCheckbox.svelte";
    import { blurOnKey } from "../util.js";

    export let item, categoryId, dnd;

    const dispatch = createEventDispatcher();

    let status, editable, editableInput;
    
    /* 
    showStatus.subscribe((value) => {
        status = value;
    }); 
    */

    $: console.log(status);

    $: visible = $showStatus == 'all' || ($showStatus == 'packed' && item.packed) || ($showStatus == 'unpacked' && !item.packed);

    const toggleEditable = (e) => {
        editable = e;
    }

    const deleteItem = () => {
        dispatch('deleteItem');
    }
</script>

{#if visible}
    <li>
        <div class="container">
            
            <CustomCheckbox bind:checked={item.packed} id={"checkbox-" + item.name}/>
            {#if !editable}
                <label class={(item.packed ? "packed" : "unpacked") + " label" } for={"checkbox-" + item.name} on:click={() => toggleEditable(true)} draggable="true" on:dragstart={(event) => dnd.drag(event, categoryId, item.id)} >
                    <!-- <input type="checkbox" bind:checked={item.packed} id={"checkbox-" + item.name} /> -->
                    {item.name}
                </label>
                {:else}
                <input type="text" class="editable-label" on:keydown={blurOnKey} on:blur={() => toggleEditable(false)} bind:value={item.name} bind:this={editableInput} >
            {/if}
            <button on:click={deleteItem}>
                x
            </button>
        </div>
    </li>    
{/if}


<style>
    .label {
        display: flex;
        width: 100%;
    }

    li {
        list-style: none;
    }

    button {
        height: 2em;
        width: 2em;
        margin-left: 16px;
        margin: 0px 16px;
    }

    input[type="checkbox"] {
        /* margin: auto 8px; */
        display: none;
    }

    label {
        margin: auto 0px;
        line-height: auto;
    }

    .container {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin: auto;
    }

    .packed {
        text-decoration: line-through;
        color: grey;
    }
</style>