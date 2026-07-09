import React, { useEffect } from 'react';

const TermsOfService = () => {
  useEffect(() => {
    document.title = 'Terms of Service - Garud Social Publisher';
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      const newMetaTag = document.createElement('meta');
      newMetaTag.name = 'description';
      newMetaTag.content = 'Read the Terms of Service for Garud Social Publisher, outlining user responsibilities, content policies, and platform compliance.';
      document.head.appendChild(newMetaTag);
    } else {
      metaDescriptionTag.content = 'Read the Terms of Service for Garud Social Publisher, outlining user responsibilities, content policies, and platform compliance.';
    }
  }, []);

  return (
    <div className="bg-slate-50 p-6">
      <div className="prose prose-lg mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
        <h1>Terms of Service</h1>
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Garud Social Publisher application (the "Service"), provided by GarudStacks Pvt. Ltd., you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, do not use the Service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          The Service is a tool that allows users to create, manage, and publish content to their connected Facebook and Instagram accounts via the Meta Graph API.
        </p>

        <h2>3. Acceptable and Prohibited Use</h2>
        <p>You agree to use the Service only for lawful purposes. You are prohibited from posting or transmitting any content that:
          <ul>
            <li>Is unlawful, hateful, obscene, defamatory, or discriminatory.</li>
            <li>Infringes on the intellectual property rights of others.</li>
            <li>Violates any applicable local, state, national, or international law.</li>
          </ul>
        </p>

        <h2>4. Account Responsibility</h2>
        <p>You are responsible for all activities that occur under your account and for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.</p>

        <h2>5. Content Ownership</h2>
        <p>You retain all ownership rights to the content you create and publish through the Service ("User Content"). By using the Service, you grant us a non-exclusive, royalty-free license to use, reproduce, and transmit your User Content solely for the purpose of providing and operating the Service on your behalf.</p>

        <h2>6. Meta Platform Compliance</h2>
        <p>Your use of the Service to publish on Facebook and Instagram must comply with all applicable Meta Platform Terms and Developer Policies. We are not responsible for any content violations or account actions taken by Meta as a result of your User Content.</p>

        <h2>7. Limitation of Liability</h2>
        <p>The Service is provided "as is" and "as available" without any warranties. GarudStacks Pvt. Ltd. will not be liable for any indirect, incidental, special, or consequential damages arising out of your use of or inability to use the Service.</p>

        <h2>8. Termination</h2>
        <p>We reserve the right to suspend or terminate your access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms or is otherwise harmful to other users of the Service, us, or third parties.</p>

        <h2>9. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at <a href="mailto:a38922322@gmail.com">a38922322@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;