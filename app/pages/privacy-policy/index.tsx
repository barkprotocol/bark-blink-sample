import { NextPage } from 'next';
import { Card } from '@/components/ui'; // Import your UI components

const PrivacyPolicyPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <Card className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
        </p>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">1. Information We Collect</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We may collect personal information such as your name, email address, and other contact information when you interact with our website or services. We also collect non-personal information such as IP addresses and browsing data.
        </p>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">2. How We Use Your Information</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We use the information we collect to provide and improve our services, communicate with you, and comply with legal obligations. We may also use your information for marketing purposes with your consent.
        </p>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">3. How We Share Your Information</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We may share your information with third-party service providers who assist us in operating our website and services. We may also share your information if required by law or to protect our rights.
        </p>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">4. Data Security</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We implement appropriate security measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure.
        </p>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">5. Your Choices</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          You have the right to access, correct, or delete your personal information. You can also opt-out of receiving marketing communications from us by following the instructions provided in those communications.
        </p>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">6. Changes to This Privacy Policy</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
        </p>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">7. Contact Us</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          If you have any questions about this Privacy Policy, please contact us at{' '}
          <a href="mailto:support@example.com" className="text-primary hover:underline dark:text-primary-dark">
            support@example.com
          </a>.
        </p>
      </Card>
    </div>
  );
};

export default PrivacyPolicyPage;
