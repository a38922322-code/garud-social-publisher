import { useEffect } from 'react';

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

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      color: '#333',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    },
    h1: {
      color: '#2c3e50',
      borderBottom: '2px solid #3498db',
      paddingBottom: '10px',
      marginBottom: '20px',
      fontSize: '2.2em',
      textAlign: 'center',
    },
    h2: {
      color: '#34495e',
      marginTop: '30px',
      borderBottom: '1px solid #ecf0f1',
      paddingBottom: '5px',
      fontSize: '1.6em',
    },
    link: {
      color: '#3498db',
      textDecoration: 'none',
    },
    ul: {
      listStyleType: 'disc',
      marginLeft: '20px',
    },
    li: {
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Privacy Policy for Garud Social Publisher</h1>
      <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <h2 style={styles.h2}>1. Introduction</h2>
      <p>
        Welcome to Garud Social Publisher ("we," "our," "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application, accessible from{' '}
        <a href="https://garud-social-publisher.vercel.app" style={styles.link}>
          https://garud-social-publisher.vercel.app
        </a>{' '}
        (the "Website").
      </p>

      <h2 style={styles.h2}>2. Purpose of the Application</h2>
      <p>
        Garud Social Publisher is a tool designed to help users manage and automatically publish their content to their connected social media accounts, specifically Facebook Pages and Instagram Business accounts.
      </p>

      <h2 style={styles.h2}>3. Data We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <strong>Account Information:</strong> When you register, we collect administrative credentials (username/password) to secure your account on our platform.
        </li>
        <li style={styles.li}>
          <strong>User-Generated Content:</strong> We collect and store the posts you create, including text, titles, and images you upload. This content is stored in our database to facilitate scheduling and publishing.
        </li>
        <li style={styles.li}>
          <strong>Social Media Data (via Meta API):</strong> To provide our services, we use Facebook Login and the Meta Graph API. We may collect:
          <ul style={styles.ul}>
            <li style={styles.li}>
              <strong>Access Tokens:</strong> We securely store long-lived access tokens for your Facebook Page and Instagram Business account to publish content on your behalf. These tokens are essential for the application's functionality.
            </li>
            <li style={styles.li}>
              <strong>Profile Information:</strong> We may access basic public profile information from your connected accounts, such as Page ID and Instagram Business ID, to correctly identify where to publish content.
            </li>
          </ul>
        </li>
        <li style={styles.li}>
          <strong>Cookies and Analytics:</strong> We may use cookies to manage your login sessions and collect analytics data to understand how our service is used and to improve it.
        </li>
      </ul>

      <h2 style={styles.h2}>4. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul style={styles.ul}>
        <li style={styles.li}>Create and manage your account.</li>
        <li style={styles.li}>Enable you to create, schedule, and publish posts to your connected social media accounts.</li>
        <li style={styles.li}>Use the Meta Graph API to publish photos and text to your Facebook Page feed and Instagram Business account.</li>
        <li style={styles.li}>Monitor and analyze usage to improve the application's performance and user experience.</li>
        <li style={styles.li}>Ensure the security of our platform.</li>
      </ul>

      <h2 style={styles.h2}>5. Data Security</h2>
      <p>
        We implement a variety of security measures to maintain the safety of your personal information. Access tokens and other sensitive data are stored securely. However, no electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2 style={styles.h2}>6. Third-Party Services</h2>
      <p>
        Our application relies on the Meta Graph API (Facebook and Instagram) to function. Your use of these platforms through our service is also governed by their respective privacy policies and terms of service. We do not share your data with any other third parties for marketing or other purposes.
      </p>

      <h2 style={styles.h2}>7. User Rights and Data Deletion</h2>
      <p>
        You have the right to access, update, or delete your information at any time.
      </p>
      <p>
        You can delete your account and all associated data from within the application's dashboard. Alternatively, you can request manual data deletion by contacting us. To request data deletion, please email us at{' '}
        <a href="mailto:support@garudsocialpublisher.com" style={styles.link}>
          support@garudsocialpublisher.com
        </a>{' '}
        with the subject line "Data Deletion Request." We will process your request and permanently delete your account, posts, and stored access tokens from our systems within a reasonable timeframe.
      </p>
      <p>
        You can also revoke our application's access to your Facebook/Instagram data directly from your Facebook account settings under "Apps and Websites."
      </p>

      <h2 style={styles.h2}>8. Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
      </p>

      <h2 style={styles.h2}>9. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact us at:{' '}
        <a href="mailto:support@garudsocialpublisher.com" style={styles.link}>
          support@garudsocialpublisher.com
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;