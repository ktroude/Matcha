<svelte:head>
	<title>Matcha</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Righteous&display=swap" rel="stylesheet">
    <title>Matcha</title>
</head>
</html>

<script lang="ts">

let password:string, username:string;

let id:any;

async function getId() {
    const response = await fetch(`http://localhost:3000/user/me`, {
			method: 'GET',
            credentials: 'include',
			headers: {
			'Content-Type': 'application/json',
			},
			//body: JSON.stringify({ username:username, password: password }),
		});
        if (response.ok)
        id = await response.text()
        else id = 0;
        console.log(response);
}

async function connexion() {

    const response = await fetch(`http://localhost:3000/auth/local/signin`, {
			method: 'POST',
            credentials: 'include',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username:username, password: password }),
		});
        console.log(response);
}

function redirect() {
    window.location.href = '/complete/profile';
}

</script>

<body>

    <input type="text" bind:value={username}>
    <input type="text"  bind:value={password}>
    <button on:click={connexion}>connexion</button>
    <button on:click={redirect}> test redirection</button>
    <button on:click={getId}> test </button>
    <h1>id == {id}</h1>
</body>
