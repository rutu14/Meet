<template>
    <div class="d-flex justify-content-center my-4 ">
        <div :class="`alert alert-${theme}`" role="alert">
            <header class="alert-heading pb-2 text-center">
                <slot name="heading"></slot>
            </header>
            <div class="alert-body">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Alert',
    props: {
        theme: {
            type: String,
            default: 'info',
            validator( value ) {
                return [
                    'primary',
                    'secondary',
                    'success',
                    'info',
                    'warning',
                    'danger',
                    'light',
                    'dark'
                ].includes( value );
            }
        }
    }
}
</script>

<style scoped>
.alert-heading {
    font-weight: bold;
}
</style>