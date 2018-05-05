<template>
    <div
        id="mapillary-viewer"
        style="width: 640px; height: 480px;"
    />
</template>

<script>
import { Viewer } from 'mapillary-js';

export default {
    props: {
        sequence: {
            type: Object,
            required: false,
            default: null,
        },
        clientId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            viewer: null,
        };
    },
    watch: {
        sequence() {
            this.viewer.moveToKey(this.sequence.images[0].key);
        },
    },
    mounted() {
        this.viewer = new Viewer(
            'mapillary-viewer',
            this.clientId,
        );
    },
};
</script>
