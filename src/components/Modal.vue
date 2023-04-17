<template>
          <!-- so vai existir se a tarefa selecionada for verdadeira = v-if -->
          <div class="modal" :class="{'is-active' : mostrar}" v-if="mostrar">
            <div class="modal-background"></div>
            <div class="modal-card">
                <!-- representa todos os elementos que estiverem dentro do modal -->
                <header>
                    <slot name="cabecalho" />
                </header>
                <section>
                    <slot name="corpo" />
                </section>
                <footer>
                    <slot name="rodape" />
                </footer>
            </div>
          </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'Modal', 
        props: {
            mostrar: {
                Type: Boolean, 
                required: true
            }
        }
    })
</script>