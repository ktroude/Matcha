<script lang="ts">
  let counter: number = 0;
  let selectedGender: string = "";
  let selectedPref: string[] = []; // Un tableau pour stocker les genres sélectionnés
  let uploadedImages = new Array(5).fill(null); // Tableau pour stocker les images
  let currentImageIndex = 0; // Index de l'image en cours d'upload

  function counterUp() {
    console.log(counter);
    counter += 1;
  }

  function counterDown() {
    if (counter > 0) counter -= 1;
  }

  function toggleSexPref(gender: string) {
    if (selectedPref.includes(gender)) {
      // Si le genre est déjà sélectionné, le retirer de la liste
      selectedPref = selectedPref.filter((g) => g !== gender);
    } else {
      // Sinon, l'ajouter à la liste
      selectedPref = [...selectedPref, gender];
    }
  }

  function handleFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }
    const file = input.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string | null;
      if (result) {
        uploadedImages[currentImageIndex] = result;
        currentImageIndex++;
        if (currentImageIndex >= 5) {
          currentImageIndex = 0;
        }
      }
    };
    reader.readAsDataURL(file);
  }
</script>

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/complete.profile.css" />
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
  </head>
  <title>Matcha</title>
  <body>
    <div class="title_box">
      <div class="title">matcha</div>
      <div class="subtitle">
        Let us know a little more about you!
        <p>Complete your <span style="color:rgb(242, 0, 255)">profile</span></p>
      </div>
      <div class="box">
        <div class="inside_box">
          {#if counter === 0}
            <div class="gender_box">
              <div class="box_title">Your gender</div>
              <input
                type="radio"
                name="gender_choice"
                class="gender_input"
                id="gender_female"
                value="gender_female"
                on:change={() => (selectedGender = "F")}
              />
              <label for="gender_female">Female</label>

              <input
                type="radio"
                name="gender_choice"
                class="gender_input"
                id="gender_male"
                value="gender_male"
                on:change={() => (selectedGender = "M")}
              />
              <label for="gender_male">Male</label>

              <input
                type="radio"
                name="gender_choice"
                class="gender_input"
                id="gender_other"
                value="gender_other"
                on:change={() => (selectedGender = "O")}
              />
              <label for="gender_other">Other</label>
            </div>

            <div class="sexual_pref_box">
              <div class="box_title">You're interested in</div>
              <input
                type="checkbox"
                name="sexual_pref_choice"
                class="gender_input"
                id="female"
                value="female"
                on:change={() => toggleSexPref("F")}
              />
              <label for="female">Female</label>

              <input
                type="checkbox"
                name="sexual_pref_choice"
                class="gender_input"
                id="male"
                value="male"
                on:change={() => toggleSexPref("M")}
              />
              <label for="male">Male</label>

              <input
                type="checkbox"
                name="sexual_pref_choice"
                class="gender_input"
                id="other"
                value="other"
                on:change={() => toggleSexPref("O")}
              />
              <label for="other">Other</label>
            </div>
          {/if}
          {#if counter === 1}
            <div class="birthday_box">
              <form>
                <label class="birthday_label" for="birthdate">Birthdate</label>
                <p>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    class="birthday_input"
                    value="2000-01-01"
                  />
                </p>
              </form>
            </div>
          {/if}
          {#if counter === 2}
            <div class="box_title">Upload some pictures</div>
            <div class="picture_box">
              {#each uploadedImages as image, index (index)}
                {#if image !== null}
                  <img class="picture_preview" src={image} alt="uploaded" />
                {:else}
                  <label class="upload_button">
                    <input
                      type="file"
                      accept="image/*"
                      style="display: none;"
                      on:change={handleFileInputChange}
                    />
                    <span>+</span>
                  </label>
                {/if}
              {/each}
            </div>
          {/if}
        </div>
        <div class="button_box">
          {#if counter === 0}
            <button class="back_button" style="visibility: hidden;">Back</button
            >
          {:else}
            <button class="back_button" on:click={counterDown}>Back</button>
          {/if}
          <button class="next_button" on:click={counterUp}>Next</button>
        </div>
      </div>
    </div></body
  >
</html>
