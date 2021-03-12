<template>
	<FrontLayout></FrontLayout>
</template>
<script>
	import FrontLayout from "@/views/layouts/FrontLayout";
	export default {
		name: "Home",
		data: () => ({
			slides: [
				{
					src: "storages/images/sliders/slider1.jpg",
				},
				{
					src: "storage/images/sliders/slider2.jpg",
				},
			],
		}),
		components: {
			FrontLayout,
		},
	};
</script>
