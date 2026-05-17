import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  useGetProductQuery,
} from "../../features/product/productApiSlice";
import {
  useAddToCartMutation,
} from "../../features/cart/cartApiSlice";
import {
  formatCurrency,
} from "../../utils/formatters";
import {
  getProductImage,
} from "../../utils/productImage";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector(
    (state) => state.auth
  );

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductQuery(id);

  const [addToCart, { isLoading: isAdding }] =
    useAddToCartMutation();

  const handleAddToCart = async () => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    try {
      await addToCart({
        productId: product._id,
        quantity: 1,
      }).unwrap();

      navigate("/cart");
    } catch (err) {
      alert(
        err?.data?.message ||
          "Could not add product to cart"
      );
    }
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
          Loading product...
        </p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-lg border border-red-100 bg-white p-6 text-center shadow-sm">
          <p className="text-red-600">
            Could not load this product.
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
          >
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/"
        className="mb-5 inline-flex text-sm font-semibold text-teal-700 hover:text-teal-900"
      >
        Back to products
      </Link>

      <section className="grid gap-8 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_0.9fr] md:p-6">
        <img
          src={getProductImage(product)}
          alt={product.name}
          className="aspect-[4/3] w-full rounded-md object-cover"
        />

        <div className="flex flex-col justify-center">
          {product.category?.name && (
            <p className="mb-3 w-fit rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-700">
              {product.category.name}
            </p>
          )}

          <h1 className="text-3xl font-bold text-slate-950 md:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">
            {product.description}
          </p>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-slate-200 pt-6">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Price
              </p>
              <p className="text-3xl font-bold text-slate-950">
                {formatCurrency(product.price)}
              </p>
            </div>

            <p className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
              {product.stock > 0
                ? `${product.stock} in stock`
                : "Out of stock"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding || product.stock < 1}
            className="mt-6 rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-700 disabled:bg-slate-300"
          >
            {product.stock < 1
              ? "Out of stock"
              : isAdding
                ? "Adding..."
                : "Add to cart"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
