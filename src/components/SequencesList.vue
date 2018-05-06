<template>
    <div class="sequences-list bg-grey pt-12">
        <div class="tabs h-12 absolute pin-t pin-r pin-l">
            <button
                :class="{ 'active': !favorites }"
                class="tab"
                @click="favorites = false"
            >
                <zondicon
                    name="view-list"
                    class="icon"
                />
                <span>All</span>
            </button>
            <button
                :class="{ 'active': favorites }"
                class="tab"
                @click="favorites = true"
            >
                <zondicon
                    name="star"
                    class="icon"
                />
                <span>Favorites</span>
            </button>
        </div>
        <div class="list-wrapper overflow-auto">
            <sequence-preview
                v-for="sequence in activeSequences"
                :key="sequence.key"
                :sequence="sequence"
                :active="activeSequence && sequence.key === activeSequence.key"
                @click="$emit('select', sequence)"
            />
            <div
                ref="bottom"
                class="h-px"
            />
        </div>
    </div>
</template>

<script>
import Zondicon from '@/components/Zondicon.vue';
import SequencePreview from '@/components/SequencePreview.vue';

export default {
    components: {
        Zondicon,
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
    data() {
        return {
            favorites: false,
        };
    },
    computed: {
        activeSequences() {
            return this.favorites ? this.sequences.filter(sequence => sequence.favorite) : this.sequences;
        },
    },
    mounted() {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !this.favorites) {
                this.$emit('bottom-reached');
            }
        });
        observer.observe(this.$refs.bottom);
    },
};
</script>

<style lang="scss">
    .sequences-list .list-wrapper {
        height: calc(config('height.screen') - config('height.12'));
    }
</style>
