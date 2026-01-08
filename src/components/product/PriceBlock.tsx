import LocalOfferIcon from "@mui/icons-material/LocalOffer";

export default function PriceBlock({
  price,
  originalPrice,
}: {
  price: number;
  originalPrice: number;
}) {
  const discount = Math.round(
    ((originalPrice - price) / originalPrice) * 100
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-900">
          ₹{price}
        </span>
        <span className="line-through text-gray-500">
          ₹{originalPrice}
        </span>
        <span className="flex items-center gap-1 text-sm font-medium text-green-600">
          <LocalOfferIcon fontSize="small" />
          {discount}% OFF
        </span>
      </div>
      <p className="text-sm text-gray-600">
        Inclusive of all taxes
      </p>
    </div>
  );
}
