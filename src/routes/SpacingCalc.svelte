<script lang="ts">
  const STORAGE_KEY = "spacing-calc";

  type KnownValue = "length" | "spacing";
  type StartMode = "edge" | "inset";

  interface StoredValues {
    lengthStr: string;
    spacingStr: string;
    markersStr: string;
    knownValue: KnownValue;
    startMode: StartMode;
  }

  const defaults: StoredValues = {
    lengthStr: "300",
    spacingStr: "50",
    markersStr: "4",
    knownValue: "length",
    startMode: "edge",
  };

  function loadStored(): StoredValues {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      const merged = { ...defaults, ...parsed };
      return {
        lengthStr: String(merged.lengthStr),
        spacingStr: String(merged.spacingStr),
        markersStr: String(merged.markersStr),
        knownValue: merged.knownValue === "spacing" ? "spacing" : "length",
        startMode: merged.startMode === "inset" ? "inset" : "edge",
      };
    } catch {
      return defaults;
    }
  }

  const stored = loadStored();

  // Raw text the user typed, so boxes are never rewritten out from under them.
  let lengthStr = $state(stored.lengthStr);
  let spacingStr = $state(stored.spacingStr);
  let markersStr = $state(stored.markersStr);
  let knownValue = $state<KnownValue>(stored.knownValue);
  let startMode = $state<StartMode>(stored.startMode);

  $effect(() => {
    const values: StoredValues = {
      lengthStr,
      spacingStr,
      markersStr,
      knownValue,
      startMode,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  });

  // Number(), unlike parseFloat, rejects strings that aren't *entirely* a
  // valid number (e.g. "12abc"), which is what we want for spotting typos.
  function toNumber(value: string): number {
    const trimmed = value.trim();
    if (trimmed === "") return 0;
    const n = Number(trimmed);
    return Number.isFinite(n) ? n : 0;
  }

  function isInvalid(value: string): boolean {
    const trimmed = value.trim();
    if (trimmed === "") return false;
    return !Number.isFinite(Number(trimmed));
  }

  function isInvalidMarkers(value: string): boolean {
    const trimmed = value.trim();
    if (trimmed === "") return false;
    const n = Number(trimmed);
    return !Number.isInteger(n) || n < 1;
  }

  let lengthNum = $derived(toNumber(lengthStr));
  let spacingNum = $derived(toNumber(spacingStr));
  let markersNum = $derived(Math.max(0, Math.trunc(toNumber(markersStr))));

  let lengthInvalid = $derived(isInvalid(lengthStr));
  let spacingInvalid = $derived(isInvalid(spacingStr));
  let markersInvalid = $derived(isInvalidMarkers(markersStr));

  // Number of "segments" the length is divided into:
  //  - edge mode: n-1 gaps, since the first and last markers sit right on
  //    the two edges (both edges end up with a marker)
  //  - inset mode: n+1 gaps, since there's one extra spacing gap left on
  //    either side, between each edge and the nearest marker
  let segments = $derived(startMode === "edge" ? markersNum - 1 : markersNum + 1);

  let resultSpacing = $derived.by(() => {
    if (markersNum < 1) return 0;
    if (knownValue === "spacing") return spacingNum;
    if (segments <= 0) return 0;
    return lengthNum / segments;
  });

  let resultLength = $derived.by(() => {
    if (markersNum < 1) return 0;
    if (knownValue === "length") return lengthNum;
    return spacingNum * segments;
  });

  let positions = $derived.by(() => {
    if (markersNum < 1 || !Number.isFinite(resultSpacing)) return [];
    const offset = startMode === "edge" ? 0 : 1;
    return Array.from(
      { length: markersNum },
      (_, i) => (i + offset) * resultSpacing,
    );
  });

  function formatNumber(n: number): string {
    if (!Number.isFinite(n)) return "-";
    return (Math.round(n * 100) / 100).toString();
  }

  // Fixed, illustrative examples (always 5 markers) that just show whether
  // markers start flush with the edge or one increment in from it. These
  // never reflect the real marker count or spacing distance.
  const EDGE_EXAMPLE = "|--|--|--|--|--|";
  const INSET_EXAMPLE = "-|--|--|--|--|--|-";
</script>

<svelte:head>
  <title>spacing calc</title>
</svelte:head>

<h1>spacing calculator</h1>
<p>
  figure out even spacing for placing markers along a length of material —
  holes, fence posts, pickets, whatever you're evenly spacing out.
</p>

<fieldset>
  <legend>what do you know?</legend>
  <label>
    <input type="radio" bind:group={knownValue} value="length" />
    total length
  </label>
  <label>
    <input type="radio" bind:group={knownValue} value="spacing" />
    spacing between markers
  </label>
</fieldset>

<fieldset>
  <legend>starting position</legend>
  <label class="start_mode_option">
    <input type="radio" bind:group={startMode} value="edge" />
    start at the edge (the far edge gets the last marker too)
    <pre class="ascii_example">{EDGE_EXAMPLE}</pre>
  </label>
  <label class="start_mode_option">
    <input type="radio" bind:group={startMode} value="inset" />
    start one increment in from the edge (same buffer left at the far edge)
    <pre class="ascii_example">{INSET_EXAMPLE}</pre>
  </label>
</fieldset>

<p>
  number of markers:<input
    type="text"
    inputmode="numeric"
    bind:value={markersStr}
  />
  {#if markersInvalid}
    <span class="input_warning">not a whole number ≥ 1</span>
  {/if}
</p>

{#if knownValue === "length"}
  <p>
    total length:<input type="text" inputmode="decimal" bind:value={lengthStr} />mm
    {#if lengthInvalid}
      <span class="input_warning">not a number</span>
    {/if}
  </p>
{:else}
  <p>
    spacing:<input type="text" inputmode="decimal" bind:value={spacingStr} />mm
    {#if spacingInvalid}
      <span class="input_warning">not a number</span>
    {/if}
  </p>
{/if}

{#if markersNum < 1}
  <p>enter at least 1 marker to see results</p>
{:else}
  <h2>results</h2>
  <p>spacing: {formatNumber(resultSpacing)}mm</p>
  <p>total length: {formatNumber(resultLength)}mm</p>

  <h2>positions</h2>
  <p>measured from the starting edge:</p>
  <ol class="positions_list">
    {#each positions as position, i (i)}
      <li>{formatNumber(position)}mm</li>
    {/each}
  </ol>
{/if}
