import "./globals.css"

export const metadata = {
  title: "Design Systems Workshop",
  description: "Learn to build consistent, accessible UI components",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
