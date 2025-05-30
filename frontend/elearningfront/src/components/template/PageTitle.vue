<template>
    <div class="page-title">
        <h1>{{icon}}{{title}}</h1>
        <h2>{{subetitle}}</h2>
    </div>
</template>
  
  
  <script>
  export default {
    name: 'PageTitle',
    props:['icon','main','sub']
  }
  </script>
  
  <style>
  </style>
  