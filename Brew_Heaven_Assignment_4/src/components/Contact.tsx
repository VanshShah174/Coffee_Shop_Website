import React, { FormEvent, useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="max-w-screen-md mx-auto py-16 bg-white text-center">
      <h2 className="text-4xl font-bold text-[#6f4e37] mb-2">Contact Us</h2>
      <hr className="border-t-2 border-[#d4a373] mb-8 w-24 mx-auto" />
      <form className="space-y-6 max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-left text-lg font-medium mb-2 text-[#6f4e37]">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a373] transition"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-left text-lg font-medium mb-2 text-[#6f4e37]">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a373] h-32 resize-none transition"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-[#6f4e37] text-white font-semibold py-3 rounded-lg hover:bg-[#4e372b] transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
