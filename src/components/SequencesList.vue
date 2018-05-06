<template>
    <div>
        <sequence-preview
            v-for="sequence in sequences"
            :key="sequence.key"
            :sequence="sequence"
            :active="activeSequence && sequence.key === activeSequence.key"
            @click="$emit('select', sequence)"
        />
    </div>
</template>

<script>
import SequencePreview from '@/components/SequencePreview.vue';

export default {
    components: {
        SequencePreview,
    },
    props: {
        sequences: {
            type: Array,
            required: true,
        },
        activeSequence: {
            type: Object,
            required: false,
            default: null,
        },
    },
};
</script>
