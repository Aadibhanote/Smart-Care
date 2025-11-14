import React from 'react';

export const Footer = () => {
  // A single style object for cleaner JSX
  const styles = {
    footer: {
      backgroundColor: '#f8f9fa',
      padding: '40px 20px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#555',
      borderTop: '1px solid #dee2e6'
    },
    text: {
      maxWidth: '800px',
      margin: '0 auto 20px auto',
      lineHeight: '1.6'
    },
    link: {
      color: '#0056b3',
      textDecoration: 'none',
      margin: '0 5px'
    }
  };

  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        Give the gift of life—register as an organ donor today. Your decision brings hope to countless individuals and families. We are committed to protecting your privacy and handling all information with the strictest confidence.
      </p>
      <p>
        &copy; 2025 Needed Organs. All Rights Reserved. | 
        <a href="/privacy" style={styles.link}>Privacy Policy</a> | 
        <a href="/contact" style={styles.link}>Contact Us</a>
      </p>
    </footer>
  );
};
