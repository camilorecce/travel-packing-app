<script>
    import { showStatus } from "../stores.js";
    import Category from "./Category.svelte";
    import Dialog from "./Dialog.svelte";
    import { blurOnKey, getUuid } from "../util";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let newCategoryName = '';
    let categories = [];
    let message = '';
    let dialog = null;
    let dnd = {
        drag: function(event, categoryId, itemId) {
            const data = { categoryId, itemId };
            event.dataTransfer.setData('text/plain', JSON.stringify(data));
        },
        drop: function(event, newCategoryId) {
            let { categoryId, itemId } = JSON.parse(event.dataTransfer.getData('text/plain'));
            let categoryIndex = categories.findIndex((category) => category.id === categoryId);
            let newCategoryIndex = categories.findIndex((category) => category.id === newCategoryId);

            let items = categories[categoryIndex].items;
            let itemIndex = items.findIndex((item) => item.id === itemId);
            let item = items.splice(itemIndex, 1);

            categories[newCategoryIndex].items.push(item);
            categories = categories;
        }
    }

    const addCategory = () => {
        if (!newCategoryName) return;

        if (categories.filter((category) => category.name == newCategoryName).length) {
            message = 'The category "' + newCategoryName + '" already exists.';
            dialog.showModal();
            return;
        } 

        let newCategory = {
            name: newCategoryName,
            items: [],
            id: getUuid()
        }
        categories = [...categories, newCategory];
        newCategoryName = '';
    };

    const addOnKeydown = (event) => {
        const { code } = event;
        if (code === 'Enter') addCategory();
    };

    const deleteCategory = (deletedCategory) => {
        if (deletedCategory.items.length) {
            message = 'The category "' + deletedCategory.name + '" is not empty.';
            dialog.showModal();
            return;
        }
        categories = categories.filter((cat) => cat.id != deletedCategory.id);
        categories = categories;
    };

    const clearChecks = () => {
        categories.forEach(cat => {
            cat.items.forEach(item => {
                item.packed = false;
            });
        });
        categories = categories;
    };

    const logOut = () => {
        dispatch('logout');
    };

    restore()
    $: if (categories) persist();

    function persist() {
        localStorage.setItem('travel-packing', JSON.stringify(categories));
    }

    function restore() {
        var item = localStorage.getItem('travel-packing');
        if (item && item !== {}) {
            categories = JSON.parse(item);
        }
    }
</script>

<div class="container">
    <div class="new-category">
        <label for="new-category">
            New Category
            <input type="text" id="new-category" bind:value={newCategoryName} on:keydown={addOnKeydown} >
        </label>
        <button class="button" id="add-category" disabled={!newCategoryName} on:click={addCategory}>Add</button>
    </div>

    <button on:click={logOut}>Log out</button>
    
    <p class="suggested">Suggested categories include: Backpack, Clothes, Last minute, Medicine and Toiletries.</p>
    
    <h5 class="subtitle">Show</h5>
    <div class="radio-row">
        <div class="radio-group">
            <label>
                <input type="radio" bind:group={$showStatus} name="status" value="all">
                All
            </label>
            <label>
                <input type="radio" bind:group={$showStatus} name="status" value="packed">
                Packed
            </label>
            <label>
                <input type="radio" bind:group={$showStatus} name="status" value="unpacked">
                Unpacked
            </label>
        </div>
        <button id="clear-all" on:click={clearChecks} >Clear all checks</button>
    </div>
    
    <div class="categories-container">
        {#each categories as category}
        <Category bind:category on:deleteCategory={() => deleteCategory(category)} on:persist={persist} dnd={dnd} />
        {/each}
    </div>
</div>

<Dialog title="Checklist" bind:dialog>
    {message}
</Dialog>


<style>
    .container {
        width: 40%;
        margin: auto;
    }

    .new-category {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .radio-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .radio-row {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        border: 1px #ff3e007a solid;
        padding: 10px;
    }

    #clear-all {
        height: fit-content;
        margin: auto;
        margin-right: 10px;
    }

    .subtitle {
        width: fit-content;
    }

    .suggested {
        font-size: .8em;
    }

</style>