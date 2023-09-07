<svelte:head>
	<title>Matcha</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="homepage.css">
    <link rel="stylesheet" href="login.css">
    <link rel="stylesheet" href="swipe.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Righteous&display=swap" rel="stylesheet">
    <title>Matcha</title>
</head>

<body>
    <header>
        <button class="homepage_button" on:click={() => location.href = `/`}>Homepage</button>
    </header>
    <div class="title_box">
        <div class="title">matcha</div>
        <div class="subtitle">Savor the taste of <span style="color:rgb(242, 0, 255)">love</span> with Matcha! ♥</div>
    </div>

    <div class="login_box">
        <input class="input_login" type="text" placeholder="Username" bind:value={username}>
        <input class="input_login" type="text" placeholder="Password" bind:value={password}>
        <button on:click={connexion} class="login_button">Log in</button>
    </div>

</body>

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