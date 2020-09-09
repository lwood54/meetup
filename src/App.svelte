<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";

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

  let editMode;

  const addMeetup = e => {
    const newMeetup = {
      id: Math.random().toString(),
      title: e.detail.title,
      subtitle: e.detail.subtitle,
      description: e.detail.description,
      imageUrl: e.detail.imageUrl,
      address: e.detail.address,
      contactEmail: e.detail.email
    };

    meetups = [newMeetup, ...meetups];
    editMode = null;
  };

  const editMeetup = () => {
    editMode = "add";
  };

  const cancelEdit = () => {
    editMode = null;
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

  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />

<main>
  <div class="meetup-controls">
    <Button on:click={editMeetup}>New Meetup</Button>
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:save={addMeetup} on:cancel={cancelEdit} />
  {/if}
  <MeetupGrid {meetups} on:toggleFavorite={toggleFavorite} />
</main>
