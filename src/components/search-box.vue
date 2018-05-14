<template>
  <div id="search-module">
    <div id="search-box">
      <div class="icon">
        <i class="icon-search"></i>
      </div>
      <div class="input-box">
        <input type="text" v-model="query" v-on:change="queryChanged" :placeholder="$t('sidebar.search')">
      </div>
    </div>

    <div id="search-results" v-if="query !== ''">
      <div v-if="results.accounts.length > 0">
        <div class="search-results-header">{{ $t('sidebar.search-accounts') }} ({{ results.accounts.length }})</div>
        <div id="accounts">
          <AccountCard v-for="account in results.accounts" v-bind:key="account.id" v-bind:account="account" />
        </div>
      </div>

      <div v-if="results.hashtags.length > 0">
        <div class="search-results-header">{{ $t('sidebar.search-hashtags') }} ({{ results.hashtags.length }})</div>
        <ul id="hashtags">
          <li v-for="hashtag in results.hashtags" v-bind:key="hashtag">
            <router-link :to="{name: 'tag.collection', params: {collection: hashtag}}">#{{ hashtag }}</router-link>
          </li>
        </ul>
      </div>

      <div v-if="results.statuses.length > 0 && 0">
        <div class="search-results-header">{{ $t('sidebar.search-statuses') }} ({{ results.statuses.length }})</div>
        <div id="activities">
          <ChildActivity v-for="activity in results.statuses" v-bind:key="activity.id" v-bind:activity="activity" v-bind:show-children="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import APIService from '../services/api'
import ChildActivity from './activity-child'
import AccountCard from './account-card'

export default {
  name: 'SearchBox',
  components: { ChildActivity, AccountCard },
  data () {
    return {
      query: '',
      results: {}
    }
  },
  methods: {
    queryChanged () {
      APIService.search(this.query)
        .then((resp) => { this.results = resp })
    }
  }
}
</script>

<style scoped>
#search-module {
  flex: 1;
  margin-left: 0.5em;
  max-width: 20em;
  padding: 0.5em;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.0);
  color: #333;
}

#search-box {
  display: flex;
  flex-direction: row;
}

#search-results {
  position: absolute;
  top: 3em;
  margin-left: -0.5em;
  padding: 0.5em;
  background: #fff;
  z-index: 999999;
  border: 1px solid #999;
  overflow-y: scroll;
  height: 20em;
  width: 20em;
}

.icon {
  flex: 1;
  max-width: 24px;
  padding-top: 0.3em;
  font-size: 75%;
}

.input-box {
  flex: 1;
}

input {
  width: 100%;
  border: none;
  font-size: 75%;
  background: transparent;
}

.search-results-header {
  font-size: 75%;
  border-bottom: 1px solid #999;
}

#hashtags {
  font-size: 75%;
  list-style-type: none;
  padding-left: 0;
}

#activities {
  font-size: 75%;
  max-width: 100%;
}
</style>
