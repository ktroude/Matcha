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
    </div>
    <div class="box">
        <h3 class="box_questions">It all starts with <span style="color:rgb(242, 0, 255)">you</span>.</h3>
		<input type="text" id="userName" placeholder="User name:" bind:value={newUserName} />
		<input type="text" id="lastName" placeholder="Last name:" bind:value={newLastName} />
		<input type="text" id="firstName" placeholder="First name:" bind:value={newFirstName} />
		<input type="email" id="email" placeholder="Email:" bind:value={newEmail} />		  
		<input type="password" id="password" placeholder="Password:" bind:value={newPassword} />
		<button type="button" class="create_user" on:click={createUser}>Create User</button>
		<button class="button_nav" on:click={() => location.href = `/swipe`}>Swipe Page</button>
    </div>
</body>
</html>

<script lang="ts" type="module">
	let user = {};
	let newUserName: string, newLastName: string, newFirstName: string, newEmail: string, newPassword: string;

	async function createUser() {
    let user = {
		firstname: newFirstName,
		lastname: newLastName,
		email: newEmail,
      	username: newUserName,
      	password: newPassword,
    };

    try {
		console.log('fecthing');
		const response = await fetch(`http://localhost:3000/user/userCreation`, {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user: user }),
		});

		if (!response.ok) {
			console.log("Failed to create user.");
		} else {
			console.log(document?.cookie?.split(';'));
			console.log("User created successfully.");
			newUserName = "";
			newLastName = "";
			newFirstName = "";
			newEmail = "";
			newPassword = "";
      }
    } catch (error) {
		console.error("An error occurred:", error);
    }
}
</script>
