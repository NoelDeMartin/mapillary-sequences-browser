<template>
    <svg
        :class="['fill-current', 'w-' + size, 'h-' + size].join(' ')"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
    >
        <path :d="path" />
    </svg>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: false,
            default: '4',
        },
    },
    computed: {
        path() {
            switch (this.name) {
                case 'star':
                    return 'M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 ' +
                        '5.955 6.572.955-4.756 4.635 1.123 6.545z';
                case 'camera':
                    return 'M0 6c0-1.1.9-2 2-2h3l2-2h6l2 2h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 ' +
                        '1-2-2V6zm10 10a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z';
                case 'location-current':
                    return 'M0 0l20 8-8 4-2 8z';
                case 'view-list':
                    return 'M0 3h20v2H0V3zm0 4h20v2H0V7zm0 4h20v2H0v-2zm0 4h20v2H0v-2z';
                case 'question':
                default:
                    return 'M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm2-13c0 .28-.21.8-.42 ' +
                        '1L10 9.58c-.57.58-1 1.6-1 2.42v1h2v-1c0-.29.21-.8.42-1L13 9.42c.57-.58 ' +
                        '1-1.6 1-2.42a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0zm-3 8v2h2v-2H9z';
            }
        },
    },
};
</script>
