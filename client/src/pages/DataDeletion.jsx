import React, { useEffect } from 'react';

const DataDeletion = () => {
  useEffect(() => {
    document.title = 'Data Deletion Instructions - Garud Social Publisher';
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      const newMetaTag = document.createElement('meta');
      newMetaTag.name = 'description';
      newMetaTag.content = 'Instructions on how to request the deletion of your data from Garud Social Publisher.';
      document.head.appendChild(newMetaTag);
    } else {
      metaDescriptionTag.content = 'Instructions on how to request the deletion of your data from Garud Social Publisher.';
    }
  }, []);

  return (
    <div className="bg-slate-50 p-6">
      <div className="prose prose-lg mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
        <h1>Data Deletion Instructions</h1>
        <p><strong>Application Name:</strong> Garud Social Publisher</p>
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <p>You have the right to request the deletion of your account and all associated data from our service. This document provides clear instructions on how to do so.</p>

        <h2>1. What Data Can Be Deleted</h2>
        <p>Upon request, we will permanently delete the following information associated with your account:</p>
        <ul>
          <li>Your user account and login credentials.</li>
          <li>All scheduled posts and drafts.</li>
          <li>The history of posts published through our application.</li>
          <li>Securely stored access tokens for your connected Facebook and Instagram accounts.</li>
          <li>Any other application-related data tied to your user profile.</li>
        </ul>

        <h2>2. How to Request Deletion</h2>
        <p>To initiate the data deletion process, please send an email to:</p>
        <p><a href="mailto:a38922322@gmail.com"><strong>a38922322@gmail.com</strong></a></p>
        <p>Your email must include the following:</p>
        <ul>
          <li><strong>Subject Line:</strong> "Data Deletion Request"</li>
          <li><strong>Body of the email:</strong> Please provide the email address you used to register your account on Garud Social Publisher. Including your Facebook Page name or Instagram Business account username is optional but can help us process your request faster.</li>
        </ul>

        <h2>3. Processing Time</h2>
        <p>We will process your deletion request and confirm its completion via email. Data deletion requests are typically processed within <strong>7 business days</strong>.</p>

        <h2>4. Immediate Access Revocation</h2>
        <p>If you wish to immediately revoke the application's access to your Meta (Facebook/Instagram) data, you can do so directly from your Facebook account settings:</p>
        <ol>
          <li>Go to "Settings & Privacy" &gt; "Settings".</li>
          <li>Click on "Apps and Websites" in the left-hand menu.</li>
          <li>Find "Garud Social Publisher" in the list of active apps.</li>
          <li>Click "Remove" to immediately invalidate our access token.</li>
        </ol>
        <p>Please note that this action only revokes API access; it does not delete the data stored on our servers. To delete your data from our application, you must still follow the email request process outlined in section 2.</p>

        <h2>5. Contact Information</h2>
        <p>For any questions regarding this process, please contact us at <a href="mailto:a38922322@gmail.com">a38922322@gmail.com</a> or visit our website at <a href="https://garud-social-publisher.vercel.app">https://garud-social-publisher.vercel.app</a>.</p>
      </div>
    </div>
  );
};

export default DataDeletion;