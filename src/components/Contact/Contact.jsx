export default function Contact() {
  return (
    <section
      id="contact"
      className="griden-bg py-16 mb-0 text-center text-white"
    >
      <div className="containerMain">
        <h2 className="text-6xl font-header light mb-4">Contact Us</h2>
        {/* <h3 className="text-gray-700 text-xl">Get in Touch with Us
Whether you want to know more about our fragrances, need help choosing your scent, or just want to say hello — we’d love to hear from you!</h3> */}
        <ul className="text-light space-y-1 text-xl">
          <li><i class="fa-solid fa-envelope"></i> Email: hello@aromaticegypt.com</li>
          <li><i class="fa-solid fa-phone"></i> Phone: +20 100 456 7890</li>
          <li><i class="fa-solid fa-location-dot"></i> Address: 123 Perfume St, Cairo, Egypt</li>
        </ul>
      </div>
    </section>
  );
}
