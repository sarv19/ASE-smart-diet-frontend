import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/static/images/dark-diet-icon.png" rel="shortcut icon" media="(prefers-color-scheme: light)"/>
        <link href="/static/images/diet-icon.png" rel="shortcut icon" media="(prefers-color-scheme: dark)"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
