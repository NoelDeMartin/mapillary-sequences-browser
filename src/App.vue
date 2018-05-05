<template>
    <div class="bg-grey-light w-screen h-screen flex items-center justify-center">
        <sequence-viewer
            :client-id="api.clientId"
            :sequence="activeSequence"
        />
        <sequences-list
            :sequences="sequences"
            :active-sequence="activeSequence"
            @select="updateActiveSequence"
        />
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
