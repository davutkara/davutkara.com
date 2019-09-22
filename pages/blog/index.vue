<template>
  <div
    :class="{container: true,'container-plr': $windowSize ? $windowSize.breakpoints.sm : true, 'is-narrow':$windowSize ? $windowSize.breakpoints.sm : true }"
  >
    <div class="tabs is-toggle is-fullwidth">
      <ul>
        <li class="is-active">
          <a>
            <span class="icon is-small">
              <i class="fas fa-image" aria-hidden="true"></i>
            </span>
            <span>Bilişim Hakkında</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon is-small">
              <i class="fas fa-music" aria-hidden="true"></i>
            </span>
            <span>Kişisel Yazılar</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon is-small">
              <i class="fas fa-film" aria-hidden="true"></i>
            </span>
            <span>Sözler</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon is-small">
              <i class="far fa-file-alt" aria-hidden="true"></i>
            </span>
            <span>Paylaşımlar</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="columns is-multiline is-mobile">
      <div class="column is-one-quarter" v-for="k in [0,1,2,3,4,5,6,7,8]" :key="k">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus nec iaculis mauris.
              <a>@bulmaio</a>.
              <a href="#">#css</a>
              <a href="#">#responsive</a>
              <br />
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Component</p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
              <a
                href="#"
              >@bulmaio</a>.
              <a href="#">#css</a>
              <a href="#">#responsive</a>
              <br />
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">Save</a>
            <a href="#" class="card-footer-item">Edit</a>
            <a href="#" class="card-footer-item">Delete</a>
          </footer>
        </div>
      </div>
      <div class="column">
        <router-link to="/blog/123">
          <div class="card">
            <div class="card-content">
              <p
                class="title"
              >“There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.”</p>
              <p class="subtitle">Jeff Atwood</p>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
                <span>
                  View on
                  <a
                    href="https://twitter.com/codinghorror/status/506010907021828096"
                  >Twitter</a>
                </span>
              </p>
              <p class="card-footer-item">
                <span>
                  Share on
                  <a href="#">Facebook</a>
                </span>
              </p>
            </footer>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  nuxtI18n: {
    paths: {
      en: '/blog',
      tr: '/blog'
    }
  }
}
</script>

<style>
.tabs {
  margin-top: -8vw;
}
.tabs li {
  background: white;
}
</style>
