import path from 'path';
import { fileURLToPath } from 'url';
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(path.dirname(fileURLToPath(import.meta.url)), 'src/styles')],
    prependData: '@import "../../styles/settings/index.scss";',
  },
};

export default withNextIntl(nextConfig);
