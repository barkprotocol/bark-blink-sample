import { NextPage } from 'next';
import { Card } from '@/components/ui'; // Import your UI components

const TermsOfServicePage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
      <Card className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms.
        </p>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">1. Acceptance of Terms</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          By using our website or services, you agree to these Terms and any additional terms that may apply. If you do not agree with these Terms, you should not use our website or services.
        </p>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">2. Use of Our Services</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          You agree to use our website and services only for lawful purposes and in accordance with these Terms. You must not use our services in any way that may harm or disrupt our website or services.
        </p>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">3. User Responsibilities</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          You are responsible for maintaining the confidentiality of your account and any activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account.
        </p>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">4. Intellectual Property</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          All content and materials on our website are protected by intellectual property laws. You may not use or reproduce any content without our prior written permission.
        </p>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">5. Limitation of Liability</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          To the fullest extent permitted by law, we disclaim all liability for any damages arising from your use of our website or services. This includes, but is not limited to, direct, indirect, incidental, and consequential damages.
        </p>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">6. Termination</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We reserve the right to terminate or suspend your access to our website or services at any time, with or without cause, and without prior notice.
        </p>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">7. Changes to Terms</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We may update these Terms from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of our website or services after any changes constitutes your acceptance of the new Terms.
        </p>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">8. Contact Us</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          If you have any questions about these Terms, please contact us at{' '}
          <a href="mailto:support@example.com" className="text-primary hover:underline dark:text-primary-dark">
            support@example.com
          </a>.
        </p>
      </Card>
    </div>
  );
};

export default TermsOfServicePage;
