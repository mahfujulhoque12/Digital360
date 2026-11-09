import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowRight, FiCheckCircle, FiSend } from "react-icons/fi";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const services = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Digital Marketing",
  "AI Automation",
  "Data Analysis",
  "Other",
];

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitted(false);

      // TODO: Connect your backend API here.
      console.log("Contact Form Data:", data);

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Contact form submission failed:", error);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-ink outline-none transition-all duration-300 placeholder:text-gray-400 focus:ring-4 ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
        : "border-gray-200 focus:border-brand focus:ring-brand/10"
    }`;

  return (
    <section className="bg-brand/10 py-16 md:py-20">
      <div className="wrapper">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Left Content */}
          <div className="lg:sticky lg:top-28">
            <span className="mb-4 inline-flex rounded-full bg-brand-soft px-4 py-2 text-sm font-semibold text-brand">
              Get In Touch
            </span>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Tell Us About Your <span className="text-brand">Project</span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-gray-500">
              Whether you have a new idea or need help improving your existing
              business, we're here to help turn your vision into reality.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
                <FiSend size={20} />
              </div>

              <div>
                <p className="font-semibold text-ink">
                  Let's Build Something Great
                </p>
                <p className="text-sm text-gray-500">
                  We usually respond within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_10px_50px_rgba(0,0,0,0.06)] sm:p-8 lg:p-10">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-ink">Send Us a Message</h3>
              <p className="mt-2 text-sm text-gray-500">
                Fill out the form below and we'll get back to you.
              </p>
            </div>

            {isSubmitted && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                <FiCheckCircle size={20} className="shrink-0" />
                <p>Your message has been submitted successfully!</p>
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              {/* Name & Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-ink"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                      maxLength: {
                        value: 80,
                        message: "Name is too long",
                      },
                      validate: (value) =>
                        !!value.trim() || "Name cannot be empty",
                    })}
                    className={inputClass(!!errors.name)}
                  />

                  {errors.name && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-ink"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={inputClass(!!errors.email)}
                  />

                  {errors.email && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone & Service */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-ink"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    autoComplete="tel"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\+?[0-9\s()-]{7,20}$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                    className={inputClass(!!errors.phone)}
                  />

                  {errors.phone && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="mb-2 block text-sm font-semibold text-ink"
                  >
                    Interested Service <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="service"
                    {...register("service", {
                      required: "Please select a service",
                    })}
                    className={`${inputClass(!!errors.service)} cursor-pointer`}
                  >
                    <option value="">Select a service</option>

                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>

                  {errors.service && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.service.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-ink"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your project, requirements, budget..."
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                    maxLength: {
                      value: 2000,
                      message: "Message is too long",
                    },
                    validate: (value) =>
                      !!value.trim() || "Message cannot be empty",
                  })}
                  className={`${inputClass(!!errors.message)} resize-none`}
                />

                {errors.message && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-brand px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all duration-300 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/25 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isSubmitting ? (
                  "Sending Message..."
                ) : (
                  <>
                    Send Message
                    <FiArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
