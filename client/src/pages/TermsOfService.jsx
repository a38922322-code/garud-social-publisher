import { useEffect } from 'react';

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
      <h1 style={styles.h1}>Terms of Service</h1>
      <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <h2 style={styles.h2}>1. Purpose and Acceptance</h2>
      <p>
        These Terms of Service ("Terms") govern your use of the Garud Social Publisher application (the "Service"). By creating an account or using the Service, you agree to be bound by these Terms.
      </p>

      <h2 style={styles.h2}>2. Acceptable Use</h2>
      <p>
        You agree not to use the Service to create, upload, or publish any content that is unlawful, harmful, defamatory, obscene, or otherwise objectionable. You are solely responsible for the content you publish through our Service.
      </p>

      <h2 style={styles.h2}>3. Account Responsibility</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.
      </p>

      <h2 style={styles.h2}>4. Content Ownership</h2>
      <p>
        You retain all ownership rights to the content you create and publish through Garud Social Publisher. By using the Service, you grant us a limited license to store, process, and transmit your content solely for the purpose of providing and operating the Service.
      </p>

      <h2 style={styles.h2}>5. Meta Platform Compliance</h2>
      <p>
        Your use of the Service to publish on Facebook and Instagram must comply with all applicable Meta Platform Terms and Policies. We are not responsible for any violations of third-party platform policies committed by you.
      </p>

      <h2 style={styles.h2}>6. Limitation of Liability</h2>
      <p>
        The Service is provided "as is." To the fullest extent permitted by law, Garud Social Publisher disclaims all warranties and will not be liable for any indirect, incidental, or consequential damages arising out of your use of the Service.
      </p>

      <h2 style={styles.h2}>7. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your account at any time, without notice, for conduct that violates these Terms or is otherwise harmful to the Service or other users.
      </p>

      <h2 style={styles.h2}>8. Changes to Terms</h2>
      <p>
        We may modify these Terms from time to time. We will notify you of any changes by posting the new Terms on this page. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.
      </p>

      <h2 style={styles.h2}>9. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at:{' '}
        <a href="mailto:support@garudsocialpublisher.com" style={styles.link}>
          support@garudsocialpublisher.com
        </a>
      </p>
    </div>
  );
};

export default TermsOfService;