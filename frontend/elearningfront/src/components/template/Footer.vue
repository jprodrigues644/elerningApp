<template>
    <footer class="footer">
        <span>Copyright Joao Paulo </span>
    </footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style>
.footer {
    grid-area: footer;
    background-color: #ffffffd3;
    color: #000000;
    display: flex; /* Add display flex */
    align-items: center; /* Center align items vertically */
    justify-content: flex-end;
    padding-right: 10px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);

}
</style>
