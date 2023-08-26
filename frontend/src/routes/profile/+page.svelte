<svelte:head>
	<title>Matcha</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="homepage.css">
    <link rel="stylesheet" href="swipe.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Righteous&display=swap" rel="stylesheet">
    <title>Matcha</title>
</head>
<body>
    <header>
        <button class="login">Log in</button>
    </header>
    <div class="title_box">
        <div class="title">matcha</div>
        <div class="subtitle">Savor the taste of <span style="color:rgb(242, 0, 255)">love</span> with Matcha! ♥</div>
        {id}
    </div>

</body>
</html>

<script lang="ts" type="module">
    import { onMount } from "svelte";

    let id:any;

    async function getId() {
            const response = await fetch(`http://localhost:3000/user/me`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
                if (response.ok)
                id = await response.text()
                else id = 0;
                console.log(response);
        }

    onMount(async () => {
        await getId();
	});


</script>
