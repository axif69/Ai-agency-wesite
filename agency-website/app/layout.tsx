import './globals.css';
import Layout from '../src/components/Layout';

export const metadata = {
  title: "AI Automation Agency Dubai | Asif Digital — AI Agents & Workflows UAE",
  description: "Asif Digital is a Dubai-based AI automation agency helping UAE businesses automate workflows, generate leads, and scale with custom AI agents. Book a free consultation."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
