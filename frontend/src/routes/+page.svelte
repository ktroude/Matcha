<script lang="ts" type="module">
  let newUserName: string,
    newLastName: string,
    newFirstName: string,
    newEmail: string,
    newPassword: string,
    inputError: string;

  async function createUser() {
    let user = {
      firstname: newFirstName,
      lastname: newLastName,
      email: newEmail,
      username: newUserName,
      password: newPassword,
    };
    inputError = checkName(user.lastname, "lastname");
    console.log(inputError);
    if (inputError !== "ok") return;
    inputError = checkName(user.firstname, "firstname");
    console.log(inputError);
    if (inputError !== "ok") return;
    inputError = checkEmail(user.email);
    console.log(inputError);
    if (inputError !== "ok") return;
    inputError = checkName(user.username, "username");
    console.log(inputError);
    if (inputError !== "ok") return;
    inputError = checkPassword(user.password);
    console.log(inputError);
    if (inputError !== "ok") return;
    try {
      console.log("fecthing");
      const response = await fetch(`http://localhost:3000/auth/local/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user }),
      });

      if (!response.ok) {
		    const responseBody = await response.json();
		    if (response.status === 409) 
      		inputError = responseBody.message;
        console.log("Failed to create user.");
      } else {
        console.log(document?.cookie?.split(";"));
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

  function checkName(name: string, inputName: string): string {
    if (!name) return "Please enter a " + inputName;
    if (name.length < 2 || name.length > 20)
      return "The " + inputName + " must be between 2 and 20 characters";
    if (isAlpha(name) === false)
      return "The " + inputName + " contains forbidden characters.";
    return "ok";
  }

  function checkEmail(email: string): string {
    const atIndex = email.indexOf("@");
    const lastDotIndex = email.lastIndexOf(".");
    if (!email) return "Please enter an email address.";
    if (email.length < 5 || email.length > 254)
      return "Email format is incorrect. Please make sure to follow the format 'name@example.com'.";
    if (atIndex <= 0 || lastDotIndex === -1)
      return "Email format is incorrect. Please make sure to follow the format 'name@example.com'.";
    if (lastDotIndex < atIndex)
      return "Email format is incorrect. Please make sure to follow the format 'name@example.com'.";
    if (atIndex + 1 === lastDotIndex || lastDotIndex === email.length)
      return "Email format is incorrect. Please make sure to follow the format 'name@example.com'.";
    return "ok";
  }

  function checkPassword(password: string): string {
    if (password.length < 8 || password.length > 30)
      return "Password must be between 8 and 30 characters.";
    if (password.toLowerCase() === password)
      return "Password must contain at least one uppercase letter.";
    if (password.toUpperCase() === password)
      return "Password must contain at least one lowercase letter.";
    if (password.search(/[!@#$%^&*(),.?":{}|<>]/) === -1)
      return 'Password must contain at least one of these characters: [!@#$%^&(),.?":{}|<>]';
    if (password.search(/[0123456789]/) === -1)
      return "Password must contain at least one digit.";
    return "ok";
  }

  function isAlpha(str: string) {
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      if (!((char >= "a" && char <= "z") || (char >= "A" && char <= "Z"))) {
        return false;
      }
    }
    return true;
  }
</script>

<svelte:head>
  <title>Matcha</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="homepage.css" />
    <link rel="stylesheet" href="swipe.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Righteous&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Righteous&display=swap"
      rel="stylesheet"
    />
    <title>Matcha</title>
  </head>
  <body>
    <header>
      <button class="login">Log in</button>
    </header>
    <div class="title_box">
      <div class="title">matcha</div>
      <div class="subtitle">
        Savor the taste of <span style="color:rgb(242, 0, 255)">love</span> with
        Matcha! ♥
      </div>
    </div>
    <div class="box">
      <h3 class="box_questions">
        It all starts with <span style="color:rgb(242, 0, 255)">you</span>.
      </h3>
      <input
        type="text"
        id="userName"
        placeholder="User name:"
        bind:value={newUserName}
      />
      <input
        type="text"
        id="lastName"
        placeholder="Last name:"
        bind:value={newLastName}
      />
      <input
        type="text"
        id="firstName"
        placeholder="First name:"
        bind:value={newFirstName}
      />
      <input
        type="email"
        id="email"
        placeholder="Email:"
        bind:value={newEmail}
      />
      <input
        type="password"
        id="password"
        placeholder="Password:"
        bind:value={newPassword}
      />
      {#if inputError && inputError !== "ok"}
        <p class="input_error">{inputError}</p>{/if}
      <button type="button" class="create_user" on:click={createUser}
        >Create User</button
      >
      <button class="button_nav" on:click={() => (location.href = `/swipe`)}
        >Swipe Page</button
      >
    </div>
  </body>
</html>
