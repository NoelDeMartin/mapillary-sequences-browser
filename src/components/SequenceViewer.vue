<template>
    <div class="flex flex-col items-center justify-start">
        <div
            id="mapillary-viewer"
            class="w-viewer h-viewer flex-no-shrink"
        />
        <div
            v-if="sequence"
            class="w-viewer flex flex-col justify-between py-2"
        >
            <h1 class="flex items-center justify-between text-2xl font-bold mb-2">
                <span v-if="sequence.firstImage.hasLocation()">{{ sequence.firstImage.location.country }}</span>
                <zondicon
                    :class="{
                        'text-green': sequence.favorite,
                        'text-grey': !sequence.favorite,
                    }"
                    size="6"
                    name="star"
                    class="cursor-pointer"
                    @click.native="toggleFavorite()"
                />
            </h1>
            <div class="flex justify-between mb-2">
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
                <div class="flex flex-col justify-around">
                    <div>
                        <zondicon name="camera" />
                        <span>{{ currentImage }} / {{ sequence.images.length }}</span>
                    </div>
                    <div>
                        <zondicon name="location-current" />
                        <span>{{ currentDistance | distance }} / {{ sequence.totalDistance | distance }}</span>
                    </div>
                </div>
            </div>
            <p
                v-if="sequence.firstImage.hasLocation()"
                class="text-sm leading-normal text-grey-darker font-normal"
            >
                {{ sequence.firstImage.location.address }}
            </p>
        </div>
    </div>
</template>

<script>
import { Viewer } from 'mapillary-js';

import Zondicon from '@/components/Zondicon.vue';

import Sequence from '@/models/Sequence';

import { distance } from '@/utils/filters';

export default {
    filters: {
        distance,
    },
    components: {
        Zondicon,
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
            this.viewer.getComponent('sequence').stop();
            this.currentDistance = 0;
            this.currentImage = 0;
            location.hash = '/sequence/' + this.sequence.key;
        },
    },
    mounted() {
        this.viewer = new Viewer(
            'mapillary-viewer',
            this.clientId,
        );
        this.viewer.on(
            Viewer.nodechanged,
            node => {
                const index = this.sequence.imageKeys.indexOf(node.key);
                if (this.sequence && index !== -1) {
                    this.currentImage = index + 1;
                    this.currentDistance = this.sequence.distances[index];
                }
            },
        );
    },
    methods: {
        toggleFavorite() {
            this.sequence.favorite = !this.sequence.favorite;
            if (this.sequence.favorite) {
                Sequence.addFavorite(this.sequence);
            } else {
                Sequence.removeFavorite(this.sequence);
            }
        },
    },
};
</script>
