<script lang="ts">
  const STORAGE_KEY = "thread-length-calc";

  interface StoredValues {
    stitchLength: string;
    leatherThickness: string;
    stitchSpacing: string;
    buffer: string;
  }

  const defaults: StoredValues = {
    stitchLength: "0",
    leatherThickness: "0",
    stitchSpacing: "5",
    buffer: "0",
  };

  function loadStored(): StoredValues {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      const merged = { ...defaults, ...parsed };
      // Coerce every field to a string in case it was persisted by an older
      // version of this page that stored numbers instead of raw text.
      return {
        stitchLength: String(merged.stitchLength),
        leatherThickness: String(merged.leatherThickness),
        stitchSpacing: String(merged.stitchSpacing),
        buffer: String(merged.buffer),
      };
    } catch {
      return defaults;
    }
  }

  const stored = loadStored();

  // These hold the raw text the user typed, so the input box is never
  // rewritten out from under them (e.g. normalizing "00" -> "0" mid-edit).
  let stitchLength = $state(stored.stitchLength);
  let leatherThickness = $state(stored.leatherThickness);
  let stitchSpacing = $state(stored.stitchSpacing);
  let buffer = $state(stored.buffer);

  $effect(() => {
    const values: StoredValues = {
      stitchLength,
      leatherThickness,
      stitchSpacing,
      buffer,
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

  let stitchLengthNum = $derived(toNumber(stitchLength));
  let leatherThicknessNum = $derived(toNumber(leatherThickness));
  let stitchSpacingNum = $derived(toNumber(stitchSpacing));
  let bufferNum = $derived(toNumber(buffer));

  let stitchLengthInvalid = $derived(isInvalid(stitchLength));
  let leatherThicknessInvalid = $derived(isInvalid(leatherThickness));
  let stitchSpacingInvalid = $derived(isInvalid(stitchSpacing));
  let bufferInvalid = $derived(isInvalid(buffer));

  // 2 * length + (ceil(length / spacing) + 1) * thickness + buffer
  let mm = $derived(
    Math.ceil(
      stitchLengthNum * 2 +
        Math.ceil(stitchLengthNum / stitchSpacingNum + 1) * leatherThicknessNum +
        bufferNum,
    ),
  );
  let inches = $derived(
    Math.ceil(
      (stitchLengthNum * 2 +
        Math.ceil(stitchLengthNum / stitchSpacingNum + 1) * leatherThicknessNum +
        bufferNum) /
        25.4,
    ),
  );
</script>

<h1>
  {mm}mm&nbsp;&nbsp;&nbsp;{inches}in
</h1>
<p>
  stitch length:<input type="text" inputmode="decimal" bind:value={stitchLength} />mm
  {#if stitchLengthInvalid}
    <span class="input_warning">not a number</span>
  {/if}
</p>
<p>
  leather thickness:<input
    type="text"
    inputmode="decimal"
    bind:value={leatherThickness}
  />mm
  {#if leatherThicknessInvalid}
    <span class="input_warning">not a number</span>
  {/if}
</p>
<p>
  stitch spacing:<input
    type="text"
    inputmode="decimal"
    bind:value={stitchSpacing}
  />mm
  {#if stitchSpacingInvalid}
    <span class="input_warning">not a number</span>
  {/if}
</p>
<p>
  buffer:<input type="text" inputmode="decimal" bind:value={buffer} />mm
  {#if bufferInvalid}
    <span class="input_warning">not a number</span>
  {/if}
</p>
<p>2 * length + (ceiling(length / spacing) + 1) * thickness + buffer</p>
