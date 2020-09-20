<script>
	import Button from "./UI/Button.svelte";
	import EditMeetup from "./Meetups/EditMeetup.svelte";
	import Header from "./UI/Header.svelte";
	import LoadingSpinner from "./UI/LoadingSpinner.svelte";
	import meetups from "./Meetups/meetups-store";
	import MeetupDetail from "./Meetups/MeetupDetail.svelte";
	import MeetupGrid from "./Meetups/MeetupGrid.svelte";
	import TextInput from "./UI/TextInput.svelte";
	import Error from "./UI/Error.svelte";

	// let meetups = ;

	let editMode;
	let editedId;
	let page = "overview";
	let pageData = {};
	let isLoading = true;
	let error;

	fetch("https://svelte-meetup-c9828.firebaseio.com/meetups.json")
		.then((res) => {
			if (!res.ok) {
				throw new Error("Fetching meetups failed, try again later.");
			}
			return res.json();
		})
		.then((data) => {
			const loadedMeetups = [];
			for (const key in data) {
				loadedMeetups.push({
					...data[key],
					id: key,
				});
			}
			// set a timeout just to observe loading spinner
			setTimeout(() => {
				isLoading = false;
				meetups.setMeetups(loadedMeetups.reverse()); // use custom functions from custom store
			}, 1000);
		})
		.catch((err) => {
			error = err;
			isLoading = false;
			console.log(err);
		});

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

	const cancelError = () => {
		error = null;
	};
</script>

<style>
	main {
		margin-top: 5rem;
	}
</style>

{#if error}
	<Error message={error.message} on:cancel={cancelError} />
{/if}

<Header />

<main>
	{#if page === 'overview'}
		{#if editMode === 'edit'}
			<EditMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelEdit} />
		{/if}
		{#if isLoading}
			<LoadingSpinner />
		{:else}
			<MeetupGrid meetups={$meetups} on:showdetails={showDetails} on:edit={startEdit} on:add={editMeetup} />
		{/if}
	{:else}
		<MeetupDetail id={pageData.id} on:close={closeDetails} />
	{/if}
</main>
