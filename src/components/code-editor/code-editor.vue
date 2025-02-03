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

<script setup lang="ts">
  import {
    ref, shallowRef,
    watch
  } from 'vue';
  import {Codemirror} from 'vue-codemirror';
  import {javascript} from '@codemirror/lang-javascript';
  import {oneDark} from '@codemirror/theme-one-dark';
  import type {EditorView} from 'codemirror';
  import {EditorState} from '@codemirror/state';

  const props = defineProps<{solution: string}>();
  const code = ref(props.solution);
  const extensions = [javascript(), oneDark];
  const view = shallowRef();
  const handleReady = (payload: {
    view: EditorView;
    state: EditorState;
    container: HTMLDivElement
  }) => {
    view.value = payload.view;
  };

  watch(() => (props.solution), (newSolution: string) => {
    code.value = newSolution;
  });
</script>
