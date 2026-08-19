<script lang="ts">
  let {
    onClick,
    content,
    cssClass,
  }: {
    onClick: (e: MouseEvent) => void;
    content: string;
    cssClass: string;
  } = $props();
</script>

<button onclick={onClick} class={cssClass}>{content}</button>
