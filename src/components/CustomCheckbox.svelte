<script>
    export let checked;
    export let id;

    const onClick = () => {
        checked = !checked
    }

</script>

<div class="container" on:click={onClick}>
    <input type="checkbox" bind:checked id={id}/>
    <span class="custom-checkbox"></span>
</div>

<style>

    .container {
        margin: auto 10px;
    }

    .container input {
        display: none;
    }

    .custom-checkbox {
        display: block;
        top: 0;
        left: 0;
        position: relative;
        height: 16px;
        width: 16px;
        border: 2px solid lightgray;
       
    }

    input:checked ~ .custom-checkbox {
        background-color: lightgray;
        border: 2px solid #ff3e00
    }

    .custom-checkbox::after {
        display: none;
        content: "";
    }

    input:checked ~ .custom-checkbox::after {
        display: block;
    }

    .container .custom-checkbox::after {
        position: relative;
        left: 4px;
        top: 0;
        width: 5px;
        height: 10px;
        border: solid #ff3e00;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

</style>