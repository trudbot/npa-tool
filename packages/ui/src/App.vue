<template>
  <div id="graph-container">
    <DependencyGraph :data="data" :width="1920" :height="1080" @nodeClick="foobar"></DependencyGraph>
  </div>
</template>

<script setup lang="ts">

import DependencyGraph from './views/DependencyGraph/index.vue'
import {onMounted, ref} from "vue";

const edges = [
  {
    "from": 0,
    "to": 13,
    "info": "dependencies"
  },
  {
    "from": 1,
    "to": 25,
    "info": "dependencies"
  },
  {
    "from": 1,
    "to": 26,
    "info": "dependencies"
  },
  {
    "from": 1,
    "to": 30,
    "info": "dependencies"
  },
  {
    "from": 1,
    "to": 31,
    "info": "dependencies"
  },
  {
    "from": 1,
    "to": 34,
    "info": "dependencies"
  },
  {
    "from": 1,
    "to": 35,
    "info": "dependencies"
  },
  {
    "from": 6,
    "to": 5,
    "info": "dependencies"
  },
  {
    "from": 7,
    "to": 8,
    "info": "dependencies"
  },
  {
    "from": 9,
    "to": 20,
    "info": "dependencies"
  },
  {
    "from": 9,
    "to": 22,
    "info": "dependencies"
  },
  {
    "from": 9,
    "to": 33,
    "info": "dependencies"
  },
  {
    "from": 12,
    "to": 9,
    "info": "dependencies"
  },
  {
    "from": 12,
    "to": 24,
    "info": "dependencies"
  },
  {
    "from": 13,
    "to": 12,
    "info": "dependencies"
  },
  {
    "from": 13,
    "to": 16,
    "info": "dependencies"
  },
  {
    "from": 13,
    "to": 18,
    "info": "dependencies"
  },
  {
    "from": 13,
    "to": 19,
    "info": "dependencies"
  },
  {
    "from": 13,
    "to": 21,
    "info": "dependencies"
  },
  {
    "from": 16,
    "to": 1,
    "info": "dependencies"
  },
  {
    "from": 18,
    "to": 6,
    "info": "dependencies"
  },
  {
    "from": 21,
    "to": 17,
    "info": "dependencies"
  },
  {
    "from": 21,
    "to": 19,
    "info": "dependencies"
  },
  {
    "from": 22,
    "to": 23,
    "info": "dependencies"
  },
  {
    "from": 25,
    "to": 10,
    "info": "dependencies"
  },
  {
    "from": 25,
    "to": 11,
    "info": "dependencies"
  },
  {
    "from": 25,
    "to": 30,
    "info": "dependencies"
  },
  {
    "from": 26,
    "to": 28,
    "info": "dependencies"
  },
  {
    "from": 26,
    "to": 14,
    "info": "dependencies"
  },
  {
    "from": 26,
    "to": 29,
    "info": "dependencies"
  },
  {
    "from": 29,
    "to": 27,
    "info": "dependencies"
  },
  {
    "from": 30,
    "to": 3,
    "info": "dependencies"
  },
  {
    "from": 31,
    "to": 32,
    "info": "dependencies"
  },
  {
    "from": 33,
    "to": 15,
    "info": "dependencies"
  },
  {
    "from": 34,
    "to": 4,
    "info": "dependencies"
  },
  {
    "from": 34,
    "to": 25,
    "info": "dependencies"
  },
  {
    "from": 34,
    "to": 30,
    "info": "dependencies"
  },
  {
    "from": 35,
    "to": 37,
    "info": "dependencies"
  },
  {
    "from": 35,
    "to": 39,
    "info": "dependencies"
  },
  {
    "from": 35,
    "to": 40,
    "info": "dependencies"
  },
  {
    "from": 37,
    "to": 7,
    "info": "dependencies"
  },
  {
    "from": 39,
    "to": 38,
    "info": "dependencies"
  },
  {
    "from": 39,
    "to": 14,
    "info": "dependencies"
  },
  {
    "from": 39,
    "to": 40,
    "info": "dependencies"
  },
  {
    "from": 40,
    "to": 36,
    "info": "dependencies"
  }
];

