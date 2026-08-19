<script lang="ts">
  import type { Thought } from "../types";
  import ThoughtsList from "../components/ThoughtsList.svelte";

  let thoughts = $state<Thought[]>([]);

  $effect(() => {
    fetch(`${import.meta.env.BASE_URL}assets/thoughts.json`)
      .then((res) => res.json())
      .then((data: Thought[]) => {
        thoughts = data;
      });
  });
</script>

<svelte:head>
  <title>thoughts</title>
</svelte:head>

<div>
  <h1>random selection of every thought to exist</h1>
  <ThoughtsList {thoughts} />
</div>
