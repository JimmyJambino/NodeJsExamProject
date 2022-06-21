<script>
import ProductCard from "../components/ProductCard.svelte";

const productInfo = {
    title: "God suffer",
    imgSrc: "https://ih1.redbubble.net/image.2645073770.4034/flat,750x1000,075,f.jpg",
    description: "lorem ipsum",
    price: 420,
    qty:69
}

</script>

<ProductCard productInfo={productInfo}/>