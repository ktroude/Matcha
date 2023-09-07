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
    <link rel="stylesheet" href="profile.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
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

    <div class="profile_box">
        <div class="profile_box_left">
            <div class="profile_picture"></div>
            <div class="profile_info">Age, Gender, Location, Fame</div>
            <div class="profile_preferences">
                <span>Looking for:</span>
                <li>...</li>
                <li>... to ... years old.</li>
                <li>... km perimeter around ...</li>
            </div>
            <div class="profile_online_status">Last online yesterday.</div>
        </div>
        <div class="profile_box_right">
            <!---- If the user is browsing on its own profile-->
            <div class="profile_box_right_nav">
                <button class="button_box_right_nav" on:click={() => switch_to_bio()}>Bio</button>
                <button class="button_box_right_nav" on:click={() => switch_to_viewed()}>Viewed</button>
                <button class="button_box_right_nav" on:click={() => switch_to_liked()}>Liked</button>
                <button class="button_box_right_nav" on:click={() => switch_to_unliked()}>Unliked</button>
                <button class="button_box_right_nav" on:click={() => switch_to_blocked()}>Blocked</button>
            </div>
            {#if box_nav == "bio"}
            <div class="bio_box">
                <div class="bio_title">About [name]</div>
                <div class="profile_bio">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ipsam itaque impedit ea, sequi quaerat delectus consequatur harum blanditiis, consequuntur et nisi? Provident, velit! Impedit sit repellat reiciendis enim tenetur!</div>
            </div>
            <!---- If the user is browsing on someone else's profile-->
            <div class="profile_buttons_box">
                <button class="like_profile_button">LIKE</button>
                <button class="block_profile_button">BLOCK</button>
                <button class="report_profile_button">REPORT</button>
            </div>
            {/if}
            {#if box_nav == "viewed"}
                <div class="viewed_user_box">
                    <div class="viewed_user">
                        <div class="viewed_user_picture"></div>
                        <div class="viewed_user_info">Username Lastname, Age</div>
                    </div>
                    <div class="viewed_user">
                        <div class="viewed_user_picture"></div>
                        <div class="viewed_user_info">Testman Toto, 28</div>
                    </div>
                    <div class="viewed_user">
                        <div class="viewed_user_picture"></div>
                        <div class="viewed_user_info">Ancetres fiers, 42</div>
                    </div>
                </div>

            {/if}
        </div>
    </div>
</body>
</html>

<script lang="ts" type="module">
    import { onMount } from "svelte";

    let id:any;
    let box_nav = "bio";

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


    function switch_to_bio(){
        box_nav = "bio";
    }
    function switch_to_viewed(){
        box_nav = "viewed";
    }
    function switch_to_liked(){
        box_nav = "liked";
    }
    function switch_to_blocked(){
        box_nav = "blocked";
    }
    function switch_to_unliked(){
        box_nav = "unliked";
    }

</script>