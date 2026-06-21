export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflow: 'hidden', backgroundColor: '#000' }}>
        {children}
      </body>
    </html>
  );
}
