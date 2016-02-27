<template>
<div class="navbar">
    <input id="search" name="search" class="search">
    <button class="favorites">*</button>
    <a class="title">Scripsi</a>
    <span>{{ state.unsavedChanges ? '+' : '-' }}</span>
</div>
</template>

<script>
  export default {
    props: {
      state: { required: true }
    }
  }
</script>

<style scoped>
 .navbar {
     height: 1rem;
     width: 100%;
     display: flex;
     flex-flow: row nowrap;
     justify-content: space-between;
     border: 1px solid #aaa;
 }
 .title {
     width: 5rem;
     flex-grow: 1;
     text-align: center;
 }
 .search {
     width: 7rem;
     flex-grow: 0;
 }
 .favorites {
     width: 0.5rem;
     flex-grow: 0;
 }
 .datasource {
     flex-grow: 0;
 }
</style>
