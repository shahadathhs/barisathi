import React from 'react'

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav>Nav</nav>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  )
}
