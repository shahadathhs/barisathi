import Navbar from '@/components/shared/nav/Navbar';
import React from 'react'

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  )
}
