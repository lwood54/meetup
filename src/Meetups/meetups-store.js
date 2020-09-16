import { writable } from "svelte/store";

const meetups = writable([
	{
		id: "m1",
		title: "Coding Bootcamp",
		subtitle: "Learn to code in 2 hours",
		description: "In this meetup, we will have some experts that teach you how to code.",
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Sphinx_moth_caterpillar_%28Xylophanes_crotonis%29.jpg/800px-Sphinx_moth_caterpillar_%28Xylophanes_crotonis%29.jpg",
		address: "27th Nerd Road, 12345 Austin",
		contactEmail: "nerd@camp.net",
		isFavorite: false,
	},
	{
		id: "m2",
		title: "Rock Crawling",
		subtitle: "Climb the Highest Mountains",
		description: "Learn how to bugout your gear.",
		imageUrl: "https://i.insider.com/5f0cb923f34d052001588a22",
		address: "5425 Outdoors Path, 12345 Boulder",
		contactEmail: "crawl@bugout.com",
		isFavorite: false,
	},
]);

const customMeetupsStore = {
	subscribe: meetups.subscribe,
	addMeetup: (meetupData) => {
		const newMeetup = {
			...meetupData,
			id: Math.random().toString(),
			isFavorite: false,
		};
		meetups.update((items) => {
			return [newMeetup, ...items];
		});
	},
	updateMeetup: (id, meetupData) => {
		meetups.update((items) => {
			const meetupIndex = items.findIndex((i) => i.id === id);
			const updatedMeetup = { ...items[meetupIndex], ...meetupData };
			const updatedMeetups = [...items];
			updatedMeetups[meetupIndex] = updatedMeetup;
			return updatedMeetups;
		});
	},
	toggleFavorite: (id) => {
		meetups.update((items) => {
			const updatedMeetup = { ...items.find((m) => m.id === id) };
			updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
			const meetupIndex = items.findIndex((m) => m.id === id);
			const updatedMeetups = [...items];
			updatedMeetups[meetupIndex] = updatedMeetup;
			return updatedMeetups;
		});
	},
};

export default customMeetupsStore;
