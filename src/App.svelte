<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let imageUrl = "";
  let description = "";

  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description:
        "In this meetup, we will have some experts that teach you how to code.",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Sphinx_moth_caterpillar_%28Xylophanes_crotonis%29.jpg/800px-Sphinx_moth_caterpillar_%28Xylophanes_crotonis%29.jpg",
      address: "27th Nerd Road, 12345 Austin",
      contactEmail: "nerd@camp.net",
      isFavorite: false
    },
    {
      id: "m2",
      title: "Rock Crawling",
      subtitle: "Climb the Highest Mountains",
      description: "Learn how to bugout your gear.",
      imageUrl: "https://i.insider.com/5f0cb923f34d052001588a22",
      address: "5425 Outdoors Path, 12345 Boulder",
      contactEmail: "crawl@bugout.com",
      isFavorite: false
    }
  ];

  const addMeetup = () => {
    console.log("Meetup added");
    const newMeetup = {
      id: Math.random().toString(),
      title,
      subtitle,
      description,
      imageUrl,
      address,
      contactEmail: email
    };

    meetups = [newMeetup, ...meetups];
    console.log(meetups);
  };

  const toggleFavorite = e => {
    const id = e.detail;
    const updatedMeetup = { ...meetups.find(m => m.id === id) };
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = meetups.findIndex(m => m.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;
  };
</script>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
    <TextInput
      controlType="input"
      id="title"
      label="Title"
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      controlType="input"
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      controlType="input"
      id="address"
      label="Address"
      value={address}
      on:input={event => (address = event.target.value)} />
    <TextInput
      controlType="input"
      id="imageUrl"
      label="Image URL"
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      controlType="input"
      type="email"
      id="email"
      label="Email"
      value={email}
      on:input={event => (email = event.target.value)} />
    <TextInput
      controlType="textarea"
      id="description"
      rows={3}
      label="Description"
      value={description}
      on:input={event => (description = event.target.value)} />

    <Button type="submit" caption="Save" />
  </form>
  <MeetupGrid {meetups} on:toggleFavorite={toggleFavorite} />
</main>
