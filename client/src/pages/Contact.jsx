import { useEffect } from 'react';

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

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      border: '1px solid #ecf0f1',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      backgroundColor: '#fff',
    },
    h1: {
      color: '#2c3e50',
      fontSize: '2.2em',
      marginBottom: '20px',
    },
    p: {
      fontSize: '1.1em',
      color: '#34495e',
      margin: '15px 0',
    },
    link: {
      color: '#3498db',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Contact Us</h1>
      <p style={styles.p}>
        For support, data deletion requests, or any other inquiries, please reach out to us.
      </p>
      <p style={styles.p}><strong>Application:</strong> Garud Social Publisher</p>
      <p style={styles.p}><strong>Email:</strong> <a href="mailto:support@garudsocialpublisher.com" style={styles.link}>support@garudsocialpublisher.com</a></p>
      <p style={styles.p}><strong>Website:</strong> <a href="https://garud-social-publisher.vercel.app" style={styles.link} target="_blank" rel="noopener noreferrer">garud-social-publisher.vercel.app</a></p>
      <p style={styles.p}><strong>Support:</strong> We aim to respond to all inquiries within 24-48 hours.</p>
    </div>
  );
};

export default Contact;