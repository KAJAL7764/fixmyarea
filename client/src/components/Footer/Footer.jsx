import './Footer.css';

const FOOTER_LINKS = {
  product: [
    { label: 'Live map', href: '#' },
    { label: 'Report issue', href: '#' },
    { label: 'My reports', href: '#' },
    { label: 'Leaderboard', href: '#' },
    { label: 'Dashboard', href: '#' },
  ],
  developers: [
    { label: 'API docs', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Postman', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
};

const TECH_STACK = [
  'Node.js',
  'MongoDB',
  'Cloudinary',
  'REST API',
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <span className="footer-brand">
              Fix<span>My</span>Area
            </span>
            <p className="footer-desc">
              Civic technology for India's citizens. Report local problems, track resolutions, and hold authorities accountable — in real time.
            </p>
          </div>

          <div>
            <span className="footer-col-title">Product</span>
            <div className="footer-links">
              {FOOTER_LINKS.product.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="footer-col-title">Developers</span>
            <div className="footer-links">
              {FOOTER_LINKS.developers.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="footer-col-title">Company</span>
            <div className="footer-links">
              {FOOTER_LINKS.company.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copyright">
            © 2025 FixMyArea · Built for civic change · India 🇮🇳
          </span>
          <div className="footer-tags">
            {TECH_STACK.map((tech) => (
              <span key={tech} className="footer-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}