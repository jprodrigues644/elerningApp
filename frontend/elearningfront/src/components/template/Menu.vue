<template>
    <aside class="menu" @mouseover="keepOpen" @mouseleave="closeMenu">
      <ul>
        <li v-for="item in menuItems" :key="item.title">
          {{ item.title }}
        </li>
      </ul>
    </aside>
  </template>
  
  <script>
  export default {
    name: "Menu",
    props: {
      menuVisible: Boolean
    },
    data() {
      return {
        menuItems: [
          { title: "Home" },
          { title: "Courses" },
          { title: "About" },
          { title: "Contact" }
        ]
      };
    },
    methods: {
      keepOpen() {
        this.$emit('menu-hover', true);
      },
      closeMenu() {
        this.$emit('menu-hover', false);
      }
    }
  };
  </script>
  
  <style>
  .menu {
    grid-area: menu;
    background-color: linear-gradient(to bottom, #ffffff91, #f7f2f2);
    display: flex;
    flex-direction: column;
    align-items: start; /* Align items to the start of the flex container */
    padding: 20px;
    color: rgb(20, 20, 20);
    box-shadow:
      rgba(0, 0, 0, 0.12) 0px 5px 5px,
      rgba(0, 0, 0, 0.12) 0px -3px 5px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 2px 4px,
      rgba(0, 0, 0, 0.09) 0px -1px 3px; /* Modified shadow for subtlety */
    border-radius: 5px; /* Optional: rounded corners */
  }
  ul {
    list-style-type: none; /* Remove bullet points from list */
    padding: 0; /* Remove padding */
    margin: 10; /* Remove margins */
  }
  li {
    padding: 8px 12px; /* Padding for each list item */
    cursor: pointer; /* Indicates that list items are clickable */
    transition: background-color 0.3s; /* Smooth transition for hover effect */
  }
  li:hover {
    background-color: #e8e8e8; /* Hover effect */
  }
  </style>
  
  