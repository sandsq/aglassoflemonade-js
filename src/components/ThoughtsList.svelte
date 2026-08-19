<script lang="ts">
  import type { Thought } from "../types";
  import { formatDateSpacePadded } from "../dateFormat";

  let { thoughts }: { thoughts: Thought[] } = $props();

  let sortedThoughts = $derived(
    [...thoughts].sort((a, b) => b.date.localeCompare(a.date)),
  );
</script>

<table>
  <tbody>
    {#each sortedThoughts as thought (thought.id)}
      <tr>
        <td>{thought.content}</td>
        <td>{formatDateSpacePadded(thought.date)}</td>
        <td>{thought.author}</td>
      </tr>
    {/each}
  </tbody>
</table>
