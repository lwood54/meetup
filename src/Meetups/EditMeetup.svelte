<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Modal from "../UI/Modal.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let imageUrl = "";
  let description = "";

  const dispatch = createEventDispatcher();

  const submitForm = () => {
    dispatch("save", {
      title: title,
      subtitle: subtitle,
      address: address,
      email: email,
      imageUrl: imageUrl,
      description: description
    });
  };

  const cancel = () => {
    dispatch("cancel");
  };
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:cancel>
  <form on:submit|preventDefault={submitForm}>
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

  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm}>Save</Button>
  </div>
</Modal>