import { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    company: "",
    reason: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      // 1. This one is to Send to MongoDB
      const res = await axios.post("https://contactustask.onrender.com/api/contact", formData);

      // 2. & this is EmailJS - for sending email
      await emailjs.send(
        "service_jfgt2im",     
        "template_3hnq58s",    
        {
          from_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          company: formData.company,
          reason: formData.reason,
        },
        "ouA_MV2ARBtDtN0I0"      
      );

      setSuccessMsg("Thanks! We'll get back to you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        company: "",
        reason: "",
      });
    } catch (err) {
      console.error("Form error:", err);
      setErrorMsg("Something went wrong. Please try again.");
    }

    setTimeout(() => {
      setSuccessMsg("");
      setErrorMsg("");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-2xl space-y-6 transition-all duration-300 hover:scale-[1.01]"
      >
        <h2 className="text-3xl font-bold text-indigo-600 mb-2 text-center">
          Contact Us
        </h2>
        <p className="text-gray-500 text-center mb-4">
          It's Good to hear from you!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="input" required />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="input" required />
          <input name="phone" type="number" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="input" required />
          <input name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" className="input" required />
        </div>

        <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="input" required />

        <select name="reason" value={formData.reason} onChange={handleChange} className="input" required>
          <option value="">Reason for Contact</option>
          <option value="support">Support</option>
          <option value="feedback">Feedback</option>
          <option value="collaboration">Collaboration</option>
          <option value="career">Career Opportunity</option>
          <option value="other">Other</option>
        </select>

        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows={4} className="input resize-none" required />

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Send Message
        </button>

        {successMsg && (
          <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-bounce z-50">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg animate-bounce z-50">
            {errorMsg}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
