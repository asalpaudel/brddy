import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

// Reusable Accordion Item Component
const AccordionItem = ({ title, content, isOpen, onClick }) => (
    <div className="border-b border-stone-200">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left py-4 px-2 hover:bg-amber-50 rounded-md"
        >
            <span className="font-medium text-stone-800">{title}</span>
            {isOpen ? <HiChevronUp className="h-5 w-5 text-amber-500" /> : <HiChevronDown className="h-5 w-5 text-stone-500" />}
        </button>
        {isOpen && (
            <div className="pt-2 pb-4 px-2">
                <p className="text-stone-600">{content}</p>
            </div>
        )}
    </div>
);

const ContactUs = () => {
    const [openAccordion, setOpenAccordion] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleAccordionClick = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        toast.success("Thank you for your message! We'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
    };

    const faqs = [
        { 
            q: 'What are your opening hours?', 
            a: 'We’re open Monday–Saturday, 8 AM to 7 PM, and Sunday, 9 AM to 5 PM. Holiday hours may vary — check our social media for updates. 🍞' 
        },
        { 
            q: 'Do you take custom cake or pastry orders?', 
            a: 'Yes! We love creating custom cakes, cupcakes, and pastries for birthdays, weddings, and special events. We recommend placing your order at least 5–7 days in advance. 🎂' 
        },
        { 
            q: 'Do you offer gluten-free, vegan, or allergy-friendly options?', 
            a: 'We have a selection of gluten-free and vegan treats. While we take care to avoid cross-contamination, please note that all items are prepared in the same kitchen. 🥖' 
        },
        { 
            q: 'Do you deliver or offer pickup?', 
            a: 'We offer in-store pickup and local delivery within a set radius. Delivery fees and minimum order amounts apply. 📦' 
        },
        { 
            q: 'Are your items baked fresh daily?', 
            a: 'Absolutely — everything we sell is baked fresh each day in small batches, using quality ingredients. We don’t use preservatives, so you get that just‑out‑of‑the‑oven taste every time. 🌾' 
        }
    ];

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-stone-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    Contact Us
                </h1>
                <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                    We'd love to connect with you! Feel free to reach out with any questions or feedback about our delicious bakery items.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 lg:gap-6">
                {/* Card 1: Contact Info */}
                <div className="p-6 rounded-lg shadow-md flex flex-col">
                    <h2 className="text-2xl font-bold text-stone-800 mb-6 text-center">Contact Us</h2>
                    <div className="space-y-6 flex-grow">
                        <div>
                            <h3 className="text-xl font-semibold text-amber-800 mb-2">Our Contact</h3>
                            <p className="text-stone-600">
                                Phone: 9874563210.<br></br>  ABC Street, Kathmandu.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-amber-800 mb-2">Opening Hours</h3>
                            <p className="text-stone-600">
                                Our bakery is open all week from 8 AM to 8 PM, except for a few special occasions.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-amber-800 mb-2">Feedback and Suggestions</h3>
                            <p className="text-stone-600">
                                We value your feedback! Let us know how we can improve your bakery experience.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-amber-800 mb-2">Catering & Events</h3>
                            <p className="text-stone-600">
                                Planning a special event? Reach out to us for custom catering options and bulk orders.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 2: Location with Google Maps Embed */}
                <div className="p-6 rounded-lg shadow-md flex flex-col">
                    <h2 className="text-2xl font-bold text-stone-800 mb-4 text-center">Our Location</h2>
                    <p className="text-stone-600 mb-4 text-center">Connecting Near and Far. Visit us at our cozy bakery location.</p>
                    <div className="h-full w-full rounded-lg overflow-hidden border flex-grow min-h-[300px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.4604059347694!2d85.31679131573982!3d27.672161621462475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19cb05097d61%3A0x66d083a187176a11!2sVIRINCHI%20COLLEGE!5e0!3m2!1sen!2snp!4v1756147222773!5m2!1sen!2snp"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* Card 3: FAQ */}
                <div className="p-6 rounded-lg shadow-md flex flex-col">
                    <h2 className="text-2xl font-bold text-stone-800 mb-4 text-center">FAQ</h2>
                    <div className="flex-grow">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                title={faq.q}
                                content={faq.a}
                                isOpen={openAccordion === index}
                                onClick={() => handleAccordionClick(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Card 4: Get in Touch Form */}
                <div className="p-6 rounded-lg shadow-md flex flex-col">
                    <h2 className="text-2xl font-bold text-stone-800 mb-4 text-center">Get in Touch</h2>
                    <form onSubmit={handleFormSubmit} className="space-y-4 flex flex-col flex-grow">
                        <div className="flex-grow space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-stone-700">Name</label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleFormChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-10 px-3" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleFormChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-10 px-3" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-stone-700">Message</label>
                                <textarea name="message" id="message" value={formData.message} onChange={handleFormChange} required rows="4" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3"></textarea>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-amber-500 text-white py-3 px-4 rounded-md hover:bg-amber-600 font-semibold mt-2">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
