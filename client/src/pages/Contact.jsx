import React, { useEffect } from 'react';

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact Us - Garud Social Publisher';
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      const newMetaTag = document.createElement('meta');
      newMetaTag.name = 'description';
      newMetaTag.content = 'Contact Garud Social Publisher for support, inquiries, or data deletion requests.';
      document.head.appendChild(newMetaTag);
    } else {
      metaDescriptionTag.content = 'Contact Garud Social Publisher for support, inquiries, or data deletion requests.';
    }
  }, []);

  return (
    <div className="bg-slate-50 p-6">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl">
        <h1 className="text-4xl font-bold text-slate-900">Contact Us</h1>
        <p className="mt-4 text-lg text-slate-600">
          For support, data deletion requests, or any other inquiries, please reach out to us.
        </p>
        <div className="mt-8 space-y-4 text-left">
          <p><strong>Company:</strong> GarudStacks Pvt. Ltd.</p>
          <p><strong>Application:</strong> Garud Social Publisher</p>
          <p><strong>Support Email:</strong> <a href="mailto:a38922322@gmail.com" className="text-blue-700 hover:underline">a38922322@gmail.com</a></p>
          <p><strong>Website:</strong> <a href="https://garud-social-publisher.vercel.app" className="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">https://garud-social-publisher.vercel.app</a></p>
          <p><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM (IST)</p>
          <p><strong>Response Time:</strong> We aim to respond to all inquiries within 24-48 business hours.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;