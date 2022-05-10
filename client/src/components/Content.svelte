<script>
    
    import Popup from './Popup.svelte';
    import { getContext } from 'svelte';
    
    const { open } = getContext('simple-modal');
    const editProfile = () => open(Popup, { message: "It's a modal!" });
  </script>
  
  <p>
      <button on:click={editProfile}>Edit your profile</button>
  </p>