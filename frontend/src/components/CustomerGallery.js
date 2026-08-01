import CustomerCard from "./CustomerCard";
import customers from "../data/customers";

const CustomerGallery = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
      <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
        Elas também usam Iara Noivas
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-px bg-hairline sm:grid-cols-3">
        {customers.map((customer) => (
          <CustomerCard key={customer.id} image={customer.image} name={customer.name} />
        ))}
      </div>
    </section>
  );
};

export default CustomerGallery;
