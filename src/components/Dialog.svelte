<script>
    import dialogPolyfill from 'dialog-polyfill';
    import { createEventDispatcher, onMount } from 'svelte';

    export let title;
    export let dialog = null;

    const dispatch = createEventDispatcher();

    onMount(() => {
        dialogPolyfill.registerDialog(dialog);
    })

    function close() {
        dispatch('close');
        dialog.close();
    }
</script>

<dialog bind:this={dialog} class="dialog">
    <header>
        <div class="title">
            {title}
        </div>
        <button class="close-btn" on:click={close}>
            X
        </button>
    </header>
    <main>
        <slot />
    </main>
</dialog>

<style>
    .dialog {
        border: 2px solid #ff3e00;
    }

    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .title {

    }

    .close-btn {

    }


</style>