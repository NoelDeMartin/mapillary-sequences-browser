<template>
    <div
        :class="{ 'active': active }"
        class="sequence-preview relative flex px-4 py-2 cursor-pointer"
        @click="$emit('click')"
    >
        <div class="relative w-48">
            <img
                :src="firstImage.url"
                class="block w-48"
            >
            <span class="absolute pin-r pin-b p-1 bg-black text-white opacity-75 text-xs">
                {{ sequence.images.length }} images
            </span>
        </div>
        <div class="relative w-32">
            <div
                v-if="firstImage.hasLocation()"
                class="address absolute overflow-hidden"
            >
                <h3 class="text-sm mb-1">{{ firstImage.location.country }}</h3>
                <p class="text-xs">{{ firstImage.location.address }}</p>
            </div>
            <span class="absolute pin-r pin-b text-xs text-right text-blue-darker font-bold">
                By {{ sequence.author }}
            </span>
        </div>
    </div>
</template>

<script>
import Nominatim from '@/api/Nominatim';

export default {
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
    computed: {
        firstImage() {
            return this.sequence.images[0];
        },
    },
    mounted() {
        const api = new Nominatim();
        if (!this.firstImage.hasLocation()) {
            api.searchLocation(this.firstImage.latitude, this.firstImage.longitude)
                .then(location => {
                    this.firstImage.location = location;
                });
        }
    },
};
</script>

<style lang="scss">
    .sequence-preview {

        .address {
            top: 0;
            bottom: config('textSizes.lg');
            right: 0;
            left: config('padding.2');
        }

        &.active, &:hover {
            background: config('colors.green-lighter');
        }

    }
</style>
