import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const offers = [
  "Extra 10% off with WishCare Coins",
  "5% cashback on Axis Bank Cards",
  "No-cost EMI available",
];

export default function OffersList() {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-800">Available Offers</h3>
      {offers.map((offer, i) => (
        <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
          <LocalOfferIcon fontSize="small" className="text-green-600 mt-0.5" />
          {offer}
        </div>
      ))}
    </div>
  );
}
