<script lang="ts">
  import Router from "svelte-spa-router";
  import NavBar from "./components/NavBar.svelte";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import Thoughts from "./routes/Thoughts.svelte";
  import Words from "./routes/Words.svelte";
  import ThreadLengthCalc from "./routes/ThreadLengthCalc.svelte";
  import SpacingCalc from "./routes/SpacingCalc.svelte";
  import NotFound from "./routes/NotFound.svelte";

  const routes = {
    "/": Home,
    "/about": About,
    "/thoughts": Thoughts,
    "/words": Words,
    "/thread-length-calc": ThreadLengthCalc,
    "/spacing-calc": SpacingCalc,
    "*": NotFound,
  };
</script>

<NavBar />
<div class="main_container">
  <Router {routes} />
</div>
