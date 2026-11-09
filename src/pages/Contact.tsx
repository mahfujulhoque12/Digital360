import ContactBanner from "../components/contact/ContactBanner";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import FAQ from "../components/contact/FAQ";
import Map from "../components/contact/Map";

const Contact = () => {
  return (
    <div>
      <ContactBanner />
      <ContactInfo />
      <ContactForm />
      <Map />
      <FAQ />
    </div>
  );
};

export default Contact;
