<script lang="ts">
  import type { Word } from "../types";
  import { formatDateZeroPadded } from "../dateFormat";

  let { word }: { word: Word } = $props();

  let expanded = $state(true);

  function toggle() {
    expanded = !expanded;
  }

  let wordCommentClass = $derived(expanded ? "word_comment" : "hide_word_comment");
  let expandButtonClass = $derived(
    expanded ? "fa-angle-up fa-solid" : "fa-angle-down fa-solid",
  );

  let entryDate = $derived(formatDateZeroPadded(word.entry_date));
</script>

<tr>
  <td class="expand_toggle">
    <button
      class={expandButtonClass}
      onclick={toggle}
      aria-label={expanded ? "collapse comment" : "expand comment"}
    ></button>
  </td>
  <td class="word">{word.word}</td>
  <td class="date">{entryDate}</td>
  {#if word.sounds_good}
    <td class="affirmative border_left"></td>
  {:else}
    <td class="negative border_left"></td>
  {/if}
  {#if word.looks_good}
    <td class="affirmative"></td>
  {:else}
    <td class="negative"></td>
  {/if}
  {#if word.means_good}
    <td class="affirmative"></td>
  {:else}
    <td class="negative"></td>
  {/if}
  {#if word.overall_good}
    <td class="affirmative border_left"></td>
  {:else}
    <td class="negative border_left"></td>
  {/if}
</tr>

<tr class={wordCommentClass}>
  <td colspan="7">{word.comment}</td>
</tr>
