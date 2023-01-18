const heroCreateHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector("#name-hero-create").value.trim();
  const attack = document.querySelector("#attack-hero-create").value.trim();
  const hitPoints = document.querySelector("#hitpoints-hero-create").value.trim();
  const mana = document.querySelector("#mana-hero-create").value.trim();

  if (name && attack && hitPoints && mana) {
    const response = await fetch("/api/heroes", {
      method: "POST",
      body: JSON.stringify({ name, attack, hitPoints, mana }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);

    if (response.ok) {
      document.location.replace("/");
    } else {
      console.log(response);
      alert("Error. Please make sure all fields are filled out.");
    }
  }
};

document.querySelector(".hero-create-form").addEventListener("submit", heroCreateHandler);
