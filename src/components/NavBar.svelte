<script lang="ts">
  import { link } from "svelte-spa-router";

  let toolsOpen = $state(false);
  let navEl: HTMLDivElement | undefined;

  function toggleTools(e: MouseEvent) {
    e.stopPropagation();
    toolsOpen = !toolsOpen;
  }

  function closeTools() {
    toolsOpen = false;
  }

  function onWindowClick(e: MouseEvent) {
    if (toolsOpen && navEl && !navEl.contains(e.target as Node)) {
      toolsOpen = false;
    }
  }

  function onWindowKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      toolsOpen = false;
    }
  }
</script>

<svelte:window onclick={onWindowClick} onkeydown={onWindowKeydown} />

<div bind:this={navEl}>
  <nav class="nav-main">
    <ul>
      <li class="hvr-underline-reveal"><a href="/" use:link>home</a></li>
      <!-- <li class="hvr-underline-reveal"><a href="/thoughts" use:link>every thought</a></li> -->
      <li class="hvr-underline-reveal"><a href="/words" use:link>wordex</a></li>
      <li class="nav-dropdown">
        <button class="nav-dropdown-toggle" aria-expanded={toolsOpen} onclick={toggleTools}>
          <span class="hvr-underline-reveal">
            tools
            <i class={toolsOpen ? "fa-angle-up fa-solid" : "fa-angle-down fa-solid"}
            ></i>
          </span>
        </button>
        {#if toolsOpen}
          <ul class="nav-dropdown-menu">
            <li>
              <a href="/thread-length-calc" use:link onclick={closeTools}
                >thread length calc</a
              >
            </li>
            <li>
              <a href="/spacing-calc" use:link onclick={closeTools}>spacing calc</a>
            </li>
          </ul>
        {/if}
      </li>
      <li class="hvr-underline-reveal"><a href="/about" use:link>about</a></li>
    </ul>
  </nav>
</div>
