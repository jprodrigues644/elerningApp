<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{ user.name }}</span>
      <div class="user-info">
        {{ user.email }}
      </div>
    </div>
    <div class="user-dropdown-content">
      <a href=""> <FontAwesomeIcon icon="cogs" :style="{'aria-hidden': 'true'}" /> Admintration</a>
      <a href=""> <FontAwesomeIcon icon="sign-out-alt" />  Sign Out </a> <!-- Corrected icon reference -->
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useUserStore } from '../../config/store'; 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import sign-out icon
import { library } from '@fortawesome/fontawesome-svg-core';

// Add the icons to the library
library.add(faCogs, faSignOutAlt); // Add sign-out icon

export default defineComponent({
  name: 'UserDropDown',
  components: { FontAwesomeIcon },
  setup() {
    const userStore = useUserStore();
    const user = computed(() => userStore.user);
    return { user };
  }
});
</script>

<style>
.user-dropdown{
  position : relative;
}
.user-dropdown:hover {
  cursor: pointer;
}

.user-info {
  max-width: 160px; /* Largeur maximale ajustable selon vos besoins */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-dropdown-content{
  display :flex;
  position : absolute;
  margin-left : 10px;
  right :0px;
  padding : 10px;
  flex-direction:column;
  flex-wrap :wrap ;
  
  background-color:linear-gradient(to bottom, #ffffff91, #f7f2f2);
  box-shadow:
      rgba(0, 0, 0, 0.12) 0px 5px 5px,
      rgba(0, 0, 0, 0.12) 0px -3px 5px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 2px 4px,
      rgba(0, 0, 0, 0.09) 0px -1px 3px;;
  /* Modified shadow for subtlety */
    border-radius: 5px;
    min-width : 150px;
    visibility :hidden ;
    opacity : 0 ;
    transition : visibility 0 , opacity 0.5s  linear ;
}

  .user-dropdown:hover .user-dropdown-content {
  visibility :  visible ;
  opacity :1;
 }
  .user-dropdown-content:hover .user-dropdown-content {
  visibility :  visible ;
  opacity : 1 ; 
 }

 .user-dropdown-content a {
  text-decoration : none;
  color: #000;
 }
 .user-dropdown-content a:hover {
  text-decoration : none;
  background-color : #e8e8e8;;
  color: #000;
 }
</style>
