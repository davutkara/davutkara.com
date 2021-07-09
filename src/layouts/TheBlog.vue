<template>
  <the-blog-sidebar />
  <the-blog-frame />
</template>

<script>
import TheBlogSidebar from "./TheBlogSidebar";
import TheBlogFrame from "./TheBlogFrame";
export default {
  name: "Blog",
  components: { TheBlogSidebar, TheBlogFrame },
};
</script>

<style lang="scss">
@import "~@/assets/css/reset.css";


body {
  overflow: hidden;
  font-family: "Raleway";
  font-size: 18px;

  #app{
    display: flex;
  }
}
/*
aside#icon-bar {
  background: #333333;
  height: 100vh;
  width: 50px;
  float: left;
}

aside#icon-bar ul li {
  padding: 1em 0;
  text-align: center;
}

aside#icon-bar ul li.active {
  border-left: 2px solid #fff;
}

aside#icon-bar ul li svg {
  fill: #adadad;
  width: 60%;
  height: auto;
  cursor: pointer;
}

aside#icon-bar ul li svg:hover {
  fill: #cfcfcf;
}
*/




@media only screen and (max-width: 768px) {
  aside#file-bar {
    display: none;
  }
  section#text-bar {
    width: 100vw;
  }
  section#text-bar article {
    margin-top: 6em;
  }
}

@media only screen and (max-width: 760px) {
  aside#file-bar,
  #tabs {
    display: none;
  }
  section#text-bar {
    width: 100vw;
  }
  section#text-bar article {
    margin-top: 0;
  }
}

</style>
