<template>
    <div class="bg-grey-light py-4 pl-4 pr-88 w-full h-screen flex flex-col items-center justify-start">

        <template v-if="activeSequence && activeSequence.images[0].hasLocation()">
            <h1 class="text-2xl font-bold">{{ activeSequence.images[0].location.country }}</h1>
            <h2 class="text-base font-normal mb-4">{{ activeSequence.images[0].location.address }}</h2>
        </template>

        <template v-else>
            <h1 class="text-2xl font-bold">Mapillary Sequences Viewer</h1>
            <h2 class="text-base font-normal mb-4">Explore Mapillary sequences!</h2>
        </template>

        <div class="flex">
            <sequence-viewer
                :client-id="api.clientId"
                :sequence="activeSequence"
                class="mr-4"
            />
            <sequences-list
                :sequences="sequences"
                :active-sequence="activeSequence"
                class="fixed pin-r pin-b pin-t overflow-auto"
                @select="updateActiveSequence"
            />
        </div>

    </div>
</template>

<script>
import Mapillary from '@/api/Mapillary';

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
        };
    },
    created() {
        this.api = new Mapillary('dUFPUnNpY2lyT1VFN1ZzUk5mRnRnUTo1MDlhMDE3MDQxMGM1ZDFk');
        this.api.searchSequences().then(sequences => {
            this.sequences = sequences;
            this.activeSequence = sequences[0];
        });
    },
    methods: {
        updateActiveSequence(sequence) {
            this.activeSequence = sequence;
        },
    },
};
</script>
