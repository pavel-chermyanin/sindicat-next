

import 'rsuite/dist/rsuite-no-reset.min.css';
import "../../fsd/core/styles/globals.scss";
import {Header} from "@/fsd/widgets/header";
import {QueryProvider} from "@/fsd/core/providers/QueryProvider";
import ProtectedRoute from "@/fsd/core/providers/ProtectedRoute";

export default function RootLayout(
  {
    children,

  }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
    <body className={`px-4 overflow-hidden`}>
    <ProtectedRoute>
      <QueryProvider>
        <Header/>
        <main>
          {children}
        </main>
      </QueryProvider>
    </ProtectedRoute>
    </body>
    </html>
  );
}
