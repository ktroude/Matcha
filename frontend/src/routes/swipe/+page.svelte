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
		<button class="homepage_button" on:click={() => location.href = `/`}>Homepage</button>
        <button class="profile_button"  on:click={() => location.href = `/profile`}>Profile</button>
        <button class="search_button"   on:click={() => location.href = `/search`}>Search</button>
        {#if logged == true}
            <button class="login_logout_button">Log in</button>
        {:else}
            <button class="login_logout_button">Log out</button>
        {/if}
    </header>
    <div class="title_box">
        <div class="title">matcha</div>
        <div class="subtitle">Savor the taste of <span style="color:rgb(242, 0, 255)">love</span> with Matcha! ♥</div>
    </div>
    <div class="swipe_box">
		<div class="swipe_user">
			<div id="picture_user" class="picture_user">
		    </div>
            <div class="swipe_user_info">
                <div class="swipe_user_name">
                        {swipe_user_name}
                </div>
                <div class="swipe_user_age">
                        {swipe_user_age}
                </div>
                <div class="swipe_user_gender">
                        {swipe_user_gender}
                </div>
            </div>
            <div class="swipe_buttons_box">
                <button class="swipe_button" on:click={swipe_user_left}>✕</button>
                <button class="like_button"  on:click={swipe_user_right}>🤍</button>
            </div>
		</div>
    </div>
</body>
</html>

<script lang="ts" type="module">

    let logged = false;
    let swipe_user_name = "Bouftou Royal";
    let swipe_user_age = 30;
    let swipe_user_gender = "♂";

    function swipe_user_right() {
		const div1 = document.getElementById('picture_user');
        
		div1?.classList.toggle('picture_user_switch_right');
        swipe_user_name = "Tofu Royal";
        swipe_user_age = 20;
        setTimeout(() => { div1?.classList.toggle('picture_user'); }, 10000);
	}
    
    function swipe_user_left() {
        const div1 = document.getElementById('picture_user');

        div1?.classList.toggle('picture_user_switch_left');
        swipe_user_name = "Tofu Royal";
        swipe_user_age = 20;
        setTimeout(() => { div1?.classList.toggle('picture_user'); }, 10000);
	}

</script>
