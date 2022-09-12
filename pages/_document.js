import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {
  return (
    <Html>
        <Head>
            <link rel="icon" href="/rocket-icon.svg" />
            <link rel="apple-touch-icon" href="/rocket-icon.svg" />
            <link rel="manifest" href="/manifest.json" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous"/>    
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}