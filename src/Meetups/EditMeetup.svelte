<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty, isValidEmail } from "../helpers/validation";

  let title = "";
  let titleValid = false;
  let subtitle = "";
  let subtitleValid = false;
  let address = "";
  let addressValid = false;
  let email = "";
  let emailValid = false;
  let imageUrl = "";
  let imageUrlValid = false;
  let description = "";
  let descriptionValid = false;
  let formIsValid = false;

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: emailValid = isValidEmail(email);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: descriptionValid = !isEmpty(description);
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    emailValid &&
    imageUrlValid &&
    descriptionValid;

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
      valid={titleValid}
      validityMessage="Please enter a valid title."
      label="Title"
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      controlType="input"
      id="subtitle"
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle."
      label="Subtitle"
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      controlType="input"
      id="address"
      valid={addressValid}
      validityMessage="Please enter a valid address."
      label="Address"
      value={address}
      on:input={event => (address = event.target.value)} />
    <TextInput
      controlType="input"
      id="imageUrl"
      valid={imageUrlValid}
      validityMessage="Please enter a valid image URL."
      label="Image URL"
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      controlType="input"
      type="email"
      id="email"
      valid={emailValid}
      validityMessage="Please enter a valid email."
      label="Email"
      value={email}
      on:input={event => (email = event.target.value)} />
    <TextInput
      controlType="textarea"
      id="description"
      valid={descriptionValid}
      validityMessage="Please enter a valid description."
      rows={3}
      label="Description"
      value={description}
      on:input={event => (description = event.target.value)} />

  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formIsValid}>
      Save
    </Button>
  </div>
</Modal>
