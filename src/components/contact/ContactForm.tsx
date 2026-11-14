import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowRight, FiCheckCircle, FiSend } from "react-icons/fi";
import axiosInstance from "../../lib/axios";
import { toast } from "sonner";
import { FiX } from "react-icons/fi";

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
  const [isSubmitted] = useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
      const response = await axiosInstance.post("/contact", data);

      if (response.data.success) {
        reset();
        setIsSuccessModalOpen(true);
        toast.success("Message submitted successfully!");
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);
      toast.error("Failed to send your message. Please try again.");
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

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-ink/70 px-4 py-6 backdrop-blur-md"
          onClick={() => setIsSuccessModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-[modalIn_0.35s_ease-out]"
          >
            {/* Decorative Background */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-brand via-blue-500 to-cyan-400" />

            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[20px] border-white/10" />
            <div className="absolute -left-10 top-20 h-24 w-24 rounded-full bg-white/10 blur-xl" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsSuccessModalOpen(false)}
              aria-label="Close success modal"
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition hover:rotate-90 hover:bg-white/30"
            >
              <FiX size={20} />
            </button>

            <div className="relative px-7 pb-8 pt-12 text-center sm:px-10">
              {/* Success Icon */}
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-[6px] border-white bg-white shadow-xl">
                <div className="flex h-16 w-16 animate-[successPop_0.5s_ease-out] items-center justify-center rounded-full bg-green-50 text-green-500">
                  <FiCheckCircle size={42} strokeWidth={1.8} />
                </div>
              </div>

              {/* Heading */}
              <span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-green-600">
                Successfully Submitted
              </span>

              <h2
                id="success-title"
                className="mt-5 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
              >
                Thank You for <span className="text-brand">Reaching Out!</span>
              </h2>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-500">
                Your message has been received successfully. We're excited to
                learn more about your project and help bring your ideas to life.
              </p>

              {/* Response Time */}
              <div className="mt-7 flex items-center gap-4 rounded-2xl border border-brand/10 bg-brand-soft/60 p-4 text-left">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                  <FiSend size={21} />
                </div>

                <div>
                  <p className="text-sm font-bold text-ink">What's Next?</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Our team will review your request and get back to you within
                    24 hours.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
                className="group mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-brand px-6 py-4 text-sm font-bold text-white shadow-lg shadow-brand/20 transition duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-xl"
              >
                Awesome, Thank You!
                <FiArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <p className="mt-5 text-xs font-medium text-gray-400">
                We appreciate your trust in us.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactForm;
