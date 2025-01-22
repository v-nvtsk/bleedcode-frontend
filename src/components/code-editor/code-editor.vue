<template>
  <codemirror
    v-model="code"
    placeholder="Code goes here..."
    :style="{ height: '600px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
  />
</template>

<script lang="ts">
  import {
    defineComponent, ref, shallowRef
  } from 'vue';
  import {Codemirror} from 'vue-codemirror';
  import {javascript} from '@codemirror/lang-javascript';
  import {oneDark} from '@codemirror/theme-one-dark';
  import type {EditorView} from 'codemirror';
  import {EditorState} from '@codemirror/state';

  export default defineComponent({
    components: {Codemirror},
    setup(props: {code: string}) {

      const code = ref(props.code || "console.log('Hello World!')");
      const extensions = [javascript(), oneDark];
      const view = shallowRef();
      const handleReady = (payload: {
        view: EditorView;
        state: EditorState;
        container: HTMLDivElement
      }) => {
        view.value = payload.view;
      };

      return {
        code,
        extensions,
        handleReady,
      };
    }
  });
</script>
