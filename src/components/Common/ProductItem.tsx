"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { AppDispatch } from "@/redux/store";
interface Product {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  reviews: number;
  picture?: string; // ✅ make optional
  country?: {
    id: number;
    name: string;
    code: number;
    deletedAt: string | null;
  };
}

const ProductItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  const handleQuickViewUpdate = () => {
    // dispatch(updateQuickView({ ...item }));
  };

  // const handleAddToCart = () => {
  //   dispatch(addItemToCart({ ...item, quantity: 1 }));
  // };

  // const handleItemToWishList = () => {
  //   dispatch(addItemToWishlist({ ...item, status: "available", quantity: 1 }));
  // };

  const handleProductDetails = () => {
    dispatch(updateproductDetails({ ...item }));
  };
  const imageSrc =
  item.picture?.trim()
    ? `${process.env.NEXT_PUBLIC_API_URL || ""}/images/${item.picture}`
    : "/images/placeholder.png";

  return (
    <div className="group">
      {/* Product Image */}
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-[#F6F7FB] min-h-[270px] mb-4">
      <div className="relative w-full h-[250px] flex items-center justify-center rounded-lg bg-[#F6F7FB] mb-4 overflow-hidden">
      <Image
  src={imageSrc}
  alt={item.title || "Product image"}
  fill
  className="object-contain p-6"
  sizes="(max-width: 768px) 100vw, 25vw"
  unoptimized
/>
</div>
        {/* Hover Buttons */}
        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <button
            onClick={() => {
              openModal();
              handleQuickViewUpdate();
            }}
            aria-label="Quick View"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 text-dark bg-white hover:text-blue"
          >
            🔍
          </button>

          {/* <button
            onClick={handleAddToCart}
            className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white hover:bg-blue-dark"
          >
            Add to cart
          </button>

          <button
            onClick={handleItemToWishList}
            aria-label="Add to wishlist"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 text-dark bg-white hover:text-blue"
          >
            ❤️
          </button> */}
        </div>
      </div>

      {/* Star Ratings */}
      {/* <div className="flex items-center gap-2.5 mb-1">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Image
              key={i}
              src="/images/icons/icon-star.svg"
              alt="star icon"
              width={14}
              height={14}
            />
          ))}
        </div>
        <p className="text-custom-sm">({item.reviews})</p>
      </div> */}

      {/* Country Info */}
      {item.country?.name && (
        <p className="text-sm text-gray-500 mb-1">Made in {item.country.name}</p>
      )}

      {/* Title */}
      <h3
        className="font-medium text-dark hover:text-blue mb-1.5 cursor-pointer"
        onClick={handleProductDetails}
      >
        {/* <Link href="/shop-details">{item.title}</Link> */}
      </h3>

      {/* Price */}
      <span className="flex items-center gap-2 font-medium text-lg">
        {/* <span className="text-dark">${item.discountedPrice}</span> */}
        {/* <span className="text-dark-4 line-through">${item.price}</span> */}
      </span>
    </div>
  );
};

export default ProductItem;