const nodes = [
  {
    "name": "test",
    "version": "1.0.0",
    "path": ""
  },
  {
    "name": "@isaacs/cliui",
    "version": "8.0.2",
    "path": "node_modules/@isaacs/cliui"
  },
  {
    "name": "@pkgjs/parseargs",
    "version": "0.11.0",
    "path": "node_modules/@pkgjs/parseargs"
  },
  {
    "name": "ansi-regex",
    "version": "6.0.1",
    "path": "node_modules/ansi-regex"
  },
  {
    "name": "ansi-styles",
    "version": "6.2.1",
    "path": "node_modules/ansi-styles"
  },
  {
    "name": "balanced-match",
    "version": "1.0.2",
    "path": "node_modules/balanced-match"
  },
  {
    "name": "brace-expansion",
    "version": "2.0.1",
    "path": "node_modules/brace-expansion"
  },
  {
    "name": "color-convert",
    "version": "2.0.1",
    "path": "node_modules/color-convert"
  },
  {
    "name": "color-name",
    "version": "1.1.4",
    "path": "node_modules/color-name"
  },
  {
    "name": "cross-spawn",
    "version": "7.0.3",
    "path": "node_modules/cross-spawn"
  },
  {
    "name": "eastasianwidth",
    "version": "0.2.0",
    "path": "node_modules/eastasianwidth"
  },
  {
    "name": "emoji-regex",
    "version": "9.2.2",
    "path": "node_modules/emoji-regex"
  },
  {
    "name": "foreground-child",
    "version": "3.1.1",
    "path": "node_modules/foreground-child"
  },
  {
    "name": "glob",
    "version": "10.3.3",
    "path": "node_modules/glob"
  },
  {
    "name": "is-fullwidth-code-point",
    "version": "3.0.0",
    "path": "node_modules/is-fullwidth-code-point"
  },
  {
    "name": "isexe",
    "version": "2.0.0",
    "path": "node_modules/isexe"
  },
  {
    "name": "jackspeak",
    "version": "2.2.2",
    "path": "node_modules/jackspeak"
  },
  {
    "name": "lru-cache",
    "version": "10.0.0",
    "path": "node_modules/lru-cache"
  },
  {
    "name": "minimatch",
    "version": "9.0.3",
    "path": "node_modules/minimatch"
  },
  {
    "name": "minipass",
    "version": "7.0.2",
    "path": "node_modules/minipass"
  },
  {
    "name": "path-key",
    "version": "3.1.1",
    "path": "node_modules/path-key"
  },
  {
    "name": "path-scurry",
    "version": "1.10.1",
    "path": "node_modules/path-scurry"
  },
  {
    "name": "shebang-command",
    "version": "2.0.0",
    "path": "node_modules/shebang-command"
  },
  {
    "name": "shebang-regex",
    "version": "3.0.0",
    "path": "node_modules/shebang-regex"
  },
  {
    "name": "signal-exit",
    "version": "4.1.0",
    "path": "node_modules/signal-exit"
  },
  {
    "name": "string-width",
    "version": "5.1.2",
    "path": "node_modules/string-width"
  },
  {
    "name": "string-width",
    "version": "4.2.3",
    "path": "node_modules/string-width-cjs"
  },
  {
    "name": "ansi-regex",
    "version": "5.0.1",
    "path": "node_modules/string-width-cjs/node_modules/ansi-regex"
  },
  {
    "name": "emoji-regex",
    "version": "8.0.0",
    "path": "node_modules/string-width-cjs/node_modules/emoji-regex"
  },
  {
    "name": "strip-ansi",
    "version": "6.0.1",
    "path": "node_modules/string-width-cjs/node_modules/strip-ansi"
  },
  {
    "name": "strip-ansi",
    "version": "7.1.0",
    "path": "node_modules/strip-ansi"
  },
  {
    "name": "strip-ansi",
    "version": "6.0.1",
    "path": "node_modules/strip-ansi-cjs"
  },
  {
    "name": "ansi-regex",
    "version": "5.0.1",
    "path": "node_modules/strip-ansi-cjs/node_modules/ansi-regex"
  },
  {
    "name": "which",
    "version": "2.0.2",
    "path": "node_modules/which"
  },
  {
    "name": "wrap-ansi",
    "version": "8.1.0",
    "path": "node_modules/wrap-ansi"
  },
  {
    "name": "wrap-ansi",
    "version": "7.0.0",
    "path": "node_modules/wrap-ansi-cjs"
  },
  {
    "name": "ansi-regex",
    "version": "5.0.1",
    "path": "node_modules/wrap-ansi-cjs/node_modules/ansi-regex"
  },
  {
    "name": "ansi-styles",
    "version": "4.3.0",
    "path": "node_modules/wrap-ansi-cjs/node_modules/ansi-styles"
  },
  {
    "name": "emoji-regex",
    "version": "8.0.0",
    "path": "node_modules/wrap-ansi-cjs/node_modules/emoji-regex"
  },
  {
    "name": "string-width",
    "version": "4.2.3",
    "path": "node_modules/wrap-ansi-cjs/node_modules/string-width"
  },
  {
    "name": "strip-ansi",
    "version": "6.0.1",
    "path": "node_modules/wrap-ansi-cjs/node_modules/strip-ansi"
  }
];

const data = ref({
  nodes: nodes.map((e, idx) => {
    return {
      id: idx.toString(),
      label: e.name + '@' + e.version
    }
  }),
  // 边集
  edges: edges.map((e) => {
    return {
      source: e.from.toString(),
      target: e.to.toString()
    }
  })
});

function foo() {
  data.value = {
    nodes: [
      {
        id:
            '1',
        label:
            '1'
      },
      {
        id: '2',
        label: '2'
      }
    ],
    edges: [
      {
        source: '1',
        target: '2'
      }
    ]
  }
}

function foobar(id) {
  console.log(id)
}

onMounted(() => {
  // console.log(nodes.map((e, idx) => {
  //   return {
  //     id: idx.toString(),
  //     label: e.name + '@' + e.version
  //   }
  // }))
  // console.log(edges.map((e) => {
  //   return {
  //     source: e.from.toString(),
  //     target: e.to.toString()
  //   }
  // }))
})
</script>

<style scoped>

</style>
