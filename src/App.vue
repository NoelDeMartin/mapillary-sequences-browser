<template>
    <div
        id="app"
        class="bg-grey-light w-screen h-screen"
    >
        <sequence-viewer
            :client-id="api.clientId"
            :sequence="activeSequence"
            class="sequence-viewer fixed pin-l pin-t pin-b p-4 h-screen overflow-auto"
        />
        <sequences-list
            :sequences="sequences"
            :active-sequence="activeSequence"
            class="fixed pin-r pin-t pin-b h-screen overflow-auto w-88"
            @select="updateActiveSequence"
            @bottom-reached="loadNextPage"
        />
    </div>
</template>

<script>
import Mapillary from '@/api/Mapillary';

import Sequence from '@/models/Sequence';

import SequencesList from '@/components/SequencesList.vue';
import SequenceViewer from '@/components/SequenceViewer.vue';

export default {
    components: {
        SequencesList,
        SequenceViewer,
    },
    data() {
        return {
            api: null,
            activeSequence: null,
            sequences: [],
            loading: false,
            page: 1,
        };
    },
    computed: {
        sequenceKeys() {
            return this.sequences.map(sequence => sequence.key);
        },
    },
    created() {
        this.loading = true;
        this.api = new Mapillary('dUFPUnNpY2lyT1VFN1ZzUk5mRnRnUTo1MDlhMDE3MDQxMGM1ZDFk');
        this.api
            .searchSequences()
            .then(sequences => {
                this.sequences = sequences;

                let promise = Promise.resolve();

                // Load favorite sequences
                for (const sequenceKey of Sequence.getFavorites()) {
                    promise = promise
                        .then(() => this.loadSequence(sequenceKey))
                        .then(sequence => {
                            sequence.favorite = true;
                        });
                }

                // Load hash sequence or use first sequence in the list
                if (location.hash.startsWith('#/sequence/')) {
                    promise = promise.then(() => this.loadSequence(location.hash.substr('#/sequence/'.length)));
                } else {
                    promise = promise.then(() => this.sequences[0]);
                }

                // Activate sequence
                promise = promise.then(sequence => {
                    this.activeSequence = sequence;
                    this.loading = false;
                });

                return promise;
            })
            .catch(error => {
                this.loading = false;
                alert(error.message);
            });
    },
    methods: {
        updateActiveSequence(sequence) {
            this.activeSequence = sequence;
        },
        loadNextPage() {
            if (!this.loading) {
                this.loading = true;
                this.page++;
                this.api
                    .searchSequences(this.page)
                    .then(sequences => {
                        for (const sequence of sequences) {
                            const index = this.sequenceKeys.indexOf(sequence.key);
                            if (index === -1) {
                                this.sequences.push(sequence);
                            }
                        }

                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        alert(error.message);
                    });
            }
        },
        loadSequence(key) {
            const index = this.sequenceKeys.indexOf(key);
            if (index !== -1) {
                return this.sequences[index];
            }

            return this.api
                .retrieveSequence(key)
                .then(sequence => {
                    this.sequences.unshift(sequence);
                    return sequence;
                });
        },
    },
};
</script>

<style lang="scss">
    #app .sequence-viewer {
        width: calc(config('width.screen') - config('width.88'));
    }
</style>
