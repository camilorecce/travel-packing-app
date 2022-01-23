<script>
    import { showStatus } from "../stores.js";
    import Category from "./Category.svelte";
    import { getUuid } from "../util";

    let newCategoryName;
    let categories = [];

    const addCategory = () => {
        let newCategory = {
            name: newCategoryName,
            items: [],
            id: getUuid()
        }
        categories = [...categories, newCategory];
        newCategoryName = '';
    };

    const deleteCategory = (deletedCategory) => {
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
    }

</script>

<label for="new-category">
    New Category
    <input type="text" id="new-category" bind:value={newCategoryName}>
</label>
<button id="add-category" on:click={addCategory}>Add</button>

<p>Suggested categories include: Backpack, Clothes, Last minute, Medicine and Toiletries.</p>

<div>
    <span>Show</span>
    <label>
        All
        <input type="radio" bind:group={$showStatus} name="status" value="all">
    </label>
    <label>
        Packed
        <input type="radio" bind:group={$showStatus} name="status" value="packed">
    </label>
    <label>
        Unpacked
        <input type="radio" bind:group={$showStatus} name="status" value="unpacked">
    </label>
    <button id="clear-all" on:click={clearChecks} >Clear all checks</button>
</div>

<div>
    {#each categories as category}
    <Category bind:category on:deleteCategory={() => deleteCategory(category)}/>
    {/each}
</div>

<style>

</style>