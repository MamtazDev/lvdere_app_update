import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import { Providers } from 'reduxStore/provider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body id={'root'}>
        <Providers>
          <AppWrappers>{children}</AppWrappers>
        </Providers>
      </body>
    </html>
  );
}
