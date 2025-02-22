// components/LinkCards.js
import React from 'react';
import { ExternalLink } from 'lucide-react';

const LinkCards = ({ quickLinks, setCursorVariant }) => (
  <>
    {quickLinks.map((link) => (
      <a
        key={link.title}
        href={link.url}
        className="link-card"
        onMouseEnter={() => setCursorVariant("link")}
        onMouseLeave={() => setCursorVariant("default")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={link.title}
      >
        <div className="link-card-icon">{link.icon}</div>
        <div className="link-card-text">
          <h3 className="link-card-title">{link.title}</h3>
          <p className="link-card-description">{link.description}</p>
        </div>
        <ExternalLink size={20} className="link-card-external-link" aria-hidden="true" />
      </a>
    ))}
  </>
);

export default LinkCards;