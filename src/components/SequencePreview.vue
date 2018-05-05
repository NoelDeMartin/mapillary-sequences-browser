<template>
    <div
        :class="{ 'active': active }"
        class="sequence-preview relative px-4 py-2 cursor-pointer"
        @click="$emit('click')"
    >
        <div class="relative w-64">
            <img
                :src="sequence.images[0].url"
                class="block w-64"
            >
            <span class="absolute pin-r pin-b p-1 bg-white opacity-50 text-sm">
                {{ sequence.author }}
            </span>
        </div>
    </div>
</template>

<script>
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
};
</script>

<style lang="scss">
    .sequence-preview {

        &::after {
            content: " ";
            opacity: .25;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }

        &.active::after {
            background: config('colors.blue-light');
        }

        &:hover::after {
            background: config('colors.green-light');
        }

    }
</style>
