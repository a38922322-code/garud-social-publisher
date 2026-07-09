import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy - Garud Social Publisher';
    // Optionally, add meta description dynamically if you have a setup for it (e.g., react-helmet)
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      const newMetaTag = document.createElement('meta');
      newMetaTag.name = 'description';
      newMetaTag.content = 'Read the Privacy Policy for Garud Social Publisher, detailing data collection, usage, and your rights regarding Facebook and Instagram publishing.';
      document.head.appendChild(newMetaTag);
    } else {
      metaDescriptionTag.content = 'Read the Privacy Policy for Garud Social Publisher, detailing data collection, usage, and your rights regarding Facebook and Instagram publishing.';
    }
  }, []);

  return (
    <div className="bg-slate-50 p-6">
      <div className="prose prose-lg mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
        <h1>Privacy Policy for Garud Social Publisher</h1>
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to Garud Social Publisher, a service provided by GarudStacks Pvt. Ltd. ("we," "our," "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application, accessible from{' '}
          <a href="https://garud-social-publisher.vercel.app">https://garud-social-publisher.vercel.app</a> (the "Website").
        </p>

        <h2>2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Account Information:</strong> When you register, we collect administrative credentials (e.g., username, hashed password) to secure your account on our platform.</li>
          <li><strong>User-Generated Content:</strong> We collect and store the content you create, including text, titles, and images you upload ("User Content"). This data is stored in our database to facilitate scheduling and publishing to your social media accounts.</li>
          <li>
            <strong>Social Media Data (via Meta API):</strong> To provide our services, we use Facebook Login and the Meta Graph API. By authenticating, you grant us permission to collect:
            <ul>
              <li><strong>Access Tokens:</strong> We securely store long-lived access tokens for your Facebook Page and Instagram Business account. These tokens are essential for publishing content on your behalf and are treated as highly sensitive data.</li>
              <li><strong>Profile Information:</strong> We access your Facebook Page ID and Instagram Business ID to correctly identify where to publish content. We do not collect personal profile information beyond what is necessary for the app's functionality.</li>
            </ul>
          </li>
          <li><strong>Cookies:</strong> We use essential cookies (e.g., JWT in `httpOnly` cookies) to manage your login sessions and maintain security. We do not use cookies for tracking or advertising.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Enable you to create, schedule, and publish User Content to your connected social media accounts.</li>
          <li>Use the Meta Graph API to publish photos and text to your Facebook Page feed and create media containers for Instagram publishing.</li>
          <li>Ensure the security and integrity of our platform.</li>
          <li>Respond to customer service requests and support needs.</li>
        </ul>

        <h2>4. Data Storage and Security</h2>
        <p>Your data, including User Content and encrypted credentials, is stored on secure servers. We implement a variety of security measures, such as hashing passwords and securing API keys, to maintain the safety of your personal information. Access tokens are stored securely and are only used for the publishing actions you initiate.</p>

        <h2>5. Third-Party Services</h2>
        <p>Our application's core functionality relies on the Meta Graph API (for Facebook and Instagram). Your use of these platforms through our service is also governed by their respective privacy policies and terms. We do not share, sell, or rent your data to any other third parties for marketing or other purposes.</p>

        <h2>6. User Rights and Data Deletion</h2>
        <p>You have the right to access, update, or delete your information at any time.</p>
        <p>
          To request the deletion of your account and all associated data (including User Content and stored access tokens), please email us at{' '}
          <a href="mailto:a38922322@gmail.com">a38922322@gmail.com</a> with the subject line "Data Deletion Request." We will process your request and permanently delete your information from our systems within 7 business days.
        </p>
        <p>You can also revoke our application's access to your Facebook and Instagram data at any time directly from your Facebook account settings under "Apps and Websites." This will invalidate our access token.</p>

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at:{' '}
          <a href="mailto:a38922322@gmail.com">a38922322@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;