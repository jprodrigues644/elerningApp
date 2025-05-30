<template>
   <header class="custom-app-bar">
     <div class="left-align">
       <a class="toggle" @mouseover="toggleMenu(true)">Explore</a>
     </div>
     <div class="center-align">
    <a class="linkhome" href=""> <h1 class="title">Elearning <span class="spanApp">App</span></h1> </a>
     <div class="right-align"> </div>
      <UserDropDown v-if="!hideUserDropDown"/>
     </div>
</header>
 </template>
 
 <script>
 import UserDropDown from '../template/UserDropDown.vue'
  export default {
   name: 'Header',
   components :{UserDropDown},
   props : { hideUserDropDown : Boolean },
   methods: {
     toggleMenu(show) {
      this.$emit('toggle-menu', show);
      console.log("work heade toogle")
     }
   }
 }
 </script>
  
 <style scoped>
 .custom-app-bar {
   background: linear-gradient(to bottom, #ffffff, #f7f2f2); /* Glossy effect with a subtle gradient from white to light grey */
   color: #000000; /* Dark text for better contrast */
   padding: 20px;
   border-radius: 10px; /* Rounded corners */
   box-shadow: 
   rgba(0, 0, 0, 0.12) 0px 27px 30px -10px, /* Adjusted for less depth */
   rgba(0, 0, 0, 0.12) 0px -6px 15px -5px, /* Smaller, less negative spread */
   rgba(0, 0, 0, 0.12) 0px 2px 3px -1px, /* Reduced blur and spread */
   rgba(0, 0, 0, 0.17) 0px 6px 8px -2px, /* Subtler mid shadow */
   rgba(0, 0, 0, 0.09) 0px -1px 3px -1px; /* Very subtle shadow to enhance depth */ /* Deep and layered shadows for a dramatic 3D effect */
   display: flex;
   align-items: center;
   justify-content: center;
   font-family: 'Lato', sans-serif;
   width: 100%; /* Full width to match the parent's width */
   box-sizing: border-box;
   flex-grow: 1;
 }

 .spanApp{
   color:blueviolet;
   font-weight: bold;
   font-family: 'Arvo' , serif;
 }

 .left-align {
   flex-grow: 0.8; /* Makes the div grow to push the title to center */
   display: flex;
   justify-content: flex-start; /* Aligns the toggle button to the left */
   padding-left: 4rem;
 }

 .right-align {
  flex-grow: 0.8; /* Makes the div grow to push the title to center */
  display: flex;
  justify-content: flex-end;
  
 }

 .center-align {
  flex-grow: 0.8; /* Makes the div grow to push the title to center */
  display: flex;
  justify-content: center
 }

 .toggle {
   text-decoration: none;
   cursor: pointer; /* Cursor appears as a pointer */
   color: #000000; /* Ensures the link is visible, adjust color as needed */
   flex-grow: 0; /* Prevents the link from growing */
 }

 .linkhome {
  text-decoration: none;
   cursor: pointer;
   color : #000;
 }

 .custom-app-bar > div:last-child {
   flex-grow: 1;
 }


 
 </style>
 
 