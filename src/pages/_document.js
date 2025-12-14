import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="DNA Store - Votre boutique en ligne moderne. Commandez facilement via WhatsApp." />
        <meta name="keywords" content="boutique, e-commerce, DNA Store, WhatsApp, livraison" />
        <meta name="author" content="DNA Store" />
        <meta property="og:title" content="DNA Store" />
        <meta property="og:description" content="Votre boutique en ligne moderne" />
        <meta property="og:type" content="website" />
        
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        
        {/* FontAwesome Icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
