import { LazyLoadImage } from "react-lazy-load-image-component";

const CustomerCard = ({ image, name }) => {
  return (
    <div className="group relative aspect-[3/4] overflow-hidden bg-hairline/30">
      <LazyLoadImage
        effect="blur"
        src={image}
        alt={name}
        className="h-full w-full object-cover"
        wrapperClassName="block h-full w-full"
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-3">
        <div className="font-label text-xs uppercase tracking-wide text-bone">
          {name}
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
