<main>
	<!-- <p><input placeholder="Enter your first name" type="text" bind:value={newFirstName}></p> -->
	<button  class="first_name_button" on:click={createUser}>Update</button>
</main>

<script lang="ts">
	async function createUser() {
		const response = await fetch(`http://${LOCALHOST}:3000/user/createUser`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

</script>