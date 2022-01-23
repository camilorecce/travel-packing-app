<script>
    let username;
    let password;

    const login = () => {};
    const signup = () => { alert('Signed Up!') };
</script>

<form on:submit|preventDefault={login}>
    <div class="container">
        <div class="login-container">
            <div id="labels-container" class="form-div">
                <label for="name">
                    Username:
                </label>
                
                <label for="password">
                    Password:
                </label>
            </div>
            <div id="inputs-container" class="form-div">
                <input type="text" id="name" required bind:value={username}>
                <input type="text" id="password" required bind:value={password}>
            </div>
        </div>
        <div class="buttons">
            <button>
                Log in
            </button>
            <button on:click={signup}>
                Sign up
            </button>
        </div>
    </div>
</form>

<style>
    label {
        height: 2em;
        line-height: 2em;
        text-align: end;
        align-content: center;
        margin: 4px;
        width: 50%;
        right: 0px;
    }

    button {
        margin: 8px;
    }

    input {
        height: 2em;
        margin: 4px;
        width: 80%;
    }

    .container {
        display: flex;
        flex-direction: column;
        width: 50%;
        margin: auto;
    }

    .login-container {
        display: flex;
        flex-direction: row;
        margin: 16px 16px;
    }

    .form-div {
        display: flex;
        flex-direction: column;
        width: 50%;
        align-items: flex-end;
    }

    .buttons {
        margin-right: 8px;
        padding: 8px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    
</style>