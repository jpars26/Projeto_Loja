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
      <div className="absolute inset-0 flex items-end bg-ink/0 p-3 transition-colors duration-300 group-hover:bg-ink/50">
        <div className="font-label text-xs uppercase tracking-wide text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {name}
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
