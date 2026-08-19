<script lang="ts">
  import type { Word } from "../types";
  import WordsList from "../components/WordsList.svelte";

  let words = $state<Word[]>([]);

  $effect(() => {
    fetch(`${import.meta.env.BASE_URL}assets/words.json`)
      .then((res) => res.json())
      .then((data: Word[]) => {
        words = data;
      });
  });
</script>

<svelte:head>
  <title>wordex</title>
</svelte:head>

<div>
  <h1>wordex</h1>
  <h2>what is</h2>
  <p>rating words</p>

  <h2>the dex</h2>
  <WordsList {words} />
</div>
