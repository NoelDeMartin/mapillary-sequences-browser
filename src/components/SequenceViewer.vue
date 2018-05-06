<template>
    <div>
        <div
            id="mapillary-viewer"
            class="w-viewer h-viewer"
        />
        <div
            v-if="sequence"
            class="flex justify-between py-2"
        >
            <div class="flex items-center justify-center">
                <a
                    :href="sequence.author.profileUrl"
                    target="_blank"
                    class="mr-2"
                >
                    <img
                        :src="sequence.author.getAvatarUrl(clientId)"
                        class="block rounded-full w-16 h-16"
                    >
                </a>
                <div class="flex flex-col justify-start">
                    <a
                        :href="sequence.author.profileUrl"
                        target="_blank"
                        class="mb-1 no-underline text-base text-blue-darker font-bold"
                    >
                        {{ sequence.author.name }}
                    </a>
                    <span class="text-sm mb-1">{{ sequence.capturedAt.calendar() }}</span>
                    <span class="text-xs italic">Captured with {{ sequence.device }}</span>
                </div>
            </div>
            <span>
                image {{ currentImage }} / {{ sequence.images.length }} |
                {{ currentDistance | distance }} of {{ sequence.totalDistance | distance }}
            </span>
        </div>
    </div>
</template>

<script>
import { Viewer } from 'mapillary-js';

import { distance } from '@/utils/filters';

export default {
    filters: {
        distance,
    },
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
            currentDistance: 0,
            currentImage: 0,
        };
    },
    watch: {
        sequence() {
            this.viewer.moveToKey(this.sequence.firstImage.key);
            this.currentDistance = 0;
            this.currentImage = 0;
        },
    },
    mounted() {
        this.viewer = new Viewer(
            'mapillary-viewer',
            this.clientId,
        );
        this.viewer.on(
            Viewer.nodechanged,
            (...args) => this.updateImage(...args),
        );
    },
    methods: {
        updateImage(node) {
            const index = this.sequence.imageKeys.indexOf(node.key);
            if (this.sequence && index !== -1) {
                this.currentImage = index + 1;
                this.currentDistance = this.sequence.distances[index];
            }
        },
    },
};
</script>
