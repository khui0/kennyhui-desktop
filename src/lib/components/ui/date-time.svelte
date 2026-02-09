<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";

  let time: string = $state("");

  update();

  onMount(() => {
    setInterval(update, 1000);
  });

  function update() {
    time = dayjs().format("ddd MMM D h:mm A");
  }
</script>

{time}
