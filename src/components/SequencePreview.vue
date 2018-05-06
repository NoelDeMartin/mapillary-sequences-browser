<template>
    <div
        :class="{
            'bg-grey-dark': active,
            'bg-grey': !active,
        }"
        class="sequence-preview relative flex px-4 py-2 cursor-pointer hover:bg-grey-dark"
        @click="$emit('click')"
    >
        <div class="relative w-48">
            <img
                :src="sequence.firstImage.thumbnailUrl"
                class="block w-48"
            >
            <span
                v-if="sequence.favorite"
                class="absolute pin-t pin-l p-1 bg-black text-green opacity-75"
            >
                <zondicon
                    name="star"
                    class="block"
                />
            </span>
            <span class="absolute pin-r pin-b p-1 bg-black text-white opacity-75 text-xs">
                {{ sequence.images.length }} images | {{ sequence.totalDistance | distance }}
            </span>
        </div>
        <div class="relative w-32">
            <div
                v-if="sequence.firstImage.hasLocation()"
                class="address absolute overflow-hidden"
            >
                <h3 class="text-sm mb-1">{{ sequence.firstImage.location.country }}</h3>
                <p class="text-xs">{{ sequence.firstImage.location.address }}</p>
            </div>
            <span class="absolute pin-r pin-b text-xs text-right text-blue-darker font-bold">
                By {{ sequence.author.name }}
            </span>
        </div>
    </div>
</template>

<script>
import Zondicon from '@/components/Zondicon.vue';

import Nominatim from '@/api/Nominatim';

import { distance } from '@/utils/filters';

export default {
    components: {
        Zondicon,
    },
    filters: {
        distance,
    },
    props: {
        sequence: {
            type: Object,
            required: true,
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        const api = new Nominatim();
        if (!this.sequence.firstImage.hasLocation()) {
            api.searchLocation(this.sequence.firstImage.latitude, this.sequence.firstImage.longitude)
                .then(location => {
                    this.sequence.firstImage.location = location;
                });
        }
    },
};
</script>

<style lang="scss">
    .sequence-preview .address {
        top: 0;
        right: 0;
        bottom: config('textSizes.lg');
        left: config('padding.2');
    }
</style>
