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
    <div class="title_box">
        <div class="title">matcha</div>
        <div class="subtitle">You're almost <span style="color:rgb(242, 0, 255)">done</span>!</div>
    </div>
		<button class="button_validate_account" on:click={switchToCompleteProfile}>Validate account</button>
</body>
</html>

<script lang="ts" type="module">
    import { onMount } from "svelte";
	import { goto } from '$app/navigation';


	const switchToCompleteProfile = () => {

    	goto('complete/profile');
  };

	function getTokenFromURL() {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get('token');
	}

	onMount(async () => {
		const token = getTokenFromURL();
		if (token) {
			const response = await fetch(`http://localhost:3000/auth/validate/mail`, {
			method: 'POST',
            credentials: 'include',
			headers: {
			'Content-Type': 'application/json',
			}
		});
		if (response.ok) {
			// rediriger le user vers la page de login pour éviter toute faille
			window.location.href = 'localhost:8080/homepage';
		} else {
			console.log('Échec de la validation');
		}
		}
	});

</script>
