<script lang="ts">
  import RangeSlider from "svelte-range-slider-pips"; // https://simeydotme.github.io/svelte-range-slider-pips/en/introduction/
  import { retry } from "../../../utils/utils";
  import { goto } from "$app/navigation";

  let counter: number = 0;
  let selectedGender: string = "";
  let selectedPref: string[] = []; // Un tableau pour stocker les genres sélectionnés
  let birthdate: string = "";
  let uploadedImages = new Array(5).fill(null); // Tableau pour stocker les images
  let currentImageIndex = 0; // Index de l'image en cours d'upload
  let bio = "";
  let distance: number = 50;
  let ages: number[] = [20, 40];

  function counterUp() {
    console.log(counter);
    counter += 1;
  }

  function counterDown() {
    if (counter > 0) counter -= 1;
  }

  function skip() {
    counter = -5;
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

  function handleDateChange(event: any) {
    birthdate = event.target.value;
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

  function clearUploadedImages() {
    for (let i = 0; i < uploadedImages.length; i++) uploadedImages[i] = null;
    currentImageIndex = 0;
  }

  async function sendUserData() {
    try {
      console.log("je suis dans la fonction");
      if (selectedGender && selectedGender.length) {
        console.log("fecthing");
        const response = await fetch(
          `http://localhost:3000/user/update/gender`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ gender: selectedGender }),
          }
        );
        if (response.status === 401) return await retry(sendUserData, null);
      }
      if (selectedPref && selectedPref.length) {
        console.log("fecthing");
        const response = await fetch(`http://localhost:3000/user/update/pref`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pref: selectedPref }),
        });
        if (response.status === 401) await retry(sendUserData, null);
      }
      if (birthdate && birthdate.length) {
        console.log("fecthing");
        const response = await fetch(
          `http://localhost:3000/user/update/birthdate`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ birthdate: birthdate }),
          }
        );
        if (response.status === 401) return await retry(sendUserData, null);
      }
      if (uploadedImages && uploadedImages[0]) {
        console.log("fecthing");
        const response = await fetch(`http://localhost:3000/picture/upload`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedGender: selectedGender }),
        });
        if (response.status === 401) return await retry(sendUserData, null);
      }
      if (bio && bio.length) {
        console.log("fecthing");
        const response = await fetch(`http://localhost:3000/user/update/bio`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bio: bio }),
        });
        if (response.status === 401) return await retry(sendUserData, null);
      }
      if (ages) {
        const response = await fetch(`http://localhost:3000/search/minAge`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ age: ages[0] }),
        });
        if (response.status === 401) return await retry(sendUserData, null);
      }
      if (ages && ages[1]) {
        const response = await fetch(`http://localhost:3000/search/maxAge`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ age: ages[1] }),
        });
        if (response.status === 401) return await retry(sendUserData, null);
      }
      if (distance) {
        const response = await fetch(`http://localhost:3000/search/distance`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ distance: distance }),
        });
        if (response.status === 401) return await retry(sendUserData, null);
      }
      location.href = '/profile'
    } catch (err) {
      console.error(err);
    }
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
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.4.0/nouislider.min.css"
    />
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.4.0/nouislider.min.js"
    ></script>
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
                    min="1900-01-01"
                    max="2005-01-01"
                    on:input={handleDateChange}
                  />
                </p>
                {birthdate}
              </form>
            </div>
          {/if}
          {#if counter === 2}
            <div class="box_title_picture">Upload some pictures</div>
            <div class="select_profile_picture">
              <p>&#x1F451;</p>
              <p>Profile Picture</p>
            </div>
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
            <button class="clear_button" on:click={clearUploadedImages}
              >Clear pictures</button
            >
          {/if}
          {#if counter === 3}
            <div class="box_title">
              Let other user know you, type your biography
            </div>
            <div class="bio_box">
              <div class="bio_input_box">
                <textarea
                  class="bio_input"
                  placeholder="Maximum 300 caractères..."
                  bind:value={bio}
                />
                {#if bio.length <= 300}
                  <p style="color: rgba(255, 64, 220, 0.3); font-size: 12px">
                    {bio.length} / 300
                  </p>
                {:else}
                  <p style="color: crimson; font-size: 14px">
                    {bio.length} / 300
                  </p>
                {/if}
              </div>
            </div>
          {/if}
          {#if counter === 4}
            <div class="box_title">I'm looking for people:</div>
            <div class="search_box">
              <div class="distance_slider">
                <span>
                  within maximum {distance} km from me
                </span>
                <RangeSlider
                  class="distance_input"
                  min={5}
                  max={150}
                  pips
                  all={false}
                  first="label"
                  last="label"
                  rest={false}
                  bind:values={distance}
                />
              </div>

              <div class="age_slider">
                <span>
                  between {ages[0]} and {ages[1]} years old
                </span>
                <RangeSlider
                  min={18}
                  max={80}
                  range
                  pips
                  all={false}
                  first="label"
                  last="label"
                  rest={false}
                  bind:values={ages}
                />
              </div>
            </div>
          {/if}
          {#if counter === 5}
            <div class="start_box">
              <button class="start_button" on:click={() => sendUserData()}>
                Get started !</button
              >
            </div>
          {/if}
          {#if counter === -5}
            <div>
              <p class="disclaimer">
                If you choose to ignore those steps, you won't appear to other
                users and won't be able to take full advantage of the
                application's services.
              </p>
              <p class="disclaimer">Are you sure you want to continue?</p>
              <button
                class="disclaimer_button"
                on:click={() => location.href = '/profile'}
                >Yes, I want to stay single</button
              >
              <button class="disclaimer_button" on:click={() => (counter = 0)}
                >No, let me complete my profile</button
              >
            </div>
          {/if}
        </div>
        {#if counter >= 0}
          <div class="button_box">
            {#if counter === 0}
              <button class="back_button" style="visibility: hidden;"
                >Back</button
              >
            {:else}
              <button class="back_button" on:click={counterDown}>Back</button>
            {/if}
            {#if counter < 5}
              <button class="skip_button" on:click={skip}
                >Skip those steps</button
              >
            {/if}
            {#if bio.length <= 300 && counter < 5}
              <button class="next_button" on:click={counterUp}>Next</button>
            {/if}
          </div>
        {/if}
      </div>
    </div></body
  >
</html>
