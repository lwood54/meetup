<script>
	import meetups from "./Meetups/meetups-store";
	import Header from "./UI/Header.svelte";
	import MeetupGrid from "./Meetups/MeetupGrid.svelte";
	import TextInput from "./UI/TextInput.svelte";
	import Button from "./UI/Button.svelte";
	import EditMeetup from "./Meetups/EditMeetup.svelte";
	import MeetupDetail from "./Meetups/MeetupDetail.svelte";

	// let meetups = ;

	let editMode;
	let editedId;
	let page = "overview";
	let pageData = {};

	const savedMeetup = (e) => {
		editMode = null;
		editedId = null;
	};

	const editMeetup = () => {
		editMode = "edit";
	};

	const cancelEdit = () => {
		editMode = null;
		editedId = null;
	};

	const showDetails = (e) => {
		page = "details";
		pageData.id = e.detail;
	};

	const closeDetails = () => {
		page = "overview";
		pageData = {};
	};

	const startEdit = (e) => {
		editMode = "edit";
		editedId = e.detail;
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
	{#if page === 'overview'}
		<div class="meetup-controls">
			<Button on:click={editMeetup}>New Meetup</Button>
		</div>
		{#if editMode === 'edit'}
			<EditMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelEdit} />
		{/if}
		<MeetupGrid meetups={$meetups} on:showdetails={showDetails} on:edit={startEdit} />
	{:else}
		<MeetupDetail id={pageData.id} on:close={closeDetails} />
	{/if}
</main>
