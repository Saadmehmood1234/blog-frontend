// components/markdown/USAGE.md
# Markdown Components Usage Guide

## Headings
```markdown
# Main Title (H1)
## Section (H2)
### Subsection (H3)

```javascript
const example = "Code block with language";
```

Custom Components
Callout
:::note[Important]
This is a note callout
:::

Types: note, warning, tip, info


Card
:::card[Card Title]
Card content here
:::

Accordion
:::accordion[Click to expand]
Hidden content
:::


Steps
:::steps

Step 1 Title
Step 1 content

Step 2 Title
Step 2 content
:::


Images
https://image.jpg


Tables
Header 1	Header 2
Cell 1	Cell 2



## 6. Responsive CSS

Add these to your global CSS:

```css
/* styles/globals.css */
.markdown-content {
  --mobile-font-size: 0.9375rem;
  --tablet-font-size: 1rem;
  --desktop-font-size: 1.125rem;
}

@media (max-width: 640px) {
  .markdown-content {
    font-size: var(--mobile-font-size);
  }
  
  .markdown-content h1 {
    font-size: 1.75rem;
    line-height: 2rem;
  }
  
  .markdown-content h2 {
    font-size: 1.5rem;
    line-height: 1.75rem;
  }
  
  .markdown-content pre {
    font-size: 0.8125rem;
    margin: 1rem -1rem;
    border-radius: 0;
    padding: 1rem;
  }
  
  .markdown-content img {
    margin: 1rem -1rem;
    border-radius: 0;
    max-width: 100vw;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .markdown-content {
    font-size: var(--tablet-font-size);
  }
}

@media (min-width: 1025px) {
  .markdown-content {
    font-size: var(--desktop-font-size);
  }
}

/* Ensure code blocks don't break layout */
.markdown-content pre {
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Responsive tables */
@media (max-width: 768px) {
  .markdown-content table {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}