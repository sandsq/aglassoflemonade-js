<script lang="ts">
  import type { Word } from "../types";
  import { SortDirection, FilterState } from "../types";
  import WordsListHeader from "./WordsListHeader.svelte";
  import WordItem from "./WordItem.svelte";

  let { words }: { words: Word[] } = $props();

  let sortDirection = $state(SortDirection.Unchanged);
  let dateDirection = $state(SortDirection.Unchanged);
  let soundFilter = $state(FilterState.All);
  let lookFilter = $state(FilterState.All);
  let meansFilter = $state(FilterState.All);
  let overallFilter = $state(FilterState.All);

  // todo: I'm pretty sure this is incorrect. For example, if one filter is already pressed and I press
  // another one, it should just apply the new filter onto the first, instead of recomputing all filters
  // (which is what happens now)
  let displayedWords = $derived.by(() => {
    let sorted = [...words].sort((a, b) =>
      b.entry_date.localeCompare(a.entry_date),
    );

    let filtered = sorted
      .filter((w) => {
        if (soundFilter === FilterState.All) return true;
        if (soundFilter === FilterState.OnlyTrue) return w.sounds_good;
        return !w.sounds_good;
      })
      .filter((w) => {
        if (lookFilter === FilterState.All) return true;
        if (lookFilter === FilterState.OnlyTrue) return w.looks_good;
        return !w.looks_good;
      })
      .filter((w) => {
        if (meansFilter === FilterState.All) return true;
        if (meansFilter === FilterState.OnlyTrue) return w.means_good;
        return !w.means_good;
      })
      .filter((w) => {
        if (overallFilter === FilterState.All) return true;
        if (overallFilter === FilterState.OnlyTrue) return w.overall_good;
        return !w.overall_good;
      });

    // todo: double sorting should depend on the order I think
    if (sortDirection === SortDirection.Abc) {
      filtered = [...filtered].sort((a, b) => a.word.localeCompare(b.word));
    } else if (sortDirection === SortDirection.Zyx) {
      filtered = [...filtered].sort((a, b) => b.word.localeCompare(a.word));
    }

    if (dateDirection === SortDirection.Abc) {
      filtered = [...filtered].sort((a, b) =>
        a.entry_date.localeCompare(b.entry_date),
      );
    } else if (dateDirection === SortDirection.Zyx) {
      filtered = [...filtered].sort((a, b) =>
        b.entry_date.localeCompare(a.entry_date),
      );
    }

    return filtered;
  });
</script>

<table>
  <tbody>
    <WordsListHeader
      onClick={(d) => (sortDirection = d)}
      {sortDirection}
      onDateClick={(d) => (dateDirection = d)}
      dateSortDirection={dateDirection}
      onSoundGoodClick={(f) => (soundFilter = f)}
      {soundFilter}
      onLookGoodClick={(f) => (lookFilter = f)}
      {lookFilter}
      onMeansGoodClick={(f) => (meansFilter = f)}
      {meansFilter}
      onOverallGoodClick={(f) => (overallFilter = f)}
      {overallFilter}
    />
    {#each displayedWords as word (word.id)}
      <WordItem {word} />
    {/each}
  </tbody>
</table>
