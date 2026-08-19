<script lang="ts">
  import { SortDirection, FilterState } from "../types";
  import SortButton from "./SortButton.svelte";

  let {
    onClick,
    sortDirection,
    onDateClick,
    dateSortDirection,
    onSoundGoodClick,
    soundFilter,
    onLookGoodClick,
    lookFilter,
    onMeansGoodClick,
    meansFilter,
    onOverallGoodClick,
    overallFilter,
  }: {
    onClick: (dir: SortDirection) => void;
    sortDirection: SortDirection;
    onDateClick: (dir: SortDirection) => void;
    dateSortDirection: SortDirection;
    onSoundGoodClick: (state: FilterState) => void;
    soundFilter: FilterState;
    onLookGoodClick: (state: FilterState) => void;
    lookFilter: FilterState;
    onMeansGoodClick: (state: FilterState) => void;
    meansFilter: FilterState;
    onOverallGoodClick: (state: FilterState) => void;
    overallFilter: FilterState;
  } = $props();

  function createOnClick(
    onClickCb: (state: FilterState) => void,
    filterCriteria: FilterState,
    defaultOutput: FilterState,
  ): (e: MouseEvent) => void {
    return () => {
      if (filterCriteria === defaultOutput) {
        onClickCb(FilterState.All);
      } else {
        onClickCb(defaultOutput);
      }
    };
  }

  let abcSortClass = $derived(
    sortDirection === SortDirection.Abc ? "active_sort" : "",
  );
  let zyxSortClass = $derived(
    sortDirection === SortDirection.Zyx ? "active_sort" : "",
  );
  let ascDateSortClass = $derived(
    dateSortDirection === SortDirection.Abc ? "active_sort" : "",
  );
  let descDateSortClass = $derived(
    dateSortDirection === SortDirection.Zyx ? "active_sort" : "",
  );

  let soundsGoodClass = $derived(
    soundFilter === FilterState.OnlyTrue
      ? "active_sort fa-solid fa-check"
      : "fa-solid fa-check",
  );
  let soundsBadClass = $derived(
    soundFilter === FilterState.OnlyFalse
      ? "active_sort fa-solid fa-xmark"
      : "fa-solid fa-xmark",
  );

  let looksGoodClass = $derived(
    lookFilter === FilterState.OnlyTrue
      ? "active_sort fa-solid fa-check"
      : "fa-solid fa-check",
  );
  let looksBadClass = $derived(
    lookFilter === FilterState.OnlyFalse
      ? "active_sort fa-solid fa-xmark"
      : "fa-solid fa-xmark",
  );

  let meansGoodClass = $derived(
    meansFilter === FilterState.OnlyTrue
      ? "active_sort fa-solid fa-check"
      : "fa-solid fa-check",
  );
  let meansBadClass = $derived(
    meansFilter === FilterState.OnlyFalse
      ? "active_sort fa-solid fa-xmark"
      : "fa-solid fa-xmark",
  );

  let overallGoodClass = $derived(
    overallFilter === FilterState.OnlyTrue
      ? "active_sort fa-solid fa-check"
      : "fa-solid fa-check",
  );
  let overallBadClass = $derived(
    overallFilter === FilterState.OnlyFalse
      ? "active_sort fa-solid fa-xmark"
      : "fa-solid fa-xmark",
  );

  function onSortAbcClick() {
    if (sortDirection === SortDirection.Abc) {
      onClick(SortDirection.Unchanged);
    } else {
      onClick(SortDirection.Abc);
    }
  }
  function onSortZyxClick() {
    if (sortDirection === SortDirection.Zyx) {
      onClick(SortDirection.Unchanged);
    } else {
      onClick(SortDirection.Zyx);
    }
  }

  function onSortDateAscClick() {
    if (dateSortDirection === SortDirection.Abc) {
      onDateClick(SortDirection.Unchanged);
    } else {
      onDateClick(SortDirection.Abc);
    }
  }
  function onSortDateDescClick() {
    if (dateSortDirection === SortDirection.Zyx) {
      onDateClick(SortDirection.Unchanged);
    } else {
      onDateClick(SortDirection.Zyx);
    }
  }

  let onFilterSoundsGoodClick = $derived(
    createOnClick(onSoundGoodClick, soundFilter, FilterState.OnlyTrue),
  );
  let onFilterSoundsBadClick = $derived(
    createOnClick(onSoundGoodClick, soundFilter, FilterState.OnlyFalse),
  );

  let onFilterLooksGoodClick = $derived(
    createOnClick(onLookGoodClick, lookFilter, FilterState.OnlyTrue),
  );
  let onFilterLooksBadClick = $derived(
    createOnClick(onLookGoodClick, lookFilter, FilterState.OnlyFalse),
  );

  let onFilterMeansGoodClick = $derived(
    createOnClick(onMeansGoodClick, meansFilter, FilterState.OnlyTrue),
  );
  let onFilterMeansBadClick = $derived(
    createOnClick(onMeansGoodClick, meansFilter, FilterState.OnlyFalse),
  );

  let onFilterOverallGoodClick = $derived(
    createOnClick(onOverallGoodClick, overallFilter, FilterState.OnlyTrue),
  );
  let onFilterOverallBadClick = $derived(
    createOnClick(onOverallGoodClick, overallFilter, FilterState.OnlyFalse),
  );
</script>

<tr class="border_top_bottom">
  <th></th>
  <th>
    word
    <br />
    <SortButton onClick={onSortAbcClick} content="abc" cssClass={abcSortClass} />
    <SortButton onClick={onSortZyxClick} content="zyx" cssClass={zyxSortClass} />
  </th>
  <th>
    date
    <br />
    <SortButton
      onClick={onSortDateAscClick}
      content="asc"
      cssClass={ascDateSortClass}
    />
    <SortButton
      onClick={onSortDateDescClick}
      content="desc"
      cssClass={descDateSortClass}
    />
  </th>
  <th class="border_left">
    sounds
    <br />
    <SortButton onClick={onFilterSoundsGoodClick} content="" cssClass={soundsGoodClass} />
    <SortButton onClick={onFilterSoundsBadClick} content="" cssClass={soundsBadClass} />
  </th>
  <th>
    looks
    <br />
    <SortButton onClick={onFilterLooksGoodClick} content="" cssClass={looksGoodClass} />
    <SortButton onClick={onFilterLooksBadClick} content="" cssClass={looksBadClass} />
  </th>
  <th>
    means
    <br />
    <SortButton onClick={onFilterMeansGoodClick} content="" cssClass={meansGoodClass} />
    <SortButton onClick={onFilterMeansBadClick} content="" cssClass={meansBadClass} />
  </th>
  <th class="border_left">
    overall
    <br />
    <SortButton onClick={onFilterOverallGoodClick} content="" cssClass={overallGoodClass} />
    <SortButton onClick={onFilterOverallBadClick} content="" cssClass={overallBadClass} />
  </th>
</tr>

<!-- need two dummy rows for the alternate coloring to work because the detail toggle is a hidden row -->
<tr class="dummy_row">
  <td class="expand_toggle"></td>
  <td class="word"></td>
  <td class="affirmative"></td>
  <td class="affirmative"></td>
  <td class="affirmative"></td>
  <td class="affirmative"></td>
</tr>
<tr class="dummy_row">
  <td class="expand_toggle"></td>
  <td class="word"></td>
  <td class="affirmative"></td>
  <td class="affirmative"></td>
  <td class="affirmative"></td>
  <td class="affirmative"></td>
</tr>
