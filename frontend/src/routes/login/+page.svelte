<svelte:head>
	<title>Matcha</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="test.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Righteous&display=swap" rel="stylesheet">
    <title>Matcha</title>
</head>
</html>

<script lang="ts">

let password:string, username:string;

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


</script>

<body>

    <input type="text" bind:value={username}>
    <input type="text"  bind:value={password}>
    <button on:click={connexion}>connexion</button>

</body>
