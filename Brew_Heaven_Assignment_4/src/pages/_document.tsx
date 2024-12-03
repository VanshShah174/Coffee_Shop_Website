import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        {/* Add custom fonts, styles, or meta tags here */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-[#faf3e0] text-text-color">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
